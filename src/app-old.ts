import prompts from "prompts";
import chalk from "chalk";

const askfordata = async () => {
  const answers = await prompts([
    {
      type: "number",
      name: "age",
      message: "How old are you?",
      validate: (value: number) =>
        value < 18 ? `Sorry, you have to be 18` : true,
    },
    {
      type: "password",
      name: "secret",
      message: "Tell me a secret",
    },
    {
      type: "confirm",
      name: "confirmed",
      message: "Can you confirm?",
    },
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

    {
      type: "date",
      name: "birthday",
      message: `What's your birthday?`,
      validate: (date: number) =>
        date > Date.now() ? `Your birthday can't be in the future` : true,
    },
  ]);
};
askfordata();
