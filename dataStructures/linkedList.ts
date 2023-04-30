class Node {
  value: number;
  next: Node | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;

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
      const newNode = new Node(val);
      newNode.next = null;
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newNode = new Node(val);
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

    const newNode = new Node(val);
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
      const newNode = new Node(val);
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

// const obj = new LinkedList();
// obj.addAtHead(1);
// obj.addAtHead(3);
// obj.addAtTail(4);
// obj.addAtTail(6);
// obj.addAtIndex(2, 10);
// // obj.deleteAtIndex(0);
// obj.print();
// // console.log(obj.search(3));
// // console.log(obj.search(8));
// obj.popFront();
// obj.print();
// obj.reverse();
// obj.print();
