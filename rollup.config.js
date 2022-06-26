import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './scripts/index.js',
  output: [{ file: './assets/script.min.js', format: 'iife', plugins: [terser()] }],
  plugins: [nodeResolve()],
};
