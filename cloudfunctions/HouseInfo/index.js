// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
    traceUser: true
})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openId = wxContext.OPENID
    let limit = 10
        let key = event.key
        let page = event.page
        let Invoice=event.Invoice
        let HouseType=event.HouseType
        console.log(Invoice)
        console.log(HouseType)
    if (event.type === 'search') {
        let matchObj=null
        let searchtext=event.searchtext?event.searchtext:''
        if(searchtext){
            matchObj={
                'publish': true,
                'publishPlate':key,
                'FormData.location':db.RegExp({
                    regexp: searchtext,
                    options: 'i',
                  })
            }
        }else{
            matchObj={
                'publish': true,
            }  
        }
        let res = await db.collection('Entrust') .orderBy('updateTime', 'desc')
        .where(
            matchObj
        )
            .skip(page)
            .limit(limit).get()
        return res
    }else{
        let matchObj=null
        if(Invoice!=='0'&&HouseType!=='0'){
            matchObj={
            'publish': true,
            'publishPlate':key,
            'FormData.HouseType': HouseType,
            'FormData.Invoice': Invoice}
            
        
        }else if(Invoice!=='0'){
            matchObj={
                'publish': true,
                'publishPlate':key,
                'FormData.Invoice': Invoice}
        }
        else if(HouseType!=='0'){
            matchObj={
                'publish': true,
                'publishPlate':key,
                'FormData.HouseType': HouseType}
        }else{
            matchObj={
                'publish': true,
                'publishPlate':key,
        }
    
    }
    let res = await db.collection('Entrust').orderBy('updateTime', 'desc')
            .where(
                matchObj
            )
                .skip(page)
                .limit(limit).get()
            
            return res
}
}