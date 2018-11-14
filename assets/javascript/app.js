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

var btn;
var imageURL = [];
var stillImageURL = [];
var url;


$(document).ready(function () {

    for (var i = 0; i < topics.length; i++) {

        createButton(topics[i]);
    }

    $(".add-submit").click(function () {

        var added = $(".add-input").val();

        createButton(added);
    })

    $(".topics-buttons").on('click', '.option', function () {
        var search = $(this).text();
        search.split(' ').join('+');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=AefenpNDGmxeIlw72Y8YH5XkhUgP1kSu&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var r = response;

            for (var i = 0; i < r.data.length; i++) {
                var chosen = r.data[i];
                var img = $("<img class='gif image-fluid'>");
                var rtg = $("<h3>");
                var title = $("<h4>");
                var score = $("<h4>");
                var dwn = $("<a download class='gif-link'>");
                var dwnBtn = $("<button class='btn btn-info'>");
                dwn.append(dwnBtn);
                rtg.text("Rating: " + chosen.rating);
                img.attr('src', chosen.images.original_still.url);
                title.text("Title: " + chosen.title);
                score.text("Score: " + chosen._score);
                url = chosen.images.original.url;

                dwn.text("Download!");

                var div = $("<div>");
                div.append(rtg, img, title, score, dwn);
                $(".gifs").append(div);
            }

            $(".container").on('click', '.gif', function () {

                url = $(this).attr('src');

                var index = url.indexOf("giphy_s");

                if (index !== -1) {
                    url = url.replace("giphy_s", "giphy");
                    $(this).attr('src', url);
                }
                else {
                    url = url.replace("giphy.gif", "giphy_s.gif");
                    $(this).attr('src', url);
                }



            });




        });
    });

});


function createButton(b) {

    var btn = $("<button>");
    btn.addClass("btn btn-info option");

    btn.text(b);

    $(".topics-buttons").append(btn);

}