var person = {
  firstName: "Jeff"
};

// Render to string
var html = $( "#personTmpl" ).render( person );

// Insert as HTML
$( "#details" ).html( html );
