var sel, fr,video;
$(function () {
    $('#show_btn').click(startCamera);
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video");

    $('#snap').click(function () {

       // $('.scan-area').show();
        //$('#cream_loading').toggle();
        context.drawImage(video, 0, 0, 640, 480);
        var pic = convertCanvasToImage();
        $('#result_img').attr('src', pic.src);
        $('#result_img').show();
        video.src = null;
        $('#mask').hide();
        $('#show_video').hide();
        $('.camera-mask').hide();
        getRes();

    });
    /*
    $.post("/Article/SavePhoto", { data: b63, name: filename }, function (result) {
        if (result.success) {
            $('#cream_loading').toggle();
            window.location.href = "/yourreenex?photo=" + result.photo;
        }
    });
    */

});

function getRes(){
    turnToside();

}
function turnToside(){
$('#face_scan_camera').css('float', 'left');

    $('#face_scan_camera').css('width', '25%');
    $('#res_list').show();
    showChart();
}

function showChart(){
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
                indicator : [
                    {text : '尺寸', max  : 100},
                    {text : '材质', max  : 100},
                    {text : '重量', max  : 100},
                    {text : '外观', max  : 100},
                ],
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
                        value : [97, 42, 88, 94],
                        name : '王牌1号眼镜'
                    },

                ]
            }
        ]
    };

    var myChart = echarts.init(document.getElementById('chart'));
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

