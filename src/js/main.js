var sel, fr,video;
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

$(function () {
    //判断是否IE内核
    //if(browser.versions.trident){ alert("is IE"); }
//判断是否webKit内核
    //if(browser.versions.webKit){ alert("is webKit"); }
//判断是否移动端
    //if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
    $('#show_btn').click(startCamera);
    $('.camera-area').click(function(){
        $(this).hide();
        $('#mask').hide();
        turnToside();
    });
    $('#result_img').click(function(){
        $('.camera-area').show();
        $('#mask').show();

    });

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video");

    $('#dialog').click(function(){
        $(this).slideUp('slow');
        $('#mask').fadeOut('slow');
    });
    $('#snap').click(function () {

       // $('.scan-area').show();
        //$('#cream_loading').toggle();
        canvas.width = 640;
        canvas.height = 480;
      context.drawImage(video, 0, 0, 640, 480);
       var pic = convertCanvasToImage();
       // var b64 = pic.src.substring(22);
        $('#result_img').attr('src', pic.src);
        $('#result_img').show();
        video.src = null;
        $('#mask').hide();
        $('#show_video').hide();
        $('.camera-mask').hide();


    });
    $('#action').click(function(){
        var image = new Image();
        image.src = document.getElementById("canvas").toDataURL("image/png");
        var b64 = image.src.substring(22);
        var size = $('#nose_size').val();
        var data = {data:{FACE:b64, PD: size}};
        getRes(data);

    });

    $("#upload_hide").uploadPreview({ Img: "result_img", Width: 200, Height: 200 });
        //var btn = $("#Button1");
    $("#upload").click(function(){

            $('.camera-mask').hide();
            $('#result_img').show();
            $("#upload_hide").click();

            //$('#canvas').src($("#result_img").src());

    }
    );
        var btn = $("#uploads").uploadFile({
            url: "",
            fileSuffixs: ["jpg", "png", "gif", "txt"],
            maximumFilesUpload: 1,//最大文件上传数
            onComplete: function (msg) {
                console.log(msg);
               // $("#testdiv").append(msg + "<br/>");
            },
            onAllComplete: function () {
                alert("全部上传完成");
            },
            isGetFileSize: true,//是否获取上传文件大小，设置此项为true时，将在onChosen回调中返回文件fileSize和获取大小时的错误提示文本errorText
            onChosen: function (file, obj, fileSize, errorText) {
                if (!errorText) {
                    //$("#file_size").text(file + "文件大小为：" + fileSize + "KB");
                } else {
                    alert(errorText);
                    return false;
                }
                return true;//返回false将取消当前选择的文件
            },
            perviewElementId: "result_img", //设置预览图片的元素id
            perviewImgStyle: { width: '100px', height: '100px', border: '1px solid #ebebeb' }//设置预览图片的样式
        });

        //var upload = btn.data("uploadFileData");
/*
        $("#upload").click(function () {
            upload.submitUpload();

    });
    */
    /*
    $.post("/Article/SavePhoto", { data: b63, name: filename }, function (result) {
        if (result.success) {
            $('#cream_loading').toggle();
            window.location.href = "/yourreenex?photo=" + result.photo;
        }
    });
    */

});
/*

 [
 {"glass_name": "sample1",
 "glass_id": 1,
 "img": "iVBORw0K=",
 "glass_description": "no description at all!!!!!!",
  "scores":
        {"total": 8.3, "description": "quiet good",
        "details":
            {"leg_tight_level": {
                "score": 9,
                "description": "very suitable"
                 },
             "material": {
                "score": 3,
                "description": "bad"
                },
             "glasses_position": {
                "score": 6,
                "description": "ok"
                },
             " weight": {
                   "score": 9,
                   "description": "very light"
              }}}}]
 */
