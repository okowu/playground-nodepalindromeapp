const { validationResult } = require('express-validator')
const { isValidText } = require('../../app/util/validator')

describe('isValidText', () => {

    test('given empty string must return all validation errors', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: '',
            }
        })

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: '',
                    path: 'text',
                    msg: 'text cannot be empty',
                    location: 'body'
                }),
                expect.objectContaining({
                    value: '',
                    path: 'text',
                    msg: 'text must only contains alphabetic characters',
                    location: 'body'
                })
            ])
        )
    })

    test('given numeric string must return strict text validation error', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: '4444',
            }
        })

        expect(result).toHaveLength(1);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: '4444',
                    path: 'text',
                    msg: 'text must only contains alphabetic characters',
                    location: 'body'
                })
            ])
        )
    })

    test('given numeric value must return strict text validation error', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: 9875,
            }
        })

        expect(result).toHaveLength(1);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: '9875',
                    path: 'text',
                    msg: 'text must only contains alphabetic characters',
                    location: 'body'
                })
            ])
        )
    })

    test('given alphaNumeric string must return strict text validation error', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: '124suepkn45',
            }
        })

        expect(result).toHaveLength(1);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: '124suepkn45',
                    path: 'text',
                    msg: 'text must only contains alphabetic characters',
                    location: 'body'
                })
            ])
        )
    })

    test('given special characters string must return strict text validation error', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: 'uybk&*dsu56$',
            }
        })

        expect(result).toHaveLength(1);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    value: 'uybk&*dsu56$',
                    path: 'text',
                    msg: 'text must only contains alphabetic characters',
                    location: 'body'
                })
            ])
        )
    })

    test('given valid string must return empty error array', async () => {
        const result = await isValidText({
            method: 'POST',
            url: '/messages',
            body: {
                text: 'myvalidstring',
            }
        })

        expect(result).toHaveLength(0)
    })

    test('given req without body must return empty error array', async () => {
        const result = await isValidText({
            method: 'GET',
            url: '/messages/1',
            params: {
                id: '1'
            },
            query: {
                search: 'test'
            },
            headers: {
                'authorization': 'Bearer token123',
                'x-custom-header': 'my-value'
            },
            cookies: {
                sessionId: 'abc123'
            }
        })

        expect(result).toHaveLength(0)
    })
})