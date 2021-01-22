"use strict";
//
// ─── INSERT IN BETWEEN ──────────────────────────────────────────────────────────
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertJoinersInBetweenArrayItems = void 0;
function insertJoinersInBetweenArrayItems(array, joiner) {
    if (array.length === 0) {
        return array;
    }
    const newArray = [array[0]];
    for (let iterator = 1; iterator < array.length; iterator++) {
        newArray.push(joiner);
        newArray.push(array[iterator]);
    }
    return newArray;
}
exports.insertJoinersInBetweenArrayItems = insertJoinersInBetweenArrayItems;
// ────────────────────────────────────────────────────────────────────────────────
