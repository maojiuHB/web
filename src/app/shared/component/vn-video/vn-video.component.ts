import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CONFIG } from '../../constants/vn.constants';
declare var videojs: any;
@Component({
    selector: 'vn-video',
    templateUrl: './vn-video.component.html',
    styleUrls: ['./vn-video.component.scss']
})
export class VnVideoComponent implements OnInit, OnDestroy {
    _src: string;
    @Input()
    set src(src: string) {
        this._src = src;
        if (this.player) {
            this.player.pause();
            this.player.src(this.live ? CONFIG.LIVE_URL + src : CONFIG.RECORD_URL + src);
            this.player.play();
        }
    }
    get src() {
        return this._src;
    }
    @Input()
    live: boolean;
    @Input()
    fluid: boolean;
    @Input()
    controls: boolean;
    @Input()
    time: number;
    @Input()
    speed: number;
    id: number;
    private player: any;

    constructor(
    ) {
    }

    ngOnInit() {
        this.id = new Date().getTime();
        // 延时初始化
        setTimeout(() => this.initVideo(), 500);
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
    }
    /**
     * 初始化 播放器
     *
     * @author limy
     * @date 2018/8/22
     */
    private initVideo() {
        this.player = videojs('videojs_' + this.id, {
            controls: this.controls,
            fluid: this.fluid,
            language: 'zh-CN',
            autoplay: false,
            preload: 'auto',
            flash: {
                swf: '/assets/data/video-js.swf'
            },
            playbackRates: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 10]
        });
        this.player.src(this.live ? CONFIG.LIVE_URL + this.src : CONFIG.RECORD_URL + this.src);
        const that = this;
        this.player.ready(function () {
            videojs.log('Your player is ready!');
            // set time
            if (that.time) {
                that.player.currentTime(that.time);
            }
            if (that.speed) {
                that.player.playbackRate(that.speed);
            }
            // In this context, `this` is the player that was created by Video.js.
            this.play();

            // How about an event listener?
            this.on('ended', function () {
                videojs.log('Awww...over so soon?!');
            });
        });
    }
}
