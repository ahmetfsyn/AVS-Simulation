
import { api } from './api'
export const getWaterCompaniesAsync = async () => {
    try {
        const response = await api.get('/api/water-companies');

        console.log(response.data);

        return response.data

    } catch (error) {
        console.error(error)
    }
}
