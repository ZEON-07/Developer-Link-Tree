const STORAGE_KEY = "developer-link-tree-profile";
const DEFAULT_PROFILE_LINKS = {
  githubUrl: "https://github.com",
  linkedinUrl: ""
};

const profileName = document.querySelector("#profile-name");
const profileUsername = document.querySelector("#profile-username");
const profileBio = document.querySelector("#profile-bio");
const profilePicture = document.querySelector("#profile-picture");
const profileCard = document.querySelector("#profile-card");
const emptyProfile = document.querySelector("#empty-profile");
const profileStatus = document.querySelector("#profile-status");
const githubLink = document.querySelector("#github-link");
const linkedinLink = document.querySelector("#linkedin-link");

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

function renderProfile(profile) {
  profileName.textContent = profile.displayName;
  profileUsername.textContent = profile.username ? `@${profile.username}` : "";
  profileUsername.hidden = !profile.username;
  profileBio.textContent = profile.bio;
  profileBio.hidden = !profile.bio;
  profilePicture.src = profile.picture;
  profilePicture.alt = `${profile.displayName}'s profile picture`;
  githubLink.hidden = !profile.githubUrl;
  linkedinLink.hidden = !profile.linkedinUrl;
  if (profile.githubUrl) {
    githubLink.href = profile.githubUrl;
  } else {
    githubLink.removeAttribute("href");
  }
  if (profile.linkedinUrl) {
    linkedinLink.href = profile.linkedinUrl;
  } else {
    linkedinLink.removeAttribute("href");
  }
}

function showEmptyProfile(message) {
  profileCard.hidden = true;
  emptyProfile.hidden = false;
  profileStatus.textContent = message;
}

try {
  const savedProfile = localStorage.getItem(STORAGE_KEY);
  if (savedProfile === null) {
    showEmptyProfile("Save your profile in the editor to see it here.");
  } else {
    const parsedProfile = JSON.parse(savedProfile);
    if (!isProfile(parsedProfile)) {
      throw new Error("Saved profile data is incomplete.");
    }
    renderProfile({ ...DEFAULT_PROFILE_LINKS, ...parsedProfile });
  }
} catch (error) {
  console.error("Could not load the saved profile.", error);
  showEmptyProfile("Could not load the saved profile. Return to the editor and save it again.");
}
