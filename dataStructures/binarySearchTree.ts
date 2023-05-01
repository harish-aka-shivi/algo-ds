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

const findMinValue = (root: BinarySearchTreeNode | null): BinarySearchTreeNode | null => {
  if (root === null) {
    return null;
  }
  const ret = findMinValue(root.left);
  return ret === null ? root : ret;
};

const deleteNode = (root: BinarySearchTreeNode | null, key: number): BinarySearchTreeNode | null => {
  if (root === null) {
    return null;
  }

  if (key < root.value) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.value) {
    root.right = deleteNode(root.right, key);
  } else {
    if (root.left === null && root.right === null) {
      root = null;
    } else if (root.left === null) {
      root = root.right;
    } else if (root.right === null) {
      root = root.left;
    } else {
      const nextMinRoot = findMinValue(root.right);
      const nextMinValue = nextMinRoot?.value ?? null;
      if (nextMinValue !== null) {
        root.value = nextMinValue;
        root.right = deleteNode(root.right, nextMinValue);
      }
    }
  }

  return root;
};

const bstFromPreorder = (preOrder: number[]): BinarySearchTreeNode | null => {
  let i = 1;
  const root = new BinarySearchTreeNode(preOrder[0]);
  while (i < preOrder.length) {
    insertNode(root, preOrder[i]);
    i++;
  }

  return root;
};

const invertTree = (root: BinarySearchTreeNode | null): BinarySearchTreeNode | null => {
  if (root === null) {
    return null;
  }

  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;

  return root;
};

const isValid = (
  root: BinarySearchTreeNode | null,
): {
  max: number | null;
  min: number | null;
  isValidSubtrees: boolean;
} => {
  if (root === null) {
    return {
      isValidSubtrees: true,
      min: null,
      max: null,
    };
  }

  const { isValidSubtrees: isLeftValid, max: leftMax, min: leftMin } = isValid(root.left);
  const { isValidSubtrees: isRightValid, max: rightMax, min: rightMin } = isValid(root.right);

  const tempLeftMax = leftMax === null ? Number.MIN_SAFE_INTEGER : leftMax;
  const tempRightMax = rightMax === null ? Number.MIN_SAFE_INTEGER : rightMax;
  const treeMaxAtRoot = Math.max(tempLeftMax, tempRightMax, root.value);

  const tempLeftMin = leftMin === null ? Number.MAX_SAFE_INTEGER : leftMin;
  const tempRightMin = rightMin === null ? Number.MAX_SAFE_INTEGER : rightMin;
  const treeMinAtRoot = Math.min(tempLeftMin, tempRightMin, root.value);

  return {
    isValidSubtrees: isLeftValid && isRightValid && root.value > tempLeftMax && root.value < tempRightMin,
    max: treeMaxAtRoot,
    min: treeMinAtRoot,
  };
};

function isValidBST(root: BinarySearchTreeNode | null): boolean {
  return isValid(root).isValidSubtrees;
}
