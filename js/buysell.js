//todo remove setitem mobile & add notify.js
$(document).ready(function () {
    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();
    $.notify.defaults({
        autoHide: true,
        autoHideDelay: 2000,
        elementPosition: 'bottom left',
        globalPosition: 'top center',
    })
    $("#myTable").on('click', '.buy_sell_button', function () {
        var currentRow = $(this).closest("tr");
        var company = currentRow.find("td:eq(0)").text();
        var type = $(this).attr("name");
        var st = "Enter " + type + " quantity for " + company;
        jPrompt('<span style="font-size: 20px">' + st + '</span>', '', '', function (r) {
            var tr = parseInt(r);
            var patt = new RegExp("[^0-9]");
            var x = patt.test(r);
            if (r == null || x == true || tr <= 0 || isNaN(tr) == true) {
                jAlert('Invalid entry...Must be a number greater than 0', 'Error');
                return;
            }
            else {
                var mob = localStorage.getItem("mobile");
                var d1 = {"user_id": mob, "company": company, "type": type.toLowerCase(), "quantity": tr};
                $.ajax({
                    url: rurl + 'trade',
                    type: 'post',
                    data: JSON.stringify(d1),
                    dataType: 'json',
                    success: function (d2) {
                        if (d2["status"] == 200) {
                            var x = d2["message"]["message"];
                            if (x.includes("Not")) {
                                $.notify(x, "error");
                            }
                            else {
                                $.notify(x, "success");
                                var bal=d2["message"]["balance"];
                                $("#amount").text(bal);
                            }
                        }
                        else {
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
                    }
                });
            }
        });
    })
})
