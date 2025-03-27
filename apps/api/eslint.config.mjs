import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
    // Configuración para ignorar archivos
    { ignores: ['node_modules/**', 'dist/**', '.turbo/**', '**/vendor/**'] },

    // Limitar el análisis a archivos específicos
    { files: ['src/**/*.{js,mjs,cjs,ts}'] },
    { files: ['src/**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.node } },
    { files: ['src/**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
    tseslint.configs.recommended,
]);
