<!--Author      : @arboshiki-->
<div id="morrisjs">
    <div class="row">
        <div class="col-lg-6">
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>Bar Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div id="bar-chart"></div>
                </div>
            </div>
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>Line Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div id="line-chart"></div>
                </div>
            </div>
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>No grid Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div id="no-grid-chart"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>Stacked Bar Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div id="stacked-bar-chart" ></div>
                </div>
            </div>
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>Area Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div>
                        <div id="area-chart" ></div>
                    </div>
                </div>
            </div>
            <div class="panel panel-light">
                <div class="panel-heading">
                    <div class="panel-title">
                        <h4>Pie Chart</h4>
                    </div>
                </div>
                <div class="panel-body padding-20">
                    <div id="pie-chart"></div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        LobiAdmin.loadScript([
            'js/plugin/morris/raphael-min.js',
            'js/plugin/morris/morris.js'
        ], initPage);
        
        function initPage(){
            var data = [
                { y: '2014', a: 50, b: 90},
                { y: '2015', a: 65,  b: 75},
                { y: '2016', a: 50,  b: 50},
                { y: '2017', a: 75,  b: 60},
                { y: '2018', a: 80,  b: 65},
                { y: '2019', a: 90,  b: 70},
                { y: '2020', a: 100, b: 75},
                { y: '2021', a: 115, b: 75},
                { y: '2022', a: 120, b: 85},
                { y: '2023', a: 145, b: 85},
                { y: '2024', a: 160, b: 95}
            ],
            config = {
                data: data,
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Total Income', 'Total Outcome'],
                fillOpacity: 0.5,
                hideHover: 'auto',
                behaveLikeLine: true,
                resize: true,
                pointFillColors:['#FFF'],
                pointStrokeColors: [LobiAdmin.DEFAULT_COLOR, LobiAdmin.lightenColor(LobiAdmin.DEFAULT_COLOR, 40)],
                lineColors:[LobiAdmin.DEFAULT_COLOR, LobiAdmin.fadeOutColor(LobiAdmin.DEFAULT_COLOR, 35)],
                barColors: [LobiAdmin.DEFAULT_COLOR, LobiAdmin.lightenColor(LobiAdmin.DEFAULT_COLOR, 40)]
            };
            config.element = 'bar-chart';
            var bar = Morris.Bar(config);
            
            config.element = 'stacked-bar-chart';
            config.stacked = true;
            Morris.Bar(config);
            
            config.element = 'line-chart';
            Morris.Line(config);
            
            config.element = 'area-chart';
            Morris.Area(config);
            
            config.element = 'no-grid-chart';
            config.grid = false;
            Morris.Line(config);
            
            Morris.Donut({
                element: 'pie-chart',
                resize: true,
                colors: [LobiAdmin.DEFAULT_COLOR, LobiAdmin.fadeOutColor(LobiAdmin.DEFAULT_COLOR, 15), LobiAdmin.fadeOutColor(LobiAdmin.DEFAULT_COLOR, 30), LobiAdmin.fadeOutColor(LobiAdmin.DEFAULT_COLOR, 45)],
                data: [
                    {label: "Friends", value: 30},
                    {label: "Allies", value: 15},
                    {label: "Enemies", value: 45},
                    {label: "Neutral", value: 10}
                ]
            });
            
            $('.panel').lobiPanel({
                reload: false,
                editTitle: false,
                unpin: false,
                sortable: true
            });
            
            $('body').on('beforePageLoad.lobiAdmin.1', function(){
                $(window).off('resize.morrisJs');
                $('body').off('beforePageLoad.lobiAdmin.1');
            });
        }
    </script>
</div>