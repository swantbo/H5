(function flexible(window, document) { //立即执行函数
    var docEl = document.documentElement //获取根元素Html
    var dpr = window.devicePixelRatio || 1 //物理像素比,拿不到为1

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function(e) { //页面加载,火狐浏览器将页面保存在内存中,不重新加载页面,用pageshow即使缓存也可触发
        if (e.persisted) { //是否来自于缓存,也重新计算rem的大小
            setRemUnit()
        }
    })

    // detect 0.5px supports
    //有些移动端浏览器不支持0.5px
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))