let Max_HP = 20;        // 最大HP
let HP = Max_HP;        // 現在のHP
let stage = 0;          // 現在のステージ数
let size = 0;
let retry_flag = false  // リトライフラグ（true:リトライ、false:初回）
let tutorial_flag = false; // チュートリアルフラグ（true:チュートリアル、false:通常ゲーム）
let card_list_default = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6];
let card_list = card_list_default;
let card_list_used = [];



// ゲームのスタート画面の作成
const preparation = () => {
    const Width = window.innerWidth;        // {number}
    const Height = window.innerHeight;      // {number}

    // console.log("Width: " + Width);
    // console.log("Height: " + Height);

    // 画面の大きさに合わせて size を決定
    if (!retry_flag) {
        if ((Width / Height) < (16 / 9)) {
            // 画面の横幅が狭い場合 -> 画面全体を横に合わせる
            size = Width / 400;
        } else {
            // 画面の縦幅が狭い場合 -> 画面全体を縦に合わせる
            size = Height / 225;
        }
    }
    

    const mainField = document.getElementById("mainField");

    // mainFieldの中身を初期化
    mainField.innerHTML = "";

    // mainFieldの大きさを設定
    mainField.style.width = 400 * size + "px";
    mainField.style.height = 225 * size + "px";

    // スタートボタンの大きさ
    let start_button_width = 120;
    let start_button_height = 30;
    let start_button_font_size = 20;
    // スタートボタンの作成
    const start_button = document.createElement("div");
    start_button.type = "button";
    start_button.id = "start_button";
    start_button.style.fontSize = start_button_font_size * size + "px"
    //start_button.value = "Start!";
    start_button.style.position = "absolute";
    start_button.style.width = start_button_width * size + "px";
    start_button.style.height = start_button_height * size + "px";
    start_button.style.top = 130 * size + "px";
    start_button.style.left = (mainField.style.width.split("px")[0] - (start_button_width * size)) / 2 + "px";
    start_button.style.borderRadius = (Number(start_button.style.height.split("px")[0]) / 2) + "px";
    start_button.onclick = init;
    mainField.appendChild(start_button);
    // スタートボタンの中身
    const start_button_bg = document.createElement("span");
    start_button_bg.id = "start_button_bg";
    start_button_bg.style.borderRadius = (Number(start_button.style.height.split("px")[0]) / 2) + "px";
    start_button.appendChild(start_button_bg);
    const start_button_item = document.createElement("span");
    start_button_item.id = "start_button_item";
    start_button_item.style.borderRadius = (Number(start_button.style.height.split("px")[0]) / 2) + "px";
    start_button_item.innerText = "スタート！";
    start_button.appendChild(start_button_item);

    // チュートリアルボタンの大きさ
    let tutorial_button_width = 180;
    let tutorial_button_height = 30;
    let tutorial_button_font_size = 20;
    // チュートリアルボタンの作成
    const tutorial_button = document.createElement("div");
    tutorial_button.type = "button";
    tutorial_button.id = "tutorial_button";
    tutorial_button.style.fontSize = tutorial_button_font_size * size + "px";
    tutorial_button.value = "チュートリアル";
    tutorial_button.style.position = "absolute";
    tutorial_button.style.width = tutorial_button_width * size + "px";
    tutorial_button.style.height = tutorial_button_height * size + "px";
    tutorial_button.style.top = 175 * size + "px";
    tutorial_button.style.left = (mainField.style.width.split("px")[0] - (tutorial_button_width * size)) / 2 + "px";
    tutorial_button.style.borderRadius = (Number(tutorial_button.style.height.split("px")[0]) / 2) + "px";
    tutorial_button.onclick = tutorial;
    mainField.appendChild(tutorial_button);
    // チューリアルボタンの中身
    const tutorial_button_bg = document.createElement("span");
    tutorial_button_bg.id = "tutorial_button_bg";
    tutorial_button_bg.style.borderRadius = (Number(tutorial_button.style.height.split("px")[0]) / 2) + "px";
    tutorial_button.appendChild(tutorial_button_bg);
    const tutorial_button_item = document.createElement("span");
    tutorial_button_item.id = "tutorial_button_item";
    tutorial_button_item.style.borderRadius = (Number(tutorial_button.style.height.split("px")[0]) / 2) + "px";
    tutorial_button_item.innerText = "チュートリアル";
    tutorial_button.appendChild(tutorial_button_item);

    // 変数リセット
    stage = 0;
    card_list = card_list_default;
    card_list_used = [];
}

