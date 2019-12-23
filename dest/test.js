

const range = function (count, skipZero, descending) {
    // check parameters
    if (typeof(count) !== 'number' | typeof(skipZero) !== 'boolean' | typeof(descending) !== 'boolean' ) {
        console.log('Invalid input')
        return
    }

    let res = [];
    if (skipZero) {
        if (descending) {
            for (let i = count; i > 0; i-- ) {
                res.push(i)
            }
        }
        else {
            for (let i = 1; i <= count; i++ ) {
                res.push(i)
            }
        }
    }
    else {
        if (descending) {
            for (let i = count - 1; i >= 0; i-- ) {
                res.push(i)
            }
        }
        else {
            for (let i = 0; i < count; i++ ) {
                res.push(i)
            }
        }
    }
    return res;
   };


// const minmax = function(list) {
//    list.sort( function(a,b) {
//        return a-b
//    })
//    return [list[0], list[list.length - 1]]
// }

const minmax = function(list) {
    let min = list[0]; 
    let max = list[0];
    for (let item of list) {
        if (item < min) {
            min = item
        }
        if (item > max) {
            max = item
        }
    }
    return [min, max]
} 
