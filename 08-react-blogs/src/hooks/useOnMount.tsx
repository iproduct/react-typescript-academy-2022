import { useEffect } from "react";


export const useOnMount = (f: () => void ) => useEffect(() => f, [])

