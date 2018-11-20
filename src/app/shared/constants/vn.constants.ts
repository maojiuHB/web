export const VN = '视网科技';
export const VN_TITLE = ' - ' + VN;
// http 返回提示
export const HTTP_ALERT = {
    success: '执行成功',
    error: '执行失败',
    creation: '创建成功',
    update: '修改成功',
    deletion: '删除成功',
    login: '用户名',
    email: '邮箱',
    already: '已存在',
    Size: '长度错误',
    Email: '邮箱不合法',
    Password: '密码长度必须6-18之间',
    Login: '用户名长度必须5-50之间',
    ident_error: '图片识别失败',
    upload_error: '上传出现错误',
    upload_success: '上传成功',
    upload_null: '文件格式错误',
    upload_empty: '上传文件为空',
    error_hp: '头像压缩文件导入出现错误',
    seat_person: '坐席出现错误',
    no_person: '人员未找到',
    number_person: '编号已存在',
};
export const CONFIG = {
    IP: '',
    SNAPSHOTS_URL: '',
    PIC_URL: '',
    UPLOAD_URL: '',
    LIVE_URL: '',
    RECORD_URL: '',
    WS_URL: ''
};
export const DOWNLOAD_RES = '/upload/';
export const FULLSCREEN_URI = (url): boolean => {
    return url === '/realtime' || url.startsWith('/attendance') || url === '/front' || url === '/front-podium';
};
