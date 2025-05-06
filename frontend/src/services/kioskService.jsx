import { api } from "./api";

export const getKioskAsync = async () => {
    try {
        const response = await api.get('/kiosks/' + import.meta.env.VITE_KIOSK_ID);

        // console.log(response.data);

        return response.data

    } catch (error) {
        console.error(error)
    }
}