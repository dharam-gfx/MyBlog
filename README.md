# myBlog
## View live preview [here](https://myblog-app-v1.netlify.app)
**Features:**

1. **Login and Logout:** Users can securely log in and out of the app.
2. **Create Account:** New users can create an account with their credentials.
3. **Login with Google Account:** Users can also log in using their Google account.
4. **Create Blog Post:** Authors can write and publish new blog posts.
5. **Edit Blog:** Authors can update existing blog posts.
6. **Delete Blog:** Authors can remove blog posts they no longer want.
7. **Blog Views Count:** Track how many times each blog post has been viewed.
8. **Forgot Password:** Users can reset their password if they forget it.
9. **Theme Changer:** Users can customize the app's theme (e.g., light mode, dark mode).

Feel free to let me know if you'd like any further details or if you need assistance with code snippets related to these features! 😊
## Installation Process

To get started with **myBlog**, follow these steps:

1. **Navigate to Your Project Directory**:
   - Change into the newly created project directory:
     ```bash
     cd myBlog
     ```

2. **Install Dependencies**:
   - Install the project dependencies using npm or yarn:
     ```bash
     npm install
     ```
     or
     ```bash
     yarn install
     ```

## Run Process

To run your app locally, use the following command:

```bash
npm run dev
```

This will start the development server, and you can access your app at [http://localhost:5173](http://localhost:5173).

## Dependencies

Here are the key dependencies used in this project:

- **@reduxjs/toolkit**: A powerful state management library for React applications.
- **@tinymce/tinymce-react**: Integrates the TinyMCE rich text editor into your app.
- **appwrite**: A backend-as-a-service platform for authentication, storage, and more.
- **html-react-parser**: Parses HTML strings into React components.
- **react**: The core library for building user interfaces.
- **react-dom**: Handles rendering React components in the browser.
- **react-hook-form**: Simplifies form handling in React.
- **react-loader-spinner**: Displays loading spinners during async operations.
- **react-redux**: Connects React components to the Redux store.
- **react-router-dom**: Enables routing and navigation in your app.
- **react-toastify**: Provides toast notifications for user feedback.

# Blog App Environment Variables

This project uses environment variables to configure various settings. Make sure to set these variables appropriately before running your application.

## Available Environment Variables

1. **`VITE_APPWRITE_API_URL`**: The API URL for your Appwrite instance. Set this to the base URL of your Appwrite server (e.g., `https://cloud.appwrite.io/v1`).

2. **`VITE_APPWRITE_PROJECT_ID`**: Your Appwrite project ID. You can find this in your Appwrite dashboard.

3. **`VITE_APPWRITE_DATABASE_ID`**: The ID of the database collection where your blog posts are stored.

4. **`VITE_APPWRITE_COLLECTION_ID`**: The ID of the collection where your blog posts are stored (if different from the database).

5. **`VITE_APPWRITE_POST_VIEW_COUNT_COLLECTION_ID`**: The ID of the collection to track blog post views (if applicable).

6. **`VITE_APPWRITE_BUCKET_ID`**: The ID of the storage bucket for media files (if using Appwrite storage).

7. **`VITE_TINYMCE_API_KEY`**: Your TinyMCE API key for integrating the rich text editor (if applicable).

## How to Use

1. Create a `.env` file in the root of your project.
2. Add the environment variables mentioned above with their corresponding values.
3. Make sure your application reads these variables during runtime (e.g., using `process.env.VARIABLE_NAME` in JavaScript).

## Example .env File

```env
VITE_APPWRITE_API_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_POST_VIEW_COUNT_COLLECTION_ID=views-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
VITE_TINYMCE_API_KEY=your-tinymce-api-key
```

Remember to replace the placeholders (`your-project-id`, `your-database-id`, etc.) with your actual values.

Remember to update the readme with any additional information relevant to your project. Happy coding! 🎉
