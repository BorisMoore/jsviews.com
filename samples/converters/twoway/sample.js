var days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
  myWeek = {
    dayOff: 1
  };

$.views.converters({
  dayToInt: function( val ) {
    for ( var i = 0; i < 7; i++ ) {
      if ( days[ i ].toLowerCase().slice( 0, val.length ) === val.toLowerCase()) {
        return i;
      }
    }
    return parseInt(val) || val;
  },
  intToDay: function( val ) {
    return days[ val ] || val;
  }
});

// Observable property change
$( "#changeDay" ).on( "click", function() {
  var dayOff = myWeek.dayOff;
  $.observable( myWeek ).setProperty( "dayOff", dayOff < 6 ? dayOff + 1 : 0);
});

var myTmpl = $.templates("#linkedTmpl")

myTmpl.link( "#linked", myWeek );