// チュートリアル
const tutorial = () => {
    // const size = document.getElementById("size").value;
    const mainField = document.getElementById("mainField");

    // mainFieldの中身を初期化
    mainField.innerHTML = "";

    tutorial_flag = true;

    mainField.classList.add("tutorial_1"); 
}

// ゲームの初期化関数
const init = () => {
    // リトライフラグを立てる
    retry_flag = true;

    // const size = document.getElementById("size").value;
    const mainField = document.getElementById("mainField");

    // 最大HPをセット
    if (!retry_flag) Max_HP = document.getElementById("HP_set").value;
    HP = Max_HP;

    // セッティング欄を空にする
    document.getElementById("setting").innerHTML = "";

    // プレイヤー情報をlocalStorageから取得
    // const player = JSON.parse(localStorage.getItem("player"));
    // Max_HP = Number(player.name);
    // HP = Max_HP;

    // card_listをシャッフル
    card_list = shuffleArray(card_list_default);

    // mainFieldの中身を初期化
    mainField.innerHTML = "";

    // 手札置き場の枠の大きさ
    let waku_width = 42;
    let waku_height = 63;
    // 手札置き場の作成
    for (let i = 0; i < 5; i++) {

        const card = document.createElement("div");
        card.id = "card_space_" + i;
        card.classList.add("card_space");
        card.classList.add("empty");
        card.style.width = waku_width * size + "px";
        card.style.height = waku_height * size + "px";
        card.style.top = mainField.style.height.split("px")[0] - (waku_height * size) + "px";
        card.style.left = (((mainField.style.width.split("px")[0] - (waku_width * 5 * size)) / 2) + (waku_width * size * i)) + "px";

        card.addEventListener("dragover", dragOver);    // カードがこの要素に重なっている
        card.addEventListener("dragenter", dragEnter);  // カードがこの要素の中に入った
        card.addEventListener("dragleave", dragLeave);  // カードがこの要素から離れた
        card.addEventListener("drop", dragDrop);        // カードをこの要素に置いた

        mainField.appendChild(card);
    }

    // 左下スペースの大きさ
    let ill_space_width = 80;
    let ill_space_height = 80;
    // 左下スペースの作成
    const ill_space = document.createElement("div");
    ill_space.id = "ill_space";
    ill_space.style.width = ill_space_width * size + "px";
    ill_space.style.height = ill_space_height * size + "px";
    ill_space.style.top = mainField.style.height.split("px")[0] - (ill_space_height * size) + "px";
    ill_space.style.left = "0px";
    mainField.appendChild(ill_space);
    // HPスペースの大きさ
    let HP_space_width = 40;
    let HP_space_heigth = 40;
    // HPスペースの作成
    const HP_space_ill = document.createElement("div");
    HP_space_ill.id = "HP_space_ill";
    HP_space_ill.style.width = HP_space_width * size + "px";
    HP_space_ill.style.height = HP_space_heigth * size + "px";
    HP_space_ill.style.top = Number(mainField.style.height.split("px")[0]) - (HP_space_heigth * size) + "px";
    HP_space_ill.style.left = Number(ill_space.style.width.split("px")[0]) - (HP_space_width * size) + "px";
    mainField.appendChild(HP_space_ill);
    const HP_space = document.createElement("div");
    HP_space.id = "HP_space";
    HP_space.style.width = HP_space_width * size + "px";
    HP_space.style.height = HP_space_heigth * (1 / 2) * size + "px";
    HP_space.style.top = (Number(mainField.style.height.split("px")[0]) - (HP_space_heigth * (7 / 9) * size)) + "px";
    HP_space.style.left = Number(ill_space.style.width.split("px")[0]) - (HP_space_width * size) + "px";
    HP_space.style.textAlign = "center";
    HP_space.style.fontSize = ((HP_space_heigth * size) * (2 / 5)) + "px";
    HP_space.innerText = HP;
    mainField.appendChild(HP_space);


    // カードイラストスペースの大きさ
    let card_ill_space_width = 50;
    let card_ill_space_height = 50;
    // カードイラストスペースの作成
    const card_ill_space = document.createElement("div");
    card_ill_space.id = "card_ill_space";
    card_ill_space.style.width = card_ill_space_width * size + "px";
    card_ill_space.style.height = card_ill_space_height * size + "px";
    card_ill_space.style.top = (mainField.style.height.split("px")[0] - ill_space.style.height.split("px")[0] - card_ill_space.style.height.split("px")[0]) + "px";
    card_ill_space.style.left = (ill_space.style.width.split("px")[0] - card_ill_space.style.width.split("px")[0]) / 2 + "px";
    mainField.appendChild(card_ill_space);

    // メニューボタンの大きさ
    let menu_button_width = 40;
    let menu_button_height = 40;
    let menu_button_top = 3;
    // メニューボタンの作成
    const menu_button = document.createElement("div");
    menu_button.id = "menu_button";
    menu_button.style.width = menu_button_width * size + "px";
    menu_button.style.height = menu_button_height * size + "px";
    menu_button.style.top = menu_button_top * size + "px";
    menu_button.style.left = menu_button_top * size + "px";
    menu_button.onclick = menu;
    mainField.appendChild(menu_button);

    // 敵を表示するスペースの大きさ
    let enemy_space_width = 70;
    let enemy_space_height = 100;
    let enemy_space_how = 3;        // 敵を表示するスペースの数
    let enemy_space_high = 10;      // 手札置き場より何ピクセル上に表示するか
    // 敵を表示するスペースの作成
    for (let i = 0; i < enemy_space_how; i++) {
        const enemy_space = document.createElement("div");
        enemy_space.id = "enemy_space_" + i;
        enemy_space.className = "enemyEmpty";
        enemy_space.style.width = enemy_space_width * size + "px";
        enemy_space.style.height = enemy_space_height * size + "px";
        enemy_space.style.top = (mainField.style.height.split("px")[0] - enemy_space.style.height.split("px")[0] - (waku_height * size) - (enemy_space_high * size)) + "px";
        enemy_space.style.left = (100 + (enemy_space_width * i)) * size + "px";

        enemy_space.addEventListener("dragover", enemySpaceDragOver);       // カードがこの要素に重なっている
        enemy_space.addEventListener("dragenter", enemySpaceDragEnter);     // カードがこの要素の中に入った
        enemy_space.addEventListener("dragleave", enemySpaceDragLeave);     // カードがこの要素から離れた
        enemy_space.addEventListener("drop", enemySpaceDragDrop);           // カードをこの要素に置いた

        mainField.appendChild(enemy_space);
    }
    // 敵のHPを表示するスペースの大きさ
    let enemy_HP_space_width = 20;
    let enemy_HP_space_height = 20;
    // 敵のHPを表示するスペースの作成
    for (let i = 0; i < enemy_space_how; i++) {
        const enemy_HP_space = document.createElement("div");
        enemy_HP_space.id = "enemy_HP_space_" + i;
        enemy_HP_space.classList.add("enemy_HP_space");
        enemy_HP_space.style.width = enemy_HP_space_width * size + "px";
        enemy_HP_space.style.height = enemy_HP_space_height * size + "px";
        const enemy_space = document.getElementById("enemy_space_" + i);
        enemy_HP_space.style.top = Number(enemy_space.style.top.split("px")[0]) + Number(enemy_space.style.height.split("px")[0]) - (enemy_HP_space_height * size) + "px";
        enemy_HP_space.style.left = Number(enemy_space.style.left.split("px")[0]) + Number(enemy_space.style.width.split("px")[0]) - (enemy_HP_space_width * size) + "px";
        enemy_HP_space.style.fontSize = (enemy_HP_space_height * (2 / 3)) * size + "px";
        enemy_HP_space.style.textAlign = "center";
        mainField.appendChild(enemy_HP_space);
    }

    // ターン終了ボタンの大きさ
    let turn_end_button_width = 50;
    let turn_end_button_height = 50;
    // ターン終了ボタンの作成
    const turn_end_button = document.createElement("div");
    turn_end_button.id = "turn_end_button";
    turn_end_button.style.width = turn_end_button_width * size + "px";
    turn_end_button.style.height = turn_end_button_height * size + "px";
    turn_end_button.style.top = (Number(mainField.style.height.split("px")[0]) - (turn_end_button_height * size)) / 2 + "px";
    turn_end_button.style.left = (Number(mainField.style.width.split("px")[0]) - (turn_end_button_width * size)) - (5 * size) + "px";
    turn_end_button.style.maxWidth = turn_end_button_width * size + "px";
    turn_end_button.fontSize = (turn_end_button_height * (2 / 5) * size) + "px";
    turn_end_button.innerText = "ターンを\n終了する";
    // turn_end_button.style.borderRadius = turn_end_button_width * size + "px";
    turn_end_button.onclick = turnEnd;
    mainField.appendChild(turn_end_button);





    // カードを引く
    draw_card();
    // 敵を配置
    setEnemy();
}

