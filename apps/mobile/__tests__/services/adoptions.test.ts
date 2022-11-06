import { getAllAdoptions } from "../../src/services/adoptions";
import client from "../../src/services/http-client";

jest.mock("../../src/services/http-client");

const httpRequestMock = (hasError = false) => {
  const mockClient = client.get as jest.MockedFunction<typeof client.get>;

  mockClient.mockImplementation(() => {
    if (hasError) return Promise.reject();
    return Promise.resolve([]);
  });
};

describe("getAllAdoptions", () => {
  beforeEach(jest.clearAllMocks);

  it("calls onFulfilled callback", async () => {
    httpRequestMock();

    const onFulfilled = jest.fn();

    await getAllAdoptions({
      onError: jest.fn,
      onFulfilled,
      onPending: jest.fn,
    });

    expect(onFulfilled).toBeCalled();
  });

  it("calls onError callback", async () => {
    httpRequestMock(true);

    const onError = jest.fn();

    await getAllAdoptions({
      onFulfilled: jest.fn,
      onPending: jest.fn,
      onError,
    });

    expect(onError).toBeCalled();
  });
});
