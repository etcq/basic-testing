import { throttledGetDataFromApi } from './index';
import axios from 'axios';

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn().mockResolvedValue({ data: 'test data' }),
  }),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/mocked/path');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
