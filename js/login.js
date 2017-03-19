$(document).ready(function () {
    $("#blogin").click(function () {
        var userid = $("#user").val();
        var password = $("#password").val();
        var patt = new RegExp("[^0-9]");
        var x = patt.test(userid);
        if (x == true || userid.length != 10 || password == null) {
            alert("Invalid Entry");
        }
        else {
            var d1 = {"user_id": userid, "password": password};
            $.ajax({
                url: "localhost:8000/login",
                type: 'post',
                data: JSON.stringify(d1),
                dataType: 'json',
                success: function (d2) {
                    if (d2["status"] != 200) {
                        alert(d2["message"]);
                    }
                    else {
                        localStorage.setItem("mobile", userid);
                        localStorage.setItem("token", d2["message"]);
                        window.location.replace("dashboard.html");
                    }
                }
            });
        }

    })
})
