/*!
 * faul - version 0.1.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
export default class Faul {
  constructor({
    items = '.faul',
    bg = false,
    threshold = 0,
    stagger = 100,
    fn = item => {}
  } = {}) {
    this.hires = window.devicePixelRatio > 1;
    this.attr = this.hires ? 'srcHires' : 'src';
    this.bg = bg;
    this.th = threshold;
    this.stagger = stagger;
    this.fn = fn;
    this.set(items);
    this.init();
  }
  init() {
    this.handler = this.load.bind(this);
    this.load();
    window.addEventListener('scroll', this.handler);
    window.addEventListener('resize', this.handler);
  }
  set(items) {
    this.items = [].slice.call(items instanceof NodeList ? items : document.querySelectorAll(items), 0);
  }
  load(e) {
    this.items = this.items.filter((item, i, items) => {

      const wTop = window.pageYOffset;
      const wBottom = wTop + window.innerHeight;
      const elTop = Math.round(item.getBoundingClientRect().top + wTop);
      const elBottom = Math.round(elTop + item.clientHeight);
      const visible = elBottom > wTop - this.th && elTop < wBottom + this.th;

      if (visible) {
        let src = item.dataset[this.attr];
        src = src || item.dataset.src;

        if (src) {
          item.style.transitionDelay = `${ i * this.stagger }ms`;

          if (this.bg) {
            const img = new Image();
            img.onload = e => {
              item.style.backgroundImage = `url(${ src })`;
              item.classList.add('loaded');
              this.fn(item);
            };
            img.src = src;
          } else {
            item.onload = e => {
              item.classList.add('loaded');
              this.fn(item);
            };
            item.src = src;
          }
        }
      }
      return !visible;
    });
  }
  destroy() {
    window.removeEventListener('scroll', this.handler);
    window.removeEventListener('resize', this.handler);
  }
}