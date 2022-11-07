import { useQuery } from "@tanstack/react-query";
import { getAllAdoptions } from "../../services/adoptions";

export default function useAdoptions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllAdoptions"],
    queryFn: getAllAdoptions,
  });

  return {
    adoptions: data?.data,
    isLoading,
    isError,
  };
}
