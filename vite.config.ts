import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import electron, {
  type ElectronSimpleOptions,
} from 'vite-plugin-electron/simple';
import native from 'vite-plugin-native';
import tailwind from '@tailwindcss/postcss';
import { createHtmlPlugin } from 'vite-plugin-html';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import vueDevTools from 'vite-plugin-vue-devtools';
import renderer from 'vite-plugin-electron-renderer';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';

// https://vite.dev/config/
// import { defineConfig } from 'vite';
// export default defineConfig({
// });

const root = process.cwd();

function rootResolve(...paths: string[]) {
  return resolve(root, ...paths);
}

function registerHtmlPlugin() {
  return createHtmlPlugin({
    minify: true,
    entry: 'source/src/main.ts',
    template: 'index.html',
    inject: {
      tags: [
        {
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content:
              `default-src 'self';` +
              `connect-src 'self' blob: data: https://api.iconify.design;` +
              `style-src 'self' 'unsafe-inline';` +
              `img-src 'self' data: blob:;` +
              `worker-src 'self' blob: data:;` +
              `script-src 'self' blob:;`,
          },
        },
        {
          tag: 'title',
          children: 'Electron-Vue-Vite',
        },
      ],
    },
  });
}

function getElectronConfig() {
  const main = {
    entry: 'source/electron/main.ts',
    vite: {
      build: {
        outDir: 'app/electron',
        sourcemap: true,
        rollupOptions: {
          external: [],
        },
      },
      plugins: [native({})],
    },
  };
  const preload = {
    input: 'source/preload/index.ts',
    vite: {
      build: {
        outDir: 'app/preload',
        sourcemap: true,
        rollupOptions: {
          external: [],
        },
      },
    },
  };
  const renderer = {
    resolve: {},
  };
  const options: ElectronSimpleOptions = { main, preload, renderer };
  return electron(options);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isDev = process.env.NODE_ENV === 'development';
  console.log('command:', command, 'mode:', mode);
  const env = loadEnv(mode, rootResolve('.config'));
  console.log('env:', isDev, env);
  return {
    plugins: [
      vue(),
      vueJsx(),
      isDev && vueDevTools(),
      renderer({}),
      registerHtmlPlugin(),
      getElectronConfig(),
    ].filter(Boolean),
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.json', '.css', '.scss', '.vue'],
      alias: {
        '@': fileURLToPath(new URL('./source', import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
    build: {
      outDir: 'app/public',
      cssCodeSplit: true,
      minify: 'terser',
      sourcemap: true,
      terserOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true,
        },
      },
    },
    server: {
      port: 59080,
      open: false,
    },
  };
};
