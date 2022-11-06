import { AdoptionType } from "@animavita/models";
import { renderHook } from "@testing-library/react-native";
import useAdoptions from "../../../src/hooks/use-adoptions";
import { getAllAdoptions } from "../../../src/services/adoptions";

jest.mock("../../../src/services/adoptions");

type Setup = {
  isLoading: boolean;
  hasError: boolean;
  adoptions: AdoptionType[] | null;
};

const setup = ({ isLoading, hasError, adoptions }: Setup) => {
  const mockGetAllAdoptions = getAllAdoptions as jest.MockedFunction<
    typeof getAllAdoptions
  >;
  mockGetAllAdoptions.mockImplementation(
    ({ onPending, onFulfilled, onError }) => {
      if (isLoading) onPending();
      if (hasError) onError();
      onFulfilled(adoptions);
    }
  );

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
    expect(result.current.hasError).toBeFalsy();
  });

  it("does not return adoptions", () => {
    const { result } = setup({
      isLoading: false,
      hasError: false,
      adoptions: null,
    });

    expect(result.current.adoptions).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasError).toBeFalsy();
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

    expect(result.current.hasError).toBeTruthy();
  });
});
