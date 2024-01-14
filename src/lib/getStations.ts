import axios from "axios"
import { ApiResponse } from "../types/ApiResponse";

export const api = axios.create({
  baseURL: `https://api.tomtom.com/search/2/`
});

export const getStations = async ({ lat, lng }: { lat: number, lng: number }) => {
  const { data } = await api.get<ApiResponse>(`nearbySearch/.json?lat=${lat}&lon=${lng}&radius=10000&language=th-TH&categorySet=7309&view=Unified&relatedPois=off&key=${import.meta.env.VITE_API_KEY}`)
  return data;
}