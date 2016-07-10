$(function(){
    $('.lobipanel').lobiPanel();
    $('#demoPanel11').lobiPanel();
    $('#lobipanel-basic').lobiPanel();
    $('#lobipanel-custom-control').lobiPanel({
        reload: false,
        close: false,
        editTitle: false
    });
    $('#lobipanel-font-awesome').lobiPanel({
        reload: {
            icon: 'fa fa-refresh'
        },
        editTitle: {
            icon: 'fa fa-edit',
            icon2: 'fa fa-save'
        },
        unpin: {
            icon: 'fa fa-arrows'
        },
        minimize: {
            icon: 'fa fa-chevron-up',
            icon2: 'fa fa-chevron-down'
        },
        close: {
            icon: 'fa fa-times-circle'
        },
        expand: {
            icon: 'fa fa-expand',
            icon2: 'fa fa-compress'
        }
    });
    $('#lobipanel-constrain-size').lobiPanel({
        minWidth: 300,
        minHeight: 300,
        maxWidth: 600,
        maxHeight: 480
    });
    $('#lobipanel-from-url').on('loaded.lobiPanel', function (ev, lobiPanel) {
        var $body = lobiPanel.$el.find('.panel-body');
        $body.html('<div class="highlight"><pre><code>' + $body.html() + '</code></pre></div>');
        hljs.highlightBlock($body.find('code')[0]);
    });
    $('#lobipanel-from-url').lobiPanel({
        loadUrl: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.css',
        bodyHeight: 400
    });
    $('#lobipanel-multiple .panel').lobiPanel({
        sortable: true
    });
});