import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
    // Configuración para ignorar archivos
    { ignores: ['node_modules/**', 'dist/**', '.turbo/**', '**/vendor/**'] },

    // Limitar el análisis a archivos específicos
    { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
    { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
    tseslint.configs.recommended,
    {
        files: ['src/**/*.{jsx,tsx}'],
        ...pluginReact.configs.flat.recommended,
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
        },
    },
]);
