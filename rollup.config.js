import rollup from "rollup";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import cssnext from "postcss-cssnext";
import nested from "postcss-nested";
import spawn from "cross-spawn";
import pkg from "./package.json";

const watcher = rollup.watch({});

watcher.on("event", event => {
  if (event.code === "START") {
    spawn("webpack-dev-server", { stdio: "inherit" });
  }
});

const babelOptions = {
  babelrc: false,
  exclude: "node_modules/**",
  presets: [
    [
      "env",
      {
        modules: false
      }
    ],
    "react"
  ],
  plugins: ["transform-object-rest-spread", "external-helpers"]
};

const postcssOptions = {
  plugins: [cssnext(), nested()]
  // extract : './build'
};

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd"
    },
    plugins: [postcss(postcssOptions), babel(babelOptions)],
    external: ["react"],
    name: "ClickToEdit",
    globals: {
      react: "React"
    }
  },
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [postcss(postcssOptions), babel(babelOptions)],
    external: ["react"]
  }
];
