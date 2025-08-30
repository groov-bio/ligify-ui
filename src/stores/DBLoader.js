import { useEffect } from "react";
import { useDBStore } from "./db.store";

export default function DBLoader({ path = "/ligifyDB.json" }) {
  const loadDB = useDBStore((s) => s.loadDB);
  useEffect(() => { loadDB(path); }, [loadDB, path]);
  return null;
}