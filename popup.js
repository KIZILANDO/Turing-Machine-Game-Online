// Function to decode encoded strings
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Function to capitalize string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function tests parity, true for evens, false for odds
function Par(N) {
    if (N % 2 == 0) {
        return true;
    }
    return false;
}

// Code input functionality
let currentCode = '___';
let isCodeWrong = false;
let isCodeCorrect = false;
let gameData = null; // Variable to store the game data

function setCodeDigit(number, digit) {
    let codeArray = currentCode.split('');
    codeArray[digit] = number.toString();
    currentCode = codeArray.join('');
    updateCodeDisplay();
}

function updateCodeDisplay() {
    const codeDisplayer = document.querySelector('.codeDisplayer');
    const codeMessage = document.querySelector('.codeMessage');
    const verifyButton = document.querySelector('.fullgreen');
    
    if (currentCode === '___') {
        codeDisplayer.textContent = 'Input your code';
        codeDisplayer.className = 'codeDisplayer';
    } else {
        const digits = currentCode.split('');
        codeDisplayer.innerHTML = `
            <span class="digit">${digits[0]}</span>
            <span class="digit">${digits[1]}</span>
            <span class="digit">${digits[2]}</span>
        `;
        
        let className = 'codeDisplayer code';
        if (isCodeWrong) className += ' wrongCode';
        if (isCodeCorrect) className += ' correctCode';
        codeDisplayer.className = className;
    }
    
    // Update message
    if (!isCodeWrong && !isCodeCorrect) {
        codeMessage.innerHTML = '<span class="wrongCode">&nbsp;</span>';
    } else if (isCodeWrong) {
        codeMessage.innerHTML = '<span class="wrongCode">Wrong Code</span>';
    } else if (isCodeCorrect) {
        codeMessage.innerHTML = '<span class="correctCode">Correct Code!</span>';
    }
    
    // Update button
    if (!isCodeWrong && !isCodeCorrect) {
        verifyButton.value = 'VERIFY';
        verifyButton.onclick = testCode;
    } else if (isCodeWrong) {
        verifyButton.value = 'TRY AGAIN';
        verifyButton.onclick = resetCode;
    }
}

function testCode() {
    // Check if the current code matches the data.code
    console.log(`Testing code: ${currentCode}`);
    console.log(`Game data code: ${gameData.solution}`);
    if (parseInt(currentCode) === gameData.solution) {
        isCodeCorrect = true;
        isCodeWrong = false;
    } else if (currentCode !== '___') {
        isCodeWrong = true;
        isCodeCorrect = false;
    }
    updateCodeDisplay();
}

function resetCode() {
    currentCode = '___';
    isCodeWrong = false;
    isCodeCorrect = false;
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.bigSquare');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    updateCodeDisplay();
}