const draw_card = () => {
    // const size = document.getElementById("size").value;
    const mainField = document.getElementById("mainField");

    // ##表示するカードの作成
    // カードの初期位置（card_ill_space）の座標を取得
    const card_ill_space = document.getElementById("card_ill_space");
    const card_ill_space_width = Number(card_ill_space.style.width.split("px")[0]);
    const card_ill_space_height = Number(card_ill_space.style.height.split("px")[0]);
    const card_ill_space_top = Number(card_ill_space.style.top.split("px")[0]);
    const card_ill_space_left = Number(card_ill_space.style.left.split("px")[0]);
    // カードの作成
    for (let i = 0; i < 5; i++) {
        // カードの大きさ
        let card_width = 40;
        let card_height = 60;

        const card = document.createElement("div");
        card.id = "card_" + i;
        card.style.width = card_width * size + "px";
        card.style.height = card_height * size + "px";
        card.style.top = (card_ill_space_top + ((card_ill_space_height - (card_height * size)) / 2)) + "px";
        card.style.left = (card_ill_space_left + ((card_ill_space_width - (card_width * size)) / 2)) + "px";

        mainField.appendChild(card);

        // カードを置く位置（card_space）の座標を取得
        const card_space = document.getElementById("card_space_" + i);
        //const card_space_width = Number(card_space.style.width.split("px")[0]);
        //const card_space_height = Number(card_space.style.height.split("px")[0]);
        const card_space_top = Number(card_space.style.top.split("px")[0]);
        const card_space_left = Number(card_space.style.left.split("px")[0]);

        // 何秒(s)でcard_spaceまで移動するか
        let time = 0.18;
        time = time * (1 + (i * 0.05));  // ちょっと時間をばらけさせるための調整

        // 1回の処理処理ごとに動かす距離
        let move_distance_width = (card_space_left - Number(card.style.left.split("px")[0])) / (time * 1000);
        let move_distance_height = (card_space_top - Number(card.style.top.split("px")[0])) / (time * 1000);

        // カードをcard_spaceまで動かす
        const moveCard = setInterval(() => {
            card.style.top = (Number(card.style.top.split("px")[0]) + move_distance_height) + "px";
            card.style.left = (Number(card.style.left.split("px")[0]) + move_distance_width) + "px";

            // 移動を終了する
            if (Number(card.style.top.split("px")[0]) > card_space_top) {
                // 移動停止
                clearInterval(moveCard);
                // 動かしていたカードを削除する
                card.remove();

                // 新しくカードを作成
                const new_card = document.createElement("div");
                new_card.id = "card_" + i;
                // classをリセット
                new_card.className = "";
                // カードの種類の情報を入れる
                let card_type = card_list[0];
                new_card.classList.add("type_" + card_type);
                card_list.shift();

                new_card.draggable = "true";
                new_card.style.width = card_width * size + "px";
                new_card.style.height = card_height * size + "px";
                // new_card.style.top = (card_space_top + ((card_space.style.height.split("px")[0] - (card_height * size)) / 2)) + "px";
                // new_card.style.left = (card_space_left + ((card_space.style.width.split("px")[0] - (card_width * size)) / 2)) + "px";

                // ドラッグのトリガー
                new_card.addEventListener("dragstart", dragStart);
                new_card.addEventListener("dragend", dragEnd);

                // --- タッチのトリガー -----
                new_card.addEventListener("touchstart", touchStartCard);
                new_card.addEventListener("touchmove", touchMoveCard);
                new_card.addEventListener("touchend", touchEndCard);

                card_space.appendChild(new_card);
            }
        }, 1);
    }
}

