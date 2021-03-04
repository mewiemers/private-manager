import { printHelloMessage } from "./message";
import {
  askForAge,
  askConfirm,
  askForPassword,
  chooseColor,
} from "./questions";

printHelloMessage();

const run = async () => {
  const age = await askForAge();
  //   if (!isUnderaged(age)) {
  //     printUnderaged();
  //     askfordata();
  //     return;
  //   }
  askForPassword();
  askConfirm();
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
