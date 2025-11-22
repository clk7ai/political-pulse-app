import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_DATA: '@political_pulse/user_data',
  AUTH_TOKEN: '@political_pulse/auth_token',
  POLLS: '@political_pulse/polls',
  MEMBERS: '@political_pulse/members',
  THREADS: '@political_pulse/threads',
  VOTES: '@political_pulse/votes',
  SETTINGS: '@political_pulse/settings'
};

export const StorageService = {
  // Generic methods
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  async getItem(key: string): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      throw error;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  // Specific methods for app data
  async saveUserData(userData: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_DATA, userData);
  },

  async getUserData(): Promise<any> {
    return this.getItem(STORAGE_KEYS.USER_DATA);
  },

  async saveAuthToken(token: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async clearAuthData(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.USER_DATA);
    await this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async savePolls(polls: any[]): Promise<void> {
    return this.setItem(STORAGE_KEYS.POLLS, polls);
  },

  async getPolls(): Promise<any[]> {
    return this.getItem(STORAGE_KEYS.POLLS);
  },

  async saveVote(pollId: string, optionId: string): Promise<void> {
    const votes = await this.getItem(STORAGE_KEYS.VOTES) || {};
    votes[pollId] = optionId;
    return this.setItem(STORAGE_KEYS.VOTES, votes);
  },

  async getVote(pollId: string): Promise<string | null> {
    const votes = await this.getItem(STORAGE_KEYS.VOTES) || {};
    return votes[pollId] || null;
  },

  async saveSettings(settings: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  async getSettings(): Promise<any> {
    return this.getItem(STORAGE_KEYS.SETTINGS);
  }
};

export default StorageService;
