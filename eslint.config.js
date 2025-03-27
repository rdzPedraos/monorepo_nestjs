import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
    // Configuración base para archivos JavaScript
    js.configs.recommended,

    // Configuraciones para TypeScript
    ...tseslint.configs.recommended,

    // Configuración de TypeScript para archivos específicos
    {
        files: ['**/*.ts', '**/*.tsx'],
        ...tseslint.configs.recommendedTypeChecked,
        languageOptions: {
            parserOptions: {
                project: ['./apps/*/tsconfig.json'],
            },
        },
        rules: {
            // Reglas específicas para TypeScript
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },

    // Configuración para React
    {
        files: ['**/*.jsx', '**/*.tsx', 'apps/client/**/*.js', 'apps/client/**/*.ts'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    // Ignorar archivos
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', '.turbo/**', 'coverage/**'],
    },
];
