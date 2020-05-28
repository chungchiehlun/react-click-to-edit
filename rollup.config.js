import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

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
  plugins: ["@babel/proposal-class-properties"],
  exclude: "node_modules/**"
};

const postcssOptions = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3
    }),
    require("postcss-nested")
  ]
};

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd",
      name: "ClickToEdit",
      globals: {
        react: "React"
      }
    },
    plugins: [
      postcss(postcssOptions),
      babel(babelOptions),
      resolve(),
      commonjs(),
      // https://github.com/rollup/rollup/issues/487
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    ],
    external: ["react"]
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
    plugins: [
      postcss(postcssOptions),
      babel(babelOptions),
      resolve(),
      commonjs()
    ],
    external: ["react"]
  }
];
