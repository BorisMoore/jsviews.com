$(function() {
	window.parent.pagetag && window.parent.pagetag.iframeLoaded(window._tgId, function(sampleData) {
		if (sampleData.html) {
			$(document.body).html(sampleData.html);
		}
		if (sampleData.code) {
			try {
				(new Function(sampleData.code))();
			}
			catch(e) {}
		}
		if (sampleData.markup) {
			if (sampleData.onlyJsRender) {
				$('#result').html($.templates(sampleData.markup).render(sampleData.data));
			} else {
				$.templates(sampleData.markup).link('#result', sampleData.data);
			}
		}
	});
});
