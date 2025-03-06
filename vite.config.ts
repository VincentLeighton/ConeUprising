/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
			enabled: true,
			exclude: [
				'src/main.tsx',
				'coverage/**',
				'dist/**',
				'**/[.]**',
				'packages/*/test?(s)/**',
				'**/*.d.ts',
				'**/virtual:*',
				'**/__x00__*',
				'**/\x00*',
				'cypress/**',
				'test?(s)/**',
				'test?(-*).?(c|m)[jt]s?(x)',
				'**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
				'**/__tests__/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
				'**/vitest.{workspace,projects}.[jt]s?(on)',
				'**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
				'src/utils/test-utils.tsx',
			],
			include: ['src/**'],
		},
  }
});
