
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
    // Clear console of previous info
    console.clear();

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
    // Shows titles in relation to search
    for(var i=0; i < data.query.search.length; i++) {

        title = data.query.search[i].title;
        snippet = data.query.search[i].snippet;

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
    alert('title: ' + title + '\n snippet: ' + snippet);
}
