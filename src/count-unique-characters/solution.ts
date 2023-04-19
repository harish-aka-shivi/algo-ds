const countUniqueChars = (s: string) => {
    const unique = s.split('').reduce((acc, item) => {
        if (acc[item]) {
            acc[item] = -1
        } else {
            acc[item] = 1
        }
        return acc
    }, {} as Record<string, number>)

    return Object.values(unique).filter(vl => vl === 1).length
}

function uniqueLetterString(s: string): number {
    let count = 0
    for(let i = 0; i < s.length; i++) {
        for(let j = i + 1; j <= s.length; j++) {
            const substr = s.slice(i, j)
            const uniqueCount = countUniqueChars(substr)
            count += uniqueCount
        }
    }

    return count
};