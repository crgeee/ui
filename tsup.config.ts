import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  onSuccess: async () => {
    mkdirSync('dist/styles', { recursive: true });
    copyFileSync('src/styles/base.css', 'dist/styles/base.css');
  },
  entry: {
    index: 'src/index.ts',
    'primitives/index': 'src/primitives/index.ts',
    'composed/index': 'src/composed/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'utils/index': 'src/utils/index.ts',
    'tokens/index': 'src/tokens/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
