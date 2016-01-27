var content = $.views.documentation.content;

content.find.jsrapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsrapi")) ||
{
  "jsrapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: New topics are being added regularly to this documentation.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "jsrtags": {
    "sections": [
      {
        "_type": "links",
        "title": "Tag syntax",
        "text": "Tag syntax\n"
      },
      {
        "_type": "para",
        "title": "Tags without content",
        "text": "Tags without content\n\n{{: ...}} (Evaluate)\n{{> ...}} (HTML encode)\n{{!-- ... --}} (Comment)\n{{* ... }} and {{*: ...}} (Allow code)\n\n"
      },
      {
        "_type": "para",
        "title": "Block tags",
        "text": "Block tags\n\n{{include ...}} (Template composition – partials)\n{{for ...}} (Template composition, with iteration over arrays)\n{{props ...}} (Iteration over properties of an object)\n{{if ...}} (Conditional inclusion)\n{{myTag ...}} (Custom tags)\n\n"
      },
      {
        "_type": "para",
        "title": "Alternative content blocks",
        "text": "Alternative content blocks\n\n{{else ...}} (Content block separator)\n\n"
      }
    ]
  },
  "assigntag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{: ...}}",
        "text": "{{: ...}}\nGet the value of the data path or expression, and insert it into the rendered output as a string\nEvaluate the data-path or expression\n\n{{:address.street}}\n\n"
      },
      {
        "_type": "para",
        "title": "Here are some examples:",
        "text": "Here are some examples:\n(Note the use of different kinds of data-path and expression in the different examples)\n"
      },
      {
        "_type": "sample",
        "title": "{{:dataproperty}}",
        "text": "{{:dataproperty}}\nData:\n\n{name: \"Pete\"}\n\nTemplate:\n\n{{:name}}\n\n"
      },
      {
        "_type": "sample",
        "title": "{{:data.paths}}",
        "text": "{{:data.paths}}\n{\n  name: \"Pete\",\n  address: {\n    city: \"Seattle\"\n  }\n}\n\n~root is the top-level data, and #data is the current data item\n{{:name}} ... {{:address.city}}\n\n... {{:~root.address.city}}\n\n... {{:#data.address.city}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "{{:#index ...}}",
        "text": "{{:#index ...}}\n[\n  {name: \"Pete\", ...},\n  {name: \"Heidi\", ...}\n]\n\n#xxx is the xxx property of the current view – so #index is the view.index\n{{:#index+1}}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "htmltag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{>...}}",
        "text": "{{>...}}\nGet the HTML-encoded value of the data path or expression, and insert it into the rendered output\nEvaluate the data-path or expression, and HTML encode the result\n\n{{>address.street}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "{description: \"A <b>very nice</b> apartment\"}\n\n{{:description}}\n...\n{{>description}}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "includetag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{include tmpl=... /}}",
        "text": "{{include tmpl=... /}}\nTemplate composition: – Include the referenced template: tmpl, rendered using the current data context.\nInclude the specified template\n\n{{include tmpl=\"insertedPersonTemplate\" /}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n{{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{include}} to move to a new data context",
        "text": "Using {{include}} to move to a new data context\n{{include}} is similar to {{for}} in that it can take an argument for moving to a new data context – as in the following examples:\nBlock tag with inline content:\n{{include address}}\n  {{:street}}\n{{/include}}\n\nSelf-closing tag, referencing block content as tmpl=... :\n{{include address tmpl=\"#addressTemplate\"/}}\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  {{:street}}\n</script>\n\nThe above two examples are equivalent to:\n{{:address.street}}\n\n"
      },
      {
        "_type": "tag",
        "title": "{{include pathOrExpr}}",
        "text": "{{include pathOrExpr}}\nTemplate composition: – Render the block content of the {{include}} (or the referenced external template), using the object or array specified by the path or expression as data context.(Similar to {{for pathOrExpr}} but with no iteration over arrays...)\nRender the block content of the tag, with the given object or array as data context\n\n{{include billing.address}}\n  {{:city}}\n{{/include}}\n\nRender the specified template, with the given object or array as data context\n\n{{include billing.address tmpl=\"addressTmpl\" /}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Unlike {{for objectOrArray}}, {{include objectOrArray}} does not iterate over arrays.\nConsider this example:\nNumber of friends: {{:friends.length}}        {{!-- Get 'length' of 'friends' array --}}\nFriends:\n{{for friends}}                               {{!-- Iterate over 'friends' array --}}\n  {{name:}}                                   {{!-- Current data context (#data) is a 'friend'. Get 'name' --}}   \n{{/for}}\n\nThe example could actually be rewritten, equivalently, as follows:\n{{include friends}}                           {{!-- Move to 'friends' array as data context, no iteration --}}\n  Number of friends: {{:length}}              {{!-- Current data context (#data) is 'friends'. Get 'length' --}}\n  Friends:\n  {{for}}    {{!-- or {{for #data}} ... --}}  {{!-- Iterate over current data context (friends array) --}}\n    {{name:}} \n  {{/for}}\n{{/include}}\n\nHere it is as a running sample:\n"
      },
      {
        "_type": "sample",
        "title": "{{include array}} does not iterate",
        "text": "{{include array}} does not iterate\n{{include friends}}:\n  Number of friends {{:length}}\n  ...\n{{/include}}\n\n\n"
      }
    ]
  },
  "fortag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{for ...}}",
        "text": "{{for ...}}\nTemplate composition: – Render the block content of the {{for}} (or the referenced external template), using the object or array specified by the path or expression as data context. If it is an array, iterate over the array, rendering once for each item.\nRender the block content of the tag for the given object, or iterate over the given array\n\n{{for billing.address}}\n  {{:city}}\n{{/for}}\n\nRender the specified template for the given object, or iterate over the given array\n\n{{for billing.address tmpl=\"addressTmpl\" /}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here are some examples:\n"
      },
      {
        "_type": "sample",
        "title": "{{for object}}",
        "text": "{{for object}}\n\n{{:name}} lives in \n{{for address}}\n  {{>city}}\n{{/for}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "{{for object tmpl=... /}}",
        "text": "{{for object tmpl=... /}}\n{{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>city}}</b>\n</script>\n\n\n"
      },
      {
        "_type": "sample",
        "title": "{{for array}}",
        "text": "{{for array}}\n\n{{:title}}\n\n  {{for members}}\n      {{:name}} ...\n  {{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{for}}",
        "text": "Using the {{else}} tag with {{for}}\nUsing the {{else}} tag between {{for}} and {{/for}}, allows alternate rendering based on the object or array returned from the path or expression {{for pathOrExpr}}\n"
      },
      {
        "_type": "tag",
        "title": "{{for ...}}...{{else}}...{{/for}}",
        "text": "{{for ...}}...{{else}}...{{/for}}\nConditional blocks: – Render the block content of the {{for}} tag (or referenced template) if the object is defined and is not an empty array, otherwise render the {{else}} block (or template)\nRender first block if array is not empty, otherwise render second block\n\n{{for members}}\n    Name: {{:name}}\n{{else}}\n    No members...\n{{/for}}\n\n"
      },
      {
        "_type": "sample",
        "text": "\n{{for members}}\n  {{:name}}\n{{else}}\n  No members!\n{{/for}}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "propstag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{props ...}}",
        "text": "{{props ...}}\nTemplate composition: – Iterate over the properties of the object, and render the block content of the {{props}} tag (or the referenced external template) once for each property – using as data context: {key: propertyName, prop: propertyValue}.\nRender the block content of the tag for each property of the given object\n\n{{props billing.address}}\n  {{>key}}: {{>prop}}\n{{/props}}\n\nRender the specified template once for each property of the given object\n\n{{props billing.address tmpl=\"addressTmpl\" /}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here are some examples:\n"
      },
      {
        "_type": "sample",
        "title": "{{props object}}",
        "text": "{{props object}}\n\n...\n{{props address}}\n  {{>key}}: {{>prop}}\n{{/props}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "{{props object tmpl=... /}}",
        "text": "{{props object tmpl=... /}}\n{{props address tmpl=\"#addressTemplate\" /}}\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{props}}",
        "text": "Using the {{else}} tag with {{props}}\nUsing the {{else}} tag between {{props}} and {{/props}}, allows alternate rendering based on the object returned from the path or expression {{props pathOrExpr}}\n"
      },
      {
        "_type": "tag",
        "title": "{{props ...}}...{{else}}...{{/props}}",
        "text": "{{props ...}}...{{else}}...{{/props}}\nConditional blocks: – Render the block content of the {{prop}} tag (or referenced template) if the object is defined and is not an empty object (no properties), otherwise render the {{else}} block (or template)\nRender first block if object is not empty, otherwise render second block\n\n{{props address}}\n  Key: {{:key}} Value: {{:prop}}\n{{else}}\n  No properties...\n{{/for}}\n\n"
      },
      {
        "_type": "sample",
        "text": "\n{{props address}}\n  {{>key}}: {{>prop}}\n{{else}}\n  The address is blank (no properties)!\n{{/props}}\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "iftag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{if ...}}",
        "text": "{{if ...}}\nConditional inclusion: – Render the block content of the {{if}} tag (or the referenced external template) only if the data-path or expression evaluates to true ('or truthy')\nRender the block only if the expression is true\n\n{{if nickname}}\n  Nickname: {{:nickname}}\n{{/if}}\n\nRender the specified template only if the expression is true\n\n{{if nickname tmpl=\"nicknameTemplate\" /}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{if}}",
        "text": "Using the {{else}} tag with {{if}}\nUsing the {{else}} tag between {{if}} and {{/if}}, allows alternate rendering based on 'if … else …' logic:\n"
      },
      {
        "_type": "tag",
        "title": "{{if ...}}...{{else}}...{{/if}}",
        "text": "{{if ...}}...{{else}}...{{/if}}\nAlternative conditional blocks: – Render the block content of the {{if}} tag (or referenced template) if the expression is true, otherwise render the {{else}} block (or template)\nRender first block if condition is true, otherwise render second block\n\n{{if nickname}}\n  Nickname: {{:nickname}}\n{{else}}\n  No nickname...\n{{/if}}\n\nRender first template if condition is true, otherwise render second template\n\n{{if nickname tmpl=\"nicknameTemplate\"}}\n{{else tmpl=\"noNicknameTemplate\"}}\n{{/if}}\n\n"
      },
      {
        "_type": "para",
        "title": "else and elseif",
        "text": "else and elseif\nYou can add more than one {{else}} tag between {{if}} and {{/if}}, to get alternate rendering based on 'if … elseif … else …' logic. For elseif, just include an expression…:\n"
      },
      {
        "_type": "tag",
        "title": "{{if ....}}...{{else ...}}...{{else}}...{{/if}}",
        "text": "{{if ....}}...{{else ...}}...{{else}}...{{/if}}\nMultiple alternative conditional blocks: – Render the first {{if}} or {{else}} block for which the expression is true. If none are true, and there is an {{else}} without an expression, render that block\nRender first block for which condition is true, otherwise last block\n\n{{if nickname}}\n  Nickname: {{:nickname}}\n{{else altnickname}}\n  Alternate nickname: {{:altnickname}}\n{{else}}\n  No nickname...\n{{/if}}\n\n"
      },
      {
        "_type": "sample",
        "title": "{{if}}...{{else}}...{{/if}}",
        "text": "{{if}}...{{else}}...{{/if}}\n[\n  {title: \"The A team\", members: [...], standby: [...]},\n  {title: \"The B team\", members: [], standby: [...]},\n  {title: \"The C team\", standby: []}\n]\n\n{{if members && members.length}}\n  ...\n{{else standby && standby.length}}\n  Standby only:\n  ...\n{{else}}\n  No members!\n{{/if}}\n\n\n"
      }
    ]
  },
  "elsetag": {
    "sections": [
      {
        "_type": "para",
        "title": "{{else}} can be used with {{if}}, {{for}}, {{props}} or any custom tag!",
        "text": "{{else}} can be used with {{if}}, {{for}}, {{props}} or any custom tag!\nThe {{else}} tag acts as a separator, for block tags, to divide the content of a tag into two or more different content blocks.\nSo it allows a block tag to provide specific behavior involving more than one content block.\nFor example, the {{if}} tag uses {{else}} to provide if-else, or if-elseif-else … behavior:\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n\nAnd the {{for}} tag accepts alternative content to render if an array is empty (or an array or object is null or undefined):\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n\nSimilarly you can use {{else}} with a custom tag, such as in this sample:\n{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n\n"
      },
      {
        "_type": "links",
        "title": "See also",
        "text": "See also\n"
      }
    ]
  },
  "commenttag": {
    "sections": [
      {
        "_type": "tag",
        "title": "{{!-- a comment --}}",
        "text": "{{!-- a comment --}}\nAdding comments to templates, or commenting out sections of a template\nThe comment will be ignored during template rendering - and will produce no output\n\n{{!-- this is a comment --}}\n\nThe comment can be multiline. All content will be ignored during template rendering - and will produce no output\n\n{{!-- this section will be omitted \n\nDo I really want this?{{:password}}\n\n--}}\n\n"
      },
      {
        "_type": "para",
        "title": "JsRender comment tags versus HTML comments",
        "text": "JsRender comment tags versus HTML comments\nYou can include\n<!-- This is an HTML comment -->\n\n— but unlike the JsRender comment tag, the HTML comment will not be ignored by JsRender or JsViews. It will be included in the rendered output, and will get inserted into the DOM along with other rendered markup.\n"
      }
    ]
  },
  "allowcodetag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates allow you to write rich expressions within the template tags, such as {{: someExpression}}. Nevertheless, in order to improve encapsulation and maintainability, they don’t allow arbitrary code. For example, they don’t allow you to access global variables, like window.\nIf you want complete freedom to insert any code into a compiled template, you can set allowCode to true, either globally, or specifically for that template. You can then insert any code by using the {{* ... }} tag, or you can return (render into the template output) the result of evaluating any expression, using the {{*: ... }} tag.\n"
      },
      {
        "_type": "tag",
        "title": "{{*... /}}",
        "text": "{{*... /}}\nInsert code into the template\nIf allowCode is set to true, include any code in the compiled template.\n\n{{* window.myvar=2; myvar+=4; }}\n\n"
      },
      {
        "_type": "tag",
        "title": "{{*: ... /}}",
        "text": "{{*: ... /}}\nEvaluate any code expression\nIf allowCode is set to true, evaluate any expression, and insert the result into the rendered output.\n\n{{*: myvar/2 }}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example, with allowCode set to true globally:\n$.views.settings.allowCode=true;\n\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "Enable allowCode in all templates:\n$.views.settings.allowCode=true;\n\nDefine a global variable, then increment it:\n{{* window.myvar=2; myvar+=4; }}\n\nInsert the value into the rendered output:\n<div> Initial value: {{*:myvar}}</div>\n\nIncrement the value again, and output the new value:\n{{* window.myvar+=11; }}\n\n<div> New value: {{*:myvar}}</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is an example that uses both regular JsRender tags, like {{for}}, and allowCode tags:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "$.views.settings.allowCode=true; \n\nDefine a global variable:\n{{* window.total = 0}}\n\nIterate through a list, and use {{* ...}} to increment the total, and {{*:}} to return each value:\n{{for list}}\n  {{* total += data}}\n    <li>\n      Amount {{:}} (Running total: {{*: total}})\n   </li>\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is another example, in which we will replace the {{for list}} iteration by pure code-based iteration using {{* ...}}. This makes it easy to iterate only over the odd members of the array.\nThis time we will enable code insertion just for this template:\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "Enable allowCode just for this template:\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n\nInsert template code to iterate over odd numbers:\n{{* for (i=0; i<data.list.length; i+=2) { }}\n\nOutput the 1-based index and the value:\n{{*: i+1}}: Amount {{*:data.list[i]}}\n\nInsert the end of the for block, {{* } }} into the template code:\n {{* } }}\n\n\n"
      }
    ]
  },
  "customtagsapi": {
    "sections": [
      {
        "_type": "para",
        "title": "Defining custom tags",
        "text": "Defining custom tags\nJsRender deliberately has only a small number of built-in tags – each of which is very flexible and useful. This is intended to reduce the 'learning curve’. And at the same time JsRender makes it very easy to create your own custom tags:\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "rendertmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A template is rendered by calling the render() method.\nThe render(data, helpersOrContext) method takes as parameters the data (used as the ‘data context’ during the rendering), and optionally additional metadata or contextual helpers. It returns a string – which is the rendered template – typically HTML markup with data values or computed values inserted at appropriate points in the string.\nThere are three ways of calling the render() method:\n\nIf you have a reference to the template object - myTmpl, call myTmpl.render(…)\nIf you have registered the template by name - \"myTmpl\", call $.render.myTmpl(…)\nIf the template is declared in a script block, with selector \"#myTmpl\", you can also call $(“#myTmpl”).render(…)\n\n"
      },
      {
        "_type": "links",
        "title": "Links",
        "text": "Links\n"
      }
    ]
  },
  "tmplrender": {
    "sections": [
      {
        "_type": "para",
        "title": "myTmpl.render()",
        "text": "myTmpl.render()\nIf myTmpl is the compiled template object for your template, you can render it using the myTmpl.render() method – which takes a data object or array (as well as an optional helpersOrContext object), and returns the rendered template as a string.\nThere is also a shortcut version of the render() method: you can call the template object itself as a function: var html = myTmpl(data) – which is equivalent to var html = myTmpl.render(data).\nTo get a template object from a template string, a template declared in a script block, or a previously registered named template, see $.templates().\n"
      },
      {
        "_type": "api",
        "title": "template.render(data)",
        "text": "template.render(data)\nRender a template against data, and return a string.\nRender template against data\n\nvar html = myTmpl.render(myData);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an object to the render() method.\n— The template is rendered once, with the object as data context:\n"
      },
      {
        "_type": "sample",
        "title": "template.render(object):",
        "text": "template.render(object):\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar html = myTmpl.render(person);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the render() method.\n— The template is rendered once for each item in the array:\n"
      },
      {
        "_type": "sample",
        "title": "template.render(array):",
        "text": "template.render(array):\n\nvar html = myTmpl.render(people);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing helpers to the render() method.\n"
      },
      {
        "_type": "api",
        "title": "template.render(data, helpersOrContext)",
        "text": "template.render(data, helpersOrContext)\nRender a template against data, along with helper objects or context, and return a string\nRender template against data, and pass in helpers\n\nvar html = myTmpl.render(myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can pass in any JavaScript type (object, string, number, function…) as helpers on the helpersOrContext object, and use them as metadata, or as helper functions for formatting etc.\nNote: By passing in helpers in this way, you are making them specific to this render call. Alternatively, you can declare helpers globally, – and you can also declare helpers that are private to a specific template. See Registering helpers: $.views.helpers() for details…\nWithin the template, helpers (whether global, or passed in to the render() method) are accessed by helper paths: ~keyName.\nFor example you might pass in an object with some utility functions:\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nvar html = myTmpl.render(myData, myHelpers);\n\n– and access them in the template using a helper path such as:\n{{:~util.split(fullName, 0)}}\n\nSee Registering helpers.\n"
      },
      {
        "_type": "sample",
        "title": "template.render(object, myHelpers):",
        "text": "template.render(object, myHelpers):\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = myTmpl.render(person, myHelpers);\n\n<td style=\"color:{{:~color}};\">\n  {{:~format(name)}}\n</td>\n\nClick Try it and change the color to \"green\"…\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "d.render": {
    "sections": [
      {
        "_type": "para",
        "title": "$.render.myTmpl()",
        "text": "$.render.myTmpl()\nIf a template has been registered as a named template:\n$.templates(\"myTmpl\", \"#personTmpl\");\n\n…then you can call the render() method of the template without needing to hold on to the compiled template object returned from $.templates(...).\nJust call $.render.myTmpl(...), or $.render[\"myTmpl\"](...)\n(Note: there is also an alternative syntax for rendering a named template: $.templates.myTmpl1(...);)\n"
      },
      {
        "_type": "api",
        "title": "$.render.myTmpl(data, helpersOrContext)",
        "text": "$.render.myTmpl(data, helpersOrContext)\nRender a named template against data, along with helper objects or context, and return a string\nRender template against data, and pass in helpers\n\nvar html = $.render.myTmpl(myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "$.render.personTmpl(...):",
        "text": "$.render.personTmpl(...):\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "db.render": {
    "sections": [
      {
        "_type": "para",
        "title": "$(\"#myTmpl\").render()",
        "text": "$(\"#myTmpl\").render()\nIf a template has been registered using a script block:\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n\n…then you can call the render() method of the template without needing to hold on to the compiled template object returned from $.templates(...).\nJust call $(\"#myTmpl\").render(...)\n"
      },
      {
        "_type": "api",
        "title": "$(tmplSelector).render(data, helpersOrContext)",
        "text": "$(tmplSelector).render(data, helpersOrContext)\nRender a named template against data, along with helper objects or context, and return a string\nRender template against data, and pass in helpers\n\nvar html = $(\"#myTmpl\").render(myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "$(\"#personTemplate\").render(...):",
        "text": "$(\"#personTemplate\").render(...):\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n\nvar html = $(\"#personTemplate\").render(person);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "compiletmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "To create a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a javascript function – the ‘render’ function for your template. In fact for convenience, JsRender creates a template object which has a template.render() method which is the compiled function.\nThere are two ways to create a template:\nPass the markup string to the $.templates() method, which will compile it as a template object, and optionally register it by name\nDeclare the template in a script block with type=\"text/x-jsrender\" (or at least a type other than the default text/javascript). In that case JsRender will automatically call $.templates(). You will only need to call it yourself if you want to access the template object\nThe first approach has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating ‘computed’ template markup strings on the fly, etc.\nHere is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Registering a template from a markup string (in this case, fetched  from the server in a script file):",
        "text": "Registering a template from a markup string (in this case, fetched  from the server in a script file):\nThe person.js script registers a named \"person\" template:\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n\nWe load the script from the server, and it registers our template. As soon as the script is loaded, we call the render(...) method for our template:\n$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nNote: For a more sophisticated example of lazy loading of scripts for registering templates, see the remote templates sample.\n\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same sample, where we fetch a text file containing the template markup:\n"
      },
      {
        "_type": "sample",
        "title": "Compiling a template from a markup string (fetched  from the server in a text file):",
        "text": "Compiling a template from a markup string (fetched  from the server in a text file):\nThe markup string is fetched in an AJAX request (the person.txt file).\n<label> Name:</label> {{:name}}\n\nAs soon as the request returns, we use the markup string to compile the personTemplate object. This time we will not register it as a named template, but instead directly call the render(...) method of the returned personTemplate object:\n$.get(\"...person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the second approach:\n"
      },
      {
        "_type": "sample",
        "title": "Registering a template declared in script block:",
        "text": "Registering a template declared in script block:\nThis time we put our markup in a script block with type=\"text/x-jsrender\"…\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n\nThen in the code we call the $.templates() method with a jQuery selector for that script block, to register our template as a named template. (We could also hold on to the template object, which is the returned value…)\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nThen as before we call the render() method for the named template:\nvar html = $.render.personTmpl(people);\n\n\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "text": "For additional details and scenarios see:\n"
      }
    ]
  },
  "d.templates": {
    "sections": [
      {
        "_type": "para",
        "title": "Simple scenarios",
        "text": "Simple scenarios\n$.templates() is powerful and flexible. You can use it for many scenarios, including the following:\n\nCompile a template from a string\nGet a template object for a template declared in a script block\nRegister a template (from either a string or a script block declaration) as a named template\nGet a template object for a previously registered named template\nOn Node.js: Get a template object for a template declared as a file on the file-system (see File-based templates on Node.js).\n\n"
      },
      {
        "_type": "api",
        "title": "$.templates(...)",
        "text": "$.templates(...)\nCreate one or more compiled templates - optionally registered as named templates\nCompile a template and return the template object\n\nvar myTemplate = $.templates(myMarkupString);\n\nRegister a named template\n\n$.templates(\"myTemplateName\", myMarkupString);\n\n"
      },
      {
        "_type": "sample",
        "title": "Compile a template from a string",
        "text": "Compile a template from a string\n\nvar myTmpl = $.templates(\"Name: {{:name}}\");\n\nvar html = myTmpl.render(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Get template object for script block template",
        "text": "Get template object for script block template\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n ...\n</script>\n\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar html = myTmpl.render(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Register named template from a string",
        "text": "Register named template from a string\n\n$.templates(\"personTmpl\", \"Name: {{:name}}\");\n\nvar html = $.render.personTmpl(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Register named template from script block",
        "text": "Register named template from script block\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Register multiple templates in one call",
        "text": "Register multiple templates in one call\nYou can register multiple named templates in one call to $.templates() as follows:\n"
      },
      {
        "_type": "api",
        "title": "$.templates(namedTemplates)",
        "text": "$.templates(namedTemplates)\nRegister multiple named templates\n\n$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\n"
      },
      {
        "_type": "sample",
        "title": "Registering multiple templates",
        "text": "Registering multiple templates\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>\n\n$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\nvar html = $.render.personTmpl(person);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Get a template object for a named template",
        "text": "Get a template object for a named template\nYou can get the template object for a previously registered named template as follows:\nvar myTemplate = $.templates.myTemplateName; // or $.templates[\"myTemplateName\"]\n\n"
      },
      {
        "_type": "para",
        "title": "Unregister a named template",
        "text": "Unregister a named template\nTo unregister a previously registered named template, pass null to $.templates():\n$.templates(\"myTemplateName\", null);\n// Named template \"myTemplateName\" is no longer registered\n\n"
      },
      {
        "_type": "para",
        "title": "Advanced scenarios: Associating private resources with templates",
        "text": "Advanced scenarios: Associating private resources with templates\n$.templates() can also be used for the following more advanced scenarios:\n\nCompile a template, (or multiple templates) along with specified resources to be available only within that template\nCompile one or more templates to be added to the set of private resources of another (already compiled) template\n\nYou can use $.templates() to compile or register not only a template, but in addition some helpers, converters, custom tags or nested sub-templates, to be made available to the new template as private resources.\nNote that as an alternative you can register resources (helpers, converters, custom tags or templates) globally, using $.views.helpers(), $.views.converters(), $.views.tags(), or $.templates() – rather than making them private to the template that needs to reference them.\n"
      },
      {
        "_type": "api",
        "title": "$.templates(...) &mdash; associating resources",
        "text": "$.templates(...) — associating resources\nCompile a template, along with specified resources to be available only within this template\n\nvar myTmpl = $.templates({\n  markup: \"...\",\n  helpers: {...},\n  tags: {...}\n  ...\n});\n\nRegister a named template, along with specified resources available only within that template\n\n$.templates(\"myTmpl\", {\n  markup: \"...\",\n  helpers: {...},\n  tags: {...}\n  ...\n});\n\nRegister named templates as private resources for a 'parent template'\n\n$.templates(namedTemplates, parentTemplate);\n\n"
      },
      {
        "_type": "sample",
        "title": "Register a named template along with specified resources",
        "text": "Register a named template along with specified resources\nA converter and a helper are registered as private resources for the personTmpl named template.\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n\nThey are accessed within the personTmpl\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding templates as private resources for a parent template",
        "text": "Adding templates as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.templates(...). In that way the template you are registering becomes a ‘private template resource’ for the parentTemplate.\nHere is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Add a \"labelTmpl\" template resource as a 'sub template' &ndash; a private resource for an existing \"personTemplate\"",
        "text": "Add a \"labelTmpl\" template resource as a 'sub template' – a private resource for an existing \"personTemplate\"\n\n$.templates(\"labelTmpl\", \"Name: \", personTmpl);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsrregister": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "converters": {
    "sections": [
      {
        "_type": "para",
        "title": "What are converters?",
        "text": "What are converters?\nIn JsRender, a converter is a convenient way of processing or formatting data-value, or the result of expression evaluation – as in:\n{{html:movie.description}} -- this data is HTML encoded\n{{url:getTheFilePath()}} -- this expression will be URL-encode\n{{daymonth:invoice.date}} -- this date uses my formatter \n\nYou use built-in converters to HTML-encode, attribute-encode, or URL-encode. And you can register custom converters.\nWith JsViews, you can use converters with two-way data-binding, and you will have a convert and a convertBack converter – one for each direction.\n"
      },
      {
        "_type": "api",
        "title": "$.views.converters(name, converterFn)",
        "text": "$.views.converters(name, converterFn)\nRegister a converter, to be used in templates with the syntax:{{converterName: someExpression}}\n\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\n{{upper: \"upper case: \" + nickname}}\n\n"
      },
      {
        "_type": "sample",
        "title": "Using a custom converter",
        "text": "Using a custom converter\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\n{{upper:nickname}}\n{{upper: \"this will be upper case too\"}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: the this pointer within the converter function is the instance of the tag, and can be used in more advanced usage of converters as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "Accessing more context from the converter",
        "text": "Accessing more context from the converter\nYou can access multiple parameters and properties from the converter function.\n$.views.converters(\"full\", function(first, last) {\n  var format = this.tagCtx.props.format;  \n  return ...;\n});\n\n(You can also access the full data object: this.tagCtx.view.data)\n\n"
      },
      {
        "_type": "api",
        "title": "$.views.converters(namedConverters)",
        "text": "$.views.converters(namedConverters)\nRegister multiple converters\n\n$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Adding converters as private resources for a parent template",
        "text": "Adding converters as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.converters(...).\nIn that way the converter you are registering becomes a ‘private converter resource’ for the parentTemplate, rather than being registered globally:\n"
      },
      {
        "_type": "api",
        "title": "",
        "text": "Add multiple converters as resources, to a parent template\n\n$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n}, parentTemplate);\n\n"
      },
      {
        "_type": "para",
        "title": "See also the following samples:",
        "text": "See also the following samples:\nConverters and encoding\nTwo-way binding and converters\n"
      },
      {
        "_type": "links",
        "title": "Built-in converters:",
        "text": "Built-in converters:\n"
      }
    ]
  },
  "html": {
    "sections": [
      {
        "_type": "para",
        "title": "Built-in HTML encoder",
        "text": "Built-in HTML encoder\nJsRender includes an HTML encoder, which you can use programmatically as follows:\nvar myHtmlEncodedString = $.views.converters.html(myString);\n\nThe same encoder is accessed declaratively as a converter, as in the following two examples:\n{{html:myExpression}}\n\n{{>myExpression}}\n\nIn fact {{>...}} is exactly equivalent to {{html:...}} and is provided as a simpler syntax for HTML encoding values taken from data or from expressions and rendered within HTML content.\n"
      },
      {
        "_type": "sample",
        "title": "Calling HTML encoder",
        "text": "Calling HTML encoder\n\nvar value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.html(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "HTML encoder",
        "text": "HTML encoder\nReturns the HTML-encoded string\n\nvar encoder = $.views.converters.html;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "links",
        "title": "See the following topic and sample:",
        "text": "See the following topic and sample:\n"
      }
    ]
  },
  "attr": {
    "sections": [
      {
        "_type": "para",
        "title": "Built-in attribute encoder",
        "text": "Built-in attribute encoder\nJsRender includes an encoder intended for use when attribute encoding is needed. You can use it programmatically as follows:\nvar myAttributeEncodedString = $.views.converters.attr(myString);\n\nThe same encoder is accessed by declaratively as a converter:\n{{attr:myExpression}}\n\n"
      },
      {
        "_type": "sample",
        "title": "Calling the 'attribute' encoder",
        "text": "Calling the 'attribute' encoder\n\nvar value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.attr(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "Attribute encoder",
        "text": "Attribute encoder\nReturns the attribute-encoded string\n\nvar encoder = $.views.converters.attr;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "links",
        "title": "See also the following sample:",
        "text": "See also the following sample:\n"
      }
    ]
  },
  "url": {
    "sections": [
      {
        "_type": "para",
        "title": "Built-in URL encoder",
        "text": "Built-in URL encoder\nJsRender includes a URL encoder, which you can use programmatically as follows:\nvar myUrlEncodedString = $.views.converters.url(myString);\n\nThe same encoder is accessed by declaratively as a converter:\n{{url:myExpression}}\n\n"
      },
      {
        "_type": "sample",
        "text": "\nvar value = \"<_>_\\\"_ \";\n\nvar result = $.views.converters.url(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "URL encoder",
        "text": "URL encoder\nReturns the URL-encoded string\n\nvar encoder = $.views.converters.url;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "links",
        "title": "See the following sample:",
        "text": "See the following sample:\n"
      }
    ]
  },
  "tags": {
    "sections": [
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "What is a custom tag?\nJsRender custom tags are named tags {{myTag ...}}, which you can register, and then use in your templates.\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a render function or a template, when you declare your custom tag.\nThe render function, or the template, can access both named parameters (props) and unnamed parameters (args), as in:\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n\nIn fact it can also access the current data item – or even the whole hierarchy of views and data…\nWhen you also use JsViews, custom tags acquire a whole new dimension. – They become tag controls, and you can build rich and complex single page apps cleanly and simply using custom tag controls – following an MVP or MVVM coding pattern.\n"
      },
      {
        "_type": "api",
        "title": "$.views.tags(name, tagFn)",
        "text": "$.views.tags(name, tagFn)\nRegister a simple 'render' function as a custom tag,\n\n$.views.tags(\"mytag\", function(...) {\n  ...return rendered content\n});\n\n{{mytag ...}} ... {{/mytag}}\n\nRegister a custom tag using a tagOptions object\n\n$.views.tags(\"mytag\", {\n  render: function(...) {...},\n  template: ...\n});\n\n{{mytag ...}} ... {{/mytag}}\n\nRegister multiple custom tags\n\n$.views.tags({\n  myTag1: function(val) {...},\n  myTag2: {render: function(val) {...}, ...}\n});\n\n"
      },
      {
        "_type": "sample",
        "title": "1 - Simple custom tag using just a function",
        "text": "1 - Simple custom tag using just a function\nThe function is the render method for the tag\n\nDeclaring the custom tag\n\nfunction renderBoldP(value) {\n  return \"\" + value + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nUsing the tag\n\nThis is the title:{{boldp title /}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: the this pointer within the tag render function is the instance of the tag, and can be used in more advanced usage, as in the next two examples:\n"
      },
      {
        "_type": "para",
        "title": "Wrapping block content using a function-based custom tag",
        "text": "Wrapping block content using a function-based custom tag\nFirst of all – what if we want our tag to be used as a block tag, and to render itself by wrapping the rendered block content with the ‘bold p’ html – <b><p>...</p></b>as in:\n{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}\n\n"
      },
      {
        "_type": "sample",
        "title": "2 - Rendering block content from a custom tag function",
        "text": "2 - Rendering block content from a custom tag function\nTo render the block content, we call this.tagCtx.render(val):\nfunction renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As well as calling the render() method of this.tagCtx, you can access this.tagCtx.args, this.tagCtx.props, this.tagCtx.view.data and more…\nThe tagCtx.args are the unnamed parameters. So in this example, there are two of them:\n{{someTag title name}}\n\nIn addition to being accessible as tagCtx.args, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):\nfunction someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}\n\nNow here is an example which has one unnamed parameter and two named parameters. You can access named parameters from tagCtx.props:\n{{range members start=2 end=4}}\n\nWe’ll use that in our third sample, to show accessing properties from the render function of the tag:\n"
      },
      {
        "_type": "sample",
        "title": "3 - Accessing tagCtx properties from the tag render function",
        "text": "3 - Accessing tagCtx properties from the tag render function\nThis sample defines a {{range}} tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters start and end, to determine the range of iteration. (See also the range sample, for a more advanced implementation of a similar custom tag.)\nYou call it like this:\n{{range members start=1 end=2}}\n ...\n{{/range}}\n\nAnd the render function code accesses context to get at those named and unnamed parameters… :\n$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using a tag template instead of a render function",
        "text": "Using a tag template instead of a render function\nIf the tag definition includes a template, but no render method, then the template will be used to render the tag.\nLet’s re-implement all three examples above using custom tags which use templates instead of render functions.\n"
      },
      {
        "_type": "sample",
        "title": "1b - Simple custom tag using just a template",
        "text": "1b - Simple custom tag using just a template\nDeclaring the custom tag\n$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n\nAs you see, the template is accessing the unnamed parameter tagCtx.args[0].\nThe result is identical to the other implementation using a function. You call it just the same:\n{{boldp title /}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "2b - Rendering block content from a custom tag template",
        "text": "2b - Rendering block content from a custom tag template\nTo render block content, we use {{include tmpl=~tag.tagCtx.content/}}\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n\nHere we are accessing the content property on the tagCtx, which provides a compiled template for the block content.\nIt is also made available as a content property on the view object – and can be accessed from within a template using #content – which is an example of a view path – equivalent to #view.content. You can try out that alternative syntax by choosing Try it and changing the template above to <p><b>{{include tmpl=#content/}}</b></p>.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let’s re-implement the third example using just a template.\nEven this example can be implemented as a custom tag which has no code at all. – Just a template, which is also able to access all the context that we were able to access from code in our render() function above.\nThis illustrates the power of declarative templates…\n"
      },
      {
        "_type": "sample",
        "title": " 3b - Accessing more context from the tag template",
        "text": " 3b - Accessing more context from the tag template\nThe template accesses the same context as the function code above, to get at those named and unnamed parameters… :\n{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}\n\nThen after filtering for the items within the chosen range, using nested {{for}}{{if} tags, it renders the original block content for those items using {{include tmpl=~tag.tagCtx.content/}}.\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "Custom tags using both a render function and a template\nIf there is both a template and a render method, then the template will only be used if the render method returns undefined\nLet’s take our {{range}} example using a render function, but provide a template which will be used as “fallback” rendering for the tag in the case when there are no items to render in the chosen range:\n"
      },
      {
        "_type": "sample",
        "title": "A render() function and a template as \"fallback\"",
        "text": "A render() function and a template as \"fallback\"\nFirst we will change the original code to test whether the item exists in the array, before rendering the block content.\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call this.tagCtx.content.render(array[i]), rather than this.tagCtx.render(array[i]).\nThat’s because this.tagCtx.render(...) will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a tmpl property on the tag) – in which case it will render that template and not the block content…\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\nreturn ret || undefined;\n\nAnd here is the “fallback” template:\ntemplate: \"<li>Nothing to render</li>\"\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding tags as private resources for a parent template",
        "text": "Adding tags as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.tags(...).\nIn that way the tag you are registering becomes a ‘private tag resource’ for the parentTemplate, rather than being registered globally:\n"
      },
      {
        "_type": "api",
        "title": "",
        "text": "Add multiple tags as resources, to a parent template\n\n$.views.tags({\n  myTag1: ...,\n  myTag2: ...\n}, parentTemplate);\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tags and 'tag controls'",
        "text": "Custom tags and 'tag controls'\nIf you use JsViews, your custom tag can be developed into a fully functional tag control, with its own life-cycle, properties and methods, etc. It can be used as a presenter according to the MVP pattern.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "helpers": {
    "sections": [
      {
        "_type": "para",
        "title": "What are helpers?",
        "text": "What are helpers?\nJsRender templates are made up of HTML markup, text, and template tags. Template tags are used to evaluate data-paths or computed expressions, and insert those values into the rendered output.\nBut often the values you will want to insert are not actually taken from the data, but rather from other parameters or metadata which you want to use. And often you will want to process the values, using helper functions or other code, e.g. for converting values to other formats, or for computed values.\nHelpers, in JsRender, refers to any functions, objects, parameters or metadata which you want to provide, in addition to the actual data you passed to the render() method (or link() method if you are using JsViews).\nHelpers can also be objects, arrays, etc.\nYou access helpers by prepending the ~ character. Here are some examples:\n{{:~myHelperValue}}\n{{:~myHelperFunction(name, title)}}\n{{for ~myHelperObject.mySortFunction(people, \"increasing\")}} ... {{/for}}\n\n"
      },
      {
        "_type": "para",
        "title": "Passing in helpers",
        "text": "Passing in helpers\nThere are three ways to provide helpers:\n\nGlobal helpers – registered using $.views.helpers(myHelpers);\nHelpers registered for a specific template – $.templates(\"mytmpl\", {markup: ..., helpers: myHelpers};\nHelpers passed in on a specific render or link call – tmpl.render(data, myHelpers);\n– (or with JsViews: tmpl.link(\"#container\", data, myHelpers); and $.link(true, \"#target\", data, myHelpers);)\n\n"
      },
      {
        "_type": "sample",
        "title": "Global helper: $.views.helpers(...)",
        "text": "Global helper: $.views.helpers(...)\nvar myHelpers = {format: myFormatFunction};\n\n$.views.helpers(myHelpers);\n\n{{:~format(name, true)}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Helper resource for a specific template",
        "text": "Helper resource for a specific template\nvar myHelpers = {format: myFormatFunction};\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: myHelpers\n  }\n});\n\n{{:~format(name)}}\n{{:~format(name, true)}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Passing helpers with  a render() call",
        "text": "Passing helpers with  a render() call\nvar myHelpers = {format: myFormatFunction};\n\nvar html = $(\"#personTemplate\").render(data, myHelpers); \n\n{{:~format(name, true)}}\n{{:~format(name)}}\n\nSee template.render(...)\n\n"
      },
      {
        "_type": "api",
        "title": "$.views.helpers(name, helper)",
        "text": "$.views.helpers(name, helper)\nRegister a helper, to be used in templates with the syntax:~name\n\n$.views.helpers(\"format\", myFormatFunction);\n\nRegister multiple helpers\n\n$.views.helpers({\n  format: myFormatFunction,\n  utilities: {},\n  mode: \"filtered\"\n});\n\nAdd multiple helpers as resources, to a parent template\n\n$.views.helpers({\n  format: myFormatFunction,\n  ...\n}, parentTemplate);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example using a ‘hierarchy’ of helpers…\n"
      },
      {
        "_type": "sample",
        "title": "Register multiple helpers, including objects, etc.",
        "text": "Register multiple helpers, including objects, etc.\nHere is an example using a ‘hierarchy’ of helpers…\n$.views.helpers({\n  ...\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  ...\n});\n\n{{:~utilities.subtractMax(sold) > 0\n    ? ~utilities.errorMessages.msg1\n    : \"immediate\"\n}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding helpers as private resources for a parent template",
        "text": "Adding helpers as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.helpers(...).\nIn that way the helper you are registering becomes a ‘private helper resource’ for the parentTemplate, rather than being registered globally:\n"
      },
      {
        "_type": "api",
        "title": "",
        "text": "Add multiple helpers as resources, to a parent template\n\n$.views.helpers({\n  format: myFormatFunction,\n  ...\n}, parentTemplate);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsrobjects": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "viewsobject": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "settingsobject": {
    "sections": []
  },
  "subobject": {
    "sections": []
  },
  "templateobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "\nlink function(to, from, context, noIteration, parentView, prevNode, nextNode) {\nrender function(data, context, noIteration, parentView, key, onRender) {\nunlink function(to, from) {\nmarkup\n\n"
      }
    ]
  },
  "viewobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates render as a view hierarchy.\nThe properties of the current view are accessed declaratively in a template using view paths – such as #parent for the view.parent property.\nAccessing view objects programmatically is less common in JsRender, but can be useful for example:\n\nin a helper function, ~myHelper(), where the this pointer is the current view\nin the render() method of a custom tag – using this.tagCtx.view\n\nNote: In JsViews, accessing view objects programmatically is very common, thanks to the $.view() method. For example in a click handler, $.view(this); returns the corresponding view object.\nA view object has the following properties and methods:\n"
      },
      {
        "_type": "para",
        "title": "type property",
        "text": "type property\nview.type: string corresponding to the type of view:\n\n\"data\" – for the top-level view from a render() call\n\"array\" or \"item\" – from {{for array}} or {{props object}} (see array and item views)\n\"someTag\" – for the view from {{someTag}}...{{someTag}} – for example: \"include\", \"if\", \"for\", \"props\", \"mytag\"…\n\n"
      },
      {
        "_type": "para",
        "title": "data property",
        "text": "data property\nview.data: the current data context for the view – as in:\nvar team = view.data.team; // The team property of the current data object\n\nview.data can be accessed declaratively in templates as #data– as in:\n{{:#data}}\n{{>#data.description()}}\n{{for #data.team.members}}...\n\nBut note that since #data, the current data context, is the starting point for data paths within templates, the above expressions with `#data’ can be abbreviated to:\n{{:}}\n{{>description()}}\n{{for team.members}} etc.\n\n"
      },
      {
        "_type": "para",
        "title": "parent property",
        "text": "parent property\nview.parent: the parent view (used to step up through views in the hierarchy)\nvar index = view.parent.index; // The index of the parent view\n\nAccessed declaratively as #parent:\n{{>#parent.data.title()}}...  {{!-- accessing data of parent view - view.parent --}}\n{{if #parent.parent.parent.data.teams.length > 1}}... {{!-- accessing data of view.parent.parent... --}}\n\n"
      },
      {
        "_type": "para",
        "title": "index property",
        "text": "index property\nview.index: the view index (only available on item views)\nvar index = view.index; // The index of the view (for \"item\" views - otherwise an 'error string')\n\nAccessed declaratively as #index:\n{{if #index > 2}} {{!-- we are in an \"item\" view --}}\n  {{:#parent.index}}... {{!-- \"item\" view index (- the parent - since we are inside the 'ifView') --}}\n{{/if}}\n\nNote: On non-“item” views, the index property is the error message prompt: “For #index in nested block use #getIndex().”\n"
      },
      {
        "_type": "para",
        "title": "getIndex() method",
        "text": "getIndex() method\nview.getIndex(): get the index of current “item” view (steps up to nearest item view, and returns the index)\nvar index = view.getIndex(); // The index of the view\n\nAccessed declaratively as #getIndex():\n{{for teams}}\n  {{for members}}\n    {{if #getIndex() > 0}} {{!-- index of member (- this view is an \"item\" view for member) --}}\n      {{:#getIndex()}} {{!-- index of member --}}\n    {{/if}}\n\n    {{:#parent.getIndex()}}... {{!-- index of team (-nearest \"item\" view of parent is team \"item\" view) --}}\n  {{/for}}\n{{/for}}\n\n"
      },
      {
        "_type": "para",
        "title": "get(type) method",
        "text": "get(type) method\nview.get(type): returns the nearest parent view of type type.\nvar arrayView = view.get(\"array\"); // Step through parents to nearest \"array\" view\nvar arrayLength = arrayView.data.length; // Get length of data array\n\nAccessed declaratively as #get(...):\n{{for members}}\n  {{if #index+1 === #get(\"array\").data.length}}\n    The last member in the list\n  {{/if}}\n{{/for}}\n\nNote: An additional signature is available: view.get(true, type) (for advanced scenarios) – which steps down through descendant views (depth first traversal) and returns the first descendant view of type type.\n{{for members}}\n  {{:name}}\n{{/for}}\n{{:#get(true, \"item\").data.name}} {{!-- get the name of the first member --}}\n\nIn using this API it is sometimes necessary to be aware of the processing order. For example in the sample code above, placing {{:#get(true, \"item\")...}} before {{for members}} will not return any “item” view, since the {{:get(...)...}} is being evaluated during the rendering, and the “item” views for {{for ...}} will not yet have been rendered. (View instantiation is part of rendering, which is a single-pass process.)\n"
      },
      {
        "_type": "para",
        "title": "Other view object properties",
        "text": "Other view object properties\nThe following additional properties of the view object are used by JsRender for processing templates:\n\ntmpl: the template used to render the view\nviews: the child views in the view hierarchy\nctx: object (hash) with the named contextual helpers/template parameters for this view\ntag: the \"mytag\" view rendered by a custom tag {{mytag ...}}, has a view.tag property (the instance of the mytag tag object).\n\n"
      },
      {
        "_type": "para",
        "title": "(More documentation to follow, on view properties and methods)",
        "text": "(More documentation to follow, on view properties and methods)\n"
      }
    ]
  },
  "tagobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "\nchildTags function(deep, tagName) {\ncontents  function(deep, select) {\nnodes function(withMarkers, prevNode, nextNode) {\nonAfterLink   function(tagCtx, linkCtx, eventArgs) {\nonUpdate  function(ev, eventArgs, tagCtxs) {\nrefresh   function(sourceValue) {\nrender    function(val) {\nupdate    function(value) {\nctx   {…}   Object\nparent\ntagCtx    {…}   Object\ntagCtxs   [[object Object]]   Object, (Array)\ntagName   String\n\nAnd in JsViews\n\ndepends\n…\n\n"
      }
    ]
  },
  "viewcontextobject": {
    "sections": []
  },
  "tagcontextobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "\nrender function(data, context, noIteration, parentView, key, onRender) {\ntmpl  function() {\nargs  []  Object, (Array)\nctx   {…}   Object\nindex 0   Number\nparams    {…}   Object\nprops {…}   Object\ntag   {…}   Object, (Tag)\nview  {…}   Object\n\n"
      }
    ]
  },
  "node/browserify": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Browserify support for JsRender and JsViews\nBrowserify lets you create modular javascript projects for the browser, using the npm require() pattern for packages/modules.\n"
      },
      {
        "_type": "para",
        "title": "JsRender as a Browserify module",
        "text": "JsRender as a Browserify module\nAfter installing JsRender on the server (using $ npm install jsrender --save) it can then be included in the Browserify client-script bundle, and loaded in the browser, by calling:\nvar jsrender = require('jsrender');\n\nIn addition, JsRender includes a Browserify transform: jsrender/tmplify (see below) which allows you also to include your server file-based templates in the client-script bundle generated by Browserify.\nYou can then access the compiled templates in the browser, as modules, using:\nvar tmpl = require('./templates/myTemplate.html')\nvar html = tmpl.render(myData);\n...\n\nSee examples below.\n"
      },
      {
        "_type": "para",
        "title": "JsViews as a Browserify module",
        "text": "JsViews as a Browserify module\nJsViews can also be included in the Browserify client-script bundle, and loaded in the browser.\nAfter installing on the server (using $ npm install jsviews --save), call:\nrequire('jsviews'); // If jQuery is loaded statically\n\nor (if also loading jQuery as a Browserify module) call:\nvar $ = require('jquery');\nrequire('jsviews')($);\n\nSee examples below.\n"
      },
      {
        "_type": "code",
        "title": "Browser code example:",
        "text": "Browser code example:\nvar myTmpl = require(\"./templates/myTemplate.html\"); // Include compiled template in client-script bundle\nvar html = myTmpl(data); // Render\n"
      },
      {
        "_type": "para",
        "title": "Nested templates",
        "text": "Nested templates\nTemplate inclusion in the bundle can be recursive, so for example if you call require(\"./templates/myTemplate.html\"); and myTemplate.html includes a nested reference to another template, such as {{include tmpl=\"./another/tmpl2.html\"/}}, then the client-script bundle will include that template too.\n"
      },
      {
        "_type": "para",
        "title": "Generating the client bundle",
        "text": "Generating the client bundle\nIf source.js includes template references such as: var tmpl=require('./some/path/myTemplate.html'), then Browserify generates a client script bundle which will include the referenced templates.\nBrowserify provides three different ways of generating a bundle.js script from a source.js script, and calling a transform:\nCommand line:\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n\npackage.json:\n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\"]\n  ]\n}\n\nAPI:\nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'))\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n\n"
      },
      {
        "_type": "para",
        "title": "Option: extensions",
        "text": "Option: extensions\nThe jsrender/tmplify Browserify transform uses a white-space-separated list of extensions: \"html jsrender jsr\", by default. This means that when you generate a client-script bundle using the tmplify transform, it will treat any .html, .jsrender or .jsr file as a template, and will include the compiled template in the client-script bundle for rendering in the browser.\nYou can instead specify a different list of file extensions for templates, by using the --extensions or -e option, as in the following examples:\nbrowserify -t [jsrender/tmplify --extensions 'htm jsrender'] ./source.js > ./bundle.js\n\nbrowserify -t [jsrender/tmplify -e 'htm jsrender'] ./source.js > ./bundle.js\n\n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\", {\n      \"extensions\": \"htm jsrender\"\n    }]\n  ]\n}\n\nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'), {extensions: 'htm jsrender'})\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n\n"
      },
      {
        "_type": "para",
        "title": "Including jQuery and/or JsRender/JsViews in the client-script bundle",
        "text": "Including jQuery and/or JsRender/JsViews in the client-script bundle\nWhen using Browserify with JsRender on Node.js, you will generally need jQuery and JsRender/JsViews in the client, to render (and optionally data-link) the templates.\njQuery and JsRender are both available as npm/Browserify modules, so you can choose whether to load them statically, using a script block, or as a module. Here are three examples following alternative strategies:\nLoad jQuery and JsRender/JsViews statically\n$ is defined as a global variable (window.$, or window.jQuery).\nUse require(templatePath) to load templates as Browserify modules included in the client-script bundle, as in the following example:\n<script href=\".../jquery...js\"></script>\n<script href=\".../jsrender.js\"></script>\n\n<script>\n  var myTmpl = require('./templates/myTemplate.html'); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $('#result').html(html); // $ is a global\n</script>\n\n(See the JsRender Node Starter project for complete examples:\n\nclientcode-hello.js and layout-hello.html using JsRender\nclientcode-movies.js and layout-movies.html using JsViews.)\n\nLoad jQuery and JsRender/JsViews as Browserify modules\nUse var $ = require('jquery') to load jQuery, and require('jsrender')($) or require('jsviews')($) to load JsRender/JsViews.\nUse require(templatePath)($) to load templates as Browserify modules included in the client-script bundle, as in the following example:\n<script>\n  var $ = require('jquery');\n  require('jsrender')($);\n  var myTmpl = require('./templates/myTemplate.html')($); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $('#result').html(html);\n</script>\n\n(See:\n\nclientcode-hello-browserify.js and layout-hello-browserify.html for an example using JsRender\nclientcode-movies-browserify2.js and layout-movies-browserify2.html for an example using JsViews.)\n\nMixed approach: Load jQuery statically, and JsRender/JsViews as a Browserify module\n$ is defined as a global variable (window.$ or window.jQuery).\nUse require('jsrender') or require('jsviews') to load JsRender/JsViews.\nUse require(templatePath) to load templates as Browserify modules included in the client-script bundle, as in the following example:\n<script href=\".../jquery...js\"></script>\n\n<script>\n  require('jsrender');\n  var myTmpl = require('./templates/myTemplate.html'); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $('#result').html(html); // $ is a global\n</script>\n\njsviews layout-movies-browserify clientcode-movies-browserify\n(See clientcode-movies-browserify.js and layout-movies-browserify.html for an example using JsViews.)\n"
      },
      {
        "_type": "para",
        "title": "Sample code",
        "text": "Sample code\nFor running code examples using JsRender, Browserify, and the tmplify transform, see the index-express-browserify.js and index-hapi-browserify.js samples in the JsRender Node Starter project.\n"
      }
    ]
  },
  "node/renderfile": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender on Node.js provides a shortcut renderFile method, for convenience, to compile and render in one step:\nvar jsrender = require('jsrender');\n\nvar html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n// result: Name: Jim<br/>\n\n"
      }
    ]
  },
  "node/filetmpls": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "File-based templates\n"
      },
      {
        "_type": "para",
        "title": "Defining templates as .html files",
        "text": "Defining templates as .html files\nOn Node.js, JsRender templates can be stored directly in the file system  (e.g. as .html, .jsr. or .jsrender files) – for example:\nTemplate: ./templates/myTemplate.html – with contents:\nName: {{:name}}<br/>\n\nCode: JsRender recognizes file paths (for valid relative file paths starting with './'), so you can write:\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template\n\nvar html = tmpl({name: \"Jim\"}); // Render\n// result: Name: Jim<br/>\n\n"
      },
      {
        "_type": "para",
        "title": "renderFile() method",
        "text": "renderFile() method\nJsRender on Node.js provides a shortcut renderFile() method, for convenience, to compile and render in one step:\nvar jsrender = require('jsrender');\n\nvar html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n// result: Name: Jim<br/>\n\n"
      },
      {
        "_type": "api",
        "title": "jsrender.renderFile(filepath, data)",
        "text": "jsrender.renderFile(filepath, data)\nShortcut method - compile and render\nLoad file-based template, compile and render against data\n\nvar jsr = require('jsrender');\nvar html = jsr.renderFile('./.../tmpl.html', data);\n\n"
      },
      {
        "_type": "para",
        "title": "Nested calls to file-based templates",
        "text": "Nested calls to file-based templates\nJsRender’s awareness of Node.js file paths (relative paths starting with './') means your templates can include recursive calls to other templates (partials). You don’t need to register or compile those templates separately.\nTemplate: ./templates/personTemplate.html:\nName: {{:name}}<br/>Address: {{include tmpl='./templates/other/addressTemplate.jsr'}}\n\nTemplate: ./templates/other/addressTemplate.jsr:\nStreet: <em>{{:street}}</em>\n\nCode: Compile and render, recursively:\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html');\n// Compile template - and also any recursively called templates\n\nvar html = tmpl({name: \"Jim\", street: \"Main St\"});\n// result: Name: Jim<br/>Address: <em>Main St</em>\n\n"
      },
      {
        "_type": "para",
        "title": "Register a file-based template by name - and render it",
        "text": "Register a file-based template by name - and render it\nFor convenience you can register file-based templates by name, just as you can for templates from strings.\n// Register named template - \"myTmpl1\n$.templates(\"myTmpl1\", \"./templates/myTemplate.html\");\n\n// Render named template\nvar html = $.templates.myTmpl1(person);\n\n// Alternative syntax: var html = $.render.myTmpl1(person);\n\n"
      },
      {
        "_type": "para",
        "title": "Automatic caching of file-based templates",
        "text": "Automatic caching of file-based templates\nThe first time jsrender.templates('./templates/myTemplate.html') is called, JsRender will:\n\nload the template file from the file system\ncompile the template\ncache the template\nreturn the compiled template\n\nThe cached template can be accessed directly as jsrender.templates['./templates/myTemplate.html'] - and can also be deleted by calling delete jsrender.templates['./templates/myTemplate.html'], or jsrender.templates('./templates/myTemplate.html', null)\nOn subsequent calls, JsRender will simply:\n\nreturn the compiled template\n\nThe caching means you can load and compile the template during server initialization, and avoid the cost of reading the file or compiling during HTTP requests:\njsrender.templates('./templates/myTemplate.html'); // Cache the compiled template\n\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); // Render previously cached template, using Express\n});\n\nSimilarly when using the alternative forms for rendering templates:\napp.get('/...', function(req, res) {\n  var tmpl = jsrender.templates('./templates/myTemplate.html'); // Get previously cached template\n  var html = tmpl.render({name: \"Jim\"});\n  res.send(html);\n});\n\nor\napp.get('/...', function(req, res) {\n  // Render previously cached template\n  var html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n  res.send(html);\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Using the same template on the server and in the browser",
        "text": "Using the same template on the server and in the browser\nJsRender lets you easily use the same templates for both server and browser rendering. See server/browser templates for details on two alternative approaches, one with the {{clientTemplate}} tag, and the other using Browserify.\n"
      }
    ]
  },
  "jsrnode": {
    "sections": [
      {
        "_type": "para",
        "title": "Quickstart",
        "text": "Quickstart\nSee the JsRender Node.js Quickstart for an overview of JsRender support in Node.js\n"
      },
      {
        "_type": "links",
        "title": "Detail topics:",
        "text": "Detail topics:\n"
      }
    ]
  },
  "node/install": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Installation\nOn Node.js from the command line, install jsrender:\n$ npm install jsrender --save\n\nUsage\nLoad the jsrender module:\nvar jsrender = require('jsrender');\n\nNow call JsRender APIs, or use Express or Hapi integration, for server-rendering of JsRender templates.\n(For loading JsRender in the browser using Browserify, see JsRender as a Browserify module.)\n"
      },
      {
        "_type": "para",
        "title": "JsRender APIs on the server &ndash; same as in the browser!",
        "text": "JsRender APIs on the server – same as in the browser!\nIn the browser, when jQuery is present, JsRender loads as a jQuery plugin and adds APIs to the jQuery namespace object, as:\n$.views, $.templates and $.render\nOn the server exactly the same APIs are provided, associated instead with the jsrender namespace:\njsrender.views, jsrender.templates and jsrender.render.\nFor convenience you can call the namespace $ and then use the regular APIs: $.views... $.templates... $.render..., or copy from the regular browser examples/samples – as if in the browser with jQuery.\nFor example:\nvar $ = require('jsrender'); // Returns the jsrender namespace object -- referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl(data); // Or alternative syntax: var html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n\n"
      },
      {
        "_type": "para",
        "title": "Using helpers, converters, custom tags...",
        "text": "Using helpers, converters, custom tags...\nOn Node.js you can use the full set of JsRender features, template tags and APIs, just as you would in the browser – by simply using the jsrender namespace object returned from require('jsrender'), instead of the jQuery object, $. In addition you can take advantage of file-based templates.\nCustom Tags example: – For example, here is the JsRender Quickstart Custom Tags Sample, as you might write it on Node.js:\nTemplate: ./templates/personTemplate.html:\nName: {{fullName person/}}\n\nCode:\nvar jsrender = require('jsrender');\n\njsrender.views.tags(\"fullName\", \"{{:first}} {{:last}}\"); // Register custom tag\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html'); // Compile template\n\nvar html = tmpl({person: {first: \"Jim\", last: \"Varsov\"}}); // Render\n// result: \"Jim Varsov\"\n\nHelpers example: – And here is the JsRender Quickstart Helpers example, in a version for Node.js:\nTemplate: ./templates/personTemplate.html:\n{{:~title}} {{:first}} {{:~upper(last)}}\n\nCode:\nvar jsrender = require('jsrender');\n\nvar myHelpers = {\n    upper: function(val) { return val.toUpperCase(); },\n    title: \"Sir\"\n};\n\nvar tmpl = $.templates('./templates/personTemplate.html');\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\n\nvar html =  tmpl(data, myHelpers);\n// result: \"Sir Jim VARSOV\"\n\nOr we can register helpers globally:\njsrender.views.helpers(myHelpers);\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html =  tmpl(data);\n// result: \"Sir Jim VARSOV\"\n\n"
      }
    ]
  },
  "node/express-hapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Express and Hapi integration\n"
      },
      {
        "_type": "para",
        "title": "Using Express to render templates",
        "text": "Using Express to render templates\nIn Express you can use JsRender APIs to render the template, as in the examples above, then return the html in the HTTP response:\napp.get('/...', function(req, res) {\n  res.send(html);\n});\n\nBut alternatively you can register JsRender as template engine for Express:\nvar jsrender = require('jsrender');\n\napp.engine('html', jsrender.__express); // Set JsRender as template engine for .html files\napp.set('view engine', 'html'); \napp.set('views', __dirname + '/templates'); // Folder location for JsRender templates for Express\n\nRender template ./templates/myTemplate.html – content: Name: {{:name}}<br/>:\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); \n  // result: Name: Jim<br/>\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Using Hapi to render templates",
        "text": "Using Hapi to render templates\nJsRender also has built-in support as template engine for Hapi:\nSet JsRender as the template engine for Hapi:\nvar jsrender = require('jsrender');\n\nserver.register(vision, function (err) {\n  ...\n  server.views({\n    engines: { html: jsrender },\n    relativeTo: __dirname,\n    path: 'templates'\n  });\n\nUse Hapi to render a template:\nserver.route({\n  method: 'GET',\n  path: '/',\n  handler: function (request, reply) {\n    return reply.view('myTemplate', myData);\n  }\n});\n\n"
      }
    ]
  },
  "node/server-browser": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Sharing the same templates between server and  browser\nJsRender lets you share templates between server and client, using either of the Browserify or {{clientTemplate}} approaches shown below.\n"
      },
      {
        "_type": "para",
        "title": "Browserify",
        "text": "Browserify\nUsing Browserify with the jsrender/tmplify transform allows you to include your server file-based templates in the Browserify client-script bundle.\nYou can then access the compiled templates in the browser, as modules, using:\nvar tmpl = require('./.../myTemplate.html)`\nvar html = tmpl.render(myData);\n...\n\nFor details, see the Browserify topic.\nFor complete running samples, see the index-express-browserify.js and index-hapi-browserify.js samples in the JsRender Node Starter project.\n"
      },
      {
        "_type": "para",
        "title": "Rendering file-based templates in the browser: {{clientTemplate}}",
        "text": "Rendering file-based templates in the browser: {{clientTemplate}}\nJsRender also provides a {{clientTemplate}} tag that makes file-based templates available for rendering in the browser without needing to use Browserify.\nSimply include {{clientTemplate \"templateFilePath...\"}} in the layout template, for any template you want to expose in the browser:\n<head>\n  {{clientTemplate \"./templates/myTemplate.html\" /}}\n</head>\n\n<div id=\"result\"></div>\n\n<script>\n  var data = ...\n  var tmpl = $.templates(\"./templates/myTemplate.html\");\n  var html = tmpl(myData);\n\n  $(\"#result\").html(html);\n</script>\n\nSee the index-express.js and index-hapi.js samples in the JsRender Node Starter project.\n"
      },
      {
        "_type": "para",
        "title": "JsRender on the server, JsRender or JsViews in the browser...",
        "text": "JsRender on the server, JsRender or JsViews in the browser...\nBoth the Browserify and the {{clientTemplate}} approach to sharing templates between server and browser let you then render or link those templates in the browser, using JsRender or JsViews.\nIn the browser, you reference the templates using the same ./file/path/template.html syntax as on the server.\nFor example, in the JsRender Node Starter samples, the layout-movies.html template contains the following:\n<tbody data-link=\"{include tmpl='./templates/movie-list.html'}\">\n    {{include tmpl=\"./templates/movie-list.html\"/}}\n</tbody>\n\nHere, the {{include ...}} is used on the server to do initial rendering of the movies list using the movie-list.html template. Then in the browser, the data-link=\"{include ...} causes JsViews to access the same template in the browser, and provide dynamic data-binding of the list…\n"
      },
      {
        "_type": "para",
        "title": "Single Page Apps with initial rendering on server",
        "text": "Single Page Apps with initial rendering on server\nAn important scenario is a single page app using JsRender or JsViews in the client to create dynamic UI, combined with initial rendering of the content on the server by JsRender using the same template.\nThis can bring many advantages, including SEO, and eliminating flicker when the page is refreshed with a new server request.\nNote: To completely eliminate flicker on data-linked content which has already been rendered on the server, it is sometimes useful to use the syntax data-link=\"...^{...}\" – which data-links without doing the initial render. Here is an example from  movie-detail.html in the JsRender Node Starter:\n<div><input value=\"{{:title}}\" data-link=\"^{:title trigger=true:}\" /></div>\n\n"
      }
    ]
  },
  "tagsyntax": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Template tags in JsRender use the Mustache style: {{...}}.\n(You can choose different delimiters, such as <%...%>, using $.views.settings.delimiters(\"<%\", \"%>\").\n"
      },
      {
        "_type": "para",
        "title": "Tags without content",
        "text": "Tags without content\nThe most common JsRender tags are {{: pathOrExpr}} - which inserts the value of the path or expression, and {{> pathOrExpr}} which inserts the HTML-encoded value of the path or expression.\nThose tags, along with the allow code tag {{* ...}} and comment tag {{!-- ... --}}, are self-contained tags which do not wrap other content:\nBuilt-in tags without content:\n{{: pathOrExpr}}             (value)\n{{> pathOrExpr}}             (HTML-encoded value)\n{{* mycode}}                 (using code)\n{{!-- this is a comment --}} \n\n"
      },
      {
        "_type": "para",
        "title": "Block tags &ndash; tags with content: ",
        "text": "Block tags – tags with content: \nAll other built-in tags, as well as all custom tags, use the block tag syntax:\n{{include ...}}...{{/include}}      or   {{include .../}}\n{{for}}...{{/for}}                  or   {{for.../}}\n{{props}}...{{/props}}              or   {{props .../}}\n{{if}}...{{/if}}                    or   {{if .../}}\n{{myCustomTag}}...{{/myCustomTag}}  or   {{myCustomTag .../}}\n\nTags using the block tag syntax have open and close tags, with content, or else they use the self-closing syntax, without content:\nBlock tag with content\n{{someTag ...}}\n  content\n{{/someTag}}\n\nSelf-closing block tag (empty tag) – no content:\n{{someTag .../}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using tmpl=... to reference content as an external template",
        "text": "Using tmpl=... to reference content as an external template\nA particular case of self-closing syntax is when any block tag uses the named parameter tmpl=... to reference an external template, which then replaces what would have been the block content.\nThis is a very useful technique for encapsulation and reuse of tag content. The content becomes a ‘partial’ - and is included thanks to template composition:\nSelf-closing block tag referencing an external template:\n{{someTag ... tmpl=.../}}\n\n(See for example {{for languages tmpl=\"#columnTemplate\"/}} in this sample.)\n"
      },
      {
        "_type": "para",
        "title": "Tag arguments and named parameters",
        "text": "Tag arguments and named parameters\nTags can take both unnamed arguments and named parameters:\n{{someTag argument1 param1=...}}\n  content\n{{/someTag}}\n\nAn example of a named parameter is the tmpl=... parameter mentioned above:\n{{for languages tmpl=\"#columnTemplate\"/}}\n\nArguments and named parameters can be assigned values from simple data-paths such as:\n{{formattedAddress address.street format=~util.formats.upper /}}\n\nor from richer expressions such as product.quantity * 3.1 / 4.5, or name.toUpperCase()\n{{productValue product.quantity*3.1/4.5 description=name.toUpperCase() /}}\n\n"
      },
      {
        "_type": "para",
        "title": "Wrapping content ",
        "text": "Wrapping content \nIf a tag has an external tmpl=... reference, and inline block content, then the external template takes precedence. However, the external template can behave as a wrapper, wrapping the inline block content (one or more times), thanks to the view.content or #content property:\n{{sometag ... tmpl=\"externalTmpl\"}}\n  inline block content\n{{/sometag}}\n\n$.templates(\"externalTmpl\", \"before {{include tmpl=#content /}} after\");\n\nSimilarly, a custom tag can use a built-in template which wraps the inline content:\n{{mytag}}\n  inline block content\n{{/mytag}}\n\n$.view.tags(\"mytag\", {\n  ...\n  template: \"before {{include tmpl=#content /}} after\"),\n  ...\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Block tags with {{else}}",
        "text": "Block tags with {{else}}\nSome block tags provide features which involve using alternative content blocks. Block tag syntax supports this by allowing the content to be separated into two or more alternative content blocks, using {{else}} tags as separators:\nFor example, the {{if}} tag uses {{else}} to provide if-else, or if-elseif-else … behavior:\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n\nAnd the {{for}} tag accepts alternative content to render if an array is empty (or an array or object is null or undefined):\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n\nSimilarly you can use {{else}} with a custom tag, such as in this sample:\n{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "views": {
    "sections": [
      {
        "_type": "para",
        "title": "A view is a rendered template/block tag",
        "text": "A view is a rendered template/block tag\nEach instance of a rendered template or a template block tag is associated with a JsViews “view” object.\nFor example, if the following template is rendered, and inserted into the page –\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  Team {{:title}}\n  {{if members.length}}\n    The team has members!\n  {{/if}}\n</script>\n\nvar team = {title: \"The A team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n– then the rendered result will have the following view structure:\n— teamView                (Team: The A team)\n   — ifView               (The team has members!)\n\nEach view is associated with a view object, which provides APIs for accessing properties of that view, as well as for accessing parent or child views in the view hierarchy.\n"
      },
      {
        "_type": "para",
        "title": "The data context of a view",
        "text": "The data context of a view\nIn particular, a view has a data property, which is the current data context used for rendering that view (rendering that template, or inline block content):\n— teamView                data: team\n   — ifView               data: team\n\n"
      },
      {
        "_type": "para",
        "title": "Inline block content / external tmpl=...  reference: same view hierarchy...",
        "text": "Inline block content / external tmpl=...  reference: same view hierarchy...\nA view corresponds an instance of a block tag or a rendered template – so if we replace the inline content of a tag by an external reference: tmpl=..., the rendered result will be unchanged, and the view structure will also be identical:\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{if members.length tmpl=\"#membersTemplate\" /}}\n</script>\n\n<script id=\"membersTemplate\" type=\"text/x-jsrender\">\n  The team has members!\n</script>\n\nSame view structure as before:\n— teamView                data: team\n   — ifView               data: team\n"
      },
      {
        "_type": "para",
        "title": "Stepping into a block tag &ndash; what is the new data context?",
        "text": "Stepping into a block tag – what is the new data context?\nLet’s add a custom tag {{mytag}} to our template:\nMy team\n{{mytag members/}}\n...\n\nWe’ll define the custom tag, with a built-in template:\n  $.views.tags(\"mytag\", \"{{:length}} member(s)\");\n\n{{mytag members/}} will render block content (with an associated view) using its tag template \"{{:length}} members\".\nWhat will the data context be for the mytag view?\nBy default:\n\na block tag with no argument {{someTag}} will stay on the current data context\na block tag with an argument {{someTag expr ...}} will move the data context to expr.\n\nSo {{mytag members}} (just like {{include members}}) will move the data context to members.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "However a block tag may be designed to simply stay on the same data context as the parent block – and that is the case for the {{if}} tag:\n\n{{if expr}} does not move the data context.\n\nSo our template\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{mytag members/}}\n\n  {{if members.length}}\n    The team has members!\n  {{/if}}\n</script>\n\nwill have this view structure:\n— teamView                data: team\n   — mytagView            data: team.members\n   — ifView               data: team (same as parent – teamView)\n\n"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; {{for array}}",
        "text": "Array views and item views – {{for array}}\nNow let’s add a {{for members}} tag to iterate over the members, inside the {{if}} block:\nTeam\n{{mytag members/}}\n\n{{if members.length}}\n  Members:\n  {{for members}}\n    {{:name}}\n  {{/for}}\n{{/if}}\n\nWhen a {{for ...}} tag is used with an array it creates:\n\nan “array” view, whose data property is the array – and under the “array” view:\nan “item” view for each item in the array – with as data property the item, and as index property the index in the array:\n\n(Similarly, any tag which derives from the {{for}} tag – such as the {{props}} tag – will also add an “array” view and “item” views…)\nSo our view structure with the {{for}} tag included will now be :\n— teamView                data: team                 type: \"data\"\n   — mytagView            data: team.members         type: \"mytag\"\n   — ifView               data: team                 type: \"if\"\n      — arrayView         data: team.members         type: \"array\"\n         — itemView       data: team.members[0]      type: \"item\"\n         — itemView       data: team.members[1]      type: \"item\"\n\n– where we show also the type property of each view.\n"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; tmpl.render(array)",
        "text": "Array views and item views – tmpl.render(array)\nSuppose now we have an array of teams – and we pass the teams array to the render() method:\nvar teams = [\n  {title: \"A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n\nJsRender will render the teamTemplate once for each team – and just like with the {{for}} it will create an “item” view for each item in the teams array – with the two “item” views as children of an “array” view.\nHere it is as a working sample:\n"
      },
      {
        "_type": "sample",
        "text": "\nvar html = $(\"#teamTemplate\").render(teams);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the resulting view structure:\n— arrayView               data: teams\n   — itemView             data: teams[0]               (Team: The A Team - )\n      — mytagView         data: team.members           (2 members)\n      — ifView            data: teams[0]               (Members:)\n         — arrayView      data: teams[0].members\n            — itemView    data: teams[0].members[0]    (Jeff)\n            — itemView    data: teams[0].members[1]    (Maria)\n   — itemView             data: teams[1]               (Team: The B Team - )\n      — mytagView         data: team.members           (1 members)\n      — ifView            data: teams[1]               (Members:)\n         — arrayView      data: teams[1].members\n            — itemView    data: teams[1].members[0]    (Francis)\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing \"parent\" data, from nested views. Passing in template variables",
        "text": "Accessing \"parent\" data, from nested views. Passing in template variables\nViews provide information on how the underlying data objects map to the rendered UI.\nOften it is helpful to be able to access the data for a parent view from a nested template or block (nested view).\nThere are several ways to get to parent data:\n\nCreate a contextual template variable to pass a value to nested views.\nHere are three examples:\n...\n{{if ... ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n    ...\n    {{for ...}}\n      ...\n      {{:~teamTitle}} {{:~teamData.title}} {{:~teamIndex}}\n\nUse itemVar to provide a template variable for the current data ‘item’ of a block, to be passed in to deeper nested contexts\n...\n{{for members itemVar=\"~member\"}}\n  ...\n  {{props}}\n    ...\n    {{:~member.name}}\n\nUse the view.parent property to step up through successive parent views (#parent, #parent.parent etc.):\n...\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#parent.parent.data.title}}\n\nUse the view.get(type) method to get to a parent view of a given type:\n...\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#get(\"if\").data.title}}\n\n\nUse the view.getIndex() method to get to the index of a parent “item” view:\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#parent.getIndex()}}\n    {{:#getIndex()}}\n\n\nHere is a sample showing all of these methods:\n"
      },
      {
        "_type": "sample",
        "title": "Accessing parent data",
        "text": "Accessing parent data\nThis sample shows all the ways to get to parent data described in the section above:\n\nCreate a contextual template variable to pass a value to nested views.\nUse itemVar to provide a template variable for the current data ‘item’ of a block, to be passed in to deeper nested contexts\nUse the view.parent property to step up through successive parent views (#parent, #parent.parent etc.):\nUse the view.get(type) method to get to a parent view of a given type:\nUse the view.getIndex() method to get to the index of a parent “item” view:\n\n\n"
      },
      {
        "_type": "para",
        "title": "In JsViews: From UI back to data:",
        "text": "In JsViews: From UI back to data:\nNote: One of the features provided by JsViews data-linking (when you use the JsViews .link() method rather than JsRender’s .render() method) is the $.view(elem) method. This method provides a reverse mapping and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\nSo in effect in JsViews, the mapping from the view hierarchy to the UI becomes a two-way mapping…\n"
      }
    ]
  },
  "paths": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender tags can take unamed arguments, or named parameters:\n{{:arg0}}\n\n{{someTag arg1 arg2 param_a=param1 param_b=param2}}\n  content\n{{/someTag}}\n\nThe values of the arguments or parameters (such as arg0… param1 … above) must be valid JsRender paths or expressions.\nJsRender expressions are regular Javascript expressions, but with no access to global variables.\nInstead of global Javascript variables, JsRender expressions use data paths, helper paths and view paths, to access data values, values provided by helpers, and values obtained from the view hierarchy, such as the #getIndex().\nData paths are of the form dataProperty.bb.cc, and they step through the data hierarchy, starting from the current data item (the data context for the current view). They can include array access, such as team.members[id]\nView paths are of the form #viewProperty.bb.cc, and they start from the current view. So for example, #data is short for #view.data - where #view is the current view.\nHelper paths are of the form ~myHelper.bb.cc, and they start from the named helper \"myHelper\"\nHere are some examples of JsRender paths and values:\nData paths:\n{{:name}}\n{{for address.street}}...{{/for}}\n{{>team.members[0].lastName}}\n{{:name.toUpperCase()}}\n\nHelper paths:\n{{>~utilities.errorMessages.msg1}}\n{{if ~settings.show}}...{{/if}}\n{{:~root.selectedName}}\n\nView paths:\n{{:#getIndex()}}\n{{include #content /}}\n{{if #parent.parent.data.isLead}}...{{/if}}\n{{>~getDescription(#data)}}\n\nA primitive value of type string, number, boolean, null …:\n{{if isOpen tmpl='It is open' /}}\n{{for address tmpl=\"#addressTemplate\"}}...{{/for}}\n{{range members start=1 end=5 /}}\n{{range members reverseSort=true /}}\n\nJsRender expressions can combine values in more complex expressions, using functions, parens, operators such as + - * / ! === == > !== || &&, as well as ternary expressions: ...?...:..., array and object accessors: [...] etc.\nHere are some examples of expressions:\n{{if book.author === \"Jim Boyd\"}}...{{/if}}\n{{:~utilities.format(book.title, 'upper', true)}}\n{{for ~sort(~root.getMembers()}}}...{{/for}}\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n{{range #parent.data.members()/}}\n{{:(~addRebate(book.price) + 23.2)*3.5/2.1}}\n{{:~mode === \"useTitle\" ? book.title : book.name}}\n{{if error}}...{{else !utilities.valid(book.description)}}...{{else}}...{{/if}}\n{{:~books[id].title}}\n{{:people[~currentIndex].name}}\n\nExpressions can include white space. The following two examples are equivalent:\n{{averageValue product.quantity*3.1/4.5 description=~getDescription(#data) /}}\n{{averageValue product.quantity * 3.1 / 4.5 description = ~getDescription( #data ) /}}\n\nThe {{averageValue}} tag is being assigned one argument, and one named “description” parameter. The two expressions differ only in white space, and both are syntactically valid. However, removing optional white space -– as in the first example -– makes it easier to see the distinct arguments and parameters of the tag.\n"
      },
      {
        "_type": "para",
        "title": "Chained paths: Stepping through object properties (or functions)",
        "text": "Chained paths: Stepping through object properties (or functions)\nAll of the paths above (whether Data/Helper/View paths) involve starting from an initial value (a current data item property/helper/view property) – and then, if it is an object, perhaps stepping through one or more chained properties.\nFor example team.manager.address.street starts from a team object and steps through the manager property – which is itself a ‘person’ object with an address property, etc.\n(See also Data-linked paths.)\n"
      },
      {
        "_type": "para",
        "title": "Computed properties",
        "text": "Computed properties\nIn some cases a property may be of type function (possibly taking parameters), so you might have:\nteam.manager().getAddress('home').street\n– where the manager property is in fact a ‘getter’ function which returns a person object, which has a getAddress() parameterized accessor (taking 'home' or 'work' – or maybe a Boolean isHomeAddress). Similarly a path can include an array accessor such as team.members['id'].address.\nProperties of type function – returning a value – are referred to as a computed properties, or getter properties, and \nteam.manager().getAddress('home').street is an example of chained computed properties.\n(See also Computed properties and computed observables - for using computed properties with JsViews and data-linking.)\n"
      },
      {
        "_type": "para",
        "title": "Getter properties and computed properties",
        "text": "Getter properties and computed properties\nA common pattern using computed ‘getter’ functions would be to provide a person.firstName() ‘getter’ property which returns a value: person._firstName, considered as 'private’.\nIn addition, there may be computed properties which depend on other properties, such as a person.fullName() which concatenates first and last name.\nHere is a sample showing both types of computed property:\n"
      },
      {
        "_type": "sample",
        "title": "Getter properties with plain objects",
        "text": "Getter properties with plain objects\nData:\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    _lastName: \"Blow\",\n    firstName: firstName,\n    lastName: lastName,\n    fullName: fullName\n  }\n};\n\nTemplate:\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Getter properties on a View Model",
        "text": "Getter properties on a View Model\nRather than using plain JavaScript objects with getter functions, as above, a more common pattern (providing better encapsulation) would be to define a ‘View Model’ class – with getter properties defined in the class – and to instantiate that class to provide data instances.\n(See Plain objects or View Model for details.)\nThe following sample uses that approach:\n"
      },
      {
        "_type": "sample",
        "title": "Getter properties with a View Model",
        "text": "Getter properties with a View Model\nData:\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n\nTemplate:\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n\n\n"
      }
    ]
  },
  "tmplsyntax": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "viewobject2": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates render as a view hierarchy.\nThe properties of the current view are accessed declaratively in a template using view paths - such as #parent for the view.parent property.\nAccessing view objects programmatically is less common in JsRender, but can be useful for example:\n\nin a helper function, ~myHelper(), where the this pointer is the current view\nin the render() method of a custom tag - using this.tagCtx.view\n\nNote: In JsViews, accessing view objects programmatically is very common, thanks to the $.view() method. For example in a click handler, $.view(this); returns the corresponding view object.\nA view object has the following properties and methods:\n"
      },
      {
        "_type": "para",
        "title": "type property",
        "text": "type property\nview.type: string corresponding to the type of view:\n\n\"data\" – for the top-level view from a render() call\n\"array\" or \"item\" – from {{for array}} or {{props object}} (see array and item views)\n\"someTag\" – for the view from {{someTag}}...{{someTag}} – for example: \"include\", \"if\", \"for\", \"props\", \"mytag\"…\n\n"
      },
      {
        "_type": "para",
        "title": "data property",
        "text": "data property\nview.data: the current data context for the view – as in:\nvar team = view.data.team; // The team property of the current data object\n\nview.data can be accessed declaratively in templates as #data– as in:\n{{:#data}}\n{{>#data.description()}}\n{{for #data.team.members}}...\n\nBut note that since #data, the current data context, is the starting point for data paths within templates, the above expressions with `#data’ can be abbreviated to:\n{{:}}\n{{>description()}}\n{{for team.members}} etc.\n\n"
      },
      {
        "_type": "para",
        "title": "parent property",
        "text": "parent property\nview.parent: the parent view (used to step up through views in the hierarchy)\nvar index = view.parent.index; // The index of the parent view\n\nAccessed declaratively as #parent:\n{{>#parent.data.title()}}...  {{!-- accessing data of parent view - view.parent --}}\n{{if #parent.parent.parent.data.teams.length > 1}}... {{!-- accessing data of view.parent.parent... --}}\n\n"
      },
      {
        "_type": "para",
        "title": "index property",
        "text": "index property\nview.index: the view index (only available on item views)\nvar index = view.index; // The index of the view (for \"item\" views - otherwise an 'error string')\n\nAccessed declaratively as #index:\n{{if #index > 2}} {{!-- we are in an \"item\" view --}}\n  {{:#parent.index}}... {{!-- \"item\" view index (- the parent - since we are inside the 'ifView') --}}\n{{/if}}\n\nNote: On non-“item” views, the index property is the error message prompt: “For #index in nested block use #getIndex().”\n"
      },
      {
        "_type": "para",
        "title": "getIndex() method",
        "text": "getIndex() method\nview.getIndex(): get the index of current “item” view (steps up to nearest item view, and returns the index)\nvar index = view.getIndex(); // The index of the view\n\nAccessed declaratively as #getIndex():\n{{for teams}}\n  {{for members}}\n    {{if #getIndex() > 0}} {{!-- index of member (- this view is an \"item\" view for member) --}}\n      {{:#getIndex()}} {{!-- index of member --}}\n    {{/if}}\n\n    {{:#parent.getIndex()}}... {{!-- index of team (-nearest \"item\" view of parent is team \"item\" view) --}}\n  {{/for}}\n{{/for}}\n\n"
      },
      {
        "_type": "para",
        "title": "get(type) method",
        "text": "get(type) method\nview.get(type): returns the nearest parent view of type type.\nvar arrayView = view.get(\"array\"); // Step through parents to nearest \"array\" view\nvar arrayLength = arrayView.data.length; // Get length of data array\n\nAccessed declaratively as #get(...):\n{{for members}}\n  {{if #index+1 === #get(\"array\").data.length}}\n    The last member in the list\n  {{/if}}\n{{/for}}\n\nNote: An additional signature is available: view.get(true, type) (for advanced scenarios) – which steps down through descendant views (depth first traversal) and returns the first descendant view of type type.\n{{for members}}\n  {{:name}}\n{{/for}}\n{{:#get(true, \"item\").data.name}} {{!-- get the name of the first member --}}\n\nIn using this API it is sometimes necessary to be aware of the processing order. For example in the sample code above, placing {{:#get(true, \"item\")...}} before {{for members}} will not return any “item” view, since the {{:get(...)...}} is being evaluated during the rendering, and the “item” views for {{for ...}} will not yet have been rendered. (View instantiation is part of rendering, which is a single-pass process.)\n"
      },
      {
        "_type": "para",
        "title": "Other view object properties",
        "text": "Other view object properties\nThe following additional properties of the view object are used by JsRender for processing templates:\n\ntmpl: the template used to render the view\nviews: the child views in the view hierarchy\nctx: object (hash) with the named contextual helpers/template parameters for this view\ntag: the \"mytag\" view rendered by a custom tag {{mytag ...}}, has a view.tag property (the instance of the mytag tag object).\n\n"
      },
      {
        "_type": "para",
        "title": "content property (for views which wrap inline block content)",
        "text": "content property (for views which wrap inline block content)\nview.content: template corresponding to the inline block content.\nAccessed declaratively as #content:\nIn the wrapping content scenarios, the tag:\n{{sometag ... tmpl=\"externalTmpl\"}}...{{/sometag}}\n\nor\n{{mytag}}...{{/mytag}}\n\nwill render with a view which has both a view.tmpl template property and a view.content template property.\nThe view.content template corresponds to the inline block content, and is used for wrapping that content as in:\nbefore {{include tmpl=#content /}} after\n\n"
      },
      {
        "_type": "sample",
        "text": ""
      },
      {
        "_type": "sample",
        "text": "\n\n\n{{for members}}\n  {{if #index%3===0}}{{/if}}\n\n  \n{{/for}}\n\n{{:#index+1}}: {{:name}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews only\n\ncontents  function(deep, select) {\nchildTags function(deep, tagName) {\nnodes function(withMarkers, prevNode, nextNode) {\nrefresh   function(context) {\n\n"
      }
    ]
  }
}