function showErrDialog(msg) {
    $('#mask').show();
    $('#dialog').show();
    $('#dialog-text').html(msg);
}
function getRes(data){

    console.log(data);
    console.log((new Date()).valueOf());
    var result ='[\
    {"glass_name": "sample1",\
        "glass_id": 1,\
        "img": "iVBORw0K=",\
        "glass_description": "no description at all!!!!!!",\
        "scores":\
        {"total": 8.3, "description": "quiet good",\
            "details":\
            {"pressure_rating": {\
                "score": 9,\
                    "description": "very suitable"\
            },\
                "material": {\
                "score": 3,\
                    "description": "bad"\
            },\
                "position": {\
                "score": 6,\
                    "description": "ok"\
            },\
                    "nose_pad": {\
                "score": 6,\
                    "description": "ok"\
            },\
                    "leg_length": {\
                "score": 6,\
                    "description": "ok"\
            },\
                " weight": {\
                "score": 9,\
                    "description": "very light"\
            }}}}]';
    //showErrDialog('face detection fail!');
    //mock
   // result = mack_get_res();
    $.post("http://st01-yf-pf-dutu-r65-03-006.st01.baidu.com:8092", data, function (result) {

        console.log(result);
        var ress = jQuery.parseJSON(result);
        console.log(ress);
        $('#res_list').html('');
        if (ress['error'] == 'fail'){
            showErrDialog(ress['msg']);
            return;
        }
        turnToside();
        var i = 1;
        var res = ress['msg'];
        for(var item in res){
            console.log(item);
            var res_html = '';
            res_html +='<div class="col-sm-12 glass_id" id="glass_id_';
            res_html += res[item]['glass_id'];
            res_html += '">\
                <div class="xe-widget xe-counter-block xe-counter-block-white  res_item">\
                <div class="item_left">';
            res_html += res[item]['scores']['total'].toFixed(2);
            res_html +='</div>\
                <div class="item_center">\
                <img src="data:image/png;base64,';
            res_html += res[item]['img'];
            res_html +='" class="item_img">\
            <div class="glass_name">';
            res_html += res[item]['glass_name'];
            res_html += '</div><hr/><div class="glass_desc">';
            res_html += res[item]['glass_description'];
            res_html += '</div>\
                </div>\
                <div id="chart_';
            res_html += res[item]['glass_id'];
            res_html += '" class="item_right">\
                </div>\
                </div>\
                </div>';
            $('#res_list').append(res_html);
            $('#glass_id_' + res[item]['glass_id']).fadeIn(1000 * i);
            i += 1;

            $('#glass_id_'+res[item]['glass_id']).data('data',res[item]);
        }

        for(var item in res) {
            showChart( res[item]['glass_name'],res[item]['glass_id'], res[item]['scores']['details']);
        }

        showPoints(ress['points']);

        $('.glass_id').click(function () {
            $(this).prevAll().slideToggle(500);
            $(this).nextAll().slideToggle(500);

            showDetail($(this).data('data'));
            $('#res_detail').toggle(1000);
        });
    });
}

function showPoints(points){
    $('#canvas_mask').html('');
    $(".camera-area").show();
    $('#mask').show();

   // return;
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
    context.fillStyle='rgb(255,0,0)';

    var start = {
        x:24,y:45
    }
    var end = {
        x:80,y:55
    }
    //drawDisapearLine(context,start,end,'bule',30);

   // return;
    var h = $('#canvas').height();
    var w = $('#canvas').width();
    $('.canvas_mask').css('height',h);
    $('.canvas_mask').css('width',w);
    console.log(h);
    console.log(w);
    console.log(points);


    var start = null;
    var end = null;
    for (item in points) {
        var p = points[item];
        var x = p['x']*w/100;
        var y =  p['y']*h/100;
        if(item == 'contour_left1' || item == 'contour_right1'||item =='nose_contour_left1'||item=='nose_contour_right1'||item=='mouth_left_corner'||item=='mouth_right_corner'
        || item =='contour_right5'|| item=='contour_left5' || item =='contour_right3'|| item=='contour_left3' || item =='contour_right7'|| item=='contour_left7' || item =='contour_chin'||item=='nose_tip' || item=='left_eye_pupil' ||item =='right_eye_pupil'){
            //context.fillRect(p['x']*w/100, p['y']*h/100, 5, 5);
            $('#canvas_mask').append('<div></div>');
            $('#canvas_mask').find('div:last-child').css('left',x-5);
            $('#canvas_mask').find('div:last-child').css('top',y-5);
        }
        /*
        var t = {};
        t.x = p.x*w/100;
        t.y = p.y * w/100;
        end = t;
        if (start != null) {
            drawDisapearLine(context,start,end,'bule',30);
            //sleep(5000);
        }
        start = t;
       // console.log(p['x']);
        //context.fillRect(p['x']*w/100, p['y']*y/100, 5, 5);
        */
       //context.fillRect(p['x']*w/100, p['y']*h/100, 2, 2);
    }
    //$('#canvas').css("max-width",'200px');
    //$('#canvas').css("max-height",'200px');
   // $("#canvas").show();

}

