const X_FIELD = '_centerX';
const Y_FIELD = '_centerY';
const W_FIELD = '_w';
const H_FIELD = '_h';
const VS_FIELD = 'visible';
// slient field
const SL_FIELD = 'visible';
const PARSED_VAL_FIELD = '_value';
const RAW_VAL_FIELD = 'value';
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
            delete x[VS_FIELD];
            delete x[SL_FIELD];
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
                    [SL_FIELD]: slient
                }
            }
            if (visible) {
                _cx = Math.round(bodyScrollLeft + _cx);
                _cy = Math.round(bodyScrollTop + _cy);
                return {
                    ...x,
                    [X_FIELD]: _cx,
                    [Y_FIELD]: _cy,
                    [W_FIELD]: _width,
                    [H_FIELD]: _height,
                    [VS_FIELD]: visible
                };
            }
            return x;
        });
        cb && cb(_data);
        return _data;
    }
}
export function createConverter(cb) {
    return function(data = []) {
        let _data = data.map(x => [x[X_FIELD], x[Y_FIELD], x[PARSED_VAL_FIELD], x[VS_FIELD], x[SL_FIELD]]);
        cb && cb(_data);
        return _data;
    }
}
export function trimData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Please set data param for helper: trimData!')
    }
    let vals = data.map(x => x[RAW_VALUE_FIELD]);
    vals.sort((a, b) => a - b);
    let half = Math.floor(vals.length / 2);
    let median = (vals.length % 2) ? vals[half] : (vals[half - 1] + vals[half]) / 2;
    let ratio = maxVal / 2 / median;
    return data.map((x) => ({
        ...x,
        [PARSED_VAL_FIELD]: x[RAW_VAL_FIELD] * ratio
    }));
}
