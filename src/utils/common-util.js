function formatDatePart(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export function formatDate(dateString = "") {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago, ${formatDatePart(date)}`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago, ${formatDatePart(date)}`;
  } else if (hours < 24) {
    return `${hours} hours ago, ${formatDatePart(date)}`;
  } else if (days < 7) {
    return `${days} days ago, ${formatDatePart(date)}`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago, ${formatDatePart(date)}`;
  } else if (months < 12) {
    return `${months} months ago, ${formatDatePart(date)}`;
  } else {
    return `${years} years ago, ${formatDatePart(date)}`;
  }
}

export function extractFileName(filePath = "") {
  const parts = filePath.split("/");
  const fileNameWithExtension = parts[parts.length - 1];
  const fileName = fileNameWithExtension.split(".")[0];
  return fileName;
}

export function extractFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex !== -1) {
    return fileName.slice(dotIndex + 1).toLowerCase();
  }
  return '';
}

export function convertFileSize(fileSize) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let size = parseFloat(fileSize);
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return size.toFixed(2) + ' ' + units[unitIndex];
}


export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    return fallbackCopyTextToClipboard(text);
  } catch (error) {
    return false;
  }
};

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let result = false;
  try {
    result = document.execCommand('copy');
    document.body.removeChild(textArea);
  } catch (err) {
    result = false;
  }

  document.body.removeChild(textArea);
  return result;
}

export const formattedResponse = (text) => {
  let replacedString = "";

  // Replace "\n" with <br>
  replacedString = text.replace(/\n/g, '<br>');

  return <span dangerouslySetInnerHTML={{ __html: replacedString }} />;
}

export const authorizeDoAction = (actionId) => {
  const excludePermission = ['dashboard', 'search'];
  const sessionPermissions = sessionStorage.getItem('permissions');

  if (sessionPermissions) {
    const permissions = JSON.parse(sessionPermissions);
    const obj = permissions.find((o) => o.codename === actionId);

    return obj || excludePermission.includes(actionId);
  }
};


export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^[0-9]{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};


export const getInitials = (user) => {
  const firstNameInitial = user?.first_name?.charAt(0);
  const lastNameInitial = user?.last_name?.charAt(0);
  return `${firstNameInitial}${lastNameInitial}`;
}

export const getFullName = (user) => {
  const firstNameInitial = user?.first_name;
  const lastNameInitial = user?.last_name;
  return `${firstNameInitial} ${lastNameInitial}`;
}

export const EMAIL_REGEX = /^[a-z0-9-_]+@[a-z]{2,}\.[a-z]{2,3}$/;
export const NAME_REGEX = /^[a-zA-Z]+$/;
export const NAME_WITH_SPACE_REGEX = /^[a-zA-Z ]+$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
// export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;