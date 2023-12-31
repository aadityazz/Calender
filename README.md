# Project Calendar - Application Brief 

## Overview 
The "Project Calendar" is a web-based calendar application designed to help users manage their events, appointments, and schedules effectively. This application provides a user-friendly interface and various features to streamline calendar management. 

## Features 

_**[Explained well in feature.pdf]**_

### 1. User Authentication - 
- Users can create accounts and log in securely. 
- Passwords are encrypted to ensure data security. 

### 2. Event Management - 
- Users can create, view, update, and delete events and appointments. 
- Events can have titles, descriptions, dates, times, and locations. 
- Events can be categorized or color-coded for easy identification. 

### 3. Calendar Views 
- Users can view their calendar in different modes: 
- Month view: Displays a monthly calendar grid with events. 
- Week view: Shows a weekly calendar with detailed event listings. 
- Day view: Provides a daily calendar view with hourly breakdowns. 
- Agenda view: Lists events in a chronological order. 

### 4. Recurring Events 
- Users can create recurring events with options for daily, weekly, or monthly recurrence. 
- Customizable recurrence patterns (e.g., every Tuesday and Thursday). 

### 5. Event Notifications - Users receive notifications for upcoming events and appointments. 
- Notifications can be sent via email or in-app alerts. 

### 6. Sharing and Collaboration 
- Users can share their calendars with others. 
- Collaborators can view and edit events on shared calendars. 
- Real-time syncing ensures everyone sees the latest updates. 

### 7. Google Calendar Integration 
- Integration with Google Calendar allows users to sync events with their Google accounts. 
- Users can import and export events to/from Google Calendar. 

### 8. Mobile Responsiveness 
- The application is responsive and optimized for mobile devices, making it accessible on smartphones and tablets. 

## Technology Stack - 
- **Frontend**: React, React Router, Materialize CSS 
- **Backend**: Node.js, Express.js 
- **Database**: MySQL or equivalent relational database 
- **Authentication**: JSON Web Tokens (JWT) 
- **APIs**: Google Calendar API (for integration) 
- **Deployment**: AWS, Heroku, or similar cloud platforms 

## Deployment 
The "Project Calendar" application can be deployed on a cloud platform or a web server. Detailed deployment instructions are provided in the project's documentation. 

## Setting Up the Project Locally
1. Clone the Repository: https://github.com/aadityazz/Calender 
2. Navigate to the Project Directory: cd project-calendar 
3. Install Dependencies: npm install 
4. Create a `.env` File: 
- In the project root directory, create a new file named `.env`. 
5. Configure Environment Variables: 
- Open the `.env` file in a text editor and add the following environment variables with your own values: 
- CREDENTIALS=YOUR_CREDENTIALS_HERE 
- CALENDAR_ID=YOUR_CALENDAR_ID_HERE 
- MYSQL_HOST=YOUR_MYSQL_HOST
- MYSQL_USER=YOUR_MYSQL_USER 
- MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD 
- MYSQL_DATABASE=YOUR_MYSQL_DATABASE 

- Replace `YOUR_CREDENTIALS_HERE` and `YOUR_CALENDAR_ID_HERE` with the appropriate credentials and calendar ID. 
6. Start the Development Server: npm start 
7. Access the Application: - Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the "Project Calendar" application locally. 

## Running Tests To run tests for the application, follow these steps: 
1. Ensure you have the project set up locally as mentioned above. 
2. In the project directory, run the following command to execute tests: npm test This will run the test suites and display the test results in the terminal. Now you have the "Project Calendar" application set up locally and can test its functionality. Remember to replace placeholders like `YOUR_CREDENTIALS_HERE` and `YOUR_CALENDAR_ID_HERE` with your actual credentials and calendar ID. 

## Conclusion 
The "Project Calendar" aims to provide users with a feature-rich and intuitive calendar management solution. It empowers users to organize their schedules efficiently, collaborate with others, and receive timely event notifications. The application's responsive design ensures accessibility from various devices, making it a valuable tool for personal and professional use.
