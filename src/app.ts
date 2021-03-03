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
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  getCollection,
  readPasswordDoc,
  updatePasswordDoc,
} from "./db";
dotenv.config();

printHelloMessage();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "private-manager-melanie");
    await createPasswordDoc({
      name: "Mel",
      value: "12345",
    });
    await readPasswordDoc("Melanie");
    await updatePasswordDoc("Melanie", { value: "test123" });
    await getCollection("passwords");
    await deletePasswordDoc("Melanie");
    await closeDB();
  } catch (error) {
    console.error(error);
  }

  // const age = await askForAge();
  // if (!isUnderaged(age)) {
  //   printUnderaged();
  //   run();
  //   return;
  // }
  // await askForPassword();
  // await askConfirm();
  // const choose = await chooseColor();
  // switch (choose.color) {
  //   case "#0000ff":
  //     "Blue";
  //     break;
  //   case "#00ff00":
  //     "Green";
  //     break;
  //   case "#ff0000":
  //     "Red";
  //     break;
  //   case "#ffff00":
  //     "Yellow";
};
run();
