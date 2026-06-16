import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        // Proxy para evitar CORS en desarrollo local
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5001",
                changeOrigin: true,
            },
            "/socket.io": {
                target: "http://127.0.0.1:5001",
                changeOrigin: true,
                ws: true,
            },
            "/trivia": {
                target: "http://127.0.0.1:5001",
                changeOrigin: true,
            },
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        // Correr tests en un solo proceso para evitar out-of-memory
        pool: "forks",
        poolOptions: {
            forks: {
                singleFork: true,
                // Aumentar la memoria disponible para Node.js
                execArgv: ["--max-old-space-size=2048"],
            },
        },
    },
});