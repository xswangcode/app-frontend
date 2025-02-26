import {fileURLToPath, URL} from 'node:url';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
      Components({
          resolvers: [
              ElementPlusResolver(),  // 配置 Element Plus 组件的按需加载
          ],
      }),
  ],
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