function initializeCodeButtons() {
    const codeButtons = document.querySelectorAll('.bigSquare');
    
    codeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const number = parseInt(this.textContent);
            const classList = Array.from(this.classList);
            let digit = 0;
            
            // Determine digit position based on color class
            if (classList.includes('codeButtonColor1')) {
                digit = 1;
            } else if (classList.includes('codeButtonColor2')) {
                digit = 2;
            }
            
            // Remove active class from all buttons of the same digit (same color)
            const sameColorButtons = document.querySelectorAll(`.codeButtonColor${digit}`);
            sameColorButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            setCodeDigit(number, digit);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
            this.style.cursor = 'pointer';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Encoded information for game
const Criteria = b64DecodeUnicode("MSAgLSDilrIgY29tcGFyZWQgdG8gMQoyICAtIOKWsiBjb21wYXJlZCB0byAzCjMgIC0g4pagIGNvbXBhcmVkIHRvIDMKNCAgLSDilqAgY29tcGFyZWQgdG8gNAo1ICAtIOKWsiBwYXJpdHkKNiAgLSDilqAgcGFyaXR5CjcgIC0g4pePIHBhcml0eQo4ICAtIG51bWJlciBvZiBvbmVzCjkgIC0gbnVtYmVyIG9mIHRocmVlcwoxMCAtIG51bWJlciBvZiBmb3VycwoxMSAtIOKWsiBjb21wYXJlZCB0byDilqAKMTIgLSDilrIgY29tcGFyZWQgdG8g4pePCjEzIC0g4pagIGNvbXBhcmVkIHRvIOKXjwoxNCAtIHNtYWxsZXN0IGNvbG91cgoxNSAtIGJpZ2dlc3QgY29sb3VyCjE2IC0gb2RkIGNvbXBhcmVkIHRvIGV2ZW4KMTcgLSBudW1iZXIgb2YgIGV2ZW5zCjE4IC0gc3VtIHBhcml0eQoxOSAtIHN1bSBvZiDilrIgYW5kIOKWoCBjb21wYXJlZCB0byA2CjIwIC0gcmVwZWF0cwoyMSAtIHBhaXIgcHJlc2VudAoyMiAtIG9yZGVyCjIzIC0gc3VtIGNvbXBhcmVkIHRvIDYKMjQgLSBudW1iZXIgb2YgYXNjZW5kaW5nIGNvbnNlY3V0aXZlIGRpZ2l0cwoyNSAtIG51bWJlciBvZiBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZyBjb25zZWN1dGl2ZSBkaWdpdHMKMjYgLSBvbmUgb2YgdGhlIGNvbG91cnMgbGVzcyB0aGFuIDMKMjcgLSBvbmUgb2YgdGhlIGNvbG91cnMgbGVzcyB0aGFuIDQKMjggLSBvbmUgb2YgdGhlIGNvbG91cnMgZXF1YWwgMQoyOSAtIG9uZSBvZiB0aGUgY29sb3VycyBlcXVhbCAzCjMwIC0gb25lIG9mIHRoZSBjb2xvdXJzIGVxdWFsIDQKMzEgLSBvbmUgb2YgdGhlIGNvbG91cnMgZ3JlYXRlciB0aGFuIDEKMzIgLSBvbmUgb2YgdGhlIGNvbG91cnMgZ3JlYXRlciB0aGFuIDMKMzMgLSBvbmUgb2YgdGhlIGNvbG91cnMgcGFyaXR5CjM0IC0gc21hbGxlc3Qgb3IgdGllZAozNSAtIGxhcmdlc3Qgb3IgdGllZAozNiAtIHN1bSBiZWluZyBhIG11bHRpcGxlIG9mIDMsIDQsIG9yIDUKMzcgLSBzdW0gb2YgdHdvIGNvbG91cnMgYmVpbmcgNAozOCAtIHN1bSBvZiB0d28gY29sb3VycyBiZWluZyA2CjM5IC0gb25lIG9mIHRoZSBjb2xvdXJzIGNvbXBhcmVkIHRvIDEKNDAgLSBvbmUgb2YgdGhlIGNvbG91cnMgY29tcGFyZWQgdG8gMwo0MSAtIG9uZSBvZiB0aGUgY29sb3VycyBjb21wYXJlZCB0byA0CjQyIC0gb25lIG9mIHRoZSBjb2xvdXJzIGJlaW5nIHNtYWxsZXN0IG9yIGxhcmdlc3QKNDMgLSDilrIgY29tcGFyZWQgdG8gb25lIG9mIHRoZSBvdGhlciBjb2xvdXJzCjQ0IC0g4pagIGNvbXBhcmVkIHRvIG9uZSBvZiB0aGUgb3RoZXIgY29sb3Vycwo0NSAtIG51bWJlciBvZiBvbmVzIG9yIG51bWJlciBvZiB0aHJlZXMKNDYgLSBudW1iZXIgb2YgdGhyZWVzIG9yIG51bWJlciBvZiBmb3Vycwo0NyAtIG51bWJlciBvZiBvbmVzIG9yIG51bWJlciBvZiBmb3Vycwo0OCAtIG9uZSBvZiB0aGUgY29sb3VycyBjb21wYXJlZCB0byBhIGRpZmZlcmVudCBjb2xvdXI=").split("\n");
const Verifiers = b64DecodeUnicode("NDM0NTg3NDM3NTg1ODExNjYwMjU4MTg0MjY1ODg4MzMxNzk3MDU3MDQxNjU0MDI2MzcyOAozNTY2NTMzNTg2NTE1NTI0OTQ1MzE5ODI2NTIzNDU2NTM0NDU3Nzk1ODU3NTIwNjEzODY1CjM4NzYzMTM5MDYyOTYyNTIwNjkzNzI5MjY0NTg5NzAwNDc5ODAzNzkwMTA4NDUyNTA0MzcKNzU4MjUyNzYzMjQ3MTczMzcwNzA0NTQ3NjQxODEyNDIxOTMyMDkxMjY4NDA0NzgzOTEwNQo3ODIyMTk3ODUyMTY1NTE5NTM2MjEzMDc5MjU4ODk1NzI2MDcxMzA1NTk4MDM2NjA4NDI5CjY2MTM0OTY2MzM0Nzc3NzMzMzMzMzU5NzI2ODE1MDg4OTcwNzM2MzY2NTk4NzY0NjQwMzcKNjcwMzM4Njc3MzM1NDkzMzgwNzYwNDg0NDM1NTE0MjY2OTMzNzY3Mzk2OTA1MTYzNzYwNgo2MTgzOTU2MjUzOTM2Mjk1ODkyNzk0NDQ2OTA2ODUwNTMxNTQ0MjE3MjY2NTMzMTU0Njg5CjU2MDQ2OTU2MzQ2MzU5NTQ5NDc5MjE2Mjk2MzkyMDc0Mjg1MjM5MDI5Nzk5Nzk0ODU1NjkKNjE0NDAyNjE2Mzk5ODIxNTg5MDgyNzIyNzM2NzQxNzczNTIzNjUxOTU3MjI2NzU2MTg2NQo2NTAzNTk2NTIzNTc1Mzg0MDMyODAxMzU0MzQ4ODcyODY5MDQzNjA1NzcyMDg4Njg0MTUwCjc3ODIyNDc4MDIyMTU1MDUwNTUyNzAzMTgyNzQyOTI3OTAyMTM5MzI5NTgwNTQzMDg0ODgKMzI5Njg3MzMxNjg0NTQ4NzI0NjI1ODczOTk5NzAyMTc0NjM1NTQwMjUzNTc0MDg2ODc0NQoyNTM3NTcyNTY3NTQ1NDU5MjA5MTYxMDUyMDYwOTkzODM3NTIyNjQ3NTUyODAwOTgxMzc3CjQ5NzUyMzQ5OTUxODcxNjU2NTI0MDM5OTE3MzExNTYyNzg4ODcyNTM2NTgxMTk3MDk2CjQ4MTU0MzQ4MzU0MDEyMTAzMjQ1NjIwNjA2NTE1MjU2NDU0MjQ0NjMyNzU5OTU3OTAyMDkKNjA5NDA2NjExNDA0ODE4MzcyNDQ2NDUxNTc0MzQyODE0ODEyNzcyMzQ5NTE4MDg4Njc4NQo2ODEzMzI2ODYzMzA1Mzg5OTcyNzkxMjA2MTQwNDAwMTMxNTUzNTMzMDI0NjQ3MjQ1NDM0CjczNzI3OTczOTI3Nzg1MTkwNjg5NTY5MjQ5MDMzMjU5NTgyNTQ1MTAxMjA4MjkwNjgyNDMKNDAzNjEzNDA1NjEwMzk2NzI5ODI3MTgzNDI1Nzg1ODMzNTkyMTI1ODIxMTEwMjUyODY1OQo1MzI0OTA1MzQ0ODY5Njc4NzA1OTg3MTEyNTIwNzcwMzU0OTM0NDQ0MDQ0MjU3NjI1MjE0CjM0NjY2NDM0ODY2MjUyMTM0NDA4OTg1NjkzOTU5OTcyNzg4NjUwMTQyMTQ4MjUwMjU1Mwo1Nzg0NDU1ODA0NDEzNzIxNDQ0NjQ5MjI0ODc2NjE4MTc3OTAzMjYyNzA2NDg2MzAxMDU0CjQ4NTUzNjQ4NzUzMzU0Mjc4OTcxNjEwMDEyNTI1NTYzODU1NzQ5MDUzMTI3NjkzMjU5MTgKMzE1Njk5MzE3Njk2Nzk5OTkxMzExMzE1NjAzNjA3MDU2MzQ3OTY0Mzc5Njc1MDUwOTIzNgo2NDAzNzQ2NDMzNzI2NjQ2ODUwNTIzNzA5MDc5OTYyMjc2NjM2NTYyMTE2NDc0NjgzMjY1CjY1NDM1NTY1NzM1MjE0NzcyMjQ3OTExOTc2MTYwOTE5MDU3MDA5OTExOTMyNDk1MDc5NDkKNTgyNDM5NTg2NDM1NjE4Mjc5NjYyODE0NDA3MjU3OTA3MzM1MzI2MzM4MDc2OTE0Njc5Mwo3MjMyODk3MjYyODc3NzY1NjkxNTgzMjUxOTU1Mzk2MzIyNTQ3ODI0NjM5Mjg4NDExNTU2CjQxMzU5OTQxNjU5NzgxNzc2ODY0NzEwMDg1NDU2NzQzNDE4Nzk4MTU3MTk5MjI4Mjc0NjMKNjk1MzE5Njk3MzE2ODEwMjk3NjY4Njk1NzQ5MTc4NDkxMDg0NDIzOTAwNDQyNjQ3MjgyMwoyMDY3OTMyMTI3OTA1Mjg4MzI0NDI1MTUwOTA2MjA4MjAyMjk1MzA0MTg5MTg5MDcyNjU5Cjc0MTI3Mzc0MzI2ODEwODE3Mzc5MjE3NDMwMTEzNTE5MjY1MTk4NTY1MjgwMDAxNTY5NjIyCjU5MjQyNDU5NDQyMTYzOTMwMTAxODQzMDk5NzAyNzgxNjM0NjU0NzcwNDAxMDY4ODA3NDkKMjkzNzIwMjk2NzE4NTQ3OTQxNDA3MDg3NTA2NTMxMjQ5MzU5MTAyNjI5MjA1MjA2NjMwNQo0NjI1NjQ0NjQ1NjI0MTM2ODk1MTE4OTE2MDQ5NDQ5ODQ2MjEwMDAwODQ1MzM4NDQ1MTU1CjM3NjYzOTM3ODYzNzgxNzYxMTMzNjg3OTk3MTI0ODA3NjA2MzA0NDkzMTc1NzAxOTc1OAo3OTUyMDU3OTcyMDIyNzUyNTA4MDMxMjQ2NTEzODQ0MjI3Mjc2MzA4Mzc5NjI2NzkxODA5CjIxNTc4NjIxNzc4Mzk1Mzg1NjE1OTcxMDY3MzYxNzcxNjMzMzkwNjY5Mzc4MTgwODc4NzUKNTI1NDk2NTI4NDkyNTUzMTAwMTQzNjYzMTc5OTUxNjA2MjY4NDUyMjIwMDE1OTM1NTExNwo3MTcyOTk3MTkyOTQxOTA0MDE1Mjc4MjAzMzkwMjc2OTM3NjI1MjU3MTQ2MjgyMDQ4MAo3ODcyMTM3OTIyMDcyNTMyMjQ1NTIzNDExMjc0NzcwODE2NDQ1MTcyMDI5Njk1ODI3MDU0Cjc3MTIzMjc3NTIyODc3NTM1MjcxNzI1NjE0MTUzMzc5NTQzMjUyOTQ3MTA0MzQxNzMzMTcKNzY2MjQzNzY5MjM2NTgyODk4Nzc0MjIxMDkyNjc4MzYzMjkyMTk0ODYyMTgzMTc3MjM3OAo3NTEyNTc3NTUyNTUyODA3MzM0NzgyODAwNzQzNjExMzM5NDgzNjU3MzUxOTExODM2MTA3Cjc0NjI2Njc0OTI2Mzk3NTc3MjAyMjk2NjA4MDYxMjQ4MzYwMzM4MjgzMDA5Mjg1MTI0MDIKNTAzNTE1NTA1NTA5OTY4NjY5Nzg5NjE5OTEwNzc0OTEzNzcxNjA2NDExMjA3MDExNTQ1NAo1Mzc0ODQ1NDE0ODI5NjEwODUzMzQ2NTY1NDYxNTEwMjk5ODg0MjQ3Nzk5MzExMjUzOTA3CjQ5MTUzMDQ5NTUyNzU1MDQ5OTc3NDc4MTg4MjM0MjMxMzEzMTUzMDE1NDgxNjQ4NjIzNDUKNDc1NTUwNDc5NTQ3MjY0OTIxNDg0NTEwNzQ1Njc4OTQ0NDAwNjY4ODQ2NTY2NDUxMTA5NQo0NzA1NTg0NzI1NTMyOTAxNjM4NTIzMzU3NDYxMzE3NjE0MzE4MDkwMzk2MzUyNjY4NDMzCjQ1NTU3MTQ1OTU2NzU1NDAyMjc0Nzk0NjEyNDg4NTQ0MjY0MTM2OTMwNzg5NjcyODgxOTcKNDQwNTgxNDQyNTc5Mjc3MjQyNzk2NzMzMDUxMzQxMjY4MjM4ODMzNjkwMzcxMzQxMzgzOAo0Mjk1OTE0MzI1ODk1MzQ3NDc5MDI4NjE1NTU5MDc1MzAyOTU4NzkwODY5NjU0NTY2NTU0CjQxOTU5NTQyMzU5MzUzMjYyMDc0MzE3MDM4MDg2MzEzMDU5NjMzMTM2MTE3MDg2OTQxMzgKNDA3NjA4NDEwNjA1NTQ2MTEzMzIyMDg0MjAyMTE2NjY3MjUwNTc0MDY3OTY3OTQ1OTcxMwozOTY2MTc0MDE2MTU2NjA0OTgzNzczODgzODg1MDEwMjIxOTE4NjIzODcyMzI2MDE2MzU5CjM5MjYyNzM5NDYyMTYxNTcwMzA4MzI4OTY2ODczMzU4MzU3OTEwNjY2NDMxNDczOTU1NTMKMzcwNjQ1MzczNjQxNTQ1NjQ4NjExNTA3MzE2Njg4NDUyNjI5MDU4NTQ1NTE5OTEyOTk4OQozNjA2NDkzNjU2NDc1Nzk1NDgwNzkyMjk0MDQ3MDYxOTg2NzE0NTk0MjU0ODMwNjk4ODgxCjM1MDY1ODM1MzY1NjgxNjA3NzE3ODExOTQ2ODIwNDQzMjUwMzYxMzMzODY2OTE2MTI0MTQKMzM5NjY5MzQxNjY3MTA4MTczNzkyMTc0MzAxMTM1MTkyNjUxOTg1NjUyODAwMDE1Njk0OTQKMzM0NjgwMzM3NjczODE3NzIxOTkwNTkwMDE2MTY2MTY0MDc5OTk0NjY2NjAxMjA3ODk3NgozMDk3MDgzMTI3MDQxMTMxMzEwMzE5MzUzOTA5ODQ2MTM0OTMxNTcxOTY2NDI3OTkwNjM3CjMwMjcxNTMwNDcxMDUzMjE1ODUxNDUzODYxNDA3OTgxMDAyMzA2MzE1NTc3MDY1ODU3CjI4NjcyOTI4ODcyNTU0ODQ5MDg4Nzc0NzEzNjg5NTgwOTc3MTQ1OTA4NzU1NDk1NjUwNTkKMjgwNzM2MjgyNzMzNTQ1NTE1NzA1NDMyODA1MTg1MDE2NzEzMDk2NzIxNDY2ODI1MjU3NwoyNzQ3NDAyNzg3Mzg4MTgzNDE1NjU0ODE4MTg3MjAzODcxMzU4NDMzNTE5Njk3MzI2NDY1CjI2Nzc0NDI3MDc0MjcxNTcyMzM1NzkwNDkyMzIxODgwNzYyMzgyNTAxNDk5MzEzMTk2ODEKMjYxNzUwMjY0NzQ3NTQ1NjUyNzY1MzM2ODgwNjQ3MTkwMzI1MjE5NzY2MzczMTQ4MzAwOQoyNDQ3NjUyNTE3NTk1NTQxNTU2NzEyODU0NDcxNzU1NTI1MDI4NjQ2OTQ2OTI4MDY5MDkzCjIyNzc3NjIzMTc3MzU0NTUxOTg3NDk5MDY0MzA0OTQ3NTM1NDQyMTU3OTczOTg4OTcxMDEKMjAxNzk4MjA0Nzk2ODM0ODM4OTA4MTUzOTg2MDAxOTA1MzAyNTAwMDE5NDI2NDY2MjQxNwo2NDYzNjk2NDgzNjIxMjg2MDg5NjI1OTg1MzMwNTAwMjk4OTA3NzUyNTI0MTExNjczODcyCjQ0NzU3NzQ1MzU3MzU5NjU2MDEzNjk2MzU0MzAxNzA1MzM0NjE5MjczNzgzMTYxMjY1OTMKNTY2NDYxNTY4NDU4NDg4MDM0NTY2MjE5MDQ1OTM2MTY0MzU4ODI5NTc5NTIyNDQxMDUKMzIyNjk0MzI1NjkwNTc5NTQzOTQyMTU3NTk5OTk4Nzk5MTc2MDU1NjUzNzc5MDIzODE5NQo3MDkzMDg3MTQzMDM2MzkzNTkyMDc1MTI4ODI5NDkwNTY4NDA3Mjc2MTIxMjIyMjgzNDQxCjcwMTMxNDcwNjMxMTU0OTc3MzM3MjI1ODUwMTc3MDIxNTMxOTk0OTM0MzIwODk5MDQwMDUKNjg4MzI3NjkxMzI0NTQ1NTQxNzQ3Nzk1NDY3ODEyMTgzMzI3MDk5ODgzODg1Nzk5MDU1Mgo2NjUzNDQ2NjgzNDA4MTE3NjQ2MjMzNDcxMjYyNTEwNTYzNTU4MTAyNTM5NzI2NzUwOTY3CjYzNjM3OTYzODM3NzgyMjc1ODQ4NTQwMDIwMDEyNDY5MjI0MzIyNzMyNTg1MjQ1Mzc0ODEKNjI4MzkxNjMwMzg5NzE2NzUzODc2MjA0MjU2MTg3NzgxODgxNDA3NDE5NjUzNjIzOTQ4OQo2MDQ0MTI2MDY0MDk1ODg1ODUwNzcyMDA4MDIwMjIyOTMzMDcyMjQzNzMzODU3MjI0MDk2CjU4ODQzMzU5MDQzMDU1NjI4MjgzMDk3NjYyMjIxOTk1MjIwMjQxMjQyMDQ4NzQwNzI0NTMKNTcyNDU0NTc2NDQ5MTA0ODkzMjExMTg5Mjc4NjgzMzMwODY2Njg0MTY3ODA3MTc2NjI5ODEKNTUxNDc0NTU3NDcxOTg3ODg0ODQyNjI3NjY0NDMwNjI0NzY1NzU5NDE4MzI1NzA1MTUyNAo1NDY0ODA1NDk0NzY2ODM3NTc1NTIzNTIzNjk2MzE1MDQ0MjMxOTU5OTMxMzY1MjI4OTM3CjUxNjUwMjUyMDQ5ODgwOTI0NzczOTMyNDAxOTc4Njk1MjQ4MzY3NzM4ODIxOTIyMjE2CjUwNzUwNjUxNDUwNDU0NTUxNTY4ODcxNTY2MDk2MDIyNTQyNDYyMTI5NDAyOTc1MzY4OTcKNTk2NDE4NTk4NDE0NTUwMzkzMzQwNzUxOTkyNDQ4MzI0Mjg0NDk5MzIzOTU0NTYzMDg1NwoyMzM3NzAyMzc3Njc4MTc5ODIzMDEwNjk2ODIxODU4MDI4MTE5NzY2MTExNTg2MzgxMgo2MzIzODY2MzQzODI1ODI3NTI4NzkyOTkwODM0MTMzNzE1NjM2NjE0NjI3NzQwMTkxOTk0CjIyMDc4MTIyMzc3OTk5NTExNzIwNTk1NjQ0OTY3NjAyMzQxMTc2MDU2NzA0MTI1MDEzOTUKMzgxNjM1Mzg1NjMzOTU2MDk5OTU0NTk5MjI5NDMyNTU2NTAyMjczOTMwMTE0NTQ5Njk3Nw==").split("\n");
const Numbers = b64DecodeUnicode("MUI0OTg0NjA1MzExNzUyODY4MDczNDA5MTEyNjE1NzM2MjE1NTUyOAoxWTEwNzY3MTQyMjc2ODA2ODkyMjI5NzE3MTQxODMxNzc0MjE0NTU0MAoxUDg2Mzk5ODI1ODU2MzE4NDc4MzAwMTc1OTQxMDU5Nzk2MjczMjUyCjJCNTIzMzAyMDI1OTIzMzQ4MzEyNzAxMDA5MTM1NjAyMjYzMDQKMlk2ODkyNDYyNTU0NTcwOTUzMDUzNTM1ODQ3ODUzMDIzMDAzOTgwODAKMlAxMDYzNDI3MDYxMDI5NDEzMjU0Njk2ODg5OTc2OTI1Mzk3ODE2MzIyCjNCMjcyMjUyOTU4NDAxMDM5MjM5NzExNzAyNzEwOTgzMjc5MDkwMDgwNgozWTQxMjYyNTYxMDI2NTI5MTE1ODgwMzUzNTEwMTM4NjY0OTc5MDE2NjYKM1AxMzgyNDE4NjM2NTI1NTQzMDM3ODE5Mzc5MjU0MDQ0NTAxNzM3NDgwCjRCMTcyMzAxNTY5OTAxMDY4NzkyNzU3NzE5MTgyNDc5MTY0NzA2OTE4NAo0WTUxMDQ0NDQ4MjYzNzI3Njg5MzMwODYwOTIyMTQ5MTE4NDE5OTY4MAo0UDI4OTMyMzIxOTQ1NDE3MDY3NDE4MjgxNzIyOTQzMDcxMzI3MzU1MDQKNUI5Mzg0MzUxODgxMzA2NzYyMTMzNDM1NTQ1NzAyMzQwOTA0ODc4NTYKNVkyNjA1OTA5NTY1MjQ4NDQ2MDg0MTgyOTI5NTE3MjYxOTQ3MTIKNVA4NDAxMTM2NTE4ODk2MDQwOTU4NTE3MjY1NTkyNjIyMjc3MTIw").split("\n");
// Function to binary AND 4 numerical strings
function And4(A, B, C, D) {
    a = BigInt(A);
    b = BigInt(B);
    c = BigInt(C);
    d = BigInt(D);

    return a & b & c & d;
}

// Function that takes verifier number and its colour, and outputs the relevant binary string
function FindVerifier(num, col) {
    let ver = 0;
    let offset = 0
    if (col == 1) {
        offset = 3;
    } else if (col == 2) {
        offset = 6;
    } else if (col == 3) {
        offset = 9;
    }

    Verifiers.forEach((verifier) => {
        let Num = verifier.slice(offset, offset + 3);
        if (parseInt(num) == parseInt(Num)) {
            ver = verifier.slice(12);
        }
    });
    return ver;
}

// Function that takes a specific guess and verifier and outputs a boolean ("F" or "T")
function Question(ver, guess, col) {
    if (guess.length != 3) {
        return "F";
    }
    const digit1 = parseInt(guess[0]);
    const digit2 = parseInt(guess[1]);
    const digit3 = parseInt(guess[2]);
    if (!(digit1 >= 1 && digit1 <= 5 && digit2 >= 1 && digit2 <= 5 && digit3 >= 1 && digit3 <= 5)) {
        return "F";
    }

    const N1 = Numbers[(digit1 - 1) * 3].slice(2);
    const N2 = Numbers[(digit2 - 1) * 3 + 1].slice(2);
    const N3 = Numbers[(digit3 - 1) * 3 + 2].slice(2);

    console.log(Criteria, Verifiers, Numbers);
    console.log(N1, N2, N3, FindVerifier(ver, col));
    console.log(digit1, digit2, digit3, ver, col);
    const Ans = And4(N1, N2, N3, FindVerifier(ver, col));

    return Ans;
}
function extractNumbers() {
    const generateUUID = () => {
        let e = new Date().getTime();
        let t = (typeof performance !== "undefined" && performance.now && 1e3 * performance.now()) || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (n) {
            let r = 16 * Math.random();
            if (e > 0) {
                r = (e + r) % 16 | 0;
                e = Math.floor(e / 16);
            } else {
                r = (t + r) % 16 | 0;
                t = Math.floor(t / 16);
            }
            return (n === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    };
    
    window.turing_game_uuid = window.turing_game_uuid || generateUUID();
    console.log("Generating UUID:", window.turing_game_uuid);
    //const idGame = prompt("ID of the Problem:").replace('#', '');
    return fetch(`http://localhost:3001/proxy?uuid=${window.turing_game_uuid}`, {})
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                console.log("Réponse OK :", data);
                let info = { 
                    verifiers: data.crypt, 
                    criteria: data.ind, 
                    colour: data.color, 
                    code: data.hash,
                    solution:data.code
                };
                console.log(info);
                return info;
            } else if (data.status === "bad") {
                console.error("Hash incorrect !");
                throw new Error("Hash incorrect");
            }
        })
        .catch(err => {
            console.error("Erreur réseau :", err);
            return {
                verifiers: [387, 293, 537, 315, 516],
                criteria: [3, 14, 17, 19, 20],
                colour: 0,
                code: idGame || "DEFAULT"
            };
        });
}

