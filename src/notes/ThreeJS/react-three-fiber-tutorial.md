# React-Three-Fiber Tutorial (Draft)

_A rough draft for a tutorial on getting up and going with react-three-fiber. Aimed at people new to ThreeJS who know React_

## Steps

- Install Create React App
- Add react-three-fiber and three
- What do all ThreeJS scenes need?
- Create three component
- Add scene
- Add Light
- Add Camera
- Add Object

## Intro

This tutorial will walk you through the steps of adding react-three-fiber to a React project. react-three-fiber (RTF) is an awesome library that allows us to use ThreeJS with a declarative React style.

When learning RTF, most tutorials threw me right into a full scene, without explaining the purpose behind half the code I was copy-pasting. When I went to make my own projects they failed because I didn't understand the fundamentals.

With this tutorial I'll try to explain every bit of code and the reason behind it.

## Project Setup

We'll start off with a pretty standard React app. If you want to add react-three-fiber to an existing project you can skip this first part.

### Create React App

Create React App gets us up and running quickly, but we'll clear out some of the boilerplate.

In your terminal, go to the directory you store your projects and run:

```bash
npx create-react-app react-three-fiber-tutorial
```

`react-three-fiber-tutorial` above is the name of our app. Name it whatever you'd like.

Create React App already installs all node modules we need, so let's move into the directory, open our code editor, and run the server.

```bash
cd react-three-fiber-tutorial
code .
npm start
```

You'll see our starter page with the rotating logo. We've confirmed that the installation worked. Now let's bring in react-three-fiber.

### React-Three-Fiber

In your terminal, press `CTRL C` to stop the server. [React-three-fiber](https://github.com/react-spring/react-three-fiber) relies on the [ThreeJS](https://threejs.org/) library, so we need to install both.

```bash
npm install three react-three-fiber
```

Head into `App.js` and wipe out everything inside the `return`, leaving just a `div`. Remove the import for the logo as well.

```js
import React from "react";
import "./App.css";

function App() {
  return <div></div>;
}

export default App;
```

You can delete App.test.js as it's going to fail now, and testing is outside the scope of this tutorial.

## Create a React-Three-Fiber Component

We could turn App.js into our react-three-fiber component, but we're going to give it an isolated component that we'll import. You'll commonly see ThreeJS projects as full screen experiences, but you can use it alongside normal DOM elements, too.

In your `src/` folder create `Scene.js`.

```js
import React from "react";
import { Canvas } from "react-three-fiber";

function Scene() {
  return <Canvas></Canvas>;
}

export default Scene;
```

We're creating a basic React component and only importing one object, `Canvas`. We'll be using lights, cameras and objects in our scene, but we don't need to import them, because we'll pass them into Canvas and it'll handle it for us.

There are a few things that every scene needs:

- A **camera**, through which we see the scene
- **Mesh**, which is our objects in the scene. Each mesh needs **geometry** to define its shape and a **material** to define the way it appears.
- **Light**(s), to illuminate our scene

The Canvas object gives us a default **perspective camera** to start with, but we'll need to provide the rest ourselves.

### Adding Mesh

Let's add our first object, a box. We'll add a `<mesh>` element to our scene and give it a geometry and material element as children.

```jsx
<Canvas>
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" color="tomato" />
  </mesh>
</Canvas>
```

Hit save and check the app in the browser. You should see a little black square. Let's talk about what's happening here.

`boxBufferGeometry` is what defines the shape of the object as a box. It's one of the **primitive** shapes that ThreeJS gives us access to, along with spheres, cylinders, cones, [and lots others](https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html).

The `boxBufferGeometry` object takes an array of three arguments, `width`, `height`, and `depth`. Changing the `args` to `[4,1,1]` gives us a long box. The other property we need is to tell it to attach to the mesh as `geometry`.

`meshStandardMaterial` tells our geometry how to look. If geometry is the HTML, materials are the CSS. Here we start off basic, telling it to attach as a `material` and passing it a web-color, `tomato`.

But wait, if we passed it `tomato`, why is our box black?

If you said "Because we need lights" then give yourself a pat on the back. Do it.

### Adding Light

We'll start off by adding an **ambient light** to our scene. Ambient lights don't have any directionality, they just generally illuminate from all angles without casting shadows. It takes an argument of a color string, and `hsl` is perfect for this.

```js
<Canvas>
  <ambientLight args="hsl(0, 0%, 100%)" />
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" color="tomato" />
  </mesh>
</Canvas>
```

Now we see our tomato colored box, but it's super flat and boring as is. I want to add some animation, but first we'll need to do a small bit of refactoring.

## Making Mesh Components

We've hit a point where we _have to_ move our box into a separate component if we want to animate it. We'll use a hook from RTF called `useFrame`, which needs the Context API that `Canvas` exposes, so it can't be run from our `Scene` component.

You're going to want to create components like this for all your mesh going forward.

First let's just move our box into its own function.

```js
import React from "react";
import { Canvas } from "react-three-fiber";

function Box(props) {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="tomato" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas>
      <ambientLight args="hsl(0, 0%, 100%)" />
      <Box />
    </Canvas>
  );
}

export default Scene;
```

This already makes our `Scene` component easier to understand.

### Adding Animation

Now we'll bring in `useFrame` from `react-three-fiber` along with the `useRef` hook from `react`. We need `useRef` to target the `<mesh>` within our function and change its properties.

```js
import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";

function Box(props) {
  const boxMesh = useRef();
  useFrame(
    () => (boxMesh.current.rotation.x = boxMesh.current.rotation.y += 0.01)
  );

  return (
    <mesh ref={boxMesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="tomato" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas>
      <ambientLight args="hsl(0, 0%, 100%)" />
      <Box />
    </Canvas>
  );
}

export default Scene;
```

First we create a ref called `boxMesh` and pass that to our `mesh` object.

`useFrame` is called on every frame rendered, so if our animation is 60 frames-per-second, it'll be called 60 times each second.

So while we've got a spinning box, we have a couple issues to improve on.

1. The box is super small.
2. The box is a flat color, showing no dimensionality

#1 is a CSS issue, while #2 is a lighting issue in our scene.

Our canvas will take up the full width of the page but will only be 150px by default. We'll add a class to our `<Scene>` and define it in `App.css`. Wipe out the rest of `App.css` while you're there, we won't use it.


```js
...
<Canvas className="scene">
...
```

```css
.scene {
  min-height:100vh;
}
```

Now we've got our scene taking up the full viewport. Time to deal with the lighting issue.

I mentioned that `ambientLight` hits our scene from all angles, which is why we don't have any sense of dimension on our shape. Let's add a directional light to our scene.

We'll add a `pointLight`, which emits light from a single point in all directions. Kinda like putting a tiny little sun in your scene.

```js
<pointLight color='hsl(0, 0%, 40%)' intensity={1}  />
```

```
Notes for me for later

Plan out what you want the steps to be before going any further

Add the part where we look at the light source helpers


```
