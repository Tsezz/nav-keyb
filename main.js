// 1.初始化函数
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

//2. 生成键盘
//遍历 keys，生成 kdb 标签
generateKeyboard(keys, hash)

// 3. 监听用户动作
listenToUser(hash)

function init() {
    // var keys = {
    //     '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
    //     '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
    //     '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
    //     length: 3
    // }
    // var hash = {
    //     'q': 'qq.com',
    //     'w': 'weibo.com',
    //     'e': 'ele.me',
    //     'r': 'renren.com',
    //     't': 'tianyan.com',
    //     'y': 'youtube.com',
    //     'u': 'uc.com',
    //     'i': 'iqiyi.com',
    //     'o': 'opear.com',
    //     'z': 'z.cn'
    // }
    var keys = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
    ]
    var hash = {
        "a": "www.acfun.cn",
        "b": "www.bilibili.com",
        "c": "www.coursera.org",
        "d": "www.douban.com",
        "e": "www.exhentai.org",
        "f": "fanyi.sogou.com",
        "g": "www.github.com",
        "h": "www.hostker.com",
        "i": "www.ipip.net",
        "j": "www.jd.com",
        "k": "keep.google.com",
        "l": "www.linode.com",
        "m": "movie.douban.com",
        "n": "www.name.com",
        "o": "onedrive.live.com",
        "p": "plus.google.com",
        "q": "www.qq.com",
        "r": "www.rescuetime.com",
        "s": "www.speedtest.net",
        "t": "blog.tse.moe",
        "u": "u2.dmhy.org",
        "v": "www.v2ex.com",
        "w": "alpha.wallhaven.cc",
        "x": "juejin.im",
        "y": "www.youtube.com",
        "z": "zhihu.com"
    }
    // 取出 localStorage 中的 zzz 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('zzz')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName) {
    return document.createElement(tagName)
}

function createSpan(textContent) {
    var span = tag('span')
    span.textContent = textContent
    span.className = "text"
    return span
}

function createButton(id) {
    var button = tag('button')
    button.textContent = 'E'
    button.id = id
    button.className = "edit"
    button.onclick = function (e) {
        var button2 = e.target
        var img2 = button2.previousSibling
        var key = e.target.id
        var x = prompt('请设置导航地址')
        hash[key] = x   //按钮对应的hash的值变为x
        img2.src = 'http://' + x + '/favicon.ico'
        img2.onerror = function (xxx) {
            xxx.target.src = '//i.loli.net/2017//11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('zzz', JSON.stringify(hash))  //hash变更后存到zzz里面
    }
    return button
}

function createImage(domain) {
    var img1 = tag('img')
    if (domain) {
        // img1 = tag('img')
        img1.src = 'http://' + domain + '/favicon.ico'
    } else {
        img1.src = '//i.loli.net/2017//11/10/5a05afbc5e183.png'
    }

    img1.onerror = function (xxx) {
        xxx.target.src = '//i.loli.net/2017//11/10/5a05afbc5e183.png'
    }      //下载失败的ico替换为默认的图片
    return img1
}
function generateKeyboard(keys, hash) {
    //遍历 keys，生成 kdb 标签
    for (var index = 0; index < keys.length; index = index + 1) {
        var div1 = tag('div')
        div1.className = 'row'
        main1.appendChild(div1)
        var row = keys[index]
        for (var index2 = 0; index2 < row.length; index2 = index2 + 1) {
            var span = createSpan(row[index2])
            var button = createButton(row[index2])
            var img1 = createImage(hash[row[index2]])
            var kbd1 = tag('kbd')
            kbd1.className = 'key'
            kbd1.appendChild(span)
            kbd1.appendChild(img1)
            kbd1.appendChild(button)
            //kbd1.textContent = row[index2]
            div1.appendChild(kbd1)
        }
    }
}

function listenToUser(hash) {
    document.onkeyup = function (e) {
        var key = e.key
        console.log(key)
        var website = hash[key]
        console.log(website)
        //	location.href = 'http://'+website   //把当前地址变为新的网站的地址
        if (13===e.which) {
            console.log('2333')
        } else if (website) {
            window.open('http://' + website, '_blank')
        }
    }
}