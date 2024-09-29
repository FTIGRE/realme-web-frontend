# Clean Architecture Overview

Is a software design pattern intended to separate concerns and make systems more modular and maintainable. It divides an application into several layers, each with its own responsibility. This separation allows for better scalability, testability, and flexibility in managing changes.

## Layers

- **Presentation**
- **Domain**
- **Data**
- **Infrastructure**

### 1. Presentation Layer

The Presentation Layer is responsible for everything that the user interacts with. It contains the User Interface (UI) and the components needed to display data to the user. This layer should be decoupled from the business logic and domain-specific code.

- Handles user interactions (e.g., through buttons, inputs, etc.)
- Sends requests to the Domain layer for business logic
- Displays results and handles UI-specific concerns like navigation or view rendering

In web or mobile applications, this layer typically includes controllers, views, or UI components.

### 2. Domain Layer

The Domain Layer contains the business logic and rules of the application. It should be independent of other layers such as data and infrastructure. This ensures that business rules remain unchanged regardless of UI or data access modifications.

- Core entities that represent the essential data and rules
- Business rules and use cases (e.g., services or interactors)
- Domain-specific logic, which is highly reusable

### 3. Data Layer

The Data Layer is responsible for accessing and managing data. It handles communication with external data sources such as databases or APIs, and translates this data into entities that the Domain Layer can use.

- Repositories: Provide an abstraction to retrieve and store data
- Data sources: Interfaces that interact with APIs, databases, or any external systems
- Data mappers: Translate raw data into domain entities

### 4. Infrastructure Layer

The Infrastructure Layer supports the other layers by providing common utilities and services such as logging, networking, or external communication. It typically includes third-party libraries or frameworks.

- Contains implementation details like frameworks for logging, messaging, etc.
- Infrastructure services and adapters that the other layers depend on
- Abstracts away low-level system details that aren't directly part of business logic

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
