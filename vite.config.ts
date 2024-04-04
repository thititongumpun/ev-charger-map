import million from "million/compiler";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "production",
  base: "/",
  injectRegister: 'script',
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "EV Changer Map",
    short_name: "EV Changer Map",
    description: "EV Changer Map Location",
    icons: [
      {
        "src": "icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  },
  devOptions: {
    enabled: true
  },
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), VitePWA(pwaOptions)],
})
