'use strict';

const { checkSchema } = require('express-validator')

const isValidText = async (req) => {

    if (!req.body) {
        return []
    }

    const result = await checkSchema({
        text: {
            trim: true,
            notEmpty: {
                errorMessage: 'text cannot be empty'
            },
            isAlpha: {
                errorMessage: 'text must only contains alphabetic characters'
            }
        }
    }, ['body']).run(req)

    return result?.[0]?.array() || []
}

module.exports = { isValidText }