// Loads the images for the criteria
function loadCriteria(criteriaNumbers, Reference) {

    // Remove criteria where appropriate
    if (criteriaNumbers.length == 5) {
        document.getElementById("criteria5").remove();
        document.getElementById("optionF").remove();
    }
    if (criteriaNumbers.length == 4) {
        document.getElementById("criteria4").remove();
        document.getElementById("optionE").remove();
    }

    // Load correct image and set the correct position for criteria cards
    for (i = 0; i < criteriaNumbers.length; i++) {
        let criteria = document.getElementById("criteria" + i);
        
        if (!criteria) {
            console.error("Element criteria" + i + " not found!");
            continue;
        }

        // Load correct image
        if (criteriaNumbers[i] < 10) {
            criteria.src = "img/criteria/TM_GameCards_FR-0" + criteriaNumbers[i] + ".png";
        } else {
            criteria.src = "img/criteria/TM_GameCards_FR-" + criteriaNumbers[i] + ".png";
        }

        // Place in correct position
        criteria.style.height = "77px";
        criteria.style.width = "118.8px";
        criteria.style.position = "absolute";
        criteria.style.top = (Reference.offsetTop + 300 + 113 * Math.floor(i / 2)) + 25 + "px";
        if (Par(i)) {
            criteria.style.left = (Reference.offsetLeft + 102) + "px";
        } else {
            criteria.style.left = (Reference.offsetLeft + 382) + "px";
        }

        // Setup hover effects
        criteria.style.transformOrigin = 'center';
        criteria.style.transition = 'transform 0.3s ease, z-index 0.3s ease, box-shadow 0.3s ease';
        criteria.style.cursor = 'pointer';
        criteria.style.zIndex = '2';
        
        // Create text area for notes below each criteria
        let textArea = document.createElement('textarea');
        textArea.id = 'notes-' + i;
        textArea.rows = 2;
        textArea.cols = 12;
        textArea.placeholder = 'Notes...';
        textArea.style.position = 'absolute';
        textArea.style.fontSize = '10px';
        textArea.style.resize = 'none';
        textArea.style.zIndex = '2';
        textArea.style.width = '177px';
        textArea.style.height = '23px';
        
        // Position the text area below the criteria image
        textArea.style.top = (Reference.offsetTop + 300 + 112 * Math.floor(i / 2) + 108) + "px";
        if (Par(i)) {
            textArea.style.left = (Reference.offsetLeft + 87) + "px";
        } else {
            textArea.style.left = (Reference.offsetLeft + 352) + "px";
        }
        
        // Add the text area to the document
        document.body.appendChild(textArea);
        
        // Use closure to capture the current criteria element
        (function(currentCriteria) {
            currentCriteria.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(2)';
                this.style.zIndex = '10000';
                this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
                this.style.borderRadius = '8px';
            });

            currentCriteria.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '2';
                this.style.boxShadow = 'none';
                this.style.borderRadius = '0';
            });
        })(criteria);
    }
}

