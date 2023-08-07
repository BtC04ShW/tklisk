var mySwiper2 = new Swiper('#swiper2', {
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slidesPerView: 5,
    on: {
        tap: function () {
            mySwiper3.slideTo(mySwiper2.clickedIndex)
        }
    }
})
var mySwiper3 = new Swiper('#swiper3', {
    //loop: true,
    autoHeight: true,
    on: {
        slideChangeTransitionStart: function () {
            updateNavPosition()
        }
    }
})

function updateNavPosition() {
    $('#swiper2 .active-nav').removeClass('active-nav')
    var activeNav = $('#swiper2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');

    if (!activeNav.hasClass('swiper-slide-visible')) {
        //console.log(1);
        if (activeNav.index() > mySwiper2.activeIndex) {
            //console.log(2);
            var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
            mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
        }
        else {
            //console.log(3);
            mySwiper2.slideTo(activeNav.index())
        }
    }
}

$(function () {
    //mySwiper3.slideTo(2)
    //判斷IOS非用PWA模式時
    //if (!window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === false) {
        //if (document.cookie == "") {
            //document.cookie = "btcoookie=HasLoaded; max-age=5";
            //window.location.href = window.location.href;
        //}
        //$("#al").removeClass("d-none");
        //$("#al").fadeOut(8000);
    //}
    //if ($('#rb4').is(':checked')) { $("#ddl1").removeClass("d-none"); } else { $("#ddl1").addClass("d-none"); }
    $("#rblcpd input[type=radio]").change(function () {
        if ($(this).val() == "1") {
            $("#cblblock").removeClass("d-none");
            $("#eicon").html("<i class='far fa-tired'></i>");
        } else {
            $("#cblblock").addClass("d-none");
            $("#eicon").html("<i class='far fa-smile-beam'></i>");
        }
    });
    $('input[type=radio][name=gr]').change(function () {
        if (this.value == 'rb4') { $("#ddl1").removeClass("d-none"); } else { $("#ddl1").addClass("d-none"); }
    });


    startRequest();
    //setInterval("startRequest()", 1000);
});
toastr.options = { "positionClass": "toast-bottom-center", "timeOut": "1500" }

//訂午晚餐
function CheckBoxList_Click(sender) {
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    var container = sender.parentNode;
    if (container.tagName.toUpperCase() == "TD") { // table 布局，否則為span布局
        container = container.parentNode.parentNode; // 層次: <table><tr><td><input />
    }
    var chkList = container.getElementsByTagName("input");
    var senderState = sender.checked;
    if ($("#hf_day").val() != "") {
        if (senderState) {
            for (var i = 0; i < chkList.length; i++) {
                chkList[i].checked = false;
            }

            sender.checked = senderState;
            //console.log((sender.id).split("_")[1]);
            //switch ((sender.id).split("_", 1)[0]) {
            switch ((sender.id).split("_")[0]) {
                case "CBL1":
                    if (conn("1", "L", sender.value, "午 餐 吃 " + $("label[for='" + sender.id + "']").text(), "V", logstr)) {
                        if (sender.value == 1 || sender.value == 2 || sender.value == 3 ||  sender.value == 4 || sender.value == 5 || sender.value == 6) {
                            $("#lorder").text("午 餐 " + $("label[for='" + sender.id + "']").attr("data-text"));
                            $("#lx").addClass("d-none");
                            $("#btnl").removeClass("d-none");//取餐按鈕
                        }
                        else {
                            $("#btnl").addClass("d-none");
                        }
                        $("#olitem").val(sender.value);
                    }
                    else {//網路不通時,還原原本選的項目及狀態
                        sender.checked = false;
                        switch ($("#olitem").val()) {
                            case "1"://團膳葷食
                                chkList[0].checked = true;
                                break;
                            case "4"://團膳素食
                                chkList[1].checked = true;
                                break;
                            case "5"://團膳麵食
                                chkList[2].checked = true;
                                break;
                            case "6"://團膳輕食
                                chkList[3].checked = true;
                                break;
                            case "2"://拉亞輕食
                                chkList[4].checked = true;
                                break;
                            case "3"://拉亞輕食2
                                chkList[5].checked = true;
                                break;
                        }
                    }
                    break;
                case "CBL2":
                    if (conn("1", "D", sender.value, "晚 餐 吃 " + $("label[for='" + sender.id + "']").text(), "V", logstr)) {
                        if (sender.value == 1 || sender.value == 4) {
                            $("#dorder").text("晚 餐 " + $("label[for='" + sender.id + "']").attr("data-text"));
                            $("#dx").addClass("d-none");
                            $("#btnd").removeClass("d-none");//取餐按鈕
                        }
                        else {
                            $("#btnd").addClass("d-none");
                        }
                        document.cookie = "ricky=true; expires=60";
                        $("#oditem").val(sender.value);
                    }
                    else {
                        sender.checked = false;
                        switch ($("#oditem").val()) {
                            case "1":
                                chkList[0].checked = true;
                                break;
                            case "4":
                                chkList[1].checked = true;
                                break;
                            default:
                                chkList[$("#oditem").val()].checked = true;
                                break;
                        }
                    }
                    break;
            }
        }
        else {
            switch ((sender.id).split("_", 1)[0]) {
                case "CBL1":
                    if (conn("1", "L", "", "取 消 午 餐 : " + $("label[for='" + sender.id + "']").text(), "X", logstr)) {
                        $("#btnl").addClass("d-none");
                        $("#lx").addClass("d-none");
                        $("#lorder").text("");
                        $("#olitem").val("");
                    }
                    else {
                        sender.checked = true;
                    }
                    break;
                case "CBL2":
                    if (conn("1", "D", "", "取 消 晚 餐 : " + $("label[for='" + sender.id + "']").text(), "X", logstr)) {
                        $("#btnd").addClass("d-none");
                        $("#dx").addClass("d-none");
                        $("#dorder").text("");
                        $("#oditem").val("");
                    }
                    else {
                        sender.checked = true;
                    }
                    break;
            }
        }
    }
    else {
        for (var i = 0; i < chkList.length; i++) {
            chkList[i].checked = false;
        }
        toastr.info("請先登錄今天體溫,才可訂餐");
    }
}

