/**
 Do not return anything, modify s in-place instead.
 */
export default function reverseString(s: string[]): void {
  const end = s.length - 1;
  let i = 0;
  const mid = Math.trunc((0 + end) / 2);
  while (i <= mid) {
    const temp1 = s[i];
    const temp2 = s[end - i];
    s[i] = temp2;
    s[end - i] = temp1;
    i++;
  }
}
