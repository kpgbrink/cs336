$( ()=> {
    $( 'form' ).submit(function( event ) {
        event.preventDefault();
        var form = $( this );
        
        $.ajax({
            type: 'GET',
            url: `/person/${form.find("[name=id]").val()}`,
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