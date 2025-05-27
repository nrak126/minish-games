// 画面切り替え
function showScreen(name) {
    document.getElementById("title-screen").classList.remove("active");
    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("result-screen").classList.remove("active");

    document.getElementById(name + "-screen").classList.add("active");

}


// シリンダーを回す音（確率が変わるわけではない）
function spinCylinder() {
    console.log("シリンダーを回す");
    // ボタンをクリックでサウンドを追加
    document.getElementById('spin-sound').currentTime = 0;
    document.getElementById('spin-sound').play();
}


let currentTurn = 1;
//  let luck = 50; // ステータスluckの仮設定
const player = JSON.parse(localStorage.getItem("player"));
let luck = player ? player.luck : 50; // ← ここでlocalStorageから取得

let bulletFires = false; // false: セーフ, true: アウト
let gameflag = 0; // 0: 自分の勝ち, 1: 自分の負け

// 番の表示
function showTurn() {
    if (currentTurn % 2 === 1) {
	document.getElementById("turn-indicator").textContent = "自分の番";
    } else {
	document.getElementById("turn-indicator").textContent = "相手の番";
    }
}


// トリガーを引くロジック
function pullTrigger() {
    const rand = Math.random();

    if (currentTurn === 6) {
	document.getElementById("turn-indicator").textContent = "相手の番";
	bulletFires = true;
    } else if (currentTurn % 2 === 1) {
        document.getElementById("turn-indicator").textContent = "相手の番";
	if (luck === 100) {
	    bulletFires = false;
	} else if (luck >= 50) {
	    bulletFires = rand < 0.05; // 5%
	} else if (luck >= 30) {
	    bulletFires = rand < 0.15; // 15%
	} else {
	    bulletFires = rand < (1 / 6); // 約16.7%
	}
    } else {
	document.getElementById("turn-indicator").textContent = "自分の番";
	bulletFires = rand < (1 / 6) // 約16.7%
    }

    if (bulletFires) {
	document.getElementById('shot-sound').currentTime = 0;
	document.getElementById('shot-sound').play();
	// 弾が発射されたら、勝ち負けをフラグにする＆for文終了&リザルト画面へ移動
	if (currentTurn % 2 === 0) {
	    gameflag = 0;
	    document.getElementById("result-message").textContent = "勝利";
	} else {
	    gameflag = 1;
	    document.getElementById("result-message").textContent = "敗北";
	}
	showScreen("result");
	return;
	
    } else {
	document.getElementById('airShot-sound').currentTime = 0;
	document.getElementById('airShot-sound').play();
	currentTurn++;
    }

}

function restartGame() {
    if (gameflag === 0) { // 勝ち
	currentTurn = 1;
	gameflag = 0
	showScreen("title");

    } else { // 負け
	currentTurn = 1;
	gameflag = 0
	showScreen("title");
    }
}


