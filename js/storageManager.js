function getFromTimedCache(key, maxAge, callback, callbackIfNotCached) {
	getLargeObject(key, function (timedCacheItemString) {
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

function addToTimedCache(key, value, callback) {
	var timedCacheItem = {};
	timedCacheItem.addTime = Date.now();
	timedCacheItem.data = value;
	
	setLargeObject(key, JSON.stringify(timedCacheItem), callback);
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

/**
 * Allows to save strings longer than QUOTA_BYTES_PER_ITEM in chrome.storage.sync by splitting them into smaller parts.
 * Please note that you still can't save more than QUOTA_BYTES.
 **/
function setLargeObject (key, value, callback) {
	var i = 0,
		cache = {},
		segment,
		cacheKey;

	// split value into chunks and store them in an object indexed by `key_i`
	while(value.length > 0) {
		cacheKey = getCacheKey(key, i);
		//if you are wondering about -2 at the end see: https://code.google.com/p/chromium/issues/detail?id=261572
		segment = value.substr(0, (chrome.storage.sync.QUOTA_BYTES_PER_ITEM/2) - cacheKey.length - 2);
		cache[cacheKey] = segment;
		value = value.substr((chrome.storage.sync.QUOTA_BYTES_PER_ITEM/2) - cacheKey.length - 2);
		i++;
	}

	// store all the chunks
	chrome.storage.sync.set(cache, callback);

	//we need to make sure that after the last chunk we have an empty chunk. Why this is so important?
	// Saving v1 of our object. Chrome sync status: [chunk1v1] [chunk2v1] [chunk3v1]
	// Saving v2 of our object (a bit smaller). Chrome sync status: [chunk1v2] [chunk2v2] [chunk3v1]
	// When reading this configuration back we will end up with chunk3v1 being appended to the chunk1v2+chunk2v2
	chrome.storage.sync.remove(getCacheKey(key, i));
};


/**
 * Retrieves chunks of value stored in chrome.storage.sync and combines them.
 */
function getLargeObject(key, callback) {
	//get everything from storage
	chrome.storage.sync.get(null, function(items) {
		var i, value = "";

		for(i=0; i<chrome.storage.sync.MAX_ITEMS; i++) {
			if(items[getCacheKey(key, i)] === undefined) {
				break;
			}
			value += items[getCacheKey(key, i)];
		}
		callback(value);
	});
};