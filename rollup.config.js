import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'

const input = './src/index.ts'

export default defineConfig([
  {
    input,
    plugins: [
      nodeResolve(),
      typescript()
    ],
    // external: ['lodash-es'],
    output: [
      {
        format: 'umd',
        file: `dist/index.js`,
        name: 'WindowCallback'
      },
      {
        exports: "named",
        format: 'esm',
        file: `dist/index.esm.js`
      }
    ]
  },
  {
    plugins: [dts()],
    input,
    output: {
      file: `dist/index.d.ts`,
      format: 'esm'
    }
  }
])
