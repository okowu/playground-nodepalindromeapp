'use strict';

const isPalindrome = (message) => {

    if (message === undefined) {
        return false
    }

    if (typeof message !== 'string' || !(/^[A-Za-z]+$/.test(message))) {
        return false
    }

    let left = 0
    let right = message.length - 1

    while (left < right) {
        if (message[left] !== message[right]) {
            return false
        }
        left++
        right--
    }

    return true
}

module.exports = { isPalindrome }