import type {
  FolderTree,
  ProjectType,
  Framework,
  Architecture,
  GeneratorConfig,
} from "@/types/generator";

const frontendNextLayered: FolderTree = {
  app: {},
  components: {},
  lib: {},
  hooks: {},
  utils: {},
  services: {},
  types: {},
  styles: {},
  public: {},
};

const frontendNextFeature: FolderTree = {
  app: {},
  components: {},
  modules: {},
  lib: {},
  hooks: {},
  types: {},
  public: {},
};

const frontendNextDomain: FolderTree = {
  app: {},
  domains: {},
  shared: { components: {}, hooks: {}, utils: {} },
  lib: {},
  types: {},
  public: {},
};

const frontendReactLayered: FolderTree = {
  src: {
    components: {},
    pages: {},
    hooks: {},
    services: {},
    utils: {},
    lib: {},
    assets: {},
    styles: {},
  },
  public: {},
};

const frontendReactFeature: FolderTree = {
  src: {
    components: {},
    features: {},
    hooks: {},
    utils: {},
    lib: {},
    assets: {},
  },
  public: {},
};

const frontendReactDomain: FolderTree = {
  src: {
    domains: {},
    shared: { components: {}, hooks: {}, utils: {} },
    lib: {},
    assets: {},
  },
  public: {},
};

const fullstackLayered: FolderTree = {
  apps: {
    web: { components: {}, services: {}, hooks: {}, utils: {}, pages: {} },
    api: {
      controllers: {},
      services: {},
      repositories: {},
      models: {},
      utils: {},
    },
  },
  packages: { shared: {}, ui: {} },
};

const fullstackFeature: FolderTree = {
  apps: {
    web: { components: {}, modules: {}, lib: {} },
    api: { modules: {}, common: {}, config: {} },
  },
  packages: { shared: {} },
};

const fullstackDomain: FolderTree = {
  apps: {
    web: { domains: {}, shared: {} },
    api: { domains: {}, shared: {} },
  },
  packages: { shared: {}, domains: {} },
};

// Node.js: standard = src/ (all app code), tests/ at root.
// Layered = 3-layer: routes, controllers, middleware, services, repositories, models, utils, config.
const backendNodeLayered: FolderTree = {
  src: {
    routes: {},
    controllers: {},
    middleware: {},
    services: {},
    repositories: {},
    models: {},
    utils: {},
    config: {},
  },
  tests: { unit: {}, integration: {}, e2e: {} },
};

// Feature-based: src/modules (each module = feature), common, config, middleware, utils.
const backendNodeFeature: FolderTree = {
  src: {
    modules: {},
    middleware: {},
    common: {},
    config: {},
    utils: {},
  },
  tests: { unit: {}, integration: {}, e2e: {} },
};

// Domain (DDD): src/domains, shared, config, middleware, utils.
const backendNodeDomain: FolderTree = {
  src: {
    domains: {},
    middleware: {},
    shared: {},
    config: {},
    utils: {},
  },
  tests: { unit: {}, integration: {}, e2e: {} },
};

