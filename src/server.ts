import http from "http";
import dotenv from "dotenv";
import {
  connectDB,
  readPasswordDoc,
  createPasswordDoc,
  deletePasswordDoc,
  updatePasswordDoc,
  updatePasswordValue,
} from "./db";
import { handleDelete, handleGet, handlePost } from "./routes";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "private-manager-melanie");

const server = http.createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Your new password</h1>");
    return;
  }

  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  if (request.method === "GET") {
    handleGet(response, passwordName);
    return;
  }
  if (request.method === "POST") {
    handlePost(request, response);
    return;
  }
  if (request.method === "DELETE") {
    handleDelete(response, passwordName);
    return;
  }

  if (request.method === "PUT") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 409;
      response.end();
      return;
    } else response.statusCode = 204;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(await updatePasswordDoc(passwordName, {})));
    return;
  }

  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}🍀`);
});
