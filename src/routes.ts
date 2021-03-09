import http from "http";
import {
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  PasswordDoc,
} from "./db";

export const handleGet = async (
  response: http.ServerResponse,
  passwordName: string
) => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
};

export const handleDelete = async (
  response: http.ServerResponse,
  passwordName: string
) => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 202;
  response.end(JSON.stringify(await deletePasswordDoc(passwordName)));
  return;
};

export const handlePost = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const passwordDoc = await parseJSONBody<PasswordDoc>(request);

  const isSuccessful = await createPasswordDoc(passwordDoc);
  if (!isSuccessful) {
    response.statusCode = 400;
    response.end();
    return;
  }

  response.statusCode = 201;
  response.end();
};

const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let json = "";
    request.on("data", (chunk) => {
      json += chunk;
    });
    request.on("end", () => {
      const body = JSON.parse(json);
      resolve(body);
    });
  });
};