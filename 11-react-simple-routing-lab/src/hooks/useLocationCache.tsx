import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let cache = new Map();

export default function useLocationCache(url: URL) {
  let location = useLocation();
  let cacheKey = location.key + url;
  let cached = cache.get(cacheKey);

  let [data, setData] = useState(() => {
    // initialize from the cache
    return cached || null;
  });

  let [state, setState] = useState(() => {
    // avoid the fetch if cached
    return cached ? "done" : "loading";
  });

  useEffect(() => {
    if (state === "loading") {
      let controller = new AbortController();
      fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          if (controller.signal.aborted) return;
          // set the cache
          cache.set(cacheKey, data);
          setData(data);
        });
      return () => controller.abort();
    }
  }, [state, url, cacheKey]);

  useEffect(() => {
    setState("loading");
  }, [url]);

  return data;
}