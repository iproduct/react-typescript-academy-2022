import { EffectCallback, useEffect } from "react";

export const useOnMount = (f: EffectCallback) => useEffect(() => f(), [])
export const useOnMountAsync = (f: () => Promise<void>) =>
    useEffect(() => {
        f()
    }, []);

// [isLoading, load] = useLoading();
// load(Promise<R>): Promise<R>