//訂夜餐
$("#norder ,#norder2, #norder3, #norder4").click(function () {
    if ($("#hf_day").val() != "") {
        var sel = $(this).prop('id');
        var o = "1";
        if (sel == "norder2") o = "2";
        if (sel == "norder3") o = "3";
        if (sel == "norder4") o = "4";
        console.log(o);
        var logstr = $("#t2id").text() + " - " + $("#name").text();
        if ($(this).prop("checked")) {
            $("#norder ,#norder2,#norder3,#norder4").prop("checked", false);
            $(this).prop("checked", true);
            if (conn("3", "N", o, "已 訂 夜 班 餐", "V", logstr)) {
                $("#n1, #n2, #n3, #n4").removeClass("d-none");
            }
            else {
                $(this).prop("checked", false);
            }
        } else {
            if (conn("3", "N", "", "取 消 夜 班 餐", "X", logstr)) {
                $("#n1, #n2, #n3, #n4").addClass("d-none");
                $("#n4").text("夜班取餐按鈕");
            }
            else {
                $(this).prop("checked", true);
            }
        }
    }
    else {
        $(this).prop("checked", false);
        toastr.info("請先登錄今天體溫,才可訂餐");
    }
});

function conn(act, order, id, item, type, iok) {
    var chk = false;
    //$.ajax({
        //url: "/nq/hrorder/ConnDB.ashx",
        //type: 'GET',
        //async: false,
        //dataType: 'json',
        //cache: false,
        //data: { act: act, order: order, id: id, index: $("#hf_day").val(), iok: iok },
        //success: function (data) {
            //if (data.indexOf("error") >= 0) {
                //toastr.error(data);
            //}
            //else {
                //if (type == "V") {
                    toastr.success(item);
                //}
                //else {
                    //toastr.error(item);
                //}
                chk = true;
            //}
        //},
        //error: function (data) {
            //toastr.warning("網路或伺服器問題造成訂餐失敗,請重新操作!!");
        //}
    //});
    return chk;
}

$('#btnokl').click(function () {
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    $('#orderModal').modal('hide');
    if (conn("2", "L", logstr, "已 取 餐", "V", "V")) {
        $("#btnl").addClass("d-none");
        $("#lx").removeClass("d-none");
        $("#lx").html("<i class='far fa-check-circle'></i> 已 取 餐");
    }
});

$('#btnokd').click(function () {
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    $('#orderModal2').modal('hide');
    if (conn("2", "D", logstr, "已 取 餐", "V", "V")) {
        $("#btnd").addClass("d-none");
        $("#dx").removeClass("d-none");
        $("#dx").html("<i class='far fa-check-circle'></i> 已 取 餐");
    }
});

$('#n4').click(function () {
    console.log($('#n4').text());
    if ($('#n4').text() != "已取餐") {
        if (confirm('確定要取餐?')) {
            conn("4", "N", "", "已 取 餐", "V", "V")
            $("#n4").text("已取餐");
        }
    }
});

