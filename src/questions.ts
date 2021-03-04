import prompts from "prompts";

export const askForAge = async (): Promise<number> => {
  const ageresponse = await prompts({
    type: "number",
    name: "age",
    message: "How old are you?",
  });
  return ageresponse.age;
};

export const askForPassword = async (): Promise<string> => {
  const pwresponse = await prompts({
    type: "password",
    name: "secret",
    message: "Tell me a secret",
  });
  return pwresponse.secret;
};

export const askConfirm = async (): Promise<boolean> => {
  const response = await prompts({
    type: "confirm",
    name: "confirmed",
    message: "Can you confirm?",
  });
  return response.confirmed;
};

type Color = {
  color: "#ff0000" | "#00ff00" | "#ffff00" | "#0000ff";
};

export const chooseColor = (): Promise<Color> =>
  prompts([
    {
      type: "select",
      name: "color",
      message: "Pick a color",
      choices: [
        { title: "Red", value: "#ff0000" },
        { title: "Green", value: "#00ff00" },
        { title: "Yellow", value: "#ffff00" },
        { title: "Blue", value: "#0000ff" },
      ],
    },
  ]);

export const askForPasswordValue = async (): Promise<string> => {
  const response = await prompts({
    type: "password",
    name: "passwordValue",
    message: "New Password?",
  });
  return response.passwordValue;
};

type Action = {
  command: "get" | "set";
  passwordName: string;
};
export const askForAction = (): Promise<Action> =>
  prompts([
    {
      type: "select",
      name: "command",
      message: "Wat willste?",
      choices: [
        { title: "Get a password", value: "get" },
        { title: "Set a password", value: "set" },
      ],
    },
    {
      type: "text",
      name: "passwordName",
      message: "Which password?",
    },
  ]);
export const askForPasswordName = async (): Promise<string> => {
  const response = await prompts({
    type: "text",
    name: "passwordname",
    message: "What is the name of your Password?",
  });
  return response.passwordname;
};
