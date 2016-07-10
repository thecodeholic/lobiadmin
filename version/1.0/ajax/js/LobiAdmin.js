//Author          : @arboshiki

$(document).ready(function(){

    HTMLElement.prototype.startLoading = function(){
        var spinner = $('body>.spinner').clone().removeClass('hide');
        $(this).append(spinner);
    };
    
    HTMLElement.prototype.stopLoading = function(){
        $(this).find('.spinner, .spinner-backdrop').remove();
    };
    
//------------------------------------------------------------------------------
    var CONFIG = window.LobiAdminConfig;
    
    window.LobiAdmin        = function(element, options){
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$el                = null;
        this.$navPanel          = null;
        this.$settingBox        = null;
        this.$contentPanel      = null;
        this.$currentPage       = null;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------
        var me = this;
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        var _init = function(){
            me.$contentPanel = me.$el.find(CONFIG.contentSelector);
            me.$navPanel   = _initNavigation();
            me.$settingBox = $(CONFIG.settingBoxSelector);
            
            
            $('body').data('lobiAdmin', me);
            if ( $(window).width() <= LobiAdmin.SCREEN_MD){
                _enableResponsiveSearchForm();
            }
            _enableResponsiveness();
            _listenSpecificLinks();
            _readLocalStorage();
            _initSettingBox();
            _loadOnHashChange();
            $(window).trigger('hashchange.lobiAdmin');
        };
        var _enableResponsiveSearchForm = function(){
            $(CONFIG.searchFormSelector).find('.btn-search').on('click.lobiAdmin', function(ev){
                ev.preventDefault();
                ev.stopPropagation();
                $(this).closest('.navbar-search').addClass('navbar-search-full')
                    .find('input')[0].focus();
            });
            $(CONFIG.searchFormSelector).find('.btn-remove').on('click.lobiAdmin', function(ev){
                ev.preventDefault();
                ev.stopPropagation();
                me.$el.find('.navbar .navbar-search').removeClass('navbar-search-full');
            });
        };
        var _disableResponsiveSearchForm = function(){
            $(CONFIG.searchFormSelector).find('.btn-search, .btn-remove').off('click.lobiAdmin');
        };
        var _enableResponsiveness = function(){
            $(window).on('resize.lobiAdmin', function(){
               if ( $(window).width() <= LobiAdmin.SCREEN_MD){
                    _disableResponsiveSearchForm();
                    _enableResponsiveSearchForm();
                }else{
                    _disableResponsiveSearchForm();
                }
            });
        };
        var _listenSpecificLinks = function(){
            //Attach event listener to fullScreen buttons
            $(document).on('click', CONFIG.fullScreenSelector, function(ev){
                ev.preventDefault();
                ev.stopPropagation();
                me.toggleFullScreen();
            });
            //Attach event listener to reload ajax page button
            $(document).on('click', CONFIG.reloadPageSelector, function(ev){
                ev.preventDefault();
                me.reload();
                $(this).tooltip('hide');
            });
            //Attach event listener to clear local storage button
            $(document).on('click', CONFIG.clearLocalStorageSelector, function(ev){
                ev.preventDefault();
                if (CONFIG.confirmationBeforeClearStorage){
                    Lobibox.confirm({
                        "msg": CONFIG.clearStorageConfirmationMessage,
                        callback: function(box, type, ev){
                            if (type === 'yes'){
                                _putToLocalStorage({});
                                window.location.reload();
                            }
                        }
                    });
                }else{
                    _putToLocalStorage({});
                }
            });
        };
        var _initSettingBox = function(){
            me.$settingBox.find('.btn-toggle').click(function(){
                me.$settingBox.toggleClass('opened');
            });
            var $fixHeader = me.$settingBox.find('.fix-header');
            var $fixMenu = me.$settingBox.find('.fix-menu');
            var $fixRibbon = me.$settingBox.find('.fix-ribbon');
            $fixHeader.change(function(){
                var $this = $(this);
                if ($this.is(':checked')){
                    me.fixHeader();
                }else{
                    me.unfixHeader();
                    $fixRibbon.prop('checked', false);
                    $fixMenu.prop('checked', false);
                }
            });
            $fixMenu.change(function(){
                var $this = $(this);
                if ($this.is(':checked')) {
                    me.fixMenu();
                    $fixHeader.prop('checked', true);
                } else {
                    me.unfixMenu();
                    $fixRibbon.prop('checked', false);
                }
            });
            $fixRibbon.change(function () {
                var $this = $(this);
                if ($this.is(':checked')) {
                    me.fixRibbon();
                    $fixHeader.prop('checked', true);
                    $fixMenu.prop('checked', true);
                } else {
                    me.unfixRibbon();
                }
            });
            
            me.$settingBox.find('[name="body-bg"]').change(function(){
                var $this = $(this);
                if ($this.is(':checked')){
                    var storage = _getLocalStorage();
                    storage.bodyBg = $this.val();
                    _putToLocalStorage(storage);
                    var BG;
                    if ($this.data('is-color')){
                        BG = $this.val();
                    }else{
                        BG = 'url('+$this.val()+')';
                    }
                    $('body').css('background', BG);
                }
            });
            //Trigger change event of checked body background
            me.$settingBox.find('[name="body-bg"]:checked').trigger('change');
            
            var $themes = me.$settingBox.find('[name="header-skin"]');
            $themes.change(function () {
                var $this = $(this);
                $themes.each(function(ind, el){
                    $('body').removeClass(el.value);
                });
                var storage = _getLocalStorage();
                if ($this.is(':checked') && $this.val() !== '0') {
                    storage.theme = $this.val();
                    $('body').addClass($this.val());
                }else if ($this.is(':checked') && $this.val() === '0'){
                    delete storage.theme;
                }
                
                _putToLocalStorage(storage);
            });
            //Trigger change event of checked theme
            me.$settingBox.find('[name="header-skin"]:checked').trigger('change');
        };
        var _initNavigation = function () {
            var pan = me.$el.find(CONFIG.sidebarSelector);
            var menu = new NavigationPanel(pan, me);
            pan.data('lobiAdmin.navMenu', menu);
            return menu;
        };
        var _triggerEvent = function (eventType) {
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(me);
            me.$el.trigger(eventType+'.lobiAdmin', args);
        };
        var _readLocalStorage = function(){
            if ( ! CONFIG.useLocalStorage){
                return;
            }
            var config = null, 
                fromStorage = localStorage.getItem('lobiAdmin');
            try {
                if (fromStorage) {
                    config = JSON.parse(fromStorage);
                }
            } catch (e) {
                window.console.error('"lobiAdmin" localStorage object is not valid JSON');
            }
            if (config){
                if (config.ribbonFixed){
                    me.$settingBox.find('.fix-ribbon').prop('checked', true);
                    me.$settingBox.find('.fix-menu').prop('checked', true);
                    me.$settingBox.find('.fix-header').prop('checked', true);
                    me.fixRibbon();
                }else if (config.menuFixed){
                    me.$settingBox.find('.fix-menu').prop('checked', true);
                    me.$settingBox.find('.fix-header').prop('checked', true);
                    me.fixMenu();
                }else if (config.headerFixed){
                    me.$settingBox.find('.fix-header').prop('checked', true);
                    me.fixHeader();
                }
                if (config.bodyBg){
                    me.$settingBox.find('[name="body-bg"][value="'+config.bodyBg+'"]').prop('checked', true);
                }
                if (config.theme){
                    me.$settingBox.find('[name="header-skin"][value="'+config.theme+'"]').prop('checked', true);
                }
            }
        };
        var _getLocalStorage = function(){
            var config = null,
                    fromStorage = localStorage.getItem('lobiAdmin');
            try {
                if (fromStorage) {
                    config = JSON.parse(fromStorage);
                }
            } catch (e) {
                window.console.error('"lobiAdmin" localStorage object is not valid JSON');
            }
            return config || {};
        };
        var _putToLocalStorage = function(config){
            if ($.isEmptyObject(config)){
                localStorage.removeItem('lobiAdmin');
            }else{
                localStorage.setItem('lobiAdmin', JSON.stringify(config));
            }
        };
        var _setItemToLocalStorage = function(name, value){
            if ( ! CONFIG.useLocalStorage){
                return;
            }
            var storage = _getLocalStorage();
            storage[name] = value;
            _putToLocalStorage(storage);
        };
        var _deleteItemFromLocalStorage = function(key){
            if ( ! CONFIG.useLocalStorage){
                return;
            }
            var storage = _getLocalStorage();
            delete storage[key];
            _putToLocalStorage(storage);
        };
        /**
         * Activate hashchange event
         * 
         * @returns {void}
         */
        var _loadOnHashChange = function(){
            $(window).on('hashchange.lobiAdmin', function(ev) {
                var link, hash = window.location.hash;
                //If hash is empty we load dashboard
                if (hash === "") {
                    window.location.hash = CONFIG.defaultPage;
                    return;
                }else{
                    link = me.$navPanel.$menu.find('a[href="'+hash+'"]');
                }
                //Hide menu on mobile devices
                if ( ! me.$navPanel.isCollapsed() && $(window).width() < LobiAdmin.SCREEN_MD) {
                    me.$navPanel.hide();
                }
                //set active the item which is loaded
                me.$navPanel.setActive(hash);
                hash = hash.replace(/^#/, '');
                
                var hash = _rewriteUrl(hash);
                
                var innerText = link.find('.inner-text');
                var text = innerText.length === 0 ? link.html() : innerText.html();
                
                me.load(hash, text);
            });
        };
        var _rewriteUrl = function(url){
            if ( ! CONFIG.enableUrlRouting){
                    return url;
            }
            if (LobiAdminRoutes[url]){
                return LobiAdminRoutes[url];
            }
            //look through all routes and find by regexp if such router exists
            for (var i in LobiAdminRoutes){
//                window.console.log("===============================================");
                var route = LobiAdminRoutes[i];
                
                var regExpString = i.replace(/(\_|\-)/g, '\\$1');
                var exp = new RegExp('^'+regExpString+"$", "g");
//                var exp = /^wizard\_(\d+)$/g;
//                window.console.log("string", url);
//                window.console.log("regexp", exp);
                var match = exp.exec(url);
                if (match){
                    var vars = [];
                    var index = 1;
                    while (match[index]){
                        vars.push(match[index++]);
                    }
//                    window.console.log(vars);
                    var replaceVarIndex = 1;
//                    window.console.log(route);
                    while (route.indexOf('$'+replaceVarIndex) > -1){
//                        window.console.log(route);
                        route = route.replace('$'+replaceVarIndex, vars[replaceVarIndex-1])
                        replaceVarIndex++;
                    }
                    return route;
                }
            }
            return url;
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        /**
         * Expand/Collapse to full screen
         * 
         * @returns {LobiAdmin}
         */
        this.toggleFullScreen = function(){
            var elem = me.$el[0];
            // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
                elem.requestFullScreen = elem.requestFullScreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen || elem.msRequestFullscreen;
                elem.requestFullScreen();
                _triggerEvent('expandToFullScreen');
            } else {
                document.cancelFullScreen = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
                document.cancelFullScreen();
                _triggerEvent('collapseFromFullScreen');
            }
            return me;
        };
        /**
         * Loads content by ajax from specified url and changes the window title 
         * if title parameter was provided.
         * 
         * @param {string} url "Relative or absolute url which will be used to load content"
         * @param {string} OPTIONAL title
         * @param {Boolean} OPTIONAL isError "If page is error or not"
         * @returns {NavigationPanel}
         */
        this.load = function (url, title, isError) {
            _triggerEvent('beforePageLoad', url);
            //get the panel in which we are loading page
            var contentPanel = me.$contentPanel;
            contentPanel.html('')[0].startLoading();
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: url,
                success: function (html) {
                    contentPanel.html(html)[0].stopLoading();
                    me.$currentPage = url;
                    me.drawBreadcrumbs();
                    //set the page title
                    if (title) {
                        $('title').html(title);
                    }
                    _triggerEvent('pageLoaded', url);
                },
                error: function (xhr, status, code) {
                    if (!isError) {
                        if (xhr.status === 404) {
                            me.load(CONFIG.error404Page, CONFIG.error404Title, true);
                        } else if (xhr.status === 500) {
                            me.load(CONFIG.error500, CONFIG.error500Title, true);
                        }
                    } else {
                        contentPanel.html('')[0].stopLoading();
                    }
                }
            });
            return me;
        };
        /**
         * Reload the content page
         * 
         * @returns {LobiAdmin}
         */
        this.reload = function(){
            me.load(me.$currentPage);
            _triggerEvent('reload');
            return me;
        };
        /**
         * Draw bread crumbs by selected item in menu
         * 
         * @returns {LobiAdmin}
         */
        this.drawBreadcrumbs = function(){
            var path = me.$navPanel.getActivePath();
            var $br = $(CONFIG.breadcrumbsListSelector);
            $br.html("");
            for (var i = 0; i<path.length; i++){
                var $li;
                if (i === 0){
                    var $li = $('<li>'+path[i].text+'</li>');
                    $li.addClass('active');
                    if (path[i].icon) {
                        $li.prepend(path[i].icon, " ");
                    }
                }else{
                    var $li = $('<li><a href="'+path[i].href+'">' + path[i].text + '</a></li>');
                    if (path[i].icon) {
                        $li.find('>a').prepend(path[i].icon, " ");
                    }
                }
                $br.prepend($li);
            }
            return me;
        };
        /**
         * Fix header
         * 
         * @returns {LobiAdmin}
         */
        this.fixHeader = function(){
            $('body').addClass('header-fixed');
            _setItemToLocalStorage('headerFixed', true);
            return me;
        };
        /**
         * Unfix header. Also unfix menu and ribbon if they are fixed.
         * Because menu and ribbon can not be fixed without header
         * 
         * @returns {LobiAdmin}
         */
        this.unfixHeader = function(){
            $('body').removeClass('header-fixed');
            $('body').removeClass('menu-fixed');
            $('body').removeClass('ribbon-fixed');
            _deleteItemFromLocalStorage('headerFixed');
            _deleteItemFromLocalStorage('menuFixed');
            _deleteItemFromLocalStorage('ribbonFixed');
            return me;
        };
        /**
         * Fix menu. Also fix header
         * 
         * @returns {LobiAdmin}
         */
        this.fixMenu = function(){
            $('body').addClass('menu-fixed');
            $('body').addClass('header-fixed');
            _setItemToLocalStorage('menuFixed', true);
            _setItemToLocalStorage('headerFixed', true);
            return me;
        };
        /**
         * Unfix menu. Also unfix ribbon if it is fix
         * 
         * @returns {LobiAdmin}
         */
        this.unfixMenu = function(){
            $('body').removeClass('menu-fixed');
            $('body').removeClass('ribbon-fixed');
            _deleteItemFromLocalStorage('menuFixed');
            _deleteItemFromLocalStorage('ribbonFixed');
            return me;
        };
        /**
         * Fix Ribbon. Also fix header and menu
         * 
         * @returns {LobiAdmin}
         */
        this.fixRibbon = function(){
            $('body').addClass('ribbon-fixed');
            $('body').addClass('header-fixed');
            $('body').addClass('menu-fixed');
            _setItemToLocalStorage('ribbonFixed', true);
            _setItemToLocalStorage('menuFixed', true);
            _setItemToLocalStorage('headerFixed', true);
            return me;
        };
        /**
         * Unfix ribbon.
         * 
         * @returns {LobiAdmin}
         */
        this.unfixRibbon = function(){
            $('body').removeClass('ribbon-fixed');
            _deleteItemFromLocalStorage('ribbonFixed');
            return me;
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$el                = element;
        _init();
    };
    var LOADED_SCRIPTS = [];
    var LOADED_CSS = [];
    
    /**
     * 
     * @param {String|Array} srcs REQUIRED "single javascript source or array of sources"
     * @param {Function} callback OPTIONAL "function which is executed when all files are successfully loaded"
     * @returns {void}
     */
    LobiAdmin.loadScript = function(srcs, callback){
        if (typeof srcs === 'string') {
            srcs = [srcs];
        }
        var body = document.getElementsByTagName('body')[0];
        var size = srcs.length;
        var countLoaded = 0;
        var allIsAlreadyLoaded = true;
        var SCRIPTS = [];
        var IND = 0;
        for (var i = 0; i < size; i++) {
            if (LOADED_SCRIPTS.indexOf(srcs[i]) > -1) {
                countLoaded++;
                continue;
            }
            allIsAlreadyLoaded = false;
            SCRIPTS[IND] = document.createElement('script');
            SCRIPTS[IND].type = 'text/javascript';
            SCRIPTS[IND].src = srcs[i];
            SCRIPTS[IND].onload = function (e) {
                LOADED_SCRIPTS.push(e.target.getAttribute('src').toString());
                countLoaded++;
                if (countLoaded === size && callback && typeof callback === 'function') {
                    callback();
                }
            };
            body.appendChild(SCRIPTS[IND]);
            IND++;
        }
        if (allIsAlreadyLoaded && callback && typeof callback === 'function') {
            callback();
        }
    };
    /**
     * 
     * @param {String|Array} href REQUIRED "single css source or array of css sources"
     * @param {Function} callback OPTIONAL "function which is executed when all css files are successfully loaded"
     * @returns {void}
     */
    LobiAdmin.loadCSS = function(href, callback){
        
        if (typeof href === 'string'){
            href = [href];
        
        }
        var head = document.getElementsByTagName('head')[0];
        var size = href.length;
        var countLoaded = 0;
        var allIsAlreadyLoaded = true;
        var SOURCES = [];
        var IND = 0;
        for (var i = 0; i < size; i++) {
            if (LOADED_CSS.indexOf(href[i]) > -1) {
                countLoaded++;
                continue;
            }
            allIsAlreadyLoaded = false;
            SOURCES[IND] = document.createElement('link');
            SOURCES[IND].rel = 'stylesheet';
            SOURCES[IND].href = href[i];
            SOURCES[IND].onload = function (e) {
                LOADED_CSS.push(e.path[0].getAttribute('href').toString());
                countLoaded++;
                if (countLoaded === size && callback && typeof callback === 'function') {
                    callback();
                }
            };
            head.appendChild(SOURCES[IND]);
            IND++;
        }
        if (allIsAlreadyLoaded && callback && typeof callback === 'function') {
            callback();
        }
    };
    /**
     * Find <code> tags inside .highlight and highlight them
     * 
     * @returns {void}
     */
    LobiAdmin.highlightCode = function(){
        var $codes = $('.highlight code');
        $codes.each(function(index, el){
            hljs.highlightBlock(el);
        });
    };
    /**
     * Lighten or darken color depending on the amt parameter.
     * If amt is position color will be lighten otherwise it will be darken.
     * This method is usefull for creating chart colors.
     * 
     * @param {String} col "Hex code of color with or without #"
     * @param {Integer} amt "number between 0 and 100"
     * @returns {String}
     */
    LobiAdmin.lightenColor = function(col, amt) {
        var usePound = false;

        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        
        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255)
            r = 255;
        else if (r < 0)
            r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255)
            b = 255;
        else if (b < 0)
            b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255)
            g = 255;
        else if (g < 0)
            g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    };
    /**
     * FadeIn or fadeOut the color.
     * This method is usefull for creating chart colors.
     * 
     * @param {type} col "HEX (with or without #), rgb or rgba representation of color"
     * @param {type} amt "number between 0 and 100"
     * @returns {String}
     */
    LobiAdmin.fadeOutColor = function(col, amt){
        if (col[0] === "#") {
            col = col.slice(1);
        }
        //If color is HEX
        if ( ! isNaN(parseInt(col, 16))){
            var r = parseInt(col.substring(0, 2), 16);
            var g = parseInt(col.substring(2, 4), 16);
            var b = parseInt(col.substring(4), 16);
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (1 - amt/100).toFixed(2) + ')';
        }
        //If color is rgba
        else if (col.substr(0, 4).toLowerCase() === 'rgba'){
            amt = Math.max(parseFloat(col.match(/rgba\(\d+\,\s?\d+\,\s?\d+\,\s?(\d(\.\d+)?)/)[1], 10) - (amt/100), 0).toFixed(2);
            return col.replace(/(rgba\(\d+\,\s?\d+\,\s?\d+\,\s?)(\d(\.\d+)?)/gi, '$1'+amt);
        }
        //If color is rgb
        else if (col.substr(0, 3).toLowerCase() === 'rgb'){
            return col.replace(/(rgb)(\(\d+\,\s?\d+\,\s?\d+)/gi, '$1a$2, '+(1 - amt/100).toFixed(2));
        }
    };
//------------------------------------------------------------------------------
    
    var NavigationPanel = function(panel, lobiAdmin){
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$el                = panel;
        this.$menu           = null;
        this.$showHideBtn       = null;
        this.$lobiAdmin         = lobiAdmin;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------
        var me = this;
        
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        
        var _init = function(){
            me.$menu = me.$el.find('nav');
            me.$showHideBtn = $(CONFIG.sidebarHideShowSelector);
            //Enable submenu to show and hide
            me.$menu.find('ul>li>a')
                    .off('click.lobiAdmin')
                    .on('click.lobiAdmin', function(e) {
                if (me.isCollapsed() && $(this).next('ul').length > 0 && me.isParentLink($(this))) {
                    e.preventDefault();
                    return false;
                }
                me.toggleItem($(this));
            });
            
            //Enable menu collapse/expand
            _enableToggle();
            //Enable menu hide/show
            _enableHideShow();
            
            _preventEmptyLinksClick();
            _addToggleIconsToMenu();
            _showMenuToggleIcon();
//            _enableResponsiveness();
            _enableMenuHeaderButtonTooltips();
            me.$menu.find('ul>li>a').click(function(ev){
                var a = $(this);
                if (a.attr('href') === '#'){
                    return;
                }else if (window.location.hash === a.attr('href')){
                    ev.preventDefault();
                }
            });
        };
        
        var _enableMenuHeaderButtonTooltips = function(){
            var $btns = me.$el.find('.menu-header-buttons .btn').tooltip({
                container: 'body'
            });
            if ($(window).width() < LobiAdmin.SCREEN_MD){
                $btns.on('click', function(){
                    $(this).tooltip('hide');
                });
            }
        };
        var _preventEmptyLinksClick = function(){
            me.$menu.find('a[href="#"]').on('click.lobiAdmin', function(ev){
                ev.preventDefault();
            });
        };
//        var _alignNavMenu = function(){
//            if ($(window).width() < LobiAdmin.SCREEN_MD) {
//                me.hide();
//            } else {
//                me.show();
//            }
//        };
        var _hideMenuOnOutsideClick = function(){
            $(document).off('mouseup.lobiAdmin')
                    .on('mouseup.lobiAdmin', function(e){
                //If click happened not on the menu and not on the showHideBtn than we need to hide it.
                //If click happened on the menu we do not need to hide it.
                //If click happed on the showHideBtn it will be hidden automatically
                if ( ! me.$el.is(e.target) && me.$el.has(e.target).length === 0
                    && ! me.$showHideBtn.is(e.target) && me.$showHideBtn.has(e.target).length === 0) {
                    me.hide();
                }
            });
        };
        
        var _addToggleIconsToMenu = function(){
            var $links = me.$menu.find('ul>li>a');
            $links.each(function(ind, a){
                var $a = $(a);
//                If this menu item has nested menu and it does not have toggle icon yet we add toggle icon
                if ($a.next('ul').length > 0 && $a.find('.menu-item-toggle-icon').length === 0){
//                    If this menu item is parent menu item
                    if ($a.closest('ul').parent().closest('ul').length === 0){
                        $a.append($('<i class="' + CONFIG.menuItemIcon + ' menu-item-toggle-icon"></i>'));
                    }else{
                        $a.append($('<i class="' + CONFIG.submenuItemIcon + ' menu-item-toggle-icon"></i>'));
                    }
                }
            });
        };
        
        /**
         * Enable nav menu hide and show
         * 
         * @returns {void}
         */
        var _enableHideShow = function(){
            me.$showHideBtn.on('click.lobiAdmin', function(ev){
                ev.preventDefault();
                me.hideShow();
            });
        };
        
        var _showMenuToggleIcon = function(){
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.append('<i class="' + CONFIG.menuToggleIcon + '"></i>');
        };
        
         /**
         * Enable nav menu toggle
         * 
         * @returns {NavigationPanel}
         */
        var _enableToggle = function(){
            $(document).on('click.lobiAdmin', CONFIG.sidebarCollapseExpandSelector, function(){
                me.toggle();
            });
        };
        var _triggerEvent = function (eventType) {
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(me.$lobiAdmin);
            me.$lobiAdmin.$el.trigger(eventType + '.lobiAdmin', args);
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        
        /**
         * Expand or collapse menu item
         * 
         * @param {jQuery object} a "<a> element with href attribute in menu"
         * @returns {NavigationPanel}
         */
        this.toggleItem = function(a){
            var li = a.parent();
            if (li.hasClass('opened')){
                me.collapseItem(a);
            }else{
                me.expandItem(a);
            }
            return me;
        };
        
        /**
         * Expand menu item which has children
         * 
         * @param {jQuery object} a "<a> element with href attribute in menu"
         * @returns {NavigationPanel}
         */
        this.expandItem = function(a){
            if (a.next('ul').length > 0){
                //Find opened item and close it
                me.collapseItem(a.closest('ul').find('>li.opened>a'))   ;
                
                //if menu is collapsed .slideDown method does not work
                if (me.isCollapsed() && me.isParentLink(a)){
                    a.next('ul').css('display', 'block');
                }else{
                    a.next('ul').slideDown(CONFIG.panelItemToggleAnimationDuration);
                }
                //Open new item
                a.parent().addClass('opened');
                var icon = a.find('.menu-item-toggle-icon');
                //if the item is parent item change parent item icon
                //if not change submenu item icon
                if (me.isParentLink(a)){
                    icon.removeClass(CONFIG.menuItemIcon).addClass(CONFIG.menuItemExpandIcon);
                }else{
                    icon.removeClass(CONFIG.submenuItemIcon).addClass(CONFIG.submenuItemExpandedIcon);
                }
                _triggerEvent('menuItemExpand');
            }
            return me;
        };
        
        /**
         * Collapse menu item which has children
         * 
         * @param {jQuery object} a "<a> element with href attribute in menu"
         * @returns {NavigationPanel}
         */
        this.collapseItem = function(a) {
            if (a.next('ul').length > 0) {
                a.parent().removeClass('opened');
                
                //if menu is collapsed .slideUp method does not work
                if (me.isCollapsed() && me.isParentLink(a)){
                    a.next('ul').css('display', 'none');
                }else{
                    a.next('ul').slideUp(CONFIG.panelItemToggleAnimationDuration);
                }
                var icon = a.find('.menu-item-toggle-icon');
                //if the item is parent item change parent item icon
                //if not change submenu item icon
                if (me.isParentLink(a)){
                    icon.removeClass(CONFIG.menuItemExpandIcon).addClass(CONFIG.menuItemIcon);
                }else{
                    icon.removeClass(CONFIG.submenuItemExpandedIcon).addClass(CONFIG.submenuItemIcon);
                }
                _triggerEvent('menuItemCollapse');
            }
            return me;
        };
        
        /**
         * Collapse nav menu
         * 
         * @returns {NavigationPanel}
         */
        this.collapse = function(){
            if (me.isCollapsed()){
                return me;
            }
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.find('>*')
                    .removeClass(CONFIG.menuToggleIcon)
                    .addClass(CONFIG.menuToggleCollapsedIcon);
            $('body').addClass('menu-collapsed');
            _triggerEvent('menuCollapse');
            return me;
        };
        
        /**
         * Expand nav menu
         * 
         * @returns {NavigationPanel}
         */
        this.expand = function(){
            if ( ! me.isCollapsed()){
                return me;
            }
            var $btn = $(CONFIG.sidebarCollapseExpandSelector);
            $btn.find('>*')
                    .removeClass(CONFIG.menuToggleCollapsedIcon)
                    .addClass(CONFIG.menuToggleIcon);
            $('body').removeClass('menu-collapsed');
            _triggerEvent('menuExpand');
            return me;
        };
        
        /**
         * Toggle (expand or collapse) nav menu
         * 
         * @returns {NavigationPanel}
         */
        this.toggle = function(){
            if (me.isCollapsed()) {
                me.expand();
            }else{
                me.collapse();
            }
            return me;
        };
        
        /**
         * Check if nav menu is collapsed or not
         * 
         * @returns {Boolean}
         */
        this.isCollapsed = function(){
            if ($('body').hasClass('menu-collapsed')){
                return true;
            }else{
                return false;
            }
        };
        
        /**
         * Check if link is menu first level item or submenu item
         * 
         * @param {mixed} href "href attribute or jQuery object of <a>"
         * @returns {Boolean}
         */
        this.isParentLink = function(href){
            var a = href;
            if (typeof href === 'string'){
                a = me.$menu.find('>ul>li>a[href="'+href+'"]');
            }
            if (a.length !== 1){
                return false;
            }
            if (a.closest('ul').parent().closest('ul').length > 0){
                return false;
            }
            return true;
        };
        
        /**
         * Get parent item object of submenu item
         * 
         * @param {jQuery object} a
         * @returns {jQuery object}
         */
        this.getParentLink = function(a){
            var li = a.closest('ul').closest('li');
            if (li.length === 0){
                return false;
            }
            return li.find('>a');
        };
        
        /**
         * Find item by href and set active 
         * 
         * @param {String} href
         * @returns {NavigationPanel}
         */
        this.setActive = function(href){
            var a = me.$menu.find('a[href="'+href+'"]');
            if (a.length === 0 || a.parent().hasClass('active')){
                return;
            }
            var act = me.$menu.find('li.active');
            act.removeClass('active');
            a.parent().addClass('active');
            //go through all elements to the root <li> element and expand parent lists of active link
            var parent = me.getParentLink(a);
            while (parent) {
//                parent.parent().addClass('active');
                if (parent.parent().hasClass('opened')){
                    parent = me.getParentLink(parent);
                    continue;
                }
                me.expandItem(parent);
                parent = me.getParentLink(parent);
            }
        };
        /**
         * Get active element 
         * 
         * @returns {jQuery object} <a> element
         */
        this.getActive = function(){
            var act = me.$menu.find('li.active >a');
            return act.length === 0 ? null : act;
        };
        
        /**
         * Hide the menu
         * 
         * @returns {NavigationPanel}
         */
        this.hide = function(){
            if ($(window).width() < LobiAdmin.SCREEN_MD){
                $('body').removeClass('menu-hidden');
                me.$showHideBtn.removeClass('active');
            }else{
                $('body').addClass('menu-hidden');
                me.$showHideBtn.addClass('active');
            }
            _triggerEvent('menuHide');
            return me;
        };
        /**
         * Show hidden menu
         * 
         * @returns {NavigationPanel}
         */
        this.show = function(){
            if ($(window).width() < LobiAdmin.SCREEN_MD) {
                $('body').addClass('menu-hidden');
                me.$showHideBtn.addClass('active');
                _hideMenuOnOutsideClick();
            } else {
                $('body').removeClass('menu-hidden');
                me.$showHideBtn.removeClass('active');
            }
            _triggerEvent('menuShow');
            return me;
        };
        /**
         * Check if menu is hidden
         * 
         * @returns {Boolean}
         */
        this.isHidden = function(){
            if ($('body').hasClass('menu-hidden') && $(window).width() >= LobiAdmin.SCREEN_MD
                || ! $('body').hasClass('menu-hidden') && $(window).width() < LobiAdmin.SCREEN_MD){
                return true;
            }
            return  false;
        };
        /**
         * Toggles menu state (hide/show)
         * 
         * @returns {NavigationPanel}
         */
        this.hideShow = function(){
            me.isHidden() ? me.show() : me.hide();
            return me;
        };
        /**
         * Get Array of objects of active menu item hierarchy. 
         * First item in array is currently active link, next its parent and so on.
         * Object is in the following format.
         * {
         *      icon: '', // OPTIONAL. Icon of the menu item
         *      text: '', // REQUIRED. Text of the menu item
         *      href: ''  // OPTIONAL. HREF attribute of menu item
         * }
         * 
         * @returns {Array}
         */
        this.getActivePath = function(){
            var me = this;
            var ret = [];
            var act = me.getActive();
            while (act){
                var icon = act.find('.menu-item-icon').clone();
                ret.push({
                    icon: icon.length > 0 ? icon : null,
                    text: act.find('.inner-text').html() || act.html(),
                    href: act.attr('href')
                });
                var act = me.getParentLink(act);
            }
            return ret;
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        _init();
    };
    
//------------------------------------------------------------------------------
    LobiAdmin.SCREEN_XS = 480;
    LobiAdmin.SCREEN_SM = 768;
    LobiAdmin.SCREEN_MD = 992;
    LobiAdmin.SCREEN_LG = 1200;
    
//------------------------------------------------------------------------------
    $.fn.lobiAdmin = function(option){
        return this.each(function(index, el){
            var $this = $(this);
            var data = $this.data('lobiAdmin');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('lobiAdmin', (data = new window.LobiAdmin($this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };
    $('body').lobiAdmin();
});