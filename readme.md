# Simple event-emitter library
[![Coverage Status](https://coveralls.io/repos/github/int0h/int-ee2/badge.svg?branch=master)](https://coveralls.io/github/int0h/int-ee2?branch=master)

## Install

```sh
yarn add int-ee2
# or
npm i int-ee2
```

## Use

```ts
type EventTypes = {
    click: (x: number, y: number) => void;
}
const eventEmitter = new EventEmitter<EventTypes>();

// ...

const unsubscribe = eventEmitter.on('click', (x, y) => console.log(x, y));

// ...

eventEmitter.emit('click', 1, 2);

// ...

unsubscribe();
```