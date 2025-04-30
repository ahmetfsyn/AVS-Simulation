/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { getCityHallAsync } from '../services/cityHallService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setCityHallRedux } from '../redux/slices/appSlice';
export const useGetCityHall = () => {

    const dispatch = useDispatch();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['useGetCityHall'],
        queryFn: getCityHallAsync,
        enabled: true,
        refetchOnWindowFocus: false
    });


    useEffect(() => {

        if (data) {
            dispatch(setCityHallRedux(data));
        } else if (error) {
            console.error(error);
        }

    }, [data, error])


    return { data, error, isLoading, refetch }

}