// 敵の表示スペースに敵をセットする
const setEnemy = () => {
    // const size = document.getElementById("size").value;
    const mainField = document.getElementById("mainField");

    const enemy_space_0 = document.getElementById("enemy_space_0");
    const enemy_HP_space_0 = document.getElementById("enemy_HP_space_0");
    const enemy_space_1 = document.getElementById("enemy_space_1");
    const enemy_HP_space_1 = document.getElementById("enemy_HP_space_1");
    const enemy_space_2 = document.getElementById("enemy_space_2");
    const enemy_HP_space_2 = document.getElementById("enemy_HP_space_2");

    stage++;

    switch (stage) {
        case 1:
            // ステージ１の敵
            enemy_space_1.classList.add("1,10,10");
            enemy_space_1.classList.add("enemy_type01");
            enemy_HP_space_1.innerText = enemy_space_1.classList[1].split(",")[1];
            break;

        case 2:
            // ステージ２の敵
            enemy_space_0.classList.add("2,5,5");
            enemy_space_0.classList.add("enemy_type02");
            enemy_HP_space_0.innerText = enemy_space_0.classList[1].split(",")[1];

            enemy_space_1.classList.add("3,6,6");
            enemy_space_1.classList.add("enemy_type03-1");
            enemy_HP_space_1.innerText = enemy_space_1.classList[1].split(",")[1];
            break;

        case 3:
            // ステージ３の敵
            enemy_space_0.classList.add("4,5,5");
            enemy_space_0.classList.add("enemy_type04");
            enemy_HP_space_0.innerText = enemy_space_0.classList[1].split(",")[1];

            enemy_space_1.classList.add("4,5,5");
            enemy_space_1.classList.add("enemy_type04");
            enemy_HP_space_1.innerText = enemy_space_1.classList[1].split(",")[1];

            enemy_space_2.classList.add("4,5,5");
            enemy_space_2.classList.add("enemy_type04");
            enemy_HP_space_2.innerText = enemy_space_2.classList[1].split(",")[1];
            break;

        case 4:
            // ステージ４の敵
            enemy_space_0.classList.add("5,10,10");
            enemy_space_0.classList.add("enemy_type05");
            enemy_HP_space_0.innerText = enemy_space_0.classList[1].split(",")[1];

            enemy_space_1.classList.add("5,10,10");
            enemy_space_1.classList.add("enemy_type05");
            enemy_HP_space_1.innerText = enemy_space_1.classList[1].split(",")[1];
            break;
        
        case 5:
            // ステージ５の敵（ボス）
            enemy_space_1.classList.add("6,30,30");
            enemy_space_1.classList.add("enemy_type06-1");
            enemy_HP_space_1.innerText = enemy_space_1.classList[1].split(",")[1];
            break;

        default:
            gameClear();
            break;
    }
}

