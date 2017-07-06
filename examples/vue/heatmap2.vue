<template>
    <div class="heatmap">
        <div class='page-content'>
            <form class='form-inline'>
                <div class='form-group'>
                    <label>URL</label>
                    <input type='text' class='form-control page-url' placeholder='please enter url' v-model="config.url" @keydown.enter.stop.prevent="searchClick">
                </div>
                <div class='form-group'>
                    <label>Platform</label>
                    <select class="form-control" v-model="config.platform">
                        <option value='PC'>PC</option>
                        <option value='H5'>H5</option>
                    </select>
                </div>
                <div class='form-group'>
                    <label>dataType</label>
                    <select class="form-control data-type" v-model="typeIndex" :disabled="!show">
                        <option v-for="(t, i) of types" :value="i">{{t.text}}</option>
                    </select>
                </div>
                <div class='form-group'>
                    <label class="showmap" slot="extend-nav">
                        show
                        <input type="checkbox" v-model="show"></input>
                    </label>
                </div>
                <div style="width: 300px;">
                    <button id="search" @click='searchClick' type='button' class='btn btn-primary'>Search</button>
                    <span style="width: 200px;">{{message}}</span>
                </div>
            </form>
            <div id='container' class='main'>
                <div class='tabpanel_content' style='width: 100%; height: 1000px;'>
                    <div class='html_content' style='z-index: 2;'>
                        <iframe :class="{'pc-iframe': config.platform === 'PC', 'wap-iframe':  config.platform === 'H5'}" frameborder='no' border='0' marginwidth='0' marginheight='0' id='iframenode' :src="iframe_url" @load="init" sandbox="allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../api';
import Adapter from '../../src';
export default {
    name: 'heatmap',
    data: function () {
        return {
            iframe_url: '',
            deadtimer: null,
            iframe_loaded: false,
            message: '',
            show: true,
            types: [{
                name: 'click',
                text: 'Click',
                p: 1
            }, {
                name: 'uv',
                text: 'UV',
                p: 1
            }],
            typeIndex: 0,
            $adapter: null,
            $heatdata: null,
            config: {
                platform: 'PC',
                url: 'https://www.gomeplus.com/'
            }
        }
    },
    computed: {
        type() {
            return this.types[this.typeIndex].name;
        }
    },
    mounted() {
        this.$adapter = new Adapter({ types: this.types });
    },
    methods: {
        searchClick() {
            this.show = true;
            var url = this.config.url;
            if (!/https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(url)) {
                alert('Wrong url!');
                return false;
            }
            this.iframe_loaded = false;
            this.message = 'please wait...';
            this.deadtimer && clearTimeout(this.deadtimer);
            let rawurl = this.config.url;
            var newiframe_url = '/api/page/html?m=' + this.config.platform + '&url=' + encodeURIComponent(rawurl);
            let rawquery = rawurl.split('?')[1];
            rawquery && (newiframe_url += '&' + rawquery);
            this.iframe_url = newiframe_url;
            this.deadtimer = setTimeout(() => {
                if (!this.iframe_loaded) {
                    if (window.stop) {
                        window.stop();
                    } else {
                        document.execCommand('Stop'); // MSIE
                    }
                    this.init();
                    this.iframe_loaded = true;
                }
            }, 10000);
        },
        init() {
            if (!this.message) {
                return;
            }
            this.message = '';
            this.iframe_loaded = true;
            let options = this.config;
            return api.getHeatData2(options).then((data) => {
                // this.$heatdata = data;
                const $win = document.querySelector('iframe').contentWindow;
                const offsetWidth = $win.screen.width / 2;
                const height = $win.document.body.clientHeight;
                // const initData = data.map(a => ({ value: a[this.datatype], cx: a.x + 600 - offsetWidth, cy: a.y, w: 20, h:20, visible: true, slient: a.y < height }));
                const initData = data.map(a => ({ ...a, value: a[this.types[this.typeIndex].name], cx: a.x + 600 - offsetWidth, cy: a.y, w: 25, h:25, visible: a.y < height })).filter(a => (a.cx > 0 && a.cx < $win.screen.width && a.cy > 0 && a.cy < 100000));
                this.$heatdata = initData;
                // console.log(initData);
                const customProcessor = (data) => {
                    let height = $win.document.body.clientHeight;
                    return data.map((x) => {
                    if(!x.visible) {
                        let visible = x.cy < height;
                        return {...x, visible}
                    } else {
                        return x;
                    }
                })};
                this.$adapter.init({initData, $win, customProcessor, dataLengthFixed: true });
                // this.$adapter.start();
                this.$adapter.render();
                // this.showTip()
            }).catch(err => {
                throw err;
            });
        },
        showTip() {
            let $tip, $popover;
            let $adapter = this.$adapter;
            // inject popover
            $tip = document.createElement('p');
            $tip.style.textAlign = 'left';
            $popover = document.createElement('div');
            $popover.style.cssText = `z-index:999999;overflow:hidden;display:none;position:absolute;border:0px solid rgb(51,51,51);transition:left 0.4s,top 0.4s;border-radius:4px;color:rgb(255,255,255);padding:5px;background-color:rgba(0,0,0,0.7);transition: all 0.5s`;
            $popover.appendChild($tip);
            $adapter.append($popover);
            const getTipText = (data) => this.types.map(x => `${x.text}: ${data[x.name]}`).join('<br>');
            const tipData = this.$heatdata.map(x => `Name：${x.pointName || '--'}<br>${getTipText(x)}`);
            const setPopover = (x, y) => {
                let docwidth = $adapter.$body.offsetWidth;
                let halfwidth = docwidth / 2;
                if (x < halfwidth) {
                    $popover.style.right = '';
                    $popover.style.left = x + 12 + 'px';
                } else {
                    $popover.style.right = docwidth - x + 12 + 'px';
                    $popover.style.left = '';
                }
                $popover.style.top = y + 12 + 'px';
                $popover.style.display = 'block';
            }
            $adapter.hover((x, y, i) => {
                $tip.innerHTML = tipData[i];
                setPopover(x, y);
            }, setPopover, () => {
                $popover.style.display = 'none';
            })
        }
    },
    watch: {
        type: {
            handler(newValue, oldValue) {
                this.$adapter && this.$adapter.reset(this.$heatdata.map(x => ({ value: x[this.type], selector: x.selector })));
            }
        },
        show: {
            handler(newValue, oldValue) {
                if (newValue) {
                    this.$adapter.show();
                } else {
                    this.$adapter.hide();
                }
            }
        }
    }
};
</script>
<style>
.heatmap #search {
    margin-left: 20%;
    margin-right: 15px;
}

.page-content {
    display: flex;
    flex-direction: column;
}

.form-inline {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
}

.form-inline>* {
    margin-bottom: 10px;
}

.form-inline .form-group {
    margin-right: 20px;
}

.form-inline input.page-url {
    width: 350px;
}

.tabpanel_content {
    position: relative;
    z-index: 2;
    overflow: hidden;
}

.tabpanel_content .html_content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
}

.pc-iframe {
    display: block;
    background-color: #efefef;
    width: 125%;
    height: 125%;
    border: none;
    zoom: 0.8;
    transform: scale(0.8);
    transform-origin: 0 0;
    overflow-y: scroll;
}

.wap-iframe {
    width: 375px;
    height: 667px;
    margin: 10px auto 0;
    display: block;
    background-color: #efefef;
}
</style>
