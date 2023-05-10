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

![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/15511ad0-285a-44aa-ae9e-458d7264f2d4)

The most important rule is that a layer shouldn't be aware of any layers above it. This is expressed by the direction of arrows and understanding it is fundamental. Those are a few ways to understand what relation A -> B means:

A has reference of B
A knows about B
A can import from B (B can't import from A)
A is looking into B

## UI Layer:
Reorganized components folder: divided all previous components into according folders inside /ui folder.
- Common folder includes components thar are reused all across the pages (for example, header, footer, etc.);
- Index, Course, Courses folders include specific components that will be rendered only accordingly to their specific pages
![image](https://github.com/Genesis-Front-End-School/clean-code-principes-pie3phobic/assets/115817261/725f5d67-6ecf-409f-86d6-9dff1ab14158)
The UI Layer also called Presentation or Interface Layer includes all reusable, presentational components.
These components are kept simple and easy to reuse excluding any business logic.


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
