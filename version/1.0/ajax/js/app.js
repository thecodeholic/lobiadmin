//Author      : @arboshiki
$(function(){
    
    //Initialize tooltips and popovers
    (function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    })();
    
    //DEFAULT COLOR FOR CHARTS
    LobiAdmin.DEFAULT_COLOR = '#216ba0';
    
    //Enable tooltips and popovers on every page load
    $('body').on('pageLoaded.lobiAdmin', function (ev) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });
    
    //Attach resize listener to window and redraw responsive sparklines on window resize
    $(window).on('resize.sparkline', function(ev){
        if ($.fn.sparkline){
            setTimeout(initResponsiveSparklines, 300);
        }
    });
    
    //Prevent empty links click and the links which href="" attribute is current url hash value
    $(document).on('click', 'a', function(ev){
        var $a = $(this);
        if ($a.attr('href') === '#' || window.location.hash === $a.attr('href')){
            ev.preventDefault();
        }
    });
    //Prevent showing disabled tabs
    $(document).on('show.bs.tab', '.nav-tabs li.disabled>a, .nav-pills li.disabled>a', function(ev){
        ev.preventDefault();
    });
    
    //LobiBox default options
    Lobibox.notify.OPTIONS = $.extend({}, Lobibox.notify.OPTIONS, {
        soundPath: 'sound/lobibox/'
    });
    
    /**
     * When this element is clicked email will be opened by the data-key="" attribute of clicked element
     */
    $(document).on('click', LobiAdminConfig.openEmailViewSelector, function(){
        var $this = $(this);
        //If lobimail is already loaded
        if (window.location.hash === $this.attr('href')){
            var $mail = $('.lobimail').data('lobiMail');
            $mail.viewEmail($this.data('key'));
        }
        //If mailbox view is not loaded it will be loaded as soon as the link is clicked 
        //and we attach event listener. Before mailbox is finaly initialized we change default view option 
        else{
            $(document).on('beforeInit.lobiMail.1', '.lobimail', function(ev, $mail){
                $mail.setDefaultView('email', $this.data('key'));
                $(document).off('beforeInit.lobiMail.1', '.lobimail');
            });
        }
    });
    /**
     * When you click this element compose email interface will be opened
     */
    $(document).on('click', LobiAdminConfig.composeEmailViewSelector, function(ev){
        var $this = $(this);
        //If lobimail is already loaded
        if (window.location.hash === $this.attr('href')) {
            var $mail = $('.lobimail').data('lobiMail');
            $mail.showCompose();
        } 
        //If mailbox view is not loaded it will be loaded as soon as the link is clicked 
        //and we attach event listener. Before mailbox is finaly initialized we change default view option 
        else {
            $(document).on('beforeInit.lobiMail.1', '.lobimail', function(ev, $mail){
                $mail.setDefaultView('compose');
                $(document).off('beforeInit.lobiMail.1', '.lobimail');
            });
        }
    });
    
});

/**
 * The method must be called when jquery sparkline plugin is loaded.
 * Initialize sparkline defaults.
 * 
 * @returns {void}
 */
