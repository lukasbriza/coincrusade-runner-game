import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import del from "rollup-plugin-delete";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import glslify from "rollup-plugin-glslify";
import { fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import builtins from "rollup-plugin-node-builtins";

export default {
  input: "src/main.ts",
  output: {
    file: "./dist/bundle.js",
    name: "PhaserTemplate",
    format: "iife",
    indent: false,
    sourcemap: true,
    minifyInternalExports: false,
  },
  plugins: [
    url({
      emitFiles: true,
    }),
    builtins(),
    typescript(),
    postcss({
      extensions: [".css"],
    }),

    glslify(),
    nodeResolve({
      extensions: ["ts", "tsx"],
    }),
    commonjs({
      sourceMap: true,
      ignoreGlobal: false,
    }),
    serve({
      open: true,
      contentBase: ["public", "dist"],
      host: "localhost",
      port: 8080,
      verbose: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
    livereload({
      watch: "dist",
    }),
    del({
      targets: "dist/*",
      runOnce: true,
    }),
    copy({
      targets: [{ src: "index.html", dest: "dist/" }],
      copyOnce: true,
    }),
  ],
};
