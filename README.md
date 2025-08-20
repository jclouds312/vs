# SmartCompare: AI-Powered Smartphone Comparator

This is a Next.js application that allows users to compare specifications of different smartphones side-by-side and get an AI-generated summary of their key differences. The project is built with Next.js, TypeScript, Tailwind CSS, and uses Genkit for AI features.

## Key Features

- **Side-by-Side Comparison:** Select two phones to see a detailed table of their specifications.
- **AI-Powered Summaries:** Get a concise, AI-generated summary highlighting the key differences based on user preferences.
- **Admin Panel:** A secure area to manage phone data and generate product images using AI.
- **Dynamic Search:** Quickly find phones and get suggestions for popular comparisons.

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Managing Content

All the smartphone data is managed centrally, making it easy to update and expand the catalog.

### Adding or Editing Smartphones

Phone data is stored in the `src/lib/phones.ts` file. To add a new phone or edit an existing one, you can modify the `phones` array in this file.

Each phone object has the following structure:

```typescript
export type Phone = {
  id: string; // Unique identifier (e.g., 'samsung-galaxy-s25-ultra')
  name: string; // 'Galaxy S25 Ultra'
  brand: string; // 'Samsung'
  price: number; // 1399
  image: string; // URL to the phone's image
  specs: {
    display: string;
    camera: string;
    battery: string;
    processor: string;
    storage: string;
    ram: string;
    is5G: boolean;
  };
};
```

- **To add a new phone:** Add a new object to the `phones` array with all the required fields.
- **To edit characteristics:** Find the phone by its `id` and update the values in its `specs` object.
- **To change an image:** Update the `image` property with a new direct link to a high-quality image.

### Using the Admin Panel

The application includes a secure admin panel for content management.

1.  **Access:** Navigate to `/admin` in your browser.
2.  **Login:** Use the following credentials to log in:
    -   **Email:** `john474nvallejo@gmail.com`
    -   **Password:** `123456`
    *Note: These credentials are set in `src/app/admin/actions.ts`. It is highly recommended to change them and use environment variables for a production environment.*

3.  **Features:**
    -   **Generate Images with AI:** The panel lists all available phones. Next to each phone, there is a "Generate Image" button. Clicking it will use an AI model to create a high-quality, artistic product photo of that specific phone. The generated image can then be used to update the phone's display picture.

## Deployment

This is a standard Next.js application and can be deployed to any platform that supports Node.js, such as Vercel, Netlify, or Firebase App Hosting.

### Firebase App Hosting

The project is pre-configured for Firebase App Hosting. The `apphosting.yaml` file contains the basic configuration to get started. To deploy, you can use the Firebase CLI.

```bash
firebase deploy --only hosting
```

This will deploy the application to a live URL managed by Firebase.
