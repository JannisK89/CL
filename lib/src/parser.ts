import { readdirSync } from "fs";

export type RequestData = {
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  expectedStatus?: string;
  headers: Record<string, string>;
  body: string;
  params: Record<string, string>;
};

export type Collection = {
  name: string;
  baseURL?: string;
  requests: RequestData[];
};

export const parseRequestFile = async () => {
  const requests: Map<string, RequestData[]> = new Map();
  const files = readdirSync("./requestFiles");

  for (const file of files) {
    const content: RequestData[] = await Bun.file(
      `./requestFiles/${file}`
    ).json();
    requests.set(file.substring(0, file.indexOf(".")), content);
  }
  console.log(requests);
};
