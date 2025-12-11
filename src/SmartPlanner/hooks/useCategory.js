import { useState, useEffect } from "react";
import categories from "../data/categories";

export default function useCategory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(categories);
  }, []);

  return { categories: list };
}
