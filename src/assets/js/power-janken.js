let isGameOver = false;
let animationInterval;
let pushCount = 0;
let requiredPushes = 20;  // デフォルトの連打回数
let canPush = false;  // スペースキーによる連打が可能かどうか
let lastPushTime = 0;  // 最後に押した時間
let pushTimer = null;  // 5秒のタイマー
let pushStartTime = 0;  // 連打開始時間
const TIME_LIMIT = 5000;  // 5秒（ミリ秒）
let timeUpdateInterval = null;  // 残り時間更新用のインターバル

// プレイヤーのパワーに応じて必要な連打回数を計算
function calculateRequiredPushes() {
    const playerData = JSON.parse(localStorage.getItem('player') || '{"power": 0}');
    const power = playerData.power || 0;
    // パワーが0の場合は50回、100の場合は3回になるように線形で計算
    return Math.round(50 - (power / 100 * 47));
}

const hands = ['✊', '✌️', '✋'];

// スペースキーのイベントリスナーを追加
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && canPush) {
        event.preventDefault(); // スペースキーによるスクロールを防止
        const currentTime = Date.now();
        // 前回の押下から50ms以上経過している場合のみカウント
        if (currentTime - lastPushTime >= 50) {
            handlePushButton();
            lastPushTime = currentTime;
        }
    }
});
let currentHandIndex = 0;

function updateComputerHand() {
    const computerHand = document.getElementById('computer-hand');
    computerHand.textContent = hands[currentHandIndex];
    currentHandIndex = (currentHandIndex + 1) % hands.length;
}

function startHandAnimation() {
    animationInterval = setInterval(updateComputerHand, 100);
}

function stopHandAnimation() {
    clearInterval(animationInterval);
}

function playHand(playerHand) {
    if (isGameOver) return;
    
    stopHandAnimation();
    const computerHand = document.getElementById('computer-hand');
    const playerHandElement = document.getElementById('player-hand');
    const resultMessage = document.getElementById('result-message');
    const pushInstruction = document.getElementById('push-instruction');
    
    // プレイヤーは必ず負ける
    let winningHand;
    if (playerHand === '✊') winningHand = '✋';
    else if (playerHand === '✌️') winningHand = '✊';
    else winningHand = '✌️';
    
    computerHand.textContent = winningHand;
    computerHand.classList.add('enlarged');
    playerHandElement.textContent = playerHand;  // プレイヤーの手を表示
    
    // アニメーション終了後にクラスを削除
    setTimeout(() => {
        computerHand.classList.remove('enlarged');
    }, 300);
    requiredPushes = calculateRequiredPushes();
    const playerData = JSON.parse(localStorage.getItem('player') || '{"power": 0}');
    resultMessage.textContent = `負けた！連打で逆転しろ！(必要回数: ${requiredPushes}回, パワー: ${playerData.power})`;
    pushInstruction.style.display = 'block';
    isGameOver = true;
    canPush = true;  // スペースキーによる連打を有効化
    
    // 連打開始時間を設定
    pushStartTime = Date.now();
    
    // 残り時間の更新を開始
    if (timeUpdateInterval) clearInterval(timeUpdateInterval);
    timeUpdateInterval = setInterval(updateTimeDisplay, 100);
    
    // 5秒のタイマーをスタート
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
        if (canPush) {  // まだ決着がついていない場合
            resultMessage.textContent = '時間切れ...完敗😇';
            pushInstruction.style.display = 'none';
            canPush = false;
            // 敗北時のアニメーション
            document.getElementById('player-hand').style.transform = 'scale(0.5)';
            document.getElementById('computer-hand').style.transform = 'scale(2.0)';
            if (timeUpdateInterval) {
                clearInterval(timeUpdateInterval);
                timeUpdateInterval = null;
            }
        }
    }, TIME_LIMIT);
}

function updateTimeDisplay() {
    if (!canPush) return;
    const elapsed = Date.now() - pushStartTime;
    const remaining = Math.max(0, (TIME_LIMIT - elapsed) / 1000).toFixed(1);
    const pushInstruction = document.getElementById('push-instruction');
    pushInstruction.textContent = `スペースキーを連打！(残り${remaining}秒)`;
}

function handlePushButton() {
    if (!isGameOver || !canPush) return;
    
    pushCount++;
    const resultMessage = document.getElementById('result-message');
    const playerHand = document.getElementById('player-hand');
    const computerHand = document.getElementById('computer-hand');
    
    // 連打に応じて手を大きくする（1.0から最大1.5倍まで）
    const scale = 1 + (pushCount / requiredPushes * 0.5);
    playerHand.style.transform = `scale(${scale})`;
    
    resultMessage.textContent = `連打カウント: ${pushCount}/${requiredPushes}`;
    
    if (pushCount >= requiredPushes) {
        resultMessage.textContent = '逆転勝利！おめでとう！😎';
        document.getElementById('push-instruction').style.display = 'none';
        canPush = false;
        // 勝利時のアニメーション
        playerHand.style.transform = 'scale(2.0)';
        computerHand.style.transform = 'scale(0.5)';
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }
        clearTimeout(pushTimer);  // タイマーをクリア
        pushTimer = null;
    }
}

function resetGame() {
    isGameOver = false;
    pushCount = 0;
    canPush = false;
    if (pushTimer) {
        clearTimeout(pushTimer);
        pushTimer = null;
    }
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
        timeUpdateInterval = null;
    }
    requiredPushes = calculateRequiredPushes(); // 必要な連打回数を再計算
    // プレイヤーとコンピュータの手をリセット
    const playerHand = document.getElementById('player-hand');
    const computerHand = document.getElementById('computer-hand');
    playerHand.style.transform = 'scale(1.0)';
    computerHand.style.transform = 'scale(1.0)';
    playerHand.textContent = '';
    document.getElementById('result-message').textContent = '';
    document.getElementById('push-instruction').style.display = 'none';
    startHandAnimation();
}

// ゲーム開始時にアニメーションを開始
window.onload = () => {
    startHandAnimation();
};
