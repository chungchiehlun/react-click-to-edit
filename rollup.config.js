import rollup from "rollup";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssNested from "postcss-nested";
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
      "@babel/env",
      {
        modules: false
      }
    ],
    "@babel/react"
  ],
  plugins: ["@babel/proposal-class-properties"]
};

const postcssOptions = {
  plugins: [
    postcssPresetEnv({
      stage: 0
    }),
    postcssNested()
  ]
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
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
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
