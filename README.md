# react-shared-state-hook

a simple hook for sharing state between sibling components

## Installation

```
npm install @development-laboritories/react-shared-state-hook
```

or

```
yarn add @development-laboritories/react-shared-state-hook
```

## Basic Usage

Use the following to import the `createSharedHook` function which is used to create a hook with shared state:

```
import { createSharedState } from "@development-laboritories/react-shared-state-hook";
```

Now we can pass in an `initialValue` in this case **"en"** and we get back a new shared state hook:

```ts
const useSharedLocale = createSharedState("en");
```

Next let's add some logic for updating the state and returning the now shared `locale`

```ts
export function useSharedLocale() {
  const [locale, setLocale] = useSharedLocale(); // locale will be "en"

  useEffect(() => {
    const deviceLocale = "fr"; // example value
    setLocale(deviceLocale);
  }, []);

  return locale;
}
```

To use this value just import the hook above

```ts
import { useLocale } from "./useSharedLocale";

function ExampleComponentOne() {
  const locale = useSharedLocale();
  return <p>{locale}</p>;
}

function ExampleComponentTwo() {
  const locale = useSharedLocale();
  return <p>{locale}</p>;
}

function App() {
  return (
    <>
      <ExampleComponentOne />
      <ExampleComponentTwo />
    </>
  );
}
```

Both of the states will show the same value!
