console.log("Hello, console!");

$(document).ready(function() {
    $('.block').fadeOut(9000);

    $('li').mouseenter(function() {
        $(this).animate({
            height: '+=10px'
        });
    });

    $('li').mouseleave(function() {
       $(this).animate({
           height: '-=10px'
       }); 
    });

    // http://stackoverflow.com/a/15014147/2948122
    var $typer = $('.typer'),
        txt = $typer.data('text'),
        tot = txt.length,
        ch = 0;
    (function typeIt() {
        if(ch > tot) return;
        $typer.text( txt.substring(0, ch++) );
        setTimeout(typeIt, ~~(Math.random()*(300-60+1) + 60));
    }());
});
