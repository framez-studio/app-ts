import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src'),
			},
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
				find: '@utils',
				replacement: path.resolve(__dirname, 'src/utils'),
			},
			{
				find: '@config',
				replacement: path.resolve(__dirname, 'src/config'),
			},
		],
	},
	test: {
		coverage: {
			reporter: ['text'],
		},
	},
})
