let windowText = null;
let operation = null;
let storage = null;
let pendingUserInputCheck = true;

window.onload = function () {
    windowText = document.getElementById("window-text");
    windowText.value = "0";
};

function num(button) {
    button.blur();
    if (!pendingUserInputCheck) {
        windowText.value = "";
        pendingUserInputCheck = true;
    }
    if (windowText.value === "0") windowText.value = "";
    if (windowText.value.endsWith(".") && button.value === ".") return;
    windowText.value += button.value;
}

function equ(button) {
    button.blur();
    executePendingOperation();
    storage = null;
    operation = null;
}

function add(button) {
    button.blur();
    executePendingOperation();
    operation = (a, b) => a + b;
}

function sub(button) {
    button.blur();
    if (windowText.value.length > 0) {
        executePendingOperation();
        operation = (a, b) => a - b;
    } else {
        windowText.value = "-";
    }
}

function mul(button) {
    button.blur();
    executePendingOperation();
    operation = (a, b) => a * b;
}

function div(button) {
    button.blur();
    executePendingOperation();
    operation = safeDiv;
}

function safeDiv(a, b) {
    if (b === 0) {
        reset();
        pendingUserInputCheck = false;
    }
    return a/b;
}

function ce(button) {
    button.blur();
    windowText.value = "0";
}

function c(button) {
    button.blur();
    reset();
}

function del(button) {
    button.blur();
    if (windowText.value.length > 1) {
        windowText.value = windowText.value.slice(0, windowText.value.length -1);
    } else {
        windowText.value = "0";
    }
}

function plusMinus(button) {
    button.blur();
    windowText.value = -1 * parseFloat(windowText.value);
}


function executePendingOperation() {
    if (!pendingUserInputCheck) return;

    var scr = Number.parseFloat(windowText.value);
    if (operation) {
        storage = operation(storage, scr);
    }
    else {
        storage = scr;
    }
    windowText.value = storage;
    pendingUserInputCheck = false;
}


function reset() {
    storage = null;
    operation = null;
    windowText.value = "0";
    pendingUserInputCheck = true;
}

