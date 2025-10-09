$(function() {
    var dataJson = $.getJSON('https://raw.githubusercontent.com/okome-on-fire/random-liver/main/data.json');
    // チェックボックス表示
    dataJson.done(function(dataList) {
        console.log('aaa');

        const groups = dataList[0]; // JSONの最初のオブジェクトを取得
        const optionContainer = $('.optionCheck_area');
        // jpのチェックリスト作る
        $.each(groups, function(groupName, members) {
            console.log(groupName);
            const groupHeader = $('<p class="optionCheck_head">').text(groupName);
            const memberList = $('<ul class="optionCheck_list">');
            let groupClass = '';

            $.each(members, function(_, member) {
                memberList.append($('<li class="optionCheck_item">').text(member.name));
            });
            switch (groupName) {
                case 'にじさんじ':
                    memberList.addClass('jp');
                    break;
                case 'にじさんじEN':
                    memberList.addClass('en');
                    break;
                case 'にじさんじKR':
                    memberList.addClass('kr');
                    break;
            }
            optionContainer.append(groupHeader).append(memberList);
        });
    });

});

// 動きの部分
$(function() {

});