// メニュー
const menu = () => {

}

/**
 * カードを使った時の処理
 * @param {*} enemySpace 
 * @param {*} cardType 
 */
const useCard = (enemySpace_num, cardType_num) => {
    // const card = document.querySelector(".usingCard");
    const enemy_space = document.getElementById("enemy_space_" + enemySpace_num);
    const enemy_HP_space = document.getElementById("enemy_HP_space_" + enemySpace_num);

    const enemy_type = Number(enemy_space.classList[1].split(",")[0]);
    const enemy_MaxHP = Number(enemy_space.classList[1].split(",")[1]);
    const enemy_HP = Number(enemy_space.classList[1].split(",")[2]);

    // card_list_usedに使ったカードを登録する
    card_list_used.push(cardType_num);


    // console.log(enemy_space);
    // console.log(enemy_HP_space);
    // console.log(enemy_type);
    // console.log(enemy_MaxHP);
    // console.log(enemy_HP);

    let damage;
    let count;
    let list = [];

    switch (cardType_num) {
        case 1:
            if (HP % 2 == 0) {
                enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - 4)));
                enemy_HP_space.innerText = enemy_HP - 4;
            } else {
                enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - 2)));
                enemy_HP_space.innerText = enemy_HP - 2;
            }
            break;

        case 2:
            if (HP % 2 == 1) {
                enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - 2)));
                enemy_HP_space.innerText = enemy_HP - 2;
                HP += 2;
                if (HP > Max_HP) HP = Max_HP;
                document.getElementById("HP_space").innerText = HP;
            } else {
                enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - 1)));
                enemy_HP_space.innerText = enemy_HP - 1;
                HP += 1;
                if (HP > Max_HP) HP = Max_HP;
                document.getElementById("HP_space").innerText = HP;
            }
            break;

        case 3:
            damage = Max_HP - HP;
            enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - damage)));
            enemy_HP_space.innerText = enemy_HP - damage;
            break;

        case 4:
            damage = Math.ceil(HP * 0.25);
            enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - damage)));
            enemy_HP_space.innerText = enemy_HP - damage;
            break;

        case 5:
            count = 0;
            list = [];
            // 敵がいる位置を取得
            for (let i = 0; i < 3; i++) {
                if (document.getElementById("enemy_space_" + i).classList[1] != null) {
                    count++;
                    list.push(i);
                }
            }

            // 全ての敵に対して処理
            for (let i = 0; i < list.length; i++) {
                const list_enemy_space = document.getElementById("enemy_space_" + list[i]);
                const list_enemy_HP_space = document.getElementById("enemy_HP_space_" + list[i]);
                const list_enemy_type = Number(list_enemy_space.classList[1].split(",")[0]);
                const list_enemy_MaxHP = Number(list_enemy_space.classList[1].split(",")[1]);
                const list_enemy_HP = Number(list_enemy_space.classList[1].split(",")[2]);

                list_enemy_space.classList.replace((list_enemy_type + "," + list_enemy_MaxHP + "," + list_enemy_HP), (list_enemy_type + "," + list_enemy_MaxHP + "," + (list_enemy_HP - 5)));
                list_enemy_HP_space.innerText = list_enemy_HP - 5;
            }

            // 自身のHPの処理
            if (HP >= (Max_HP * 0.5)) {
                HP -= 5;
            } else {
                HP -= 2;
            }
            if (HP <= 0) HP = 1;
            document.getElementById("HP_space").innerText = HP;
            break;

        case 6:
            damage = Math.ceil(HP * 0.5);
            enemy_space.classList.replace((enemy_type + "," + enemy_MaxHP + "," + enemy_HP), (enemy_type + "," + enemy_MaxHP + "," + (enemy_HP - damage)));
            enemy_HP_space.innerText = enemy_HP - damage;

            HP -= 2;
            if (HP <= 0) HP = 1;
            document.getElementById("HP_space").innerText = HP;
            break;
    }

    // enemy03-1のHPが半分以下になったらenemy03-2に変更
    if (document.querySelector(".enemy_type03-1")) {
        let enemy03 = document.querySelector(".enemy_type03-1");

        if (Number(enemy03.classList[1].split(",")[2]) <= (Number(enemy03.classList[1].split(",")[1]) / 2)) {
            enemy03.classList.replace("enemy_type03-1", "enemy_type03-2");
        }
    }

    // enemy06-1のHPが2/3以下になったらenemy06-2に変更
    if (document.querySelector(".enemy_type06-1")) {
        let enemy06 = document.querySelector(".enemy_type06-1");

        if (Number(enemy06.classList[1].split(",")[2]) <= (Number(enemy06.classList[1].split(",")[1]) * (2 / 3))) {
            enemy06.classList.replace("enemy_type06-1", "enemy_type06-2");
        }
    }

    // enemy06-2のHPが1/3以下になったらenemy06-3に変更
    if (document.querySelector(".enemy_type06-2")) {
        let enemy06 = document.querySelector(".enemy_type06-2");

        if (Number(enemy06.classList[1].split(",")[2]) <= (Number(enemy06.classList[1].split(",")[1]) / 3)) {
            enemy06.classList.replace("enemy_type06-2", "enemy_type06-3");
        }
    }

    // 敵のHPが０以下になった
    count = 0;
    list = [];
    for (let i = 0; i < 3; i++) {
        if (document.getElementById("enemy_space_" + i).classList[1] != null) {
            count++;
            list.push(i);
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(',')[2]) <= 0) {
            document.getElementById("enemy_space_" + list[i]).classList.remove(document.getElementById("enemy_space_" + list[i]).classList[2]);
            document.getElementById("enemy_space_" + list[i]).classList.remove(document.getElementById("enemy_space_" + list[i]).classList[1]);
            document.getElementById("enemy_HP_space_" + list[i]).innerText = "";
        }
    }

    // enemy_spaceのclassを「enemyTarget->enemyEmpty」に変更
    enemy_space.classList.replace("enemyTarget", "enemyEmpty");

    // 
    count = 0;
    for (let i = 0; i < 3; i++) if (document.getElementById("enemy_space_" + i).classList[1] != null) count++;
    // 全ての敵を倒した
    if (count == 0) {
        // 敵を配置
        setEnemy();
        // ターンエンド
        turnEnd(false);
    }
}


