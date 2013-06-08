$.views.tags({
  multisel: {
    init: function(tagCtx) {
      this._optionsTmpl = $.templates(
          "{^{for ~tag.items}}" +
            "<option>{{:name}}</option>" +
          "{{/for}}"
        );
      this.items = tagCtx.props.items;
      this.selectedItems = tagCtx.props.selected;

      if (this.linkCtx) {
        // This is to support the syntax: 
        // <select data-link="{multisel items=items selected=selectedItems}"></select> 
        // Note: If you only support one syntax, you can remove this 
        // and simply declare template: "..." below 
        this.linkCtx.elem.multiple = "multiple";
        this.tagCtx.tmpl = this._optionsTmpl;
      } else {
        // And this is to support the syntax: {^{multisel items=items selected=selectedItems/}}. 
        // Note: If you only support one syntax, you can remove this 
        // and simply declare template: "..." below 
        this.tagCtx.tmpl = $.templates(
          "<select multiple='multiple'>" +
            "{{include tmpl=~tag._optionsTmpl/}}" +
          "</select>"
        );
      }
    },
    onAfterLink: function() {
      var self = this;
      if (!self.elem) {
        self.elem = self.linkCtx ? $(self.parentElem) : self.contents("select");
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
    //template: //you can put the template here if you only want to support one syntax.

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