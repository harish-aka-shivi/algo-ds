//TODO: export this linked list from linkedList.ts
class NodeObj {
  value: number;
  next: NodeObj | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  head: NodeObj | null = null;
  tail: NodeObj | null = null;

  get(index: number): number {
    let i = 0;
    let node = this.head;

    while (i !== index) {
      i++;
      node = node?.next ?? null;
    }

    return node?.value ?? -1;
  }

  prepend(val: number): void {
    if (this.head === null) {
      const newNode = new NodeObj(val);
      newNode.next = null;
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newNode = new NodeObj(val);
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  addAtHead(val: number): void {
    this.prepend(val);
  }

  append(val: number): void {
    if (!this.tail) {
      this.addAtHead(val);
      return;
    }

    const newNode = new NodeObj(val);
    newNode.next = null;
    this.tail.next = newNode;
    this.tail = newNode;
  }

  addAtTail(val: number): void {
    this.append(val);
  }

  print(): void {
    let node = this.head;
    let output = '';
    while (node) {
      output = `${!output ? `` : output + ` ===>`} ${node.value}`;
      node = node.next;
    }
    console.log(output);
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    let i = 0;
    let node = this.head;

    while (i !== index - 1) {
      node = node?.next ?? null;
      i++;
    }

    if (node) {
      const newNode = new NodeObj(val);
      newNode.next = node.next;

      node.next = newNode;

      if (this.tail === node) {
        this.tail = newNode;
      }
    }
  }

  deleteAtIndex(index: number): void {
    if (index === 0 && this.head) {
      if (this.head === this.tail) {
        this.tail = this.head.next;
      }
      this.head = this.head.next;
      return;
    }

    let i = 0;
    let node = this.head;

    while (i !== index - 1) {
      node = node?.next ?? null;
      i++;
    }

    if (node && node.next) {
      if (node.next === this.tail) {
        this.tail = node;
      }
      node.next = node?.next?.next;
    }
  }

  popFront(): number {
    if (this.head === null) {
      return -1;
    }
    const node = this.head;
    this.head = this.head.next;
    return node.value;
  }

  search(value: number): number {
    let node = this.head;
    let index = 0;
    while (node !== null) {
      if (node.value === value) {
        return index;
      }
      index++;
      node = node.next;
    }
    return -1;
  }

  reverse(): void {
    let prevNode = null;
    let tempNode = this.head;
    this.tail = this.head;
    while (tempNode) {
      const currentTempNode = tempNode;
      const currentPrevNode = prevNode;

      prevNode = tempNode;
      tempNode = tempNode?.next ?? null;

      currentTempNode.next = currentPrevNode;
    }

    this.head = prevNode;
  }
}

class CustomStack {
  maxSize: number;
  length = 0;
  list: LinkedList;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.list = new LinkedList();
  }

  push(x: number): void {
    if (this.length < this.maxSize) {
      this.list.addAtHead(x);
      this.length++;
    }
  }

  pop(): number {
    const res = this.list.get(0);
    if (res !== -1) {
      this.list.deleteAtIndex(0);
      this.length--;
    }
    return res;
  }

  top(): number {
    return this.list.get(0);
  }

  increment(k: number, val: number): void {
    let i = 0;
    const nodes = [];
    let node = this.list.head;

    const diff = this.length - k;
    const start = diff < 0 ? 0 : diff;

    while (node) {
      if (i >= start) {
        nodes.push(node);
      }
      i++;
      node = node.next;
    }

    for (const node of nodes) {
      node.value = node.value + val;
    }
  }
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
