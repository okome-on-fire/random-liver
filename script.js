$(document).ready(function() {
    var dataJson = $.getJSON('https://raw.githubusercontent.com/okome-on-fire/random-mankai/main/performance/data.json');

    function rangeRandom(select_num) {
        // 範囲の最小値
        var rangeMin = 0;
        // 範囲の最大値
        var rangeMax = 23;
        // 範囲内の数値の個数
        var rangeLength = rangeMax - rangeMin + 1;
        // 並び替え前の数値を管理する配列
        var countArr = [];
        // 並び替え後の数値を格納する配列
        var randomArr = [];

        // 範囲内の数値をcountArrに格納
        for(var i = 0; i < rangeLength; i++) {
            countArr[i] = i + rangeMin;
        }

        for(var i = 0; i < select_num; i++) {
            // 0～countArrの個数 の範囲から、数値をランダムに抽出
            var randomTarget = Math.floor(Math.random() * countArr.length);
            // randomArrに数値を格納(randomTargetの数値を格納するのではなく、countArrのrandomTarget番目の配列の数値を格納)
            randomArr[i] = countArr[randomTarget];
            // 同じ数値を再度使わないように、今回使った数値をcountArrから削除しておく。
            countArr.splice(randomTarget, 1);
        }
        return randomArr;
    }

    // 一人用
    $('.s-choose_button').on('click', function() {
        var random = Math.floor(Math.random() * 24);
        $('.s-result').text(nameList[random]);
        var tweet = '選ばれたのは「' + nameList[random] + '」です';
        $('.s-tweet_button').attr('href', 'http://twitter.com/intent/tweet?url=https://okome-on-fire.github.io/random-mankai/&text=' + tweet);
    });
});