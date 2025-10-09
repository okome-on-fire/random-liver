$(document).ready(function() {
    var nameList = [
        '佐久間咲也',
        '碓氷真澄',
        '皆木綴',
        '茅ヶ崎至',
        'シトロン',
        '卯木千景',
        '皇天馬',
        '瑠璃川幸',
        '向坂椋',
        '斑鳩三角',
        '三好一成',
        '兵頭九門',
        '摂津万里',
        '兵頭十座',
        '七尾太一',
        '伏見臣',
        '古市左京',
        '泉田莇',
        '月岡紬',
        '高遠丞',
        '御影密',
        '有栖川誉',
        '雪白東',
        'ガイ'
    ];

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

    // 複数人版
    $('.s-chooseNum_button').on('click', function() {
        $('.result_item').remove();

        var select_num = $('.selectNum_area input').val();
        var randomNumList = [];

        randomNumList = rangeRandom(select_num);

        var selectChara = '';
        var tweetText = '';

        $('.result_title span').text(select_num);

        for(var i = 0; i < select_num; i++) {
            selectChara = String(i+1) + '：' + nameList[randomNumList[i]];
            resultText = '<li class="result_item"><p>' + selectChara + '</p></li>' ;
            $('.s-resultList').append(resultText);
            if( i == 0) {
                tweetText += nameList[randomNumList[i]];
            } else {
                tweetText += ( '/' + nameList[randomNumList[i]]) ;
            }

        }

        var tweet = 'ランダムで' + select_num + '人選びました。（' + tweetText + '）';
        $('.s-tweet_button').attr('href', 'http://twitter.com/intent/tweet?url=https://okome-on-fire.github.io/random-mankai/more.html&text=' + tweet);
    });

    // 一人用
    $('.s-choose_button').on('click', function() {
        var random = Math.floor(Math.random() * 24);
        $('.s-result').text(nameList[random]);
        var tweet = '選ばれたのは「' + nameList[random] + '」です';
        $('.s-tweet_button').attr('href', 'http://twitter.com/intent/tweet?url=https://okome-on-fire.github.io/random-mankai/&text=' + tweet);
    });
});