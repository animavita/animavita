import { AdoptionType } from "@animavita/models";
import client from "./http-client";

type StatusCallbacks = {
  onPending: () => void;
  onFulfilled: (adoptions: AdoptionType[] | null) => void;
  onError: () => void;
};

export type GetAllAdoptions = ({
  onPending,
  onFulfilled,
  onError,
}: StatusCallbacks) => void;

export const getAllAdoptions: GetAllAdoptions = ({
  onPending,
  onFulfilled,
  onError,
}) => {
  onPending();

  return client
    .get<AdoptionType[]>("/adoptions")
    .then((response) => onFulfilled(response.data))
    .catch(onError);
};
