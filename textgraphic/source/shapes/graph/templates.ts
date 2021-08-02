
//
// ─── FORMULAS ───────────────────────────────────────────────────────────────────
//

    export function Ellipse ( x: number, y: number ) {
        return x * x + y * y <= 1;
    }

    export function Rotate ( x: number, y: number, a: number ): [ number, number ] {
        return [
            x * Math.cos( a ) - y * Math.sin( a ),
            y * Math.cos( a ) + x * Math.sin( a ),
        ]
    }

// ────────────────────────────────────────────────────────────────────────────────
