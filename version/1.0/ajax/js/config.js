window.LobiAdminConfig = {
    //In every updateTimeForLockScreen Miliseconds clock will be updated on lock screen
    updateTimeForLockScreen         : 1000,
    //When you click lock screen one time and lock screen slideshow is slide up,
    // after this amount of miliseconds slideshow will slide down if you do not unlock the screen
    showLockScreenTimeout           : 30000,
    //These month names are used when lock screen is shown.
    monthNames                      : ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"],
    //These week names are used when lock screen is shown.
    weekNames                       : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //Add this attribute to element to activate expanding on full screen by clicking on this element
    fullScreenSelector              : '[data-action="fullscreen"]',
    //Add this attribute to element to activate reload by clicking on this element
    reloadPageSelector              : '[data-action="reload"]',
    //Add this attribute to element to activate hiding and showing sidebar by clicking on this element
    sidebarHideShowSelector         : '[data-action="show-hide-sidebar"]',
    sidebarCollapseExpandSelector   : '[data-action="collapse-expand-sidebar"]',
    //Navigation menu selector
    sidebarSelector                 : '.menu',
    //Setting box container
    settingBoxSelector              : '.setting-box',
    //Search form selector
    searchFormSelector              : '.header .navbar-search',
    //Breadcrumb <ol> element selector
    breadcrumbsListSelector         : '#ribbon .breadcrumb',
    //Content div in which every ajax page will be loaded
    contentSelector                 : '#content',
    //If page was not found loading by ajax and server responded with code 404 this error 404 will be shown
    error404Page                    : 'pages/error-404.html',
    //This text will be given to window <title> when error 404 will be shown
    error404Title                   : 'ERROR 404',
    //If some problem occured when loading page by ajax and server responded with code 500 this error 500 page will be shown
    error500                        : 'pages/error-500.html',
    //This text will be given to window <title> when error 500 will be shown
    error500Title                   : 'ERROR 500',
    //Menu item toggle icon
    menuItemIcon                    : 'fa fa-chevron-circle-right',
    //Expanded menu item icon
    menuItemExpandIcon              : 'fa fa-chevron-circle-down',
    //Submenu item toggle icon
    submenuItemIcon                 : 'fa fa-plus-square-o',
    //Submenu item expand toggle icon
    submenuItemExpandedIcon         : 'fa fa-minus-square-o',
    //Menu toggle (expand/collapse) icon. (When menu is expanded)
    menuToggleIcon                  : 'fa fa-chevron-circle-left',
    //Menu toggle (expand/collapse) icon. (When menu is collapsed)
    menuToggleCollapsedIcon         : 'fa fa-chevron-circle-right',
    //Whether of not use localStorage to save some settings
    useLocalStorage                 : true,
    clearLocalStorageSelector       : '[data-action="clear-storage"]',
    //Show confirmation before clearing local storage or not
    confirmationBeforeClearStorage  : true,
    clearStorageConfirmationMessage : "Are you sure you want to clear localStorage? This action can not be undone!",
    //Hash value for default page. If hash was not provided this hash value will be used.
    //If urlRouting is enabled this hash value will also run under url routing function
    defaultPage                     : 'dashboard',
    //Menu item expand and collapse animation duration
    panelItemToggleAnimationDuration: 200,
    //Enable Url routing or not
    enableUrlRouting                : true,
    //Add this attribute to element to show compose email view by clicking on this element
    composeEmailViewSelector        : '[data-action="compose-email"]',
    //Add this attribute to element to show email by clicking on this element.
    //Also add data-key attribute to element to load email by this key
    openEmailViewSelector           : '[data-action="open-email"]'
};

window.LobiAdminRoutes = {
    
//    '(dashboard|calendar|profile)': 'pages/$1.html',
    '(.+)' : 'pages/$1.html',
//    'lobimail' : 'pages/lobimail/main.html'
//        '(pricing-tables|form-plugin|discount-labels|tiles|dropdown-enhancement|wizard|buttons|default-elements|form-basic-elements|form-custom-elements|dashboard|mailbox|glyphicon|typography|font-awesome|weather-icons|error-404|error-500|lobipanel|lobitab|lobibox|helper)' : 'pages/$1.html',
};

/**
 * EVENTS
 * Using events 
 * $('body').on('eventName.lobiAdmin', function(event, lobiAdmin){
 *      
 * });
 * 
 * First parameter to every event is Event object.
 * Second parameter is LobiAdmin instance.
 * Additional parameters are described bellow.
 * 
 * Triggered when menu item is expanded.
 * @param {jQuery object} "expanded <a> element"
 * menuItemExpand
 * 
 * Triggered when menu item is collpased (before animation is finished).
 * @param {jQuery object} "collapsed <a> element"
 * menuItemCollapse
 * 
 * Triggered when menu is collapsed but before animation is finished
 * menuCollapse
 * 
 * Triggered when collapsed menu is expanded but before animation is finished
 * menuExpand
 * 
 * Triggered when menu is hidden but before animation is finished
 * menuHide
 * 
 * Triggered when hidden menu is shown but before animation is finished
 * menuShow
 * 
 * Triggered when page is loaded by ajax
 * @param {String} "load url"
 * pageLoaded
 * 
 * Triggered before request is send for new ajax page
 * beforePageLoad
 * 
 * Triggered when application is expanded to fullscreen mode
 * expandToFullScreen
 * 
 * Triggered when application is collapsed from fullscreen mode
 * collapseFromFullScreen
 * 
 * Triggered when application is locked but before animation is finished
 * locked
 * 
 * Triggered when application is unlocked but before animation is finished
 * unlock
 * 
 * Triggered when reload method is called but before page is actually reloaded
 * reload
 */