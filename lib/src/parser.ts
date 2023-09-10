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
  baseUrl?: string;
  requests: RequestData[];
};

export const parseRequestFiles = async (): Promise<Map<string, Collection>> => {
  const requests: Map<string, Collection> = new Map();
  const files = readdirSync("./requests");

  for (const file of files) {
    try {
      const content: Collection = await Bun.file(`./requests/${file}`).json();
      requests.set(content.name, content);
    } catch (error) {
      console.error(error);
    }
  }
  return requests;
};
