Travel Planner
Welcome to the Travel Planner project! This is a web application built to help users create personalized travel itineraries using AI-powered APIs and real-time flight data.
Project Info
Git Repository: (Replace with your actual Git repository URL, e.g., https://github.com/username/travel-planner)
How to Edit This Code
There are several ways to edit your application code:
Use Your Preferred IDE
To work locally using your favorite IDE, clone the repository and push changes as needed. You'll need Node.js and npm installed. We recommend using nvm to manage Node.js versions.
Follow these steps:
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd travel-planner

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

Edit a File Directly in GitHub

Navigate to the desired file in your repository.
Click the "Edit" button (pencil icon) at the top right of the file view.
Make your changes and commit them with a descriptive message.

Use GitHub Codespaces

Go to the main page of your repository on GitHub.
Click the "Code" button (green button) near the top right.
Select the "Codespaces" tab.
Click "New codespace" to launch a cloud-based development environment.
Edit files within Codespaces and commit and push your changes when done.

Environment Variables
The application requires the following environment variables to be set in a .env file in the project root:
VITE_GEMINI_API_KEY=your-gemini-api-key-here
VITE_SERP_API_KEY=your-serp-api-key-here


VITE_GEMINI_API_KEY: Required for generating travel plans using the Gemini API. Obtain it from Google AI Studio.
VITE_SERP_API_KEY: Required for fetching live flight data. Obtain it from SERP API.

Ensure the .env file is added to .gitignore to keep sensitive API keys secure.
Technologies Used
This project is built with:

Vite: A fast build tool and development server for modern web projects.
TypeScript: Adds static typing to JavaScript for better developer experience and code reliability.
React: A JavaScript library for building user interfaces.
shadcn-ui: A collection of reusable UI components for React.
Tailwind CSS: A utility-first CSS framework for styling.

How to Deploy This Project
To deploy the project, you can use a platform like Vercel, Netlify, or any other static site hosting service that supports Vite-based applications. Follow these general steps:

Build the project for production:npm run build


Deploy the contents of the dist folder to your hosting platform of choice.
Configure your environment variables (VITE_GEMINI_API_KEY and VITE_SERP_API_KEY) in the hosting platform's environment settings.

Refer to your hosting provider's documentation for specific deployment instructions.
Connecting a Custom Domain
To connect a custom domain to your deployed project, check your hosting platform's domain management settings. Typically, this involves:

Adding your custom domain in the hosting platform's dashboard.
Updating your domain's DNS settings to point to the hosting provider (e.g., setting up A records or CNAME records).
Verifying domain ownership, if required.

Consult your hosting provider's documentation for detailed instructions on custom domain setup.
Screenshots
(Add your screenshots here with descriptions, e.g.,)

Home Page: Displays the travel planner form for inputting travel preferences.
![image](https://github.com/user-attachments/assets/e4a56ff8-b324-4942-b522-3e9da554ea57)

Travel Results: Shows the generated itinerary and flight data.
![image](https://github.com/user-attachments/assets/bddd76a8-9a67-4def-a90c-f6d42d6ec35f)

/////////
![image](https://github.com/user-attachments/assets/f309117c-641a-4c00-aa69-c0be50a51751)

////////
![image](https://github.com/user-attachments/assets/871515bc-492d-4b8b-b295-edfc61aae4be)



