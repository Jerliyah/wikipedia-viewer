
function build_wiki_search_url(pattern) {
    var base_url = "https://en.wikipedia.org/w/api.php";
    var format = "&format=json";
    var request_url = "?action=query&format=json&list=search&srsearch=";
    var url = base_url + request_url + pattern;
    return url;
}

var pattern = "movies";
var url = build_wiki_search_url(pattern);

$.ajax({
    type: "GET",
    url: url,
    dataType: 'jsonp',
    success: formatResponse,
    error: function(errorMessage) {
         console.log("damnn");
      }
});

function formatResponse(data) {
    // Shows titles in relation to search
    for(var i=0; i < data.query.search.length; i++) {
        console.log(data.query.search[i].title);
        formatSnippet(data.query.search[i].snippet);
    }

}

function formatSnippet(snippet) {
    var excess1 = '<span class="searchmatch">';
    var excess2 = '</span>';

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    var beginTagRemoved = replaceAll(snippet, excess1, '');
    var endTagRemoved = replaceAll(beginTagRemoved, excess2, '');

    console.log( endTagRemoved.replace( '(disambiguation)', '') );
}



// $.ajax( {
//     url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&callback=?titles=Main%20Page',
//     dataType: 'json',
//     type: 'POST',
//     headers: { 'Api-User-Agent': 'Example/1.0' },
//     success: function(data) {
//        console.log(data);
//    },
//    error: function() {
//        console.log("didn't work");
//    }
// } );
