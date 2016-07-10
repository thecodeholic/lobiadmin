//Author      : @arboshiki
/**
 * Generates random string of n length. 
 * String contains only letters and numbers
 * 
 * @param {int} n
 * @returns {String}
 */
Math.randomString = function(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

$(function(ev) {
    var LobiTab = function(el, options){
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$el;
        this.$nav;
        this.$content;
        this.$options;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------        
        var me = this;
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        var _processInput       = function(options){
            options = $.extend({}, LobiTab.DEFAULT_OPTIONS, options);
            return options;
        };
        var _init               = function(){
            me.$el.addClass('lobitab');
            me.$nav = me.$el.find('>.nav-tabs');
            me.$content = me.$el.find('>.tab-content');
            
            _prepare();
            
            _addNewTabBtn();
            me.enableClose();
            _editOnDblClick();
            _enableCloseOnWheelClick();
            _loadByAjax();
            _triggerEvent('init.lobiTab');
        };
        var _addNewTabBtn       = function(){
            if ( ! me.$options.showAddNewBtn) {
                return;
            }
            var li = $('<li class="lobitab-add-new"></li>')
                    .append($('<a role="tab" data-toggle="tab">\n\
                        <i class="'+me.$options.addNewTabIcon+'"></i>\n\
                    </a>'));
            me.$el.find('>.nav-tabs').append(li);
            li.click(function(ev){
                ev.stopPropagation();
                _newTabBtnClick();
            });
        };
        var _newTabBtnClick     = function(){
            me.addNewTab();
        };
        var _createTabControl   = function(href){
            return $('<li><a href="'+href+'" role="tab" data-toggle="tab"><span class="lobitab-title"></span></a></li>');
        };
        var _createTabPane      = function(id){
            return $('<div class="tab-pane" id="'+id+'"></div>');
        };
        var _createInput        = function(){
            var input = $('<input type="text"/>');
            input.on('keyup', function(ev){
                if (ev.which === 13){
                    me.finishTitleEditing();
                }
            });
            input.on('blur', function(){
                me.finishTitleEditing();
            });
            return input;
        };
        var _editOnDblClick     = function(){
            if ( ! me.$options.editTitle) {
                return;
            }
            me.$nav.find('a').on('dblclick', function(ev){
                me.startTitleEditing($(this));
            });
        };
        var _enableDblClick     = function(a){
            if ( ! me.$options.editTitle) {
                return;
            }
            a.on('dblclick', function(ev){
                me.startTitleEditing(a.attr('href'));
            });
        };
        var _enableCloseOnWheelClick= function(){
            if (me.$options.closeOnWheelClick) {
                me.$nav.find('a').on('click', function(ev) {
                    ev.preventDefault();
                    if (ev.which === 2){
                        me.removeTab($(this).attr('href'));
                    }
                });
            }
        };
        var _addCloseOnWheelClick = function(a) {
            a.on('click', function(ev) {
                ev.preventDefault();
                if (ev.which === 2){
                    me.removeTab($(this));
                }
            });
        };
        var _prepare            = function(){
            if (me.$options.sortable){
                _enableSorting();
            }
            var controls = me.$nav.find('a:not(:has(.lobitab-title))');
            controls.each(function(index, el) {
                var $el = $(el);
                $el.html('<span class="lobitab-title">'+$el.html()+'</span>');
            });
        };
        var _addCloseBtn        = function(a){
            if ( ! me.$options.closable) {
                return;
            }
            if (a.find('.lobitab-close').length > 0){
                return;
            }
            var close = $('<button class="lobitab-close">&times;</button>');
            close.click(function(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                var a = $(this).parent();
                me.removeTab(a);
            });
            a.append(close);
        };
        var _triggerEvent       = function(eventType){
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(me);
            me.debug('event "'+eventType+'" triggered');
            me.$el.trigger(eventType, args);
        };
        var _findItemToActivate = function($li){
            if ($li.hasClass('active')) {
                var $itemToActivate = $li.prev();
                if ($itemToActivate.length === 0) {
                    $itemToActivate = $li.next();
                }
                if ($itemToActivate.length === 0 && $li.closest('ul').hasClass('dropdown-menu')){
                    return _findItemToActivate($li.closest('ul').parent());
                }
                return $itemToActivate.find('>a');
            }
            return null;
        };
        var _enableSorting = function(){
            me.$nav.sortable({
                items: 'li:not(.lobitab-add-new)',
                placeholder: 'lobitab-placeholder',
                forcePlaceholderSize: true
            });
        };
        var _disableSorting = function(){
            me.$nav.sortable("destroy");
        };
        var _loadByAjax = function(){
            if ( ! me.$options.loadByAjax){
                return;
            }
            
            if (me.$options.lazyLoad){
                var $a = me.$nav.find('li.active a');
                _loadForTab($a);
                _enableLazyLoading();
            }else{
                var $a_s = me.$nav.find('a');
                $a_s.each(function(ind, el){
                    _loadForTab($(el));
                });
            }
        };
        var _loadForTab = function($a){
            var url = $a.data('load-url');
            var $pane = $($a.attr('href'));
            if (url){
                if ( ! $pane.data('loaded') || ! me.$options.loadOnce){
                    $pane.load($a.data('load-url'), null, function(){
                        $pane.data('loaded', true);
                    });
                }
            }
        };
        var _enableLazyLoading = function(){
            me.$el.find('[data-toggle=tab]').on('show.bs.tab', function(){
                if (me.$options.loadByAjax){
                    _loadForTab($(this));
                }
            });
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        this.debug              = function(){
            if (me.$options.debug){
                window.console.log.apply(window.console, arguments);
            }
        };
        /**
         * Start editing title of given tab
         * 
         * @param {String|jQuery} a REQUIRED "href attribute or jQuery object of <a> element"
         * @returns {LobiTab}
         */
        this.startTitleEditing  = function(href){
            var a = href;
            if (typeof href === 'string'){
                a = me.$nav.find('a[href="'+href+'"]');
            }
            if (me.isTitleEditing()) {
                me.finishTitleEditing();
            }
            var input = _createInput();
            input.insertAfter(a.find('.lobitab-title'));
            input.val(a.find('.lobitab-title').html());
            a.find('.lobitab-title, .lobitab-close').hide();
            input[0].focus();
            input[0].select();
            _triggerEvent('startEditing.lobiTab', a);
            return me;
        };
        /**
         * Finish editing of title
         * 
         * @returns {LobiTab}
         */
        this.finishTitleEditing = function(){
            var input = me.$nav.find('input');
            var a = input.parent();
            a.find('.lobitab-title').html(input.val()).show();
            a.find('.lobitab-close').show();
            input.remove();
            _triggerEvent('finishEditing.lobiTab', a);
            return me;
        };
        /**
         * Check if panel title is being edited (if it is in edit process)
         * 
         * @returns {Boolean}
         */
        this.isTitleEditing   = function(){
            var input = me.$nav.find('input');
            if (input.length === 0){
                return false;
            }
            return true;
        };
        /**
         * Enable close buttons in tabs
         * 
         * @returns {LobiTab}
         */
        this.enableClose        = function(){
            var controls = me.$nav.find('li');
            controls.each(function(index, li){
                var $li = $(li);
                if ($li.hasClass('lobitab-add-new')){
                    return;
                }
                _addCloseBtn($li.find('>a'));
            });
            return me;
        };
        /**
         * Disable close buttons inside tabs
         * 
         * @returns {LobiTab}
         */
        this.disableClose       = function(){
            me.$nav.find('a .lobitab-close').remove();
            return me;
        };
        /**
         * Remove tab
         * 
         * @param {String|jQuery} href REQUIRED "href attribute of <a> element (tab control) or jQuery object of <a> elements"
         * @returns {LobiTab}
         */
        this.removeTab          = function(href){
            var $li;
            //The href parameter will be either string - href attribute of a element (tab control)
            if (typeof href === 'string'){
                $li = me.$nav.find('a[href="'+href+'"]').parent();
            }
            //or jQuery object of <a> elements
            else if (href instanceof jQuery){
                if (href.length === 0){
                    return me;
                }
                if (href.length > 1){
                    href.each(function(index, a){
                        me.removeTab($(a));
                    });
                }else{
                    $li = href.parent();
                    href = href.attr('href');
                }
            }
            var dropdownMenu = $li.find('.dropdown-menu');
            if (dropdownMenu.length > 0){
                dropdownMenu.each(function(index, ul){
                    var tabs = $(ul).find('>li>a');
                    tabs.each(function(ind, a){
                        me.removeTab($(a));
                    });
                });
            }else{
                var $pane = $(href);
                $pane.remove();
                var $ul = $li.parent();
                var $itemToActivate = _findItemToActivate($li);
                if ($itemToActivate)
                        $itemToActivate.tab('show');
                $li.remove();
                if ($ul.hasClass('dropdown-menu')) {
                    if ($ul.find('>li').length === 0) {
                        $ul.closest('li').remove();
                    }
                }
                _triggerEvent('removed.lobiTab', href);
            }
            return me;
        };
        /**
         * Add new tab
         * 
         * @param {String} OPTIONAL tabTitle "tab title"
         * @param {String} OPTIONAL tabContent "tab content"
         * @param {String} OPTIONAL id "id attribute of .tab-pane"
         * @returns {LobiTab}
         * 
         */
        this.addNewTab          = function(tabTitle, tabContent, id){
            if ( ! tabTitle){
                tabTitle = me.$options.newTabTitle;
            }
            if ( ! tabContent){
                tabContent = me.$options.newTabContent;
            }
            if ( ! id){
                id = Math.randomString(10);
            }
            var $pane = _createTabPane(id);
            var href  = '#'+id;
            var $control = _createTabControl(href);
               
            $control.find('a .lobitab-title').html(tabTitle);
            $pane.html(tabContent);
            var addNewTab = me.$nav.find('.lobitab-add-new');
            //If addNewTab button is not activated we just append control into ul
            if (addNewTab.length === 0){
                me.$nav.append($control);
            }else{
                $control.insertBefore(addNewTab);
            }
            me.$content.append($pane);
            var $a = $control.find('a');
            if (me.$options.newTabSetActive){
                $a.tab('show');
            }
             _addCloseBtn($a);
             _enableDblClick($a);
            _addCloseOnWheelClick($a);
            _triggerEvent('added.lobiTab', $a);
            if (me.$options.editTitle && me.$options.editNewTab) {
                me.startTitleEditing($a);
            }
            return me;
        };
        /**
         * Get the title of specific element
         * 
         * @param {String|jQuery} href REQUIRED "href attribute or jQuery object of <a> element"
         * @returns {String}
         */
        this.getTitle           = function(href){
            var item = href;
            if (typeof href === "string"){
                item = me.$nav.find('a[href="'+href+'"]');
            }
            return item.find('.lobitab-title').html();
        };
        /**
         * Setter method of newTabTitle property
         * 
         * @param {String} title REQUIRED
         * @returns {LobiTab}
         */
        this.setNewTabTitle     = function(title){
            me.$options.newTabTitle = title;
            return me;
        };
        /**
         * Setter method of newTabContent property
         * 
         * @param {String} content REQUIRED
         * @returns {LobiTab}
         */
        this.setNewTabContent   = function(content){
            me.$options.newTabContent = content;
            return me;
        };
        /**
         * Set title of specific tab
         * 
         * @param {String|jQuery} href REQUIRED "href attribute or jQuery object of <a> element"
         * @param {String} title REQUIRED "new title"
         * @returns {LobiTab}
         */
        this.setTitle           = function(href, title){
            var item = href;
            if (typeof href === "string"){
                item = me.$nav.find('a[href="'+href+'"]');
            }
            item.find('.lobitab-title').html(title);
            return me;
        };
        /**
         * Set content of specific tab
         * 
         * @param {String|jQuery} href REQUIRED "href attribute or jQuery object of <a> element"
         * @param {String} title REQUIRED "new content"
         * @returns {LobiTab}
         */
        this.setContent         = function(href, content){
            var item = href;
            if (typeof href === "string"){
                item = me.$content.find(href);
            }
            item.html(content);
            return me;
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$el            = el;
        this.$options       = _processInput(options);
        _init();
        me.debug(me);
    };
    LobiTab.DEFAULT_OPTIONS = {
        debug               : false,
        newTabTitle         : 'new tab',
        newTabContent       : '',
        closable            : true,
        editTitle           : true,
        showAddNewBtn       : true,
        editNewTab          : true,
        newTabSetActive     : true,
        closeOnWheelClick   : true,
        sortable            : true,
        addNewTabIcon       : 'glyphicon glyphicon-plus-sign',
        loadByAjax          : true,
        lazyLoad            : true,
        loadOnce            : false
    };
    $.fn.lobiTab    = function(option){
        var args = arguments;
        var ret;
        return this.each(function(index, el) {
            var $this = $(this);
            var data = $this.data('lobiTab');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('lobiTab', (data = new LobiTab($this, options)));
            }
            if (typeof option === 'string') {
                args = Array.prototype.slice.call(args, 1);
                ret = data[option].apply(data, args);
            }
        });
    };
    $('.lobitab').lobiTab();
});