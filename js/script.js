document.addEventListener("DOMContentLoaded", () => {

  let data = {};
  let selectedGroups = new Set();

  fetch("https://raw.githubusercontent.com/okome-on-fire/random-liver/main/data.json")
    .then(res => res.json())
    .then(json => {
      data = json[0];
      createGroupCheckboxes();
    });

  function createGroupCheckboxes() {
    const groupArea = document.getElementById("groupArea");

    const ul = document.createElement("ul");
    ul.classList.add("group-list");

    Object.keys(data).forEach(group => {
      const li = document.createElement("li");

      li.innerHTML = `
        <label>
          <input type="checkbox" class="groupCheck" value="${group}">
          ${group}
        </label>
      `;

      ul.appendChild(li);
    });

    groupArea.appendChild(ul);

    // グループ選択時のイベント
    document.querySelectorAll(".groupCheck").forEach(cb => {
      cb.addEventListener("change", updateMembers);
    });
  }


  function updateMembers() {
    const memberArea = document.getElementById("memberArea");
    memberArea.innerHTML = "";

    selectedGroups = new Set(
      [...document.querySelectorAll(".groupCheck:checked")].map(cb => cb.value)
    );

    selectedGroups.forEach(group => {
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("member-group");

      const title = document.createElement("h3");
      title.textContent = group;

      // ★ クリックで開閉
      title.addEventListener("click", () => {
        groupDiv.classList.toggle("open");
      });

      groupDiv.appendChild(title);

      const ul = document.createElement("ul");

      data[group].forEach(person => {
        const li = document.createElement("li");
        li.innerHTML = `
          <label>
            <input type="checkbox" class="memberCheck" value="${person.name}" checked>
            ${person.name}
          </label>
        `;
        ul.appendChild(li);
      });

      groupDiv.appendChild(ul);
      memberArea.appendChild(groupDiv);
    });
  }


  // 当選者名を保存する変数
  let lastWinner = null;

  // 抽選ボタン
  document.getElementById("pickBtn").addEventListener("click", () => {
    const checkedMembers = [...document.querySelectorAll(".memberCheck:checked")]
      .map(cb => cb.value);

    if (checkedMembers.length === 0) {
      alert("抽選対象がいません");
      return;
    }

    const randomIndex = Math.floor(Math.random() * checkedMembers.length);
    const winner = checkedMembers[randomIndex];

    lastWinner = winner; // ← 投稿用に保存

    document.getElementById("result").textContent = `${winner}`;
  });

  // X に投稿
  document.getElementById("tweetBtn").addEventListener("click", () => {
    if (!lastWinner) {
      alert("まだ抽選していません");
      return;
    }

    const text = `【ランダムライバーおえかき修行】\nお題：${lastWinner}\n${location.href}\n`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  });

});
