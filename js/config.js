var rurl = "http://192.168.0.107:8000/";
$(document).ready(function () {
    var token = localStorage.getItem("token");
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

})
