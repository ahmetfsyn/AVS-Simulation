import { api } from "./api";

export const getCityHallAsync = async () => {
    try {
        const response = await api.get('/city-halls/' + import.meta.env.VITE_CITY_HALL_ID);

        // console.log(response.data);

        return response.data

    } catch (error) {
        console.error(error)
    }
}