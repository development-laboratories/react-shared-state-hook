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

Create a new hook you would like to share state:

```ts
import { createSharedState } from "@development-laboritories/react-shared-state-hook";

// create a new shared hook which can be used for locale
const useSharedLocale = createSharedState("en");

// now each place this hook is called the state will be the same!
export function useSharedLocale() {
  const [locale, setLocale] = useSharedLocale();

  useEffect(() => {
    const deviceLocale = "fr"; // example: reading preferred device setting
    setLocale(deviceLocale);
  }, []);

  return locale;
}
```

Then in any component which needs this value:

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
