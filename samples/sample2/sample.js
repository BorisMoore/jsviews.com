var counter = 0,
	people = [
		{
			firstName: "Jeff"
		},
		{
			firstName: "Rebecca"
		}
	];

// Compile templates
$.templates({
	personTmpl1: "#personTmpl1",
	personTmpl2: "#personTmpl2"
});

// Data-link people to the details container, using the personTmpl template
$.link.personTmpl1( "#details1", people );
$.link.personTmpl2( "#details2", people );

// Observable array change: insert two new people
$( "#insertPerson" ).on( "click", function() {
	var insertAt = people.length ? 1 : 0;
	$.observable( people ).insert(
		insertAt, // insert at index 1
		[
			{ firstName: "NewPerson" + counter++ },
			{ firstName: "NewPerson" + counter++ }
		]);
});

// Observable array change: remove
$( "#details1" )
	.on( "click", ".close", function() {
		$.observable( people ).remove( $.view( this ).index, 1 );
	});
