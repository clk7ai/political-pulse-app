import { Poll, Member, Thread } from '../types';
import StorageService from './storage';

// API Base URL - replace with your actual backend URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.politicalpulse.com';

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Helper function to handle API requests
const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  requiresAuth: boolean = true
): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = await StorageService.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error: any) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || 'Network error occurred',
    };
  }
};

// API Service object
export const ApiService = {
  // ========== Authentication ==========
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await apiRequest<{ token: string; user: any }>(
      '/auth/login',
      'POST',
      { email, password },
      false
    );
    
    if (response.success && response.data) {
      await StorageService.saveAuthToken(response.data.token);
      await StorageService.saveUserData(response.data.user);
    }
    
    return response;
  },

  async register(userData: any): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await apiRequest<{ token: string; user: any }>(
      '/auth/register',
      'POST',
      userData,
      false
    );
    
    if (response.success && response.data) {
      await StorageService.saveAuthToken(response.data.token);
      await StorageService.saveUserData(response.data.user);
    }
    
    return response;
  },

  async logout(): Promise<void> {
    await StorageService.clearAuthData();
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiRequest<{ token: string }>('/auth/refresh', 'POST');
  },

  // ========== Polls ==========
  async getPolls(filter?: 'all' | 'active' | 'completed'): Promise<ApiResponse<Poll[]>> {
    const query = filter && filter !== 'all' ? `?status=${filter}` : '';
    return apiRequest<Poll[]>(`/polls${query}`);
  },

  async getPollById(pollId: string): Promise<ApiResponse<Poll>> {
    return apiRequest<Poll>(`/polls/${pollId}`);
  },

  async createPoll(pollData: Partial<Poll>): Promise<ApiResponse<Poll>> {
    return apiRequest<Poll>('/polls', 'POST', pollData);
  },

  async vote(pollId: string, optionId: string): Promise<ApiResponse<void>> {
    const response = await apiRequest<void>(`/polls/${pollId}/vote`, 'POST', { optionId });
    
    if (response.success) {
      await StorageService.saveVote(pollId, optionId);
    }
    
    return response;
  },

  async deletePoll(pollId: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/polls/${pollId}`, 'DELETE');
  },

  // ========== Members ==========
  async getMembers(level?: number): Promise<ApiResponse<Member[]>> {
    const query = level ? `?level=${level}` : '';
    return apiRequest<Member[]>(`/members${query}`);
  },

  async getMemberById(memberId: string): Promise<ApiResponse<Member>> {
    return apiRequest<Member>(`/members/${memberId}`);
  },

  async createMember(memberData: Partial<Member>): Promise<ApiResponse<Member>> {
    return apiRequest<Member>('/members', 'POST', memberData);
  },

  async updateMember(memberId: string, memberData: Partial<Member>): Promise<ApiResponse<Member>> {
    return apiRequest<Member>(`/members/${memberId}`, 'PUT', memberData);
  },

  async deleteMember(memberId: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/members/${memberId}`, 'DELETE');
  },

  // ========== Forum Threads ==========
  async getThreads(category?: string): Promise<ApiResponse<Thread[]>> {
    const query = category && category !== 'All' ? `?category=${category}` : '';
    return apiRequest<Thread[]>(`/threads${query}`);
  },

  async getThreadById(threadId: string): Promise<ApiResponse<Thread>> {
    return apiRequest<Thread>(`/threads/${threadId}`);
  },

  async createThread(threadData: Partial<Thread>): Promise<ApiResponse<Thread>> {
    return apiRequest<Thread>('/threads', 'POST', threadData);
  },

  async deleteThread(threadId: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/threads/${threadId}`, 'DELETE');
  },

  async likeThread(threadId: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/threads/${threadId}/like`, 'POST');
  },

  async replyToThread(threadId: string, content: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/threads/${threadId}/reply`, 'POST', { content });
  },

  // ========== Profile ==========
  async getProfile(): Promise<ApiResponse<any>> {
    return apiRequest<any>('/profile');
  },

  async updateProfile(profileData: any): Promise<ApiResponse<any>> {
    return apiRequest<any>('/profile', 'PUT', profileData);
  },

  async uploadProfileImage(imageUri: string): Promise<ApiResponse<{ imageUrl: string }>> {
    // This would need FormData for file upload
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);

    return apiRequest<{ imageUrl: string }>('/profile/image', 'POST', formData);
  },

  // ========== Analytics/Stats ==========
  async getStats(): Promise<ApiResponse<any>> {
    return apiRequest<any>('/stats');
  },

  async getDashboard(): Promise<ApiResponse<any>> {
    return apiRequest<any>('/dashboard');
  },
};

export default ApiService;
