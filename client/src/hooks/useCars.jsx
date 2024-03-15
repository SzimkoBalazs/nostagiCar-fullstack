import React from "react";
import { useQuery } from "react-query";
import { getAllCars } from "../utils/api";

const useCars = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allCars",
    getAllCars,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useCars;