const GAS_URL = 'https://script.google.com/macros/s/AKfycbwQeT23k9_zhok50t7rHWKhRJEzWcYRc-cLL3bUhXO_N9iclw8l_QETgWFczacOihBMfQ/exec';
let loggedInUser = { id: "", name: "" };

// ログイン処理
document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const pass = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    const res = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'login', studentId: id, password: pass })
    });
    const data = await res.json();

    if (data.result === "success") {
        loggedInUser = { id: id, name: data.userName };
        document.getElementById('currentUserName').textContent = data.userName; // 名前を表示
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainApp').classList.remove('hidden');
    } else {
        errorDiv.textContent = data.message;
        errorDiv.classList.remove('hidden');
    }
};

// 保存処理
document.getElementById('journalForm').onsubmit = async (e) => {
    e.preventDefault();
    const payload = {
        type: 'save',
        studentId: loggedInUser.id,
        studentName: loggedInUser.name, // ログイン時に取得した名前をそのまま使用
        // ... その他のフォーム値 ...
    };
    // fetchによるPOST送信...
};
