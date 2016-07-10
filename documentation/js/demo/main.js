$(function(){
    $('.container').scrollspy({ 
        target: 'docs-sidebar' 
    });
    $('[data-toggle=tooltip]').tooltip();
    $('[data-toggle=popover]').popover();
    $('[href=#]').click(function(ev){
        ev.preventDefault();
    });
});