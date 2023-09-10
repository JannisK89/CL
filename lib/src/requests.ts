export type ApiRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

export type ApiResponse = {
  status: string;
  body: string;
  errorCode: boolean;
};

export const requestMaker = async (
  request: ApiRequest
): Promise<ApiResponse | void> => {
  try {
    const response = await fetch(request.url, {
      method: request.method,
      body: request.body as BodyInit,
      headers: request.headers as HeadersInit,
    });

    const bodyText = await response.text();

    const apiResponse: ApiResponse = {
      status: response.status + " " + response.statusText,
      body: bodyText,
      errorCode: response.status >= 400,
    };

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};
