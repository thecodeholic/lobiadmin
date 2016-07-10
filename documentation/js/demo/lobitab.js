$(function(){
    $('#lobitab-demo').lobiTab();
    $('#lobitab-demo-basic').lobiTab();
    $('#lobitab-demo-icons').lobiTab();

    $('#lobitab-demo-disable-close').lobiTab({
        closable: false,
        sortable: false,
        newTabTitle: 'Custom title',
        newTabContent: 'Content of new tab',
        addNewTabIcon: 'fa fa-plus'
    });
    $('#lobitab-demo-ajax').lobiTab({
        loadByAjax: true,
        lazyLoad: true,
        loadOnce: false
    });
    $('#lobitab-demo-nested').lobiTab();
    $('#lobitab-demo-nested .lobitab').lobiTab();

    $('#id-nav-tabs-pull-right').lobiTab();
    $('#id-nav-tabs-left').lobiTab();
    $('#id-nav-tabs-right').lobiTab();
    $('#id-nav-tabs-justified').lobiTab();
});