// pages/entrust/entrust.js
const {
    formatTime
} = require("../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 导航栏标题
        NavigationBarTitle: '发布求职信息',
        // 渲染输入框
        InputList: [
            {
                'id': 'name',
                'title': '您的称呼:',
                'placeholder': '请问如何称呼您',
                'type': 'text',
                'maxlength': 8
            },
            {
                'id': 'phonenumber',
                'title': '联系电话:',
                'placeholder': '请输入您的联系电话',
                'type': 'number',
                'maxlength': 11
            },
            {
                'id': 'location',
                'title': '所在城市:',
                'placeholder': '如:杭州,请填写正确城市方便搜索！',
                'type': 'text',
                'maxlength': 50
            },

            {
                'id': 'furniture',
                'title': '其他信息',
                'placeholder': '如:药师必须在杭州附近',
                'type': 'text',
                'maxlength': 50
            },
        ],

        // 渲染选择器
        PickerList: [{
            'id': 'HouseType',
            'title': '证书类型',
            'pickerlist': ['执业中药师', '执业西药师','双证执业药师', '初级中药师', '初级西药师', '护士证书', '医师证书','其他']
        },
        {
            'id': 'Invoice',
            'title': '是否有社保',
            'pickerlist': ["是", "否"]
        }, {
            'id': 'Signing',
            'title': '是否可以到场配合检查',
            'pickerlist': ["是", "否"]
        }],
        EntrustType: '',
        // 表单数据
        FormData: {
            // 所在城市
            'location': '',
            // 人姓名
            'name': '',
            // 人电话
            'phonenumber': '',
            'Tags': [1],
            // 证书类型
            'HouseType': '',
            // 是否有社保
            'Invoice': '',
            // 是否可以到场配合检查
            'Signing': '',
            // 其他信息
            'furniture': '',
        },
        isreal:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
    
        this.setData({
            isreal:wx.getStorageSync("isreal")  
        })
        // 修改导航栏标题
        wx.setNavigationBarTitle({
            title: e.title
        })
        // 修改导航栏样式
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: e.backgroundcolor,
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
        this.setData({
            NavigationBarTitle: e.title,
            EntrustType: e.id
        })
    },
    // 获取输入框数据
    InputData: function (e) {
        console.log(e, e.currentTarget.id, e.detail.value)
        let FormData = this.data.FormData
        let id = e.currentTarget.id
        let value = e.detail.value
        FormData[id] = value
        this.setData({
            FormData
        })
    },
    // 获取单列选择器数据
    PickerData(e) {
        console.log(e, e.currentTarget.id, e.detail.value)
        let FormData = this.data.FormData
        let id = e.currentTarget.id
        let value = e.detail.value
        let list = e.currentTarget.dataset.pickerlist
        FormData[id] = list[value]
        this.setData({
            FormData
        })
    },
    // 上传图片
    // UploadImages() {
    //     wx.showLoading({
    //         title: '保存图片...',
    //         mask: true
    //     })
    //     let that = this
    //     let imgPathList = []
    //     // 保存照片
    //     for (let i = 0; i < that.data.imgList.length; i++) {
    //         const fileName = that.data.imgList[i];
    //         const dotPosition = fileName.lastIndexOf('.');
    //         const extension = fileName.slice(dotPosition);
    //         const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}${extension}`;
    //         wx.cloud.uploadFile({
    //             cloudPath,
    //             filePath: fileName,
    //             success(res) {
    //                 wx.hideLoading()
    //                 console.log('imgs', res, imgPathList.length, that.data.imgList.length)
    //                 imgPathList.push(res.fileID)
    //                 if (imgPathList.length == that.data.imgList.length) {
    //                     // 保存信息
    //                     that.SubmitEntrust(imgPathList)
    //                 }
    //             },
    //             fail: err => {
    //                 wx.hideLoading()
    //                 wx.showToast({
    //                     title: '图片保存失败',
    //                     icon: "none",
    //                     duration: 1500
    //                 })
    //             },
    //             complete: res => { }
    //         })
    //     }
    // },

    // 提交信息
    SubmitEntrust() {
        wx.showLoading({
            title: '提交数据...',
            mask: true
        })
        let FormData = this.data.FormData
        let EntrustType = this.data.EntrustType
        for (let key in FormData) {
            if (FormData[key] == '') {
                wx.showToast({
                    title: '请把所有数据填写完整',
                    icon: 'none',
                    mask: true,
                    duration: 2000
                })
                return;
            }
        }
        wx.cloud.callFunction({
            name: 'Entrust',
            data: {
                type: 'add',
                EntrustType: EntrustType,
                FormData: FormData,
                plate: "求职",
                publishPlate: "SecondHouse",
                updateTime: formatTime(new Date())
            },
            success: res => {
                wx.hideLoading()
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                })
                // 页面跳转到成功页面
                wx.redirectTo({
                    url: '../steps/steps?id=entrust',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                })
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    title: '提交失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: res => {
                console.log(res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})