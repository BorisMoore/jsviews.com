var data = {
    items: [
      {
        title: "High Tatras",
        icon: "images/high_tatras_min.jpg",
        description: "The peaks of High Tatras",
        image: "images/high_tatras.jpg"
      },
      {
        title: "High Tatras 2",
        icon: "images/high_tatras2_min.jpg",
        description: "The chalet at the Green mountain lake",
        image: "images/high_tatras2.jpg"
      },
      {
        title: "High Tatras 3",
        icon: "images/high_tatras3_min.jpg",
        description: "Planning the ascent",
        image: "images/high_tatras3.jpg"
      }
    ],
    trash: [
      {
        title: "High Tatras 4",
        icon: "images/high_tatras4_min.jpg",
        description: "On top of Kozi kopka",
        image: "images/high_tatras4.jpg"
      }
    ]
  },
  helpers = {
    dropInTrash: function( event, ui ) {
      deleteImage( $.view( ui.draggable ) );
    },
    dropInGallery: function( event, ui ) {
      recycleImage( $.view( ui.draggable ) );
    },
    deleteThis: function( event, evtArgs ) {
      deleteImage( evtArgs.view );
    },
    recycleThis: function( event, evtArgs ) {
      recycleImage( evtArgs.view );
    },
    showDialog: viewLargerImage
  },
  pageTmpl = $.templates("#page");

pageTmpl.link("#content", data, helpers);

// image deletion function
function deleteImage(view) {
  $.observable(data.items).remove(view.getIndex());
  $.observable(data.trash).insert(view.data);
}

// image recycle function
function recycleImage(view) {
  $.observable(data.trash).remove(view.getIndex());
  $.observable(data.items).insert(view.data);
}

// image preview function, demonstrating ui.dialog used as modal window
function viewLargerImage(title, image) {
  $("<img alt='" + title + "' src='" + image
    + "' width='384' height='288' style='display: none; padding: 8px;'/>")
    .appendTo("body")
    .dialog({title: title, width: 400, modal: true});
  return false;
}
