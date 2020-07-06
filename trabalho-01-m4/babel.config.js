module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config/*": ["./src/config/*"],
          "@routers/*": ["./src/routers/*"],
          "@models/*": ["./src/models/*"],
          "@controllers/*": ["./src/controllers/*"],
        },
      },
    ],
  ],
  ignore: [
    "**/*.spec.ts",
    "**/*.test.ts",
    "node_modules/**/*",
    "package.json",
    "yarn.lock",
    "*.js",
  ],
};
