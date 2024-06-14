# Todo List Application (Taller Challenge)

## Application Demo
The purpose of this project is to build a POC application that simulates a Todo List application with a Microfrontend (MFE) architecture. This project consists of two Microfrontends. The first one (MFE1) acts as the main application and imports all the user interfaces from the second microfrontend. The second one contains all the logic for the Todo List feature. Below is a demo of the application.

![Docker Services](/images/demo.gif?raw=true "Docker Services")

## Features

- **Todo Creation:** Users can input a new todo task description and add it to the list.
- **Todo Status:** Tasks have a checkbox to mark them as completed or active, with visual distinctions for completed tasks.
- **Todo Persistence:** Todo items are saved using the browser’s localStorage to persist across page refreshes and sessions.
- **Filtering (Bonus):** Buttons or mechanisms to filter the list by “All”, “Active”, and “Completed” tasks.

## Local Execution with Docker
The following command will install and start both microfrontends developed in React:

`docker-compose stop && docker-compose up --build -d --remove-orphans`

![Docker Services](/images/docker.png?raw=true "Docker Services")

This is the final result of the services that you should see if everything works as expected.

## Architectural Choices
- **Microfrontend Architecture:** The application is divided into two microfrontends to demonstrate modular design. MFE1 serves as the main container, while MFE2 handles the Todo List functionality.
- **TypeScript:** The entire project is written in TypeScript for type safety and maintainability.
- **State Management:** React's built-in state management is used to keep the solution simple and straightforward.

## Thought Process
This project was developed with the following considerations:

- **Scalability:** The MFE architecture allows for easy scalability and maintenance.
- **User Experience:** Focused on creating a seamless and intuitive user interface for managing todo tasks.
- **Code Quality:** Emphasized clean, readable, and well-structured code with comprehensive unit tests.


## Testing

To perform the frontend tests, we should execute `npm run test`

![tests](/images/testfront.png?raw=true "tests")

