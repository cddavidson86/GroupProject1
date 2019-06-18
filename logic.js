// Comment everything you code!!

var keyword = "";

function searchResult() {
    var movieKey = "eb91f19f";
    var resultURL = "https://www.omdbapi.com/?apikey=" + movieKey + "&s=" + keyword + "&plot=full&r=json";

    $.ajax({
        url: resultURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        var search = response.Search;
        for (var j = 0; j < search.length; j++) {
            
            var total = [];
            total.push(response.Search[j].Title);

            var newTitle = $("<h4>");
            var newRow = $("<div class='row'>");
            newTitle.addClass("search-result");
            newTitle.attr(response.Search[j].Title);
            newTitle.text(response.Search[j].Title);

            newRow.append(newTitle);
            $("#search-content-div").append(newRow);
        


            console.log(response.Search[j].Title);
    
        $("#search-input").val("");

        }
       
    })
}



// This function searches OMDB for the keyword
function omdbSearch() {
    //OMDB Api Key
    var movieKey = "eb91f19f";
    var searchURL = "https://www.omdbapi.com/?apikey=" + movieKey + "&t=" + keyword + "&plot=full&r=json";

    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
             
            var poster = response.Poster;
            console.log(poster);
            var moviePoster = $("#movie-poster");
                moviePoster.attr("src", poster);
                

            var title = response.Title;
            $("#movie-title").text("Title: " + title);  

            var actors = response.Actors;
            $("#movie-actors").text("Actors: " + actors);

            var year = response.Year;
            $("#movie-year").text("Year: " + year);

            var plot = response.Plot;
            $("#movie-plot").text("Plot: " + plot);

            // $("#search-input").val("");
    });
}

// Function that searches Reddit for keyword
function redditSearch() {
    
    var redditURL = "https://www.reddit.com/search.json?&sort=top&limit=25&t=all&self=yes&q=" + keyword + " movie";

    $.ajax({
        url: redditURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data.children);
        displayReddit(response);
    });

}

function displayReddit(response) {
    $("#reddit-results-row").empty();

    //This variable keeps track of the # of posts we've added
    var postCount = 0;

    //While the number of posts is less than 5...
    while (postCount < 9) {

        //Run this for each function that will append the reddit image, link and title to the page
        response.data.children.forEach(function (post) {

            //variable automatically set to false
            var isImage = false;

            //This function checks if the url of the post is an image
            function isUrlImage(url) {
                //make sure we remove any nasty GET params 
                url = url.split('?')[0];
                //moving on, split the uri into parts that had dots before them
                var parts = url.split('.');
                //get the last part ( should be the extension )
                var extension = parts[parts.length - 1];
                //define some image types to test against
                var imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
                //check if the extension matches anything in the list.
                if (imageTypes.indexOf(extension) !== -1) {
                    isImage = true;
                    return true;
                } else {
                    isImage = false;
                    return false;
                }
            }

            //Here we call the isUriImage function for each of the posts' urls
            isUrlImage(post.data.url);

            //While the url is an image and the post count is less than 5...
            if (isImage === true && postCount < 9) {

                // create these variables using the still image and gif urls
                var title = post.data.title;
                var subreddit = post.data.subreddit;
                var imgURL = post.data.url;
                var thumbnail = post.data.thumbnail;
                var count = 0;

                console.log("Title: " + title + "  Subreddit: " + subreddit + "  URL: " + imgURL + "  Thumbnail: " + thumbnail);

                // makes new image tag for each gif and adds the following attr and class
                var image = $("<img>");
                image.attr("src", imgURL);
                image.addClass("reddit-img");
                image.attr("id", 'result-' + count);

                //New div and paragraph information
                var newp = $("<p class='post-tag'> Title: " + title + "<br></br> Subreddit: " + subreddit + "</p>");
                var newa = $("<a href=" + imgURL + ">")
                var newDiv = $("<div class='col-lg-3 reddit-result-col'>");
                newDiv.attr("id", 'div-result' + count);

                // Append(image) to reddit results row
                $("#reddit-results-row").append(newa);
                $(newa).append(newDiv);
                $(newDiv).append(image);
                $(newDiv).append(newp);
                console.log("Count = " + count);
                count++; 
                postCount++
            } else {
                return;
            }
            console.log("Post Count =" + postCount);
        })
    }

}



// On click search button...
$("#submit-btn").on("click", function () {
    event.preventDefault();

    keyword = $("#search-field").val();
    // keyword = keyword.replace(" ", "+");
    
    // window.location.href = 'results.html?title=' + keyword;
    // console.log(window.location.href);


    // //For Testing...
    // omdbSearch();
    // redditSearch();

    searchResult();

});




// After clicking a movie...

$(".search-result").on("click", function () {
    event.preventDefault();

    //Need something that will grab the movie's title
    keyword = $("#search-input").val();

    window.location.href = 'movie.html?title=' + keyword;

    omdbSearch();
    redditSearch();
})



