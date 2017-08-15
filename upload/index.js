

    var nullImgUrl = $(".nullImg").val();//获取默认图片路径

    //上传图片
    var imgArr = [];
    $(".img-box").on("change",".file_upload",function(){
        var $file = $(this);
        var img_number = $file.attr("img-n");
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $file.next();
        //console.log(fileObj);
        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);

            var reader = new FileReader();
            reader.readAsDataURL(fileObj.files[0]);
            reader.onload = function(e) {
                //console.log(e.target.result);//隔几秒钟会显示
                imgArr[img_number] = e.target.result;
                var imgurl = e.target.result;
                // $.ajax({
                //     type: "post",
                //     url: "/agentNew/daily/ajaxUploadImg",
                //     data: {
                //         url : imgurl
                //     },
                //     dataType: "json",
                //     success: function(data) {
                //         if(data.code == 1){
                //             imgArr[img_number] = $.trim(data.path);
                             $file.parent().append("<span></span>");//添加删除按钮
                //         }else{
                //             alert(data.error_msg);
                //         }
                //     }
                // });
                $file.parent().next().removeClass("disnone");
            };


        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
            console.log("aa");
        }
    });
    
    //删除图片
    var nullImgUrl = $(".nullImg").val();//获取默认图片路径
    var ulListBox = $(".img-box");
    ulListBox.on("click","li>span",function(){
        var that = $(this);
        var deleNum = that.siblings("input").attr("img-n");
        var isthree = $.trim(ulListBox.find("li").eq(2).find("img").attr("src"));
        imgArr[deleNum] = "";
        //填充空白图片
        that.parent().parent().append('<li class="disnone"><input type="file" class="file_upload" accept="image/png,image/jpg" img-n="2"><img src="'+nullImgUrl+'" ></li>');
        that.parent().remove();
        //为新添加的li添加对应的 img-n
        for(var h=0; h<ulListBox.find("li").length; h++){
            ulListBox.find("li").eq(h).find("input").attr("img-n",h);
        }
        //如果少于三个要显示站位图
        if(deleNum == 2){
            ulListBox.find("li").eq(2).removeClass("disnone");
        }
        //判断最后一张是不是默认图片
        if(isthree != nullImgUrl){
            ulListBox.find("li").eq(2).removeClass("disnone");
        }

    });

    //提交
    $(".js-sub").on("click",function(){
        var that = $(this);
        //getAjax(that);
        console.log(imgArr);
    });



