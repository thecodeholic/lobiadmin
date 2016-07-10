<!--Author      : @arboshiki-->
<div id="event-calendar">
    <div class="callout callout-info">
        <p>FullCalendar is a jQuery plugin that provides a full-sized, drag & drop event calendar like the one below. 
            It uses AJAX to fetch events on-the-fly and is easily configured to use your own feed format. 
            It is visually customizable with a rich API.
            <a href="http://fullcalendar.io/" target="_blank">Read more...</a>
        </p>
    </div>
    <div class="callout callout-info">
        <ul>
            <li>Click on the event to show edit window.</li>
            <li>Click on empty space to create new event.</li>
        </ul>
    </div>
    <div class="panel panel-light">
        <div class="panel-heading">
            <div class="panel-title">
                <h4>Events calendar</h4>
            </div>
        </div>
        <div class="panel-body">
            <div id="calendar-demo"></div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="addEventModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Add event</h4>
            </div>
            <div class="modal-body">
                <form action>
                    <div class="form-group">
                        <label class="control-label">Event style</label>
                        <div class="btn-group btn-group-justified btn-group-event-style" data-toggle="buttons">
                            <label class="btn btn-primary active">
                                <input type="radio" name="style" value="bg-primary" checked> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-success text-white">
                                <input type="radio" name="style" value="bg-success"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-danger text-white">
                                <input type="radio" name="style" value="bg-danger"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-info text-white">
                                <input type="radio" name="style" value="bg-info"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-warning text-white">
                                <input type="radio" name="style" value="bg-warning"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-gray text-white">
                                <input type="radio" name="style" value="bg-gray"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-cyan text-white">
                                <input type="radio" name="style" value="bg-cyan"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-purple text-white">
                                <input type="radio" name="style" value="bg-purple"> <i class="fa fa-check"></i>
                            </label>
                            <label class="btn bg-pink text-white">
                                <input type="radio" name="style" value="bg-pink"> <i class="fa fa-check"></i>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="text" name="date-period" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label class="checkbox lobicheck">
                            <input type="checkbox" name="allday" checked> 
                            <i></i> All day
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Event title</label>
                        <input type="text" class="form-control" name="title" placeholder="Event title"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Event description</label>
                        <textarea rows="3" class="form-control" name="desc"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary btn-add">Add event</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    
    LobiAdmin.loadScript('js/plugin/moment/moment.min.js', function(){
        LobiAdmin.loadScript([
            'js/plugin/daterangepicker/daterangepicker.min.js',
            'js/plugin/fullcalendar/fullcalendar.min.js'
        ], initPage);
    });
    
    
    function initPage(){
        moment().zone('-08:00');
        var $addEventModal = $('#addEventModal');
        $addEventModal.appendTo('body');
        $addEventModal.on('show.bs.modal', function(){
            $addEventModal.find('form')[0].reset();
        });
        $addEventModal.on('hide.bs.modal', function(){
            eventToUpdate = null;
        });
        
        //Initialize single date picker
        $addEventModal.find('[name=date-period]').daterangepicker({
                singleDatePicker: true
            },
            function(start, end) {
                startDate = start;
                endDate = null;
            }
        );
        var startDate, endDate, eventToUpdate;
        //Date range input
        var $input = $addEventModal.find('[name=date-period]');
        $addEventModal.find('[name=allday]').change(function(){
            var $check = $(this);
            var stDate = $input.data('daterangepicker').startDate;
            if ($check.prop('checked')){
                $input.data('daterangepicker').setOptions({
                    singleDatePicker: true
                });
                $input.data('daterangepicker').setStartDate(stDate);
                $input.data('daterangepicker').setEndDate(stDate);
            }else{
                //Initialize date range picker
                $input.daterangepicker({
                    timePicker: true,
                    timePickerIncrement: 10,
                    format: 'MM/DD/YYYY h:mm A'
                });
                window.console.log(eventToUpdate);
                window.console.log(stDate.format('YYYY-MM-DD h:mm:ss a'));
                if ( ! eventToUpdate || ! eventToUpdate.end){
                    $input.data('daterangepicker').setStartDate(stDate);
                    var enDate = stDate.add(2, 'hours');
                    window.console.log(enDate.format('YYYY-MM-DD h:mm:ss a'));
                    $input.data('daterangepicker').setEndDate(enDate);
                }else if (eventToUpdate){
                    $input.data('daterangepicker').setStartDate(eventToUpdate.start);
                    if (eventToUpdate.end){
                        $input.data('daterangepicker').setEndDate(eventToUpdate.end);
                    }
                }
            }
        });
        var CALENDAR = $('#calendar-demo');
        //Listen to #addEventModal "Add Event" button click and add new event
        $addEventModal.find('.btn-add').click(function(){
            var $body = $(this).closest('.modal-content');
            var style = $body.find('[name=style]:checked').val();
            var title = $body.find('[name=title]').val();
            var desc = $body.find('[name=desc]').val();
            var allDay = $body.find('[name=allday]:checked').val() ? true : false;
            
            var startDate = $input.data('daterangepicker').startDate;
            var endDate = $input.data('daterangepicker').endDate;
//            window.console.log(eventToUpdate);
            if ( ! eventToUpdate){
                var event = {
                    title: title,
                    className: [style, style.replace('bg', 'border')+'-dark'],
                    allDay: allDay,
                    description: desc
                };
                if ( ! allDay){
                    event.start = startDate;
                    event.end = endDate;
//                    window.console.log(event.start.format('YYYY-MM-DD h:mm:ss a'));
//                    window.console.log(event.end.format('YYYY-MM-DD h:mm:ss a'));
                }else{
                    event.start = startDate.format('YYYY-MM-DD');
                }
                CALENDAR.fullCalendar('renderEvent', event, true);
            }else{
                eventToUpdate.title = title;
                eventToUpdate.className = [style, style.replace('bg', 'border')+'-dark'];
                eventToUpdate.allDay = allDay;
                eventToUpdate.description = desc;
                if ( ! allDay){
                    eventToUpdate.start = startDate;
                    eventToUpdate.end = endDate;
//                    window.console.log(eventToUpdate.start.format('YYYY-MM-DD h:mm:ss a'));
//                    window.console.log(endDate.format('YYYY-MM-DD h:mm:ss a'));
                }else{
                    eventToUpdate.start = startDate.format('YYYY-MM-DD');
                }
//                window.console.log(eventToUpdate);
                CALENDAR.fullCalendar('updateEvent', eventToUpdate);
            }
            $addEventModal.modal('hide');
        });
        CALENDAR.fullCalendar({
            dayClick: function(date, jsEvent, view) {
                $addEventModal.modal('show');
//                window.console.log(date.format('YYYY-MM-DD h:mm:ss a'));
                $input.data('daterangepicker').setOptions({
                    singleDatePicker: true
                });
                $addEventModal.find('.btn-add').html('Add event');
                $addEventModal.find('[name=date-period]').data('daterangepicker').setStartDate(date);
                $addEventModal.find('[name=date-period]').data('daterangepicker').setEndDate(date);
            },
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2015-09-12',
            editable: true,
            droppable: true,
            eventLimit: true,
            businessHours: true,
            buttons: false,
            eventRender: function(event, element, view){
                if (event.description){
                    element.append('<span class="fc-description">'+event.description+'</span>');
                }
            },
            eventClick: function(calEvent, jsEvent, view) {
                eventToUpdate = calEvent;
                $addEventModal.modal('show');
                $addEventModal.find('.btn-add').html('Update event');
                var className = calEvent.className;
                if (className && typeof className === 'string'){
                    $addEventModal.find('[name="style"][value="'+className+'"]').prop('checked', true);
                }else if (className && className.length > 0){
                    for (var i = 0; i<className.length; i++){
                        if (className[i].indexOf('bg') === 0){
                            $addEventModal.find('[name="style"][value="'+className[i]+'"]').prop('checked', true);
                            break;
                        }
                    }
                }
                if (calEvent.allDay){
                    //Initialize date range picker
                    $addEventModal.find('[name=date-period]').daterangepicker({
                            singleDatePicker: true,
                        },
                        function(start, end) {
                            startDate = start;
                            endDate = end;
                        }
                    );
                    $addEventModal.find('[name=date-period]').data('daterangepicker').setStartDate(calEvent.start);
                    $addEventModal.find('[name=date-period]').data('daterangepicker').setEndDate(calEvent.start);
                }else{
                    //Initialize date range picker
                    $addEventModal.find('[name=date-period]').daterangepicker({
                            timePicker: true,
                            timePickerIncrement: 10,
                            format: 'MM/DD/YYYY h:mm A',
//                            timeZone: '-08:00'
                        },
                        function(start, end) {
                            startDate = start;
                            endDate = end;
                        }
                    );
            
                    if ( ! calEvent.end){
                        calEvent.end = moment();
                    }
                    $addEventModal.find('[name=date-period]').data('daterangepicker').setStartDate(calEvent.start);
                    $addEventModal.find('[name=date-period]').data('daterangepicker').setEndDate(calEvent.end);
                }
                $addEventModal.find('[name=title]').val(calEvent.title);
                $addEventModal.find('[name=allday]').prop('checked', calEvent.allDay);
                $addEventModal.find('[name=desc]').val(calEvent.description || '');
                CALENDAR.fullCalendar('updateEvent', calEvent);

                // change the border color just for fun
                $(this).css('border-color', 'red');

            },
            events: [
                {
                        title: 'All Day Event',
                        start: '2015-09-01'
                },
                {
                        title: 'Long Event',
                        start: '2015-09-07',
                        end: '2015-09-10',
                        className: 'bg-success border-transparent'
                        
                },
                {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2015-09-09T16:00:00',
                        description: 'Repeating event description',
                        className: 'bg-danger border-transparent'
                },
                {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2015-09-16T16:00:00',
                        description: 'Repeating event description',
                        className: 'bg-danger border-transparent'
                },
                {
                        title: 'Conference',
                        start: '2015-09-11',
                        end: '2015-09-13',
                        description: 'Description will held in hole',
                        className: 'bg-purple border-transparent'
                },
                {
                        title: 'Meeting',
                        start: '2015-09-12T10:30:00',
                        end: '2015-09-12T12:30:00',
                        className: 'bg-info border-transparent'
                },
                {
                        title: 'Lunch',
                        start: '2015-09-12T12:00:00',
                        description: 'The lunch will be at corner cafe'
                },
                {
                        title: 'Meeting',
                        start: '2015-09-12T14:30:00',
                        className: 'bg-purple border-transparent'
                },
                {
                        title: 'Happy Hour',
                        start: '2015-09-12T17:30:00'
                },
                {
                        title: 'Dinner',
                        start: '2015-09-12T20:00:00',
                        className: 'bg-warning border-transparent'
                },
                {
                        title: 'Birthday Party',
                        start: '2015-09-13T07:00:00',
                        className: 'bg-warning border-transparent'
                },
                {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2015-09-28'
                }
            ]
        });
    }
</script>