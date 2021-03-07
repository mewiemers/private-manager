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

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "private-manager-melanie");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Your new password</h1>");
    return;
  }

  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  if (request.method === "GET") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
    return;
  }
  if (request.method === "POST") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", async () => {
      const drawName = JSON.parse(data).name;
      const drawValue = JSON.parse(data).value;
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify(
          await createPasswordDoc({
            name: drawName,
            value: drawValue,
          })
        )
      );
    });
    return;
  }
  if (request.method === "DELETE") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    } else response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(await deletePasswordDoc(passwordName)));
    return;
  }

  if (request.method === "PATCH") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 409;
      response.end();
      return;
    } else response.statusCode = 204;
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify(await updatePasswordValue(passwordName, passwordName))
    );
    return;
  }

  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}🍀`);
});
