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
