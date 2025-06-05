'use strict';

const Message = require('../models/message.model');
const { isPalindrome } = require('../util/util')
const { isValidText } = require('../util/validator')
const _ = require('lodash');
const { register } = require('../util/metrics')

const model = new Message()

exports.getMessages = function (req, res) {
    model.find({}, { text: 1 }).exec(function (err, messages) {
        if (err) {
            res.status(500).send({
                message: 'Database error finding messages.'
            });
            return;
        }
        res.json(messages);

    });
};

exports.getSingleMessage = function (req, res) {
    model.findById(req.params.id, { text: 1 })
        .exec(function (err, message) {
            if (_.isEmpty(message) || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }

            res.json(message);
        });
};

exports.postMessage = async function (req, res) {
    console.log(req.body)

    // validate request body
    const errors = await isValidText(req)

    if (!_.isEmpty(errors)) {
        res.status(400).send({ errors })
        return
    }

    // check if the text is a palindrome
    const text = req.body.text

    const data = {
        text,
        isPalindrome: isPalindrome(text)
    }

    try {
        const savedMessage = await model.insert(data)
        res.json(savedMessage);
    } catch (err) {
        console.log(err)
        res.status(err?.status || 500).send({
            message: err?.message || 'Database error saving new message.'
        });
        return;
    }
};

exports.deleteMessage = function (req, res) {

    model.findById(req.params.id)
        .exec(function (err, message) {
            if (_.isEmpty(message) || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }

            model.remove(req.params.id, function (err, removedMessage) {
                if (err) {
                    res.status(500).send({
                        message: 'Database error deleting message.'
                    });
                    return;
                }

                res.json({
                    message: 'The message has been removed.'
                });
            });
        });
};

exports.getHealth = function (req, res) {
    res.json({
        status: 'UP'
    })
};

exports.getMetrics = async function (req, res) {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
};