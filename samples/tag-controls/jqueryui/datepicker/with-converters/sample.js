var model = { date: '/Date(1420063200000+0200)/' };

$.views.converters({
  toDateString: function (wcfDate) {
    return moment(wcfDate).format('DD/MM/YY');
  },
  toWcfDate: function (dateString) {
    return moment(dateString, 'DD/MM/YY').format('/\\D\\at\\e(xZZ)/')
  }
});

var myTmpl = $.templates("#myTmpl");

myTmpl.link("#page", model);
