const Datastore = require('nedb')
const db = new Datastore()

class Message {
	constructor() {
		db.ensureIndex({ fieldName: 'text', unique: true }, function (err) {
			if (err)
				console.log(err)
		})
	}

	find() {
		return db.find({})
	}

	findById(id) {
		return db.find({ _id: id })
	}

	save(id, update) {
		return db.update({ _id: id }, update, {})
	}

	remove(id, remove) {
		return db.remove({ _id: id }, remove)
	}

	insert(data) {
		return new Promise((resolve, reject) => {
			db.insert(data, (err, newDoc) => {
				if (err) {
					if (err?.errorType === 'uniqueViolated') {
						const message = `Can not insert record '${data.text}' as it already exists`
						const error = new Error(message, { cause: err })
						error.status = 409
						return reject(error)
					}
					return reject(err)
				}
				return resolve(newDoc)
			})
		})
	}
}

module.exports = Message;