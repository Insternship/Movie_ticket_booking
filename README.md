# Movie Ticket Booking System

A full-stack Movie Ticket Booking application built as part of the Day 5 internship mini project.

The application allows users to view available movie shows, select seats, and book tickets. It also handles concurrent booking requests so that two users cannot book the same seat at the same time.

## Features

- View available movie shows
- View movie, theatre, screen, and showtime details
- View available seat count
- Select available seats
- Book multiple seats
- Booked seats are disabled
- Calculate total ticket price
- Store ticket price at the time of booking
- Prevent double booking of the same seat
- Movie CRUD operations
- Show CRUD operations
- Booking management
- Input validation
- Error handling
- Loading states
- Error states
- Empty states
- Two frontend pages with navigation

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB

### Tools

- Git
- GitHub
- Postman


## How to Run

### Backend

```bash
cd backend
npm install
npm run dev


Frontend

cd frontend
npm install
npm run dev




Features

View available movie shows
View available seat count
Select seats
Book movie tickets
Prevent double booking of the same seat
Backend CRUD operations
Input validation
Error handling
Loading and error states
Price stored at the time of booking



## Project Structure

```text
movie-ticket-booking/
│
├── README.md
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   │
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── routes/
│       │   ├── movieRoutes.js
│       │   ├── showRoutes.js
│       │   └── bookingRoutes.js
│       ├── controllers/
│       │   ├── movieController.js
│       │   ├── showController.js
│       │   └── bookingController.js
│       ├── services/
│       │   ├── movieService.js
│       │   ├── showService.js
│       │   └── bookingService.js
│       ├── models/
│       │   ├── Movie.js
│       │   ├── Show.js
│       │   └── Booking.js
│       └── middleware/
│           ├── errorHandler.js
│           └── notFound.js
│
└── frontend/
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        │   └── api.js
        ├── pages/
        │   ├── ShowsPage.jsx
        │   └── SeatSelectionPage.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ShowCard.jsx
        │   └── SeatGrid.jsx
        └── styles/
            └── app.css



Page 1 - Shows List

The Shows List page displays:

Movie title
Theatre
Screen
Showtime
Available seats
Ticket price
Book button

The user selects a show and continues to the seat selection page.



Page 2 - Seat Selection

The Seat Selection page displays a seat grid.

Available seats can be selected.

Booked seats are disabled and cannot be selected.

The user can:

Select seats.
Enter customer name.
Enter customer email.
View the total ticket amount.
Confirm the booking.




Concurrency Handling

The main challenge of this project is preventing two users from booking the same seat simultaneously.



For example:

User A selects A5
User B selects A5

Both users may initially see A5 as available.

The backend uses database-level concurrency control and a transaction to ensure that only one booking can successfully reserve the seat.

Expected result:

User A -> Booking successful
User B -> Booking rejected

This prevents the same seat from being booked twice.