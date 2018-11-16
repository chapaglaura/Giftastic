//all initial dog breeds array
var topics = [
    "labrador",
    "schnauzer",
    "yorkie",
    "golden retriever",
    "chihuahua",
    "bulldog",
    "german shepherd",
    "beagle",
    "pug",
    "dachschund",
    "husky",
    "shih tzu",
    "doberman",
    "rottweiler",
    "chow chow",
    "shiba inu",
    "pomeranian",
    "border collie",
    "dalmatian"
];

var pa = [];


$(document).ready(function () {

    //loop for creating all buttons from the topics array
    for (var i = 0; i < topics.length; i++) {

        createButton(topics[i]); //function to create buttons of all topics

    }

    //submit button click event handler
    $(".add-submit").click(function () {

        var added = $(".add-input").val(); //stores the textbox value in variable
        topics.push(added); //adds textbox value to topics array

        createButton(added); //function to create button with new topic
    });

    //topics buttons click event handler with delegation
    $(".topics-buttons").on('click', '.option', function () {

        var search = $(this).text(); //stores text of button clicked in variable

        search.split(' ').join('+'); //replaces spaces with plus signs

        //API url for call concatenating variable and specifying key and limit
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=AefenpNDGmxeIlw72Y8YH5XkhUgP1kSu&limit=10";

        //API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //loop for retrieving limited amount of data
            for (var i = 0; i < response.data.length; i++) {

                var chosen = response.data[i]; //stores current data in variable

                var rtg = $("<h3>"); //creates an h3 element
                var img = $("<img class='gif image-fluid'>"); //creates an img element
                var title = $("<h4>"); //creates an h4 element
                var score = $("<h4>"); //creates an h4 element
                var dwn = $("<a download class='gif-link'>"); //creates an a element
                var dwnBtn = $("<button class='btn btn-info'>"); //creates an button element
                var fav = $("<i class='far fa-star star'></i>");

                rtg.text("Rating: " + chosen.rating); //sets text in h3 to rating property
                img.attr('src', chosen.images.original_still.url); //sets source attribute in img to GIF's still image
                title.text("Title: " + chosen.title); //sets text in h4 to title property
                score.text("Score: " + chosen._score); //sets text in h4 to score property

                //sets data attributes of img to control GIF state
                img.attr('data-still', chosen.images.original_still.url);
                img.attr('data-animated', chosen.images.original.url);
                img.attr('data-state', 'still');

                dwn.attr('href', img.attr('data-animated')); //sets link to GIF url for download
                dwn.append(dwnBtn); //appends button to a element
                dwn.text("Download!"); //sets text in a element to download

                var div = $("<div>"); //creates a div element
                div.append(rtg, img, title, score, dwn, fav); //appends previous elements to div
                $(".gifs").append(div); //appends div to div with all GIFs
            }
        });

        queryURL = "https://www.omdbapi.com/?t=" + search + "&apikey=trilogy&plot=full";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var h3 = $("<h3>");
            var title = $("<p>");
            var year = $("<p>");
            var actors = $("<p>");
            var plot = $("<p>");
            var poster = $("<img class='image-fluid'>")

            console.log(response.Response);
            if (response.Response === "True") {
                h3.text("Movie:");
            }
            else {
                h3.text(response.Error)
            }

            title.text(response.Title);
            year.text(response.Year);
            actors.text(response.Actors);
            plot.text(response.Plot);

            if (response.Poster !== "N/A") {
                poster.attr('src', response.Poster);
                $(".movies").html(h3).append(title, year, actors, plot, poster);
            }
            else {
                $(".movies").html(h3).append(title, year, actors, plot);
            }

        })
    });

    //GIFs click event handler with delegation
    $(".gifs, .favs").on('click', '.gif', function () {

        var state = this.dataset.state; //stores the data-state attribute value in variable

        //checks if GIF state is still or animated
        if (state === "still") {
            $(this).attr('src', this.dataset.animated); //changes GIF source to animated GIF
            this.dataset.state = 'animated'; //sets data-state attribute to animated
        }
        else if (state === "animated") {
            $(this).attr('src', this.dataset.still); //changes GIF source to still GIF
            this.dataset.state = 'still'; //sets data-state attribute to still
        }
    });

    $(".gifs, .favs").on('mouseenter', '.star', function () {
        if ($(this).hasClass('far')) {
            $(this).removeClass('far').addClass('fas');
        }
        else {
            $(this).removeClass('fas').addClass('far');
        }
    }).on('mouseleave', '.star', function () {
        if ($(this).hasClass('far')) {
            $(this).removeClass('far').addClass('fas');
        }
        else {
            $(this).removeClass('fas').addClass('far');
        }
    });

    $(".gifs").on('click', '.star', function () {
        var gfav = $(this).parent();
        $('.favs').append(gfav);

        pa = $('.favs').html();

        $(this).removeClass('fas').addClass('far');

        sendToStorage();
    });

    $(".favs").on('click', '.star', function () {
        var gfav = $(this).parent();
        $('.gifs').append(gfav);

        pa = $('.favs').html();

        $(this).removeClass('far').addClass('fas');

        sendToStorage();
    });


    if (localStorage.getItem('favorites') !== null) {
        var st = localStorage.getItem('favorites');
        pa = JSON.parse(st);

        $('.favs').html(pa);
    }

});

//function to create buttons
function createButton(b) {

    var btn = $("<button>");
    btn.addClass("btn btn-info option");

    btn.text(b);

    $(".topics-buttons").append(btn);

}

function sendToStorage() {
    localStorage.clear();

    localStorage.setItem('favorites', JSON.stringify(pa));
}
