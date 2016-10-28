$( ()=> {
    $( "input[type=date]" ).datepicker({dateFormat: "yy-mm-dd"});
    $( 'form' ).submit(function( event ) {
        event.preventDefault();
        var form = $( this );
        
        $.ajax({
            type: 'POST',
            url: `/people`,
            data: form.serialize(),
            dataType: 'json',
            success: function( resp ) {
                console.log( resp );
                let text = $("<p></p>").text(JSON.stringify(resp));
                $("body").append(text);
            }
        });
    });
});