// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        // Archivos y directorios que ESLint debe ignorar
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            '.turbo/**',
            'coverage/**',
            'eslint.config.mjs',
        ],
    },
    // Configuraciones base
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        // Configuración general para todo el proyecto
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser, // Para incluir código del cliente también
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // Reglas comunes para el monorepo
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
        },
    },
    // Configuración específica para React
    {
        files: ['**/*.{jsx,tsx}', 'apps/client/**/*.{js,ts}'],
        plugins: {
            react: (await import('eslint-plugin-react')).default,
            'react-hooks': (await import('eslint-plugin-react-hooks')).default,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    }
);
