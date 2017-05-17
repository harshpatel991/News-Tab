# rTab
## A Google News RSS feed reader for Chrome's new tab page focusing on being as fast as possible

### [Download for Chrome here](https://chrome.google.com/webstore/detail/news-tab-new-tab-page-rep/cdpnmcehklcfepflojdklfggahnaolid)

![alt text](http://i.imgur.com/b40TFMU.jpg "Image1")

### Features
* Top stores from Google News
* Most visited websites
* Dark Mode
* 12 different themes
* Current weather widget
* Select from 91 different regions and languages including United States, India, China, and others
* Select from  10 different topics including Topic Stories, Business, Technology, Sports, and others

### Technical Features
* Bootstrap 3, jFeed, simpleWeather.js
* Responsive design
* Thumbnails are cached in base64 encoding for 30 minutes in Chrome local storage for speed
* Parsed RSS feeds are cached 30 minutes in Chrome local storage for speed
* Settings stored in Chrome sync'ed storage.
* Fonts included locally for speed
* Weather forecast loaded from Yahoo Weather

### Performance

![alt text](http://i.imgur.com/KR2v5Zy.png "Image4")

### Development
To run JS/CSS/HTML concatenation/uglification/optimization
```bash
> gulp watch
```

To create a release
```bash
> ./release.sh
```

### Screenshots
![alt text](http://i.imgur.com/L9lGqc9.jpg "Image2")
![alt text](http://i.imgur.com/79EwVVe.jpg "Image3")
![alt text](http://i.imgur.com/L9DsmuY.jpg "Image4")
