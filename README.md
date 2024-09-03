# Corvesive

Corvesive is an online application designed to simplify your budgeting. Track your income by uploading pay stubs, record your monthly expenses, and effortlessly monitor where your money is going and how much you have left. Gain clarity on your financial situation to make better budgeting decisions.

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

6. Compile assets and run the Vue frontend:

	```bash
	npm run dev
	```

## Usage

### Paystubs

With Corvesive, you can effortlessly track your monthly income by uploading your pay stubs. Whether you’re paid weekly, bi-weekly, or monthly, Corvesive accommodates various payment intervals, ensuring an accurate reflection of your earnings. The application will categorize and sum up your income over different periods, helping you to stay on top of your finances and plan effectively.

### Expenses

Whether it’s a recurring payment like rent, a budgeted amount for groceries, or the funds you’re setting aside for savings, Corvesive makes it easy to track all your monthly expenses. Schedule future expenses to manage your cash flow more precisely and stay organized with upcoming due dates.

### Transactions

For a clearer view of your remaining budget, use Transactions in Corvesive to record bills you pay, money you deposit, or any other payments you make. Your dashboard will display recent transactions and provide a summary of your budget’s surplus values. Easily track your spending and deposits over time to better manage your financial health and make more informed decisions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for more details.

