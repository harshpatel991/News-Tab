/**
 * Set the image src on the domElement, either get the image from the cache or make a network request for it
 */
function setImageFromCache(url, domElement) {
	getLocalObject("URL:" + url, function(cachedImage) {
		if (cachedImage != null && cachedImage != "") { // found it in the cache
			setImage(domElement, cachedImage);
		} else { // not in the cache
			toDataUrl(url, function (loadedImage) { 
				setLocalObject("URL:" + url, loadedImage); //cache it
				setImage(domElement, loadedImage);
			});
		}
	});
}

function clearImageCache() {
	removeLocalObjectWithPrefix("URL:");
}

function setImage(domElement, image) {
	domElement.attr('src', image);
}

function toDataUrl(src, callback) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = this.height;
		canvas.width = this.width;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL('image/jpeg');
		callback(dataURL);
	};
	img.src = src;
	if (img.complete || img.complete === undefined) {
		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		img.src = src;
	}
}