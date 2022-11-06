import { AdoptionType } from "@animavita/models";
import { useEffect, useState } from "react";
import { getAllAdoptions } from "../../services/adoptions";
import useRequestStatus from "../use-request-status";

export default function useAdoptions() {
  const { isLoading, hasError, setAsPending, setAsRejected } =
    useRequestStatus();

  const [adoptions, setAdoptions] = useState<AdoptionType[] | null>(null);

  const loadAdoptions = () => {
    getAllAdoptions({
      onPending: setAsPending,
      onFulfilled: setAdoptions,
      onError: setAsRejected,
    });
  };

  useEffect(() => {
    loadAdoptions();
  }, []);

  return {
    adoptions,
    isLoading,
    hasError,
  };
}
