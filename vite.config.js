import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-192x192.jpeg', 'pwa-512x512.jpeg'],
      manifest: {
        name: 'NT Healthcare - Your Health Partner',
        short_name: 'NT Healthcare',
        description: 'E-commerce for healthcare products',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: 'pwa-512x512.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
          {
            src: 'pwa-512x512.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/nthealthcarebackend\.onrender\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
      // Development mein bhi service worker enable
      devOptions: {
        enabled: true,
      },
    }),
  ],
})