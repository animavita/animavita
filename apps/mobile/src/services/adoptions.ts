import { AdoptionType } from "@animavita/models";
import client from "./http-client";

export const getAllAdoptions = () => {
  return client.get<AdoptionType[]>("/adoptions");
};
