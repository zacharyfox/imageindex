window.addEventListener('load', function() { ImageIndex.initialize(); }, false);

var ImageIndex = {
	initialize: function() {
	    dump("ImageIndex initializing\n");
	    
		var appcontent = document.getElementById("appcontent");   // browser
		if (appcontent) {
		    dump("ImageIndex adding listeners\n");
  			appcontent.addEventListener('DOMContentLoaded', this.onPageLoad, true);
		}
	},

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget;
        
        if (doc.title.match(/Index of .*/)) {
            dump("Apache index found, finding images\n");
            var images = doc.evaluate('//a/img[@alt="[IMG]"]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            
            if (images.snapshotLength > 0) {
                for (var i = 0; i < images.snapshotLength; i++) {
                    thisImage = images.snapshotItem(i);
                    
                    thisImage.src = thisImage.parentNode.href;
                    thisImage.style.maxWidth  = '100px';
                    thisImage.style.maxHeight = '100px';
                }
            } else {
                var images = doc.evaluate('//tr/td/img[@alt="[IMG]"]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (images.snapshotLength > 0) {
					for (var i = 0; i < images.snapshotLength; i++) {
						thisImage = images.snapshotItem(i);
                    
						thisImage.src = thisImage.parentNode.nextSibling.firstChild.href;
						thisImage.style.maxWidth  = '100px';
						thisImage.style.maxHeight = '100px';
					}
				} else {
					var images = doc.evaluate('//img[@alt="[IMG]"]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (images.snapshotLength > 0) {
						for (var i = 0; i < images.snapshotLength; i++) {
							thisImage = images.snapshotItem(i);
							relatedAnchor = thisImage.nextSibling;
							if (relatedAnchor.nodeType != 1) {
								relatedAnchor = relatedAnchor.nextSibling;
							}
							thisImage.src = relatedAnchor.href;
							thisImage.style.maxWidth  = '100px';
							thisImage.style.maxHeight = '100px';
						}
					}
				}
            }
        }
    }
}