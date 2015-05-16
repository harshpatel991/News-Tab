function getObject(object, callback) {
	chrome.storage.sync.get(object, callback);
}

function setObject(object, callback) {
	chrome.storage.sync.set(object, callback);
}