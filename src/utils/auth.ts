// utils/auth.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // Add other user properties as needed
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}

/**
 * Check if user is currently authenticated
 */
export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return false;
    }

    // Parse and validate token expiration if needed
    const tokenData: AuthToken = JSON.parse(token);
    const now = Date.now();

    // Check if token is expired
    if (tokenData.expiresAt && tokenData.expiresAt < now) {
      // Token is expired, clean up
      clearAuthData();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking authentication:", error);
    clearAuthData();
    return false;
  }
};

/**
 * Get current user data
 */
export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const tokenData: AuthToken = JSON.parse(token);
    return tokenData.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

/**
 * Set authentication data
 */
export const setAuthData = (token: AuthToken, user: User): void => {
  try {
    localStorage.setItem("authToken", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error setting auth data:", error);
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

/**
 * Check if token needs refresh (optional)
 */
export const shouldRefreshToken = (): boolean => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    const tokenData: AuthToken = JSON.parse(token);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Refresh if token expires in less than 5 minutes
    return (
      typeof tokenData.expiresAt === "number" &&
      tokenData.expiresAt - now < fiveMinutes
    );
  } catch (error) {
    console.error("Error checking token refresh:", error);
    return false;
  }
};
