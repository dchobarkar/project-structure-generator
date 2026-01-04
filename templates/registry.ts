/**
 * Template registry: base folder trees per project type + framework + architecture,
 * and helpers to apply framework options (Next.js src/route groups, React store, etc.)
 * and to find where feature modules go (getModulesContainers).
 */

import type {
  FolderTree,
  ProjectType,
  Framework,
  Architecture,
  GeneratorConfig,
} from "@/types/generator";

/** Base templates: one FolderTree per (projectType, framework, architecture). */
const frontendNextLayered: FolderTree = {
  app: {},
  components: {},
  modules: {},
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
    modules: {},
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

const frontendVueLayered: FolderTree = {
  src: {
    components: {},
    views: {},
    modules: {},
    composables: {},
    utils: {},
    router: {},
    assets: {},
  },
  public: {},
};

const frontendVueFeature: FolderTree = {
  src: {
    components: {},
    features: {},
    composables: {},
    utils: {},
    assets: {},
  },
  public: {},
};

const frontendVueDomain: FolderTree = {
  src: {
    domains: {},
    shared: { components: {}, composables: {}, utils: {} },
    assets: {},
  },
  public: {},
};

const frontendAngularLayered: FolderTree = {
  src: {
    app: { core: {}, features: {}, shared: {} },
    modules: {},
  },
  public: {},
};

const frontendAngularFeature: FolderTree = {
  src: {
    app: { core: {}, features: {}, shared: {} },
  },
  public: {},
};

const frontendAngularDomain: FolderTree = {
  src: {
    app: { core: {}, domains: {}, shared: {} },
  },
  public: {},
};

const svelteKitLayered: FolderTree = {
  src: {
    lib: { components: {}, utils: {}, server: {} },
    modules: {},
    routes: {},
    params: {},
  },
  static: {},
  tests: {},
};

const svelteKitFeature: FolderTree = {
  src: {
    lib: { components: {}, modules: {}, server: {} },
    routes: {},
    params: {},
  },
  static: {},
  tests: {},
};

const svelteKitDomain: FolderTree = {
  src: {
    lib: { domains: {}, shared: {}, server: {} },
    routes: {},
    params: {},
  },
  static: {},
  tests: {},
};

const remixLayered: FolderTree = {
  app: { routes: {}, components: {}, utils: {} },
  modules: {},
  public: {},
};

const remixFeature: FolderTree = {
  app: { routes: {}, components: {}, features: {} },
  public: {},
};

const remixDomain: FolderTree = {
  app: { routes: {}, domains: {}, shared: {} },
  public: {},
};

const fullstackLayered: FolderTree = {
  apps: {
    web: {
      components: {},
      modules: {},
      services: {},
      hooks: {},
      utils: {},
      pages: {},
    },
    api: {
      modules: {},
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
    routes: {},
    controllers: {},
    middleware: {},
    modules: {},
    services: {},
    repositories: {},
    models: {},
    utils: {},
    config: {},
  },
  tests: { unit: {}, integration: {}, e2e: {} },
};

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

const backendNestLayered: FolderTree = {
  src: {
    modules: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: { e2e: {} },
};

const backendNestFeature: FolderTree = {
  src: {
    modules: {},
    common: { filters: {}, guards: {}, interceptors: {}, decorators: {} },
    config: {},
  },
  test: { e2e: {} },
};

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
  modules: {},
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
  frontend_vue_layered: frontendVueLayered,
  frontend_vue_feature: frontendVueFeature,
  frontend_vue_domain: frontendVueDomain,
  frontend_angular_layered: frontendAngularLayered,
  frontend_angular_feature: frontendAngularFeature,
  frontend_angular_domain: frontendAngularDomain,
  frontend_sveltekit_layered: svelteKitLayered,
  frontend_sveltekit_feature: svelteKitFeature,
  frontend_sveltekit_domain: svelteKitDomain,
  frontend_remix_layered: remixLayered,
  frontend_remix_feature: remixFeature,
  frontend_remix_domain: remixDomain,
  fullstack_sveltekit_layered: svelteKitLayered,
  fullstack_sveltekit_feature: svelteKitFeature,
  fullstack_sveltekit_domain: svelteKitDomain,
  fullstack_remix_layered: remixLayered,
  fullstack_remix_feature: remixFeature,
  fullstack_remix_domain: remixDomain,
  backend_sveltekit_layered: svelteKitLayered,
  backend_sveltekit_feature: svelteKitFeature,
  backend_sveltekit_domain: svelteKitDomain,
  backend_remix_layered: remixLayered,
  backend_remix_feature: remixFeature,
  backend_remix_domain: remixDomain,
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
  fullstack_vue_layered: frontendVueLayered,
  fullstack_vue_feature: frontendVueFeature,
  fullstack_vue_domain: frontendVueDomain,
  fullstack_angular_layered: frontendAngularLayered,
  fullstack_angular_feature: frontendAngularFeature,
  fullstack_angular_domain: frontendAngularDomain,
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
  backend_vue_layered: frontendVueLayered,
  backend_vue_feature: frontendVueFeature,
  backend_vue_domain: frontendVueDomain,
  backend_angular_layered: frontendAngularLayered,
  backend_angular_feature: frontendAngularFeature,
  backend_angular_domain: frontendAngularDomain,
  backend_node_layered: backendNodeLayered,
  backend_node_feature: backendNodeFeature,
  backend_node_domain: backendNodeDomain,
  backend_nestjs_layered: backendNestLayered,
  backend_nestjs_feature: backendNestFeature,
  backend_nestjs_domain: backendNestDomain,
};

/** Builds the template key from config (e.g. "frontend_nextjs_feature"). */
const templateKey = (config: GeneratorConfig): TemplateKey =>
  `${config.projectType}_${config.framework}_${config.architecture}`;

/** Keys moved under src/ when Next.js "Use src directory" is enabled. */
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

/** Applies Next.js options: route groups under app/, and moving top-level keys under src/ if useSrcDirectory. */
const applyNextJsOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
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
};

/** Returns a deep copy of the base template for config, with all framework options applied. */
const getTemplate = (config: GeneratorConfig): FolderTree => {
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
  applyVueOptions(structure, config);
  applyAngularOptions(structure, config);
  applySvelteKitOptions(structure, config);
  applyRemixOptions(structure, config);
  return structure;
};

/** Removes tests/ when SvelteKit "Include tests" is off. */
const applySvelteKitOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "sveltekit") return;
  const opts = config.options?.sveltekit;
  if (opts?.includeTests === false && structure.tests !== undefined) {
    delete structure.tests;
  }
};

