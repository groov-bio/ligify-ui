import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

// Async IndexedDB storage for persist()
const idbStorage = {
  getItem: async (name) => (await get(name)) ?? null,
  setItem: async (name, value) => { await set(name, value); },
  removeItem: async (name) => { await del(name); },
};

function toArray(db) {
  return Array.isArray(db) ? db : Object.values(db ?? {});
}

export const useDBStore = create(
  persist(
    (set, get) => ({
      data: null,            // the raw JSON
      status: "idle",        // 'idle' | 'loading' | 'ready' | 'error'
      error: null,
      etag: null,
      lastLoadedAt: 0,
      _byRefseq: null,       // in-memory index (not persisted)

      // Load with stale-while-revalidate semantics + ETag check
      loadDB: async (path = "/ligifyDB.json", opts = {}) => {
        const { force = false, ttlMs = 24 * 60 * 60 * 1000 } = opts;
        const { data, lastLoadedAt, etag } = get();

        // Serve cached data immediately if fresh
        if (!force && data && Date.now() - lastLoadedAt < ttlMs) return;

        set({ status: "loading", error: null });

        try {
          // If we have an ETag, do a cheap HEAD first
          if (etag) {
            const head = await fetch(path, { method: "HEAD", cache: "no-store" });
            const newTag = head.headers.get("ETag") || head.headers.get("etag");
            if (newTag && newTag === etag) {
              set({ status: "ready", lastLoadedAt: Date.now() });
              return;
            }
          }

          const res = await fetch(path, { cache: "force-cache" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const newTag = res.headers.get("ETag") || null;

          set({
            data: json,
            status: "ready",
            error: null,
            etag: newTag,
            lastLoadedAt: Date.now(),
            _byRefseq: null, // reset index; will rebuild lazily
          });
        } catch (e) {
          set({ status: "error", error: e });
        }
      },

      // Selectors / helpers
      asArray: () => toArray(get().data),

      getByRefseq: (refseq) => {
        const state = get();
        if (!state.data) return null;

        // If object keyed by refseq, this is O(1)
        if (!Array.isArray(state.data)) {
          return state.data[refseq] || null;
        }

        // For array data, build a Map once and cache it in memory
        if (!state._byRefseq) {
          const idx = new Map(
            state.asArray().map((r) => [r?.refseq ?? r?.protein?.refseq, r])
          );
          set({ _byRefseq: idx });
        }
        return get()._byRefseq.get(refseq) || null;
      },
    }),
    {
      name: "ligify-db",                         // IndexedDB key
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      // Avoid persisting the transient index
      partialize: (state) => ({
        data: state.data,
        etag: state.etag,
      }),
    }
  )
);
