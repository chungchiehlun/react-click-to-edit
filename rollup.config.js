import spawn from "cross-spawn";

import rollup from "rollup";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

import cssmodule from "postcss-modules";
import cssnext from "postcss-cssnext";

const generateScopedName = "[name]__[local]___[hash:base64:5]";
const watchOptions = {};
const watcher = rollup.watch({});

watcher.on("event", event => {
  if (event.code === "START") {
    spawn("webpack-dev-server", { stdio: "inherit" });
  }
});

export default {
  input: "src/index.js",
  output: {
    file: "build/index.js",
    format: "cjs"
  },
  external: ["react", "react-dom"],
  plugins: [
    postcss({
      plugins: [
        cssmodule({
          generateScopedName
        }),
        cssnext({
          warnForDuplicates: false
        })
      ],
      extensions: [".css"]
    }),
    babel({
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
      plugins: [
        "transform-object-rest-spread",
        "external-helpers",
        [
          "react-css-modules",
          {
            generateScopedName
          }
        ]
      ]
    }),
    commonjs(),
    globals(),
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    })
  ],
  sourcemap: true
};
