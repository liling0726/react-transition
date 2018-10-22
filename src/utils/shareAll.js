/**
 * 移动社交全端分享模板
 * 分享平台包括：微信，QQ，58APP，帮帮，M
 * @date 2016/10/17
 * @author chw
 */
var WX_API_v4 = '//j1.58cdn.com.cn/weixin/js/lib/wxjs-0.0.4.js';

var QQ_API = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152";
var QZone_API = "//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339";

//var WBAPP_API = '//pic2.58.com/m58/app58/m_static/js/app.js?cachevers=101';
var WBAPP_API = '//a.58cdn.com.cn/app58/static/rms/app/js/app_20264.js'; //只含有核心的功能，包括分享，功能较前边的要少
var BB_API = '//bangbang.58.com/mobile/jsapi/bangbangMobileCore-0.1.min.js';

var utils = {
	uuid: function(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [],
			i;
		radix = radix || chars.length;
		if (len) {
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			var r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	},
	loadAPI: function(url, callback) {
		var doc = document;
		var head = doc.head || (doc.getElementsByTagName("head")[0] || doc.documentElement);
		var node = doc.createElement("script");
		node.onload = callback;
		node.onerror = function() {};
		node.async = true;
		node.src = url[0];
		head.appendChild(node);
	},
	os: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
			iPhone: u.indexOf("iPhone") > -1,
			iPad: u.indexOf("iPad") > -1,
			ucbrowser: u.indexOf("ucbrowser") > -1,
			mqqbrowser: u.indexOf("MQQBrowser") > -1,
			micromessenger: u.indexOf("MicroMessenger") > -1,
			qq: u.indexOf("QQ") > -1
		}
	},
	checkUrlProtocol: function(url) {
		var protocol = window.location.protocol;
		var urlArr = url.match(/^(https|http)/);
		if (!!urlArr) {
			url = url.replace(/^(https:|http:)/, '');
		}
		return protocol + url;
	}
};

