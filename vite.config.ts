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

/**
 * @summary 在服务端生成 CSP Nonce,解决 Style 'unsafe-inline' 的问题。
 * @description CSP支持使用 Nonce 和 Hash 来限制特定来源的脚本执行。
 * 可以在服务器端生成一个随机的 Nonce 值，并在 HTTP 头中包含'Content-Security-Policy'时，将该 Nonce 值添加到策略指令中。
 *
 * 注意:
 * 是在服务端的处理。
 */
// const generateNonce = () => {
//   const nonce = Math.random().toString(36).substring(2, 10);
//   return `'nonce-${nonce}'`;
// };

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
              `style-src 'self' 'unsafe-inline';` + // Tip: 在 vite 中缺少对严格 CSP 的支持，暂时未找到合适的解决方案，临时写法
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
        '@': fileURLToPath(new URL('./source/src', import.meta.url)),
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
