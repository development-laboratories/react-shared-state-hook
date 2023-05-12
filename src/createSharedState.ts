import { SharedState } from './SharedState';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';

/**
 * Creates a new shared state which can be subscribed to by multiple components via
 * the useSharedState hook.
 * 
 * @param initialState any
 * @returns useSharedState hook
 */
export function createSharedState<T>(initialState: T) {
  const shared = new SharedState(initialState);

  /**
   * useSharedState hook can be used in place of useState and will update all instances that
   * are subscribed.
   *
   * @param id optional string to identify the component subscribing to the shared state
   */
  return function useSharedState(id?: string | undefined): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(shared.initialState);

    useEffect(() => {
      const unsubscribe = shared.subscribe(id, setState);
      return () => unsubscribe();
    }, [id]);

    return [state, shared.setState];
  };
}