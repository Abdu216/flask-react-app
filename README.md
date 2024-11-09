# Flask-React App

This is a product management application that integrates a Flask backend with a React frontend. The project allows you to interact with a RESTful API built using Flask while serving a React frontend for user interaction.

## Prerequisites
Before you begin, ensure that you have the following installed:
- **Python** for running the Flask backend
- **Node.js** for running the React frontend
- **npm** (Node Package Manager), which comes with Node.js

## Project Structure
The project has the following structure:
/flask-react-app
  ├── /backend
  └── /frontend
- **/backend** contains the Flask API.
- **/frontend** contains the React application.

## Setting Up the Project
Clone the repository to your local machine:
git clone https://github.com/Abdu216/flask-react-app
cd flask-react-app

Navigate to the /backend folder:
cd backend

Set up a virtual environment (recommended):
python3 -m venv venv
source venv/bin/activate   # On Windows use `venv\Scripts\activate`

Install the required Python dependencies:
pip install -r requirements.txt

Alternatively, you can install the dependencies manually:
pip install Flask Flask-SQLAlchemy Flask-CORS

Run the Flask app:
python app.py
The Flask backend should now be running on [http://localhost:5000](http://localhost:5000).

Next, navigate to the /frontend folder:
cd ../frontend

Install the required Node.js dependencies:
npm install

Run the React app:
npm run dev
The React app should now be running on [http://localhost:3000](http://localhost:3000).

## Project Flow
- The **Flask backend** handles HTTP requests, interacts with a database (via SQLAlchemy), and returns responses in JSON format.
- The **React frontend** makes API calls to the Flask backend to fetch or send data, which is then rendered in the user interface.
