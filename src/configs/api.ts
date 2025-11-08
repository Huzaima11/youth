// src/services/api.ts

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
// Types for better TypeScript support
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
  data?: any;
}

interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: string;
}

interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
}

class ApiService {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    // Create axios instance with base configuration
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL || 'https://testing.youthacademy.pk/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config) => {
        // Add bearer token if available
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }


        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development

        return response;
      },
      (error) => {
        // Handle common error scenarios
        if (error.response) {
          const { status, data } = error.response;

          // Log error in development


          // Handle 401 Unauthorized - token expired/invalid
          // if (status === 401) {
          //   this.clearToken();
          //   // Redirect to login or handle as needed
          //   window.location.href = '/login';
          // }

          const apiError: ApiError = {
            message: data?.message || error.message || 'An error occurred',
            status,
            data,
          };

          return Promise.reject(apiError);
        } else if (error.request) {
          // Network error
          const networkError: ApiError = {
            message: 'Network error - please check your connection',
            status: 0,
          };
          return Promise.reject(networkError);
        } else {
          // Something else happened
          const unknownError: ApiError = {
            message: error.message || 'An unknown error occurred',
            status: 0,
          };
          return Promise.reject(unknownError);
        }
      }
    );
  }

  // Token management methods
  setToken(token: string): void {
    this.token = token;
    Cookies.set('auth_token', token);
  }

  clearToken(): void {
    this.token = null;
    Cookies.remove('auth_token');
  }

  getToken(): string | null {
    return this.token || Cookies.get('auth_token') || null;

  }

  initializeToken(): void {
    const storedToken = Cookies.get('auth_token') || null;
    if (storedToken) {
      this.token = storedToken;
    }
  }

  // Core HTTP methods following your pattern
  async coreFetch<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async corePost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async corePatch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async coreDelete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Additional core methods
  async corePut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // File upload helper with optional token parameter

  async coreUpload<T = any>(
    url: string,
    file: File | FormData,
    onUploadProgress?: (progressEvent: any) => void,
    customToken?: string | null
  ): Promise<T> {
    const formData = file instanceof FormData ? file : new FormData();
    if (!(file instanceof FormData)) {
      formData.append("file", file);
    }

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };

    if (customToken) {
      headers.Authorization = `Bearer ${customToken}`;
    }

    try {
      const response = await axios.post<T>(
        this.instance.defaults.baseURL + url, // keep baseURL
        formData,
        { headers, onUploadProgress }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

}

// Create singleton instance
const apiService = new ApiService();
apiService.initializeToken();

// Export core methods as standalone functions
export const coreFetch = apiService.coreFetch.bind(apiService);
export const corePost = apiService.corePost.bind(apiService);
export const corePatch = apiService.corePatch.bind(apiService);
export const coreDelete = apiService.coreDelete.bind(apiService);
export const corePut = apiService.corePut.bind(apiService);
export const coreUpload = apiService.coreUpload.bind(apiService);

// Export token management functions
export const setToken = apiService.setToken.bind(apiService);
export const clearToken = apiService.clearToken.bind(apiService);
export const getToken = apiService.getToken.bind(apiService);

// Export types
export type { ApiResponse, ApiError, ListParams, CreateUserPayload, UpdateUserPayload };