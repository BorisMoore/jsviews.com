$(function() {
	window.parent.page && window.parent.page.iframeLoaded(window._tgId, function(sampleData) {
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
			$('#result').html($.templates(sampleData.markup).render(sampleData.data));
		}
	});
});
