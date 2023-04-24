import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@interfaces',
				replacement: path.resolve(__dirname, 'src/entities/interfaces'),
			},
			{
				find: '@classes',
				replacement: path.resolve(__dirname, 'src/entities/classes'),
			},
			{
				find: '@types',
				replacement: path.resolve(__dirname, 'src/entities/types'),
			},
			{
				find: '@types-ui',
				replacement: path.resolve(__dirname, 'src/entities/ui.types'),
			},
			{
				find: '@utils',
				replacement: path.resolve(__dirname, 'src/utils'),
			},
			{
				find: '@config',
				replacement: path.resolve(__dirname, 'src/config'),
			},
			{
				find: '@components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{
				find: '@styles',
				replacement: path.resolve(__dirname, 'src/styles'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__dirname, 'src/hooks'),
			},
			{
				find: '@context',
				replacement: path.resolve(__dirname, 'src/context'),
			},
			{
				find: '@workers',
				replacement: path.resolve(__dirname, 'src/workers'),
			},
		],
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				start_url: '.',
				name: 'FramezStudio',
				short_name: 'Framez',
				description: 'FramezStudio',
				display: 'standalone',
				background_color: '#10161dff',
				theme_color: '#10161dff',
				icons: [
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			manifestFilename: 'manifest.webmanifest',
		}),
	],
})