var Ashare = {
	version: "0.0.2",
	/**
	 * 微信分享
	 * 前提：页面上加载有WX_API_v4
	 * 
	 * @param  {string} title   	分享默认标题	必填
	 * @param  {string} link    	分享默认链接	必填
	 * @param  {string} desc    	分享默认描述	必填
	 * @param  {string} imgUrl      分享默认图片 	必填
	 * @param  {string|object} opt  分享配置信息	必填
	 *         opt可以配置为以下这些：
	 *			  opt: "WX|PYQ|QQ|TXWB"  //分别对应分享到微信，朋友圈，QQ，QQ空间，腾讯微博,默认为WX
	 *			  opt:{
	 *				"WX":{}, //默认值，可以忽略
	 *				"PYQ":{}, //定制分享到朋友圈
	 *				"QQ":{}, //定制分享到QQ
	 *				"TXWB":{} //定制分享到腾讯微博
	 *			  } 
	 * @param  {function} success   分享默认成功回调 选填
	 * @param  {function} cancle    分享默认取消回调 选填
	 * @return {string}         void
	 */
	wx: function(title, link, desc, imgUrl, opt, success, cancle) {
		link = utils.checkUrlProtocol(link);
		imgUrl = utils.checkUrlProtocol(imgUrl);

		opt = (function() {
			if (typeof opt === 'string') {
				var optarr = opt.split('|'),
					optobj = new Object();
				optarr.forEach(function(type) {
					optobj[type] = {};
				});
				return optobj;
			} else if (typeof opt === 'object') {
				return opt;
			}
		})();

		var getShareInfo = function(type) {
			var _title,_link,_desc,_imgUrl,_success,_cancle;
			if(opt[type]){
				_title = opt[type].title ? opt[type].title : title,
				_link = opt[type].link ? opt[type].link : link,
				_desc = opt[type].desc ? opt[type].desc : desc,
				_imgUrl = opt[type].imgUrl ? opt[type].imgUrl : imgUrl,
				_success = opt[type].success ? opt[type].success : success,
				_cancle = opt[type].cancle ? opt[type].cancle : cancle;
			}
			return {
				'title': _title||title,
				'link': _link||link,
				'desc': _desc||desc,
				'imgUrl': _imgUrl||imgUrl,
				success: _success||success,
				cancle: _cancle||cancle
			};
		};

		var shareArr = [];
		shareArr.push({
			type: 'appMessage',
			config: getShareInfo('WX')
		});
		for (var type in opt) {
			switch (type) {
				case "PYQ":
					shareArr.push({
						type: 'timeline',
						config: getShareInfo('PYQ')
					});
					break;
				case "QQ":
					shareArr.push({
						type: 'qq',
						config: getShareInfo('QQ')
					});
					break;
				case "TXWB":
					shareArr.push({
						type: 'weibo',
						config: getShareInfo('TXWB')
					});
					break;
			}
		}
		if (typeof wxjs != "undefined") {
			wxjs.ready(function(api) {
				shareArr.forEach(function(item) {
					api.share.set(item.type, item.config);
				});
			});
		}
	},

	/**
	 * QQ分享
	 * 前提：页面上加载有QQ_API
	 * 由于手机QQ限制，分享URL必须与页面URL同一域名，否则设置不生效
	 * 手机QQ分享QQ版本support: {
	 *   iOS: "4.6",
	 *   android: "4.6"
	 * }
	 * 
	 * @param  {object} opt [分享可选配置]
	 */
	qq: function(title, link, desc, imgUrl, opt) {
		link = utils.checkUrlProtocol(link);
		imgUrl = utils.checkUrlProtocol(imgUrl);
		if ('undefined' !== typeof window.mqq) {
			if (opt && 'undefined' !== opt.callback) { //有回调的时候
				/*
				  type = 3 : 微信朋友圈;
				  type = 2 : 微信好友;
				  type = 1 : QQ空间;
				  type = 0 : QQ好友.
				*/
				window.mqq.ui.setOnShareHandler(function(type) {
					var back = true,
						shareElement = "news",
						flash_url = "",
						puin = "",
						appid = "",
						sourceName = "",
						toUin = "",
						uinType = "";
					if ("undefined" !== typeof opt) {
						opt.back ? back = opt.back : back;
						opt.shareElement ? shareElement = opt.shareElement : shareElement;
						opt.flash_url ? flash_url = opt.flash_url : flash_url;
						opt.puin ? puin = opt.puin : puin;
						opt.appid ? appid = opt.appid : appid;
						opt.sourceName ? sourceName = opt.sourceName : sourceName;
						opt.toUin ? toUin = opt.toUin : toUin;
						opt.uinType ? uinType = opt.uinType : uinType;
					}
					mqq.ui.shareMessage({
						share_url: link,
						title: title,
						desc: desc,
						image_url: imgUrl, //分享的图片地址（支持外域名)
						share_type: type, //分享的目标类型,[0]QQ好友,[1]QQ空间,[2]微信好友,[3]微信朋友圈，默认0,
						back: back, //发送消息之后是否返回到web页面，默认为false，只对share_type=0有效，
						shareElement: shareElement, //分享的类型，news/audio/video，默认news(图文),
						flash_url: flash_url, //流媒体url(音频、视频),
						puin: puin, //公众账号uin,只在公众账号分享时写
						appid: appid, //来源appid
						sourceName: sourceName, //消息来源名称，优先读取appid,没有则读取puin,
						toUin: toUin, //分享给指定的好友或群，若有该参数则不呼起好友选择器,
						uinType: uinType //分享给指定好友类型的类型,[0]好友,[1]群
					}, opt.callback);
				});
			} else { //没回调函数的时候

				var info = {
					title: title,
					desc: desc,
					share_url: link,
					image_url: imgUrl
				};
				window.mqq.data.setShareInfo(info); //此方法的在ios下不支持回调
			}
		}
	},

	/**
	 * QQ空间分享
	 * 前提：页面上加载有QZone_API
	 * @param  {[object]} opt [分享配置]
	 */
	qz: function(title, link, desc, imgUrl, opt) {
		link = utils.checkUrlProtocol(link);
		imgUrl = utils.checkUrlProtocol(imgUrl);

		if (QZAppExternal && QZAppExternal.setShare) {
			var imageArr = [],
				titleArr = [],
				summaryArr = [],
				shareURLArr = [];
			for (var i = 0; i < 5; i++) {
				imageArr.push(imgUrl);
				shareURLArr.push(link);
				if (i === 4 && (opt.swapTitle || opt.WXconfig && opt.WXconfig.swapTitleInWX)) {
					titleArr.push(desc);
					summaryArr.push(title)
				} else {
					titleArr.push(title);
					summaryArr.push(summary)
				}
			}
			QZAppExternal.setShare(function(data) {}, {
				"type": "share",
				"image": imageArr,
				"title": titleArr,
				"summary": summaryArr,
				"shareURL": shareURLArr
			});
		}
	},

	/**
	 * 调用native调起分享功能
	 * 前提：页面上加载有WBAPP_API
	 * 
	 * @param {object} opt 分享配置
	 * 配置选项说明：
	 *  title 必填项，分享标题
	 *  url 必填项，分享url
	 *  picurl 必填项，分享图标地址
	 * @param {String} placeholder 必填项，分享占位显示（目前版本不起作用）
	 * @param {String} content 必填项，分享内容（仅分享给好友显示）
	 * @param {String} shareto 必填项，分享到 QQ,SINA,WEIXIN,FRIENDS,COPY | ALL
	 * @param {String} type 选填项，是否分享图片，默认空，选填 imageShare 支持版本 app 6.5.0 +
	 * @param {String} dataURL 选填项，如果type为imageShare时，次参数需要传递分享图片的路径，如果不传使用picurl代替 支持版本 app 6.5.0 +
	 * @param {String} thumburl 选填项，如果type为imageShare时，次参数需要传递分享图片的缩略图路径，如果不传使用picurl代替 支持版本 app 6.5.0 +
	 * @param {String} callback 选填项，分享回调函数 callback(String:state, String:source) state: 0 失败 1成功 2取消  source: QQ | WEIXIN | FRIENDS | SINA 支持版本 app 6.5.4 +
	 */
	app: function(title, link, desc, imgUrl, callback, opt) {

		link = utils.checkUrlProtocol(link);
		imgUrl = utils.checkUrlProtocol(imgUrl);

		//callback说明：android的名字可以是任意的，但ios的名字必须为shareCallback
		if (typeof WBAPP !== 'undefined') {
			var placeholder = "",
				type = "",
				dataURL = "",
				thumburl = "";
			if ("undefined" !== typeof opt) {
				opt.placeholder ? placeholder = opt.placeholder : placeholder;
				opt.type ? type = opt.type : type;
				opt.dataURL ? dataURL = opt.dataURL : dataURL;
				opt.thumburl ? thumburl = opt.thumburl : thumburl;
			}
			WBAPP.shareInfo(
				title,
				link,
				imgUrl,
				placeholder,
				desc,
				"QQ,SINA,WEIXIN,FRIENDS",
				type,
				dataURL,
				thumburl,
				"shareCallback"
			);
			window.shareCallback = function(state, source) {
				if ("undefined" !== typeof callback) {
					callback(state, source);
				}
			}
		}
	},

	/**
	 * 帮帮分享
	 * 前提：页面上加载有BB_API
	 * 
	 * 存在两种方式，一种是_BB,一种是url跳转
	 * 前一种在android平台下生效，后一种在ios平台下生效
	 * @param  {object} opt [分享配置]
	 */
	bb: function(title, link, desc, imgUrl, callback, opt) {
		link = utils.checkUrlProtocol(link);
		imgUrl = utils.checkUrlProtocol(imgUrl);

		function share() {
			if (utils.os().android) {
				if ('undefined' !== typeof _BB) {
					_BB.share(
						title,
						desc,
						imgUrl,
						link,
						function(data) {
							if (typeof callback !== "undefined") {
								callback(data);
							}
						}
					);
				}
			}
			if (utils.os().ios) {
				location.href = "bangbangshareupdate{:}url{-}" + link + "{;}imgurl{-}" + imgUrl + "{;}title{-}" + title + "{;}detail{-}" + desc;
			}
		}
		window.share = share;
		share();
	},

	/**
	 * 微营销分享
	 */
	wyx:function(title,url,content,picPath){
		url = utils.checkUrlProtocol(url);
		picPath = utils.checkUrlProtocol(picPath);
		if(weiyingxiaoMApplication){
			var uuid = utils.uuid(13,10);
			var shareArr = {
				"sessionId": uuid,
                "cmd":"invokeMethod",
                "args":["setShareData",title,content,picPath,url,""]
			}
			weiyingxiaoMApplication.executeCmd(JSON.stringify(shareArr));
		}
	},
	/**
	 * 新版微营销分享
	 */
	wyxApp:function(shareto,title,desc,url,imgUrl,panelTitle,callback){
		if(typeof WubawyxApp!="undefined"){
			url = utils.checkUrlProtocol(url);
			imgUrl = utils.checkUrlProtocol(imgUrl);
			if(typeof WubawyxApp!="undefined"){
				if(typeof callback=="undefined"){
            		callback =function(){}
            	}
				WubawyxApp.share.webpage(shareTo, title, desc, url, imgUrl, panelTitle, callback)
			}
		}

	},
	/**
	 * 新版微营销分享图片
	 */
	wyxImage:function(shareto,title,desc,panelTitle,filePath,callback){
		if(typeof WubawyxApp!="undefined"){
			if(typeof callback=="undefined"){
        		callback =function(){}
        	}
			WubawyxApp.share.image(shareTo, title, desc, panelTitle, filePath, callback)
		}

	},
	/**
	 * 新版微营销设置页面分享
	 */
	wyxSetShare:function(shareto,title,desc,url,imgUrl,panelTitle,callback){
		if(typeof WubawyxApp!="undefined"){
			url = utils.checkUrlProtocol(url);
			imgUrl = utils.checkUrlProtocol(imgUrl);
			WubawyxApp.ui.showshare();
			WubawyxApp.on('viewShare',wyxshare);
            function wyxshare(){
            	if(typeof callback=="undefined"){
            		callback =function(){}
            	}
    			WubawyxApp.share.webpage(shareTo, title, desc, url, imgUrl, panelTitle, callback)
            }
		}

	},

	/**
	 * 浏览器里边分享
	 * 最多的操作就是弹窗提示用户如何操作
	 * @param  {object} opt [分享配置]
	 */
	qita: function(callback, opt) {
		if ('function' === typeof callback) {
			callback();
		}
	}
};
Ashare.os = utils.os();
window.Ashare = Ashare;

module.exports = Ashare;