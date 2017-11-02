$(document).ready(function() {
    var heroArray = ["superman", "batman", "wonder woman", "black panther", "nightwing", "captain america"];
    // displayHeroInfo function re-renders the HTML to display the appropriate content
    function displayHeroInfo() {
        var hero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=Td4PZppUXN2hiUe56YxvMYT0zAB8J61l&limit=10";
        // Creating an AJAX call for the specific hero button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var heroDiv = $("<div class='item'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height_still.url);
                heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                heroImage.attr("data-animate", results[i].images.fixed_height.url);
                heroImage.attr("data-state", "still");
                heroImage.attr("class", "gif");
                heroDiv.prepend(p);
                heroDiv.prepend(heroImage);
                $("#heroes").prepend(heroDiv);
            }
        })
    };
    // Function for displaying hero data
    function renderButtons() {
        // Deleting the heroes prior to adding new heroes
        // (this is necessary otherwise you will have repeat buttons)
        $("#heroButtons").empty();
        // Looping through the array of heroes
        for (var i = 0; i < heroArray.length; i++) {
            // Then dynamicaly generating buttons for each hero in the array
            var a = $("<button id='hero'>");
            // Adding a class of hero to our button
            a.addClass("hero");
            // Adding a data-attribute
            a.attr("data-name", heroArray[i]);
            // Providing the initial button text
            a.text(heroArray[i]);
            // Adding the button to the heroButtons div
            $("#heroButtons").append(a);
        }
    };
    // This function handles events where a hero button is clicked
    $("#add-hero").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var heroes = $("#hero-input").val().trim();
        // Adding hero from the textbox to our array
        heroArray.push(heroes);
        // Calling renderButtons which handles the processing of our hero array
        renderButtons();
    });
    // Adding a click event listener to all elements with a class of "hero"
    $(document).on("click", ".hero", displayHeroInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    // why does document work here and not just .gif
    $(document).on("click", ".gif", function() {
        console.log('here')
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    
});