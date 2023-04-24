

/* 

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

 */


// optimized
const uniqueLetterString = (s: string) => {
    const positionMap = {} as Record<string, number[]>
    for(let i = 0; i < s.length; i++) {
        if (!positionMap[s[i]]) {
            positionMap[s[i]] = [-1, i]
        } else {
            positionMap[s[i]].push(i)
        }
    }

    Object.values(positionMap).forEach(val => {
        val.push(s.length)
    })


    // a b b a
    // a: {0: [-1, 3], 3: [3, -1]}
    // {a: [-1, 0, 3], b: [-1, 1,2] }

    let sum = 0

    for(let i = 0; i < s.length; i++) {
        const pos = positionMap[s[i]]
        const left = pos[0]
        const right = pos[2]
        const current = pos[1]

        const leftPossibleNumber =  current - left
        const rightPossibleNumber = right - current

        pos.splice(0, 1)

        sum += leftPossibleNumber * rightPossibleNumber
    }

    return sum

}