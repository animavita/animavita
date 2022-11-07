import { getAllAdoptions } from "../../src/services/adoptions";
import client from "../../src/services/http-client";

jest.mock("../../src/services/http-client");

const responseMock = [
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

const httpRequestMock = (hasError = false) => {
  const mockClient = client.get as jest.MockedFunction<typeof client.get>;

  mockClient.mockImplementation(() => {
    if (hasError) return Promise.reject();
    return Promise.resolve({ data: responseMock });
  });
};

describe("getAllAdoptions", () => {
  beforeEach(jest.clearAllMocks);

  it("returns adoptions", async () => {
    httpRequestMock();

    const response = await getAllAdoptions();

    expect(response.data).toStrictEqual(responseMock);
  });

  it("throws error", async () => {
    httpRequestMock(true);

    const onError = jest.fn();

    await getAllAdoptions().catch(onError);

    expect(onError).toBeCalled();
  });
});
