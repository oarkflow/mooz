import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
    define: {
        global: 'globalThis'
    },
    build: {
        assetsDir: "public/assets"
    },
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
            find: './runtimeConfig',
            replacement: './runtimeConfig.browser',
            "./runtimeConfig": "./runtimeConfig.browser",
        },
    },
    plugins: [
        nodePolyfills(),
        NodeGlobalsPolyfillPlugin({
            buffer: true
        }),
        splitVendorChunkPlugin(),
        Unocss(),
        react(),
        AutoImport({// targets to transform
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.md$/, // .md
            ],
            imports: [
                'react',
                'react-router-dom',
                { 'usehooks-ts': ['useCounter', 'useDarkMode'] },
            ],
            dts: true,
        }),
    ],
})
