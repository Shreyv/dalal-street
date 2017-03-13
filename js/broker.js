/**
 * Created by INSPIRON on 13-03-17.
 */
$(document).ready(function () {
    var userid = localStorage.getItem("mobile");
    var name = localStorage.getItem("name");
    var amt = localStorage.getItem("amount");
    $("#name").text(name);
    $("#amount").text(amt);
    var b;
    var url = "http://192.168.0.107:8000/broker?user_id=";
    var aurl = "http://192.168.0.107:8000/broker";
    var tbroker = document.getElementById("broker_table");
    $.getJSON(url + userid, function (data) {
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
            cell2.innerHTML = d[i]["prediction_accuracy"];
            cell3.innerHTML = d[i]["brokerage"];
            cell4.innerHTML = d[i]["charge"];
            cell5.innerHTML = '<button type="button" class="buy_sell_button" style="margin: 0px;">Assign Broker</button>';

        }

    })
    $("#removeb").click(function () {
        var broker = $("#broker_assign_not_assign").text();
        var data = {"user_id": userid, "broker": broker, "type": "remove"};
        $.ajax({
            url: aurl,
            type: 'post',
            success: function (d) {
                $("#broker_assign_not_assign").text("Not Assigned");
                alert(d["message"]);
            },
            data: JSON.stringify(data)
        });
        $("#removeb").attr("disabled", true);
    })
    /*Below code is for assigning broker */
    $("#broker_table").on('click', '.buy_sell_button', function () {
        var currentRow = $(this).closest("tr");
        var broker = currentRow.find("td:eq(0)").text();
        if (broker == $("#broker_assign_not_assign").text()) {
            alert("Broker already assigned");
            return;
        }
        var data = {"user_id": userid, "broker": broker, "type": "assign"};
        $.ajax({
            url: aurl,
            type: 'post',
            success: function (d) {
                var newamount = d["message"]["balance"];
                localStorage.setItem("amount", newamount);
                $("#amount").text(newamount);
                $("#broker_assign_not_assign").text(broker);
                $(this).attr("disabled", true);
                alert(d["message"]["message"]);
            },
            data: JSON.stringify(data)
        });
        $("#removeb").attr("disabled", false);
    })
})