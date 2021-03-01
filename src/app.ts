console.log("Hello Mel");

// process.argv.forEach((val, index) => {
//   if (val === "-v") {
//     console.log("0.1.0");
//   }
//   //   console.log(`${index}: ${val}`);
// });

// console.log(process.argv.slice(2));

// const args = process.argv.slice(2)
// const command = args[0]

//destructure
const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("set something");
} else if (command === "get") {
  console.log("Get something");
}
