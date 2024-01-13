import axios from 'axios';

export const api = axios.create({
  baseURL: `https://api.tomtom.com/search/2/`
});

export const ipAPI = axios.create({
  baseURL: 'https://api.ipify.org/'
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
export const ipFetcher = (url: string) => ipAPI.get(url).then((res) => res.data);