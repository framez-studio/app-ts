import { defineConfig } from 'vitest/config'
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
		],
	},
	plugins: [react()],
	test: {
		coverage: {
			reporter: ['text'],
		},
	},
})
