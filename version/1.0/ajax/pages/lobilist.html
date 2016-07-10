<!--Author      : @arbishiki-->
<div>
    <h1 class="page-header-dashed">Lobilist</h1>
    <p class="lead">LobiList is  <b>TODO list</b> jquery plugin specially created for <big>LobiAdmin</big>.</p>
    <!--Features-->
    <div>
        <h3>Features</h3>
        <ul>
            <li>Multiple list support</li>
            <li>Load lists and todos by ajax</li>
            <li>List style support</li>
            <li>Custom Checkboxes</li>
            <li>Drag & drop support between lists and between todos also</li>
            <li>Ajax support for TODO <b>Add, Edit and Delete</b> actions</li>
        </ul>
    </div>
    <!--Usage-->
    <div>
        <h3>Usage</h3>
        <p><big>LobiList</big> initialization is simple. Just create an empty <code>&lt;div&gt;</code> and call plugin.</p>
        <div class="highlight">
            <pre>
    <code class="html">&ltdiv id="todo-lists-demo">&lt;/div>
&lt;script></code>
<code class="javascript">    $(function(){
        $('#todo-lists-demo').lobiList({
            //Options
        });
    });</code>
<code class="html">&lt;/script&gt;</code>
            </pre>
        </div>
    </div>
    <div class="callout callout-warning">
        <p class="lead">Full documentation and example codes are available after purchasing.</p>
    </div>
    <!--Demo-->
    <div>
        <h3>Demo</h3>
        <!--Basic example-->
        <div>
            <div class="bs-example">
                <h4>Basic example</h4>
                <div id="todo-lists-demo"></div>
            </div>
        </div>

        <!--Event handling-->
        <div>
            <div class="bs-example">
                <h4>Event handling</h4>
                <button id="todo-lists-initialize-btn" class="btn btn-primary margin-bottom-15">Initialize</button>
                <div id='todo-lists-demo-events'></div>
            </div>
        </div>

        <!--Custom controls-->
        <div>
            <div class="bs-example">
                <h4>Custom controls</h4>
                <div id="todo-lists-demo-controls"></div>
            </div>
        </div>

        <!--Disabled drag & drop-->
        <div>
            <div class="bs-example">
                <h4>Disabled drag & drop</h4>
                <div id="todo-lists-demo-sorting"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        
        LobiAdmin.loadScript([
            'js/plugin/highlight/highlight.pack.js'
        ], function(){
            LobiAdmin.highlightCode();
        });
        
        LobiAdmin.loadScript([
            'js/lobi-plugins/lobilist.min.js'
        ], initPage);
        
        function initPage(){
            
            $('#todo-lists-demo-sorting').lobiList({
                sortable: false,
                lists: [
                    {
                        title: 'TODO',
                        defaultStyle: 'lobilist-info',
                        controls: ['edit', 'styleChange'],
                        items: [
                            {
                                title: 'Floor cool cinders',
                                description: 'Thunder fulfilled travellers folly, wading, lake.',
                                dueDate: '2015-01-31'
                            }
                        ]
                    },
                    {
                        title: 'Controls disabled',
                        controls: false,
                        items: [
                            {
                                title: 'Composed trays',
                                description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.',
                            }
                        ]
                    }
                ]
            });
            $('#todo-lists-demo-controls').lobiList({
                lists: [
                    {
                        title: 'TODO',
                        defaultStyle: 'lobilist-info',
                        controls: ['edit', 'styleChange'],
                        items: [
                            {
                                title: 'Floor cool cinders',
                                description: 'Thunder fulfilled travellers folly, wading, lake.',
                                dueDate: '2015-01-31'
                            }
                        ]
                    },
                    {
                        title: 'Disabled custom checkboxes',
                        defaultStyle: 'lobilist-danger',
                        controls: ['edit', 'add', 'remove'],
                        useLobicheck: false,
                        items: [
                            {
                                title: 'Periods pride',
                                description: 'Accepted was mollis',
                                done: true
                            }
                        ]
                    },
                    {
                        title: 'Controls disabled',
                        controls: false,
                        items: [
                            {
                                title: 'Composed trays',
                                description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.',
                            }
                        ]
                    },
                    {
                        title: 'Disabled todo edit/remove',
                        removeItemButton: false,
                        editItemButton: false,
                        items: [
                            {
                                title: 'Composed trays',
                                description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.',
                            }
                        ]
                    }
                ]
            });
            $('#todo-lists-initialize-btn').click(function () {
                $('#todo-lists-demo-events').lobiList({
                    onInit: function () {
                        Lobibox.notify('success', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'LobiList is initialized'
                        });
                    },
                    onAdd: function (list) {
                        Lobibox.notify('warning', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'List added'
                        });
                    },
                    onRemove: function (list) {
                        Lobibox.confirm({
                            msg: 'Are you sure you want to delete the list',
                            callback: function (box, type) {
                                if (type === 'yes') {
                                    list.remove(true);
                                }
                            }
                        });
                        return false;
                    },
                    afterRemove: function () {
                        Lobibox.notify('info', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'List after remove'
                        });
                    },
                    onItemAdd: function () {
                        Lobibox.notify('info', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'Before item is added'
                        });
                    },
                    afterItemAdd: function () {
                        Lobibox.notify('info', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'After item is added'
                        });
                    },
                    onItemUpdate: function () {
                        Lobibox.notify('error', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'Before item is updated'
                        });
                    },
                    afterItemUpdate: function () {
                        Lobibox.notify('error', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'After item is updated'
                        });
                    },
                    onItemDelete: function () {
                        Lobibox.notify('warning', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'Before item is deleted'
                        });
                    },
                    afterItemDelete: function () {
                        Lobibox.notify('warning', {
                            size: 'mini',
                            delay: false,
                            sound: false,
                            msg: 'After item is deleted'
                        });
                    },
                    lists: [
                        {
                            title: 'TODO',
                            defaultStyle: 'lobilist-info',
                            items: [
                                {
                                    title: 'Floor cool cinders',
                                    description: 'Thunder fulfilled travellers folly, wading, lake.',
                                    dueDate: '2015-01-31'
                                },
                                {
                                    title: 'Periods pride',
                                    description: 'Accepted was mollis',
                                    done: true
                                },
                                {
                                    title: 'Flags better burns pigeon',
                                    description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                                },
                                {
                                    title: 'Accepted was mollis',
                                    description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                                    dueDate: '2015-02-02'
                                }
                            ]
                        }
                    ]
                });
            });
            $('#todo-lists-demo').lobiList({
                lists: [
                    {
                        title: 'TODO',
                        defaultStyle: 'lobilist-info',
                        items: [
                            {
                                title: 'Floor cool cinders',
                                description: 'Thunder fulfilled travellers folly, wading, lake.',
                                dueDate: '2015-01-31'
                            },
                            {
                                title: 'Periods pride',
                                description: 'Accepted was mollis',
                                done: true
                            },
                            {
                                title: 'Flags better burns pigeon',
                                description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                            },
                            {
                                title: 'Accepted was mollis',
                                description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                                dueDate: '2015-02-02'
                            }
                        ]
                    },
                    {
                        title: 'DOING',
                        items: [
                            {
                                title: 'Composed trays',
                                description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.',
                            },
                            {
                                title: 'Chic leafy'
                            },
                            {
                                title: 'Guessed interdum armies chirp writhes most',
                                description: 'Came champlain live leopards twilight whenever warm read wish squirrel rock.',
                                dueDate: '2015-02-04',
                                done: true
                            }
                        ]
                    }
                ]
            });
        }
    </script>
</div>