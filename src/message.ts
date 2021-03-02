import chalk from "chalk";

export const printHelloMessage = () => {
  console.log(chalk.keyword("violet").underline("Hello Mel"));
};

export const printUnderaged = () => {
  console.log(chalk.redBright("Sorry you are too young"));
};
