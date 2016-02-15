﻿$(function() {
	window.parent.pagetag && window.parent.pagetag.iframeLoaded(window._tgId, function(sampleData) {
		if (sampleData.html) {
			$(document.body).html(sampleData.html);
		}
		try {
			if (sampleData.code) {
				for (var tmpl in $.templates) {
					delete $.templates[tmpl];
				}
				(new Function(sampleData.code))();
			}
			if (sampleData.markup) {
	//      $.views.settings.debugMode();
				if (sampleData.onlyJsRender) {
					$('#result').html($.templates(sampleData.markup).render(sampleData.data));
				} else {
					$.templates(sampleData.markup).link('#result', sampleData.data);
				}
	//      $.views.settings.debugMode(false);
			}
		} catch(e) {
			(sampleData.markup ? $('#result') : $('body')).html(
				"Error in sample. <button onclick='$(\"#details\").toggle()'>details</button> <div style='display:none;' id=details><em>"
				+ e.message + "</em><div>"
			);
		}
	});
});
