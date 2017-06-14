var mockdata = require('./mock/heatdata');
var mockdata2 = require('./mock/heatdata2');
export default {
    getHeatData(data) {
        return Promise.resolve(mockdata).then(function(res) {
            if (res.code !== '200' || res.iserror !== '0') {
                return Promise.reject('Fail to get heat data' + res.msg);
            }
            var data;
            if (res && (data = res.data) && (data = data.result) && data.length) {
                // data = data.filter(x => /a(\d|[0-2]\d)$/.test(x.pointName));
                // data = data.filter(x => /a83$/.test(x.pointName));
				// data = data.filter(x => /(a14[67]|a49|a50|a51|a52)$/.test(x.pointName));		
                // data = data.filter(x => /(a26)$/.test(x.pointName));		
                return data;
            } else {
                return Promise.reject('No heat info!');
            }
        }).catch(function(err) {
            console.error(err);
        });
    },
    getHeatData2({pageUrl, startTime, endTime}) {
		 return Promise.resolve(mockdata2).then(function(res) {
			if (res.code !== '200') {
				return Promise.reject('获取热力图信息失败：' + res.msg);
			}
			var data;
			if (res && (data = res.data) && data.length) {
				return data;
			} else {
				return Promise.reject('暂无热力图信息');
			}
		}).catch(function(err) {
            console.error(err);
        });
	}

}
