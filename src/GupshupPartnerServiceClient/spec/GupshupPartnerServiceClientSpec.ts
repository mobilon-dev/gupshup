import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GupshupPartnerServiceClient } from '../GupshupPartnerServiceClient';
import { GupshupPartnerServiceClientConfig, PartnerTokenResponse } from '../types';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GupshupPartnerServiceClient', () => {
  let client: GupshupPartnerServiceClient;
  let mockAxiosInstance: any;

  beforeEach(() => {
    // Очищаем все моки перед каждым тестом
    jest.clearAllMocks();
    
    // Создаем мок для axios instance
    mockAxiosInstance = {
      post: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
      request: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
          eject: jest.fn(),
          clear: jest.fn(),
        },
        response: {
          use: jest.fn(),
          eject: jest.fn(),
          clear: jest.fn(),
        },
      },
      defaults: {},
    };

    // Мокаем axios.create
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
  });

  describe('constructor', () => {
    it('should create axios instance with correct base URL', () => {
      client = new GupshupPartnerServiceClient();
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://partner.gupshup.io',
      });
    });

    it('should create axios instance without debug logging by default', () => {
      client = new GupshupPartnerServiceClient();
      
      expect(mockAxiosInstance.interceptors.request.use).not.toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).not.toHaveBeenCalled();
    });

    it('should setup debug logging when debug is enabled', () => {
      const config: GupshupPartnerServiceClientConfig = { debug: true };
      client = new GupshupPartnerServiceClient(config);
      
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });

    it('should setup debug logging with correct logger config', () => {
      const config: GupshupPartnerServiceClientConfig = { debug: true };
      client = new GupshupPartnerServiceClient(config);
      
      // Проверяем, что перехватчики были вызваны
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });

    it('should handle different config options', () => {
      const config1: GupshupPartnerServiceClientConfig = {};
      const config2: GupshupPartnerServiceClientConfig = { debug: false };
      const config3: GupshupPartnerServiceClientConfig = { debug: true };

      const client1 = new GupshupPartnerServiceClient(config1);
      const client2 = new GupshupPartnerServiceClient(config2);
      const client3 = new GupshupPartnerServiceClient(config3);

      // Все клиенты должны быть созданы успешно
      expect(client1).toBeInstanceOf(GupshupPartnerServiceClient);
      expect(client2).toBeInstanceOf(GupshupPartnerServiceClient);
      expect(client3).toBeInstanceOf(GupshupPartnerServiceClient);
    });
  });

  describe('getPartnerToken', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'testpassword';
    const mockTokenResponse: PartnerTokenResponse = {
      token: 'mock-token-12345',
      additionalData: 'some-additional-data',
    };

    beforeEach(() => {
      client = new GupshupPartnerServiceClient();
    });

    it('should successfully authenticate and return token', async () => {
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(mockEmail, mockPassword);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: mockEmail, password: mockPassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('should handle authentication failure', async () => {
      const errorMessage = 'Invalid credentials';
      const mockError = new Error(errorMessage);
      
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(client.getPartnerToken(mockEmail, mockPassword)).rejects.toThrow(errorMessage);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: mockEmail, password: mockPassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.post.mockRejectedValue(networkError);

      await expect(client.getPartnerToken(mockEmail, mockPassword)).rejects.toThrow('Network Error');
    });

    it('should handle server errors (5xx)', async () => {
      const serverError: any = new Error('Request failed with status code 500');
      serverError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'Server error' },
      };

      mockAxiosInstance.post.mockRejectedValue(serverError);

      await expect(client.getPartnerToken(mockEmail, mockPassword)).rejects.toThrow('Request failed with status code 500');
    });

    it('should handle client errors (4xx)', async () => {
      const clientError: any = new Error('Request failed with status code 401');
      clientError.response = {
        status: 401,
        statusText: 'Unauthorized',
        data: { message: 'Invalid credentials' },
      };

      mockAxiosInstance.post.mockRejectedValue(clientError);

      await expect(client.getPartnerToken(mockEmail, mockPassword)).rejects.toThrow('Request failed with status code 401');
    });

    it('should handle empty email', async () => {
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken('', mockPassword);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: '', password: mockPassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      expect(result).toEqual(mockTokenResponse);
    });

    it('should handle empty password', async () => {
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(mockEmail, '');
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: mockEmail, password: '' },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      expect(result).toEqual(mockTokenResponse);
    });

    it('should handle special characters in email and password', async () => {
      const specialEmail = 'test+special@example.com';
      const specialPassword = 'pass@word!123';
      
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(specialEmail, specialPassword);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: specialEmail, password: specialPassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('should handle response with minimal token data', async () => {
      const minimalResponse: PartnerTokenResponse = {
        token: 'minimal-token',
      };

      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: minimalResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(mockEmail, mockPassword);

      expect(result).toEqual(minimalResponse);
      expect(result.token).toBe('minimal-token');
    });

    it('should handle response with additional fields', async () => {
      const extendedResponse: PartnerTokenResponse = {
        token: 'extended-token',
        userId: '12345',
        expiresAt: '2024-12-31T23:59:59Z',
        permissions: ['read', 'write'],
        metadata: {
          lastLogin: '2024-01-01T00:00:00Z',
          ipAddress: '192.168.1.1',
        },
      };

      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: extendedResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(mockEmail, mockPassword);

      expect(result).toEqual(extendedResponse);
      expect(result.token).toBe('extended-token');
      expect(result.userId).toBe('12345');
      expect(result.permissions).toEqual(['read', 'write']);
    });
  });

  describe('integration scenarios', () => {
    it('should work with debug mode enabled', async () => {
      const config: GupshupPartnerServiceClientConfig = { debug: true };
      client = new GupshupPartnerServiceClient(config);

      const mockTokenResponse: PartnerTokenResponse = {
        token: 'debug-token',
      };

      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken('debug@example.com', 'debugpass');

      expect(result).toEqual(mockTokenResponse);
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });

    it('should handle multiple consecutive calls', async () => {
      client = new GupshupPartnerServiceClient();

      const mockTokenResponse1: PartnerTokenResponse = { token: 'token1' };
      const mockTokenResponse2: PartnerTokenResponse = { token: 'token2' };

      const mockAxiosResponse1: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse1,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      const mockAxiosResponse2: AxiosResponse<PartnerTokenResponse> = {
        data: mockTokenResponse2,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post
        .mockResolvedValueOnce(mockAxiosResponse1)
        .mockResolvedValueOnce(mockAxiosResponse2);

      const result1 = await client.getPartnerToken('user1@example.com', 'pass1');
      const result2 = await client.getPartnerToken('user2@example.com', 'pass2');

      expect(result1).toEqual(mockTokenResponse1);
      expect(result2).toEqual(mockTokenResponse2);
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('error handling edge cases', () => {
    beforeEach(() => {
      client = new GupshupPartnerServiceClient();
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('timeout of 5000ms exceeded');
      mockAxiosInstance.post.mockRejectedValue(timeoutError);

      await expect(client.getPartnerToken('test@example.com', 'password')).rejects.toThrow('timeout of 5000ms exceeded');
    });

    it('should handle malformed response data', async () => {
      const malformedResponse: AxiosResponse<PartnerTokenResponse> = {
        data: null as any,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(malformedResponse);

      const result = await client.getPartnerToken('test@example.com', 'password');
      expect(result).toBeNull();
    });

    it('should handle response without token field', async () => {
      const responseWithoutToken = {
        data: { message: 'Success but no token' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(responseWithoutToken);

      const result = await client.getPartnerToken('test@example.com', 'password');
      expect(result).toEqual({ message: 'Success but no token' });
    });

    it('should handle very long email and password', async () => {
      const longEmail = 'a'.repeat(100) + '@example.com';
      const longPassword = 'b'.repeat(1000);
      
      const mockResponse: PartnerTokenResponse = {
        token: 'long-token',
        additionalData: 'long-data',
      };
      
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(longEmail, longPassword);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: longEmail, password: longPassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle unicode characters in email and password', async () => {
      const unicodeEmail = 'тест@пример.рф';
      const unicodePassword = 'пароль123!@#';
      
      const mockResponse: PartnerTokenResponse = {
        token: 'unicode-token',
        additionalData: 'unicode-data',
      };
      
      const mockAxiosResponse: AxiosResponse<PartnerTokenResponse> = {
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxiosInstance.post.mockResolvedValue(mockAxiosResponse);

      const result = await client.getPartnerToken(unicodeEmail, unicodePassword);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/partner/account/login',
        { email: unicodeEmail, password: unicodePassword },
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });
}); 