var animals = ["cats", "dogs", "bunnies"];

function renderButtons() {
  // Deleting animal buttons prior to adding new ones (otherwise repeat buttons)
  $("#animals-display").empty();

  //looping through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generating buttons for each animal in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animal");
    // Adding a data-attribute with a value of the animal at index i
    a.attr("data-name", animals[i]);
    // a.on("click", addJClickEvent);

    // Providing the button's text with a value of the animal at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#animals-display").append(a);
    addJClickEvent();
  }
}

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();

//function when "add animal" button is clicked
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
  // calling renderButtons which handles the processing of our animal array
  renderButtons();
  //Two ways to reset form upon clicking submit (jQuery vs. JavaScript way)
  //   $("#animal-form")[0].reset();
  document.getElementById("animal-form").reset();
});

//Add an event listener to all the buttons
function addJClickEvent() {
  $("button").on("click", function() {
    // Grabbing and storing the data-name property value from the button
    var animalbutton = $(this).attr("data-name");
    console.log(this);
    // Constructing a queryURL using the animal name
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animalbutton +
      "&api_key=0MERXNy6F4I5gDJw71yI4q8X6atmKJNa";

    //Perform an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //After data comes back about the request
      .then(function(response) {
        console.log(queryURL);
        console.log(response);

        //Storing data from the AJAX request in the results variable
        var results = response.data;

        //first empty gifs-display div in html file
        $("#gifs-display").empty();

        //looping through each result item
        for (var i = 0; i < 10; i++) {
          // //creating and storing a div tag
          var gifsDiv = $("<div>");
          var ratingDiv = $("<div>");
          var ratingText = $("<text>");
          //creating and storing an img tag
          var animalGif = $("<img>");
          //adding "playstate" attribute, originally defined as "still"
          animalGif.attr("playstate", "still");
          //setting the src attribute of the image to the property pulled off the results item
          animalGif.attr("src", results[i].images.fixed_height_still.url);
          animalGif.attr("notmoving", results[i].images.fixed_height_still.url);
          animalGif.attr("moving", results[i].images.fixed_height.url);
          animalGif.addClass("gif");

          //Add rating to each newly created image
          ratingText.text("rating: " + results[i].rating);
          //
          ratingDiv.append(ratingText);
          console.log(results[i].rating);
          //appending the image tag to the gifs div
          gifsDiv.append(animalGif);
          //prepending the gifsDiv to the HTML page in the "#gifs-display" div
          $("#gifs-display").prepend(ratingDiv, animalGif);
        }
      });
  });
}

//When any still gifs are clicked in #gifs-display, then they animate
$("#gifs-display").on("click", ".gif", function(event) {
  event.preventDefault();

  // gets the current state of the clicked gif
  var state = $(this).attr("playstate");
  console.log(this);

  // according to the current state gifs toggle between animate and still
  if (state === "still") {
    $(this).attr("src", $(this).attr("moving"));
    $(this).attr("playstate", "animate");
  } else {
    $(this).attr("src", $(this).attr("notmoving"));
    $(this).attr("playstate", "still");
  }
});
