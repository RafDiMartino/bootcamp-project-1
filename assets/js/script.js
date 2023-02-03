const youtubeAPI = "AIzaSyARAdM68mQB0klzmy4LNFuo2e8Z4t4BQu8"
const pastSearches = $(".history");
var videoTest = $("#youtube-test")
var wikipediaTest = $("#wikipedia-test")
var search = "";
var searchHistory = [];

//Modal
$('#exampleModal').modal('show');

// Event listener to get the search value
$(".search-button-class").click(function(e) {
    e.preventDefault()
    search = $("#search-input").val();
    $("div#container").removeClass("hide");
    getWikiArticles()
    wikipediaTest.empty()
    // getYoutubeVideo()
    // videoTest.empty()
    if (searchHistory.includes(searchHistory) || search === "") {
        return
    }else{
        searchHistory.push(search)
        console.log(searchHistory)
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        initSearchHistory()
    } 
});

$(".search-button-modal").click(function(e) {
    e.preventDefault()
    search = $("#search-input-modal").val();
    console.log(search)
    $("div#container").toggleClass("hide");
    wikipediaTest.empty()
    getWikiArticles()
    
    // getYoutubeVideo()
    // videoTest.empty()
    if (searchHistory.includes(searchHistory) || search === "") {
        return
    }else{
        searchHistory.push(search)
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        initSearchHistory()
    } 
});

// Function to get Youtube videos
// function getYoutubeVideo(){
//     var queryURL = "https://www.googleapis.com/youtube/v3/search?key="+ youtubeAPI +"&q="+ search +"&type=video&part=snippet&videoEmbeddable=true&videoSyndicated=true&videoLicense=youtube&order=viewCount"
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         error: () => {
//             alert("error")
//             return
//         },
//     }).then(function(youtubeData) {
//         console.log(youtubeData)
//         for (let i = 0; i < youtubeData.items.length; i++) {
//             var videoId = youtubeData.items[i].id.videoId;
//             videoTest.append(`
//                 <iframe width="420" height="315"
//                     src="https://www.youtube.com/embed/${videoId}">
//                 </iframe>
//             `);
//         }
//     });   
// }

//Function to get Wikipedia articles
function getWikiArticles(){
    // var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&format=json&origin=*"
    //var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+ search +"&rvslots=*&rvprop=content&format=json&origin=*"
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=allimages&aifrom=B&generator=search&links&gsrsearch="+ search +"&gsrlimit=1&prop=pageimages|extracts&exintro&exlimit=max&format=json&origin=*&pithumbsize=1000"
    //var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+ search +"&rvslots=*&rvprop=content&format=json&origin=*"
    //var queryURL = "http://en.wikipedia.org/w/api.php?action=parse&format=json&page=Rome&prop=text|extract&format=json&origin=*"
    $.ajax({
        url: queryURL,
        method: "GET",
        error: () => {
            alert("error")
            return
        },
    }).then(function(wikiData) {
        // console.log(wikiData);
        var results = wikiData.query.pages
        Object.keys(results).forEach( key => {
            const id = key
            const title = results[key].title
            const text = results[key].extract
            // console.log(results[key].extract)
            const image = results[key].thumbnail.source
            wikipediaTest.append(`
                <h2>${title}</h2>
                <img src="${image}">
                <p>${text}</p>
            `)
        }) 
        // console.log(results)
    });
}

// Adds a click event to all the buttons wiht a class of past-search 
$(document).on('click', '.past-search', historySearches);

// Function to re-display the current weather based on the click of past-searches buttons
function historySearches(){
    search = $(this).attr("data-search")
    $("div#container").removeClass("hide");
    getWikiArticles()
    wikipediaTest.empty()
    // getYoutubeVideo()
    // videoTest.empty()
}

//function to get past searches from local storage
function initSearchHistory(){
    var storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
        // console.log(searches)
        renderSearchHistory(searchHistory);
        
    }
}

//Function to render past searches buttons
function renderSearchHistory(searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
        const element = searchHistory[i];
        if (searchHistory[i].includes(search)) {
            pastSearches.prepend($(`<button class="past-search btn btn-outline-dark mb-2" data-search="${element}" data-dismiss="modal">`).text(element));
        } 
        console.log(searchHistory[i])
    }
}
initSearchHistory()