import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // a11y rules mirrored from the Biome config.
  {
    rules: {
      'jsx-a11y/prefer-tag-over-role': 'warn', // useSemanticElements
      'jsx-a11y/interactive-supports-focus': 'warn', // useFocusableInteractive
      'jsx-a11y/click-events-have-key-events': 'warn', // useKeyWithClickEvents
      'jsx-a11y/role-has-required-aria-props': 'warn', // useAriaPropsForRole
      '@typescript-eslint/no-non-null-assertion': 'off', // Biome style.noNonNullAssertion: off
    },
  },
  // Turn off ESLint rules that conflict with Prettier. Must stay last.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
