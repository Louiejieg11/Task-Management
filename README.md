# Task Manager

A simple project management application built using **Laravel, Inertia.js, React, MySQL, and Tailwind CSS**.

The application allows users to manage projects by creating, viewing, editing, and deleting project records. Each project includes information such as the client, project name, description, status, priority, start date, and due date.

## Technology Stack

- **Laravel** – Backend framework used for routing, validation, database operations, and application logic.
- **React** – Used to build the frontend interface and reusable components.
- **Inertia.js** – Used as the bridge between Laravel and React. This allows the application to use React for the UI while keeping Laravel responsible for routing and server-side logic.
- **MySQL** – Used for storing project data.
- **Tailwind CSS** – Used for styling the application.
- **Vite** – Used for compiling and serving the React frontend during development.

## Setup Instructions

### Requirements

You will need:

- PHP 8.2+
- Composer
- Node.js and npm
- MySQL
- Laragon or another Laravel-compatible local development environment

### Installation

Clone the repository:

```bash
git clone https://github.com/Louiejieg11/Task-Management.git
cd Task-Management
```

Install Laravel dependencies:

```bash
composer install
```

Install React/frontend dependencies:

```bash
npm install
```

Create the environment file:

```bash
copy .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### Database Setup

Create a MySQL database named `taskmanager`.

Update the database configuration in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskmanager
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run the migrations and seed the sample projects:

```bash
php artisan migrate:fresh --seed
```

This will create the required database tables and insert the sample project data.

## Running the Application

Start the Laravel development server:

```bash
php artisan serve
```

In another terminal, start the Vite development server:

```bash
npm run dev
```

Once both servers are running, open the main project management page:

**http://127.0.0.1:8000**

This is the main page of the application where you can view and manage the projects.

### Quick Start

After completing the installation and database setup:

```bash
php artisan migrate:fresh --seed
php artisan serve
```

In a separate terminal:

```bash
npm run dev
```

Then go to:

```text
http://127.0.0.1:8000
```

## Implementation Approach

I used **Laravel with Inertia.js and React** rather than creating a separate Laravel API and React application.

Laravel handles the backend side of the application, including:

- Routes
- Controllers
- Form validation
- Eloquent models
- Database operations

React handles the user interface, while Inertia connects the two.

For example, the project form uses Inertia's `useForm` hook to submit data to Laravel. This means I don't need to manually create a separate API request layer just to communicate between the React frontend and Laravel backend.

The project CRUD flow is roughly:

```text
React Form
    ↓
Inertia.js
    ↓
Laravel Route
    ↓
ProjectController
    ↓
Form Request Validation
    ↓
Project Model
    ↓
MySQL
```

## Assumptions

- The application is intended to run in a local development environment.
- MySQL is used as the database.
- Projects have four possible statuses: Planning, In Progress, On Hold, and Completed.
- Projects have three possible priorities: Low, Medium, and High.
- The sample projects provided for the assessment are included through a Laravel seeder.
- Laravel's built-in authentication setup is available, although the project routes are currently accessible without authentication for the purposes of the assessment.
- Project IDs are generated automatically by the database.
- The application is accessed through `/projects` after the development servers are started.

# Technical Reflection

## Why did you choose this implementation approach?

I chose Laravel, Inertia.js, and React because I'm comfortable with the Laravel ecosystem and wanted to use React for the frontend.

Inertia made the integration between Laravel and React simpler. Instead of creating a separate REST API and then handling API requests from React, I could keep the routing and backend logic inside Laravel while still building the UI using React.

For this assessment, I felt this was a good fit because the application is mainly a CRUD application and doesn't require the complexity of a completely separate frontend and backend.

It also allowed me to keep the project structure fairly straightforward while still having a modern React-based frontend.

## What tradeoffs did you make?

The main tradeoff was using Inertia instead of building a separate API.

With Inertia, I was able to develop the application faster and avoid having to maintain a separate API layer. Laravel handles the requests and validation, while React handles the UI.

The downside is that the frontend is more closely connected to the Laravel application. If the application were eventually going to support a mobile application or several different frontend clients, I would probably consider creating a dedicated API.

I also focused on the main requirements of the assessment instead of spending too much time on additional features that weren't required.

## What would you improve if given additional time?

If I had more time, I would improve both the functionality and the overall user experience.

Some things I would add are:

- Automated tests for the project CRUD functionality.
- Search and filtering.
- Pagination for larger numbers of projects.
- Better loading and error states.
- A confirmation dialog before deleting a project.
- More detailed authorization and permissions.
- Improved form validation and error messages.
- More responsive and accessible UI components.
- Better handling of empty project lists.
- CI/CD checks using GitHub Actions.

I would also spend more time refactoring some of the components and making the code more reusable.

## What was the most challenging part of this assessment?

The most challenging part was getting Laravel, Inertia.js, and React to work together correctly.

There were a few issues where the frontend route and backend route were not matching. For example, the page for creating a project is:

```text
GET /projects/create
```

but the form needs to submit to:

```text
POST /projects
```

I initially had the form submitting to `/projects/create`, which caused a `MethodNotAllowedHttpException` because that route was only configured for GET.

I also had to troubleshoot route naming, Inertia page resolution, database configuration, migrations, validation, and making sure the names used in React matched the Laravel request validation and database columns.

Those issues were probably the most useful part of the assessment because they helped me understand the flow between the React frontend, Inertia, Laravel, and the database more clearly.

## Did you use AI tools during development?

Yes, I used AI during development.

### Which tools?

I used **ChatGPT**.

### How were they used?

I mainly used ChatGPT as a debugging and development assistant.

I used it to help me:

- Understand Laravel error messages.
- Debug route and HTTP method issues.
- Troubleshoot Inertia and React errors.
- Review controllers and form request validation.
- Check database and migration problems.
- Create the initial project seed data.
- Review parts of the implementation when I got stuck.
- Understand why certain errors were happening and how to fix them.

I still tested the changes locally and reviewed the code before using it in the project. I used AI mainly to help me work through problems faster and understand the issues I encountered during development.
