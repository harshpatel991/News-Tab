var IMAGE_DIRECTORY = '../images/themes/';
var THEME_IMAGES = {aurora: 'aurora.jpg', canyon: 'canyon.jpg', ocean: 'ocean.jpg', brick: 'brick.jpg', farm: 'farm.jpg', mountain: 'mountain.jpg', beach: 'beach.jpg', beach2: 'beach2.jpg', beach3: 'beach3.jpg', islands: 'islands.jpg', seaside: 'seaside.jpg', waterfall: 'waterfall.jpg'};
var CUSTOM_THEMES = "CUSTOM_THEMES";

function getCustomThemes(callback) {
    getLocalObject(CUSTOM_THEMES, callback);
}

function setTheme() {
    var imagePath;
    if(settings.THEME.startsWith('filesystem')) {
        imagePath = settings.THEME;
    } else {
        imagePath = IMAGE_DIRECTORY + THEME_IMAGES[settings.THEME];
    }

    var image = new Image(); // load image in background
    image.onload = function () {
        $('#header').css({'background-image': 'url(' + this.src + ')', opacity: 1});
    };
    image.onerror = function() {
        //TODO: on image load error, clear the Custom Image
    };
    image.src = imagePath;
}

function setupUploadButtonClickBehaviour() {
	$("#uploadCustomImage").click(function () {
		var file = document.getElementById("customImageInput").files[0];
		var fr = new FileReader();
		fr.onload = function() {
            clearErrorMessage();
            clearUploadFormInput();
			if (file) {
				if ($.inArray(file.type, ["image/gif", "image/jpeg", "image/png"]) < 0) {
					$("#customImageErrorMessage").html('File is not an image');
				} else {
                    navigator.webkitPersistentStorage.requestQuota(file.size, function (grantedBytes) { //TODO: move this to storageManger
						window.webkitRequestFileSystem(PERSISTENT, grantedBytes, saveImageFile(file, file.name, imageSaved), errorHandler);
					}, errorHandler);
				}
			}
		};
		fr.readAsDataURL(file);
	});
};

// After the image file is saved, update our storage so we have a record of it
function imageSaved(url) {
	getLocalObject(CUSTOM_THEMES, function(customThemes) { //load the current set of custom themes
		if (customThemes == null) {
            customThemes = {};
        }
        customThemes[url] = url;
        setLocalObject(CUSTOM_THEMES, customThemes);
        $("#theme").append(getThemeSelectOptionHTML(url)); // add the new element to the list
        $("#theme").val(url); // pre-select the new element
	});
}

function saveImageFile(fileInput, fileName, callback) {
	return function (fileSystem) {
		fileSystem.root.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.onerror = function (e) {
					//TODO: fire analytics event with e.getMessage()
				};
				fileWriter.write(fileInput);
				getFilePathAsURL(fileSystem, fileName, callback);
			}, errorHandler);
		}, errorHandler);

	}
}

function getFilePathAsURL(fileSystem, fileName, callback) {
	fileSystem.root.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {
		callback(fileEntry.toURL());
	}, errorHandler);
}

function errorHandler(e) {
	//TODO: log e.code to analytics
}

function clearErrorMessage() {
	$("#customImageErrorMessage").html('');
}

function clearUploadFormInput() {
	$("#customImageInput").val('');
}

function getThemeSelectOptionHTML(themeId){
    return '<option value="' + themeId + '">' + getPrettyThemeName(themeId) + '</option>'
}

function getPrettyThemeName(name) {
    if(name.startsWith('filesystem')) {
        return name.replace(/^.*[\\\/]/, ''); //get just the file name
    } else {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}