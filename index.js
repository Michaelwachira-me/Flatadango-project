let currentMovies = null;
let movieData = [];

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTicket = document.getElementById("available-ticket");
const buyTicketButton = document.getElementById("buy-ticket");
const filmsList = document.getElementById("films");

const fetchFirstMovie = () => {
    fetch("http://localhost:3000/films/1") // Corrected URL
        .then((response) => response.json())
        .then((data) => {
            currentMovies = data;
            displayMovieDetails(currentMovies);
        })
        .catch((error) => {
            console.error("error fetching case: ", error);
        });
};

const displayMovieDetails = (movie) => {
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    showtime.textContent = `Showtime: ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    availableTicket.textContent = `available tickets: ${availableTickets}`;

    if (availableTickets === 0) {
        buyTicketButton.textContent = "Sold Out";
        buyTicketButton.disabled = true;
    } else {
        buyTicketButton.textContent = "buy ticket";
        buyTicketButton.disabled = false;
    }
};

buyTicketButton.addEventListener("click", () => {
    if (currentMovies.tickets_sold < currentMovies.capacity) {
        const updatedTicketsSold = currentMovies.tickets_sold + 1;
        fetch(`http://localhost:3000/films/${currentMovies.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                currentMovies.tickets_sold = updatedTicketsSold;
                displayMovieDetails(currentMovies);
                displayMovieMenu(movieData);

                fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        film_id: currentMovies.id,
                        number_of_tickets: 1
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(ticket => console.log('Ticket posted:', ticket))
                    .catch(error => console.error('Error posting ticket:', error));
            })
            .catch(error => console.error('Error updating tickets:', error));
    }
});

const fetchAllMovies = () => {
    fetch("http://localhost:3000/films") // Corrected URL
        .then((response) => response.json())
        .then((data) => {
            movieData = data;
            displayMovieMenu(movieData);
        })
        .catch(error => console.error('Error fetching all movies:', error));
};

const displayMovieMenu = (movies) => {
    filmsList.innerHTML = "";
    movies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.classList.add("film", "item");

        if (movie.capacity - movie.tickets_sold === 0) {
            li.classList.add("sold-out");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteMovie(movie.id, li); // Pass the li element
        });

        li.appendChild(deleteButton);
        li.addEventListener("click", () => {
            currentMovies = movie;
            displayMovieDetails(movie);
        });
        filmsList.appendChild(li);
    });
};

const deleteMovie = (movieId, listItem) => { // Accept the li element
    fetch(`http://localhost:3000/films/${movieId}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            movieData = movieData.filter((movie) => movie.id !== movieId);
            if (currentMovies && currentMovies.id === movieId) {
                currentMovies = null;
                poster.src = "";
                title.textContent = "";
                runtime.textContent = "";
                showtime.textContent = "";
                availableTicket.textContent = "";
                buyTicketButton.disabled = true;
            }
            displayMovieMenu(movieData);
            listItem.remove(); // Remove the list item from the DOM
        })
        .catch(error => console.error('Error deleting movie:', error));
};

fetchFirstMovie();
fetchAllMovies();