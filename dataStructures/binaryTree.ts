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

const levelOrder = (root: BinaryTreeNode | null): number[][] => {
  const map = {};
  buildOrderMap(root, 0, map);
  return Object.values(map);
};

const buildLevelOrderTree = (arr: number[]): BinaryTreeNode | null => {
  const zeroValue = arr.shift();
  if (zeroValue === undefined) {
    return null;
  }
  const root = new BinaryTreeNode(zeroValue);
  let level = 1;
  const map = { 0: [root] } as Record<string, (BinaryTreeNode | null)[]>;
  while (arr.length !== 0) {
    for (let i = 0; i < Math.pow(2, level); i++) {
      const val = arr.shift();
      if (val !== undefined) {
        let node = null;
        if (val !== -1) {
          node = new BinaryTreeNode(val);
        }
        if (map[level]) {
          map[level].push(node);
        } else {
          map[level] = [node];
        }

        const minusOneLevelNodes = map[level - 1];
        const parentIndex = Math.trunc(i / 2);
        const parent = minusOneLevelNodes[parentIndex];
        if (parent) {
          if (i % 2 === 0) {
            parent.left = node;
          } else {
            parent.right = node;
          }
        }
      }
    }
    level++;
  }
  return root;
};

const buildLevelOrderTree2 = (arr: number[]): BinaryTreeNode | null => {
  const zeroValue = arr.shift();
  if (zeroValue === undefined) {
    return null;
  }
  const root = new BinaryTreeNode(zeroValue);
  const queue: (BinaryTreeNode | null)[] = [root];
  while (queue.length !== 0) {
    const topNode = queue.shift();

    const nextLeft = arr.shift();
    const nextRight = arr.shift();
    if (nextLeft !== undefined && nextRight !== undefined && !!topNode) {
      const leftNode = nextLeft !== -1 ? new BinaryTreeNode(nextLeft) : null;
      const rightNode = nextRight !== -1 ? new BinaryTreeNode(nextRight) : null;

      queue.push(leftNode);
      queue.push(rightNode);

      topNode.left = leftNode;
      topNode.right = rightNode;
    }
  }
  return root;
};

const depth = (root: BinaryTreeNode | null): number => {
  if (root === null) {
    return 0;
  }
  const leftHeight = 1 + depth(root.left);
  const rightHeight = 1 + depth(root.right);

  return Math.max(leftHeight, rightHeight);
};

/* 
    UnOptimized
*/
// function (root: TreeNode | null): number {
//     if (root === null) {
//         return 0
//     }
//     const widthPassingThroughRoot = height(root.left) + height(root.right)
//     const diameterLeft = diameterOfBinaryTree(root.left)
//     const diameterRight = diameterOfBinaryTree(root.right)

//     return Math.max(widthPassingThroughRoot, Math.max(diameterLeft, diameterRight))
// };

const calculateDiameter = (root: BinaryTreeNode | null): { depth: number; diameter: number } => {
  if (root === null) {
    return {
      depth: 0,
      diameter: 0,
    };
  }
  const objLeft = calculateDiameter(root.left);
  const objRight = calculateDiameter(root.right);

  const leftHeight = objLeft.depth;
  const rightHeight = objRight.depth;
  const diameterLeft = objLeft.diameter;
  const diameterRight = objRight.diameter;
  const widthPassingThroughRoot = leftHeight + rightHeight;
  return {
    depth: 1 + Math.max(leftHeight, rightHeight),
    diameter: Math.max(widthPassingThroughRoot, Math.max(diameterLeft, diameterRight)),
  };
};

// optimised diameter
const diameter = (root: BinaryTreeNode | null): number => {
  return calculateDiameter(root).diameter;
};

const calcMinDepth = (root: BinaryTreeNode | null, level: number, levels: number[]) => {
  if (root === null) {
    return 0;
  }
  if (root.left === null && root.right === null) {
    levels.push(level);
  }
  calcMinDepth(root.left, level + 1, levels);
  calcMinDepth(root.right, level + 1, levels);
};

function minDepth(root: BinaryTreeNode | null): number {
  const levels: number[] = [];

  calcMinDepth(root, 1, levels);

  let min = levels[0] ?? 0;

  for (const val of levels) {
    min = val < min ? val : min;
  }

  return min;
}

const isMirror = (leftTree: BinaryTreeNode | null, rightTree: BinaryTreeNode | null): boolean => {
  if (leftTree === null || rightTree === null) {
    if (leftTree === null && rightTree === null) {
      return true;
    }
    return false;
  }

  const isLeftEqual = isMirror(leftTree.left, rightTree.right);
  const isRightEqual = isMirror(leftTree.right, rightTree.left);

  const isCurrNodeEqual = leftTree.value === rightTree.value;

  return isLeftEqual && isRightEqual && isCurrNodeEqual;
};

/* 
  https://leetcode.com/problems/symmetric-tree/description/
  Given the root of a binary tree, check whether it is a mirror of itself
  (i.e., symmetric around its center).
*/
function isSymmetric(root: BinaryTreeNode | null): boolean {
  if (root === null) {
    return true;
  }
  return isMirror(root.left, root.right);
}

const input = [1, 2, 4, -1, -1, 5, 7, -1, -1, -1, 3, -1, 6, -1, -1];
const inputLevelOrder = [1, 2, 3, 4, 5, -1, 6, -1, -1, 7, -1, -1, -1, -1, -1];
const inputLevelOrder2 = [1, 2, 3, 4, 5, -1, 6, -1, -1, 7, -1, -1, -1, -1, -1];

const root = buildTreePreOrder(input);

console.log(printPreOrder(root));
console.log(printInOrder(root));
console.log(printPostOrder(root));
console.log(levelOrder(root));

const tree2 = buildLevelOrderTree(inputLevelOrder);
console.log(printPreOrder(tree2));
console.log(printInOrder(tree2));
console.log(printPostOrder(tree2));
console.log(levelOrder(tree2));

const tree3 = buildLevelOrderTree2(inputLevelOrder2);
console.log(printPreOrder(tree3));
console.log(printInOrder(tree3));
console.log(printPostOrder(tree3));
console.log(levelOrder(tree3));