function initSparklineDefaults(){
    
    var DEFAULT_COLOR = LobiAdmin.DEFAULT_COLOR;
    
    //common defaults
    $.fn.sparkline.defaults.common.lineColor = DEFAULT_COLOR;
    $.fn.sparkline.defaults.common.height = 30;
    $.fn.sparkline.defaults.common.fillColor = LobiAdmin.lightenColor(DEFAULT_COLOR, 20);
    $.fn.sparkline.defaults.common.tagOptionsPrefix = "data-";
    
    //line chart options
    $.fn.sparkline.defaults.line.lineWidth = '1.5';
    $.fn.sparkline.defaults.line.minSpotColor = '';
    $.fn.sparkline.defaults.line.maxSpotColor = '';
    $.fn.sparkline.defaults.line.spotColor = '';
    $.fn.sparkline.defaults.line.highlightSpotColor = LobiAdmin.lightenColor(DEFAULT_COLOR, 50);
    $.fn.sparkline.defaults.line.highlightLineColor = DEFAULT_COLOR;
    $.fn.sparkline.defaults.line.defaultPixelsPerValue = '9';
    $.fn.sparkline.defaults.line.spotRadius = '2.5';
    
    //bar chart options
    $.fn.sparkline.defaults.bar.barColor = DEFAULT_COLOR;
    $.fn.sparkline.defaults.bar.barWidth = 10;
    
    //pie chart defaults
    $.fn.sparkline.defaults.pie.sliceColors = [LobiAdmin.lightenColor(DEFAULT_COLOR, -17),
                                                DEFAULT_COLOR,
                                                LobiAdmin.lightenColor(DEFAULT_COLOR, 17),
                                                LobiAdmin.lightenColor(DEFAULT_COLOR, 34),
                                                LobiAdmin.lightenColor(DEFAULT_COLOR, 51),
                                                LobiAdmin.lightenColor(DEFAULT_COLOR, 68)
                                                ];
    
}

/**
 * This method must be called when jquery validation plugin is loaded 
 * in order bootstrap validation to work properly
 * 
 * @returns {void}
 */
function initValidationDefaults(){
    //FORM VALIDATION CODE  FOR BOOTSTRAP3
    // override jquery validate plugin defaults
    $.validator.setDefaults({
        highlight: function (element) {
            var $el = $(element);
            var $fgroup = $el.closest('.form-group');
            $fgroup.removeClass('has-success')
                    .addClass('has-error')
                    .addClass('has-feedback')
                    .find('.form-control-feedback').remove();
            var $feedback = $('<i class="form-control-feedback glyphicon glyphicon-remove"></i>');
            var type = $el[0].type;
            if (type === 'radio' || type === 'radio-inline' || type === 'checkbox' || type === 'checkbox-inline') {
                $fgroup.append($feedback);
            } else if (type === 'file' && $el.closest('.input.input-file').length > 0) {
                //Checking if this input is custom file input
                var $inputWrapper = $el.closest('.input.input-file');
                if ($inputWrapper.length > 0) {
                    $inputWrapper.append($feedback);
                }
            } else {
                if ($el.parent('.input-group').length) {
                    $feedback.insertAfter($el.parent());
                } else {
                    $feedback.insertAfter($el);
                }
            }
        },
        unhighlight: function (element) {
            var $el = $(element);
            var $fgroup = $el.closest('.form-group');
            $fgroup.removeClass('has-error')
                    .addClass('has-success')
                    .addClass('has-feedback')
                    .find('.form-control-feedback').remove();
            var $feedback = $('<i class="form-control-feedback glyphicon glyphicon-ok"></i>');
            var type = $el[0].type;
            if (type === 'radio' || type === 'radio-inline' || type === 'checkbox' || type === 'checkbox-inline') {
                $fgroup.append($feedback);
            } else if (type === 'file' && $el.closest('.input.input-file').length > 0) {
                //Checking if this input is custom file input
                var $inputWrapper = $el.closest('.input.input-file');
                if ($inputWrapper.length > 0) {
                    $inputWrapper.append($feedback);
                }
            } else {
                if ($el.parent('.input-group').length) {
                    $feedback.insertAfter($el.parent());
                } else {
                    $feedback.insertAfter($el);
                }
            }
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, $el) {
            var type = $el[0].type;
            var $fgroup = $el.closest('.form-group');
            if (type === 'radio' || type === 'radio-inline' || type === 'checkbox' || type === 'checkbox-inline') {
                $fgroup.append(error);
            } else if (type === 'file' && $el.closest('.input.input-file').length > 0) {
                //Checking if this input is custom file input
                var $inputWrapper = $el.closest('.input.input-file');
                if ($inputWrapper.length > 0) {
                    $inputWrapper.append(error);
                }
            } else {
                if ($el.parent('.input-group').length) {
                    error.insertAfter($el.parent());
                } else {
                    error.insertAfter($el);
                }
            }
        }
    });
}

