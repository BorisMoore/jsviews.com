$.views.tags({
  multisel: {
    init: function(tagCtx) {
      var self = this;
      self._optionsTmpl = "{^{for ~tag.items}}<option>{{:name}}</option>{{/for}}";
      self.items = tagCtx.props.items;
      self.selectedItems = tagCtx.props.selected || [];

      if (self._.inline) {
        self.tagCtx.tmpl = "<select multiple='multiple'>" + self._optionsTmpl + "</select>";
      } else {
        self.linkCtx.elem.multiple = "multiple";
        self.tagCtx.tmpl = self._optionsTmpl;
      }
    },
    onAfterLink: function() {
      var self = this;
      if (!self.elem) {
        self.elem = self._.inline ? self.contents("select") : $(self.parentElem);
        self.elem.on("change", function(ev, evargs) {
          var item = self.items[ev.target.selectedIndex],
            newSelection = self.elem.find("option").map(function(i) {
              return this.selected && self.items[i] || null; 
            }).get();
  
          self._selSet = true;
          $.observable(self.selectedItems).refresh(newSelection);
          self._selSet = false;
        });
        $([self.selectedItems]).on("arrayChange", $.proxy(self.updateSelection, self));
        $([self.items]).on("arrayChange", $.proxy(self.updateItems, self));
        self.updateSelection();
      }
    },
    onDispose: function() {
      $([self.selectedItems]).off("arrayChange", self.updateSelection);
      $([self.items]).off("arrayChange", self.updateItems);
    },
    attr: "html",

    //METHODS
    updateSelection: function() {
      var self = this;
      if (!self._selSet) {
        self.elem.find("option").each(function(i) {
          this.selected = $.inArray(self.items[i], self.selectedItems) > -1;
        });
      }
    },
    updateItems: function() {
      var self = this,
        l = self.selectedItems.length;
      while (l-- > 0) {
        if ($.inArray(self.selectedItems[l], self.items) < 0) {
          $.observable(self.selectedItems).remove(l);
        }
      }
      this.updateSelection();
    }
  }
});

var count = 1,
  myTmpl = $.templates("#myTmpl"),

  items = [{name:"first"}, {name:"second"}, {name:"third"}],
  selectedItems = [items[0], items[2]],
  selectedSelectedItems = [items[2]],

  model = {
    items: items,
    selectedItems: selectedItems,
    selectedSelectedItems: selectedSelectedItems
  };

myTmpl.link("#page", model);

$("#add").on("click", function(){
  $.observable(items).insert(items.length, {name: "new" + count++});
})

$("#remove").on("click", function(){
  $.observable(items).remove(items.length - 1);
})
