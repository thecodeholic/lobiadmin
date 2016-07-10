$(function(){
    var codes = $('.highlight code');
    codes.each(function (ind, el) {
        hljs.highlightBlock(el);
    });
});