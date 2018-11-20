import { Pipe, PipeTransform } from '@angular/core';
import { CONFIG } from '../constants/vn.constants';
/**
 * 获取图片资源路径
 * @date 2018/10/26
 * @author limy
 */
@Pipe({ name: 'picUrl', pure: false })
export class PicUrlPipe implements PipeTransform {
    transform(value): any {
        const res = CONFIG.PIC_URL;
        return res + value;
    }
}
