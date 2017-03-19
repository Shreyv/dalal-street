$(document).ready(function () {
    $('#myTable').on('click', 'tr td:first-child ', function () {
        $("#display-graph").remove();
        $('#graph-container').append('<canvas id="display-graph" style="padding: 1px;"><canvas>');
        if (/Mobi/.test(navigator.userAgent)) {
            if (window.innerHeight > window.innerWidth) {
                $('#display-graph').attr("height", 200);
            }
            else {
                $('#display-graph').attr("height", 150);
            }
        }
        else {
            $('#display-graph').attr("height", 240);
        }
        var myLineChart;
        var time = [], price = [];
        var comp = $(this).text();
        var url = rurl + "graph?company=" + comp;
        $.getJSON(url, function (data) {
            if (data["status"] != 200) {
                window.location.replace("index.html");
            }
            var d = data["message"]["graph"]["values"];
            var shares = data["message"]["shares"];
            var type = data["message"]["graph"]["type"];
            for (var i = 0; i < d.length; i++) {
                price[i] = parseFloat(d[i]["price"]);
                time[i] = d[i]["timestamp"];
            }
            var data = {
                labels: time,
                datasets: [
                    {
                        data: price, label: comp,
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10
                    }
                ]
            };
            var ctx = document.getElementById("display-graph").getContext('2d');
            myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Market Price'
                            }
                        }]
                    }
                }
            });
            $("#shares").show();
            $("#shares").text("You have " + shares + " shares");
            $("#sector").show();
            $("#sector").text("Sector:" + type);
        });
    });
})

