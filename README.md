# Product Listing App

This project is a product listing application built using **React**, **TypeScript**, and **Tailwind CSS**. The app features product display, pagination, search functionality, and integrates with a third-party API for fetching products. It is also deployed on **Netlify**.

## Features

- **Product Listing**: Displays a list of products fetched from an API.
- **Pagination**: Allows navigation through multiple pages of products.
- **Search**: Users can search for products by title.
- **TypeScript**: Strong typing to ensure better development experience and fewer bugs.

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/product-listing-app.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd product-listing-app
   \`\`\`

3. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Running the App

To run the app locally:

\`\`\`bash
npm run dev
\`\`\`

This will start the development server, and the app will be available at \`http://localhost:3000\`.

Deployment Link \`https://main--engineerscradleassesment.netlify.app/\`.

## API Integration

This project fetches products from the following API:

- API Endpoint: \`https://intern-task-api.bravo68web.workers.dev/api/products\`

Make sure to store the authentication token in **LocalStorage** with the key \`authToken\`:
\`\`\`javascript
localStorage.setItem("authToken", "your-token-here");
\`\`\`

## Technologies

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Netlify**: Hosting and deployment platform.
