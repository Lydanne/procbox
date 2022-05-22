import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/procbox.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/procbox.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    ts({ tsconfig: "./tsconfig.json" }),
    commonjs({
      extensions: [".js", ".ts"],
    }),
  ],
});