/**
 * Give "datasets" option with only required color "strokeColor" 
 * and other colors will be automatically generated and the same datasets array will be returned.
 * You can optionally give "label", "data" or any other options in "datasets" objects, 
 * the function will only add colors to dataset objects.
 * 
 * @param {type} type REQUIRED 'Available options: [line, bar, radar]'
 * @param {type} data REQUIRED '"datasets" option for chart data'
 * @returns {Plain Object} "the same datasets object with filled options"
 */
function fillChartJsColors(type, data){
    if (type === 'line' || type === 'radar'){
        for (var i = 0; i<data.length; i++){
            data[i].fillColor = data[i].fillColor || LobiAdmin.fadeOutColor(data[i].strokeColor, 20);
            data[i].pointColor = data[i].pointColor || data[i].strokeColor;
            data[i].pointStrokeColor = data[i].pointStrokeColor ||  LobiAdmin.lightenColor('#FFFFFF', -20);
            data[i].pointHighlightFill = data[i].pointHighlightFill || LobiAdmin.fadeOutColor(data[i].pointColor, -25);
            data[i].pointHighlightStroke = data[i].pointHighlightStroke || '#FFFFFF';
        }
    }else if (type === 'bar'){
        for (var i = 0; i < data.length; i++) {
            data[i].fillColor = data[i].fillColor || LobiAdmin.fadeOutColor(data[i].strokeColor, 10);
            data[i].highlightFill = data[i].highlightFill || LobiAdmin.fadeOutColor(data[i].fillColor, 15);
            data[i].highlightStroke = data[i].highlightStroke || LobiAdmin.fadeOutColor(data[i].strokeColor, 15);
        }
    }
    return data;
}

/**
 * Initialize responsive sparkline charts.
 * Find $('.sparkline-responsive') elements and redraw charts.
 * To initialize responsive charts add all options by attributes, tagOptionsPrefix+"data" attribute with data array
 * Example: If tagOptionsPrefix is "data-" create the following element
 * <span class="sparkline-responsive" data-type="line" data-data="[2,3,1,4,5,3,6,4,7,9,7]"></span>
 * 
 * @returns {void}
 */
function initResponsiveSparklines(){
    var PREFIX = $.fn.sparkline.defaults.common.tagOptionsPrefix;
    var $spark = $('.sparkline-responsive');
    $spark.each(function (index, el) {
        var $el = $(this);
        var params = {
            enableTagOptions: true
        };
        var data = JSON.parse($el.attr(PREFIX + 'Data'));
        var type = $el.attr(PREFIX + "Type");
        
        //If chart type is any of supported responsive chart types
        if (['bar', 'line', 'pie'].indexOf(type)> -1){
            $el.find('canvas').remove();
            
            var MIN_WIDTH = parseInt($el.attr(PREFIX + 'min-width'), 10) || 0;
            var MAX_WIDTH = parseInt($el.attr(PREFIX + 'max-width'), 10) || $(window).outerWidth();

            if ($el.width() > MIN_WIDTH && $el.width() < MAX_WIDTH) {
                params.width = $el.width();
            } else {
                params.width = Math.min(Math.max(MIN_WIDTH, $el.width()), MAX_WIDTH);
            }
        }
        
        if ( type === 'bar'){
            var barSpacing = parseInt($el.attr(PREFIX + 'BarSpacing'), 10) || $.fn.sparkline.defaults.bar.barSpacing;
            params.barWidth = (params.width - (data.length - 1) * barSpacing) / data.length;
            $(el).sparkline(data, params);
        }else if (type === 'line'){
            $(el).sparkline(data, params);
        }else if (type === 'pie'){
            params.height = params.width;
            $(el).sparkline(data, params);
        }
    });
}