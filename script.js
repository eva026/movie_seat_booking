const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// the order of below two lines is important, which determines whether we can store the ticketPrice, cause in the function, we can get the selectedIndex of the movie
populateUI();
let ticketPrice = +movieSelect.value;

// Set Movie Data
function setMovieData(index, value) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", value);
}

// Updated count and total
function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // this line below is unnecessary, cause we can put populateUI function before let ticketPrice
  // let ticketPrice = localStorage.getItem("selectedMoviePrice");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }
  // console.log(localStorage.getItem("selectedMovieIndex"));
  // something like an array but not array
  // console.log(localStorage.getItem("selectedSeats"));
  // an array
  // console.log(JSON.parse(localStorage.getItem("selectedSeats")));
}

// Movie select listener
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectCount();
});

// Container event listener
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectCount();
  }
});

//Initial count and total
updateSelectCount();
