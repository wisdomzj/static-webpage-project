$(function(){

    /**
     * 验证属性映射配置
     * @author	zhangjun
     * @since	2021-4-05
     */
    var verifMap = [
        {
            attr: 'name', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请输入姓名'
                },
                {
                    strategy: 'minLength:2',
                    errorMsg: '姓名长度最小是2位'
                },
                {
                    strategy: 'maxLength:4',
                    errorMsg: '姓名长度最大是4位'
                },
                {
                    strategy: 'isChinese',
                    errorMsg: '姓名必须中文'
                }
            ]
        },
        {
            attr: 'phone', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请输入手机号'
                },
                {
                    strategy: 'isMoblie',
                    errorMsg: '请输入正确手机号'
                },
            ]
        },
        {
            attr: 'email', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请输入联系邮箱'
                },
                {
                    strategy: 'isEmail',
                    errorMsg: '请输入正确的联系邮箱'
                }
            ]
        },
        {
            attr: 'photoUrl', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请上传照片'
                }
            ]
        },
        {
            attr: 'describe', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请输入个人简介'
                }
            ]
        },
        {
            attr: 'tankType', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请至少选择一个智库类型'
                }
            ]
        },
        {
            attr: 'serverType', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请至少选择一个智提供服务'
                }
            ]
        },
        {
            attr: 'workType', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请至少选择一个行业'
                }
            ]
        }, 
        {
            attr: 'province', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请选择所在省'
                }
            ]
        },
        {
            attr: 'city', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请选择所在市'
                }
            ]
        },
        {
            attr: 'county', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请选择所在区'
                }
            ]
        },
        {
            attr: 'materialUrls', 
            isReq: true,
            rules: [
                {
                    strategy: 'isNoEmpty',
                    errorMsg: '请上传相关材料'
                }
            ]
        },
    ]

    /**
     * 全局变量
     */
    var localData = {
        verifMap: verifMap //验证属性映射配置
    };

    /**
     * 异步交互
     */
    var remoteOperates = {
        /**
         * 
         * @param {*} files 文件流
         * @param {*} successCallBack 成功回调
         * @param {*} errorCallBack 失败回调
         */
        uploadFile: function(files, successCallBack, errorCallBack){
            var index = layer.load();
            $.ajax({
                url: '',
                type: 'POST',
                data: files,
                contentType: false,
                processData: false,
                success: function (res) {
                    successCallBack(res)
                    layer.close(index);
                },
                error: function () {
                    errorCallBack()
                    layer.close(index);
                }
            })
        },   
        
        /**
         * 
         * @param {*} sendDatas 发送数据
         * @param {*} successCallBack 成功回调
         * @param {*} errorCallBack 失败回调
         */
        submitForm: function(sendDatas, successCallBack, errorCallBack) {
            var index = layer.load();
            $.ajax({
                url: '',
                type: 'POST',
                data: sendDatas,
                success: function (res) {
                    layer.close(index);
                    successCallBack(res);
                },
                error: function () {
                    layer.close(index);
                    errorCallBack()
                }
            })
        }
    };

    /**
     * 私有方法
     */
    var privateMethods = {
        /**
         * 文件异步上传
         * @param {*} obj 文件域对象
         * @param {*} files 文件流
         * @param {*} type 1: 图片文件， 2：视频文件
         * @param {*} way  1: 上传头像， 2: 上传相关材料
         */
        uploadFile: function (obj, files, type, way) {
            var maxlength = (way == 1) ? 1 : 3;
            var maxNun = (way == 1) ? 2 : 20;
            var maxSize = maxNun * 1024 * 1024;
            
            if (_.isEmpty(files)) {
                $(obj).val('');
                return;
            }
            
            if ((files.length > maxlength)) {
                notify.msg('所选择文件不能大于' + maxlength + '个');
                $(obj).val('');
                return;
            }

            var form = new FormData();
            var videoFormat = [
                "video/mp4",
                "video/AVI",
                "video/avi",
                "video/mov",
                "video/MOV",
                "video/rmvb",
                "video/FLV",
                "mp4",
                "video/quicktime",
                "video/x-ms-wmv"
            ];
            for (var m = 0; m < files.length; m++) {
                if (type == 1 && (!/image\/\w+/.test(files[m].type) &&
                        files[m].type.indexOf('application/pdf') == -1 &&
                        files[m].type.indexOf('application/msword') == -1 &&
                        files[m].type.indexOf('application/vnd.ms-excel') == -1 &&
                        files[m].type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') == -1 &&
                        files[m].type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') == -1
                    )) {
                    layer.msg("文件格式不正确！");
                    $(obj).val('');
                    return false;
                } else if (videoFormat.indexOf(files[m].type) == -1 && type == 2) {
                    layer.msg("文件格式有误！");
                    $(obj).val('');
                    return false;
                } else if (files[m].size > maxSize) {
                    layer.msg("文件不能超过" + maxNun + "M！");
                    $(obj).val('');
                    return false;
                } else {
                    form.append("file", files[m]);
                }
            }
            
            if(way == 1) {
                remoteOperates.uploadFile(form, function(res){
                    if(res && type == 1) {
                        // 照片回显  这里提供思路
                        $('.js-upload-photo-box').find('.js-icon-add').addClass('hide');
                        var photoImg = $('.js-upload-photo-box').find('.js-photo');
                        photoImg.removeClass('hide');
                        photoImg.src = '照片回显路径';
                        $('.js-upload-photo-box').attr('data-photoUrl', '照片回显路径');
                    }
                }, function(){
                    layer.msg("上传头像失败！");
                });
            } else if (way == 2) {
                remoteOperates.uploadFile(form, function(res){
                    if(res) {
                        // 文件回显 这里提供思路，建议用模板，拼接实在....
                        if(type == 1){
                            var htmlStr = ''
                            res.data && res.data.forEach(function (o, i) {
                                if (o && o.url) {
                                    var subname = "." + o.url.split(".")[1];
                                    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(subname)) {
                                        htmlStr = `<div class="upload-box js-material-content" data-materialUrl="">
                                            <img src="../static/img/sample-result-list.jpg">
                                            <a href="javascript:void(0);" class="icon-close"></a>
                                        </div>`
                                    
                                    } else if (subname == ".doc" || subname == ".docx") {
                                        htmlStr = `<div class="upload-box js-material-content" data-materialUrl="">
                                            <div class="file-icon file-doc" title="完整文件名+扩展名">
                                                <span>标题.doc</span>
                                            </div>
                                            <a href="javascript:void(0);" class="icon-close">
                                            </a>
                                        </div>`
                                    
                                    } else if (subname == ".pdf") {
                                        htmlStr = `<div class="upload-box js-material-content" data-materialUrl="">
                                            <div class="file-icon file-pdf" title="完整文件名+扩展名">
                                                <span>标题.pdf</span>
                                            </div>
                                            <a href="javascript:void(0);" class="icon-close">
                                            </a>
                                        </div>`
                                    
                                    } else if (subname == ".xls" || subname == ".xlsx") {
                                        htmlStr = `<div class="upload-box js-material-content" data-materialUrl="">
                                            <div class="file-icon file-xls" title="完整文件名+扩展名">
                                                <span>标题.xls</span>
                                            </div>
                                            <a href="javascript:void(0);" class="icon-close">
                                            </a>
                                        </div>`
                                    }
                                }
                            });

                            $('.js-upload-material-box').prepend(htmlStr);
                        }

                        // 视频回显
                        if(type == 2){
                            var htmlStr = `<div class="upload-box">
                                <video width="160" height="160" controls>
                                    <source src="https://v.mifile.cn/b2c-mimall-media/69f7b9881f4ed7123f0d473dcd44d621.mp4" type="video/mp4"></source>
                                </video>
                                <a href="javascript:void(0);" class="icon-close">
                                </a>
                            </div>`;

                            $('.js-upload-material-box').prepend(htmlStr);
                        }   
                    }
                }, function(){
                    layer.msg("上传材料失败！")
                });
            }
        },

        /**
         * 表单提交
         */
        submitForm: function () {
            var sendData = {
                photoUrl: '',
                materialUrls: '',
            };

            // 收集文本值
            $('input,textarea').each(function (i, o) {
                var name = $(o).attr('name');
                var type = $(o).attr('type');
                if (!name) {
                    return true;
                }

                if (name == 'describe' || type == 'text' || (type == 'radio' && $(o).is(':checked'))) {
                    sendData[name] = $(o).val();
                }

                if(type == 'checkbox' && $(o).is(':checked')){
                    sendData[name] ? sendData[name]+= ',' + $(o).val() : sendData[name] = $(o).val();
                }
            });

            // 收集下拉框值
            $('.js-select').each(function(i,o){
                if($(o).attr('name')){
                    sendData[$(o).attr('name')] = $(o).find('option:selected').val();
                }
            });

            // 收集照片值
            $('.js-upload-photo-box').each(function (i, o) {
                var photoUrl = $(o).attr('data-photoUrl');
                if (photoUrl) {
                    sendData.photoUrl = photoUrl; 
                }
            });

            // 收集上传材料值
            $('.js-material-content').each(function (i, o) {
                var materialUrl = $(o).attr('data-materialUrl');
                if (materialUrl) {
                    sendData.materialUrls ? sendData.materialUrls += ',' + materialUrl : sendData.materialUrls += materialUrl;
                }
            });
            
            // 校验不通过，不予提交
            let validator = new Validator(localData.verifMap),  
                msg = validator.show(sendData)
        
            if(msg) {
                layer.msg(msg)
                return
            }

            // 校验通过，给予提交
            remoteOperates.submitForm(sendData, function(res){
                if(res) {
                    // do some thing
                }
            },function() {
                layer.msg('表单提交失败！')
            });
        }
    };

    /**
     * 初始化事件
     */
    var _initEvent = function () {
        // 省市区三级联动
        $("#areaChoose").distpicker({
            province: "---- 所在省 ----",
            city: "---- 所在市 ----",
            district: "---- 所在区 ----"
        });

        // 文件上传
        $('.js-upload-file').on('change', function () {
            var type = $(this).attr('data-type');
            var way = $(this).attr('data-way');
            privateMethods.uploadFile(this, this.files, type, way);
        });

        // 表单提交
        $('.js-submit-form').on('click', function (event) {
            privateMethods.submitForm();
        })

        // 重置表单
        $('.js-clear-form').on('click', function () {
            layer.confirm('确定要清空表单内容', {
                title: '提示'
            }, function(index){
                $('input[type="text"],textarea').val('');
                $('input[type="checkbox"]').attr('checked', false);
                localData.involvedType = [];
                layer.close(index)
            });
        });
    };

    _initEvent();
})