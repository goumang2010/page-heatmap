import Heatmap from '../heatmap/src';
import { field } from './constants';
import { createPreProcessor, createConverter, trimData } from './utils';
const defaultOption = {
    type: 'heatmap',
    hoverable: false,
    minAlpha: 0.2,
    valueScale: 1,
    opacity: 1,
    bgAlpha: 100,
};
export default class Adapter {
    constructor(config) {
        config && (this.init(config));
    }
    static field = field;
    init({ option = {}, $win, initData, dataLengthFixed = false } = {}) {
        if ($win) {
            this.$win = $win;
            this.$doc = this.$win.document;
            this.$body = this.$doc.body;
            this._setLauncher({ ...defaultOption, ...option }, initData, dataLengthFixed);
        }
    }
    _setLauncher(option, initData, hasIndexKey) {
        let size = this._getBodySize();
        const heatmapInstance = new Heatmap(option);
        this.bindEvent({
            id: 'scroll',
            type: 'scroll',
            handler: () => {
                if (this.$body.scrollTop > size.height - this.$win.innerHeight) {
                    heatmapInstance.resetSize((size = this._getBodySize()));
                    this._resetSize(size);
                }
            }
        })
        this.bindEvent({
            id: 'resize',
            type: 'resize',
            target: this.$win,
            handler: () => {
                heatmapInstance.resetSize((size = this._getBodySize()));
                this._resetSize(size);
            }
        })
        heatmapInstance.init(size);
        const preProcessor = createPreProcessor(this.$win, (data) => {
            this.parsedData = data;
        });
        const converter = createConverter(hasIndexKey);
        const launcher = heatmapInstance.buildAnimation({
            converter: (data) => converter(preProcessor(data)),
            data: trimData(initData)
        });
        this.append(heatmapInstance.canvas);
        this.launcher = launcher;
    }
    start(data) {
        data && (data = trimData(data))
        this.launcher && this.launcher.start(data);
    }
    reset(data) {
        if (this.launcher) {
            this.launcher.reset({ data: trimData(data) });
        }
    }
    show() {
        this.$heatdiv && (this.$heatdiv.style.display = 'block');
    }
    hide() {
        this.$heatdiv && (this.$heatdiv.style.display = 'none');
    }
    bindEvent({ id, type, handler, target = this.$doc }) {
        target.addEventListener(type, handler);
        this.events = this.events || [];
        id = id || Object.keys(this.events).length;
        this.events.push({ id, type, handler });
    }
    unbindEvent(id, noerr = false) {
        if (!this.events) {
            if (noerr) {
                return;
            } else {
                throw new Error('there are no events bound!');
            }
        }
        let i;
        if (typeof id === 'string' || typeof id === 'number') {
            id = id.toString();
            i = this.events.findIndex(x => x.id === id);
            if (i < 0) {
                if (noerr) {
                    return;
                } else {
                    throw new Error('id is not found! id:' + id.toString());
                }
            }
        } else if (typeof id === 'function') {
            i = this.events.findIndex(x => x.handler === handler);
            if (i < 0) {
                if (noerr) {
                    return;
                } else {
                    throw new Error('handler is not found! id:' + id.toString());
                }
            }
        } else {
            if (noerr) {
                return;
            } else {
                throw new Error('string or function is required by unbindEvent!');
            }
        }
        let { type, handler, target } = this.events[i];
        target.removeEventListener(type, handler);
        this.events.splice(i, 1);
    }
    append(el) {
        if (!this.$heatdiv) {
            const $heatdiv = document.createElement("div");
            $heatdiv.id = 'heatdiv';
            const docheight = this.$body.offsetHeight;
            const docwidth = this.$body.offsetWidth;
            $heatdiv.style.cssText = `overflow:hidden;z-index:99999;position:absolute;height:${docheight}px;width:${docwidth}px;top:0;left:0;pointer-events:none;`;
            this.$body.appendChild($heatdiv);
            this.$heatdiv = $heatdiv;
        }
        this.$heatdiv.appendChild(el);
    }
    destroy() {
        if (this.$heatdiv) {
            this.$heatdiv.parentNode.removeChild(this.$heatdiv);
            this.$heatdiv = null;
        }
    }
    hover(enter, over, off, throttle = 200) {
        let state, wait = false;
        const onHover = (e) => {
            if (!this.parsedData) {
                return;
            }
            let _x = e.pageX;
            let _y = e.pageY;
            let i = this.parsedData.findIndex(p => Math.abs(p[field.X] - _x) <= (p[field.W] / 2) && Math.abs(p[field.Y] - _y) <= (p[field.H] / 2));
            if (i > -1) {
                if (state !== i) {
                    enter(_x, _y, i, this.parsedData);
                    state = i;
                    wait = false;
                } else {
                    if (!wait) {
                        // throttle
                        setTimeout(() => {
                            over(_x, _y);
                            wait = false;
                        }, throttle);
                        wait = true;
                    }
                }
            } else {
                off();
                wait = false;
                state = -1;
            }
        }
        this.bindEvent({ id: 'hover', type: 'mousemove', handler: onHover.bind(this) })
    }
    _getBodySize() {
        return {
            width: this.$body.offsetWidth,
            height: this.$body.offsetHeight
        }
    }
    _resetSize({ width, height }) {
        this.$heatdiv.style.width = width + 'px';
        this.$heatdiv.style.height = height + 'px';
    }
}
