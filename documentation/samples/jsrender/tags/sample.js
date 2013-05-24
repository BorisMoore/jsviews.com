$.views.tags({

  sort: function( array ){
    var ret = "";
    if ( this.tagCtx.props.reverse ) {
      // Render in reverse order
      for ( var i = array.length; i; i-- ) {
        ret += this.tagCtx.render( array[ i - 1 ] );
      }
    } else {
      // Render in original order
      ret += this.tagCtx.render( array );
    }
    return ret;
  }

});

var movies = [
  {
    title: "Meet Joe Black",
    languages: [
      { name: "English" },
      { name: "French" }
    ]
  },
  {
    title: "Eyes Wide Shut",
    languages: [
      { name: "French" },
      { name: "German" },
      { name: "Spanish" }
    ]
  }
];

$( "#movieList" ).html(
  $( "#movieTemplate" ).render( movies )
);