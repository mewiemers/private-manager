import { printHelloMessage, printUnderaged } from "./message";
import {
  askForAge,
  askConfirm,
  askForPassword,
  chooseColor,
} from "./questions";
import { isUnderaged } from "./command";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

printHelloMessage();

const run = async () => {
  //   const url = process.env.MONGODB_URL;

  //   try {
  //     const client = await MongoClient.connect(url, {
  //       useUnifiedTopology: true,
  //     });
  //     console.log("Connected to DB!");

  //     const db = client.db("private-manager-melanie");
  //     await db.collection("inventory").insertOne({
  //       item: "canvas",
  //       qty: 200,
  //       tags: ["polyester"],
  //       size: { h: 28, w: 35.5, unit: "cm" },
  //     });
  //     client.close();
  //   } catch (error) {
  //     console.error(error);
  //   }

  const age = await askForAge();
  if (!isUnderaged(age)) {
    printUnderaged();
    run();
    return;
  }
  await askForPassword();
  await askConfirm();
  const choose = await chooseColor();
  switch (choose.color) {
    case "#0000ff":
      "Blue";
      break;
    case "#00ff00":
      "Green";
      break;
    case "#ff0000":
      "Red";
      break;
    case "#ffff00":
      "Yellow";
  }
};
run();
