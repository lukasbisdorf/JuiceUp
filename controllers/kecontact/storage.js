db = require('../db');

module.exports = class Storage {
	constructor() {
		this._data = {};
		this._history = [];
	}

	getData() {
		return this._data;
	}

	getHistory() {
		return this._history;
	}

	setError(value) {
		db.setError(this._data.Serial, value);
	}

	getError() {
		return db.getError(this._data.Serial);
	}

	saveData(newData) {
		for (let key in newData) {
			if (key != 'ID')
				this._data[key] = newData[key];
		}
	}
	saveHistory(newHistory) {
		let id = newHistory.ID;
		db.addHistoryEntry(this._data.Serial, newHistory)
		this._history[id] = newHistory;
	}
}