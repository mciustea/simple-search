// Doc ready
$(function(){

})


function search(query, $container, $template){
    $.ajax({
        type: 'GET',
        url: 'http://128.95.157.44',
        dataType: 'JSONP',
        data: {
	    'q': query,
	    'qf': 'content title^3.0',
	    'wt': 'json',
	    'indent': 'false',
	    'defType': 'edismax',
        },
        jsonp: 'json.wrf',
        success: function (data) {
	    renderResults(data.response.docs, $container, $template);
        }
    });
}

// Input: JSON array of results, results container, result HTML template
// Effect: Replaces results container with new results, and renders
// the appropriate HTML
// Output: void
function renderResults(docs, $container, $template){
    $container.empty(); // If there are any previous results, remove them
    var result;
    $.each(docs, function(index, doc){
        result = $template.clone();
        result.find( ".title > a" )
            .prop( "href", doc.url)
            .find( "h3" )
            .append( doc.title );
        result.find( ".url" ).append( doc.url );
        result.find( ".content" ).append( maxWords(doc.content, 100) );
        result.removeClass( "template" );
        $container.append(result);
    });
}

// Cuts off lengthy content to a given maximum number of words
// Input: string of words, maximum number of words
// Effects: none
// Output: the trimmed words
function maxWords(content, max) {
    var words = content.split(' ', max);
    var idx;
    var cutContent = "";
    for (idx = 0; idx < words.length; idx++) {
	cutContent += words[idx];
	cutContent += (idx + 1 == words.length ? "" : " ");
    }
    return cutContent + "...";
}