function drawDisapearLine(ctx, start,end,color,time){
    var ani = null;
    ani && clearTimeout(ani);
    ctx.save();

    var t = 0,
       // b = 0,
        c = Math.max(end.x-start.x,end.y-start.y),
        //d = 50;
        s = 50;
        w = end.x-start.x,
        h = end.y-start.y;
    LineAnim();
    function LineAnim(){
        if (t>s){
            clearTimeout(ani);
            ani = null;
            ctx.restore();
        }else {
            var x = start.x + w/s,
                y = start.y + h/s;
            ctx.beginPath();
    //        ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.moveTo(start.x,start.y);
            ctx.lineTo(x,y);
            ctx.closePath();
            ctx.stroke();
            start.x = x;
            start.y = y;
            t++;
            ani = setTimeout(arguments.callee, 100);
        }
    }
    /*
    ctx.strokeStyle=color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(end.x,end.y);
    ctx.stroke();
    */
}

function showDetail(data) {
    $('#res_detail').html('');
    var details = data['scores']['details'];
    var i=3;
    for (item in details) {
        var html = '<div id="detail_'+$.trim(item)+'" class="item"><img class="title" src="img/';
        html += $.trim(item);
        html += '.png" ><div class="content"><div class="head">';
        html +=  $.trim(item);;
        html += '</div><div class="body">';
        html += details[item]['description'];
        html += '</div><div class="footer">';
        html += details[item]['score'].toFixed(1);
        html +='</div></div>';
        $('#res_detail').append(html);
        //$('#detail_' + $.trim(item)).show();
        i += 1;
    }
    console.log(data);
}
function turnToside(){
   // $('#face_scan_camera').css('float', 'left');
    $('#face_scan_camera').animate({
        'margin-left':0,
        'left':0,
        'width':'25%',
    },1500)

    $('#face_scan_camera').css('position', 'fixed');

    $('#res_list').show();
    $('#res_detail').hide();
}

function showChart(name, id, scores){
    var data = [];
    var names = [];
    for (item in scores){
        data.push(scores[item]['score']);
        names.push({text:item, max:10});
    }
    var cha = "chart_" + id;
    //console.log(cha);
    //console.log(scores);
    //console.log(id);
    //console.log(data);
    option = {

        tooltip : {
            trigger: 'axis'
        },

        toolbox: {
            show : false,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                //restore : {show: true},
                //saveAsImage : {show: true}
            }
        },
        calculable : true,
        polar : [
            {
                indicator : names,
                radius : 60
            }
        ],
        series : [
            {
                name: '眼镜舒适度数据',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : data,
                        name : name
                    },

                ]
            }
        ]
    };

    var myChart = echarts.init(document.getElementById(cha));
    myChart.setOption(option);
}
function startCamera() {
    $('#mask').show();
    $('#show_video').show();
    var video = document.getElementById("video"),
        videoObj = {"video": true},
        errBack = function (error) {
            if (error.PERMISSION_DENIED) {
            } else if (error.NOT_SUPPORTED_ERROR) {
            } else if (error.MANDATORY_UNSATISFIED_ERROR) {
            } else {
            }
        };

    // Put video listeners into place
    if (navigator.getUserMedia) { // Standard
        if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
            return false;
        }
        navigator.getUserMedia(videoObj, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);

    } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.msGetUserMedia) {
          navigator.msGetUserMedia(videoObj, function (stream) {
            $(document).scrollTop($(window).height());
            video.src = window.URL.createObjectURL(stream);
            video.play();

        }, errBack);

    } else {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Oupeng") == -1 && userAgent.indexOf("360 Aphone") == -1) {
            sel.addEventListener('change', function (e) {
                var f = sel.files[0]; // get selected file (camera capture)
                fr = new FileReader();
                fr.onload = receivedData; // add onload event
                fr.readAsDataURL(f); // get captured image as data URI
            });
            $('#imgtag').show();
            $('.div_video').hide();
            $('#snap').click(function () {
                sel.click();
            });
        } //判断Safari浏潿器
        else {
            //alert('孿?不起，您的浏览器不支持拍照功¨¨<98>，潿·使用其他浏览器', '提示');
        }
    }
}

//换成图像巿?保存图片
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = document.getElementById("canvas").toDataURL("image/png");
    //alert(image.src);
    //删除字彿¦串前的提示信息“data:image/png;base64᾿?
    /*
    var b64 = image.src.substring(22);
    var myDate = new Date();
    var filename = myDate.getTime();
    $('#result_img').attr('src', image.src);
    $('#result_img').show();
    */
    return image;
    /*
     $.post("/Article/SavePhoto", { data: b63, name: filename }, function (result) {
     if (result.success) {
     $('#cream_loading').toggle();
     window.location.href = "/yourreenex?photo=" + result.photo;
     }
     });
     */
    return image;
}

