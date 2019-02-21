var animals = ["cats", "dogs", "bunnies"];

function renderButtons() {
  // Deleting animal buttons prior to adding new ones (otherwise repeat buttons)
  $("#animals-display").empty();

  //looping through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animal");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", animals[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#animals-display").append(a);
  }
}

//function when button is clicked
$("#add-animal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
  // This line will grab the text from the input box
  var animal = $("#animal-input")
    .val()
    .trim();
  //Stops user from entering an empty string
  if ($.trim(animal) === "") {
    return false;
  }
  // The animal from the textbox is then added to our array
  animals.push(animal);
  console.log(animals);
  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();
