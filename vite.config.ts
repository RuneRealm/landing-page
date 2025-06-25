import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'AR.IO React App',
        short_name: 'AR.IO App',
        description: 'AR.IO React Application Template',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ar\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ar-io-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create a vendors chunk for node_modules
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-ga4')) {
              return 'analytics';
            }
            if (id.includes('arweave') || id.includes('ao-js-sdk')) {
              return 'arweave-vendor';
            }
            if (id.includes('@emotion') || id.includes('@mui') || id.includes('styled-components')) {
              return 'ui-vendor';
            }
            // Group remaining node_modules into chunks by first level directory
            const modulePath = id.split('node_modules/').pop();
            if (modulePath) {
              const module = modulePath.split('/')[0].replace(/^@/, '');
              return `vendor-${module}`;
            }
            return 'vendor-other';
          }
          
          // Split app code by feature areas
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('/')[0];
            return `page-${page}`;
          }
          if (id.includes('/shared/')) {
            const shared = id.split('/shared/')[1].split('/')[0];
            return `shared-${shared}`;
          }
        }
      }
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Generate sourcemaps for production
    sourcemap: true,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable asset optimization
    assetsInlineLimit: 4096,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1500
  },
  // Enable SWC minification
  esbuild: {
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  // Optimize dev server
  server: {
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  }
})
