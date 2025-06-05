const { isPalindrome } = require('../../app/util/util')

describe('isPalindrome', () => {

    test('given undefined must return false', () => {
        expect(isPalindrome(undefined)).toBe(false)
    })

    test('given empty string must return false', () => {
        expect(isPalindrome('')).toBe(false)
    })

    test('given numeric string must return false', () => {
        expect(isPalindrome('45638201')).toBe(false)
    })

    test('given alphaNumeric string must return false', () => {
        expect(isPalindrome('00radar00')).toBe(false)
    })

    test('given special characters string must return false', () => {
        expect(isPalindrome('@@radar@@')).toBe(false)
    })

    test('given radar must return true', () => {
        expect(isPalindrome('radar')).toBe(true)
    })

    test('given maison must return false', () => {
        expect(isPalindrome('maison')).toBe(false)
    })
})