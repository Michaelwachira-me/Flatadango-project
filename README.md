# Flatadango-project
# Flatadango Movie Ticket App

This project is a mini web application built to demonstrate understanding of the three pillars of JavaScript: Handling Events, Manipulating the DOM, and Communicating with the Server. It allows users to browse movies, view movie details, purchase tickets, and delete movies.

## Features

* **Movie Listing:**
    * Displays a list of movies fetched from a server (using `GET /films`).
    * Shows movie titles in a left-side menu.
    * Indicates sold-out movies with a red color and "Sold Out" class.
    * Adds a delete button to each movie in the list.
* **Movie Details:**
    * Displays the details of the first movie on page load (using `GET /films/1`).
    * Displays movie poster, title, runtime, showtime, and available tickets.
    * Updates the displayed movie details when a movie is selected from the list.
* **Ticket Purchase:**
    * Allows users to buy tickets for a movie.
    * Updates the available ticket count on the frontend and backend (using `PATCH /films/:id`).
    * Posts the ticket purchase to the tickets endpoint (using `POST /tickets`).
    * Prevents users from buying tickets for sold-out movies.
    * Displays "Sold Out" when no tickets remain.
* **Movie Deletion:**
    * Allows users to delete films from the server (using `DELETE /films/:id`).
    * Removes the deleted movie from the list.
    * Removes the movie's details from the detail section if the currently shown movie is deleted.

## Prerequisites

* Node.js and npm (Node Package Manager) installed.

## Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install json-server (if not already installed):**
    ```bash
    npm install -g json-server
    ```

3.  **Run the JSON Server:**
    * Place the `db.json` file in the same directory as your `index.html` file.
    * Start the server:
        ```bash
        json-server --watch db.json
        ```

4.  **Open the HTML:**
    * Open the `index.html` file in your web browser.

## Project Structure

* `index.html`: Contains the HTML structure of the application.
* `db.json`: Contains the movie data for the server.

## JavaScript Implementation

The JavaScript code in `index.html` handles:

* **DOM Manipulation:** Dynamically creates and updates HTML elements.
* **Event Handling:** Attaches event listeners for movie selection, ticket purchases, and movie deletion.
* **Server Communication:** Uses the `fetch` API to make GET, PATCH, POST, and DELETE requests to the server.

## API Endpoints

* `GET /films`: Retrieves a list of all movies.
* `GET /films/:id`: Retrieves the details of a specific movie.
* `PATCH /films/:id`: Updates the `tickets_sold` count for a movie.
* `POST /tickets`: Creates a new ticket purchase entry.
* `DELETE /films/:id`: deletes the film with the corresponding ID.

## Bonus Features

* Allows the user to click on the movie list to change the displayed movie.
* Implements a delete button on each movie list item, and the delete functionality.

## Notes

* Ensure the JSON server is running before opening the HTML file.
* The application assumes the server is running on `http://localhost:3000`.
* The delete button removes the movie from the server and the list.
* The detail div is cleared if the currently displayed movie is deleted.