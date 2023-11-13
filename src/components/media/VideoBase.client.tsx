import {observe} from '../../utils/observer';

/**
 * This is video base class.
 */
class Video {
  constructor(element) {
    this.canAutoplay = element.hasAttribute('data-autoplay');
    this.canLoop = element.hasAttribute('data-loop-video');
    this.canResetVideo = element.hasAttribute('data-reset-video');
    this.container = element.querySelector('.js-video-container');
    this.hooks = {beforePlay: [], afterEnd: []};
    this.id = element.getAttribute('data-video-id');
    this.isPlaying = false;
    this.isReady = false;
    this.playTrigger = element.querySelector('.js-video-trigger');
    this.queue = new Set();
    this.size = element.getAttribute('data-video-size');

    this.bindTrigger();
    this.observeElement();

    // Expose this object on element so we can control it outside of this module.
    element.VideoInstance = this;
    element.dispatchEvent(new CustomEvent('videoloaded'));
  }

  get poster() {
    if (this.posterEl) {
      return this.posterEl;
    }

    const clonedPoster = this.container.parentElement.querySelector(
      '.lazysizes-display-clone',
    );
    if (clonedPoster) {
      this.posterEl = clonedPoster;
      return this.posterEl;
    }

    if (this.posterEl) {
      return this.posterEl;
    }

    this.posterEl =
      this.container.parentElement.querySelector('.js-video-image');
    return this.posterEl;
  }

  bindTrigger() {
    if (!this.playTrigger) return;

    this.playTrigger.setAttribute('data-state', 'idle');
    this.playTrigger.addEventListener('click', () => {
      this.play();
    });
    this.playTrigger.addEventListener('animationend', () => {
      if (this.playTrigger.getAttribute('data-state') === 'paused') {
        this.playTrigger.setAttribute('data-state', 'idle');
      }
    });
  }

  observeElement() {

    observe(
      this.container,
      (inView) => {
        if (inView && this.canAutoplay) {
          this.play();
        } else if (this.isReady) {
          this.pause();
        }
      },
      {
        threshold: 0.25,
      },
    );
  }

  play() {
    if (this.isPlaying) return;
    if (!this.isReady) {
      this.createPlayer();
      this.queueTask('play');
      return;
    }

    if (this.hooks.beforePlay) {
      this.hooks.beforePlay.forEach((hook) => hook());
    }

    this._playPromise = Promise.resolve(this.player.play());
    this.isPlaying = true;
    this.hideOverlayElements();
  }

  async pause() {
    if (!this.isPlaying) return;
    if (!this.isReady || typeof this._playPromise === 'undefined') {
      this.queueTask('pause');
      return;
    }

    await this._playPromise;
    this.canResetVideo ? this.player.reset() : this.player.pause();

    this.isPlaying = false;
    if (!this.canAutoplay) {
      this.showOverlayElements();
    }
  }

  onEnded() {
    if (this.canLoop) return;

    if (this.hooks.afterEnd) {
      this.hooks.afterEnd.forEach((hook) => hook());
    }

    this.isPlaying = false;
    this.showOverlayElements();
  }

  hideOverlayElements() {
    if (this.poster) {
      this.poster.setAttribute('data-state', 'hidden');
    }

    if (this.playTrigger) {
      this.playTrigger.setAttribute('data-state', 'playing');
    }
  }

  showOverlayElements() {
    this.poster.setAttribute('data-state', 'visible');
    if (this.playTrigger) {
      this.playTrigger.setAttribute('data-state', 'paused');
    }
  }

  watchResize(videoWidth, videoHeight) {
    const updateSize = (videoWidth, videoHeight) => {
      const widthScale = this.container.clientWidth / videoWidth,
        heightScale = this.container.clientHeight / videoHeight;

      let multiplier = 1;

      if (widthScale >= heightScale) {
        multiplier = heightScale;

        if (this.container.clientWidth > videoWidth * heightScale) {
          multiplier = widthScale;
        }
      } else {
        multiplier = widthScale;

        if (this.container.clientHeight > videoHeight * widthScale) {
          multiplier = heightScale;
        }
      }

      this.player.element.style.width = `${videoWidth * multiplier}px`;
      this.player.element.style.height = `${videoHeight * multiplier}px`;
    };

    window.addEventListener('resize', () =>
      updateSize(videoWidth, videoHeight),
    );
    updateSize(videoWidth, videoHeight);

    // TODO: Revisit this code.
    // Make video element not focusable by keyboard
    this.player.element.setAttribute('tabindex', '-1');
  }

  flushQueue() {
    this.queue.forEach((command) => {
      this[command]();
    });
    this.queue.clear();
  }

  queueTask(command) {
    this.queue.add(command);
  }
}

export default Video;
