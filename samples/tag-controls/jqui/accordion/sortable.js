function stop( event, ui ) {
  // IE doesn't register the blur when sorting
  //// so trigger focusout handlers to remove .ui-state-focus
  ui.item.children( "h3" ).triggerHandler( "focusout" );
}

var pageTmpl = $.templates("#pageTmpl"),
  model = {selectedPanel: false};

pageTmpl.link("#page", model, {stop: stop});
