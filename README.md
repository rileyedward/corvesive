# Corvesive

Simplify your budgeting.

## Overview

### What is Corvesive?

Corvesive is an online application designed to simplify your budgeting. Track your income by uploading pay stubs, record your monthly expenses, and effortlessly monitor where your money is going and how much you have left. Gain clarity on your financial situation to make better budgeting decisions.

### Why Use Corvesive?

Budgeting can often feel like a daunting task, especially when income sources and expenses are scattered across different platforms and tools. Corvesive brings everything together in one intuitive platform, making it easier than ever to manage your finances. With Corvesive, you can gain a clear understanding of your financial health by tracking income, categorizing expenses, and monitoring your remaining balance.

### Key Features

- **Income Manager**: Upload paystubs and keep a record of all your incoming income sources.
- **Expense Manager**: Record monthly expenses and categrorize them for easy tracking.
- **Spending Insights**: Visualize where your month is going to make informed budgeting decisions.

## Getting Started

### Prerequisites

Ensure you have the following prerequisites installed on your system. You can verify each installation by running the provided commands in your terminal.

1. **PHP** is required for the application. Check if PHP is installed by running:

	```bash
	php --version
	```

2. **Composer** is necessary for managing PHP dependencies. Verify its installation with:

	```bash
	composer --version
	```

3. **Docker** is used for containerization. Confirm Docker is installed by running:

	```bash
	docker --version
	```

4. **Node** and **NPM** (Node Package Manager) are needed for managing frontend dependencies. Check their installations with:

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

3. Generate a new PHP application key:

	```bash
	php artisan key:generate
	```

4. Use Sail to build and start the application:

	```bash
	./vendor/bin/sail up -d
	```

5. Apply database migrations:

	```bash
	sail artisan migrate
	```

6. Seed the database with test data:

   ```bash
    sail artisan db:seed
   ```

7. Compile assets and run the Vue frontend:

   ```bash
   npm run dev
   ```
