$(function() {
    var dataJson = $.getJSON('https://raw.githubusercontent.com/okome-on-fire/random-liver/main/data.json');
    const allMembers = [];
    const excluded = [];

    // チェックボックス表示
    dataJson.done(function(dataList) {
        const groups = dataList[0]; // JSONの最初のオブジェクトを取得
        const optionContainer = $('.optionCheck_area');
        // jpのチェックリスト作る
        $.each(groups, function(groupName, members) {
            const groupHeader = $('<p class="optionCheck_head">').text(groupName);
            const memberList = $('<ul class="optionCheck_list">');

            $.each(members, function(_, member) {
                const checkbox = $('<input>').attr('type', 'checkbox');
                const label = $('<label>').text(member.name).prepend(checkbox);
                const listItem = $('<li class="optionCheck_item">').append(label);
                memberList.append(listItem);
                allMembers.push(members);
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

    // チェックされたメンバー名を表示するボタン
    $('#get-checked').on('click', function() {
        const selectedList = $('.checkName_list');
        selectedList.empty(); // 前回の表示をクリア

        excluded.length = 0; // クリック時に初期化
        $('.optionCheck_area input[type="checkbox"]:checked').each(function() {
            const name = $(this).parent('label').text();
            selectedList.append($('<li>').text(name));
            excluded.push(name);
        });
    });

    let availableMembers = []; // 抽選対象
    let assignedMembers = [];  // 抽選済み
    let currentTeamIndex = 0;  // 次に振り分けるチーム番号

    // チーム数が変更されたらチームブロックを作成
    $('#team-count').on('change', function() {
        const teamCount = parseInt($(this).val());
        const resultArea = $('#team-result');
        resultArea.empty();
        currentTeamIndex = 0;
        assignedMembers = [];

        for (let i = 0; i < teamCount; i++) {
            const widthPercent = Math.floor(100 / teamCount); // 例：3チームなら33%
            const teamDiv = $(`
                <div class="team-block team-color-${i}" data-team="${i}" style="width: ${widthPercent}%;">
                    <h3>チーム${i + 1} <span class="team-count">(0人)</span></h3>
                    <ul class="team-list"></ul>
                </div>
            `);
            resultArea.append(teamDiv);
        }
    });

    // 抽選ボタンで1人ずつ振り分け
    $('.clickChoose_btn').on('click', function() {
        // 除外されていないメンバーを取得
        availableMembers = [];
        $('.optionCheck_area input[type="checkbox"]').each(function() {
            const name = $(this).parent('label').text();
            if (!$(this).is(':checked')) {
                availableMembers.push(name);
            }
        });

        const remaining = availableMembers.filter(name => !assignedMembers.includes(name));
        if (remaining.length === 0) {
            alert('すべてのメンバーが振り分け済みです');
            return;
        }

        const chosen = remaining[Math.floor(Math.random() * remaining.length)];
        assignedMembers.push(chosen);

        const teamBlock = $(`.team-block[data-team="${currentTeamIndex}"]`);
        const li = $('<li>').text(chosen).addClass('highlighted');
        teamBlock.find('.team-list').append(li);

        // 人数を更新
        const count = teamBlock.find('.team-list li').length;
        teamBlock.find('.team-count').text(`(${count}人)`);

        // 抽選結果を画面に表示
        $('.result-name .name').text(`${chosen}`);

        // 次のチームへ（ラウンドロビン）
        const teamCount = parseInt($('#team-count').val());
        currentTeamIndex = (currentTeamIndex + 1) % teamCount;
    });
});


// 動きの部分
$(function() {
    $(document).on('click', '.optionCheck_head', function () {
        console.log('click');
        $(this).next('.optionCheck_list').slideToggle(200);
        $(this).toggleClass('is-open');
    });
    $('#clear-exclusions').on('click', function() {
        $('.optionCheck_area input[type="checkbox"]').prop('checked', false);
    });
    $(document).on('click', '.check-group', function() {
        const groupClass = $(this).data('group'); // jp, en, kr
        $(`.optionCheck_list.${groupClass} input[type="checkbox"]`).prop('checked', true);
    });
});