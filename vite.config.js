import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
		// port: 3000,
		// Get rid of the CORS error
		proxy: {
			"/api": {
				target: "https://event-backend-dx9k.vercel.app",
				changeOrigin: true,
				secure: false,
			},
			"/uploads": {
				target: "https://event-backend-dx9k.vercel.app",
				changeOrigin: true,
				secure: false,
			},
			// '/uploads': 'event-backend-dx9k.vercel.app',
		},
		host: true, // required for external access like ngrok
    // origin:'https://577390adeae9.ngrok-free.app', // your current ngrok domain
    // cors: {
    //   origin: ['https://577390adeae9.ngrok-free.app/'],
    //   credentials: true,
    // },
	},
  
})
// verbally-internal-woodcock.ngrok-free.app