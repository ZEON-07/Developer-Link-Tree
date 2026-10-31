const STORAGE_KEY = "developer-link-tree-profile";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const DEFAULT_PROFILE = {
  displayName: "Alex Dev",
  username: "alexdev",
  bio: "Full Stack Developer & Open Source Enthusiast",
  picture: "https://api.dicebear.com/7.x/bottts/svg?seed=developer",
  githubUrl: "https://github.com",
  linkedinUrl: ""
};

const form = document.querySelector("#profile-form");
const displayNameInput = document.querySelector("#display-name");
const usernameInput = document.querySelector("#username");
const bioInput = document.querySelector("#bio");
const pictureFileInput = document.querySelector("#picture-file");
const githubUrlInput = document.querySelector("#github-url");
const linkedinUrlInput = document.querySelector("#linkedin-url");
const formStatus = document.querySelector("#form-status");
const viewProfileLink = document.querySelector("#view-profile-link");

function setStatus(message, isError = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
}

function isProfile(value) {
  return value !== null
    && typeof value === "object"
    && typeof value.displayName === "string"
    && typeof value.username === "string"
    && typeof value.bio === "string"
    && typeof value.picture === "string"
    && (value.githubUrl === undefined || typeof value.githubUrl === "string")
    && (value.linkedinUrl === undefined || typeof value.linkedinUrl === "string");
}

function loadProfile() {
  let savedProfile;
  try {
    savedProfile = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Could not read the saved profile.", error);
    setStatus("Saved profile could not be read. Changes may not persist in this browser.", true);
    return { profile: { ...DEFAULT_PROFILE }, saved: false };
  }

  if (savedProfile === null) {
    return { profile: { ...DEFAULT_PROFILE }, saved: false };
  }

  let parsedProfile;
  try {
    parsedProfile = JSON.parse(savedProfile);
  } catch (error) {
    console.error("Saved profile data is invalid.", error);
    setStatus("Saved profile data is invalid. Save your profile again to replace it.", true);
    return { profile: { ...DEFAULT_PROFILE }, saved: false };
  }

  if (!isProfile(parsedProfile)) {
    setStatus("Saved profile data is incomplete. Save your profile again to replace it.", true);
    return { profile: { ...DEFAULT_PROFILE }, saved: false };
  }

  return {
    profile: { ...DEFAULT_PROFILE, ...parsedProfile },
    saved: true
  };
}

function populateForm(profile) {
  displayNameInput.value = profile.displayName;
  usernameInput.value = profile.username;
  bioInput.value = profile.bio;
  githubUrlInput.value = profile.githubUrl;
  linkedinUrlInput.value = profile.linkedinUrl;
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") {
        reject(new Error("The selected image could not be read."));
        return;
      }
      resolve(reader.result);
    });
    reader.addEventListener("error", () => {
      reject(reader.error || new Error("The selected image could not be read."));
    });
    reader.addEventListener("abort", () => {
      reject(new Error("Reading the selected image was cancelled."));
    });
    reader.readAsDataURL(file);
  });
}

function parseProfileUrl(input, label) {
  const value = input.value.trim();
  if (!value) {
    return "";
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error(`Enter a valid ${label} URL.`);
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error(`${label} URLs must start with http:// or https://.`);
  }

  return parsedUrl.href;
}

const loadedProfile = loadProfile();
let profile = loadedProfile.profile;
populateForm(profile);
viewProfileLink.hidden = !loadedProfile.saved;

if (!loadedProfile.saved && !formStatus.textContent) {
  setStatus("Save your profile to view the finished page.");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const displayName = displayNameInput.value.trim();
  const username = usernameInput.value.trim();
  if (!displayName) {
    setStatus("Enter a display name before saving.", true);
    displayNameInput.focus();
    return;
  }

  if (username && !/^[A-Za-z0-9._-]+$/.test(username)) {
    setStatus("Username can contain only letters, numbers, dots, underscores, and hyphens.", true);
    usernameInput.focus();
    return;
  }

  let picture = profile.picture;
  const selectedFile = pictureFileInput.files[0];
  if (selectedFile) {
    if (!selectedFile.type.startsWith("image/")) {
      setStatus("Choose a valid image file.", true);
      pictureFileInput.focus();
      return;
    }
    if (selectedFile.size > MAX_IMAGE_SIZE) {
      setStatus("Choose an image no larger than 2 MB.", true);
      pictureFileInput.focus();
      return;
    }

    try {
      picture = await readImageFile(selectedFile);
    } catch (error) {
      console.error("Could not read the selected profile picture.", error);
      setStatus(error.message, true);
      return;
    }
  }

  let githubUrl;
  let linkedinUrl;
  try {
    githubUrl = parseProfileUrl(githubUrlInput, "GitHub profile");
    linkedinUrl = parseProfileUrl(linkedinUrlInput, "LinkedIn profile");
  } catch (error) {
    setStatus(error.message, true);
    if (!githubUrlInput.value.trim()) {
      linkedinUrlInput.focus();
    } else {
      githubUrlInput.focus();
    }
    return;
  }

  const updatedProfile = {
    displayName,
    username,
    bio: bioInput.value.trim(),
    picture,
    githubUrl,
    linkedinUrl
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
  } catch (error) {
    console.error("Could not save the profile.", error);
    setStatus("Profile could not be saved. Try a smaller image or enable browser storage.", true);
    return;
  }

  profile = updatedProfile;
  populateForm(profile);
  pictureFileInput.value = "";
  setStatus("Profile saved. Your changes will be here when you return.");
  viewProfileLink.hidden = false;
});
