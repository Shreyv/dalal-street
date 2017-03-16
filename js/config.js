var rurl = "http://192.168.0.107:8000/";
$(document).ready(function () {
    function logout() {

    }

    $.ajaxSetup({
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
})
