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
        NavigationBarTitle: '发布委托',
        // 渲染输入框
        InputList: [
        //     {
        //     'id': 'detailLocation',
        //     'title': '房源地址:',
        //     'placeholder': '请填写房源详细地址',
        //     'type': 'text',
        //     'maxlength': 50
        // },
        {
            'id': 'location',
            'title': '所属城市:',
            'placeholder': '如:杭州',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'furniture',
            'title': '招聘要求:',
            'placeholder': '如:药师必须在杭州附近',
            'type': 'text',
            'maxlength': 50
        },
        // {
        //     'id': 'area',
        //     'title': '房子面积(单位:㎡):',
        //     'placeholder': '请填写房子的产权面积',
        //     'type': 'digit',
        //     'maxlength': 20
        // },
        // {
        //     'id': 'totalPrice',
        //     'title': '房租价格(单位:元/月):',
        //     'placeholder': '请填写房租价格',
        //     'type': 'digit',
        //     'maxlength': 20
        // },
        {
            'id': 'name',
            'title': '招聘人姓名:',
            'placeholder': '请问如何称呼您',
            'type': 'text',
            'maxlength': 8
        },
        {
            'id': 'phonenumber',
            'title': '招聘联系电话:',
            'placeholder': '请输入您的联系电话',
            'type': 'number',
            'maxlength': 11
        }
        ],

        // 渲染选择器
        PickerList: [{
            'id': 'HouseType',
            'title': '招聘证书类型',
            'pickerlist': ['执业中药师', '执业西药师', '初级中药师', '初级西药师','护士证书','医师证书','其他']
        }, {
            'id': 'Invoice',
            'title': '是否要求社保交店里',
            'pickerlist': ["是", "否"]
        }, {
            'id': 'Signing',
            'title': '是否需要到场配合检查',
            'pickerlist': ["是", "否"]
        }],

        // 房型选择列表
        // HouseStyleList: [
        //     ['0室', '1室', '2室', '3室', '4室', '5室'],
        //     ['0厅', '1厅', '2厅', '3厅'],
        //     ['0卫', '1卫', '2卫', '3卫']
        // ],
        // 房型选择结果
        // HouseStyleSelected: [0, 0, 0],
        // 委托类型
        EntrustType: '',
        // 表单数据
        FormData: {
            // 详细地址
            'detailLocation': '',
            // 所在小区
            'location': '',
            //装修配置
            'furniture': '',
            // 房子面积
            'area': '',
            // 总价
            'totalPrice': '',
            // 均价
            'averagePrice': '',
            // 委托人姓名
            'name': '',
            // 委托人电话
            'phonenumber': '',
            // 房子标签
            'Tags': [],
            // 房子类型，新房，旧房
            'HouseType': '',
            // 房间类型，如：一室一厅
            'roomStyle': '',
            // 居室类型，如：一居室
            'houseStyle': '',
            // 看房方式
            'LookUpStyle': '',
            // 契税发票时间是否满两年
            'Invoice': '',
            // 网签是否满三年
            'Signing': ''
        },
        // 照片列表
        imgList: [],
        modalName: null,
        // 标签选择
        checkbox: [{
            value: 0,
            name: '工资高',
            checked: false
        }, {
            value: 1,
            name: '不到场',
            checked: false
        }, {
            value: 2,
            name: '不交社保',
            checked: false
        }],
        // 标签的显示
        displayTags: '',
        // 临时变量
        templeCheckbox: [],
        templeTags: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log('eeeee', e, e.title)
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

    // 房型选择
    // HouseStyleChange(e) {
    //     let HouseStyleList = this.data.HouseStyleList
    //     let FormData = this.data.FormData
    //     console.log(e, e.detail.value)
    //     let value = e.detail.value
    //     let room = value[0]
    //     let hall = value[1]
    //     let toilet = value[2]

    //     console.log(room, typeof (room), hall, toilet)

    //     if (room == 0) {
    //         room = ''
    //     } else {
    //         room = HouseStyleList[0][room]
    //     }
    //     if (hall == 0) {
    //         hall = ''
    //     } else {
    //         hall = HouseStyleList[1][hall]
    //     }
    //     if (toilet == 0) {
    //         toilet = ''
    //     } else {
    //         toilet = HouseStyleList[2][toilet]
    //     }

    //     let houseStyle = `${room}${hall}${toilet}`

    //     let roomStyle = ''

    //     switch (e.detail.value[0]) {
    //         case 1:
    //             roomStyle = '一居室';
    //             break;
    //         case 2:
    //             roomStyle = '二居室';
    //             break;
    //         case 3:
    //             roomStyle = '三居室';
    //             break;
    //         case 4:
    //             roomStyle = '四居室';
    //             break;
    //         case 5:
    //             roomStyle = '五居室';
    //             break;
    //         default:
    //             roomStyle = '无'
    //     }

    //     FormData.roomStyle = roomStyle
    //     FormData.houseStyle = houseStyle

    //     this.setData({
    //         HouseStyleSelected: value,
    //         FormData
    //     })
    // },

 


    // 显示弹窗
    showModal(e) {
        console.log('0.showModal')
        let templeCheckbox = this.data.checkbox
        this.setData({
            templeCheckbox: templeCheckbox,
            modalName: e.currentTarget.dataset.target
        })
    },

    // 关闭弹窗
    hideModal(e) {
        // console.log('1.hideModal')
        // // let templeCheckbox = this.data.templeCheckbox
        // let Tags = this.data.Tags
        // let checkbox = this.data.checkbox
        // // 数据恢复到选择前的状态
        // this.setData({
        //     templeCheckbox: checkbox,
        //     templeTags: Tags,
        //     modalName: null
        // })
    },

    // 点击确认后保存显示confirm
    Confirm(e) {
        console.log('2.Confirm')
        let templeTags = this.data.templeTags
        let templeCheckbox = this.data.templeCheckbox
        let FormData = this.data.FormData
        FormData.Tags = templeTags
        this.setData({
            FormData: FormData,
            checkbox: templeCheckbox,
            displayTags: templeTags.join(','),
            modalName: null
        })
    },

    // 选择弹窗
    ChooseCheckbox(e) {
        console.log('3.ChooseCheckbox')
        let strArray = []
        let templeTags = this.data.templeTags
        let templeCheckbox = this.data.templeCheckbox

        console.log('templeCheckbox', templeCheckbox[0].checked)

        let values = e.currentTarget.dataset.value
        let name = e.currentTarget.dataset.name

        console.log('values', values, 'name', name, templeTags.includes(name))

        // 只能选4个标签
        if (templeTags.length < 4) {
            // 修改checkbox的显示
            for (let i = 0; i < templeCheckbox.length; i++) {
                if (templeCheckbox[i].value == values) {
                    templeCheckbox[i].checked = !templeCheckbox[i].checked;
                    break;
                }
            }
        } else if (templeTags.length >= 4) {
            // 超过四个标签后，只能取消，不能继续选
            if (templeTags.includes(name)) {
                // 修改checkbox的显示
                for (let i = 0; i < templeCheckbox.length; i++) {
                    if (templeCheckbox[i].value == values) {
                        templeCheckbox[i].checked = !templeCheckbox[i].checked;
                        break;
                    }
                }
            } else {
                wx.showToast({
                    title: '最多只能选4个',
                    icon: 'none'
                })
            }
        }

        // 实时显示
        for (let i = 0; i < templeCheckbox.length; i++) {
            if (templeCheckbox[i].checked) {
                strArray.push(templeCheckbox[i].name)
            }
        }

        console.log(strArray, templeCheckbox)

        // 存在临时的变量，点击确认后再保存显示
        this.setData({
            templeTags: strArray,
            templeCheckbox: templeCheckbox
        })

    },

    // Tab切换
    ChangeTab(e) {
        wx.showToast({
            title: `切换为 ${e.detail.name}`,
            icon: 'none'
        });
    },

    // 提交信息前进行数据校验
    Submit(e) {
        let ImgList = this.data.imgList
        let FormData = this.data.FormData
        let InputList = this.data.InputList
        // 计算平均价格
        // let averagePrice = (FormData['totalPrice'] / FormData['area']).toFixed(2)
        // console.log('averagePrice', averagePrice)
        // FormData['averagePrice'] = averagePrice
        // 表单数据的校验
        // for (let key in FormData) {
        //     if (FormData[key] == '') {
        //         wx.showToast({
        //             title: '请把所有数据填写完整',
        //             icon: 'none',
        //             mask: true,
        //             duration: 2000
        //         })
        //         return;
        //     }
        // }

      

     
        this.setData({
            FormData: FormData
        })

        // 上传图片
        this.SubmitEntrust()
    },


  
    // 提交信息
    SubmitEntrust() {
        wx.showLoading({
            title: '提交委托...',
            mask: true
        })
        let FormData = this.data.FormData
        let EntrustType = this.data.EntrustType
        let that = this
        wx.cloud.callFunction({
            name: 'Entrust',
            data: {
                type: 'add',
                EntrustType: EntrustType,
                FormData: FormData,
                photoInfo: [],
                plate : "租房",
                publishPlate : "RentingHouse",
                updateTime: formatTime(new Date())
            },
            success: res => {
                wx.hideLoading()
                console.log(res)
                wx.showToast({
                    title: '委托提交成功',
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
                console.log(err)
                wx.showToast({
                    title: '委托提交失败',
                    icon: 'success',
                    duration: 2000
                })
                // 把已经上传的图片删除
                wx.cloud.deleteFile({
                    fileList: photoInfo,
                    success: res => {
                        // handle success
                        console.log('delimages', res.fileList)
                    },
                    fail: console.error
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