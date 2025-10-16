const USER_KEY = 'ms-user-details';

const StorageService = {
  setUserDetails(user) {
    try {
      if (!user) {
        localStorage.removeItem(USER_KEY);
        return;
      }
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user details:', error);
    }
  },

  getUserDetails() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('Failed to read user details:', error);
      return null;
    }
  },

  clearUserDetails() {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to clear user details:', error);
    }
  },

  clearUserData() {
    this.clearUserDetails();
  },

  clearAll() {
    this.clearUserDetails();
  },

  getGuestSlides() {
    return null;
  },

  setGuestSlides() {
    // Placeholder to keep compatibility with legacy code paths
  },
};

export default StorageService;
