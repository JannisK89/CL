import { expect, test } from "bun:test";
import { requestMaker, ApiRequest } from "../../src/requests";

test("Correct response for success", async () => {
  const request: ApiRequest = {
    method: "GET",
    url: "https://daedalus.janniskaranikis.dev/api/users",
  };

  const result = await requestMaker(request);
  expect(result).toStrictEqual({
    body: '[{"name":"Richard","age":31},{"name":"Dinesh","age":33},{"name":"Gilfoyle","age":35},{"name":"Bighead","age":29},{"name":"Jared","age":31}]',
    errorCode: false,
    status: "200 OK",
  });
});
