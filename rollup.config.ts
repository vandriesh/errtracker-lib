import resolve from 'rollup-plugin-node-resolve';
// @ts-ignore
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
// @ts-ignore
import { uglify } from 'rollup-plugin-uglify';

// @ts-ignore
function buildOptions(libraryName) {
  return {
    input: `src/bootstrap/${libraryName}.ts`,
    output: [
      // { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
      // { file: pkg.module, format: 'es', sourcemap: true }
      {
        file: `dist/${libraryName}.es5.js`,
        name: camelCase(libraryName),
        format: 'iife',
        sourcemap: true
      }
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**'
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({
        useTsconfigDeclarationDir: true,
        objectHashIgnoreUnknownHack: true,
        clean: true
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps()
    ]
  };
}

// @ts-ignore
function buildWithMinOptions(libraryName) {
  const config = buildOptions(libraryName);

  return [
    config,
    {
      ...config,
      output: [
        {
          ...config.output[0],
          file: `dist/${libraryName}.es5.min.js`
        }
      ],
      plugins: [...config.plugins, uglify()]
    }
  ];
}
const rollupOptions = buildWithMinOptions('errtracker-lib');
const slackOptions = buildWithMinOptions('errtracker-slack-lib');
const uniqueSlackOptions = buildWithMinOptions('errtracker-unique-slack-lib');

export default [...slackOptions, ...rollupOptions, ...uniqueSlackOptions];
