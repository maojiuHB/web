/**
 * 日志打印工具
 * @author limy
 */
const debug = function (msg) {
    console.info(`%c ${msg} `, 'color:orange');
};

const info = function (msg) {
    console.info(msg);
};

const log = function (msg) {
    console.log(`%c ${msg} `, 'color:green');
};

const error = function (msg, trace?: boolean) {
    console.error(`%c ${msg}`, 'color:red');
    if (trace) {
        console.log(trace);
    }
};


export const logger = {
    debug,
    info,
    log,
    error
};
