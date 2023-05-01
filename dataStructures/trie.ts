/* 

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

*/
class TrieNode {
  data: string;
  isTerminal = false;
  alphabetMap: Record<string, TrieNode> = {};

  constructor(data: string) {
    this.data = data;
  }
}

export class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode('');
  }

  // insertion
  insert(word: string): void {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let charNode = node.alphabetMap[char];

      if (charNode) {
        node = charNode;
      } else {
        charNode = new TrieNode(char);
        node.alphabetMap[char] = charNode;
        node = charNode;
      }

      if (i === word.length - 1) {
        charNode.isTerminal = true;
      }
    }
  }

  search(word: string): boolean {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!node.alphabetMap[ch]) {
        return false;
      } else {
        node = node.alphabetMap[ch];
      }

      if (i === word.length - 1) {
        return node.isTerminal;
      }
    }
    return false;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];
      const chNode = node.alphabetMap[ch];
      if (!chNode) {
        return false;
      } else {
        node = chNode;
      }
    }
    return true;
  }
}
