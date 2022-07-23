import sourcemaps from 'rollup-plugin-sourcemaps';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './scripts/index.js',
  plugins: [sourcemaps()],
  output: [
    { file: './assets/script.min.js', format: 'iife', sourcemap: true, plugins: [terser()] },
  ],
  plugins: [nodeResolve()],
};
