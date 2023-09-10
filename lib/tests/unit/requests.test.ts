import { expect, test, mock, Mock } from "bun:test";
import { requestMaker, ApiRequest } from "../../src/requests";

test("Correct response for success", async () => {
  globalThis.fetch = mock(() =>
    Promise.resolve({
      status: 200,
      statusText: "OK",
      text: () => {
        return Promise.resolve("Fetch Mock Text OK");
      },
    })
  ) as Mock<() => Promise<Response>>;

  const request: ApiRequest = {
    method: "GET",
    url: "https://JannisKaranikis.dev",
  };

  const result = await requestMaker(request);
  expect(result).toStrictEqual({
    body: "Fetch Mock Text OK",
    errorCode: false,
    status: "200 OK",
  });
});

test("Correct response for failure", async () => {
  globalThis.fetch = mock(() =>
    Promise.resolve({
      status: 500,
      statusText: "Internal Server Error",
      text: () => {
        return Promise.resolve("Fetch Mock Text Server Error");
      },
    })
  ) as Mock<() => Promise<Response>>;

  const request: ApiRequest = {
    method: "GET",
    url: "https://JannisKaranikis.dev",
  };

  const result = await requestMaker(request);
  expect(result).toStrictEqual({
    body: "Fetch Mock Text Server Error",
    errorCode: true,
    status: "500 Internal Server Error",
  });
});