//------------------------
function startRequest() {
    ////星期六,日不提供團膳麵食
    //var chkday = new Date().getDay();
    //if (chkday == "0" || chkday == "6") {
    //    //$("label[for='CBL1_2']").css("visibility", "hidden");
    //    $("label[for='CBL1_2']").hide();
    //}
    ////else {
    ////    $("label[for='CBL1_2']").css("visibility", "");
    ////}

    ////除夕,初一,初二(1/31-2/2)不供餐
    //if (date.isDuringDate('2022/01/31', '2022/05/02')) {
    //    $("#CBL1 , #CBL2 , .norder").css("display", "none");
    //    $(".menu0 , .orderxx").text("除夕,初一,初二(1/31-2/2)不供餐");
    //    $(".orderxx").removeClass("d-none");
    //}
    ////else {
    ////    $("#CBL1 , #CBL2").css("display", "");  
    ////    $(".menu0").text("團膳菜單"); 
    ////}

    ////過年期間只開放便當
    //if (date.isDuringDate('2022/01/29', '2022/02/06')) {
    //    $("label[for='CBL1_2'] , label[for='CBL1_3'] , label[for='CBL1_4'] , label[for='CBL2_2'] , label[for='CBL2_3'] ").css("visibility", "hidden");
    //}

    var dt = new Date();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    var tday = dt.getFullYear() + "/" + mm + "/" + dd;
    //if ($("#t3").text() != tday) window.location.href = window.location.href;
    var hr = dt.getHours();
    var m = dt.getMinutes();
    $("#t3,#ldate,#ddate").text(tday);
    if ($("#empwork").val() != "9") {
        if (hr > 5 && hr < 11) {
            $("#t6").val("");
            $("#t6").prop("disabled", true);
        } else {
            $("#t6").prop("disabled", false);
        }
    }

    //if (hr > 5 && hr < 10) {
        //$("#CBL1 input[type=checkbox], #CBL2 input[type=checkbox]").prop("disabled", false);
    //} else {
        //$("#CBL1 input[type=checkbox]").prop("disabled", true);
    //}
    //if ((hr > 14) || (hr == 14 && m > 30)) {
        //$("#CBL2 input[type=checkbox]").prop("disabled", true);
    //}

    //if (hr > 16 && hr < 21) {
        //$("#norder , #norder2, #norder3, #norder4").prop("disabled", false);
    //} else {
        //$("#norder , #norder2, #norder3, #norder4").prop("disabled", true);
    //}
}

//$('.timechk').click(function () {
    //if ($("#CBL1 input[type=checkbox]").prop("disabled")) {
        //toastr.info("１０點過後無法訂餐或變更項目");
    //}
//});
//$('.timechk2').click(function () {
    //if ($("#CBL2 input[type=checkbox]").prop("disabled")) {
        //toastr.info("１４：３０過後無法訂餐或變更項目");
    //}
//});
//$('.timechk3').click(function () {
    //if ($("#norder").prop("disabled")) {
        //toastr.info("夜班訂餐時間為晚上５點到９點");
    //}
//});

function chk() {
    if (!$('#rblcpd input:checked').val()) { alert("今日有無身體不適症狀?"); return false; }
    if ($('#rblcpd input:checked').val() == "1" && $("#t4").val() == "") { alert("請填寫不適的症狀?"); return false; }
    if (!$("input[name='gr']:checked").val()) { alert('今日出勤狀況?'); return false; }
}

window.onload = function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    });
}

var date = {
    isDuringDate: function (beginDateStr, endDateStr) {
        var curDate = new Date(),
            beginDate = new Date(beginDateStr),
            endDate = new Date(endDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    }
}


// Set iframe attributes when the show instance method is called
$("#videoModal").on("show.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let url = button.data("video");      // Extract url from data-video attribute
    $("#title").text(button.text());
    switch (button.text()) {
        case "推薦獎金影片1":
            $("#title").text(button.text() + " - 回任");
            break;
        case "推薦獎金影片2":
            $("#title").text(button.text() + " - 自我推薦");
            break;
        case "推薦獎金影片3":
            $("#title").text(button.text() + " - 推薦人&被推薦人");
            break;
        case "推薦獎金影片4":
            $("#title").text(button.text() + " - 禮物卡");
            break;
    }
    $("#title2").text(button.data("text"));
    $(this).find("iframe").attr({
        src: url,
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    });
});

// Remove iframe attributes when the modal has finished being hidden from the user
$("#videoModal").on("hidden.bs.modal", function () {
    $("#videoModal iframe").removeAttr("src allow");
});

//計數器
function count(item) {
    console.log(item);
    $.ajax({
        url: "/nq/hrorder/ClickCount.ashx",
        type: 'GET',
        data: { item: item }
    });
}