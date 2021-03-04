import { printHelloMessage, printUnderaged } from "./message";
import {
  askForAge,
  askConfirm,
  askForPassword,
  chooseColor,
  askForAction,
} from "./questions";
import { handleGetPassword, handleSetPassword, isUnderaged } from "./command";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  getCollection,
  readPasswordDoc,
  updatePasswordValue,
} from "./db";
dotenv.config();

printHelloMessage();

type CommandToFunction = {
  set: (passwordName: string) => Promise<void>;
  get: (passwordName: string) => Promise<void>;
};

const commandToFunction: CommandToFunction = {
  set: handleSetPassword,
  get: handleGetPassword,
};

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "private-manager-melanie");
    const action = await askForAction();
    const commandFunction = commandToFunction[action.command];
    await commandFunction(action.passwordName);
    // await createPasswordDoc({
    //   name: "Mel",
    //   value: "12345",
    // });
    // await readPasswordDoc("Melanie");
    // await updatePasswordValue("Melanie", "test123");
    // await getCollection("passwords");
    // await deletePasswordDoc("Melanie");
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
  // await askForPassword();export
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

  // const age = await askForAge();
  //   if (!isUnderaged(age)) {
  //     printUnderaged();
  //     askfordata();
  //     return;
  //   }
  // askForPassword();
  // askConfirm();
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
  // }
};
run();
