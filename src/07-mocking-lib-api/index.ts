import axios from 'axios';
import { throttle } from 'lodash';
export const THROTTLE_TIME = 5000;

const getDataFromApi = async (relativePath: string) => {
  console.log(axios);
  const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  console.log(axiosClient);
  const response = await axiosClient.get(relativePath);
  return response.data;
};

export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
