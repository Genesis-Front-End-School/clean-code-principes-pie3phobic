[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/SJ5YWrI-)

# Implemented Clean Layers Architecture

Folder structure before:
```
├───components
│   └───__tests__
├───helpers
│   └───__tests__
└───pages
    ├───api
    └───__tests__
```
Folder structure after:
```
├───domain
│   └───__tests__
├───infrastructure
│   └───api
├───pages
│   └───__tests__
└───ui
    ├───common
    ├───course
    ├───courses
    ├───index
    └───__tests__
```

# Layers Implementation

Clean Architecture is a layered front-end architecture that emphasizes separation of concerns and testability. The architecture includes multiple layers, such as presentation, domain, and infrastructure and application. The presentation layer handles user input and output, the domain layer contains business logic, application layer organizes interactionss between different modules of the application and the infrastructure layer provides external dependencies and interfaces with the outside world, in my example this layers works with API functionality.

![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/15511ad0-285a-44aa-ae9e-458d7264f2d4)

This scheme means that the Infrastructure Layer is shared across all other layers. The Application Layer can reference code in the Domain Layer and UI Layer (a layer below).  UI Layer can import code from the shared Infrastructure layer.
A -> B means than A "sees" B and can import from it

## UI Layer:
Reorganized components folder: divided all previous components into according folders inside /ui folder.
- Common folder includes components thar are reused all across the pages (for example, header, footer, etc.);
- Index, Course, Courses folders include specific components that will be rendered only accordingly to their specific pages
![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/725f5d67-6ecf-409f-86d6-9dff1ab14158)
The UI Layer also called Presentation or Interface Layer includes all reusable, presentational components.
These components are kept simple and easy to reuse excluding any business logic.

## Domen Layer:
![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/7f9b6630-1aa0-4e0e-bbfe-d63181110479)

## Application Layer:
![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/1120364c-e7e5-4f44-a8f2-1e99fd97a01f)

## Infrastructure folder:
![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/53926df9-b09f-400d-9953-b0c8538c3cd9)




-----

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

npm i

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
