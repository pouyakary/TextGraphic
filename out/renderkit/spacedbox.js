"use strict";
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacedBox = void 0;
const array_1 = require("../tools/array");
//
// ─── SPACED BOX ─────────────────────────────────────────────────────────────────
//
class SpacedBox {
    //
    // ─── CONSTRUCTOR ─────────────────────────────────────────────────
    //i
    constructor(lines, baseLine) {
        this.lines =
            lines;
        this.height =
            this.lines.length;
        this.width =
            this.lines[0].length;
        this.baseLine =
            baseLine;
    }
    static initWithSpaceCheck(lines, baseLine) {
        const unifiedLines = SpacedBox.unifyLineSpaces(lines);
        return new SpacedBox(unifiedLines, baseLine);
    }
    static initWithText(text, baseLine) {
        const lines = text.split("\n");
        const unifiedLines = SpacedBox.unifyLineSpaces(lines);
        return new SpacedBox(unifiedLines, baseLine);
    }
    static initEmptyBox() {
        return new SpacedBox([""], 0);
    }
    //
    // ─── CREATE LINES ────────────────────────────────────────────────
    //
    static unifyLineSpaces(lines) {
        const longestLine = SpacedBox.getLongestLineOfArray(lines);
        const perfectLines = lines.map(line => SpacedBox.perfectLineSize(line, longestLine));
        return perfectLines;
    }
    //
    // ─── TOOLS ───────────────────────────────────────────────────────
    //
    static getLongestLineOfArray(lines) {
        return Math.max(...lines.map(x => x.length));
    }
    static perfectLineSize(line, size) {
        return line + SpacedBox.spaceLineOfSize(size - line.length);
    }
    static spaceLineOfSize(size) {
        return " ".repeat(size);
    }
    //
    // ─── GET PLAIN TEXT ──────────────────────────────────────────────
    //
    get plainTextForm() {
        return this.lines.join("\n");
    }
    //
    // ─── PADDING ─────────────────────────────────────────────────────
    //
    withPadding(top, right, bottom, left) {
        //
        const topBottomSpaceLines = SpacedBox.spaceLineOfSize(left + this.width + right);
        const leftSpaceLines = SpacedBox.spaceLineOfSize(left);
        const rightSpaceLines = SpacedBox.spaceLineOfSize(right);
        const lines = new Array();
        // top
        for (let counter = 0; counter < top; counter++) {
            lines.push(topBottomSpaceLines);
        }
        // middle
        for (const line of this.lines) {
            lines.push(leftSpaceLines + line + rightSpaceLines);
        }
        // bottom
        for (let counter = 0; counter < bottom; counter++) {
            lines.push(topBottomSpaceLines);
        }
        //
        return new SpacedBox(lines, this.baseLine + top);
    }
    //
    // ─── VERTICAL JOIN ───────────────────────────────────────────────
    //
    static joinBoxesVertically(boxes, joiner) {
        if (boxes.length === 0) {
            return SpacedBox.initEmptyBox();
        }
        if (boxes.length === 1) {
            return boxes[0];
        }
        // getting the desired box size
        let newBaseline = 0;
        let heightBelowNewBaseline = 0;
        for (const box of boxes) {
            if (box.baseLine > newBaseline) {
                newBaseline =
                    box.baseLine;
            }
            if ((box.height - 1 - box.baseLine) > heightBelowNewBaseline) {
                heightBelowNewBaseline =
                    box.height - 1 - box.baseLine;
            }
        }
        const newHeight = newBaseline + heightBelowNewBaseline + 1;
        // boxesWithPadding
        const boxesWithJoiner = array_1.insertJoinersInBetweenArrayItems(boxes, joiner);
        // boxesWithPaddings
        const boxesWithAppropriatePaddings = boxesWithJoiner.map(box => {
            const topPadding = newBaseline - box.baseLine;
            const bottomPadding = newHeight - box.height - topPadding;
            return box.withPadding(topPadding, 0, bottomPadding, 0);
        });
        // join
        const newLines = new Array();
        const rows = boxesWithAppropriatePaddings[0].lines.length;
        const columns = boxesWithAppropriatePaddings.length;
        for (let row = 0; row < rows; row++) {
            const lineColumns = new Array();
            for (let column = 0; column < columns; column++) {
                lineColumns.push(boxesWithAppropriatePaddings[column].lines[row]);
            }
            newLines.push(lineColumns.join(""));
        }
        // the new space box
        return new SpacedBox(newLines, newBaseline);
    }
}
exports.SpacedBox = SpacedBox;
// ────────────────────────────────────────────────────────────────────────────────
