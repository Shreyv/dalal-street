$(document).ready(function () {
    $("#shares").hide();
    $("#sector").hide();
    var flag = true;
    getdashboard(flag);
    flag = false;
    window.setInterval(function () {
        getdashboard(flag);
    }, 1000);
    function getdashboard(flag) {
        var c, p;
        var t = document.getElementById('myTable');
        var userid = localStorage.getItem("mobile");
        var curl = rurl + "dashboard?user_id=" + userid;
        $.getJSON(curl, function (data) {
            if (data["status"] == 200) {
                var username = data["message"]["investor"]["name"];
                var amount = data["message"]["investor"]["balance"];
                $("#name").text(username);
                $("#amount").text(amount);
                localStorage.setItem("name", username);
                localStorage.setItem("amount", amount);
                var row, cell1, cell2, cell3, cell4, cell5, cell6, cell7;
                var company_list = data["message"]["companies"];
                var table = document.getElementById("myTable");
                for (var i = 0; i < company_list.length; i++) {
                    var x1 = "id1" + String(i);
                    var x2 = "id2" + String(i);
                    var x3 = "id3" + String(i);
                    var x4 = "id4" + String(i);
                    var x5 = "id5" + String(i);
                    var x6 = "id6" + String(i);
                    var x7 = "id7" + String(i);
                    if (flag == true) {
                        row = table.insertRow(1);
                        cell1 = row.insertCell(0);
                        cell2 = row.insertCell(1);
                        cell3 = row.insertCell(2);
                        cell4 = row.insertCell(3);
                        cell5 = row.insertCell(4);
                        cell6 = row.insertCell(5);
                        cell7 = row.insertCell(6);
                        cell1.setAttribute("id", x1);
                        cell2.setAttribute("id", x2);
                        cell3.setAttribute("id", x3);
                        cell4.setAttribute("id", x4);
                        cell5.setAttribute("id", x5);
                        cell6.setAttribute("id", x6);
                        cell7.setAttribute("id", x7);
                        cell1.innerHTML = company_list[i]["_id"];
                        cell3.innerHTML = company_list[i]["current_price"];
                        cell4.innerHTML = company_list[i]["current_volume"];
                        cell5.innerHTML = company_list[i]["high"];
                        cell6.innerHTML = company_list[i]["low"];
                        cell7.innerHTML = '<button name="buy" type="button" class="buy_sell_button" style="margin: 0px;">Buy</button><button name="sell" type="button" class="buy_sell_button" style="margin-left: 5px;">Sell</button>';
                        if (company_list[i]["increased"] == true) {
                            cell2.innerHTML = '<img src="images/caret-arrow-up.svg" style="height:10px;">';
                            cell3.style.backgroundColor = "#E8F5E9";
                            cell3.setAttribute("class", "table_td_green");
                        }
                        else {
                            cell2.innerHTML = '<img src="images/sort-down.svg" style="height:10px;">';
                            cell3.style.backgroundColor = "#FFEBEE";
                            cell3.setAttribute("class", "table_td_red");
                        }
                    }
                    else {
                        var y1 = document.getElementById(x1);
                        var y2 = document.getElementById(x2);
                        var y3 = document.getElementById(x3);
                        var y4 = document.getElementById(x4);
                        var y5 = document.getElementById(x5);
                        var y6 = document.getElementById(x6);
                        var y7 = document.getElementById(x7);
                        var comp = company_list[i]["_id"];
                        y1.innerHTML = comp;
                        var np = company_list[i]["current_price"];
                        if (company_list[i]["increased"] == true) {
                            y2.innerHTML = '<img src="images/caret-arrow-up.svg" style="height:10px;">';
                            y3.style.backgroundColor = "#E8F5E9";
                            y3.setAttribute("class", "table_td_green");
                        }
                        else {
                            y2.innerHTML = '<img src="images/sort-down.svg" style="height:10px;">';
                            y3.style.backgroundColor = "#FFEBEE";
                            y3.setAttribute("class", "table_td_red");
                        }

                        y3.innerHTML = np;
                        y4.innerHTML = company_list[i]["current_volume"];
                        y5.innerHTML = company_list[i]["high"];
                        y6.innerHTML = company_list[i]["low"];
                        y7.innerHTML = '<button name="buy" type="button" class="buy_sell_button" style="margin: 0px;">Buy</button><button name="sell" type="button" class="buy_sell_button" style="margin-left: 5px;">Sell</button>';
                    }
                }
            }
            else {
                window.location.replace("index.html");
            }


        })
    }
})
