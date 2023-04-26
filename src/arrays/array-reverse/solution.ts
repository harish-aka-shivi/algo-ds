/**
 Do not return anything, modify s in-place instead.
 */
 function reverseString(s: string[]): void {
    let end = s.length - 1
    let i = 0
    let mid = Math.trunc((0+end) / 2)
    while(i <= mid) {
        const temp1 = s[i]
        const temp2 = s[end - i]
        s[i] = temp2
        s[end - i] = temp1
        i++
    }
};