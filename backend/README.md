# Bonchezz Bead Hub Backend

This backend powers the Bonchezz Bead Hub storefront with Django REST Framework.

## Features
- JWT authentication
- Product and category catalog
- Cart management
- Checkout and orders
- Payments, reviews, and contact form

## Setup
1. Create and activate a virtual environment.
2. Install dependencies: `pip install -r requirements.txt`
3. If you want to use PostgreSQL, set the following environment variables (example for PowerShell):

```powershell
$Env:DB_NAME = 'your_db_name'
$Env:DB_USER = 'your_db_user'
$Env:DB_PASSWORD = 'your_db_password'
$Env:DB_HOST = '127.0.0.1'
$Env:DB_PORT = '5432'
$Env:SECRET_KEY = 'replace-with-secret'
$Env:DEBUG = 'True'
```

Then install dependencies and run migrations:

```powershell
pip install -r requirements.txt
python manage.py migrate
```

If the Postgres env vars are not set, the project will fall back to the local SQLite database at `db.sqlite3`.
4. Start the development server: `python manage.py runserver`

## API Base URL
- `/api/accounts/`
- `/api/products/`
- `/api/categories/`
- `/api/cart/`
- `/api/orders/`
- `/api/payments/`
- `/api/contact/`
- `/api/reviews/`

Front-end: set the API base URL in the frontend environment. Example (in the frontend project root):

Create a `.env` file with:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Then start the frontend dev server (see frontend README) so it can fetch and display data from the backend.