// NestJS: official = src/ (app.module, main.ts), test/ at root for e2e.
// Layered = modules + common (filters, guards, interceptors, decorators), config.
const backendNestLayered: FolderTree = {
  src: {
    modules: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: { e2e: {} },
};

// Feature-based: src/modules (each module = feature with controller, service, dto), common, config.
const backendNestFeature: FolderTree = {
  src: {
    modules: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: { e2e: {} },
};

// Domain (DDD): src/domains (bounded contexts), common, config.
const backendNestDomain: FolderTree = {
  src: {
    domains: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: { e2e: {} },
};

const backendNextLayered: FolderTree = {
  app: { api: {}, layout: {} },
  lib: { services: {}, utils: {} },
  types: {},
  public: {},
};

const backendNextFeature: FolderTree = {
  app: { api: {}, layout: {} },
  modules: {},
  lib: {},
  types: {},
  public: {},
};

const backendNextDomain: FolderTree = {
  app: { api: {}, layout: {} },
  domains: {},
  lib: {},
  types: {},
  public: {},
};

type TemplateKey = `${ProjectType}_${Framework}_${Architecture}`;

const TEMPLATES: Partial<Record<TemplateKey, FolderTree>> = {
  frontend_nextjs_layered: frontendNextLayered,
  frontend_nextjs_feature: frontendNextFeature,
  frontend_nextjs_domain: frontendNextDomain,
  frontend_react_layered: frontendReactLayered,
  frontend_react_feature: frontendReactFeature,
  frontend_react_domain: frontendReactDomain,
  frontend_node_layered: backendNodeLayered,
  frontend_node_feature: backendNodeFeature,
  frontend_node_domain: backendNodeDomain,
  frontend_nestjs_layered: backendNestLayered,
  frontend_nestjs_feature: backendNestFeature,
  frontend_nestjs_domain: backendNestDomain,
  fullstack_nextjs_layered: fullstackLayered,
  fullstack_nextjs_feature: fullstackFeature,
  fullstack_nextjs_domain: fullstackDomain,
  fullstack_react_layered: fullstackLayered,
  fullstack_react_feature: fullstackFeature,
  fullstack_react_domain: fullstackDomain,
  fullstack_node_layered: fullstackLayered,
  fullstack_node_feature: fullstackFeature,
  fullstack_node_domain: fullstackDomain,
  fullstack_nestjs_layered: fullstackLayered,
  fullstack_nestjs_feature: fullstackFeature,
  fullstack_nestjs_domain: fullstackDomain,
  backend_nextjs_layered: backendNextLayered,
  backend_nextjs_feature: backendNextFeature,
  backend_nextjs_domain: backendNextDomain,
  backend_react_layered: backendNodeLayered,
  backend_react_feature: backendNodeFeature,
  backend_react_domain: backendNodeDomain,
  backend_node_layered: backendNodeLayered,
  backend_node_feature: backendNodeFeature,
  backend_node_domain: backendNodeDomain,
  backend_nestjs_layered: backendNestLayered,
  backend_nestjs_feature: backendNestFeature,
  backend_nestjs_domain: backendNestDomain,
};

function templateKey(config: GeneratorConfig): TemplateKey {
  return `${config.projectType}_${config.framework}_${config.architecture}`;
}

const NEXTJS_SRC_KEYS = [
  "app",
  "components",
  "lib",
  "hooks",
  "utils",
  "services",
  "types",
  "styles",
  "modules",
  "domains",
  "shared",
] as const;

function applyNextJsOptions(
  structure: FolderTree,
  config: GeneratorConfig,
): void {
  if (config.framework !== "nextjs") return;
  const opts = config.options?.nextjs;

  const routeGroups = opts?.routeGroups?.filter(Boolean) ?? [];
  if (routeGroups.length > 0) {
    const appRoot = structure.app as FolderTree | undefined;
    if (appRoot && typeof appRoot === "object") {
      for (const name of routeGroups) {
        (appRoot as FolderTree)[name] = {};
      }
    }
  }

  if (opts?.useSrcDirectory) {
    const src: FolderTree = {};
    for (const key of NEXTJS_SRC_KEYS) {
      const val = structure[key];
      if (val !== undefined && typeof val === "object" && val !== null) {
        src[key] = val as FolderTree;
        delete structure[key];
      }
    }
    structure.src = src;
  }
}

export function getTemplate(config: GeneratorConfig): FolderTree {
  const key = templateKey(config);
  const template = TEMPLATES[key];
  let structure: FolderTree;
  if (template) {
    structure = JSON.parse(JSON.stringify(template)) as FolderTree;
  } else {
    structure = JSON.parse(JSON.stringify(backendNodeFeature)) as FolderTree;
  }
  applyNextJsOptions(structure, config);
  applyReactOptions(structure, config);
  applyNodeOptions(structure, config);
  applyNestOptions(structure, config);
  return structure;
}

function applyNodeOptions(
  structure: FolderTree,
  config: GeneratorConfig,
): void {
  if (config.framework !== "node") return;
  const opts = config.options?.node;
  if (opts?.includeTests === false && structure.tests !== undefined) {
    delete structure.tests;
  }
}

function applyNestOptions(
  structure: FolderTree,
  config: GeneratorConfig,
): void {
  if (config.framework !== "nestjs") return;
  const opts = config.options?.nestjs;
  if (opts?.includeTests === false && structure.test !== undefined) {
    delete structure.test;
  }
}

function applyReactOptions(
  structure: FolderTree,
  config: GeneratorConfig,
): void {
  if (config.framework !== "react") return;
  const opts = config.options?.react;
  const src = structure.src as FolderTree | undefined;
  if (!src) return;

  const state = opts?.stateManagement;
  if (state === "redux" || state === "zustand") {
    (src as FolderTree).store = {};
  } else if (state === "context") {
    (src as FolderTree).contexts = {};
  }

  if (opts?.includeTests) {
    (src as FolderTree)["__tests__"] = {};
  }
}

export function getModulesContainers(
  structure: FolderTree,
  config: GeneratorConfig,
): FolderTree[] {
  const { projectType, architecture } = config;
  const containers: FolderTree[] = [];

  if (projectType === "fullstack") {
    const apps = structure.apps as FolderTree | undefined;
    if (apps) {
      const web = apps.web as FolderTree | undefined;
      const api = apps.api as FolderTree | undefined;
      for (const app of [web, api]) {
        if (!app) continue;
        const c =
          architecture === "domain"
            ? (app.domains as FolderTree)
            : (app.modules as FolderTree);
        if (typeof c === "object" && c !== null) containers.push(c);
      }
    }
    return containers;
  }

  if (architecture === "domain") {
    const d = structure.domains;
    if (typeof d === "object" && d !== null) containers.push(d as FolderTree);
    const src = structure.src as FolderTree | undefined;
    if (src) {
      const sd = src.domains;
      if (typeof sd === "object" && sd !== null)
        containers.push(sd as FolderTree);
    }
    return containers;
  }

  const src = structure.src as FolderTree | undefined;
  if (
    config.framework === "react" &&
    architecture === "feature" &&
    src?.features &&
    typeof src.features === "object"
  ) {
    containers.push(src.features as FolderTree);
    return containers;
  }

  const m = structure.modules;
  if (typeof m === "object" && m !== null) {
    containers.push(m as FolderTree);
    return containers;
  }

  if (src) {
    const sm = src.modules;
    if (typeof sm === "object" && sm !== null)
      containers.push(sm as FolderTree);
  }

  return containers;
}
