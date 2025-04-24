import {ICityHall} from '../models/CityHall';
import api from './api';
export const cityHallId = '7a89e14e-fda5-485e-8088-311cacf5a4c5';
export const getCityHall = async (): Promise<ICityHall | null> => {
  try {
    const cityHallResponse = await api.get(`/api/city-halls/${cityHallId}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
      },
    });
    console.log(cityHallResponse.data);
    return cityHallResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
