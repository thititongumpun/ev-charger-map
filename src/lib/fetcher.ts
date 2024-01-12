import axios from 'axios';

export const api = axios.create({
  baseURL: `https://api.tomtom.com/search/2/`
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);