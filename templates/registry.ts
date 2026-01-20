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
  services: {},
  hooks: {},
  utils: {},
  lib: {},
  types: {},
  styles: {},
};

const frontendNextFeature: FolderTree = {
  app: {},
  components: {},
  modules: {},
  lib: {},
  hooks: {},
  types: {},
};

const frontendNextDomain: FolderTree = {
  app: {},
  domains: {},
  shared: { components: {}, hooks: {}, utils: {} },
  lib: {},
  types: {},
};

const frontendReactLayered: FolderTree = {
  src: {
    components: {},
    services: {},
    hooks: {},
    utils: {},
    pages: {},
    lib: {},
    styles: {},
  },
  public: {},
};

const frontendReactFeature: FolderTree = {
  src: {
    components: {},
    modules: {},
    hooks: {},
    utils: {},
    lib: {},
  },
  public: {},
};

const frontendReactDomain: FolderTree = {
  src: {
    domains: {},
    shared: { components: {}, hooks: {}, utils: {} },
    lib: {},
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

const backendNodeLayered: FolderTree = {
  src: {
    controllers: {},
    services: {},
    repositories: {},
    models: {},
    utils: {},
    config: {},
  },
  tests: {},
};

const backendNodeFeature: FolderTree = {
  src: {
    modules: {},
    common: {},
    config: {},
    utils: {},
  },
  tests: {},
};

const backendNodeDomain: FolderTree = {
  src: {
    domains: {},
    shared: {},
    config: {},
  },
  tests: {},
};

const backendNestLayered: FolderTree = {
  src: {
    modules: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: {},
};

const backendNestFeature: FolderTree = {
  src: {
    modules: {},
    common: {},
    config: {},
  },
  test: {},
};

const backendNestDomain: FolderTree = {
  src: {
    domains: {},
    common: {},
    config: {},
  },
  test: {},
};

const backendNextLayered: FolderTree = {
  app: { api: {}, layout: {} },
  lib: { services: {}, utils: {} },
  types: {},
};
const backendNextFeature: FolderTree = {
  app: { api: {}, layout: {} },
  modules: {},
  lib: {},
  types: {},
};
const backendNextDomain: FolderTree = {
  app: { api: {}, layout: {} },
  domains: {},
  lib: {},
  types: {},
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

export function getTemplate(config: GeneratorConfig): FolderTree {
  const key = templateKey(config);
  const template = TEMPLATES[key];
  if (template) return JSON.parse(JSON.stringify(template)) as FolderTree;
  // Fallback: backend node feature
  return JSON.parse(JSON.stringify(backendNodeFeature)) as FolderTree;
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

  const m = structure.modules;
  if (typeof m === "object" && m !== null) {
    containers.push(m as FolderTree);
    return containers;
  }

  const src = structure.src as FolderTree | undefined;
  if (src) {
    const sm = src.modules;
    if (typeof sm === "object" && sm !== null)
      containers.push(sm as FolderTree);
  }

  return containers;
}
