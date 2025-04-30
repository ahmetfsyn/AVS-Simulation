import { api } from "./api";

export const getKioskAsync = async () => {
    try {
        const response = await api.get('/kiosks/' + ;

        // console.log(response.data);

        return response.data

    } catch (error) {
        console.error(error)
    }
}