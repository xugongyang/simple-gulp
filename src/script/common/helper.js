/**
 * helper js
 * xugongyang
 * August 9 ,2017
 */

/**
 * 元素在数组中的下标
 * @param elem
 * @param arr
 * @param i
 * @returns {number}
 */
function inArray( elem, arr, i ) {
    var indexOf = [].indexOf;
    return arr == null ? -1 : indexOf.call( arr, elem, i );
}
/**
 * 获取字符串长度（汉字算两个字符，字母数字算一个）
 */
function getByteLength(val){
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        len+=(a.match(/[^\x00-\xff]/ig) != null)?2:1;
    }
    return len;
}
/*生成n-m之间随机数*/
function rd(n,m){
    var baseNum = m-n+1;
    return Math.floor(Math.random() * baseNum + n);
}

/*随机选取指定个数 不同的随机数*/
function getLimitRandom(length,originaArr){
    var arr=[];
    var temp=null;
    while(arr.length<length){
        temp=Math.floor(Math.random()*originaArr.length);
        if(inArray(temp, arr,0)<0){
            arr.push(temp);
        }
    }
    return arr;
}

