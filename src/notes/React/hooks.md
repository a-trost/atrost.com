# Hooks

Never use inside of `if` statements or `for` loops.

## useState

Allows for using state without class components.

```js
const [isToggled, setIsToggled] = useState(false);
```

You pass the default and you are provided the state as well as a function to update the state.

### useEffect

This is for performing side effects in function components. This happens _after_ a component renders. If your component needs cleaning up it'll return a function.

From the docs:

> If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

```js
const [time, setTime] = useState(new Date());

useEffect(() => {
  const timer = setTimeout(setTime(newDate()), 1000);
  // this next part is for cleanup. It takes the place of `componentWillUnmount`
  // Return a function that cleans up your effect.
  return () => clearTimeout(timer);
});
```

## useContext

A hook that gives us access to the Context API.

```js
const value = useContext(MyContext);
```

This allows us to _read_ the context, but not provide it. We still need `<MyContext.Provider>` in the tree above.

## useReducer

Similar in function to Redux. You pass this hook a reducer function as well as your initial state.

## useRef

```js
const refContainer = useRef(initialValue);
```

Returns a mutable `ref` object where `.current` is initialized to `initialValue`.

You can use it to reference DOM elements and always get the current element.

You can use it for more than just referencing the DOM though. The `ref` object is a generic container. You can use it to set/unset timers and intervals.

## useReducer

Reminder: Reducers take in an old state, perform an action, and return a new state.

`useReducer` takes the reducer function and initial state. It's an alternative to `useState`, especially for more complex state.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

This is a lot like redux. You might have a reducer function like this, which takes in current state and an action.

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
}
```

We have init, which can be an object or function, which just returns the initial state. If it's a function it will create the initial state lazily.

```js
function init(initialCount) {
  return { count: initialCount };
}
```

Then we declare our `useReducer` which gives us our state object and our dispatch function

```js
const [state, dispatch] = useReducer(reducer, initialCount, init);
```

We can show our state in JSX:

```js
Count: {
  state.count;
}
```

And we can add dispatch functions to our buttons as click handlers. Remember, the dispatch function takes an action object.

```js
<button onClick={() => dispatch({ type: "increment" })}>+</button>
```

## useCallback

This seems to be a good alternative to `useMemo` and works in conjunction with a `memo` function, but I don't fully get it yet. Partly confusing because the docs say

> `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

I get this now. The difference is useMemo will call the function you give it if the dependencies changed. `useCallback` gives you a new function that *you* can call. It gives you the function not the result.

## useMemo

`useMemo` is great for preventing something from rerendering unnecessarily. Some functions should only fire if their dependent state changes. You pass `useMemo` the function you want to call, and then the arguments that it should watch for changes.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

In this example, this will only get called if `a` or `b` change.

React warns that this isn't a semantic guarantee and in the future this function might run even if the values weren't changed. It's better to write the code so it still works then optimize with useMemo.



## useLayoutEffect

Typically for manipulating the dom or getting measurements from items. It's identical to `useEffect` in how it takes arguments and returns functions,

`useLayoutEffect` happens syncronously, where `useEffect` doesn't. Render happens then useLayoutEffect happens.

```js
const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });

  return (
    <div>
      <textarea
        onClick={() => {
          setWidth(0); // this is just to trigger a render so useLayoutEffect will run
        }}
        ref={el}
      />
    </div>
  );
};
```

## useImperativeHandle

Exposes functions to parents so they can call a function that affects the child.

## Configure ESLint for Hooks

```bash
npm i -D eslint-plugin-react-hooks
```

then inside your `eslintrc.json`

```json
...
"rules": {
  ...
  "react-hooks/rules-of-hooks": 2,
  "react-hooks/exhaustive-deps": 1
},
"plugins": [
  ...
  "react-hooks
]

```