/**
 * 敵の攻撃
 */
const enemyAttack = () => {
    let count = 0;
    let list = [];

    for (let i = 0; i < 3; i++) {
        if (document.getElementById("enemy_space_" + i).classList[1] != null) {
            count++;
            list.push(i);
        }
    }

    for (let i = 0; i < count; i++) {
        let enemy_type = Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[0]);

        switch (enemy_type) {
            case 1:
                HP -= 2;
                document.getElementById("HP_space").innerText = HP;
                break;

            case 2:
                HP -= 1;
                document.getElementById("HP_space").innerText = HP;
                break;

            case 3:
                // 敵のHPが最大HPの半分以下ならダメージを3倍
                if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[2]) <= (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[1]) / 2)) {
                    HP -= 3;
                } else {
                    HP -= 1;
                }
                document.getElementById("HP_space").innerText = HP;
                break;

            case 4:
                if (count == 1) HP -= 4;
                else if (count == 2) HP -= 2;
                else if (count == 3) HP -= 1;
                document.getElementById("HP_space").innerText = HP;
                break;

            case 5:
                // if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[2]) <= (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[1]) / 3)) {
                //     HP -= 3;
                // } else if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[2]) <= (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[1]) * (2 / 3))) {
                //     HP -= 2;
                // } else {
                //     HP -= 1;
                // }

                HP -= 3;
                document.getElementById("HP_space").innerText = HP;
                break;

            case 6:
                // enemy_spaceのHPが最大HPの1/3以下ならダメージを8、2/3以下ならダメージを4、それ以外はダメージを2
                if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[2]) <= (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[1]) / 3)) {
                    HP -= 8;
                } else if (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[2]) <= (Number(document.getElementById("enemy_space_" + list[i]).classList[1].split(",")[1]) * (2 / 3))){
                    HP -= 4;
                } else {
                    HP -= 2;
                }
                document.getElementById("HP_space").innerText = HP;
                break;

            default:
                HP -= 2;
                document.getElementById("HP_space").innerText = HP;
                break;
        }
    }

    // 自身のHPが０以下になった（->ゲームオーバー）
    if (HP <= 0) gameOver();
}


