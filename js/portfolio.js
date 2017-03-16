$(document).ready(function () {
    var mob = localStorage.getItem("mobile");
    var name = localStorage.getItem("name");
    var amt = localStorage.getItem("amount");
    $("#name").text(name);
    $("#amount").text(amt);
    var curl = rurl + "portfolio?user_id=" + mob;
    $.getJSON(curl, function (data) {
        var portfolio = data["message"]["portfolio"];
        var transaction = data["message"]["transaction"];
        var ttrans = document.getElementById("table_transaction");
        var tport = document.getElementById("table_portfolio");
        for (var i = 0; i < portfolio.length; i++) {
            var row = tport.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = portfolio[i]["company"];
            cell2.innerHTML = portfolio[i]["shares"];
        }
        for (var i = 0; i < transaction.length; i++) {
            var row = ttrans.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var ty = transaction[i]["type"].toUpperCase();
            cell1.innerHTML = transaction[i]["company"];
            cell2.innerHTML = ty;
            cell3.innerHTML = transaction[i]["shares"];
            cell4.innerHTML = transaction[i]["price"];
            cell5.innerHTML = transaction[i]["timestamp"];
        }
    })
})
