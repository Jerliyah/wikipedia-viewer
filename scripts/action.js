
// Build url for search
function build_wiki_search_url(pattern) {
    var base_url = "https://en.wikipedia.org/w/api.php";
    var format = "&format=json";
    var request_url = "?action=query&format=json&list=search&srsearch=";
    var url = base_url + request_url + pattern;
    return url;
}

// Start search on button click
$('#search-btn').click( function() {
    // Clearing of previous info
    console.clear();
    $('main').html('');

    // Change Styling
    // Aside sits at top with horizontal child elements
    $('aside').css("height", "auto");
    $('aside').css("flex-direction", "row");
    $('aside').css("justify-content", "space-around");

    // Search based on user input
    var pattern = $('#search-input').val();
    var url = build_wiki_search_url(pattern);

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'jsonp',
        success: formatResponse,
        error: function(errorMessage) {
             console.log("data not received");
          }
    });
});


function formatResponse(data) {
    var entries = data.query.search;
    var numOfEntries = entries.length;

    // Shows titles in relation to search
    for(var a=0; a < numOfEntries; a++) {

        title = entries[a].title;
        snippet = entries[a].snippet;

        // Present in HTML doc + console
        intoHTML(formatTitle(title), formatSnippet(snippet));
    }
}

function formatTitle(title) {
    console.log(title);
    return title;
}

function formatSnippet(snippet) {
    var excess1 = '<span class="searchmatch">';
    var excess2 = '</span>';

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    var beginTagRemoved = replaceAll(snippet, excess1, '');
    var endTagRemoved = replaceAll(beginTagRemoved, excess2, '');

    // Extra white space removed
    var finalSnippet = endTagRemoved.replace(/\s+/g, " ");
    console.log(finalSnippet + '\n\n');

    return finalSnippet;
}


function intoHTML(title, snippet) {

        // Individual divs created and populated
        var $div = $('<div></div>');
        $div.html('<h1>' + title + '</h1>  <h3>' + snippet + ' </h3>');

        // Each div added to main area
        $('main').append($div);
}
