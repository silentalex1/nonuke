let isObfuscated = false;

function consoleMessage(message, type = "info") {
    const consoleElement = document.getElementById('console');
    const messageElem = document.createElement("p");
    messageElem.textContent = message;
    messageElem.className = "console-message " + 
        (type === "error" ? "console-error" : 
         type === "info" ? "console-info" : 
         type === "success" ? "console-success" : "console-warning");
    consoleElement.appendChild(messageElem);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

function obfuscateCode(type) {
    const editor = document.getElementById("editor");
    const code = editor.value.trim();
    if (!code) {
        consoleMessage("Code is required for obfuscation.", "error");
        return;
    }
    let obfuscatedCode = "";
    switch (type) {
        case 'lua':
            obfuscatedCode = CryptoJS.AES.encrypt(code, "securepass").toString();
            editor.value = `local function runCode()\n  local encrypted = "${obfuscatedCode}"\n  local decrypted = CryptoJS.AES.decrypt(encrypted, "securepass"):toString(CryptoJS.enc.Utf8)\n  load(decrypted)()\nend\nrunCode()`;
            consoleMessage("Lua obfuscation completed.", "success");
            break;
        case 'html':
            obfuscatedCode = btoa(code);
            editor.value = `<script>document.write(atob("${obfuscatedCode}"));</script>`;
            consoleMessage("HTML obfuscation completed.", "success");
            break;
        case 'javascript':
            obfuscatedCode = btoa(code);
            editor.value = `(function() { eval(atob("${obfuscatedCode}")); })();`;
            consoleMessage("JavaScript obfuscation completed.", "success");
            break;
        default:
            consoleMessage("Invalid obfuscation type.", "error");
    }
    isObfuscated = true;
}

function downloadCode() {
    const editor = document.getElementById("editor");
    const code = editor.value.trim();
    if (!code) {
        consoleMessage("No code available to download.", "error");
        return;
    }
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isObfuscated ? "obfuscated_code.txt" : "original_code.txt";
    a.click();
    URL.revokeObjectURL(url);
    consoleMessage("Code downloaded successfully.", "success");
}

function clearConsole() {
    document.getElementById('console').innerHTML = "";
    consoleMessage("Console cleared.", "info");
}

consoleMessage("Console initialized!", "info");