/**
 * ターンエンド
 */
const turnEnd = (finish = true) => {
    let count = 0;
    let list = [];
    for (let i = 0; i < 5;  i++) {
        if (document.getElementById("card_" + i)) {
            count++;
            list.push(i);
        }
    }

    // 使わなかったカードをcard_listに戻す
    for (let i = 0; i < count; i++) card_list.push(Number(document.getElementById("card_" + list[i]).classList[0].split("_")[1]));
    // 使わなかったカードを消去する
    for (let i = 0; i < count; i++) document.getElementById("card_" + list[i]).remove();
    // card_listをシャッフル
    card_list = shuffleArray(card_list_default);
    // カードを引く
    if (stage <= 5) draw_card();

    // 敵の攻撃
    if (finish) enemyAttack();
}


/**
 * ゲームオーバー時の処理
 */
const gameOver = () => {
    const mainField = document.getElementById("mainField");

    // mainFieldを空にする
    mainField.innerHTML = "";

    mainField.innerText = "gameOver!";

    // リトライボタンの大きさ
    let retry_button_width = 200;
    let retry_button_height = 40;
    // リトライボタンの作成
    const retry_button = document.createElement("div");
    retry_button.id = "retry_button";
    retry_button.style.width = retry_button_width * size + "px";
    retry_button.style.height = retry_button_height * size + "px";
    retry_button.style.top = (Number(mainField.style.height.split("px")[0]) * (2 / 3)) + "px";
    retry_button.style.left = (Number(mainField.style.width.split("px")[0]) / 2) - (retry_button_width * size / 2) + "px";
    retry_button.onclick = preparation;
    retry_button.style.fontSize = retry_button_height * (2 / 3) * size + "px";
    retry_button.innerText = "リトライする";
    mainField.appendChild(retry_button);
}

/**
 * ゲームクリア時の処理
 */
const gameClear = () => {
    const mainField = document.getElementById("mainField");

    // mainFieldを空にする
    mainField.innerHTML = "";

    mainField.innerText = "gameClear!";


    // ホーム画面に戻るボタンの大きさ
    let home_button_width = 200;
    let home_button_height = 40;
    // ホーム画面に戻るボタンの作成
    const home_button = document.createElement("div");
    home_button.id = "home_button";
    home_button.style.width = home_button_width * size + "px";
    home_button.style.height = home_button_height * size + "px";
    home_button.style.top = (Number(mainField.style.height.split("px")[0]) * (2 / 3)) + "px";
    home_button.style.left = (Number(mainField.style.width.split("px")[0]) / 2) - (home_button_width * size / 2) + "px";
    // home_button.onclick = () => {
    //     location.href = "../index.html";
    // };
    home_button.style.fontSize = home_button_height * (2 / 3) * size + "px";
    home_button.innerText = "ホーム画面に戻る";
    mainField.appendChild(home_button);
}


/**
 * 配列の中身をランダムに並び替える
 * 
 * @param {*} array 
 * @returns 
 */
const shuffleArray = (array) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i]
      cloneArray[i] = cloneArray[rand]
      cloneArray[rand] = tmpStorage
    }

    return cloneArray;
}

// ドラッグ関数
// カードに対しての処理
// カードのドラッグを始めた
const dragStart = event => {
    const card = event.target;
    // console.log("start");

    card.classList.add("hold");
}

// カードを離した
const dragEnd = event => {
    const card = event.target;
    // console.log("end");
}

// 手札置き場に対しての処理
function dragOver(e) {
    e.preventDefault();
    // console.log("over");
}

function dragEnter() {
    // console.log("enter");
    // this.className += " hovered";
}

function dragLeave() {
    // console.log("leave");
    // this.className = "empty";
}

function dragDrop() {
    // console.log("drop");
    // this.className = "empty";
    

    const card = document.querySelector(".hold");
    card.classList.remove("hold");
}

