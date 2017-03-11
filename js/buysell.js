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
    $("#myTable").on('click', '.buy_sell_button', function () {
        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").text();
        var type = $(this).attr("name");
        var st = "Enter " + type + " quantity for " + col1;
        // '<span style="font-size: 15px">'+st+'</span>'
        // jPrompt('<span style="font-size: 15px">'+st+'</span>', 'Prompt Dialog', function(r) {
        //     resp=parseInt(r);
        // });
        // alert(resp);
        jPrompt('<span style="font-size: 15px">' + st + '</span>', '', '', function (r) {
            var tr = parseInt(r);
            var patt = new RegExp("[^0-9]");
            var x = patt.test(r);
            if (x == true) {
                alert("Invalid entry...Must be a number");
                return;
            }
            else if (index = r.indexOf('.') > -1) {
                alert("Invalid entry...Must be a number");
                return;
            }

            else if (tr <= 0 || isNaN(tr) == true) {
                alert("Invalid entry...Must be a number");
            }
        });
    })
})
