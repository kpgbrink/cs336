$(document).ready(function() {
    $('button').click(function(event) {
        // remove previous data
        $('#data').remove();
        let text = $("<p id='data'></p>").text('no data yet...');
        $('#paragraphAdd').append(text);
        // Ajax request
        console.log('AJAX request issued..');
        $.ajax({
            url: '/fetch',
            type: 'GET',
            data: {
                name: 'lab7 :)'
            }
        })
        .done(function(result) {
            console.log('AJAX request succedded...');
            // change text to received data from the server
            $('#data').text(result.content);
           // alert(result.content);
        })
        .fail(function(xhr, status, errorThrown) {
            console.log('AJAX request failed...');
        })
    });
});