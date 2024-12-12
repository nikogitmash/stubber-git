import terser from '@rollup/plugin-terser'; // Minifies output
import resolve from '@rollup/plugin-node-resolve'; // Resolves Node.js modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS to ES modules
import { babel } from '@rollup/plugin-babel'; // Transpiles ES6+ to older JavaScript
import postcss from 'rollup-plugin-postcss'; // Processes and minifies CSS

export default {
  input: 'src/stublib.js', // Entry point
  output: {
    file: 'dist/webflow-bundle.js', // Final bundle
    format: 'iife', // Suitable for direct use in Webflow
    name: 'WebflowCustomCode', // Prevents global variable conflicts
    sourcemap: true, // Enables debugging with source maps
  },
  plugins: [
    resolve(), // Resolves imports from node_modules
    commonjs(), // Converts CommonJS to ES Modules
    babel({
      exclude: 'node_modules/**', // Avoid transpiling dependencies
      babelHelpers: 'bundled', // Ensures Babel helpers are included in the bundle
      compact: false, // Disables compact mode to avoid deoptimization
    }),
    postcss({
      extract: true, // Extracts CSS to a separate file
      minimize: true, // Minifies CSS
    }),
    terser(), // Minifies JavaScript for production
  ],
  treeshake: {
    moduleSideEffects: false, // Ensures tree-shaking removes unused code
  },
};
