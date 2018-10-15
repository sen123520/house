export default {
  name : 'Ant Design Admin',
  prefix : 'antdAdmin',
  footerText : 'Ant Design Admin 版权所有 © 2016 由 zuiidea 支持',
  logoSrc : 'https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png',
  logoText : 'Antd Admin',
  needLogin : true,
  iconFontUrl : '//at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  baseURL : 'http://47.92.30.98:7001/api',
  crossDomains : ['http://www.zuimeitianqi.com'],
  baseApiUrl:'/api',
  api:{
    users:'/users',
    user:'/users/:id',
  },
  uploadFile: '/file/merchant/rms/files?fileTypeId=1', // 上传图片
  eatateNameSearch: '/merchant/estates', //  楼盘名模糊查询 & 新增楼盘 &更新楼盘详情基础信息
}
