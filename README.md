# Corvesive

Simplify your budgeting.

> **Status:** Inactive — not in active development. Kept for reference and to run locally.

## Overview

### What is Corvesive?

Corvesive is a web application for simplifying your budgeting. Track your income by uploading pay stubs, record your monthly expenses, and see where your money is going and how much you have left. It was built to bring income and expenses that usually live across different platforms and tools into one place, so it's easier to understand your financial situation and make better budgeting decisions.

It's a Laravel 11 application with an Inertia and Vue frontend, run locally through Laravel Sail.

### Key Features

- **Income Manager**: Upload pay stubs and keep a record of all your income sources.
- **Expense Manager**: Record monthly expenses and categorize them for easy tracking.
- **Spending Insights**: Visualize where your money is going to make informed budgeting decisions.

## Getting Started

### Prerequisites

Ensure you have the following installed. You can verify each one by running the provided command in your terminal.

1. **PHP** (8.2+) is required for the application. Check it by running:

    ```bash
    php --version
    ```

2. **Composer** manages PHP dependencies. Check it by running:

    ```bash
    composer --version
    ```

3. **Docker** runs the application, its MySQL database and Mailpit through Laravel Sail. Check it by running:

    ```bash
    docker --version
    ```

4. **Node** and **NPM** manage frontend dependencies. Check them by running:

    ```bash
    node --version
    npm --version
    ```

### Installation

1. Duplicate the example environment file and configure it with your settings:

    ```bash
    cp .env.example .env
    ```

2. Install PHP and JavaScript dependencies:

    ```bash
    composer install
    npm install
    ```

3. Generate a new application key:

    ```bash
    php artisan key:generate
    ```

4. Build and start the application with Sail:

    ```bash
    ./vendor/bin/sail up -d
    ```

5. Apply database migrations:

    ```bash
    ./vendor/bin/sail artisan migrate
    ```

6. Seed the database with test data:

    ```bash
    ./vendor/bin/sail artisan db:seed
    ```

7. Compile assets and run the Vue frontend:

    ```bash
    npm run dev
    ```

## Contributing

This project isn't in active development, so I'm not reviewing issues or pull requests. You're welcome to fork it and take it in your own direction under the license below.

## License

Released under the [MIT License](LICENSE).
