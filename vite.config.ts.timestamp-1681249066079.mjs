// vite.config.ts
import { defineConfig } from "file:///home/raulps819/porticosnator/app-ts/node_modules/vitest/dist/config.js";
import path from "path";
import react from "file:///home/raulps819/porticosnator/app-ts/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/home/raulps819/porticosnator/app-ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "@interfaces",
        replacement: path.resolve(__vite_injected_original_dirname, "src/entities/interfaces")
      },
      {
        find: "@classes",
        replacement: path.resolve(__vite_injected_original_dirname, "src/entities/classes")
      },
      {
        find: "@types",
        replacement: path.resolve(__vite_injected_original_dirname, "src/entities/types")
      },
      {
        find: "@types-ui",
        replacement: path.resolve(__vite_injected_original_dirname, "src/entities/ui.types")
      },
      {
        find: "@utils",
        replacement: path.resolve(__vite_injected_original_dirname, "src/utils")
      },
      {
        find: "@config",
        replacement: path.resolve(__vite_injected_original_dirname, "src/config")
      },
      {
        find: "@components",
        replacement: path.resolve(__vite_injected_original_dirname, "src/components")
      },
      {
        find: "@styles",
        replacement: path.resolve(__vite_injected_original_dirname, "src/styles")
      },
      {
        find: "@hooks",
        replacement: path.resolve(__vite_injected_original_dirname, "src/hooks")
      },
      {
        find: "@context",
        replacement: path.resolve(__vite_injected_original_dirname, "src/context")
      }
    ]
  },
  plugins: [react()],
  test: {
    coverage: {
      reporter: ["text"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9yYXVscHM4MTkvcG9ydGljb3NuYXRvci9hcHAtdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3JhdWxwczgxOS9wb3J0aWNvc25hdG9yL2FwcC10cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9yYXVscHM4MTkvcG9ydGljb3NuYXRvci9hcHAtdHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAaW50ZXJmYWNlcycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2VudGl0aWVzL2ludGVyZmFjZXMnKSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAY2xhc3NlcycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2VudGl0aWVzL2NsYXNzZXMnKSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAdHlwZXMnLFxuXHRcdFx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9lbnRpdGllcy90eXBlcycpLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmluZDogJ0B0eXBlcy11aScsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2VudGl0aWVzL3VpLnR5cGVzJyksXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaW5kOiAnQHV0aWxzJyxcblx0XHRcdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpbmQ6ICdAY29uZmlnJyxcblx0XHRcdFx0cmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29uZmlnJyksXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaW5kOiAnQGNvbXBvbmVudHMnLFxuXHRcdFx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaW5kOiAnQHN0eWxlcycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmluZDogJ0Bob29rcycsXG5cdFx0XHRcdHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2hvb2tzJyksXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaW5kOiAnQGNvbnRleHQnLFxuXHRcdFx0XHRyZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZXh0JyksXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0sXG5cdHBsdWdpbnM6IFtyZWFjdCgpXSxcblx0dGVzdDoge1xuXHRcdGNvdmVyYWdlOiB7XG5cdFx0XHRyZXBvcnRlcjogWyd0ZXh0J10sXG5cdFx0fSxcblx0fSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFGbEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ047QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLHlCQUF5QjtBQUFBLE1BQy9EO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsTUFDNUQ7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUMxRDtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLHVCQUF1QjtBQUFBLE1BQzdEO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQ2pEO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ2xEO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdEQ7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDbEQ7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDakQ7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDbkQ7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNULFVBQVUsQ0FBQyxNQUFNO0FBQUEsSUFDbEI7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
