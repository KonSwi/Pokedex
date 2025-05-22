const userKey = "loggedUser";
const themeKey = "theme";

export const saveUser = (user) => {
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(userKey);
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    localStorage.removeItem(userKey);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(userKey);
};

export const saveTheme = (theme) => {
  localStorage.setItem(themeKey, theme);
};

export const getTheme = () => {
  return localStorage.getItem(themeKey) || "light";
};
