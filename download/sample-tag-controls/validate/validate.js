/*
 * Sample JsViews tag control: {{validate}} control,
 * derived from {{edit}} control, and {{validation}} group control
 * http://www.jsviews.com/download/sample-tag-controls/validate/validate.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/validate/simple
 * http://www.jsviews.com/#samples/tag-controls/validate/group
 * http://www.jsviews.com/#samples/tag-controls/validate/array-binding
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation-wizard
 * http://www.jsviews.com/#samples/tag-controls/slider/with-validation
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

  $.views.tags({
  validation: {
    init: function() {
      this.childValidates = [];
    },
    validate: function() {
      var l = this.childValidates.length,
          result = true;
      while (l-- && result !== false) {
        result = this.childValidates[l].validate();
      }
      return result;
    },
    clearMessage: function() {
      var l = this.childValidates.length;
      while (l--) {
        this.childValidates[l].clearMessage();
      }
    },
    refreshValidates: function() {
      var l = this.childValidates.length;
      while (l--) {
        this.childValidates[l].refresh();
      }
    },
    addChild: function(child) {
      this.childValidates.push(child);
    },
    removeChild: function(child) {
      var l = this.childValidates.length;
      while (l--) {
        if (this.childValidates[l] === child) {
          this.childValidates.splice(l, 1);
          break;
        }
      }
    },
    onChildValidate: function(child) {
      var groupIsValid = true,
        l = this.childValidates.length;
      while (l--) {
        if (!this.childValidates[l].isValid) {
          groupIsValid = false;
          break;
        }
      }
      $.observable(this).setProperty("isValid", groupIsValid);
    },
    isValid: true,
    dataBoundOnly: true
  },
  validate: {
    baseTag: "radiogroup",
    linkedElement: "select,textarea,input",
    init: function(tagCtx, linkCtx) {
      var tag = this;
      if (tag.radiogroup = tagCtx.props.radiogroup) {
        tag.baseApply(arguments);
      } else if (tag._.inline && !tagCtx.content) {
        tag.template = "<input/>";
      }
      tag.validationGroup = this.parents.validation;
      if (tag.validationGroup) {
        tag.validationGroup.addChild(this);
      }
    },
		render: function(val) {
      var ret,
        tag = this,
        tagCtx = this.tagCtx;
      if (tag._.inline) {
         // Keep same data context for content
        ret = tagCtx.render(tagCtx.view, true);
        // For radio buttons provide wrapper for validation messages
        ret = tag.radiogroup ? ("<div>" + ret + "</div>") : ret;
        return ret;
      }
    },
    onBind: function(tagCtx, linkCtx) {
      var arrayView,
        tag = this,
        target = tag.linkedElem && tag.linkedElem[0];
      if (tag._.inline && target && $.view(target).tag !== tag) {
        // The target element is contained in another tag - so we will find it
        tag.linkedElem = undefined;
      }
      if (!tag.linkedElem || !tag.linkedElem[0]) {
        // {{validate}} may wrap another tag, such as {{slider}}
        // or {{datepicker}} rather than an element such as <input/>
        if (tag.targetTag = tag.childTags()[0]) {
          tag.targetTag.onBeforeChange = function(ev, val) {
            return tag.onBeforeChange.call(tag, ev, val);
          };
        }
      }
      if (tag.radiogroup) {
        this.baseApply(arguments);
      }
    },

    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this,
        props = tagCtx.props;

      if (tag.targetTag) {
        tag.targetTag.setValue(tagCtx.args[0]);
      }

      if (props.preventInvalidData !== undefined) {
        tag.preventInvalidData = props.preventInvalidData;
      } else if (tag.parents.validation) {
        tag.preventInvalidData = tag.parents.validation.tagCtx.props.preventInvalidData;
      }

      if (!tag.messageElem || !tag.messageElem.parentNode) {
        if (tag.targetTag) {
          tag.messageElem = tag.targetTag.linkedElem;
        } else {
          tag.messageElem = tag.radiogroup
            ? tag._.inline ? tag.contents("*").first() : $(linkCtx.elem)
            : tag.linkedElem;
          // messageElem is the linkedElem (or, for radio buttons, the wrapping div)
        }
        if (!tag.messageElem) {
          throw "No message element. Set radiogroup=true for radio buttons";
        }
        tag.messageElem.addClass("val-msg");
      }
      if (!tag.label || !tag.label.parentNode) {
        tag.label = $("<label class=\"error\"></label><br/>").insertAfter(tag.messageElem)[0];
      }
      tag.validate(tagCtx.args[0]); // Validate initial data
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      this.clearMessage();
      return false; // don't rerender
    },
    onBeforeChange: function(ev, eventArgs) {
      if (this.preventInvalidData) {
        this.validate(eventArgs.value);
        return this.isValid;
        // Allow data to be updated to invalid values - unless preventInvalidData set to true
      }
    },
    onDispose: function() {
      if (this.validationGroup) {
        this.validationGroup.removeChild(this);
      }
    },
    validate: function(val) {
      var message, linkedElem, testName, condition,
        tag = this,
        props = tag.tagCtx.props,
        linkedElems = tag.linkedElem;

      if (val === undefined) {
        // If no val passed in, get current value from linkedElem, and validate that
        if (tag._.radio && linkedElems) {
          linkedElems = linkedElems.find("input:checked");
        }
        linkedElem = linkedElems && linkedElems[0];
        val = "";
        if (linkedElem) {
          val = linkedElem.type === "checkbox" ? linkedElem.checked : linkedElem.value;
        } else if (tag.targetTag) {
          val = tag.targetTag.getValue();
        }
        val = val || "";
      }
      tag.clearMessage();

      // Test the validation conditions, one after the other.
      this.isValid = true;
      for (var validator in this.validators) {
        condition = props[validator];
        if (condition !== undefined && this.validators[validator].test(condition, val)) {
          testName = validator;
          this.isValid = false;
          break;
        }
      }
      if (!this.isValid) {// A test failed. Show message for first failed test.
        message = props["msg_" + testName] || this.validators[testName].message;
        if ($.isFunction(message)) {
          message = message(condition, val);
        }
        message = message.replace(/%cond%/g, condition).replace(/%val%/g, val)
        if (tag.label.textContent !== undefined) {
          tag.label.textContent = message;
        } else {
          tag.label.innerText = message; // Older IE does not support textContent
        }
        tag.messageElem.addClass("invalid");
      }
      if (this.validationGroup) {
        this.validationGroup.onChildValidate(this);
      }
      return this.isValid;
    },
    validators: function(validators) {
      for (var validator in validators) {
        this.validators[validator] = validators[validator];
      }
    },
    clearMessage: function() {
      // Clear previous message.
      this.messageElem.removeClass("invalid");
        if (this.label.textContent !== undefined) {
          this.label.textContent = "";
        } else {
          this.label.innerText = ""; // Older IE does not support textContent
        }
    }
  }
});

$.views.tags.validate.validators({
  required: {
    message: "Please provide a value",
    test: function(condition, val) {
      return condition && val === "";
    }
  },
  equal: {
    message: "Value must be %cond%",
    test: function(condition, val) {
      return val !== "" + condition;
    }
  },
  checked: {
    message: function(condition, val) {
      return "Must be " + (condition ? "checked" : "unchecked");
    },
    test: function(condition, val) {
      return (val && val !== "false") !== condition;
    }
  },
  min: {
    message: "Minimum: %cond%",
    test: function(condition, val) {
      return val < condition;
    }
  },
  max: {
    message: "Maximum:  %cond%",
    test: function(condition, val) {
      return val > condition;
    }
  },
  maxLength: {
    message: "Maximum length: %cond%",
    test: function(condition, val) {
      return val.length > condition;
    }
  },
  minLength: {
    message: "Minimum length: %cond%",
    test: function(condition, val) {
      return val.length < condition;
    }
  },
  regex: {
    message: "Invalid string format",
    test: function(condition, val) {
      var regex = condition.test ? condition : new RegExp(condition);
      return !regex.test(val);
    }
  }
});

})(this.jQuery);
