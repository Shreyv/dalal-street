$(document).ready(function () {
    var mst = "", bst = "";
    $.getJSON("http://192.168.0.107:8000/news?user_id=9586229921", function (data) {
        var market = data["message"]["news"];
        var broker = data["message"]["broker_news"];
        var t, m;
        var sp = '                ';
        for (var x = 0; x < market.length; x++) {
            t = market[x]["timestamp"];
            t = t.slice(11, 16);
            m = market[x]["message"];
            mst += t + "-" + m + sp;
        }
        for (var x = 0; x < broker.length; x++) {
            t = broker[x]["timestamp"];
            if (t != null) {
                t = t.slice(11, 16);
                m = broker[x]["message"];
                bst += t + "-" + m + sp;
            }
            else {
                m = broker[x];
                bst = m;
            }
        }
        $("#mn").text(mst);
        $("#bn").text(bst);
        $(".scroll-left").marquee({
            duration: 10000,
            gap: 50,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true
        });
    })

})