// What happens once the popup loads?
document.addEventListener("DOMContentLoaded", function () {
    
    // Initialize code button functionality
    initializeCodeButtons();
    
    const notesheet = document.getElementById("notesheet-img");
    
    extractNumbers().then(info => {
        // Store the data globally for the testCode function
        gameData = info;
        
        let ver = info.verifiers[0];
        let guessCount = 0;
        let lastGuessWithVerifier = "";

        // Insert code visually
        const code = document.getElementById("Code");
        code.innerText = info.code;
        code.style.position = "absolute";
        code.style.left = (notesheet.offsetLeft + 430) + "px";
        code.style.top = (notesheet.offsetTop + 40) + "px";
        const name = document.getElementById("Name");
        name.innerText = "KIZILANDO";
        name.style.position = "absolute";
        name.style.left = (notesheet.offsetLeft + 430) + "px";
        name.style.top = (notesheet.offsetTop +8) + "px";
        
        function addGuessToGrid(guess) {
            if (guess.length !== 3 || guessCount >= 9) return false;
            
            const digit1 = guess[0]
            const digit2 = guess[1];
            const digit3 = guess[2];
            
            const baseLeft = notesheet.offsetLeft + 72;
            const baseTop = notesheet.offsetTop + 132; 
            const columnWidth = 32;
            const rowHeight = 28.5;
            
            const positions = [
                { digit: digit1, left: baseLeft, color: '#57b3db' },
                { digit: digit2, left: baseLeft + 3 + columnWidth, color: '#fdbb10' },
                { digit: digit3, left: baseLeft + 3 + columnWidth * 2, color: '#7e66ad' }
            ];
            
            positions.forEach((pos, index) => {
                const digitElement = document.createElement('div');
                digitElement.textContent = pos.digit;
                digitElement.style.position = 'absolute';
                digitElement.style.left = pos.left - 18 + 'px';
                digitElement.style.top = (baseTop + rowHeight * guessCount) - 72+ 'px';
                digitElement.style.fontFamily = 'Arial, sans-serif';
                digitElement.style.fontSize = '16px';
                digitElement.style.fontWeight = 'bold';
                digitElement.style.color = pos.color;
                digitElement.style.textAlign = 'center';
                digitElement.style.width = '20px';
                digitElement.style.zIndex = '10';
                digitElement.id = `guess-${guessCount}-digit-${index}`;
                
                document.body.appendChild(digitElement);
            });
            
            guessCount++;
            return true;
        }

        // Wait a bit for the page to be fully rendered
        setTimeout(() => {
            loadCriteria(info.criteria, notesheet);
        }, 100);
        
        function addResultToGrid(isCorrect, verifierIndex, currentGuessRow) {
            const existingResult = document.getElementById(`result-${currentGuessRow}-verifier-${verifierIndex}`);
            if (existingResult) {
                existingResult.remove();
            }
            const baseLeft = notesheet.offsetLeft + 209;
            const baseTop = notesheet.offsetTop + 130;
            const columnWidth = 32;
            const rowHeight = 28.5;
            const columnAdjustments = [
            -30,
            -27,
            -23.5,
            -21,
            -18,
            -26
        ];
            
            const resultElement = document.createElement('img');
            resultElement.src = isCorrect ? "img/other/t.png" : "img/other/x.png";
            resultElement.style.position = 'absolute';
            resultElement.style.left = (baseLeft + columnWidth * verifierIndex + columnAdjustments[verifierIndex]) + 'px';
            resultElement.style.top = (baseTop + rowHeight * currentGuessRow - 72) + 'px';
            resultElement.style.width = '19px';
            resultElement.style.height = '19px';
            resultElement.style.zIndex = '10';
            resultElement.crossOrigin = "anonymous";
            resultElement.id = `result-${currentGuessRow}-verifier-${verifierIndex}`;
            
            document.body.appendChild(resultElement);
        }

        // Add canvas
        let canvas = document.getElementById('draw-canvas');
        canvas.style.position = "absolute";
        canvas.style.left = "420px";
        canvas.style.top = "150px";
        canvas.width="150";
        canvas.height="230";
        const ctx = canvas.getContext('2d');

        let isDrawing = false;
        let lastX, lastY;

        const clearBtn = document.getElementById('clear-canvas');
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            guessCount = 0;
            lastGuessWithVerifier = "";
        });

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            lastX = e.offsetX;
            lastY = e.offsetY;
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(e.offsetX, e.offsetY, 2, 0, 2 * Math.PI);
            ctx.fill();
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            if (e.clientX - rect.left < 0 || e.clientX - rect.left > rect.width || e.clientY - rect.top < 0 || e.clientY - rect.top > rect.height) {
                isDrawing = false;
                return;
            }

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(lastX, lastY, 2, 0, 2 * Math.PI);
            ctx.fill();

            lastX = e.offsetX;
            lastY = e.offsetY;
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        // Save functionality
        document.getElementById('save-canvas').addEventListener('click', function () {
            try {
                html2canvas(document.body, {
                    allowTaint: true,
                    useCORS: true,
                    scale: 1,
                    logging: true,
                    proxy: window.location.origin + "/proxy",
                    foreignObjectRendering: false,
                    imageTimeout: 15000,
                    removeContainer: true
                }).then(function (screenshotCanvas) {
                    const imgData = screenshotCanvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    const filename = (info?.code || 'capture') + ".png";
                    
                    link.download = filename;
                    link.href = imgData;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch(function(error) {
                    console.error('html2canvas error:', error);
                    fallbackSave();
                });
            } catch (error) {
                console.error('Error:', error);
                fallbackSave();
            }
        });

        function fallbackSave() {
            try {
                const canvas = document.getElementById('draw-canvas');
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                const filename = (info?.code || 'capture') + "_drawing.png";
                
                link.download = filename;
                link.href = imgData;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                alert('Sauvegarde du dessin uniquement (problème avec les images)');
            } catch (error) {
                alert('Impossible de sauvegarder: ' + error.message);
            }
        }

        const verifierElement = document.getElementById("verifier-select");
        verifierElement.addEventListener('change', () => {
            ver = info.verifiers[verifierElement.value];
        });

        const guessElement = document.getElementById("guess");
        const submitElement = document.getElementById("submit-button");
        submitElement.addEventListener("click", () => {
            let guess = guessElement.value;
            
            if (guess.length === 3 && /^[1-5]{3}$/.test(guess)) {
                const verifierIndex = parseInt(verifierElement.value);
                const currentGuessWithVerifier = guess + "-" + verifierIndex;
                
                if (currentGuessWithVerifier === lastGuessWithVerifier) {
                    console.log("Même guess avec même verifier, ignoré:", currentGuessWithVerifier);
                    return;
                }
                
                let guessAdded = false;
                if (!lastGuessWithVerifier.startsWith(guess + "-")) {
                    guessAdded = addGuessToGrid(guess);
                }
                
                let Ans = Question(ver, guess, info.colour);
                
                const currentRow = guessAdded ? guessCount - 1 : Math.floor(guessCount - 1);
                addResultToGrid(Ans > 0, verifierIndex, currentRow);
                
                document.getElementById("Ans").src = Ans ? "img/other/t.png" : "img/other/x.png";
                
                lastGuessWithVerifier = currentGuessWithVerifier;
                
            } else {
                let Ans = Question(ver, guess, info.colour);
                document.getElementById("Ans").src = Ans ? "img/other/t.png" : "img/other/x.png";
            }
        });

    }).catch(error => {
        console.error("Erreur lors de l'extraction des données:", error);
        gameData = {
            verifiers: [387, 293, 537, 315, 516],
            criteria: [3, 14, 17, 19, 20],
            colour: 0,
            code: "DEFAULT"
        };
    });
});
