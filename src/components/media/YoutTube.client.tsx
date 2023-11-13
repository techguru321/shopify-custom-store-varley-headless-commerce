import Video from "./VideoBase.client";

class YTVideo extends Video {
    createPlayer() {
        if (this.player) return;
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.container.innerHTML = "<div></div";
        this.player = new YT.Player(this.container.firstElementChild, {
            videoId: this.id,
            playerVars: {
                autoplay: 0,
                controls: 0,
                loop: this.canLoop ? 1 : 0,
                modestbranding: 1,
                playlist: this.id,
                playsinline: 1,
                rel: 0,
                showinfo: 0
            },
            events: {
                onReady: () => this._onReady(),
                onStateChange: ({ data }) => {
                    /**
                     * -1 - Unstarted
                     *  0 - Ended
                     *  1 - Playing
                     *  2 = Paused
                     *  3 - Buffering
                     *  5 - Cued
                     */
                    if (data === 0) {
                        this.onEnded();
                    } else if (data === 2) {
                        this.pause();
                    }
                }
            }
        });

        this.player.element = this.player.getIframe();
    }

    _onReady() {
        this.player.play = this.player.playVideo;
        this.player.pause = this.player.pauseVideo;
        this.player.reset = this.player.stopVideo;
        // prettier-ignore
        this.canAutoplay
            ? this.player.mute()
            : this.player.setVolume(50);

        if (this.size === "cover") {
            const {
                width: videoWidth,
                height: videoHeight
            } = this.player.element;
            this.watchResize(videoWidth, videoHeight);
        }

        this.isReady = true;
        if ("requestIdleCallback" in window) {
            requestIdleCallback(this.flushQueue.bind(this));
        } else {
            this.flushQueue();
        }
    }
}

export default YTVideo;