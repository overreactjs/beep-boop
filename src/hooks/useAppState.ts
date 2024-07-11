import { useCallback, useMemo, useState } from "react";

export function useAppState<T>(initial: T) {
  const [state, setState] = useState<T>(initial);

  const go = useCallback((state: T) => () => setState(state), []);

  return useMemo(() => ({ state, go }), [go, state]);
}
  