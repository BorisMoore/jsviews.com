var firstJsViews = window.noConflictTest,
	secondJsViews = jsviews,
	newJsViews = jsviews.noConflict();
	window.noConflictTest =
		jsviews === firstJsViews
		&& newJsViews !== jsviews
		&& newJsViews === secondJsViews;
