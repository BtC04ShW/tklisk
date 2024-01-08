var mySwiper2 = new Swiper('#swiper2', {
    slidesPerView: 3,
    on: {
        tap: function () {
            mySwiper3.slideTo(this.clickedIndex)
        }
    }
})
var mySwiper3 = new Swiper('#swiper3', {
    //loop: true,
    autoHeight: true,
    hashNavigation: true,//網址列會多出錨鏈接#slide1,需要在每個slide增加data-hash屬性
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    on: {
        slideChange: function () {
            mySwiper2.activeIndex = this.activeIndex;
            $('#swiper2 .active-nav').removeClass('active-nav')
            $('#swiper2 .swiper-slide').eq(this.activeIndex).addClass('active-nav');
            //console.log(this.activeIndex, mySwiper2.activeIndex);
        }
    }
})

$(function () {
    //判斷IOS非用PWA模式時
    //if (!window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === false) {
    //    if (document.cookie == "") {
    //        document.cookie = "btcoookie=HasLoaded; max-age=5";
    //        window.location.href = window.location.href;
    //    }
    //    //$("#al").removeClass("d-none");
    //    //$("#al").fadeOut(8000);
    //}
    //$('#CBL1_4').before("<div class='text-center text-success font-weight-bold mr-3'>-- 拉亞 --</div>");
    //$('#CBL2_2').before("<div class='text-center text-success font-weight-bold '>-- 拉亞 --</div>");
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
    //if ($("#hf_day").val() != "") {
    if (senderState) {
        for (var i = 0; i < chkList.length; i++) {
            chkList[i].checked = false;
        }

        sender.checked = senderState;
        //console.log((sender.id).split("_")[1]);
        //switch ((sender.id).split("_", 1)[0]) {
        switch ((sender.id).split("_")[0]) {
            case "CBL1":
                //console.log(sender.value, 0);
                if (conn("1", "L", sender.value, "午 餐 吃 " + $("label[for='" + sender.id + "']").text(), "V", logstr)) {
                    //if (sender.value == 1 || sender.value == 2 || sender.value == 4 || sender.value == 5 || sender.value == 6) {
                    $("#lorder").text("午餐 " + $("label[for='" + sender.id + "']").text());
                    $("#btnl").removeClass("d-none");//取餐按鈕
                    //}
                    //else {
                    //    $("#btnl").addClass("d-none");
                    //}
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
                        case "2"://拉亞
                            chkList[4].checked = true;
                            break;
                        case "3"://拉亞2
                            chkList[5].checked = true;
                            break;
                    }
                }
                break;
            case "CBL2":
                if (conn("1", "D", sender.value, "晚 餐 吃 " + $("label[for='" + sender.id + "']").text(), "V", logstr)) {
                    //if (sender.value == 1 || sender.value == 4) {
                    $("#dorder").text("晚餐 " + $("label[for='" + sender.id + "']").text());
                    $("#btnd").removeClass("d-none");//取餐按鈕
                    //}
                    //else {
                    //    $("#btnd").addClass("d-none");
                    //}
                    //document.cookie = "ricky=true; expires=60";
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
                        case "2"://拉亞
                            chkList[2].checked = true;
                            break;
                        case "3"://拉亞2
                            chkList[3].checked = true;
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
    //}
    //else {
    //    for (var i = 0; i < chkList.length; i++) {
    //        chkList[i].checked = false;
    //    }
    //    toastr.info("請先登錄今天體溫,才可訂餐");
    //}
}

//訂夜餐
$("#norder ,#norder2, #norder3, #norder4").click(function () {
    //if ($("#hf_day").val() != "") {
    var sel = $(this).prop('id');
    var o = "1";
    $("#n5").text($(this).next('label').text());
    if (sel == "norder2") o = "2";
    if (sel == "norder3") o = "3";
    if (sel == "norder4") o = "4";
    //console.log($(this).next('label').text());
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    if ($(this).prop("checked")) {
        $("#norder ,#norder2,#norder3,#norder4").prop("checked", false);
        $(this).prop("checked", true);
        if (conn("3", "N", o, "已 訂 夜 班 餐", "V", logstr)) {
            $("#btnn").removeClass("d-none");//取餐按鈕
            $("#nx").addClass("d-none");
            //$("#n1, #n2, #n3, #n4").removeClass("d-none");
        }
        else {
            $(this).prop("checked", false);
        }
    } else {
        if (conn("3", "N", "", "取 消 夜 班 餐", "X", logstr)) {
            $("#btnn").addClass("d-none");
            $("#nx").addClass("d-none");
            //$("#n1, #n2, #n3, #n4").addClass("d-none");
            //$("#n4").text("夜班取餐按鈕");
        }
        else {
            $(this).prop("checked", true);
        }
    }
    //}
    //else {
    //    $(this).prop("checked", false);
    //    toastr.info("請先登錄今天體溫,才可訂餐");
    //}
});

function conn(act, order, id, item, type, iok) {
    $("#StatesDDL").val(0);
    $("#StatesDDL option[value='']").remove();
    var chk = false;
    //console.log($("#hf_day").val(), $("#t2id").text());
    //$.ajax({
        //url: "/nq/hrorder/ConnDB.ashx",
        //type: 'GET',
        //async: false,
        //dataType: 'json',
        //cache: false,
        //data: { act: act, order: order, id: id, index: $("#hf_day").val(), iok: iok, uid: $("#t2id").text() },
        //success: function (data) {
            //if (data.indexOf("error") >= 0) {
                //toastr.error(data);
            //}
            //else {
                //console.log(data);
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
    }
});

$('#btnokd').click(function () {
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    $('#orderModal').modal('hide');
    if (conn("2", "D", logstr, "已 取 餐", "V", "V")) {
        $("#btnd").addClass("d-none");
        $("#dx").removeClass("d-none");
    }
});

$('#n4').click(function () {
    var logstr = $("#t2id").text() + " - " + $("#name").text();
    $('#orderModal').modal('hide');
    if (conn("4", "N", logstr, "已 取 餐", "V", "V")) {
        $("#btnn").addClass("d-none");
        $("#nx").removeClass("d-none");
    }
});

//------------------------
function startRequest() {
    var dt = new Date();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    var tday = dt.getFullYear() + "/" + mm + "/" + dd;
    var hr = dt.getHours();
    var m = dt.getMinutes();
    //if ($("#now_date").val() != tday && hr > 1)
    //{
        //window.location.href = window.location.href.split('#')[0];
    //}

    $("#t3,#popup_date").text(tday);

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


//完美解決 ios10 及以上 Safari 無法禁止縮放的問題
window.onload = function () {
    // 阻止雙擊放大
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
    // 阻止雙指放大
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
    let v_num = button.data("vnum");      // Extract url from data-video attribute
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
    ClickCount(v_num);
});

// Remove iframe attributes when the modal has finished being hidden from the user
$("#videoModal").on("hidden.bs.modal", function () {
    $("#videoModal iframe").removeAttr("src allow");
});

$('#QA_Modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var qa_item = button.data('qa') // Extract info from data-* attributes
    var qa_num = button.data('qanum') // Extract info from data-* attributes
    var modal = $(this);
    modal.find("div[id^=qa_]").addClass("d-none");
    modal.find('#mm_title').text(qa_item);
    modal.find('#qa_' + qa_num).removeClass("d-none");
    ClickCount(qa_num);
});

$('#orderModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var order_item = button.data('order') // Extract info from data-* attributes
    var modal = $(this);
    modal.find("#popup_l , #popup_d , #popup_n").addClass("d-none");
    modal.find("#" + order_item).removeClass("d-none");
});

function ClickCount(num) {
    $.ajax({
        url: "/nq/hrorder/ClickCount.ashx",
        type: 'GET',
        data: { item: num }
    });
}