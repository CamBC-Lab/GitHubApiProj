import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';


dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  envDir: './enviroment',
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || '3000'),
  },
  preview: {
    port: parseInt(process.env.PORT || '3000'),
    host: true
  }
});
