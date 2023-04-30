/* All the methods are functional */

export class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null = null;
  right: BinaryTreeNode | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

const buildTreePreOrder = (arr: number[]): BinaryTreeNode | null => {
  const value = arr.shift();

  if (value === -1 || value === undefined) {
    return null;
  }

  const node = new BinaryTreeNode(value);
  node.left = buildTreePreOrder(arr);
  node.right = buildTreePreOrder(arr);

  return node;
};

const printPreOrder = (root: BinaryTreeNode | null) => {
  if (root === null) {
    return '';
  }
  let value = `${root.value}`;
  value = value + printPreOrder(root.left);
  value = value + printPreOrder(root.right);
  return value;
};

const printInOrder = (root: BinaryTreeNode | null): string => {
  if (root === null) {
    return '';
  }
  let value = printInOrder(root.left);
  value = value + root.value;
  value = value + printInOrder(root.right);
  return value;
};

const printPostOrder = (root: BinaryTreeNode | null): string => {
  if (root === null) {
    return '';
  }
  let value = printPostOrder(root.left);
  value = value + printPostOrder(root.right);
  value = value + root.value;
  return value;
};

const buildOrderMap = (root: BinaryTreeNode | null, level: number, map: Record<string, number[]>) => {
  if (root === null) {
    return;
  }
  if (map[level]) {
    map[level].push(root.value);
  } else {
    map[level] = [root.value];
  }
  buildOrderMap(root.left, level + 1, map);
  buildOrderMap(root.right, level + 1, map);
};

function levelOrder(root: BinaryTreeNode | null): number[][] {
  const map = {};
  buildOrderMap(root, 0, map);
  return Object.values(map);
}

const input = [1, 2, 4, -1, -1, 5, 7, -1, -1, -1, 3, -1, 6, -1, -1];
const root = buildTreePreOrder(input);

console.log(printPreOrder(root));
console.log(printInOrder(root));
console.log(printPostOrder(root));
console.log(levelOrder(root));
