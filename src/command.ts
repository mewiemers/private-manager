import { askForPasswordValue, askForPasswordName } from "./questions";
import { readPasswordDoc, createPasswordDoc, closeDB, connectDB } from "./db";
import dotenv from "dotenv";
dotenv.config();

export const isUnderaged = (age: number): boolean => age >= 18;

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === process.env.MASTER_PASSWORD;

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordname = await askForPasswordName();
  const passwordValue = await askForPasswordValue();
  await createPasswordDoc({
    name: passwordname,
    value: passwordValue,
  });
  console.log(`${passwordName}`);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("No password found!");
    return;
  }
  console.log(`${passwordDoc.name}, ${passwordDoc.value}`);
};
