import axios from 'axios';
import { env } from '@/config/env';
import { API_ENDPOINTS } from '@/lib/config/constants';

const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const chatService = {
  sendMessage: async (prompt) => {
    const { data } = await apiClient.post(API_ENDPOINTS.CHAT, { prompt });
    return data;
  },
};
