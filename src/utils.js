import { field } from './constants';
export function createProcessor($win = window, cb) {
    const $doc = $win.document;
    const efp = $doc.elementFromPoint.bind($doc);
    return function(data = []) {
        const bodyHeight = $doc.body.offsetHeight;
        const bodyScrollTop = $doc.body.scrollTop;
        const bodyScrollLeft = $doc.body.scrollLeft;
        const winHeight = $win.innerHeight;
        let _data = data.map((x, i) => {
            let $el = x.$el || (x.$el = $doc.querySelector(x.selector));
            delete x[field.VS];
            delete x[field.SL];
            if (!$el) {
                return x;
            }
            let rect = $el.getBoundingClientRect();
            let _width = rect.width;
            let _height = rect.height;
            let _cx = rect.left + _width / 2;
            let _cy = rect.top + _height / 2;
            // refer to http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
            // if the point is scrolled out, then keep it.
            let visible = _width && _height && $el.contains(efp(_cx, _cy));
            let slient = _cy < 0 || _cy > winHeight && !visible;
            if (slient) {
                return {
                    ...x,
                    [field.SL]: slient
                }
            }
            if (visible) {
                _cx = Math.round(bodyScrollLeft + _cx);
                _cy = Math.round(bodyScrollTop + _cy);
                return {
                    ...x,
                    [field.X]: _cx,
                    [field.Y]: _cy,
                    [field.W]: _width,
                    [field.H]: _height,
                    [field.VS]: visible
                };
            }
            return x;
        });
        cb && cb(_data);
        return _data;
    }
}
export function createConverter(indexKey = false) {
    if (indexKey) {
        return function(data = []) {
            let _data = data.map((x, i) => [x[field.X], x[field.Y], x[field.PARSED_VAL], x[field.VS], x[field.SL], i]);
            return _data;
        }
    } else {
        return function(data = []) {
            let _data = data.map((x, i) => [x[field.X], x[field.Y], x[field.PARSED_VAL], x[field.VS], x[field.SL]]);
            return _data;
        }
    }
}
const maxVal = 1;
export function trimData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Please set data param for helper: trimData!')
    }
    let vals = data.map(x => x[field.RAW_VAL]);
    vals.sort((a, b) => a - b);
    let half = Math.floor(vals.length / 2);
    let median = (vals.length % 2) ? vals[half] : (vals[half - 1] + vals[half]) / 2;
    let ratio = maxVal / 2 / median;
    return data.map((x) => ({
        ...x,
        [field.PARSED_VAL]: x[field.RAW_VAL] * ratio
    }));
}
