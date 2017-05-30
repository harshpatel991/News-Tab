//TODO: this should only be called after the settings menu is opened
// Setup preview on file input change

$(function(){
	$("#uploadCustomImage").click(function () {

		fr = new FileReader();
		fr.onload = function(event) {

			clearCustomImage();
			var file = event.target.result;
			if (file) {
				if ($.inArray(file["type"], ["image/gif", "image/jpeg", "image/png"]) < 0) { //check if image
					console.log("not an image");
					$("#customImageErrorMessage").html('File is not an image');
				} else {
					console.log("its an image");
					window.webkitStorageInfo.requestQuota(PERSISTENT, 1024 * 1024 * 50, function (grantedBytes) {
						window.webkitRequestFileSystem(PERSISTENT, grantedBytes, saveImageFile(file, file.name, setCustomThemeImagePreview), errorHandler);
					}, errorHandler);
				}
			}

		};
		//fr.readAsText(file);
		fr.readAsDataURL(document.getElementById("customImageInput").files[0]);


	});
});


function setCustomThemeImagePreview(url) {
	console.log(url);
	$("#customImagePreview").css('background-image', 'url(' + url + ')');
	$("#customImagePreview").addClass('customImagePreview');
	$('#clearCustomImage').show();
}

function saveImageFile(fileInput, fileName, callback) {
	return function (fileSystem) {
		console.log("saving image");
		console.log(fileName);
		fileSystem.root.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.onerror = function (e) { console.log('Write failed: ' + e.toString()); };
				fileWriter.write(fileInput);
				loadImage(fileSystem, fileName, callback);
			}, errorHandler);
		}, errorHandler);

	}
}

function loadImage(fileSystem, fileName, callback) {
	console.log("loading image");
	fileSystem.root.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
		callback(fileEntry.toURL());
	}, errorHandler);
}

function errorHandler(e) {
	var msg = '';

	console.log(e.code);

	// // switch (e.code) {
	// // 	case FileError.QUOTA_EXCEEDED_ERR:
	// // 		msg = 'QUOTA_EXCEEDED_ERR';
	// // 		break;
	// // 	case FileError.NOT_FOUND_ERR:
	// // 		msg = 'NOT_FOUND_ERR';
	// // 		break;
	// // 	case FileError.SECURITY_ERR:
	// // 		msg = 'SECURITY_ERR';
	// // 		break;
	// // 	case FileError.INVALID_MODIFICATION_ERR:
	// // 		msg = 'INVALID_MODIFICATION_ERR';
	// // 		break;
	// // 	case FileError.INVALID_STATE_ERR:
	// // 		msg = 'INVALID_STATE_ERR';
	// // 		break;
	// // 	default:
	// // 		msg = 'Unknown Error';
	// // 		break;
	// };

	console.log('Error: ' + msg);
}

function onClickClearCustomImage() {
	clearCustomImageFormInput();
	clearCustomImage();
}

// Called when
// 	1. the file input changes
//  2. when the settings modal loads and there is no custom image set
//  3. when the clear button is clicked
function clearCustomImage() {
	console.log("clear custom image");
	$("#customImagePreview").removeClass(); //clear the image preview
	$("#customImageErrorMessage").html(''); //clear the error message
	$("#customImagePreview").removeAttr('style');
	$('#clearCustomImage').hide();
}

// Called when
//  1. The settings modal is opened
//  2. When the clear button is pressed
function clearCustomImageFormInput() {
	$("#customImageInput").val("");
}

function getCurrentCustomImagePreviewImage() {
	var backgroundImage = $('#customImagePreview').css('background-image');
	console.log(backgroundImage);
	if(backgroundImage != null && backgroundImage != 'none') {
		return backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
	}
	return null;
}