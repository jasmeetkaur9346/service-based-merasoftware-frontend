// dependencyGraph.js
// Generic helper for modules that have dependencies between them

/**
 * modules: [
 *   { key: "booking", deps: [] },
 *   { key: "payment", deps: ["booking"] },
 *   ...
 * ]
 */
export function buildDependencyGraph(modules) {
  const depsMap = new Map();         // key => [dependencies]
  const dependentsMap = new Map();   // key => [who depends on me]

  modules.forEach((mod) => {
    const { key, deps = [] } = mod;

    depsMap.set(key, deps);

    deps.forEach((depKey) => {
      if (!dependentsMap.has(depKey)) {
        dependentsMap.set(depKey, []);
      }
      dependentsMap.get(depKey).push(key);
    });
  });

  return { depsMap, dependentsMap };
}

/**
 * When user selects a module:
 * - add this key
 * - also auto-add its dependencies
 */
export function selectWithDependencies(selectedSet, key, graph) {
  const { depsMap } = graph;
  const next = new Set(selectedSet);

  function dfs(currentKey) {
    if (next.has(currentKey)) return;
    next.add(currentKey);

    const deps = depsMap.get(currentKey) || [];
    deps.forEach((dep) => dfs(dep));
  }

  dfs(key);
  return next;
}

/**
 * When user unselects a module:
 * - remove this key
 * - also remove anything that depends on it
 */
export function deselectWithDependents(selectedSet, key, graph) {
  const { dependentsMap } = graph;
  const next = new Set(selectedSet);

  function dfs(currentKey) {
    if (!next.has(currentKey)) return;
    next.delete(currentKey);

    const dependents = dependentsMap.get(currentKey) || [];
    dependents.forEach((depKey) => dfs(depKey));
  }

  dfs(key);
  return next;
}
