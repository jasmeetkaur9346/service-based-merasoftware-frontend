import { useState, useMemo } from "react";
import { 
  buildDependencyGraph, 
  selectWithDependencies, 
  deselectWithDependents 
} from "../logic/dependencyGraph";

export default function useFeatures(modules) {

  // 1. Build dependency graph only once
  const graph = useMemo(() => buildDependencyGraph(modules), [modules]);

  // 2. Store selected features
  const [selected, setSelected] = useState(new Set());

  // 3. Toggle logic using dependency rules
  const toggleFeature = (key) => {
    if (selected.has(key)) {
      // user is removing feature
      setSelected(prev => deselectWithDependents(prev, key, graph));
    } else {
      // user is adding feature
      setSelected(prev => selectWithDependencies(prev, key, graph));
    }
  };

  return {
    selected,
    toggleFeature,
  };
}