/** Toggles tests/ for Remix based on includeTests. */
const applyRemixOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "remix") return;
  const opts = config.options?.remix;
  if (opts?.includeTests === false && structure.tests !== undefined) {
    delete structure.tests;
  }
  if (opts?.includeTests === true && !structure.tests) {
    (structure as FolderTree).tests = {};
  }
};

/** Adds stores/ for Pinia, tests/ for Vue when options are set. */
const applyVueOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "vue") return;
  const opts = config.options?.vue;
  const src = structure.src as FolderTree | undefined;
  if (!src) return;
  if (opts?.stateManagement === "pinia") {
    (src as FolderTree).stores = {};
  }
  if (opts?.includeTests) {
    (structure as FolderTree).tests = { unit: {}, e2e: {} };
  }
};

/** Toggles e2e/ for Angular based on includeTests. */
const applyAngularOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "angular") return;
  const opts = config.options?.angular;
  if (opts?.includeTests !== false) {
    (structure as FolderTree).e2e = {};
  } else if (structure.e2e !== undefined) {
    delete structure.e2e;
  }
};

/** Removes tests/ when Node "Include tests" is off. */
const applyNodeOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "node") return;
  const opts = config.options?.node;
  if (opts?.includeTests === false && structure.tests !== undefined) {
    delete structure.tests;
  }
};

/** Removes test/ when NestJS "Include tests" is off. */
const applyNestOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
  if (config.framework !== "nestjs") return;
  const opts = config.options?.nestjs;
  if (opts?.includeTests === false && structure.test !== undefined) {
    delete structure.test;
  }
};

/** Adds store/ or contexts/ for React state, __tests__/ when includeTests. */
const applyReactOptions = (
  structure: FolderTree,
  config: GeneratorConfig,
): void => {
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
};

/** Returns the FolderTree containers where feature modules (auth, billing, etc.) should be added. Depends on project type and architecture (e.g. structure.modules, apps.web.modules, src.features, structure.domains). */
const getModulesContainers = (
  structure: FolderTree,
  config: GeneratorConfig,
): FolderTree[] => {
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
    const appForDomain = structure.app as FolderTree | undefined;
    if (
      config.framework === "remix" &&
      appForDomain?.domains &&
      typeof appForDomain.domains === "object"
    ) {
      containers.push(appForDomain.domains as FolderTree);
    }
    const src = structure.src as FolderTree | undefined;
    if (src) {
      const sd = src.domains;
      if (typeof sd === "object" && sd !== null)
        containers.push(sd as FolderTree);
      const lib = src.lib as FolderTree | undefined;
      if (
        config.framework === "sveltekit" &&
        lib?.domains &&
        typeof lib.domains === "object"
      ) {
        containers.push(lib.domains as FolderTree);
      }
      const app = src.app as FolderTree | undefined;
      if (
        config.framework === "angular" &&
        app?.domains &&
        typeof app.domains === "object"
      ) {
        containers.push(app.domains as FolderTree);
      }
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
  if (
    config.framework === "vue" &&
    architecture === "feature" &&
    src?.features &&
    typeof src.features === "object"
  ) {
    containers.push(src.features as FolderTree);
    return containers;
  }
  const lib = src?.lib as FolderTree | undefined;
  if (
    config.framework === "sveltekit" &&
    architecture === "feature" &&
    lib?.modules &&
    typeof lib.modules === "object"
  ) {
    containers.push(lib.modules as FolderTree);
    return containers;
  }
  const app = structure.app as FolderTree | undefined;
  if (
    config.framework === "remix" &&
    architecture === "feature" &&
    app?.features &&
    typeof app.features === "object"
  ) {
    containers.push(app.features as FolderTree);
    return containers;
  }
  const appFromSrc = src?.app as FolderTree | undefined;
  if (
    config.framework === "angular" &&
    architecture === "feature" &&
    appFromSrc?.features &&
    typeof appFromSrc.features === "object"
  ) {
    containers.push(appFromSrc.features as FolderTree);
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
};

export { getTemplate, getModulesContainers };
