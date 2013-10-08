var currencies = [
    { name:"US", label:"US Dollar", rate: 1.0, symbol: "$" },
    { name:"EUR", label:"Euro", rate: 0.95, symbol: "Euros: " },
    { name:"GB", label:"Pound", rate: 0.63, symbol: "Pounds: " }
  ],

  orderDetails = {
    name: "",
    selectedMovie: "none",
    selectedCurrency: 1,
    request: ""
  },

  movies = [
    {
      title: "The Red Violin",
      ticketPrice: 18
    },
    {
      title: "The Inheritance",
      ticketPrice: 16.5
    },
    {
      title: "The Incredible Hulk",
      ticketPrice: 21.99
    }
  ],

  contextHelpers = {
    app: {},
    movies: movies,
    convertedPrice: function(selectedMovie, selectedCurrency) {
      var currency = currencies[selectedCurrency];
      if ( selectedMovie !== "none") {
        return currency.symbol
          + parseFloat(movies[selectedMovie].ticketPrice * currency.rate)
            .toFixed(2);
      }
    },
    currencies: currencies,
    selectedTitle: function(selectedMovie) {
      return (selectedMovie!=="none") ? movies[selectedMovie].title : "";
    }
  };

$.templates( "moviePurchaseTemplate", "#moviePurchaseTemplate" );

$.link.moviePurchaseTemplate( "#moviePurchase", orderDetails, contextHelpers );

$( "#submitOrder" ).on( "click", function() {
  alert("You ordered a movie ticket as follows:\n"
    + (window.JSON
    ? JSON.stringify(orderDetails, null, 1).slice(1,-1)
    : orderDetails.selectedMovie));
});
