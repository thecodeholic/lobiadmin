//Author      : @arboshiki
$(document).ready(function (ev) {

    var LobiMail = function ($el, options) {
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$el                = null;
        this.$options           = {};
        this.$colSearch         = null;
        this.$contentDiv        = null;
        this.$activeView        = null;
        this.$table             = null;
        this.$unreadEmails      = 0;

//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------  
        var me = this,
                $btnCompose = $el.find('.btn-compose'),
                $nav = $el.find('.nav-menu');

//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------

        var _processInput = function (options) {
            options = $.extend({}, $.fn.lobiMail.DEFAULT_OPTIONS, options);
            
            var $actionDeleteBtn = $('[data-action=delete]');
            if ($actionDeleteBtn.length > 0){
                if ($actionDeleteBtn.attr('href') && $actionDeleteBtn.attr('href') !== '#'){
                    options.deleteUrl = $actionDeleteBtn.attr('href');
                }
            }
            if (me.$el.data('view-email-url')){
                options.viewEmailUrl = me.$el.data('view-email-url');
            }
            return options;
        };
        var _init = function () {
            _triggerEvent('beforeInit');
            _enableSearch();
            me.debug("init method");
            
            _initComposeButton();
            _initNavMenu();
            _enableActions();
            _loadDefaultView();
            _triggerEvent('init');
        };
        var _initComposeButton = function () {
            $btnCompose.click(function (ev) {
                ev.preventDefault();
                me.showCompose();
            });
        };
        var _initializeView = function (a) {
            var view = a.data('type');
            if (['inbox', 'sent', 'draft', 'archive'].indexOf(view) > -1) {
                me.$activeView = me.$el.find('.mailbox-table-wrapper');
                me.$table = me.$activeView.find('.col-table table');
                _initActions();
            }
            if (view === 'inbox') {
                _initInbox();
            }
            _enableTooltips(me.$activeView);
        };
        /**
         * Listen to menu selected type change event. When menu active item is changed
         * load new emails for selected view
         * 
         * @param {jQuery object} a "any of menu item (inbox, sent, draft)"
         * @returns {undefined}
         */
        var _initNavMenu = function () {
            $nav.find('a').click(function (ev) {
                
                ev.preventDefault();
                var a = $(this);
                if (a.attr('href') === '#'){
                    return;
                }
                var act = $nav.find('li.active');
                var activeType = act.find('a').data('type');
                //Triggere event
                _triggerEvent('beforeMenuChange', activeType);
                act.removeClass('active');
                a.parent().addClass('active');

                var data = me.$colSearch.find('form').serialize();
                $.ajax(a.attr('href'), {
                    method: 'GET',
                    data: data
                }).done(function (res) {
                    me.$contentDiv.html(res);
                    _initializeView(a);
                    _triggerEvent('afterMenuChange', activeType, a.data('type'));
                });

            });
        };
        var _initActions = function () {
            var checks = me.$table.find('tr td:first-child label');
            checks.click(function (ev) {
                ev.stopPropagation();
            });
            checks.find('input[type=checkbox]').on('change', function (ev) {
                var $this = $(this);
                if ($this.prop('checked')) {
                    $(ev.currentTarget).closest('tr').addClass('selected');
                } else {
                    $(ev.currentTarget).closest('tr').removeClass('selected');
                }
            });

            _enableSelectAll();
            _enableCheckFunctions();
            _enableStar();
        };
        var _enableSelectAll = function () {
            if (!me.$options.enableSelectAll) {
                return;
            }
            var checks = me.$table.find('tr td:first-child input[type=checkbox]');
            var checkAll = me.$el.find(me.$options.checkAllBtn);
            checkAll.on('change', function (e) {
                checks.prop('checked', $(this).prop('checked'));
                checks.trigger('change');
            });
        };
        var _enableCheckFunctions = function () {
            var checkAll = me.$el.find(me.$options.checkAllBtn);
            var tbody = me.$table.find('tbody');
            //actions for select or diselect some emails
            me.$el.find('.dropdown-select-type>li>a').click(function (ev) {
                ev.preventDefault();
                var a = $(ev.currentTarget);
                if (a.data('select') === 'all') {
                    checkAll.prop('checked', true);
                    checkAll.trigger('change');
                } else if (a.data('select') === 'none') {
                    checkAll.prop('checked', false);
                    checkAll.trigger('change');
                } else if (a.data('select') === 'read') {
                    checkAll.prop('checked', false);
                    checkAll.trigger('change');
                    tbody.find('tr:not(.unread) td:first-child [type=checkbox]').prop('checked', true).trigger('change');
                } else if (a.data('select') === 'unread') {
                    checkAll.prop('checked', false);
                    checkAll.trigger('change');
                    tbody.find('tr.unread td:first-child [type=checkbox]').prop('checked', true).trigger('change');
                } else if (a.data('select') === 'starred') {
                    checkAll.prop('checked', false);
                    checkAll.trigger('change');
                    tbody.find('tr.starred td:first-child [type=checkbox]').prop('checked', true).trigger('change');
                } else if (a.data('select') === 'unstarred') {
                    checkAll.prop('checked', false);
                    checkAll.trigger('change');
                    tbody.find('tr:not(.starred) td:first-child [type=checkbox]').prop('checked', true).trigger('change');
                }
            });
        };
        var _enableActions = function () {
            me.$el.on('click', 'a[data-action]', function (ev) {
                ev.preventDefault();
                var a = $(this);
                if (a.attr('href') === '#') {
                    me.debug("Url not specified for data-action " + a.data('action'));
                    return;
                }
                var action = a.data('action');
                if (action === 'archive') {

                } else if (action === 'spam') {

                } else if (action === 'delete') {
                    me.deleteSelected();
                }
            });
        };
        var _enableStar = function () {
            if (!me.$options.enableStar) {
                me.debug("Starring is disabled");
                return;
            }
            me.$table.find('.td-star').click(function (ev) {
                var td = $(ev.currentTarget);
                ev.stopPropagation();
                var $tr = td.closest('tr');
                me.star([$tr.data('key')], !$tr.hasClass('starred'));
            });
        };
        var _addOnDiscardClick = function (replyOrForward) {
            replyOrForward.find('.compose-email-wrapper .compose-email-footer [data-action=discard_compose]').click(function (ev) {
                ev.preventDefault();
                //on discard click.
                //Destroy summernote
                replyOrForward.find('.compose-email-wrapper .message-reply').destroy();
                //hide wrapper container for summernote
                replyOrForward.find('.compose-email-wrapper').css('display', 'none');
                //show image and reply or forward container-text
                replyOrForward.find('.ctr-img, .ctr-reply-or-forward').css('display', '');
            });
        };
        var _addOnSendClick = function (replyOrForward) {
            
            replyOrForward.find('form').on('submit', function(ev){
                ev.preventDefault();
                var form = $(ev.currentTarget).closest('form');
                var data = form.serializeArray();

                var body = $('<div>' + form.find('.message-reply').code() + '</div>');
                body.find('.reply-text').remove();

                data[1].value = body.html();
                $.ajax(form.attr('action'), {
                    method: form.attr('method'),
                    data: data,
                    complete: function (xhr, status) {
                        window.console.log(xhr, status);
                    }
                });
            });
        };
        var _activateReplyOrForward = function (replyOrForward) {
            //inside reply or forward container there is text and on this text click...
            replyOrForward.find('.ctr-reply-or-forward .inner-text').click(function () {
                //getting date, name and email and 
                var date = me.$activeView.find('.row-sender .col-email-date').html(),
                        name = me.$activeView.find('.row-sender .ctr-name-email .name').html(),
                        email = me.$activeView.find('.row-sender .ctr-name-email .email');
                var mail = email.html() ? '&lt;' + email.html() + '&gt;' : '';
                //putting them inside reply
//                var sender = $('<p class="sender">' + name + ' ' + mail + ' ' + date + ' </p>');
//                var replyText = $('<div class="reply-text"></div>');
//                var html = $('<blockquote><p>' + body.find('.body-text').html() + '</p></blockquote></div>');
//                replyText.append(sender).append(html);
//                var html = replyText[0].outerHTML;
                var html = "";

                _initReplyOrForwardEditor(replyOrForward, html);
            });

            //attach event handler for reply button located at header. trigger reply or forward container-text click event
            me.$activeView.find('[data-action=reply]').click(function () {
                replyOrForward.find('.ctr-reply-or-forward .inner-text').trigger('click');
            });
        };
        var _initReplyOrForwardEditor = function (replyOrForward, html) {
            //we are hiding image and reply or forward container-text
            replyOrForward.find('.ctr-img, .ctr-reply-or-forward').css('display', 'none');
            //we are showing wrapper container for summernote and we are activating summernote editor.
            replyOrForward.find('.compose-email-wrapper').css('display', 'block')
                    .find('.message-reply').summernote({
                focus: true
            });

            //put message inside summernote
//            replyOrForward.find('.compose-email-wrapper').find('.message-reply').code(html);
        };
        var _initCompose = function () {
            me.$activeView = me.$contentDiv.find('.mailbox-compose-email');
            var header = me.$contentDiv.find('.row-header');
            header.find('.form-group.to select').select2({
                placeholder: "To"
            });
            header.find('.form-group.cc select').select2({
                placeholder: "Cc"
            });
            header.find('.form-group.bcc select').select2({
                placeholder: "Bcc"
            });
            me.$contentDiv.find('.row-body .summernote').summernote({
            });
            header.find('.form-group.to .show-cc-bcc .show-cc').click(function () {
                header.find('.form-group.cc').toggleClass('hide');
                $(this).parent().attr('stay', 'true').show();
            });
            header.find('.form-group.to .show-cc-bcc .show-bcc').click(function () {
                header.find('.form-group.bcc').toggleClass('hide');
                $(this).parent().attr('stay', 'true').show();
            });
            me.$contentDiv.find('form button').click(function (ev) {
                ev.preventDefault();
            });
        };
        var _loadDefaultView = function(){
            //If defaultView option is false this means that we do not have default view to load
            if ( ! me.$options.defaultView){
                return;
            }
            var view = me.$options.defaultView.toLowerCase();
            if (view === 'compose'){
                me.showCompose();
            }else if (view === 'email' && me.$options.defaultMessageKey){
                me.viewEmail(me.$options.defaultMessageKey);
            }else{
                $nav.find("a[data-type="+view+"]").trigger('click');
            }
        };
        var _activateGoBack = function () {
            var back = me.$el.find(me.$options.goBackBtn);
            if (back.length === 0) {
                me.debug("Back button does not exist");
                return;
            }
            back.click(function () {
                me.goBack();
            });
        };
        var _enableSearch = function () {
            if ( ! me.$options.enableSearch) {
                return;
            }
            me.$colSearch.find('form').on('submit', function (ev) {
                ev.preventDefault();
                me.search();
            });
        };
        var _getActiveType = function(){
            return $nav.find('li.active a').data('type') || false;
        };
        var _enableTooltips = function (view) {
            if (!me.$options.enableTooltips) {
                me.debug("Tooltips are disabled");
                return;
            }
            view.find('[data-toggle=tooltip]').tooltip({
                container: me.$el
            });
        };
        var _initInbox = function () {
            me.debug("Inbox initialized");

            me.$unreadEmails = parseInt(me.$activeView.data('unread-emails'), 10) || 0;
            me.setInboxBadgeValue(me.$unreadEmails);

            me.$table.find('tr').click(function (ev) {
                var $tr = $(ev.currentTarget);
                me.viewEmail($tr.data('key'));
            });
        };
        var _initReplyOrForward = function () {
            //get reply or forward container
            var replyOrForward = me.$activeView.find('.row-reply-or-forward');

            //attach event handler on discard click
            _addOnDiscardClick(replyOrForward);
            _addOnSendClick(replyOrForward);
            _activateReplyOrForward(replyOrForward);
            _messageViewCollapsing(true);
        };
        
        var _messageViewCollapsing = function (status) {
            var row = me.$activeView.find('.row-conversation .row-message .row-sender');
            row.off('click');
            if (status) {
                row.click(function (ev) {
                    var $this = $(this);
                    var message = $this.closest('.row-message').toggleClass('collapsed');
                    message.find('.row-body').slideToggle(200);
                    if (message.hasClass('collapsed')) {
                        var t = message.find('.row-body .body-text').html();
                        t = t.replace(/(<([^>]+)>)/ig, " ").substr(0, 130);
                        $this.find('.ctr-body-text').html(t);
                    } else {
                        $this.find('.ctr-body-text').html('');
                    }
                });
            }
            return me;
        };
           
        var _initMessageView = function () {
            me.$activeView = me.$contentDiv.find('.mailbox-message-view');
            _activateGoBack();

            _enableTooltips(me.$activeView);
            _initReplyOrForward();
        };
        var _triggerEvent = function(eventType){
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(me);
            me.$el.trigger(eventType+'.lobiMail', args);
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        /**
         * Show compose email view
         * 
         * @returns {LobiMail}
         */
        this.showCompose = function(){
            _triggerEvent("beforeShowCompose");
            $nav.find('li.active').removeClass('active');
            if (!me.$activeView || !me.$activeView.hasClass('mailbox-compose-email')) {
                me.$contentDiv.load($btnCompose.attr('href'), function () {
                    _initCompose();
                    _triggerEvent("showCompose");
                });
            }
            return me;
        };
        /**
         * Show inbox emails by triggering menu inbox click
         * 
         * @returns {LobiMail}
         */
        this.showInbox = function(){
            $nav.find('a[data-type=inbox]').trigger('click');
            return me;
        };
        /**
         * Show inbox emails by triggering menu inbox click
         * 
         * @returns {LobiMail}
         */
        this.showSent = function(){
            $nav.find('a[data-type=sent]').trigger('click');
            return me;
        };
        /**
         * Search in active table type view (inbox, sent, draft, etc)
         * 
         * @returns {LobiMail}
         */
        this.search = function () {
            if (!me.$options.enableSearch) {
                me.debug("Search is disabled");
                return me;
            }
            //If table type view (inbox, sent, draft ...) is not shown nothing should happen
            if (me.$activeView && !me.$activeView.hasClass('mailbox-table-wrapper')) {
                return;
            }
            $nav.find('li.active a').trigger('click');
            return me;
        };
        /**
         * Return jQuery object of selected emails
         * 
         * @returns {jQuery object}
         */
        this.getSelected = function () {
            return me.$table.find('tr.selected');
        };
        /**
         * Get selected emails' keys
         * 
         * @returns {Array}
         */
        this.getSelectedIds = function () {
            var selectedRows = me.getSelected();
            var ids = [];
            selectedRows.each(function (index, el) {
                ids.push($(el).data('key'));
            });
            return ids;
        };
        /**
         * Delete selected emails. Send POST request to the url of [data-action=delete] button. 
         * If such button does not exist url is taken from options object.
         * 
         * @returns {LobiMail}
         */
        this.deleteSelected = function () {
            me.deleteEmails(me.getSelectedIds());
            return me;
        };
        /**
         * Delete emails by given ids. Server must respond in the following format
         * {"success": Boolean, "msg": String}
         * 
         * @param {Array} ids REQUIRED "Array of ids of emails"
         * @returns {LobiMail}
         */
        this.deleteEmails = function(ids){
            _triggerEvent('beforeDelete', ids);
            if (ids.length === 0){
                return me;
            }
            function d(){
                for (var i = 0; i < ids.length; i++) {
                    me.$table.find("tr[data-key=" + ids[i] + "]").remove();
                }
            }
            if ( ! me.$options.deleteUrl){
                d();
                return me;
            }
            $.ajax(me.$options.deleteUrl, {
                method: 'POST',
                data: data
            }).done(function (res) {
                if (res.success) {
                    d();
                    _triggerEvent('afterDelete', ids);
                }
            });
            return me;
        };
        /**
         * Set inbox unread emails badge value
         * 
         * @param {Integer} value REQUIRED "unread badges value"
         * @returns {LobiMail}
         */
        this.setInboxBadgeValue = function (value) {
            var b = $nav.find('a[data-type=inbox] .badge-unread');
            var oldVal = b.html() || 0;
            if (value <= 0) {
                b.hide();
            } else {
                b.show();
                b.html(value);
            }
            _triggerEvent('inboxBadgeChange', oldVal, value);
            return me;
        };
        /**
         * Decrease inbox unread emails badge value by one
         * 
         * @returns {LobiMail}
         */
        this.decreaseInboxBadge = function () {
            if (me.$unreadEmails === 0){
                return me;
            }
            me.setInboxBadgeValue(--me.$unreadEmails);
            return me;
        };
        /**
         * View Email by key. View email url can be given from options by javascript of by data-view-email-url="" attribute from <table>
         * 
         * @param {Mixed} key REQUIRED "Email key for opening"
         * @returns {LobiMail}
         */
        this.viewEmail = function(key){
            _triggerEvent("beforeEmailView", key);
            if (me.$table && me.$table.data('view-email-url')) {
                me.$options.viewEmailUrl = me.$table.data('view-email-url');
            }
//            window.console.log("here");
            if ( ! me.$options.viewEmailUrl){
                return me;
            }
            $.ajax(me.$options.viewEmailUrl, {
                method: 'GET',
                data: {
                    key: key
                }
            }).done(function (res) {
                //$table may not exist when by default we open email view when plugin is initialized
                if (me.$table){
                    //Find the row by key to check if it is unread or not.
                    var $tr = me.$table.find('tr[data-key=' + key + ']');
                    //If row is unread decrease inbox badge
                    if ($tr.hasClass('unread')) {
                        me.decreaseInboxBadge();
                    }
                }
                //Put email view into $contentDiv.
                me.$contentDiv.html(res);
                //Initialize email view
                _initMessageView();
                me.$activeView.attr('data-email-key', key);
                _triggerEvent('afterEmailView', key);
            });
            return me;
        };
        /**
         * 
         * @param {Array} ids REQUIRED "Array of ids' of emails"
         * @param {Boolean} status REQUIRED "Star or unstar. true means mark as starred, false - mark as unstarred"
         * @returns {LobiMail}
         */
        this.star = function(ids, status){
            _triggerEvent('beforeStarChange', ids, status);
            if (ids.length === 0){
                return me;
            }
            function markUnmark(){
                for (var i = 0; i < ids.length; i++) {
                    me.$table.find('[data-key=' + ids[i] + ']')
                            .toggleClass('starred')
                            .find('.td-star .fa')
                            .toggleClass('fa-star-o')
                            .toggleClass('fa-star');
                }
            }
            if ( ! me.$options.starEmailUrl){
                markUnmark();
                return me;
            }
            $.ajax(me.$options.starEmailUrl, {
                method: 'POST',
                data: {
                    ids: ids,
                    star: status
                }
            }).done(function(res){
                if (res.success){
                    markUnmark();
                    _triggerEvent('afterStarChange', ids, status);
                }
            });
            return me;
        };
        /**
         * This method is generally called from email view. 
         * But it can be called also from compose view. It shows previously actiavted email list.
         * 
         * @returns {LobiMail}
         */
        this.goBack = function(){
            var type = $nav.find('li.active a').data('type') || 'inbox';            
            $nav.find('li>a[data-type="'+type+'"]').trigger('click');
            return me;
        };
        /**
         * Set default view and email key if view type is "email".
         * Calling this method is useful before LobiMail is initialized
         * 
         * @param {String} viewType "default view type"
         * @param {Integer} defaultMessagekey "default email key for loading email"
         * @returns {LobiMail}
         */
        this.setDefaultView = function(viewType, defaultMessagekey){
            me.$options.defaultView = viewType;
            if (defaultMessagekey){
                me.$options.defaultMessageKey = defaultMessagekey;
            }
            return me;
        };
        /**
         * Show debug message
         * 
         * @returns {LobiMail}
         */
        this.debug = function () {
            if (!me.$options.enableDebug) {
                return me;
            }
            window.console.info.apply(window.console, arguments);
            return me;
        };
        /**
         * Show error message
         * 
         * @returns {LobiMail}
         */
        this.error = function () {
            window.console.error.apply(window.console, arguments);
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        
        me.$el = $el;
        me.$colSearch = this.$el.find('.col-search');
        me.$contentDiv = $el.find('.col-content');
        options = _processInput(options);
        this.$options = options;
        _init();
    };

    $.fn.lobiMail = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('lobiMail');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('lobiMail', (data = new LobiMail($this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };
    $.fn.lobiMail.DEFAULT_OPTIONS = {
        //Boolean. 
        enableSearch: true,
        //Boolean. Activate check all email button
        enableSelectAll: true,
        //Boolean. Show debug messages
        enableDebug: false,
        //Boolean. Enable to mark email es starred
        enableStar: true,
        //Boolean. Enable tooltips
        enableTooltips: true,
        //String. View name which will be loaded when plugin is initialized
        defaultView : 'inbox', //compose, email, inbox, sent, draft, archive, trash ...
        //Integer. This option is used if defaultView is 'email'. This integer value will be used for loading email
        defaultMessageKey: false, //Number. Key of the message you want to load by default
        //String. The url which will be used for deleting emails
        deleteUrl: '',
        //String. The url which will be used for loading single email. 
        //Outer most div (.lobimail) element data-view-email-url="" attribute will override this option 
        //if it is provided. <table> data-view-email-url="" attribute will override both.
        //So you have three way to specify viewEmailUrl attribute.
        viewEmailUrl: '',
        //String. The url which will be used for marking email as starred or unstarred. 
        //On server side you get "ids[]" array (containing keys of email) and "star" (true/false) to mark emails starred or unstarred
        starEmailUrl: '',
        
        //String. Selector for go back button when email is opened
        goBackBtn: '[data-action="go-back"]',
        //String. Selector for select all button
        checkAllBtn: '[data-action="select-all"]'
        
        
       /**
        * EVENTS
        * Using events
        * $('.lobiMail').on('eventName.lobiMail', function(event, lobiMail){
        *      
        * });
        * 
        * First parameter to every event is Event object.
        * Second parameter is LobiMail instance.
        * Additional parameters are described bellow.
        * 
        * Triggered before lobiMail is initialized
        * beforeInit
        * 
        * Triggered when lobiMail is initialized
        * init
        * 
        * Triggered before compose email view is shown
        * beforeShowCompose
        * 
        * Triggered after compose emial view is shown
        * showCompose
        * 
        * Triggered before email delete request is sent
        * @param {Array} "array of email ids"
        * beforeDelete
        * 
        * Triggered after email detele request is sent and responded with {"success": true}
        * @param {Array} "array of email ids"
        * afterDelete
        * 
        * Triggered when inbox badge is changed
        * @param {Integer} "old value of inbox badge"
        * @param {Integer} "new value of inbox badge"
        * inboxBadgeChange
        * 
        * Triggered before single email view is opened
        * @param {Integer} "id of email"
        * beforeEmailView
        * 
        * Triggered after single email view is opened
        * @param {Integer} "id of email"
        * afterEmailView
        * 
        * Triggered before emails are marked as starred or unstarred
        * @param {Array} "ids of emails"
        * @param {Boolean} "status of star. true means mark as starred, false - mark as unstarred"
        * beforeStarChange
        * 
        * Triggered after emails are marked as starred or unstarred
        * @param {Array} "ids of emails"
        * @param {Boolean} "status of star. true means mark as starred, false - mark as unstarred"
        * afterStarChange
        * 
        * Triggered before menu active item is changed
        * @param {String} "menu active item type (inbox|sent|draft|...)"
        * beforeMenuChange
        * 
        * Triggered after menu active item is change
        * @param {String} "previously active item type"
        * @param {String} "just activated item type"
        * afterMenuChange
        * 
        * 
        */
        
    };

    $('.lobimail').lobiMail();
});