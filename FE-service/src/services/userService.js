import { baseUrl } from "./apiService";

export const registerUser = async (user) => {
  try {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(
      `${baseUrl}/users?email=${email}&password=${password}`
    );

    if (!res.ok) {
      return null;
    }

    const users = await res.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Błąd logowania:", error);
    return null;
  }
};

export const doesEmailExist = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/users?email=${email}`);
    if (!res.ok) return false;
    const users = await res.json();
    return users.length > 0;
  } catch (error) {
    console.error("Błąd sprawdzania e-maila:", error);
    return false;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/users/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Błąd pobierania użytkownika:", error);
    return null;
  }
};
