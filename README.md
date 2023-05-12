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

const useSharedLocale = createSharedState("en");

function useSharedLocale() {
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
function ExampleComponent() {
  const locale = useSharedLocale();
  return <p>{locale}</p>;
}
```
