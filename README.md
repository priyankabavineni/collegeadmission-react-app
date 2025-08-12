
#College Admission Management System (React)

This project is a modern, interactive, and efficient web-based **College Admission Management System** developed using **React.js**. It offers a complete digital solution for managing the college admission lifecycle, designed for both **students** and **administrators**. The system includes modules for **student registration**, **program applications**, **status tracking**, a responsive **ChatBot**, and an intuitive **admin dashboard** for effective application and chatbot management.

## Features Overview

### ChatBot Module

The system includes a smart and responsive **ChatBot** that allows users to ask questions related to college admissions. The bot is trained on a dataset of frequently asked questions and provides **accurate, real-time responses**. It improves engagement and reduces the need for manual support.

* If the user asks an unknown or unrelated question, the ChatBot gracefully responds:

  > *"Sorry, I didn't get that. Please contact admissions at 9876543210."*

* Admins can view **top asked queries**, download full **chat history**, and **update the database** for unanswered but frequently asked questions — making the ChatBot smarter over time.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Student Module

The **Student Module** streamlines the entire admission process from registration to application tracking.

1. **Registration**: Students register by submitting their personal and academic details.
   [Student Registration](http://localhost:5173/register)

2. **Program Application**: After registering, students are automatically redirected to the application form page.
    [Apply for a Program](http://localhost:5173/application)

3. **Login**: Students can log in securely using their credentials.
   [Student Login](http://localhost:5173/login)

4. **Status Tracking**: Logged-in students can track the progress of their application in real-time.
    [Track Application Status](http://localhost:5173/status)

Each step is designed with **usability in mind**, ensuring that students can complete their admission process smoothly without confusion.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Admin/Management Module

The **Admin Module** is built to give the college administration full control over the application process and ChatBot analytics.

 First, the admin logs in securely via:
[Admin Login](http://localhost:5173/admin-login)

Once logged in, the **Admin Dashboard** provides access to:

#### Applications Management

* **View All Applications**
* **Search by Email**
* **Filter by Application Status**
* **Filter by Program or Department**
* **Approve or Reject Applications**
   ->If rejected, admins must provide a clear **rejection reason** for transparency.

#### ChatBot Management

* **Top Queries**: View most frequently asked questions.
* **Download Chat History**: Access full logs of ChatBot interactions.
* **Database Update Insight**: Identify missing responses to frequently asked questions and update the system.

[Admin Dashboard (post-login)](http://localhost:5173/admin)

---

## User Interface (UI)

The UI is clean, responsive, and user-friendly. It is designed for two user roles:

* **Students** can navigate seamlessly to register, apply, log in, and check their status.
* **Admins** can manage data via an intuitive dashboard with filtering, reviewing, and chatbot tools.

Additionally, users can **download the admission brochure** directly from the main page.

 [Main Homepage](http://localhost:5173/)

-------------------------------------------------------------------------------------------------------------------------------------------------------

## Project Structure


 src/
├── admin/               → Admin Dashboard, ChatBot Management
├── application/         → Student Application Form
├── chatbot/             → ChatBot Integration
├── status/              → Student Status Tracking
├── Login/               → Student Login
├── main/                → Homepage & Brochure
├── student/             → Student Registration
└── App.jsx              → Main Routing Component

## Authentication Flow

* **Students**: Login with email and password (validated via backend API).
* **Admins**: Static credentials are used (`admin` / `admin123`) for demonstration purposes.

  * Session is stored in `localStorage` using the key `adminLoggedIn`.

---

##Tech Stack

* **Frontend**: React.js, HTML5, CSS3, Bootstrap
* **Routing**: React Router
* **State Management**: useState, useEffect (local state)
* **API Communication**: Axios
* **Authentication**: LocalStorage-based simulation (admin), token/session-ready
* **Styling**: Custom CSS, Responsive Design

---

## Local Development URLs

| Feature             | URL                                                                    |
| ------------------- | ---------------------------------------------------------------------- |
| Home Page           | [http://localhost:5173/](http://localhost:5173/)                       |
| Brochure Download   | [http://localhost:5173/](http://localhost:5173/)                       |
| Student Register    | [http://localhost:5173/register](http://localhost:5173/register)       |
| Program Application | [http://localhost:5173/application](http://localhost:5173/application) |
| Student Login       | [http://localhost:5173/login](http://localhost:5173/login)             |
| Status Tracking     | [http://localhost:5173/status](http://localhost:5173/status)           |
| Admin Login         | [http://localhost:5173/admin-login](http://localhost:5173/admin-login) |
| Admin Dashboard     | [http://localhost:5173/admin](http://localhost:5173/admin)             |




