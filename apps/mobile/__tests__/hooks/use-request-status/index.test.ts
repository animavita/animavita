import { act, renderHook } from "@testing-library/react-native";
import useRequestStatus from "../../../src/hooks/use-request-status";

const setup = () => {
  return renderHook(() => useRequestStatus());
};

describe("useRequestStatus", () => {
  it("returns isLoading as true", () => {
    const { result } = setup();

    act(() => {
      result.current.setAsPending();
    });

    expect(result.current.isLoading).toBeTruthy();
  });

  it("returns hasError as true", () => {
    const { result } = setup();

    act(() => {
      result.current.setAsRejected();
    });

    expect(result.current.hasError).toBeTruthy();
  });

  it("returns isFulfilled as true", () => {
    const { result } = setup();

    act(() => {
      result.current.setAsFulfilled();
    });

    expect(result.current.isFulfilled).toBeTruthy();
  });
});
