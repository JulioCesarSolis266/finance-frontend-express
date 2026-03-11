Finance App — Frontend

Frontend client for the Personal Finance Manager application.
This interface allows users to manage transactions, visualize financial data, and interact with the backend API through a responsive dashboard.

The application is built with React and TypeScript and communicates with a REST API built with Node.js and Express.

Features

User authentication

Dashboard with financial overview

Transaction management

Category management

Data visualization with charts

Monthly financial reports

Date range filtering

Responsive UI

Tech Stack

React.js
TypeScript
Tailwind CSS
Recharts
React Router
Axios

Project Structure

Simplified project structure:

```
├───app
├───components
│   └───layout
├───features
│   ├───auth
│   ├───categories
│   ├───dashboard
│   │   └───components
│   ├───reports
│   │   ├───components
│   │   ├───services
│   │   └───utils
│   └───transactions
└───shared
    ├───api
    ├───components
    │   └───ui
    ├───hooks
    ├───types
    └───utils
```

This structure follows a feature-based modular architecture to improve scalability and maintainability.

Installation

Clone the repository:

git clone https://github.com/yourusername/finance-app-frontend

Install dependencies:

npm install

Run the development server:

npm run dev

Backend API

This frontend consumes a REST API available in the backend repository:

https://github.com/JulioCesarSolis266/finance-backend-express

Environment Configuration

If needed, configure the API base URL:

VITE_API_URL=http://localhost:3000

Data Visualization

Charts and analytics are implemented using Recharts to display:

Financial balance

Expenses by category

Monthly financial activity
