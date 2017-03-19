var rurl = "http://127.0.0.1:8000/";
$(document).ready(function () {
    var token = localStorage.getItem("token");
    //$(document).bind("contextmenu",function(e) {
    //    e.preventDefault();
    //});
    //$(document).keydown(function(e){
    //    if(e.which === 123){
    //        return false;
    //    }
    //});
    $("#logout").css("cursor", "pointer");
    if (token == null) {
        alert("Please login first");
        window.location.href = "index.html";
    }
    else {
        $.ajaxSetup({
            headers: {
                'Authorization': token
            }
        });
    }
    $("#logout").click(function () {
        var d1 = {"user_id": localStorage.getItem("mobile")};
        $.ajax({
            url: rurl + 'logout',
            type: 'post',
            data: JSON.stringify(d1),
            dataType: 'json',
            success: function (d2) {
                if (d2["status"] != 200) {
                    alert(d2["message"]);
                }
                else {
                    localStorage.removeItem("mobile");
                    localStorage.removeItem("amount");
                    localStorage.removeItem("name");
                    localStorage.removeItem("token");
                    window.location.replace("index.html");
                }
            }
        });
    })

})
