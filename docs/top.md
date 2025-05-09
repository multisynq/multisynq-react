The Multisynq React bindings is a simple framework for using Multisynq together with React.js. It allows to write the Multisynq's View side code in React that works with the Multisynq Model code.
This documentation assumes that you are familiarized with Multisynq's [main concepts](../client/index.html#main-concepts) and how [views](../client/index.html#views) and [models](../client/index.html#models) interact via [events](../client/index.html#events).

## Overview

The [`@multisynq/react`](https://www.npmjs.com/package/@multisynq/react) package provides a simple framework for using Multisynq together with React.
The main principle of [`@multisynq/react`](https://www.npmjs.com/package/@multisynq/react) is that React components fully assume the role of the [View](../client/index.html#views) side of Multisynq.
Behind the scenes, a normal Multisynq View is still created to act as a slim contact point between the Multisynq [Model](../client/index.html#models) and the React components, but all View side logic is implemented in the React components.

React components interact with Multisynq using **hooks** for accessing the features the Multisynq Library offers, such as subscribing to model events or publishing events among models and other views. These tutorials assume that you are familiar with the "functional-component + hooks" style of writing React apps. If you aren't, [the official React tutorial on hooks](https://react.dev/reference/react/hooks) is a good starting point.

## Tutorials

You can start by taking the tutorials of simple application examples in the "Tutorials" section in the navigation bar.

* [Simple Counter]{@tutorial 1_React_Simple_Counter}
* [Music Box]{@tutorial 2_React_Music_Box}
* [Mondrian]{@tutorial 3_0_React_Mondrian}

## Documentation

The [documentation](./global.html) contains minimal usage examples, which will also be displayed in IDEs such as VS Code with full TypeScript declarations.  The type annotations for `publish` and `subscribe` help to ensure the data sent and received conforms to the same type, for instance.


## React Together

[React Together](https://reacttogether.dev) is a library built on top of `@multisynq/react`. It provides additional hooks and utility components to simplify the development of collaborative React applications:

* Hooks for shared state management across multiple users
* Hooks for simultaneous function execution across connected views
* Pre-built utility components for displaying connected views and managing the current session

These features allow developers to easily create interactive and synchronized user experiences. For more information on React Together, refer to its [documentation](https://reacttogether.dev/#/getting-started).