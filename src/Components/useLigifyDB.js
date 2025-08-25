// useLigifyDB.js
import { useEffect, useState } from "react";

export default function useLigifyDB(path = "/ligifyDB.json") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // Let the browser cache do its job; Amplify will CDN this.
        const res = await fetch(path, { signal: ac.signal, cache: "force-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();   // Parses ~11MB on a background thread in Chromium
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, [path]);

  return { data, loading, error };
}