function sst() {
    $('#show_video').show();
    alert("12");
    debugger;
    $('#canvas').hide();
    try {
        sel = document.getElementById('fileselect'); // get reference to file select input element

        window.addEventListener("DOMContentLoaded", function () {
            // Grab elements, create settings, etc.
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video"),
                videoObj = {"video": true},
                errBack = function (error) {
                    if (error.PERMISSION_DENIED) {
                    } else if (error.NOT_SUPPORTED_ERROR) {
                    } else if (error.MANDATORY_UNSATISFIED_ERROR) {
                    } else {
                    }
                };

            // Put video listeners into place
            if (navigator.getUserMedia) { // Standard
                if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
                    return false;
                }
                navigator.getUserMedia(videoObj, function (stream) {
                    video.src = stream;
                    video.play();

                    //  $('#lifescan #main .btn_click').css('margin-top', '-550px');
                    video.addEventListener('loadeddata', function () {
                       // $(document).scrollTop($(window).height());
                    }, false);
                    $('#snap').click(function () {
                        $('.scan-area').show();
                        $('#cream_loading').toggle();
                        context.drawImage(video, 0, 0, 640, 480);
                        convertCanvasToImage();
                    });
                }, errBack);
            } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                   // $('#lifescan #main .btn_click').css('margin-top', '-550px');
                    video.addEventListener('loadeddata', function () {
                     //   $(document).scrollTop($(window).height());
                    }, false);
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        $('#lifescan #main .btn_click').css('margin-top', '-10px');
                    }
                    $('#snap').click(function () {
                        $('#cream_loading').toggle();
                        context.drawImage(video, 0, 0, 640, 480);
                        convertCanvasToImage();
                    });
                }, errBack);

            } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
                alert(message, '提示', function () {
                    {
                        $(document).scrollTop($(window).height());
                    }
                });

                navigator.mozGetUserMedia(videoObj, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                    video.addEventListener('loadeddata', function () {
                      //  $(document).scrollTop($(window).height());
                    }, false);
                    //$('#lifescan #main .btn_click').css('margin-top', '-550px');

                    $('#snap').click(function () {
                        $('#cream_loading').toggle();
                        context.drawImage(video, 0, 0, 640, 480);
                        convertCanvasToImage();
                    });
                }, errBack);
            } else if (navigator.msGetUserMedia) {
                alert(message, '提示', function () {
                    {
                        $(document).scrollTop($(window).height());
                    }
                });
                navigator.msGetUserMedia(videoObj, function (stream) {
                    $(document).scrollTop($(window).height());
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                  //  $('#lifescan #main .btn_click').css('margin-top', '-550px');
                    video.addEventListener('loadeddata', function () {
                   //     $(document).scrollTop($(window).height());
                    }, false);
                    $('#snap').click(function () {
                        $('#cream_loading').toggle();
                        context.drawImage(video, 0, 0, 640, 480);
                        convertCanvasToImage();
                    });
                }, errBack);

            } else {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Oupeng") == -1 && userAgent.indexOf("360 Aphone") == -1) {
                    sel.addEventListener('change', function (e) {
                        var f = sel.files[0]; // get selected file (camera capture)
                        fr = new FileReader();
                        fr.onload = receivedData; // add onload event

                        fr.readAsDataURL(f); // get captured image as data URI
                    });
                    $('#imgtag').show();
                    $('.div_video').hide();
                    $('#snap').click(function () {
                        sel.click();
                    });
                } //判断Safari浏潿器
                else {
                    //alert('孿?不起，您的浏览器不支持拍照功¨¨<98>，潿·使用其他浏览器', '提示');
                }
            }
        }, false);
    }
    catch (err) {
    }
}
// for iOS
// create file reader
function receivedData() {
    // readAsDataURL is finished - add URI to IMG tag src
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var imgtag = document.getElementById('imgtag'); // get reference to img tag
    imgtag.src = fr.result;
    $('#cream_loading').toggle();

    try {
        setTimeout(function () {
            context.drawImage(imgtag, 0, 0, 640, 480);
            convertCanvasToImage();
        }, 500);

    }
    catch (err) {
        alert(err);
    }
}

