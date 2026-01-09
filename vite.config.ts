import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/', // 关键配置：确保资源（JS/CSS/图片）基于根路径加载，解决Vercel白屏
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // 注：这里重复定义了，删除一个重复项（不影响功能，但更规范）
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'), // 别名配置没问题，无需修改
      }
    }
  };
});
