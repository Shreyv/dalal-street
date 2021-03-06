/**
 * Created by INSPIRON on 13-03-17.
 */
$(document).ready(function () {
    $.notify.defaults({
        autoHide: true,
        autoHideDelay: 2000,
        elementPosition: 'bottom left',
        globalPosition: 'top center',
    })
    var userid = localStorage.getItem("mobile");
    var name = localStorage.getItem("name");
    var amt = localStorage.getItem("amount");
    $("#name").text(name);
    $("#amount").text(amt);
    var curl1 = rurl + "broker?user_id=";
    var curl2 = rurl + "broker";
    var tbroker = document.getElementById("broker_table");
    $('#logo').on('touchstart click', function () {
        window.location.replace("dashboard.html");
    });
    /*get broker data */
    $.getJSON(curl1 + userid, function (data) {
        if (data["status"] != 200) {
            if(data["status"]== 555){
                window.location.replace("countdown.html");
            }
            else if(data["status"]== 666){
                alert("Market has been closed..You will be redirected to leaderboard")
                window.location.replace("leaderboard.html");
            }
            else{
                window.location.replace("index.html");
            }
        }
        var broker = data["message"]["assigned"];
        if (broker == null) {
            $("#broker_assign_not_assign").text("Not Assigned");
            $("#removeb").attr("disabled", "disabled");
        }
        else {
            $("#broker_assign_not_assign").text(broker);
        }
        var d = data["message"]["brokers"];
        for (var i = 0; i < d.length; i++) {
            var row = tbroker.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = d[i]["_id"];
            cell2.innerHTML = d[i]["prediction_accuracy"] + "%";
            cell3.innerHTML = d[i]["brokerage"] + "%";
            cell4.innerHTML = d[i]["charge"];
            cell5.innerHTML = '<button type="button" class="buy_sell_button" style="margin: 0px;">Assign Broker</button>';

        }

    })
    /* remove broker */
    $("#removeb").click(function () {
        var r = confirm("Continue to remove broker?");
        if (r == true) {
            var broker = $("#broker_assign_not_assign").text();
            var data = {"user_id": userid, "broker": broker, "type": "remove"};
            $.ajax({
                url: curl2,
                type: 'post',
                success: function (d) {
                    if (d["status"] != 200) {
                        window.location.replace("index.html");
                    }
                    $("#broker_assign_not_assign").text("Not Assigned");
                    $.notify(d["message"], "success");

                },
                data: JSON.stringify(data)
            });
            $("#removeb").attr("disabled", true);
        }
    })
    /*Below code is for assigning broker */
    $("#broker_table").on('click', '.buy_sell_button', function () {
        var currentRow = $(this).closest("tr");
        var broker = currentRow.find("td:eq(0)").text();
        var r = confirm("Continue to assign " + broker + "?");
        if (r == true) {
            if (broker == $("#broker_assign_not_assign").text()) {
                $.notify("Broker already assigned", "error");
                return;
            }
            var data = {"user_id": userid, "broker": broker, "type": "assign"};
            $.ajax({
                url: curl2,
                type: 'post',
                success: function (d) {
                    if (d["status"] != 200) {
                        window.location.replace("index.html");
                    }
                    var newamount = d["message"]["balance"];
                    localStorage.setItem("amount", newamount);
                    $("#amount").text(newamount);
                    $("#broker_assign_not_assign").text(broker);
                    $(this).attr("disabled", true);
                    $.notify(d["message"]["message"], "success");
                },
                data: JSON.stringify(data)
            });
            $("#removeb").attr("disabled", false);
        }
    })
})