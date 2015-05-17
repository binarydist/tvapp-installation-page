function doAction() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                iPod: u.indexOf('iPod') > -1,
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.ios) {
        var iosFlg = true;
        if (browser.versions.iPhone) {
            var index = navigator.userAgent.indexOf("iPhone OS")
            if (index >= 0) {
                var iphoneVersion = parseFloat(navigator.userAgent.slice(index + 10));
                if (iphoneVersion >= 7) {
                    iosFlg = true;
                } else {
                    iosFlg = false;
                }
            }
        }

        if (browser.versions.iPad) {
            var index = navigator.userAgent.indexOf("CPU OS")
            if (index >= 0) {
                var ipadVersion = parseFloat(navigator.userAgent.slice(index + 7));
                if (ipadVersion >= 7) {
                    iosFlg = true;
                } else {
                    iosFlg = false;
                }
            }
        }

        if (browser.versions.iPod) {
            iosFlg = true;
        }

        if (iosFlg) {
            var url = 'itms-services://?action=download-manifest&url=https://tvappdownload.b0.upaiyun.com/ios/tvapp.plist';
            var a = document.createElement("a");
            if (!a.click) {
                window.location.href = url;
                return;
            }
            a.setAttribute("href", url);
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
        } else {
            alert('IOS7 and the version above is required');
        }
    } else if (browser.versions.android) {
        var index = navigator.userAgent.indexOf("Android")
        if (index >= 0) {
            var androidVersion = parseFloat(navigator.userAgent.slice(index + 8));
            if (androidVersion >= 4) {
                window.location.href = 'http://tvappdownload.b0.upaiyun.com/android/tvapp.apk';
            } else {
                alert('Android 4.0 and the version above is required');
            }
        }
    }else{
      alert('IOS/Android版本请在手机浏览器中下载安装');
  }
}