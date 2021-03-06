# Code-Splitting

*Notes taken mostly on [React's Code Splitting Docs](https://reactjs.org/docs/code-splitting.html).*

## Bundling

React apps get their files 'bundled', which is when files are imported and merged into a bundle. Takes a ton of JS files and brings them into one or so files.

## Code Splitting

Bundling is great but putting ALL the JS for a huge app into one file means huge load times up front, loading in code that might not get used. Instead we can *split* the bundle and only send what's needed. 

## import()

Using the dynamic `import()` syntax makes code splitting easy in your app. 

The typical way we'd import:
```js
import Button from './button;
```

But with the import() syntax:

```js
import("./button").then(Button=>{
  return <Button />;
})
```

Webpack sees `import Button from './button' and knows how to handle that for splitting. So far this is only available in Next.JS and CreateReactApp

## React.lazy

*As of 3/21/2020 this isn't available for SSR*

This lets you render a dynamic import as a regular component. Gets around some weirdness from the dynamic `import()` method. This also plays nicely with Suspense.

**Before**
```js
import OtherComponent from './OtherComponent';
```
**After**
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

`React.lazy` takes a function that calls a component through that `import()` syntax. You then use `Suspense` to render that component, providing a loading state to display until that component comes in. 

You can wrap several lazy components with a single Suspense component. 

### Error Boundaries

If the module that `OtherComponent` was in fails to load it triggers an error. Error Boundaries are a type of React component that you can wrap your components in to show a different state if they error out. 

## Route-based code splitting

Code splitting can be hard, so a good place to start is with your routes. This was done pretty manually with Angular, where you imported all the modules into each section. 

Here's how you'd split with React Router:

```js
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
```

## Named Exports

`React.lazy` only supports default exports. To use named exports you can use an intermediate component that imports and reexports it as a default. Seems like a weird pattern and you'd be better off just doing default. 