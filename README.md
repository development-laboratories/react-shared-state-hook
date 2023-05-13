# 🪝 React Shared State Hook

| react-shared-state-hook | 1.0.5 |
| ----------------------- | ----- |

A simple yet powerful way to share state between components and hooks.

- The convenience of `redux` without the complexity

- Lightweight and easy to use

- Quickly prototype

## Why this package?

<img width="994" alt="Screenshot 2023-05-13 at 1 32 07 AM" src="https://github.com/development-laboratories/react-shared-state-hook/assets/10716803/9b3a49b6-d552-4a60-bf96-6a102e2ac13b">

Sharing state is one of the most important concepts in React, and while there exists numerous solutions from `redux`, `rxjs`, `context`, etc. each has their own drawbacks.

This package provides a quick and seemless way to share state from a single integer to comlpex objects, between as many components as you need!

## Installation

```bash
npm install @development-laboritories/react-shared-state-hook
```

or

```bash
yarn add @development-laboritories/react-shared-state-hook
```

## Basic Usage

Use the following to import the `createSharedHook` function which is used to create a hook with shared state:

```ts
import { createSharedState } from "@development-laboritories/react-shared-state-hook";
```

This will return a hook initialized with the given value that we can use anywhere we want

```ts
const useSharedLocale = createSharedState("english");
```

For example let's say we want to share `locale` we can just create a new hook and call `useSharedLocale` like so
```
export function useLocale() {
  const [locale, setLocale] = useSharedLocale(); // locale will be "english"

  useEffect(() => {
    setLocale(Device.systemLocale); // example
  }, [])

  return { locale, setLocale }
}
```

Now anywhere we want to access or update the `locale` it's as easy as

```ts
import { useLocale } from "./useLocale"

function SpanishLanguageButton() {
  const { setLocale } = useLocale()
  return <button onClick={() => setLocale("spanish")}>{locale}</button>
}

function ItalianLanguageButton() {
  const { setLocale } = useLocale()
  return <button onClick={() => setLocale("italian")}>{locale}</button>
}

function CurrentLanguage() {
  const { locale } = useLocale()
  return <p>{`The current language is ${locale}`}</p>
}
```

All three of these components will share exactly the same state, no matter where they are in the DOM!
