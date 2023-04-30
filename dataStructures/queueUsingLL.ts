class QueueNodeObj {
  value: number;
  next: QueueNodeObj | null = null;
  prev: QueueNodeObj | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

class QueueUsingLL {
  pushPointer: QueueNodeObj | null = null;
  popPointer: QueueNodeObj | null = null;
  length = 0;
  maxLength = 0;
  constructor(k: number) {
    this.maxLength = k;
  }

  enQueue(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    const node = new QueueNodeObj(value);
    if (this.length === 0) {
      this.pushPointer = node;
      this.popPointer = node;
    } else {
      if (this.pushPointer) {
        this.pushPointer.prev = node;
        this.pushPointer = node;
        node.next = this.pushPointer;
      }
    }
    this.length++;
    return true;
  }

  deQueue(): boolean {
    if (this.length === 0) {
      return false;
    }
    const value = this.popPointer;
    if (value) {
      value.next = null;
      this.popPointer = value.prev;
      value.prev = null;
    }

    if (this.popPointer) {
      this.popPointer.next = null;
    }

    this.length--;
    return true;
  }

  Front(): number {
    if (this.length === 0) {
      return -1;
    }
    return this.popPointer?.value ?? -1;
  }

  Rear(): number {
    if (this.length === 0) {
      return -1;
    }
    return this.pushPointer?.value ?? -1;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  isFull(): boolean {
    return this.length >= this.maxLength;
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
