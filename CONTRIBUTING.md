# Contributing to @artagon/ui

Thanks for your interest in contributing! This guide will help you get set up.

## Development Setup

```bash
git clone https://github.com/artagon/ui.git
cd ui
npm install
```

### Commands

| Command                | Description          |
| ---------------------- | -------------------- |
| `npm run dev`          | Watch mode build     |
| `npm run build`        | Production build     |
| `npm run test`         | Run tests            |
| `npm run test:watch`   | Watch mode tests     |
| `npm run lint`         | Lint src/ and tests/ |
| `npm run format`       | Format all files     |
| `npm run format:check` | Check formatting     |
| `npm run typecheck`    | TypeScript check     |
| `npm run storybook`    | Start Storybook      |

## Workflow

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Ensure `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run test` all pass
4. Write or update tests for your changes
5. Push and open a PR against `main`

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). The commit-msg hook enforces this automatically.

```
feat: add new Accordion component
fix: resolve className merge issue in Badge
docs: update README with Select examples
test: add missing Modal a11y tests
chore: update dependencies
```

## Adding a Component

1. Create the component in `src/primitives/` or `src/composed/`
2. Accept `className` prop and merge via `cn()`
3. Use `forwardRef` for interactive elements
4. Export from the category's `index.ts` and from `src/index.ts`
5. Add tests in `tests/`
6. Named exports only (no `export default`)

## Component Guidelines

- Every component accepts `className` merged via `cn()`
- Use `forwardRef` on interactive elements (Button, Input, Select, Modal)
- Extend native HTML attributes where appropriate
- No icon library dependency — accept `ReactNode` icon props
- Export props interfaces alongside components
- Size variants use `'sm' | 'md' | 'lg'`
- Dark-first styling with Tailwind utility classes

## Code Style

- TypeScript strict mode
- Prettier formats on commit (see `.prettierrc`)
- ESLint catches issues (see `eslint.config.js`)
- Single quotes, trailing commas, 100 char line width
