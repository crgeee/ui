# @artagon/ui

Dark-first React component library built with Tailwind CSS v4.

## Installation

```bash
npm install @artagon/ui
```

**Peer dependencies:** `react >= 18`, `react-dom >= 18`, `tailwindcss >= 4`

## Usage

```tsx
import { Button, Spinner, useAutoSave } from '@artagon/ui';
import '@artagon/ui/styles/base.css'; // opt-in animations + utilities
```

Sub-path imports also work:

```tsx
import { Button } from '@artagon/ui/primitives';
import { useAutoSave } from '@artagon/ui/hooks';
```

## Components

### Primitives

Button, Input, Select, Badge, Card, Chip, ChipGroup, Modal, Tooltip, Spinner, ButtonSpinner, SaveIndicator, ScoreCard, ErrorBoundary, BarChart, Heatmap

### Composed

FilterBar, NotesList, DataTable, EmptyState, StatCell, StatStrip, Skeleton, ConfirmDialog, Toast, Toaster

### Hooks

useAutoSave, useClickOutside, useDebounce, useLocalStorage, useMediaQuery, useCopyToClipboard

### Utilities

cn, pillStyle, errorMessage, formatRelative

### Tokens

colors, fontFamily, fontSize

## Development

```bash
git clone https://github.com/crgeee/ui.git
cd ui
npm install
npm run dev        # watch mode build
npm run test       # run tests
npm run storybook  # component playground
```

## License

MIT