// 敵の表示スペースに対しての処理
// カードがこの要素に重なっている
const enemySpaceDragOver = event => {
    event.preventDefault();
    // const enemy_space = event.target;
    // console.log("Eover");
}

// ドラッグしているカードがこの要素に入った
const enemySpaceDragEnter = event => {
    const enemy_space = event.target;
    // console.log("Eenter");

    // classを「enemyEmpty->enemyHovered」に変更
    enemy_space.classList.replace("enemyEmpty", "enemyHovered");
}

// ドラッグしているカードがこの要素を離れた
const enemySpaceDragLeave = event => {
    const enemy_space = event.target;
    // console.log("Eleave");

    // classを「enemyHovered->enemyEmpty」に変更
    enemy_space.classList.replace("enemyHovered", "enemyEmpty");
}

// カードがこの要素に対してドロップされた
const enemySpaceDragDrop = event => {
    const enemy_space = event.target;
    // console.log("Edrop");

    const card = document.querySelector(".hold");

    if (enemy_space.classList[1] != null) {
        // classを「enemyHovered->enemyTarget」に変更
        enemy_space.classList.replace("enemyHovered", "enemyTarget");
    
        // カードのオブジェクトを削除する
        let card_type = card.classList[0].split("_")[1];
        card.remove();
    
        // カードを使う
        useCard(Number(enemy_space.id.split("_")[2]), Number(card_type));
    } else {
        card.classList.remove("hold");
    }
}


// 画面のサイズ変更
const changeSize = () => {
    if (confirm("画面のサイズを変更すると、ゲームの内容がリセットされます。よろしいですか？")) {
        preparation();
    }
}


const play = () => {
    size = 1.5;
    // Max_HP = document.getElementById("HP_set").value;
    retry_flag = true;

    document.getElementById("setting").innerHTML = "";

    preparation();
}



// キー入力
document.addEventListener('keypress', event => {
    switch (event.keyCode) {
        case 13:        // Enterキー
            if (tutorial_flag) {
                const mainField = document.getElementById("mainField");

                if (mainField.classList.contains("tutorial_1")) mainField.classList.replace("tutorial_1", "tutorial_2");
                else if (mainField.classList.contains("tutorial_2")) mainField.classList.replace("tutorial_2", "tutorial_3");
                else if (mainField.classList.contains("tutorial_3")) mainField.classList.replace("tutorial_3", "tutorial_4");
                else if (mainField.classList.contains("tutorial_4")) mainField.classList.replace("tutorial_4", "tutorial_5");
                else if (mainField.classList.contains("tutorial_5")) mainField.classList.replace("tutorial_5", "tutorial_6");
                else if (mainField.classList.contains("tutorial_6")) {
                    mainField.innerHTML = "";
                    mainField.className = "";
                    tutorial_flag = false;
                    preparation();
                }
            }
            break;
    }
});




// --- スマホ対応：タッチ操作によるカード移動 ---

function touchStartCard(event) {
    const card = event.target;
    card.classList.add("hold");

    // 最初のタッチ位置を記録
    card.touchStartX = event.touches[0].clientX;
    card.touchStartY = event.touches[0].clientY;

    // 初期位置の offset も記録
    card.offsetLeftStart = card.getBoundingClientRect().left;
    card.offsetTopStart = card.getBoundingClientRect().top;
}

function touchMoveCard(event) {
    event.preventDefault(); // スクロールを止める

    const card = event.target;
    const moveX = event.touches[0].clientX - card.touchStartX;
    const moveY = event.touches[0].clientY - card.touchStartY;

    // transform を使ってスムーズに移動
    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
}

function touchEndCard(event) {
    const card = event.target;
    card.classList.remove("hold");

    // transform をリセット
    card.style.transform = "";

    // タッチ位置を取得
    const touchX = event.changedTouches[0].clientX;
    const touchY = event.changedTouches[0].clientY;

    // 敵スペースとの当たり判定
    for (let i = 0; i < 3; i++) {
        const enemy_space = document.getElementById("enemy_space_" + i);
        if (enemy_space.classList[1] != null) {
            const rect = enemy_space.getBoundingClientRect();
            if (
                touchX >= rect.left &&
                touchX <= rect.right &&
                touchY >= rect.top &&
                touchY <= rect.bottom
            ) {
                // 成功した場合、カードを使う
                enemy_space.classList.replace("enemyEmpty", "enemyTarget");

                const card_type = card.classList[0].split("_")[1];
                card.remove();

                useCard(Number(enemy_space.id.split("_")[2]), Number(card_type));
                return;
            }
        }
    }

    // 失敗（敵にドロップされなかった場合） → カードを元に戻すだけ
}