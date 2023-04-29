export class Stack {
  maxSize: number;
  arr: number[];
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.arr = [];
  }

  push(x: number): void {
    if (this.arr.length < this.maxSize) {
      this.arr.push(x);
    }
  }

  pop(): number {
    const res = this.arr.pop();
    return res === undefined ? -1 : res;
  }

  increment(k: number, val: number): void {
    const end = this.arr.length <= k ? this.arr.length : k;

    for (let i = 0; i < end; i++) {
      this.arr[i] = this.arr[i] + val;
    }
  }
}
