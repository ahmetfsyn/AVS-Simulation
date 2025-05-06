/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { getKioskAsync } from "../services/kioskService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setKioskRedux } from "../redux/slices/appSlice";
export const useGetKiosk = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["useGetKiosk"],
    queryFn: getKioskAsync,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setKioskRedux(data));
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);

  return { data, error, isLoading, refetch };
};
