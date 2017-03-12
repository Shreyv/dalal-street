$(document).ready(function () {
    $('#myTable').on('click', 'tr td:first-child ', function () {
        var comp = $(this).text();
        var url = "http://192.168.0.107:8000/dashboard?user_id=" + comp;
        $.getJSON(url, function (data) {

        })
    })

})
function displaygraph(company) {
    var ctx = document.getElementById("display-graph");
    var timeslots = ["10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45"];
    var prices = [45, 60, 10, 4, 4, 4, 56, 30, 500];
    var data = {
        labels: timeslots,
        datasets: [
            {
                data: prices, label: company,
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
    var myLineChart = new Chart(ctx, {
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
}
