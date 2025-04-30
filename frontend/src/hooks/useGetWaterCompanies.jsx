import { useQuery } from '@tanstack/react-query';
import { getWaterCompaniesAsync } from '../services/waterCompanyService';



export const useGetWaterCompanies = () => {

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['useGetWaterCompanies'],
        queryFn: getWaterCompaniesAsync,
        // enabled: false,
    });

    return { data, error, isLoading, refetch }

}