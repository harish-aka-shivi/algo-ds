class BinarySearchTreeNode {
  value: number;
  left: BinarySearchTreeNode | null = null;
  right: BinarySearchTreeNode | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

const insertNode = (root: BinarySearchTreeNode, value: number): void => {
  let inserted = false;
  let node = root;
  const newNode = new BinarySearchTreeNode(value);

  while (!inserted) {
    if (value > node.value) {
      const rightNode = node.right;
      if (!rightNode) {
        node.right = newNode;
        inserted = true;
      } else {
        node = rightNode;
      }
    } else {
      const leftNode = node.left;
      if (!leftNode) {
        node.left = newNode;
        inserted = true;
      } else {
        node = leftNode;
      }
    }
  }
};

function bstFromPreorder(preOrder: number[]): BinarySearchTreeNode | null {
  let i = 1;
  const root = new BinarySearchTreeNode(preOrder[0]);
  while (i < preOrder.length) {
    insertNode(root, preOrder[i]);
    i++;
  }

  return root;
}
