import { AdoptionType } from "@animavita/models";
import { types } from "@babel/core";
import {
  isError,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";
import useAdoptions from "../../../src/hooks/use-adoptions";
import { getAllAdoptions } from "../../../src/services/adoptions";

jest.mock("@tanstack/react-query");
jest.mock("../../../src/services/adoptions", () => ({
  getAllAdoptions: jest.fn,
}));

type Setup = {
  isLoading: boolean;
  hasError: boolean;
  adoptions: AdoptionType[] | null;
};

const setup = ({ isLoading, hasError, adoptions }: Setup) => {
  const useQueryMock = useQuery as jest.MockedFunction<typeof useQuery>;
  useQueryMock.mockImplementation(() => {
    return {
      data: { data: adoptions },
      isLoading,
      isError: hasError,
    } as any;
  });

  return renderHook(() => useAdoptions());
};

describe("useAdoptions", () => {
  it("returns all adoptions", () => {
    const adoptions: AdoptionType[] = [
      {
        name: "Dog",
        gender: "male",
        size: "medium",
        breed: "God",
        type: "dog",
        age: 12,
        observations: "cool",
        photos: ["photo1.png"],
      },
    ];
    const { result } = setup({ isLoading: false, hasError: false, adoptions });

    expect(result.current.adoptions).toStrictEqual(adoptions);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it("does not return adoptions", () => {
    const { result } = setup({
      isLoading: false,
      hasError: false,
      adoptions: null,
    });

    expect(result.current.adoptions).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it("is loading adoptions", () => {
    const { result } = setup({
      isLoading: true,
      hasError: false,
      adoptions: null,
    });

    expect(result.current.isLoading).toBeTruthy();
  });

  it("has error into retrieve adoptions", () => {
    const { result } = setup({
      isLoading: false,
      hasError: true,
      adoptions: null,
    });

    expect(result.current.isError).toBeTruthy();
  });
});
