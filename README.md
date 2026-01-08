# Project Structure Generator

A developer tooling app that generates scalable, production-ready folder structures based on project type, framework, architecture, and feature modules. Configure options in the sidebar and see the folder tree and CLI commands update in real time.

## Features

- **Project type** — Frontend, Fullstack, or Backend
- **Framework** — Next.js, React, Vue, Angular, SvelteKit, Remix, Node, NestJS (filtered by project type)
- **Architecture** — Layered, Feature, or Domain
- **Framework-specific options** — e.g. Next.js (src directory, route groups), React/Vue (state management, tests), Node/Nest/Vue/Angular/SvelteKit/Remix (include tests)
- **Feature modules** — Preset checkboxes (auth, billing, analytics, notifications) plus custom module names
- **Custom folders** — Add arbitrary paths (e.g. `src/utils/helpers`, `app/api/v2`) that are merged into the tree
- **Collapsible folder tree** — Expand/collapse nodes; “Expand all” / “Collapse all”
- **CLI export** — Copy `mkdir -p` commands to create the structure in your project

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** (icons)

## Project Structure

```structure
├── app/                 # Next.js app (layout, page, globals)
├── components/          # React components
│   ├── ui/              # Shared UI (SelectField, CheckboxField, EditableList, etc.)
│   ├── ConfigPanel.tsx  # Configuration form
│   ├── TreeView.tsx     # Collapsible folder tree
│   └── CLIView.tsx      # CLI commands + copy
├── generator/           # Structure + CLI builders
├── hooks/               # useStableIds
├── lib/                 # Constants (options, route groups, etc.)
├── templates/           # Folder templates per framework/architecture
├── types/               # GeneratorConfig, FolderTree, etc.
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm / yarn)

### Install

```bash
pnpm install
```

### Develop

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## How It Works

1. **Configuration** — Choose project type, framework, and architecture. Optionally enable framework-specific options (e.g. Next.js `src` directory, React state management).
2. **Feature modules** — Select preset modules and/or add custom names; they appear under the appropriate containers (modules, features, or domains) in the generated structure.
3. **Custom folders** — Add paths to inject extra folders anywhere in the tree.
4. **Output** — The folder tree and CLI commands reflect the current config. Use “Copy” in the CLI section to paste `mkdir -p` commands into your terminal.

## License

See [LICENSE](LICENSE).
