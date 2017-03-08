//todo: error code
$(document).ready(function () {
    $.getJSON("http://192.168.0.105:8000/dashboard?user_id=9586229921", function (data) {
        //if(data["status"]=="error-code"){
        //    //error stuff
        //}
        var username = data["message"]["investor"]["name"];
        var amount = data["message"]["investor"]["amount"];
        $("#name").text(username);
        var company_list = data["message"]["companies"];
        var table = document.getElementById("myTable");
        for (var i = 0; i < company_list.length; i++) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            cell1.innerText = company_list[i]["_id"];
            cell2.innerText = company_list[i]["current_price"];
            cell3.innerText = company_list[i]["current_volume"];
            cell4.innerText = company_list[i]["high"];
            cell5.innerText = company_list[i]["low"];
            cell6.innerHTML = '<button type="button" class="buy_sell_button" style="margin: 0px;">Buy</button>';
            cell7.innerHTML = '<button type="button" class="buy_sell_button" style="margin-left: 5px;">Sell</button>';
        }

    })
})
