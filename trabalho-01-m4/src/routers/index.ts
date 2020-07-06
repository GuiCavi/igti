import path from "path";
import fs from "fs";

// const loadRoutes = () => {
//   try {
//     const routes = fs
//       .readdirSync(__dirname)
//       .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
//       .reduce(
//         (acc, file) => [...acc, require(path.resolve(__dirname, file))],
//         []
//       );

//     return routes;
//   } catch (error) {
//     console.log("Fail on load route files", error.message);
//     console.log(error);
//   }
// };

export { default as AccountRouter } from "./AccountRouter";
