import { Dispatch, SetStateAction } from 'react'

/**
 * This class is used to coordinate shared state between components. It is not intended to be
 * used directly, but rather through the useSharedState hook.
 * 
 * @param initialState any - the initial state of the shared state
 */
export class SharedState<T> {
  private subscriptions = new Map<string, Dispatch<SetStateAction<T>>>();
  private sharedState: T;

  constructor(initialState: T) {
    this.sharedState = initialState;
  }

  // set the current shared state (only call from setState)
  private setSharedState = (nextState: SetStateAction<T>): void => {
    if (nextState instanceof Function) {
      const prevState = this.sharedState;
      this.sharedState = nextState(prevState);
    } else {
      this.sharedState = nextState;
    }
  }

  // create a unique identifier for the component subscribing to the shared state
  private createId = (id: string = 'sharedState', count = 0): string => {
    if (id in this.subscriptions) {
      console.warn(`[SharedState] ${id} already exists. Creating unique id...`);
      return this.createId(`${id}${count}`, count + 1);
    } else {
      return id;
    }
  }

  // update the shared state that will be published to all subscribers
  public setState = (nextState: SetStateAction<T>): void => {
    this.setSharedState(nextState);
    this.subscriptions.forEach((setState) => {
      setState(this.sharedState);
    })
  };

  // start subscribing to shared state updates
  public subscribe = (name: string | undefined, setState: Dispatch<SetStateAction<T>>) => {
    const subscriptionId = this.createId(name);
    this.subscriptions.set(subscriptionId, setState);
    return () => {
      this.subscriptions.delete(subscriptionId);
    };
  };

  // returns shared initial state
  public get initialState() {
    return this.sharedState;
  }
}
