/* 
    min [50, 60, 70, 90, 80, 100]
*/

export class Heap {
  list: number[];

  constructor() {
    // block first element
    this.list = [-1];
  }

  insert(val: number) {
    // add data to end of heap
    this.list.push(val);

    // adjust its parent

    let index = this.list.length - 1;
    let parent = Math.trunc(index / 2);

    while (index > 1 && this.list[index] < this.list[parent]) {
      const temp = this.list[index];
      this.list[index] = this.list[parent];
      this.list[parent] = temp;

      index = parent;
      parent = Math.trunc(index / 2);
    }
  }

  top(): number {
    return this.list[1];
  }

  // remote the 1st index in the min heap
  pop() {
    // swap first and last element
    // remote the last element
    // fix the heap using heapify(1) => O (log N)

    // swap
    const last = this.list.length - 1;
    const temp = this.top();
    this.list[1] = last;
    this.list[this.list.length - 1] = temp;

    // remove the last element
    this.list.pop();

    // fix the heap
    this.heapify(1);
  }

  heapify(index: number) {
    const left = 2 * index;
    const right = 2 * index + 1;

    let minIndex = index;

    // find the min of left right and node
    if (left < this.list.length && this.list[left] < this.list[index]) {
      minIndex = left;
    }
    if (right < this.list.length && this.list[right] < this.list[index]) {
      minIndex = right;
    }

    if (minIndex !== index) {
      //swap index and min index
      const temp = this.list[index];
      this.list[index] = this.list[minIndex];
      this.list[minIndex] = temp;

      this.heapify(minIndex);
    }
  }

  isEmpty() {
    return this.list.length < 2;
  }
}
