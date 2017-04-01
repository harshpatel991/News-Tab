function getFromTimedCache(key, maxAge, callback, callbackIfNotCached) {
	getLocalObject(key, function (timedCacheItemString) {
		if (timedCacheItemString != null && timedCacheItemString != "") {
			var timedCacheItem = JSON.parse(timedCacheItemString);
			if (timedCacheItem == {} || timedCacheItem == "" || timedCacheItem.data == "" || (Date.now() - timedCacheItem.addTime) > maxAge) {
				callbackIfNotCached();
			} else {
				callback(timedCacheItem.data);
			}
		} else {
			callbackIfNotCached();
		}
	});
}

function addToTimedCache(key, value) {
	var timedCacheItem = {};
	timedCacheItem.addTime = Date.now();
	timedCacheItem.data = value;
	
	setLocalObject(key, JSON.stringify(timedCacheItem));
}

/**
 * @param object - A dictionary of default values that are not in storage
 * @param callback
 */
function getObject(object, callback) {
	chrome.storage.sync.get(object, callback);
}

function setObject(object, callback) {
	chrome.storage.sync.set(object, callback);
}

//helper
function getCacheKey(key, i) {
	return (i === 0) ? key : key + "_" + i;
}

function deleteLargeObject(key) {
	//get everything from storage
	var toRemove = [];

	chrome.storage.sync.get(null, function(items) {
		var i;
		for(i=0; i<chrome.storage.sync.MAX_ITEMS; i++) {
			if(items[getCacheKey(key, i)] === undefined) {
				break;
			}
			toRemove.push(getCacheKey(key, i));
		}
		chrome.storage.sync.remove(toRemove, function(removed) {});
	});
}

/**
 * Saves the key-value pair in chrome local storage
 */
function setLocalObject (key, value) {
	var cache = {};
	cache[key] = value;
	chrome.storage.local.set(cache);
};

/**
 * Invokes callback function with the value in chrome local storage corresponding to the key
 */
function getLocalObject(key, callback) {
	chrome.storage.local.get(key, function (item) {
		callback(item[key]);
	});
};