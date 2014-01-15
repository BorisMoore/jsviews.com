/*
 * Sample JsViews tag control: {{validate}} control,
 * derived from {{edit}} control, and {{validation}} group control
 * http://www.jsviews.com/download/sample-tag-controls/validate/validate.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation-wizard
 * http://www.jsviews.com/#samples/tag-controls/slider/with-validation
 * http://www.jsviews.com/#samples/tag-controls/validate/simple
 * http://www.jsviews.com/#samples/tag-controls/validate/group
 * http://www.jsviews.com/#samples/tag-controls/validate/array-binding
 * Copyright 2013, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

var editTag = $.views.tags.edit; // We will derive from the edit tag

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
    dataBoundOnly: true,
  },
  validate: $.extend(true, {}, editTag, {
    onInit: function(tagCtx, linkCtx) {
      // onInit() is called by the base {{edit}} tag, at the end of its init()
      this.validationGroup = this.parents.validation;
      if (this.validationGroup) {
        this.validationGroup.addChild(this);
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this,
        props = tagCtx.props;

      editTag.onAfterLink.apply(tag, arguments);

      if (props.preventInvalidData !== undefined) {
        tag.preventInvalidData = props.preventInvalidData;
      } else if (tag.parents.validation) {
        tag.preventInvalidData = tag.parents.validation.tagCtx.props.preventInvalidData;
      }

      if (!tag.messageElem || !tag.messageElem.parentNode) {
        if (tag.targetTag) {
          tag.messageElem = tag.targetTag.linkedElem;
        } else {
          tag.messageElem = tag.linkedElem.prevObject || tag.linkedElem;
          // messageElem is the linkedElem (or, for radio buttons, the wrapping div)
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

      this.isValid = false; // Assume failure!

      if (val === undefined) {
        // If no val passed in, get current value from linkedElem, and validate that
        if (tag._.radioGroup && linkedElems) {
          linkedElems = linkedElems.filter(":checked");
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
        testName = validator;
        if (condition !== undefined && this.validators[validator].test(condition, val)) {
          this.isValid = false;
          break;
        }
      }
      if (!this.isValid) {// A test failed. Show message for first failed test.
        message = props["msg_" + testName] || this.validators[testName].message;
        if ($.isFunction(message)) {
          message = message(condition, val);
        }
        tag.label.innerText = message.replace(/%cond%/g, condition).replace(/%val%/g, val);
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
      this.label.innerText = "";
    }
  })
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
    message: "Minimun length: %cond%",
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
