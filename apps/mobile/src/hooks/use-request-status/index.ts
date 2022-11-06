import { useState } from "react";

type RequestStatus = "PENDING" | "FULFILLED" | "REJECTED" | null;

export default function useRequestStatus() {
  const [status, setStatus] = useState<RequestStatus>(null);

  const setAsPending = () => setStatus("PENDING");
  const setAsFulfilled = () => setStatus("FULFILLED");
  const setAsRejected = () => setStatus("REJECTED");
  const setAsNone = () => setStatus(null);

  return {
    setAsPending,
    setAsFulfilled,
    setAsRejected,
    setAsNone,
    isLoading: status === "PENDING",
    isFulfilled: status === "FULFILLED",
    hasError: status === "REJECTED",
  };
}
