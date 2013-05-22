var movies = [{
   availability: "Available in 'X&Y' Cinemas",
    title: "Meet Joe Black",
    synopsis: "The <span class='role'>grim reaper</span> visits"
	+ "<span class='role'>Bill Parrish</span>..."
  },
  {
    availability: "Available at < 20kms from London",
    title: "Eyes Wide Shut",
    synopsis: "Director <span class='director'>Stanley Kubrick's</span> final film:"
	+ "<br/><br/><img src='http://cdn-4.nflximg.com/US/boxshots/large/5670434.jpg'/>"
  }
];

$.views.converters({
  loc: function (value) {
    var language = this.tagCtx.props.lang;
    var result = "";
      
    switch(language) {
      case "EN":
        result = value;
        break;

      case "FR":
        switch (value) {
          case "Meet Joe Black":
            result = "Rencontrez Joe Black";
            break;

          case "Eyes Wide Shut":
            result = "Les Yeux Grand Ferm\xE9s";
            break;
        }
      break;
    }
    return result;
  }
});

$("#movieList").html(
  $("#movieTemplate").render( movies )
);
