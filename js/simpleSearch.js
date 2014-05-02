// Doc ready
$(function(){
    
})

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
            .append( doc.title )
            .prop( href, doc.url);
        result.find( ".url" ).append( doc.url );
        result.find( "content " ).append( doc.content );
        $container.add(result);
    });
}
