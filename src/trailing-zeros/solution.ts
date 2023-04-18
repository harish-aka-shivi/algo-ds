const trailingZeroes = (n: number): number => {
    let i = n
    let zeroCount = 0
    while (i > 0) {
      let j = i
      while (j % 5 === 0) {
        zeroCount++
        j = j / 5
      }
      i -= 1
    }
    return zeroCount
};