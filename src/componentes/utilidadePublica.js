import React from 'react'

export function ObjIsEmpty(o){return Object.keys(o).length === 0}
export function ObjIsEquivalent(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) return false;
    
    for (let i = 0; i < aProps.length; i++) {
        if (a[aProps[i]] !== b[aProps[i]]) {
            return false;
        }
    }
    return true;
}
