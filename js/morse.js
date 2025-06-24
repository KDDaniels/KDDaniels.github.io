"use strict";

const input = document.getElementById("textInput");
const output = document.getElementById("textOutput");

const morse = {
    A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",    F: "..-.", G: "--.",
    H: "....",  I: "..",    J: ".---",  K: "-.-",   L: ".-..", M: "--",   N: "-.", 
    O: "---",   P: ".--.",  Q: "--.-",  R: ".-.",   S: "...",  T: "-",    U: "..-", 
    V: "...-",  W: ".--",   X: "-..-",  Y: "-.--",  Z: "--..", 
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 
    5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", 
    " ": "/"
}

// Maps the entries in morse backwards for decoding
const eng = Object.fromEntries(
    Object.entries(morse).map(([key, val]) => [val, key])
);

function convert(input) {
    input = input.trim();

    if (/^[.\-/\s]+$/.test(input)) {
        return input
            .split(" ")
            .map(m => eng[m] || "")
            .join("");
    } else {
        return input
            .toUpperCase()
            .split("")
            .map(e => morse[e] || "")
            .join(" ");
    }
}

input.addEventListener("input", () => {
    output.innerHTML = convert(input.value);
})