import {defineConfig} from "vite"

export default defineConfig({
	plugins: [
		
	],
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				selection: 'src/pages/selection.html',
				questions: 'src/pages/questions.html',
				result: 'src/pages/result.html'
			}
		}
	}
})