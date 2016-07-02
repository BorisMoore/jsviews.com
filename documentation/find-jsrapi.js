var content = $.views.documentation.content;

content.find.jsrapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsrapi")) ||
{
  "jsrapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See JsRender Quickstart for an introductory overview.\n"
      },
      {
        "_type": "links",
        "title": "Topics:",
        "text": "Topics:\n"
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
        "text": "Tags without content\n\n{{: ...}} (Evaluate)\n{{> ...}} (HTML encode)\n{{!-- ... --}} (Comment)\n{{* ...}} and {{*: ...}} (Allow code)\n\n"
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
        "_type": "para",
        "title": "",
        "text": "Note: When rendering data which is not fully trusted, such as {{:untrustedValue}} it would be preferable from a security point of view to use the {{>untrustedValue}} – since the {{> ...}} tag will HTML encode the data, and thus prevent HTML injection attacks.\n"
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
        "text": "Data:\n\n{description: \"A very nice apartment\"}\n\nTemplate:\n\n{{:description}}\n...\n{{>description}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{> ...}} for preventing HTML injection attacks",
        "text": "Using {{> ...}} for preventing HTML injection attacks\nThe {{> ...}} tag should be used instead of the {{: ...}} whenever data being rendered is not fully trusted – in order to protect against HTML injection attacks.\nUsing {{>untrustedValue}} ensures appropriate HTML encoding.\n"
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
        "text": "\n  <div>\n    {{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n  </div>\n\n\n\n    <b>{{>address.city}}</b>\n\n\n\nvar people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"city\": \"Seattle\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"city\": \"Sidney\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#peopleList\").html(html);\n\n{{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n\n\n"
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
        "text": "Unlike {{for objectOrArray}}, {{include objectOrArray}} does not iterate over arrays.\nConsider this example:\nNumber of friends: {{:friends.length}}    {{!-- Get 'length' of 'friends' array --}}\nFriends:\n{{for friends}}                           {{!-- Iterate over 'friends' array --}}\n  {{name:}}                               {{!-- Current data context (#data) is a 'friend'. Get 'name' --}}   \n{{/for}}\n\nThe example could actually be rewritten, equivalently, as follows:\n{{include friends}}                       {{!-- Move to 'friends' array as data context, no iteration --}}\n  Number of friends: {{:length}}          {{!-- Current data context (#data) is 'friends'. Get 'length' --}}\n  Friends:\n  {{for}} {{!-- or {{for #data}} ... --}} {{!-- Iterate over current data context (friends array) --}}\n    {{name:}} \n  {{/for}}\n{{/include}}\n\nHere it is as a running sample:\n"
      },
      {
        "_type": "sample",
        "title": "{{include array}} does not iterate",
        "text": "{{include array}} does not iterate\n{{include friends}}:\n  Number of friends {{:length}}\n  ...\n{{/include}}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "text": "{{for object tmpl=... /}}\n\n  <div>\n    {{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}\n  </div>\n\n\n\n  <b>{{>city}}</b>\n\n\n\nvar people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"city\": \"Seattle\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"city\": \"Sidney\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#result\").html(html);\n{{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>city}}</b>\n</script>\n\n\n"
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
        "text": "{{props object tmpl=... /}}\n\n  <table><tbody>\n    <tr><td><b>name:</b> {{:name}}</td></tr>\n    <tr><td> \n      {{props address tmpl=\"#addressTemplate\" /}}\n    </td></tr>\n  </tbody></table>\n\n\n\n  <b>{{>key}}:</b> {{>prop}}<br/>\n\n\n\nvar people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"street\": \"12 Pike Place\",\n      \"city\": \"Seattle\",\n      \"ZIP\": \"98101\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"street\": \"5000 Broadway\",\n      \"city\": \"Sidney\",\n      \"country\": \"Australia\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#result\").html(html);\n{{props address tmpl=\"#addressTemplate\" /}}\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n\n\n"
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
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "text": "JsRender templates allow you to write rich expressions within the template tags, such as:\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n\nNevertheless, in order to improve encapsulation and maintainability, they don’t allow arbitrary code. For example, they don’t allow you to access global variables, like window.\nIf you want complete freedom to insert any code into a compiled template, you can set allowCode to true, either globally, or specifically for that template. You can then run any code as part of the template rendering, using the {{* ...}} tag, or you can return (render into the template output) the result of evaluating any expression, using the {{*: ...}} tag.\n(Note: these allow code tags are not recommended for use within data-linked templates – with JsViews)\n"
      },
      {
        "_type": "tag",
        "title": "{{* ...}}",
        "text": "{{* ...}}\nInsert code into the template\nIf allowCode is set to true, include any code in the compiled template.\n\n{{* window.myvar=2; myvar+=4; }}\n\n"
      },
      {
        "_type": "tag",
        "title": "{{*: ...}}",
        "text": "{{*: ...}}\nEvaluate any code expression\nIf allowCode is set to true, evaluate any expression, and insert the result into the rendered output.\n\n{{*: myvar/2 }}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example, with allowCode set to true globally:\n$.views.settings.allowCode(true);\n\n"
      },
      {
        "_type": "sample",
        "title": "allowCode",
        "text": "allowCode\n\n\n  {{* window.myvar=2; myvar+=4; }}\n\n  <div> Initial value: {{*:myvar}}</div>\n\n  {{* window.myvar+=11; }}\n\n  <div> New value: {{*:myvar}}</div>\n\n\n\n\n$.views.settings.allowCode(true); \n\nvar html = $(\"#myTemplate\").render();\n\n$(\"#result\").html(html);\nEnable allowCode in all templates:\n$.views.settings.allowCode(true);\n\nDefine a global variable, then increment it:\n{{* window.myvar=2; myvar+=4; }}\n\nInsert the value into the rendered output:\n<div> Initial value: {{*:myvar}}</div>\n\nIncrement the value again, and output the new value:\n{{* window.myvar+=11; }}\n\n<div> New value: {{*:myvar}}</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is an example that uses both regular JsRender tags, like {{for}}, and allowCode tags:\n"
      },
      {
        "_type": "sample",
        "title": "allowCode and regular tags",
        "text": "allowCode and regular tags\n\n  {{* window.total = 0}}\n  <ol>\n    {{for list}}\n      {{* total += data}}\n        <li>\n          Amount {{:}} (Running total: {{*: total}})\n       </li>\n    {{/for}}\n  </ol>\n  <u>Total: {{*: total}}</u>\n\n\n\nvar data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\n$.views.settings.allowCode(true);\n\nvar html = $(\"#myTemplate\").render(data);\n\n$(\"#result\").html(html);\n$.views.settings.allowCode(true);\n\nDefine a global variable:\n{{* window.total = 0}}\n\nIterate through a list, and use {{* ...}} to increment the total, and {{*:}} to return each value:\n{{for list}}\n  {{* total += data}}\n    <li>\n      Amount {{:}} (Running total: {{*: total}})\n   </li>\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is another example, in which we will replace the {{for list}} iteration by pure code-based iteration using {{* ...}}. This makes it easy to iterate only over the odd members of the array.\nThis time we will allow code just for this template:\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n\n"
      },
      {
        "_type": "sample",
        "title": "allowCode for template",
        "text": "allowCode for template\n\n  Here are the odd numbered items:\n  <ul>\n    {{* for (i=0; i<data.list.length; i+=2) { }}\n      <li>\n        {{*: i+1}}: Amount {{*:data.list[i]}}\n      </li>\n    {{* } }}\n  </ul>\n\n\n\nvar data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n\n$(\"#result\").html(html);\nEnable allowCode just for this template:\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n\nInsert template code to iterate over odd numbers:\n{{* for (i=0; i<data.list.length; i+=2) { }}\n\nOutput the 1-based index and the value:\n{{*: i+1}}: Amount {{*:data.list[i]}}\n\nInsert the end of the for block, {{* } }} into the template code:\n {{* } }}\n\n\n"
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
        "title": "See:",
        "text": "See:\n"
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
        "text": "template.render(object):\n\n\n\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.render(person);\n\n$(\"#person\").html(html);\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar html = myTmpl.render(person);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the render() method.\n— The template is rendered once for each item in the array:\n"
      },
      {
        "_type": "sample",
        "title": "template.render(array):",
        "text": "template.render(array):\n\n\n\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = myTmpl.render(people);\n\n$(\"#peopleList\").html(html);\n\nvar html = myTmpl.render(people);\n\n"
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
        "text": "template.render(object, myHelpers):\n\n\n\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = myTmpl.render(person, myHelpers);\n\n$(\"#person\").html(html);\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = myTmpl.render(person, myHelpers);\n\n<td style=\"color:{{:~color}};\">\n  {{:~format(name)}}\n</td>\n\nClick Try it and change the color to \"green\"…\n\n"
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
        "text": "$.render.myTmpl()\nIf a template has been registered as a named template:\n$.templates(\"myTmpl\", \"#personTmpl\");\n\nor\n$.templates(\"myTmpl\", \"some markup string\");\n\n…then you can call the render() method of the template without needing to hold on to the compiled template object returned from $.templates(...).\nJust call $.render.myTmpl(...), or $.render[\"myTmpl\"](...)\n(Note: there is also an alternative syntax for rendering a named template: $.templates.myTmpl(...);)\n"
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
        "text": "$.render.personTmpl(...):\n\n\n\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = $.render.personTmpl(person, myHelpers);\n\n$(\"#person\").html(html);\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n\n"
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
        "text": "$(\"#personTemplate\").render(...):\n\n\n\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n\nvar html = $(\"#personTemplate\").render(person);\n\n\n"
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
        "title": "Defining templates",
        "text": "Defining templates\nTo define a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a javascript function – the ‘render’ function for your template. In fact for convenience, JsRender creates a template object which has a template.render() method which is the compiled function.\nThere are two ways to create a template:\n\nPass the markup string to the $.templates() method, which will compile it as a template object, and optionally register it by name\nDeclare the template in a script block with type=\"text/x-jsrender\" (or at least a type other than the default text/javascript). In that case JsRender will automatically call $.templates(). You will only need to call it yourself if you want to access the template object\n\nThe first approach has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating ‘computed’ template markup strings on the fly, etc.\nHere is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Registering a template from a markup string (in this case, fetched  from the server in a script file):",
        "text": "Registering a template from a markup string (in this case, fetched  from the server in a script file):\n\n$.getScript(\"//www.jsviews.com/samples/resources/templates/person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\nThe person.js script registers a named \"person\" template:\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n\nWe load the script from the server, and it registers our template. As soon as the script is loaded, we call the render(...) method for our template:\n$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nNote: For a more sophisticated example of lazy loading of scripts for registering templates, see the remote templates sample.\n\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same sample, where we fetch a text file containing the template markup:\n"
      },
      {
        "_type": "sample",
        "title": "Compiling a template from a markup string (fetched  from the server in a text file):",
        "text": "Compiling a template from a markup string (fetched  from the server in a text file):\n\n\nvar personTemplate;\n\n$.get(\"resources/templates/person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\nThe markup string is fetched in an AJAX request (the person.txt file).\n<label> Name:</label> {{:name}}\n\nAs soon as the request returns, we use the markup string to compile the personTemplate object. This time we will not register it as a named template, but instead directly call the render(...) method of the returned personTemplate object:\n$.get(\"...person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the second approach:\n"
      },
      {
        "_type": "sample",
        "title": "Registering a template declared in script block:",
        "text": "Registering a template declared in script block:\n\n\n\n  <label>Name:</label> {{:name}}\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = $.render.personTmpl(people);\n\n$(\"#peopleList\").html(html);\nThis time we put our markup in a script block with type=\"text/x-jsrender\"…\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n\nThen in the code we call the $.templates() method with a jQuery selector for that script block, to register our template as a named template. (We could also hold on to the template object, which is the returned value…)\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nThen as before we call the render() method for the named template:\nvar html = $.render.personTmpl(people);\n\n\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "text": "For additional details and scenarios see:\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "d.templates": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "$.templates() is used to register or compile templates. See Using templates for an overview, and simple examples.\nThis topic provides more details.\n"
      },
      {
        "_type": "para",
        "title": "Simple scenarios",
        "text": "Simple scenarios\n$.templates(...) is powerful and flexible. You can use it for many scenarios, including the following:\n\nCompile a template from a string\nGet a template object for a template declared in a script block\nRegister a template (from either a string or a script block declaration) as a named template\nGet a template object for a previously registered named template\nOn Node.js: Get a template object for a template declared as a file on the file-system (see File-based templates on Node.js).\n\n"
      },
      {
        "_type": "api",
        "title": "$.templates(...)",
        "text": "$.templates(...)\nCreate one or more compiled templates - optionally registered as named templates\nCompile a template from a string or selector, and return the template object\n\nvar myTemplate = $.templates(myMarkupString);\n\nRegister a named template from a string or selector\n\n$.templates(\"myTemplateName\", myMarkupString);\n\n"
      },
      {
        "_type": "sample",
        "title": "Compile a template from a string",
        "text": "Compile a template from a string\n\n\nvar myTmpl = $.templates(\"Name: {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);\n\nvar myTmpl = $.templates(\"Name: {{:name}}\");\n\nvar html = myTmpl.render(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Get template object for script block template",
        "text": "Get template object for script block template\n\n\n\n  <label>Name:</label> {{:name}}\n\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n ...\n</script>\n\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar html = myTmpl.render(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Register named template from a string",
        "text": "Register named template from a string\n\n$.templates(\"personTmpl\", \"Name: {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);\n\n$.templates(\"personTmpl\", \"Name: {{:name}}\");\n\nvar html = $.render.personTmpl(person);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Register named template from script block",
        "text": "Register named template from script block\n\n\n\n  <label>Name:</label> {{:name}}\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n\n\n"
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
        "text": "Registering multiple templates\n\n\n\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n\n$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"Name:\"\n});\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>\n\n$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\nvar html = $.render.personTmpl(person);\n\n\n"
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
        "text": "Register a named template along with specified resources\n\n\n\n  {{upper:~append(\"Mr \", name)}}\n\n// Register a template along with a converter and a helper that it will use.\n// These resources are private to the template, rather than being registered\n// globally using $.views.converters or $.views.helpers\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);\nA converter and a helper are registered as private resources for the personTmpl named template.\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n\nThey are accessed within the personTmpl\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding templates as private resources for a parent template",
        "text": "Adding templates as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.templates(...). In that way the template you are registering becomes a ‘private template resource’ for the parentTemplate.\nHere is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Add a \"labelTmpl\" template resource as a 'sub template' &ndash; a private resource for an existing \"personTemplate\"",
        "text": "Add a \"labelTmpl\" template resource as a 'sub template' – a private resource for an existing \"personTemplate\"\n\n\n\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n\nvar personTmpl = $.templates(\"#personTemplate\");\n\n$.templates(\"labelTmpl\", \"Name: \", personTmpl);\n\nvar person = {name: \"Robert\"};\n\nvar html = personTmpl.render(person);\n\n$(\"#peopleList\").html(html);\n\n$.templates(\"labelTmpl\", \"Name: \", personTmpl);\n\n\n"
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
  "tags": {
    "sections": [
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "What is a custom tag?\nJsRender custom tags are named tags {{myTag ...}}, which you can register, and then use in your templates.\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a render function or a template, when you declare your custom tag.\nThe render function, or the template, can access both named parameters (props) and unnamed parameters (args), as in:\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n\nIn fact it can also access the current data item – or even the whole hierarchy of views and data…\nNote: When you also use JsViews, custom tags acquire a whole new dimension. – They become tag controls, and you can build rich and complex single page apps cleanly and simply using custom tag controls – following an MVP or MVVM coding pattern.\n"
      },
      {
        "_type": "para",
        "title": "<b>API: $.views.tags(name, tagFn)</b>",
        "text": "API: $.views.tags(name, tagFn)\nTo register a custom tag, you call the $.views.tags(...) API – with four alternative signatures:\n\n$.views.tags(\"myTag\", tagOptions); – where the properties of the tagOptions object will typically include a render: tagFn (specifying a render method), and/or a template: markupString (specifying a template to be rendered)\n$.views.tags(\"myTag\", tagFn); – simplified form, when the only option being specified is a render method\n$.views.tags(\"myTag\", tagTemplate); – simplified form, when the only option being specified is a template markup string\n$.views.tags(namedTags); – where namedTags is a hash, declaring multiple custom tags\n\n"
      },
      {
        "_type": "api",
        "title": "",
        "text": "Register a custom tag using a tagOptions object\n\n$.views.tags(\"mytag\", {\n  render: function(...) {...},\n  template: ...\n});\n\n{{mytag ...}} ... {{/mytag}}\n\nRegister a simple 'render' function as a custom tag\n\n$.views.tags(\"mytag\", function(...) {\n  ...return rendered content\n});\n\n{{mytag ...}} ... {{/mytag}}\n\nRegister a simple template string as a custom tag\n\n$.views.tags(\"mytag\", \"templateMarkup...\");\n\n{{mytag ...}} ... {{/mytag}}\n\nRegister multiple custom tags\n\n$.views.tags({\n  myTag1: {\n    render: function(val) {...},\n    template: ...\n  },\n  myTag2: function(val) {...},\n  myTag3: tag3TemplateString,\n});\n\n"
      },
      {
        "_type": "sample",
        "title": "1 - Simple custom tag using just a function",
        "text": "1 - Simple custom tag using just a function\n\n\n\n  This is the title:{{boldp title /}}\n\nfunction renderBoldP(value) {\n   return \"\" + value + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThe function is the render method for the tag\n\nDeclaring the custom tag\n\nfunction renderBoldP(value) {\n  return \"\" + value + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nUsing the tag\n\nThis is the title:{{boldp title /}}\n\n"
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
        "text": "2 - Rendering block content from a custom tag function\n\n\n\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n\nfunction renderBoldP(val) {\n   return \"\" + this.tagCtx.render(val) + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nTo render the block content, we call this.tagCtx.render(val):\nfunction renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As well as calling the render() method of this.tagCtx, you can access this.tagCtx.args, this.tagCtx.props, this.tagCtx.view.data and more…\nThe tagCtx.args are the unnamed parameters. So in this example, there are two of them:\n{{someTag title name}}\n\nIn addition to being accessible as tagCtx.args, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):\nfunction someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}\n\nNow here is an example which has one unnamed parameter and two named parameters. You can access named parameters from tagCtx.props:\n{{range members start=2 end=4}}\n\nWe’ll use that in our third sample, to show accessing properties from the render function of the tag:\n"
      },
      {
        "_type": "sample",
        "title": "3 - Accessing tagCtx properties from the tag render function",
        "text": "3 - Accessing tagCtx properties from the tag render function\n\n\n\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags(\"range\", function(array) {\n  var ret = \"\",\n    start = this.tagCtx.props.start,\n    end = this.tagCtx.props.end;\n  for (var i = start; i <= end; i++) {\n    // Render tag content, for this data item\n    ret += this.tagCtx.render(array[i]);\n  }\n  return ret;\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThis sample defines a {{range}} tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters start and end, to determine the range of iteration. (See also the range sample, for a more advanced implementation of a similar custom tag.)\nYou call it like this:\n{{range members start=1 end=2}}\n ...\n{{/range}}\n\nAnd the render function code accesses context to get at those named and unnamed parameters… :\n$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using a tag template instead of a render function",
        "text": "Using a tag template instead of a render function\nIf the tag definition includes a template, but no render method, then the template will be used to render the tag.\nLet’s re-implement all three examples above using custom tags which use templates instead of render functions.\n"
      },
      {
        "_type": "sample",
        "title": "1b - Simple custom tag using just a template",
        "text": "1b - Simple custom tag using just a template\n\n\n\n  {{boldp title /}}\n\n$.views.tags(\"boldp\", {\n  template: \"{{:~tag.tagCtx.args[0]}}\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nDeclaring the custom tag\n$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n\nNote that since we are only declaring a template option, we could equivalently have used the simplified form:\n$.views.tags(\"boldp\", \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\");\n\nAs you see, the template is accessing the unnamed parameter tagCtx.args[0].\nThe result is identical to the other implementation using a function. You call it just the same:\n{{boldp title /}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "2b - Rendering block content from a custom tag template",
        "text": "2b - Rendering block content from a custom tag template\n\n\n\n  {{boldp}}\n    This is the title:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n\n$.views.tags(\"boldp\", {\n  template: \"{{include tmpl=~tag.tagCtx.content/}}\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nTo render block content, we use {{include tmpl=~tag.tagCtx.content/}}\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n\nHere we are accessing the content property on the tagCtx, which provides a compiled template for the block content.\nIt is also made available as a content property on the view object – and can be accessed from within a template using #content – which is an example of a view path – equivalent to #view.content. You can try out that alternative syntax by choosing Try it and changing the template above to <p><b>{{include tmpl=#content/}}</b></p>.\nAgain, the result is identical to the other implementation using a function. You call it just the same:\n{{boldp}}\n  This is the title:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}```\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let’s re-implement the third example using just a template.\nEven this example can be implemented as a custom tag which has no code at all. – Just a template, which is also able to access all the context that we were able to access from code in our render() function above.\nThis illustrates the power of declarative templates…\n"
      },
      {
        "_type": "sample",
        "title": " 3b - Accessing more context from the tag template",
        "text": " 3b - Accessing more context from the tag template\n\n\n\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags(\"range\", {\n  template: \n    \"{{for ~tag.tagCtx.args[0]}}\" +\n      \"{{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\" +\n        \"{{include tmpl=~tag.tagCtx.content/}}\" +\n      \"{{/if}}\" +\n    \"{{/for}}\"\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThe template accesses the same context as the function code above, to get at those named and unnamed parameters… :\n{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}\n\nThen after filtering for the items within the chosen range, using nested {{for}}{{if} tags, it renders the original block content for those items using {{include tmpl=~tag.tagCtx.content/}}.\nAgain, the result is identical to the other implementation using a function. You call it just the same:\n{{range members start=1 end=2}}\n ...\n{{/range}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "Custom tags using both a render function and a template\nIf there is both a template and a render method, then the template will only be used if the render method returns undefined\nLet’s take our {{range}} example using a render function, but provide a template which will be used as “fallback” rendering for the tag in the case when there are no items to render in the chosen range:\n"
      },
      {
        "_type": "sample",
        "title": "A render() function and a template as \"fallback\"",
        "text": "A render() function and a template as \"fallback\"\n\n\n\n  <h3>Members 2 to 4</h3>\n  <ul>\n    {{range members start=1 end=3}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n  <h3>Members 5 to 8</h3>\n  <ul>\n    {{range members start=4 end=7}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags({\n  range: {\n    render: function(array) {\n      var ret = \"\",\n        start = this.tagCtx.props.start,\n        end = this.tagCtx.props.end;\n      for (var i = start; i <= end; i++) {\n        if (array[i]) {\n          // Render tag block content, for this data item\n          ret += this.tagCtx.content.render(array[i]);\n        }\n      }\n      return ret || undefined;\n    },\n    template: \"Nothing to render\"\n  }\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\n\nFirst we will change the original code to test whether the item exists in the array, before rendering the block content.\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call this.tagCtx.content.render(array[i]), rather than this.tagCtx.render(array[i]).\nThat’s because this.tagCtx.render(...) will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a tmpl property on the tag) – in which case it will render that template and not the block content…\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\nreturn ret || undefined;\n\nAnd here is the “fallback” template:\ntemplate: \"<li>Nothing to render</li>\"\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding tags as private resources for a parent template",
        "text": "Adding tags as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.tags(...).\nIn that way the tag (or tags) you are registering become ‘private tag resources’ for the parentTemplate, rather than being registered globally:\n"
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
        "text": "JsRender templates render as a view hierarchy.\n"
      },
      {
        "_type": "para",
        "title": "A <b>view object</b> has the following properties and methods:",
        "text": "A view object has the following properties and methods:\n\ntype property\ndata property\nparent property\nindex property\ngetIndex() method\nget(type) method\ncontent property\nother properties (tmpl, views, ctx, tag)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: When using JsViews .link() method rather than JsRender’s .render() method, the view objects have additional methods:\n\nrefresh()\ncontents()\nchildTags()\nnodes()\n\nSee JsViews view object.\n"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "Accessing view objects\nThe properties of the current view are accessed declaratively in a template using view paths – such as #parent for the view.parent property.\nAccessing view objects programmatically is less common in JsRender, but can be useful for example:\n\nin a helper function, ~myHelper(), where the this pointer is the current view\nin the render() method of a custom tag – using this.tagCtx.view\n\nNote: In JsViews, accessing view objects programmatically is very common, thanks to the $.view() method. For example in a click handler, $.view(this); returns the corresponding view object.\nProperties and methods:\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "The type property:",
        "text": "The type property:\nview.type: string corresponding to the type of view:\n\n\"data\" – for the top-level view from a render() call\n\"array\" or \"item\" – from {{for array}} or {{props object}} (see array and item views)\n\"someTag\" – for the view from {{someTag}}...{{someTag}} – for example: \"include\", \"if\", \"for\", \"props\", \"mytag\"…\n\n"
      },
      {
        "_type": "para",
        "title": "The data property:",
        "text": "The data property:\nview.data: the current data context for the view – as in:\nvar team = view.data.team; // The team property of the current data object\n\nview.data can be accessed declaratively in templates as #data– as in:\n{{:#data}}\n{{>#data.description()}}\n{{for #data.team.members}}...\n\nBut note that since #data, the current data context, is the starting point for data paths within templates, the above expressions with `#data’ can be abbreviated to:\n{{:}}\n{{>description()}}\n{{for team.members}} etc.\n\n"
      },
      {
        "_type": "para",
        "title": "The parent property:",
        "text": "The parent property:\nview.parent: the parent view (used to step up through views in the hierarchy).\nvar index = view.parent.index; // The index of the parent view\n\nAccessed declaratively as #parent:\n{{>#parent.data.title()}}...  {{!-- accessing data of parent view - view.parent --}}\n{{if #parent.parent.parent.data.teams.length > 1}}... {{!-- accessing data of view.parent.parent... --}}\n\n(See also accessing parent data)\n"
      },
      {
        "_type": "para",
        "title": "The index property:",
        "text": "The index property:\nview.index: the view index (only available on item views).\nvar index = view.index; // The index of the view (for \"item\" views - otherwise an 'error string')\n\nAccessed declaratively as #index:\n{{if #index > 2}} {{!-- we are in an \"item\" view --}}\n  {{:#parent.index}}... {{!-- \"item\" view index (- the parent - since we are inside the 'ifView') --}}\n{{/if}}\n\nNote: On non-“item” views, accessing the index property returns the error message prompt: “For #index in nested block use #getIndex().”\n"
      },
      {
        "_type": "para",
        "title": "The getIndex() method:",
        "text": "The getIndex() method:\nview.getIndex(): get the index of current “item” view (steps up to nearest item view, and returns the index).\nvar index = view.getIndex(); // The index of the view\n\nAccessed declaratively as #getIndex():\n{{for teams}}\n  {{for members}}\n    {{if #getIndex() > 0}} {{!-- index of member (- this view is an \"item\" view for member) --}}\n      {{:#getIndex()}} {{!-- index of member --}}\n    {{/if}}\n\n    {{:#parent.getIndex()}}... {{!-- index of team (-nearest \"item\" view of parent is team \"item\" view) --}}\n  {{/for}}\n{{/for}}\n\n"
      },
      {
        "_type": "sample",
        "title": "getIndex() &ndash; iterating + grouping by 3",
        "text": "getIndex() – iterating + grouping by 3\nIf index is a multiple of 3, render new tr, and format index in bold.\nUse getIndex() to get item index from within if block.\n<table><tbody><tr>\n\n{{for members}}\n  {{if #index===0}}\n    <td><b>1:</b>\n  {{else #index%3===0}}\n    </tr><tr><td><b>{{:#getIndex()+1}}:</b>\n  {{else}}\n    <td>{{:#getIndex()+1}}:\n  {{/if}}\n  {{:name}}\n  </td>\n{{/for}}\n\n</tr></tbody></table>\n\n\n"
      },
      {
        "_type": "para",
        "title": "The get(type) method:",
        "text": "The get(type) method:\nview.get(type): returns the nearest parent view of type type.\nvar arrayView = view.get(\"array\"); // Step through parents to nearest \"array\" view\nvar arrayLength = arrayView.data.length; // Get length of data array\n\nAccessed declaratively as #get(...):\n{{for members}}\n  {{if #index+1 === #get(\"array\").data.length}}\n    The last member in the list\n  {{/if}}\n{{/for}}\n\nNote: An additional signature is available: view.get(true, type) (for advanced scenarios) – which steps down through descendant views (depth first traversal) and returns the first descendant view of type type.\n{{for members}}\n  {{:name}}\n{{/for}}\n{{:#get(true, \"item\").data.name}} {{!-- get the name of the first member --}}\n\nIn using this API it is sometimes necessary to be aware of the processing order. For example in the sample code above, placing {{:#get(true, \"item\")...}} before {{for members}} will not return any “item” view, since the {{:get(...)...}} is being evaluated during the rendering, and the “item” views for {{for ...}} will not yet have been rendered. (View instantiation is part of rendering, which is a single-pass process.)\n"
      },
      {
        "_type": "para",
        "title": "The content property (for views which wrap inline block content):",
        "text": "The content property (for views which wrap inline block content):\nview.content: template corresponding to the inline block content.\nAccessed declaratively as #content:\nIn the wrapping content scenarios, the tag:\n{{sometag ... tmpl=\"externalTmpl\"}}...{{/sometag}}\n\nor\n{{mytag}}...{{/mytag}}\n\nwill render with a view which has both a view.tmpl template property and a view.content template property.\nThe view.content template corresponds to the inline block content, and is used for wrapping that content as in:\nbefore {{include tmpl=#content /}} after\n\n"
      },
      {
        "_type": "sample",
        "title": "view.content &ndash; wrapping content",
        "text": "view.content – wrapping content\n\n\n\n{{mytag}}\n  <div>inside mytag</div>\n{{/mytag}}\n\n<hr/>\n\n{{mytag tmpl=\"externalTmpl\"}}\n  <div>inside mytag with external tmpl</div>\n{{/mytag}}\n\n\n$.views.tags(\n  \"mytag\",\n  \"startTag {{include tmpl=#content /}} endTag\"\n);\n\n$.templates(\n  \"externalTmpl\",\n  \"startTmpl {{include tmpl=#content /}} endTmpl\"\n);\n\n$(\"#result\").html(\n  $.templates(\"#myTmpl\").render()\n);\n\nmytag:\n$.views.tags(\n  \"mytag\",\n  \"startTag {{include tmpl=#content /}} endTag\"\n);\n\nexternalTmpl:\n$.templates(\n  \"externalTmpl\",\n  \"startTmpl {{include tmpl=#content /}} endTmpl\"\n);\n\nTemplate:\n{{mytag}}\n  <div>inside mytag</div>\n{{/mytag}}\n\n<hr/>\n\n{{mytag tmpl=\"externalTmpl\"}}\n  <div>inside mytag with external tmpl</div>\n{{/mytag}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Other view object properties:",
        "text": "Other view object properties:\nThe following additional properties of the view object are used by JsRender for processing templates:\n\ntmpl: the template used to render the view\nviews: the child views in the view hierarchy\nctx: object (hash) with the named contextual helpers/template parameters for this view\ntag: the \"mytag\" view rendered by a custom tag {{mytag ...}}, has a view.tag property – the instance of the mytag tag object.\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "text": "JsRender as a Browserify module\nAfter installing JsRender on the server (using $ npm install jsrender) it can then be included in the Browserify client-script bundle, and loaded in the browser.\nThere are three options for loading JsRender in the browser as a Browserify module:\n\nLoad jQuery globally (as a script tag – so window.jQuery is defined), then load JsRender as a module in the Browserify client script bundle:\nrequire('jsrender'); // Load JsRender as jQuery plugin (attached to global jQuery)\n\nLoad both jQuery and JsRender as modules in the Browserify client script bundle:\nvar $ = require('jquery'); // Load jQuery as a module\nrequire('jsrender')($);    // Load JsRender as jQuery plugin (Query instance as parameter)\n\nLoad JsRender as a module in the Browserify client script bundle, without loading jQuery at all:\nvar jsrender = require('jsrender')(); // Load JsRender without jQuery (function call, no parameter)\n\n\nNote: In fact if jQuery is not defined globally, require('jsrender') returns a function.\nCalling that function without a parameter then loads JsRender without jQuery (and returns the JsRender namespace).\nAlternatively, calling that function with a reference to a jQuery instance as parameter loads JsRender as a plugin (attached to that jQuery instance) – and returns the jQuery instance.\n"
      },
      {
        "_type": "para",
        "title": "Example:",
        "text": "Example:\nindex.html:\n<html><head>\n  <script src=\".../jquery-xxx.js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n\nsource.js:\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n\ncommand line:\nbrowserify ./source.js > ./bundle.js\n\n"
      },
      {
        "_type": "para",
        "title": "JsViews as a Browserify module",
        "text": "JsViews as a Browserify module\nJsViews can also be included in the Browserify client-script bundle, and loaded in the browser.\nAfter installing on the server (using $ npm install jsviews), call:\nrequire('jsviews');    // Load JsViews (if jQuery is loaded globally)\n\nor – if also loading jQuery as a Browserify module, use:\nvar $ = require('jquery');\n...\nrequire('jsviews')($); // Load JsViews (passing local jQuery instance as a parameter)\n\n"
      },
      {
        "_type": "para",
        "title": "Loading templates as Browserify modules",
        "text": "Loading templates as Browserify modules\nJsRender includes a Browserify transform: jsrender/tmplify (see below) which allows you also to include your server file-based templates in the client-script bundle generated by Browserify.\nYou can then access the compiled templates in the browser, as modules.\nThe exact syntax depends on whether jQuery is loaded globally, loaded as a Browserify module, or not loaded at all.\n\nIf jQuery is loaded globally then use:\nvar tmpl = require('./templates/myTemplate.html');           // Load template (jQuery \n                                                             // is loaded globally)\nvar html = tmpl.render(myData);\n...\n\nIf jQuery is loaded as a module, use:\nvar $ = require('jquery');\n...\nvar tmpl = require('./templates/myTemplate.html')($);        // Load template (local\n                                                             // jQuery as parameter)\nvar html = tmpl.render(myData);\n...\n\nIf loading JsRender as a module, without jQuery, use:\nvar jsrender = require('jsrender')(); // function call -- no parameter\n...\nvar tmpl = require('./templates/myTemplate.html')(jsrender); // Load template (jsrender\n                                                             // namespace as parameter)\nvar html = tmpl.render(myData);\n...\n\n\nNote on relative paths: The ./... paths used to identify bundled templates are always interpreted as relative paths relative to the location of your calling script, which in this case is the Browserify script that created the client bundle. (Note that declaring a templates folder for Express or Hapi does not change the origin of these relative paths).\n"
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
        "text": "Including jQuery and/or JsRender/JsViews in the client-script bundle\nWhen using Browserify with JsRender on Node.js, you will generally need jQuery and JsRender/JsViews in the client, to render (and optionally data-link) the templates.\njQuery, JsRender and JsViews are all available as npm/Browserify modules, so you can choose whether to load them globally, using a script block, or as a module. Here are three examples following alternative strategies:\nLoad jQuery and JsRender/JsViews globally\n$ is defined as a global variable (window.$, or window.jQuery).\nUse require(templatePath) to load templates as Browserify modules included in the client-script bundle, as in the following example:\nindex.html:\n<script href=\".../jquery...js\"></script>\n<script href=\".../jsrender.js\"></script>\n...\n<script src=\"bundle.js\"></script>\n\nsource.js:\nvar myTmpl = require('./templates/myTemplate.html'); // Include compiled template in client-script bundle\nvar html = myTmpl(data); // Render using compiled template\n$('#result').html(html);\n\ncommand line:\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n\nSee the JsRender Node Starter project for complete examples:\n\nclientcode-hello.js and layout-hello.html using JsRender\nclientcode-movies.js and layout-movies.html using JsViews.\n\nLoad jQuery and JsRender/JsViews as Browserify modules\nUse var $ = require('jquery') to load jQuery, and require('jsrender')($) or require('jsviews')($) to load JsRender/JsViews.\nUse require(templatePath)($) to load templates as Browserify modules included in the client-script bundle, as in the following example:\nindex.html:\n...\n<script src=\"bundle.js\"></script>\n\nsource.js:\nvar $ = require('jquery');\nrequire('jsrender')($);\nvar myTmpl = require('./templates/myTemplate.html')($)\nvar html = myTmpl(data);\n$('#result').html(html);\n\ncommand line:\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n\nSee:\n\nclientcode-hello-browserify.js and layout-hello-browserify.html for an example loading jQuery and JsRender as modules\nclientcode-hello-browserify2.js and layout-hello-browserify2.html for an example loading JsRender as a module (without jQuery)\nclientcode-movies-browserify2.js and layout-movies-browserify2.html for an example loading jQuery and JsViews as modules\n\nMixed approach: Load jQuery globally, and JsRender/JsViews as a Browserify module\n$ is defined as a global variable (window.$ or window.jQuery).\nUse require('jsrender') or require('jsviews') to load JsRender/JsViews.\nUse require(templatePath) to load templates as Browserify modules included in the client-script bundle, as in the following example:\nindex.html:\n<script href=\".../jquery...js\"></script>\n...\n<script src=\"bundle.js\"></script>\n\nsource.js:\nrequire('jsrender');\nvar myTmpl = require('./templates/myTemplate.html');\nvar html = myTmpl(data);\n$('#result').html(html);\n\ncommand line:\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n\nSee clientcode-movies-browserify.js and layout-movies-browserify.html for an example using JsViews.\n"
      },
      {
        "_type": "para",
        "title": "Sample code",
        "text": "Sample code\nFor running code examples using JsRender, Browserify, and the tmplify transform, see the index-express-browserify.js and index-hapi-browserify.js samples in the JsRender Node Starter project.\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\nWebpack support\n"
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
        "text": "Defining templates as .html files\nOn Node.js, JsRender templates can be stored directly in the file system  (e.g. as .html, .jsr. or .jsrender files) – for example:\nTemplate: ./templates/myTemplate.html – with contents:\nName: {{:name}}<br/>\n\nCode: JsRender recognizes file paths (for valid relative file paths starting with './'), so you can write:\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template\n\nvar html = tmpl({name: \"Jim\"}); // Render\n// result: Name: Jim<br/>\n\nNote: The ./... paths are always interpreted as relative paths relative to the location of your calling script. Declaring a templates folder for Express or Hapi does not change the origin of these relative paths.\n"
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
        "title": "Nested calls to file-based templates (composition)",
        "text": "Nested calls to file-based templates (composition)\nJsRender’s awareness of Node.js file paths (relative paths starting with './') means your templates can include recursive calls to other templates (partials). You don’t need to register or compile those templates separately. (See also: template composition).\nTemplate: ./templates/personTemplate.html:\nName: {{:name}}<br/>Address: {{include tmpl='./templates/other/addressTemplate.jsr'}}\n\nTemplate: ./templates/other/addressTemplate.jsr:\nStreet: <em>{{:street}}</em>\n\nCode: Compile and render, recursively:\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html');\n// Compile template - and also any recursively called templates\n\nvar html = tmpl({name: \"Jim\", street: \"Main St\"});\n// result: Name: Jim<br/>Address: <em>Main St</em>\n\n"
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
        "text": "Installation\nOn Node.js from the command line, install jsrender:\n$ npm install jsrender\n\nUsage\nLoad the jsrender module:\nvar jsrender = require('jsrender');\n\nNow call JsRender APIs, or use Express or Hapi integration, for server-rendering of JsRender templates.\n(For loading JsRender in the browser using Browserify or webpack, see JsRender as a Browserify module and JsRender as a webpack module)\n"
      },
      {
        "_type": "para",
        "title": "JsRender APIs on the server &ndash; same as in the browser!",
        "text": "JsRender APIs on the server – same as in the browser!\nIn the browser, when jQuery is present, JsRender loads as a jQuery plugin and adds APIs to the jQuery namespace object, as:\n$.views, $.templates and $.render\nOn the server exactly the same APIs are provided, associated instead with the jsrender namespace:\njsrender.views, jsrender.templates and jsrender.render.\nFor convenience you can call the namespace $ and then use the regular APIs: $.views..., $.templates..., $.render..., or copy from the regular browser examples/samples – as if in the browser with jQuery.\nFor example:\nvar $ = require('jsrender'); // Returns the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl(data); // Or alternative syntax: var html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n\n"
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
        "text": "Single Page Apps with initial rendering on server\nAn important scenario is a single page app using JsRender or JsViews in the client to create dynamic UI, combined with initial rendering of the content on the server by JsRender using the same template.\nThis can bring many advantages, including SEO, and eliminating flicker when the page is refreshed with a new server request.\nNote: To completely eliminate flicker on data-linked content which has already been rendered on the server, it is sometimes useful to use the syntax data-link=\"...^{...}\" – which data-links without doing the initial render. Here is an example from  movie-detail.html in the JsRender Node Starter:\n<div><input value=\"{{:title}}\" data-link=\"^{:title:}\" /></div>\n\n"
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
        "title": "Template composition (partials)",
        "text": "Template composition (partials)\nThe most common way of composing templates is to have a layout template, and to use {{include tmpl=... /}}:\ntop level content\n{{include tmpl='myInnerTemplate' /}}\n\nBut in fact template composition can be done by adding references to external templates using tmpl=... on any tag, as shown in the previous section.\nDynamic composition\nNote that the tmpl=... can use any expression, so you can assign different nested templates dynamically based on data or context. For example you might write {{include tmpl=~getTemplate(type) /}} – where ~getTemplate(...) is a helper which returns a different template based in this case on the type property of the current data item.\nIn fact when setting tmpl=... dynamically, the returned template can be in any if the following forms:\n\na compiled template\na markup string\nthe name of a registered template\na selector\n(on Node.js) a file path to a template\n\n"
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
        "title": "Inline block content / external 'tmpl=...'  reference: same view hierarchy...",
        "text": "Inline block content / external 'tmpl=...'  reference: same view hierarchy...\nA view corresponds an instance of a block tag or a rendered template – so if we replace the inline content of a tag by an external reference: tmpl=..., the rendered result will be unchanged, and the view structure will also be identical:\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{if members.length tmpl=\"#membersTemplate\" /}}\n</script>\n\n<script id=\"membersTemplate\" type=\"text/x-jsrender\">\n  The team has members!\n</script>\n\nSame view structure as before:\n— teamView                data: team\n   — ifView               data: team\n"
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
        "text": "\n  <div>\n    Team: {{:title}} -\n    {{mytag members/}}\n\n    {{if members.length}}\n      Members:\n        {{for members}}\n          {{:name}}\n        {{/for}}\n    {{/if}}\n  </div>\n\n\n\n// mytag: custom tag to output \"1 member\" or \"n members\"\n$.views.tags(\"mytag\", \"{{:length == 1 ? '1 member' : length + ' members'}}\");\n// Alternative version of mytag:\n// $.views.tags(\"mytag\", \"{{if length == 1}}1 member{{else}}{{:length}} members{{/if}}\");\n\nvar teams = [\n  {title: \"The A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"The B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n\n$(\"#result\").html(html);\n\nvar html = $(\"#teamTemplate\").render(teams);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the resulting view structure:\n— arrayView               data: teams\n   — itemView             data: teams[0]               (Team: The A Team - )\n      — mytagView         data: team.members           (2 members)\n      — ifView            data: teams[0]               (Members:)\n         — arrayView      data: teams[0].members\n            — itemView    data: teams[0].members[0]    (Jeff)\n            — itemView    data: teams[0].members[1]    (Maria)\n   — itemView             data: teams[1]               (Team: The B Team - )\n      — mytagView         data: team.members           (1 members)\n      — ifView            data: teams[1]               (Members:)\n         — arrayView      data: teams[1].members\n            — itemView    data: teams[1].members[0]    (Francis)\n\n"
      },
      {
        "_type": "para",
        "title": "In JsViews: From UI back to data:",
        "text": "In JsViews: From UI back to data:\nNote: One of the features provided by JsViews data-linking (when you use the JsViews .link() method rather than JsRender’s .render() method) is the $.view(elem) method. This method provides a reverse mapping and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\nSo in effect in JsViews, the mapping from the view hierarchy to the UI becomes a two-way mapping…\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "paths": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender tags can take unamed arguments, or named parameters:\n{{:arg0}}\n\n{{someTag arg1 arg2 param_a=param1 param_b=param2}}\n  content\n{{/someTag}}\n\nThe values of the arguments or parameters (such as arg0… param1 … above) must be valid JsRender paths or expressions.\nJsRender expressions are regular Javascript expressions, but with no access to global variables.\nInstead of global Javascript variables, JsRender expressions use data paths, helper paths and view paths, to access data values, values provided by helpers, and values obtained from the view hierarchy, such as the #getIndex().\nData paths are of the form dataProperty.bb.cc, and they step through the data hierarchy, starting from the current data item (the data context for the current view). They can include array access, such as team.members[id]\nView paths are of the form #viewProperty.bb.cc, and they start from the current view. So for example, #data is short for #view.data - where #view is the current view.\nHelper paths are of the form ~myHelper.bb.cc, and they start from the named helper \"myHelper\". In addition they can be used to access contextual parameters, or the built-in ~root\nHere are some examples of JsRender paths and values:\nData paths:\n{{:name}}\n{{for address.street}}...{{/for}}\n{{>team.members[0].lastName}}\n{{:name.toUpperCase()}}\n\nHelper paths:\n{{>~utilities.errorMessages.msg1}}\n{{if ~settings.show}}...{{/if}}\n{{:~root.selectedName}}         {{!--Accessing root data--}}\n\nView paths:\n{{:#getIndex()}}\n{{include #content /}}\n{{if #parent.parent.data.isLead}}...{{/if}}\n{{>~getDescription(#data)}}\n\nA primitive value of type string, number, boolean, null …:\n{{if isOpen tmpl='It is open' /}}\n{{for address tmpl=\"#addressTemplate\"}}...{{/for}}\n{{range members start=1 end=5 /}}\n{{range members reverseSort=true /}}\n\nJsRender expressions can combine values in more complex expressions, using functions, parens, operators such as + - * / ! === == > !== || &&, as well as ternary expressions: ...?...:..., array and object accessors: [...] etc.\nHere are some examples of expressions:\n{{if book.author === \"Jim Boyd\"}}...{{/if}}\n{{:~utilities.format(book.title, 'upper', true)}}\n{{for ~sort(~root.getMembers()}}}...{{/for}}\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n{{range #parent.data.members()/}}\n{{:(~addRebate(book.price) + 23.2)*3.5/2.1}}\n{{:~mode === \"useTitle\" ? book.title : book.name}}\n{{if error}}...{{else !utilities.valid(book.description)}}...{{else}}...{{/if}}\n{{:~books[id].title}}\n{{:people[~currentIndex].name}}\n\nExpressions can include white space. The following two examples are equivalent:\n{{averageValue product.quantity*3.1/4.5 description=~getDescription(#data) /}}\n{{averageValue product.quantity * 3.1 / 4.5 description = ~getDescription( #data ) /}}\n\nThe {{averageValue}} tag is being assigned one argument, and one named “description” parameter. The two expressions differ only in white space, and both are syntactically valid. However, removing optional white space -– as in the first example -– makes it easier to see the distinct arguments and parameters of the tag.\n"
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
        "text": "Getter properties with plain objects\n\n\n\n  First name: {{:person.firstName()}} <br/>\n  Last name: {{:person.lastName()}} <br/>\n  Full name: {{:person.fullName()}}\n\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    _lastName: \"Blow\",\n    firstName: firstName,\n    lastName: lastName,\n    fullName: fullName\n  }\n};\n\nvar html = $(\"#personTmpl\").render(data);\n\n$(\"#result\").html(html);\nData:\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    _lastName: \"Blow\",\n    firstName: firstName,\n    lastName: lastName,\n    fullName: fullName\n  }\n};\n\nTemplate:\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Getter properties on a View Model",
        "text": "Getter properties on a View Model\nRather than using plain JavaScript objects with getter functions, as above, a more common pattern (providing better encapsulation) would be to define a ‘View Model’ class – with getter properties defined in the class – and to instantiate that class to provide data instances.\n(See Plain objects or View Model for details.)\nThe following sample uses that approach:\n"
      },
      {
        "_type": "sample",
        "title": "Getter properties with a View Model",
        "text": "Getter properties with a View Model\n\n\n\n  First name: {{:person.firstName()}} <br/>\n  Last name: {{:person.lastName()}} <br/>\n  Full name: {{:person.fullName()}}\n\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n\nvar html = $(\"#personTmpl\").render(data);\n\n$(\"#result\").html(html);\nData:\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n\nTemplate:\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "tmplsyntax": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following topics provide information on JsRender template syntax:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "settings": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender provides the following APIs for modifying settings:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "settings/delimiters": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See also Setting tag delimiters for JsViews\n"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "JsRender default tag delimiters\nTemplate tags in JsRender use the Mustache style: {{...}}\n(JsRender also accepts the data-linked tag syntax used in in JsViews: {^{...}}).\n"
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Changing delimiters:\nSometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as Django with the same default delimiters {{ and }}.\nThe following call:\n$.views.settings.delimiters(\"<%\", \"%>\");\n\nwill change the tag syntax to <%...%>.\n"
      },
      {
        "_type": "para",
        "title": "Verifying current setting for tag delimiters:",
        "text": "Verifying current setting for tag delimiters:\nvar delimiters = $.views.settings.delimiters();\n// Returns an array [\"{{\", \"}}\", \"^\"] - JsRender tag delimiters (and JsViews link character)\n\n"
      },
      {
        "_type": "sample",
        "title": "Choosing alternative tag delimiters, with JsRender",
        "text": "Choosing alternative tag delimiters, with JsRender\n\n\n\n  <b>[%:title%]</b>\n  <ul>\n    [%for members%]\n      <li>Name: [%:name%]</li>\n    [%/for%]\n  </ul>\n\n\n$.views.settings.delimiters(\"[%\", \"%]\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\nvar html = tmpl.render(team);\n\n$(\"#result\").html(html);\nMarkup:\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[%:title%]</b>\n  <ul>\n    [%for members%]\n      <li>Name: [%:name%]</li>\n    [%/for%]\n  </ul>\n</script>\n\nCode\n$.views.settings.delimiters(\"[%\", \"%]\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n\n\n"
      }
    ]
  },
  "settings/onerror": {
    "sections": []
  },
  "settings/dbgmode": {
    "sections": []
  },
  "settings/debugmode": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender has a ‘debug mode’ setting which determines whether error messages encountered during rendering are displayed.\nTo get current debug mode:\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n\nTo set debug mode:\n$.views.settings.debugMode(...);\n\nDebug mode can be set to any of the following:\n\nfalse – errors during rendering will not be rendered (but an exception will be thrown)\ntrue – no exception will be thrown, but the error message will be rendered, in place of the template tag or block\n\"some string\" – no exception. The string \"some string\" will be rendered in place of the tag or block\n\"\" (empty string) – no exception. The tag or block will simply be replaced by the empty string\na function (to be used as an error handler) – no exception. The handler will run, and the error string will be rendered, or else, if the function returns a string, that string will be rendered\n\nSee Error handling and debugging for a full discussion of alternative approaches, together with details and working examples of $.views.settings.debugMode(...).\n"
      }
    ]
  },
  "settings/allowcode": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates allow you to write rich expressions within the template tags, such as:\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n\nNevertheless, in order to improve encapsulation and maintainability, they don’t allow arbitrary code. For example, they don’t allow you to access global variables, like window.\nIf you want complete freedom to insert any code into a compiled template, you can set allowCode to true, either globally, or specifically for that template. You can then run any code as part of the template rendering, using the {{* ...}} tag, or you can return (render into the template output) the result of evaluating any expression, using the {{*: ...}} tag.\n"
      },
      {
        "_type": "para",
        "title": "To set allowCode to true, globally",
        "text": "To set allowCode to true, globally\n$.views.settings.allowCode(true);\n\n(See samples for {{* ...}} and {{*: ...}})\n"
      },
      {
        "_type": "para",
        "title": "To set allowCode back to false, globally",
        "text": "To set allowCode back to false, globally\n$.views.settings.allowCode(false);\n\n"
      },
      {
        "_type": "para",
        "title": "To get current global allowCode setting",
        "text": "To get current global allowCode setting\nvar allowCodeIsTrue = $.views.settings.allowCode(); // false by default\n\n"
      },
      {
        "_type": "para",
        "title": "To set allowCode to true for a specific template",
        "text": "To set allowCode to true for a specific template\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n\n(See {{* ...}} and {{*: ...}} sample: allowCode for template).\n"
      }
    ]
  },
  "settings/advanced": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender has the following advanced setting:\n\nuseViews – default: false\n\nand also the following ‘private’ advanced setting:\n\n_jsv – default: false\n\nuseViews controls a JsRender performance optimization, while building the view hierarchy. In very simple templates there will usually not be any need to access the view. JsRender detects these cases, does not create a view, and hence obtains a slight performance gain. By setting useViews to true, you guarantee that JsRender will always create views for template blocks.\n_jsv is a ‘private’ setting (could change in the future). If set to true JsRender provides a global _jsv variable, which gives access to the internal store of views.\nTo get current advanced settings:\nvar advancedSettings = $.views.settings.advanced();\n\nBy default the returned advancedSettings object is:\n{useViews: false, _jsv: false}\n\nTo set advanced settings:\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n\n"
      }
    ]
  },
  "onerror": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Sometimes when rendering a JsRender template, a JavaScript error is encountered. For example {{:address.street}} in a template will render without error provided there is an address property on the current data object. But if there is no address property, then there will be an error: “Cannot read property ‘street’ of undefined”.\nJsRender provides two features which provide powerful control over rendering behavior when errors are encountered.\n\nThe optional onError=... property that can be set on any tag – for controlling error handling behavior on that specific tag\nThe $.views.settings.dbgMode(...) setting – which provides global control over error handling during rendering\n\nIn addition, for advanced debugging of compiled templates, see:\n\nUsing debugging helpers\n\n\nSpecifying onError fallback behavior on a tag\n"
      },
      {
        "_type": "para",
        "title": "Setting onError to a string",
        "text": "Setting onError to a string\nAll JsRender tags (including custom tags) such as {{address.street}} or {{for getItems()}} allow you to provide a onError tag property, with a fallback string to render in the case of errors:\n{{:address.street onError=\"Address unavailable\"}}\n\n{{for phones() onError=\"No phones\"}}\n\n{{myCustomTag ... onError=\"\"}}\n\nThe onError fallback string will be rendered whenever there an error (or exception) is encountered during the tag rendering.\nSetting to the empty string ensures that errors are simply ignored, and the tag renders as the empty string.\n"
      },
      {
        "_type": "sample",
        "title": "onError=\"fallback string...\" ",
        "text": "onError=\"fallback string...\" \n\n\n\n{{for members}}\n  Phones:\n  {{for phones() onError=\"<em>No phones</em>\"}}\n    {{:}}\n  {{/for}}\n  <br/>\n  <b>{{:address.street onError=\"Address unavailable\"}}</b>\n  <hr/>\n{{/for}}\n\n\nfunction phones() {\n  if (!this._phones) {\n    throw new Error(\"phones() error\");\n  }\n  return this._phones;\n}\n\nvar team = {\n  members: [\n    {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"],\n      phones: phones},\n    {address: undefined, _phones: [\"987\", \"111\"],       // No address\n      phones: phones},\n    {address: {street: \"Main St\"}, _phones: undefined,  // _No phones\n      phones: phones}\n  ]\n};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\nIn this sample, if a member object has no address property, the address.street expression will lead to a JavaScript error, and the {{:address.street onError=\"Address unavailable\"}} will render the fallback string:  \"Address unavailable\".\nSimilarly, {{for phones() onError=\"...\"}}, if phones() produces an error…\nTemplate:\n{{for phones() onError=\"<em>No phones</em>\"}} ...\n{{:address.street onError=\"Address unavailable\"}}\n\nCode:\nfunction phones() { if (!this._phones) { throw new Error(\"phones() error\"); } ... }\n\nData:\nmembers: [\n  {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"], ...\n  {address: undefined, _phones: [\"987\", \"111\"], ...             // No address\n  {address: {street: \"Main St\"}, _phones: undefined, ...        // _No phones\n]\n\n\n"
      },
      {
        "_type": "para",
        "title": "Setting onError to an expression",
        "text": "Setting onError to an expression\nMore specific or powerful behavior can be obtained by setting onError to an expression, such as:\n{{:address.street onError=name + \" has no address\"}}\n\n{{:address.street onError=~errorMessages(1, name, 'address')}}\n\n"
      },
      {
        "_type": "sample",
        "title": "onError=someExpression...",
        "text": "onError=someExpression...\n\n\n\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    Phones:\n    {{for phones() onError=name + \" has no phones\"}}\n      {{:}}\n    {{/for}}\n    <br/>\n    <b>{{:address.street onError=~errorMessages(1, name, \"address\")}}</b>\n    <hr/>\n  </div>\n{{/for}}\n\nfunction phones() {\n  if (!this._phones) {\n    throw new Error(\"phones() error\");\n  }\n  return this._phones;\n}\n\nvar team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"],\n      phones: phones},\n    {name: \"Jane\", address: undefined, _phones: [\"987\", \"111\"],       // No address\n      phones: phones},\n    {name: \"Ava\", address: {street: \"Main St\"}, _phones: undefined,  // _No phones\n      phones: phones}\n  ]\n};\n\n$.views.helpers(\"errorMessages\", function(id, param1, param2) {\n  if (id === 1) {\n    return param1 + \" has no \" + param2;\n  } \n});\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n\n{{for phones() onError=name + \" has no phones\"}} ...\n\n{{:address.street onError=~errorMessages(1, name, \"address\")}}\n\n$.views.helpers(\"errorMessages\", function(id, param1, param2) {\n  if (id === 1) { return param1 + \" has no \" + param2; } ...\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Setting onError to a function",
        "text": "Setting onError to a function\nIf onError=myOnErrorHandler is set to a function, then the function will be called when there is an error.\n\nIf the function returns a string, then that string will be rendered, replacing the template block\nIf the function has no return value, then the error message will be rendered\n\nFor example, you can provide a person.error() error handler method on a person object, and set onError=error. Or you can use global helper (or a helper passed to the render function), and set onError=~myErrorHandler, such as the following to log the error and display just the empty string:\nfunction myErrorHandler(e, view) {\n  console.log(...); // Log the error \n  return \"\";        // Display the empty string \n}\n\nThe parameters of the onError handler function – myHandler(e, view) – will be:\n\ne – the error object\nview – the current view object\nThe this pointer will be the current data item, view.data\n\n"
      },
      {
        "_type": "sample",
        "title": "onError=~myOnError",
        "text": "onError=~myOnError\n\n\n\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    <b>{{:address.street onError=~myOnError}}</b>\n    <hr/>\n  </div>\n{{/for}}\n\n\nvar team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}},\n    {name: \"Jane\", address: undefined}           // No address\n  ]\n};\n\nfunction onErrorHandler(e, view) {\n  console.log(e.message);\n  if (!this.address) {\n    return this.name + \" has no address (\" + e.message + \")\";\n  }\n}\n\nvar html = $(\"#teamTmpl\").render(team, {myOnError: onErrorHandler});\n\n$(\"#result\").html(html);\n\n{{:address.street onError=~myOnError}}\n\nfunction onErrorHandler(e, view) {\n  console.log(e.message);\n  if (!this.address) {\n    return this.name + \" has no address (\" + e.message + \")\";\n  }\n}\n\nvar html = $(\"#teamTmpl\").render(team, {myOnError: onErrorHandler});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "\nSetting debug mode\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The $.views.settings.dbgMode(...) setting provides control of error handling during rendering, similar to the onError feature above, but operating at a global level rather than on individual tags.\nThese two approaches are complementary and can be used together.\n"
      },
      {
        "_type": "para",
        "title": "Setting debug mode to true",
        "text": "Setting debug mode to true\n\nBy default debug mode is false – and an exception will be thrown if a JavaScript error is encountered while rendering a template block\nIf debug mode is set to true – error messages encountered while rendering a template block will replace the rendered content of that block\n\nTo set debug mode to true:\n$.views.settings.debugMode(true);\n\nTo set debug mode back to false:\n$.views.settings.debugMode(false);\n\nTo get current debug mode:\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n\nIn the following example debug mode is set to true. The error message is rendered, replacing the template block.\n(Choose Try it and change debug mode to false, to see the difference.)\n"
      },
      {
        "_type": "sample",
        "title": "Debug mode set to true",
        "text": "Debug mode set to true\n\n\n\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n\n\n$.views.settings.debugMode(true); \n// Change to $.views.settings.debugMode(false); - The error\n// will not be displayed, but an exception will be thrown.\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n\nCode:\n$.views.settings.debugMode(true);\n\nThe template block for Bill (who has no address) is replaced by the error message.\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"}, // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n...\n\nTemplate:\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following example also illustrates setting debug mode to true, but this time it is used with JsViews, and the link(...) method, rather than JsRender and render(...).\nThe error conditions can arise both in expressions within tags, such as {^{:manager.name}} and data-link expressions such as <input data-link='manager.name'.\n"
      },
      {
        "_type": "sample",
        "title": "Debug mode set to true &ndash; JsViews",
        "text": "Debug mode set to true – JsViews\ninput {width: 350px;}\n\n\n\n\n  Team:<div> \n    {{for team}}\n      Owner: {^{:manager.name}}\n    {{/for}}\n  </div>\n  Edit: <input data-link='manager.name' />\n\n\n$.views.settings.debugMode(true);\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", {team: team}); // Error...\nTemplate:\nTeam:<div>\n  {{if owner}}\n    Owner: {^{:manager.name}}\n  {{/if}}\n</div>\nEdit: <input data-link='manager.name' />\n\nCode:\n$.views.settings.debugMode(true);\n// Debug mode is set to true, so error messages are rendered as content of corresponding template block.\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n...\ntmpl.link(\"#result\", team); // Error...\n\nIf you choose Try it and change to $.views.settings.debugMode(false);, the error will instead be thrown as an exception.\n\n"
      },
      {
        "_type": "para",
        "title": "Setting debug mode to a string",
        "text": "Setting debug mode to a string\nBy setting debug mode to a string rather than to true, no exception will be thrown, and the chosen string will be rendered, replacing the template block.\n$.views.settings.debugMode(\"Error!\");\n\n"
      },
      {
        "_type": "sample",
        "title": "Debug mode set to a default string",
        "text": "Debug mode set to a default string\n\n\n\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n\n\n$.views.settings.debugMode(\"Error!\");  // Do not throw exception - render \"Error!\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n\n$.views.settings.debugMode(\"Error!\"); \n\nThe template block for Bill (who has no address) is replaced by \"Error!\".\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In some scenarios the desired behavior may be to ignore errors during rendering, by skipping any template block with an error, rendering it as an empty string. This is achieved very easily, by simply writing:\n$.views.settings.debugMode(\"\");\n\n"
      },
      {
        "_type": "sample",
        "title": "Debug mode set to empty string",
        "text": "Debug mode set to empty string\n\n\n\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n\n\n$.views.settings.debugMode(\"\");   // Do not throw exception - render \"\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n\n$.views.settings.debugMode(\"\");\n\nThe template block for Bill (who has no address) is skipped.\n\n"
      },
      {
        "_type": "para",
        "title": "Providing a debug mode handler (function)",
        "text": "Providing a debug mode handler (function)\nIf debug mode is set to a function, the function will be called each time an error is encountered during rendering.\n\nIf the function returns a string, then that string will be rendered, replacing the template block\nIf the function has no return value, then the error message will be rendered\n\n$.views.settings.debugMode(myOnErrorHandler);\n\nfunction myOnErrorHandler(e, fallback, view) {\n  // This handler will log the error, and then display the empty string\n  console.log(...);\n  return \"\"; \n}\n\nThe parameters of the debug mode error handler function – myHandler(e, fallback, view) – will be:\n\ne – the error object\nfallback – the fallback error string, provided by the onError fallback specified on the tag, if there is one\nview – the current view object\nThe this pointer will be the current data item, view.data\n\n"
      },
      {
        "_type": "sample",
        "title": "Debug mode &ndash; onError handler",
        "text": "Debug mode – onError handler\n\n\n\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    {{:address.street onError='address'}}\n    <hr/>\n  </div>\n{{/for}}\n\n\nvar team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}},\n    {name: \"Jane\", address: undefined}           // No address\n  ]\n};\n\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return 'Address error for ' + this.name + '. (\"' + e.message + '\")';\n  }\n}\n\n$.views.settings.debugMode(onErrorHandler);\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n\n{{:address.street onError='address'}}\n\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return '<b>Address error</b> for ' + this.name + '. <em>(\"' + e.message + '\")</em>';\n  }\n}\n\n$.views.settings.debugMode(onErrorHandler);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Advanced debugging, using debugging helpers",
        "text": "Advanced debugging, using debugging helpers\nInserting breakpoints during rendering:\nJsRender (and JsViews) provide some helpers for debugging code within compiled templates:\n\nThe {{dbg expression/}} tag\nThe {{dbg: expression}} converter\nThe ~dbg(expression) helper function\n\nEach of the above will\n\nevaluate the expression\noutput a console.log(...) call\nthrow and catch an exception - which you can use as a break point by stopping on caught exceptions\nrender the evaluated expression\n\nThis is done by inserting code into the compiled template which calls into the built-in dbgBreak code:\nfunction dbgBreak(val) {\n  try {\n    console.log(\"JsRender dbg breakpoint: \" + val);\n    throw \"dbg breakpoint\"; // To break here, stop on caught exceptions.\n  }\n  catch (e) {}\n\nval will be the result of evaluating expression.\nWhen rendering execution breaks at the above code, you can then step up through the call stack to the compiled template code, for further debugging.\nUsage examples: {{dbg:...}}, {{:~dbg(...)}}, {{dbg .../}} etc.\nBreakpoints during data linking:\nIn JsViews, a breakpoint can also be inserted during template data-linking, as in {^{for ... onAfterLink=~dbg}}.\nUsing {{*debugger}}:\nAn alternative (but similar) debugging technique is to use allowCode to insert a debugger; statement directly into the compiled template code, as follows:\nCode:\nvar tmpl = $.templates({\n  markup: \"#myTmpl\",\n  allowCode: true // Alternatively use global setting: $.views.settings.allowCode(true)\n});\n\nTemplate:\n...\n{{*debugger}}\n...\n\n"
      }
    ]
  },
  "advanced": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "apps": {
    "sections": [
      {
        "_type": "para",
        "title": "Apps using JsRender",
        "text": "Apps using JsRender\nJsRender is a simple light-weight templating engine. It can be used in the browser within simple web pages, or within complex single-page apps, or in conjunction with other frameworks. It can also be used on the server, using Node.js.\nIt is highly flexible, expressive, and ‘unopiniated’ – so it leaves you free to work within your own choice of overall application architecture (including architectures based on MVVM, MVP or MVC – optionally with server/client integration), and lets you use your own flavor of data/model layer – whether simple plain JavaScript objects, hand-coded View Model instances, or compiled View Models.\n"
      },
      {
        "_type": "para",
        "title": "Components of an app using JsRender",
        "text": "Components of an app using JsRender\nAny app or web page using JsRender templates will generally involve defining or registering the following elements:\n\none or more templates – see Templates\na ‘data Layer’ – see JsRender: Data or View Model\noptionally, helpers – in the form of metadata, helper functions and converter functions, see Helpers and Converters\noptionally, reusable components for use within your templates – see Custom tags\n\n"
      },
      {
        "_type": "para",
        "title": "Apps using JsViews",
        "text": "Apps using JsViews\nJsRender also provides optional integration with JsViews. JsViews is much more of a framework than JsRender. It does much more than just templating – providing also data-binding, MVVM support, observability of the data/View Model layer, support for interactive encapsulated components (JsViews tag controls), and more. Nevertheless, it can also interoperate with other frameworks and components. See Building apps in JsViews for more information.\n"
      }
    ]
  },
  "getindex": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "If you pass an array to the JsRender .render(myArray) method, or if you use {{for myArray}},  in a template, JsRender will iterate over the array, and render an item view for each item in the array.\nWithin an item view you can access the array-index of the current item, using {{:#index}}:\n\nGetting item index within a top-level item view (from .render(myArray)):\n...\n{{:#index}}\n...\n\nGetting item index within a {{for myArray}} block:\n{{for myArray}}\n  ...\n  {{:#index}}\n  ...\n{{/for}}\n\n\nIf there are additional nested tags, then from within the nested tags you can still access the index, by using {{:#getIndex()}}:\n\nGetting item index from nested tags within an item view:\n{{for myArray}}\n  ...\n  {{if ...}}\n    ...\n    {{:#getIndex()}}\n    ...\n  {{/if}}\n  ...\n{{/for}}\n\n\nSee index and getIndex() for additional details.\n"
      },
      {
        "_type": "links",
        "title": "See also",
        "text": "See also\n"
      }
    ]
  },
  "contextualparams": {
    "sections": [
      {
        "_type": "para",
        "title": "Defining contextual parameters",
        "text": "Defining contextual parameters\nContextual parameters provide a very convenient way of passing values in to nested tag contexts. (See View hierarchy.)\nA contextual parameter is defined by simply writing ~myValue=... (for any expression) on any block tag, such as {{if}} or {{for}}.\nThe resulting ~myValue parameter can then be accessed within the block tag – or deeper down within nested tag contexts, at any depth.\nFor example, the following template defines three contextual parameters, and uses them in nested contexts:\n...\n{{if isActive ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n  {{for members}}\n    {{if ~teamIndex>2}}\n      {{:~teamTitle}} {{:~teamData.description}}\n      ...\n\nNote: You can also set contextual parameters on {{else}} blocks, such as in the following example which uses the same template for the {{if}} and {{else}} blocks, but assigns different values to the ~teamTitle parameter in each case:\n{{if isActive ~teamTitle=activeTitle tmpl=\"teamTmpl\"}}\n{{else ~teamTitle=inactiveTitle tmpl=\"teamTmpl\"}}\n{{/if}}\n\n"
      },
      {
        "_type": "para",
        "title": "itemVar &ndash; contextual parameter for data 'item' of block",
        "text": "itemVar – contextual parameter for data 'item' of block\nThe itemVar feature lets you set up a contextual parameter for the current data ‘item’ of a block. It is in effect an ‘alias’ for #data within the block.\nTo define an itemVar contextual parameter for a block tag, simply write itemVar=~someName. The parameter ~someName can then be accessed like any other helper variable or contextual parameter, within nested contexts to any depth.\n...\n{{for teams itemVar=\"~team\"}}\n  ...\n  {{for members itemVar=\"~member\"}}\n    ...\n    {{if isActive}}\n      {{:~team.title}} {{:~member.name}}\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing root data: the built-in '~root' contextual parameter",
        "text": "Accessing root data: the built-in '~root' contextual parameter\nThe built-in contextual parameter ~root provides direct access to the root data which was passed to the render() method (or link() method if you are using JsViews). It can be accessed from anywhere within a template, at an level of nested tags.\nNote: If an array is passed to render() or link() then ~root will be the array (so you can render {{:root.length}} for example).\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "parentdata": {
    "sections": [
      {
        "_type": "para",
        "title": "Accessing \"parent\" data, from nested views. Passing in template variables",
        "text": "Accessing \"parent\" data, from nested views. Passing in template variables\nWhen a template (containing nested template tags) is rendered, the result is a view hierarchy – where the views provide information on how the underlying data objects map to the rendered UI.\nOften it is helpful to be able to access the data for a parent view from a nested template or block (nested view).\nThere are several ways to get to parent data:\n\nCreate a contextual parameter to pass a value to nested views.\nHere are three examples:\n...\n{{if ... ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n  ...\n  {{for ...}}\n    ...\n    {{:~teamTitle}} {{:~teamData.title}} {{:~teamIndex}}\n\nUse itemVar to provide a contextual parameter for the current data ‘item’ of a block, to be passed in to deeper nested contexts\n...\n{{for members itemVar=\"~member\"}}\n  ...\n  {{props}}\n    ...\n    {{:~member.name}}\n\nUse the view.parent property to step up through successive parent views (#parent, #parent.parent etc.):\n...\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#parent.parent.data.title}}\n\nUse the view.get(type) method to get to a parent view of a given type:\n...\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#get(\"if\").data.title}}\n\n\nUse the view.getIndex() method to get to the index of a parent “item” view:\n{{if ...}}\n  ...\n  {{for ...}}\n    ...\n    {{:#parent.getIndex()}}\n    {{:#getIndex()}}\n\n\nHere is a sample showing all of these methods:\n"
      },
      {
        "_type": "sample",
        "text": "\n  <div>\n    Team: {{:title}} -\n    {{mytag members/}}\n\n    {{if members.length\n      ~teamTitle=title\n      ~teamData=#data\n      ~teamIndex=#index\n    }}\n      Members: <ul>\n        {{for members\n          itemVar=\"~member\"\n        }}\n          <li>\n            {{:name}}\n            (\n              {{:~teamTitle}}\n              {{:~teamData.title}}\n              {{:#parent.parent.data.title}}\n              {{:#get(\"if\").data.title}}\n            )\n            <br/>\n            [\n              {{:~teamIndex}}\n              = {{:#parent.getIndex()}}\n              : {{:#getIndex()}}\n            ]\n            <br/>\n            {{props}}\n              {{:key}}: {{:prop}}\n              (\n                {{:~member.name}}\n              )\n            {{/props}}\n          </li>  \n        {{/for}}\n        </ul>\n    {{/if}}\n  </div>\n\n\n\n// mytag: custom tag to output \"1 member\" or \"n members\"\n$.views.tags(\"mytag\", \"{{:length == 1 ? '1 member' : length + ' members'}}\");\n// Alternative version of mytag:\n// $.views.tags(\"mytag\", \"{{if length == 1}}1 member{{else}}{{:length}} members{{/if}}\");\n\nvar teams = [\n  {title: \"The A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"The B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n\n$(\"#result\").html(html);\nThis sample shows all the ways to get to parent data described in the section above:\n\nCreate a contextual parameter to pass a value to nested views.\nUse itemVar to provide a contextual parameter for the current data ‘item’ of a block, to be passed in to deeper nested contexts\nUse the view.parent property to step up through successive parent views (#parent, #parent.parent etc.):\nUse the view.get(type) method to get to a parent view of a given type:\nUse the view.getIndex() method to get to the index of a parent “item” view:\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsrmodel": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender is designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as View Model classes.\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n\nrendering your templates directly against the objects and arrays returned from the JSON request\npassing the data through a ‘mapping’ process to create a hierarchy of View Model instances, and rendering your templates against those objects\n\nThe plain objects approach is convenient and simple for getting rapidly up and running with templates. But for more complex projects the View Model approach is better for creating clean well-designed modular code, where each View Model has specific getters, setters and methods, and can have its own ‘private’ properties and state.\n"
      },
      {
        "_type": "para",
        "title": "Using JsRender built-in compiled View Models",
        "text": "Using JsRender built-in compiled View Models\nJsRender will work well with your own ‘hand-coded’ View Model classes (see below).\nBut in most cases it is simpler and better to use the $.views.viewModels(...) API. This API lets you very easily and rapidly compile View Model classes for your own needs, following a standard pattern, and with some additional powerful features:\n\nIt provides a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of View Model instances, or for converting back to plain data (such as for submitting to the server)\nIt also provides a merge(...) feature for incrementally updating the View Model hierarchy, using updated plain data from the server.\n\n"
      },
      {
        "_type": "para",
        "title": "Data / View Model with JsViews",
        "text": "Data / View Model with JsViews\nAll of the alternatives mentioned above (plain object hierarchies, hand-coded View Model classes, or JsRender compiled View Model classes) can also be used with JsViews data-binding and observable data. (For more information see JsViews: Data / View Model and JsViews: Compiled View Models.)\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with plain objects and arrays</b>",
        "text": "Example: JsRender with plain objects and arrays\n"
      },
      {
        "_type": "code",
        "title": "Suppose this is our data from a JSON request:",
        "text": "Suppose this is our data from a JSON request:\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n"
      },
      {
        "_type": "template",
        "title": "We'll render using a template structured like this:",
        "text": "We'll render using a template structured like this:\n... \n{{:name}}\n...\n{{:address.street}}\n...\n{{for phones}}\n  ...      \n  {{:number}}\n  ...\n{{/for}}\n...\n"
      },
      {
        "_type": "sample",
        "title": "Render template directly against plain objects...",
        "text": "Render template directly against plain objects...\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name}}</td></tr>\n    <tr><td>Street:</td><td>{{:address.street}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones}}\n          <tr><td>{{:number}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render template against plain object hierarchy\n$(\"#result\").html(tmpl.render(person));\n\n\n\n... {{:name}} ...\n\nRender template against person (plain object)\n\n$(\"#result\").html(tmpl.render(person));\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we’ll convert the above sample to use View Model classes.\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with 'hand-coded' View Model objects</b>",
        "text": "Example: JsRender with 'hand-coded' View Model objects\nWe’ll convert the data to a corresponding hierarchy of simple ‘hand-coded’ View Model class instances. In each case we will replace properties by simple getters, and corresponding ‘private’ properties.\n"
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "View Model classes:\nHere is the class definition for Person:\n// Constructor\nfunction Person(name, address, phones) {\n  // Initialize private properties\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  // Define a getter for each property \n  name: function() {\n    return this._name;\n  },\n  address: function() {\n    return this._address;\n  },\n  phones: function() {\n    return this._phones;\n  }\n};\n...\n\nWe define exactly similar classes for our Address and Phone objects too.\nThe above pattern for View Model classes will work well with JsRender. (It will also work seamlessly with JsViews data-binding, if at some point you choose to upgrade to use JsViews features).\nNote: The standard JsRender View Model pattern provided by $.views.viewModels is similar, but provides also setters (along with optional ‘observability’ for two-way binding in JsViews).\n"
      },
      {
        "_type": "para",
        "title": "Getter functions",
        "text": "Getter functions\nNote that properties are now getter functions, which return the appropriate value (which may be of any type, including objects or arrays – such as address and phones above).\nIn fact they are particular case of computed properties – a concept that can be used quite generally within JsRender and JsViews, not only for View Model properties.\n"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "Template\nTo convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now getter functions:\n... \n{{:name()}}\n...\n{{:address().street()}}\n...\n{{for phones()}}\n  ...      \n  {{:number()}}\n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "para",
        "title": "Instantiate and render:",
        "text": "Instantiate and render:\nNow all we need to do is to construct our root person object (with its underlying hierarchy of View Model instance objects) and render the template against that object in the usual way.\n"
      },
      {
        "_type": "sample",
        "title": "Render template against a View Model object hierarchy",
        "text": "Render template against a View Model object hierarchy\n\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n... {{:name()}} ...\n\n\nInstantiate View Model hierarchy\n\n// Use previously defined View Model classes: Person, Address, Phone\nvar person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n\nRender template against person object (instance of Person)\n\n$(\"#result\").html(tmpl.render(person));\n\n// View Model class definitions using getter pattern\n\n// Person\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  phones: function() {\n    return this._phones;\n  },\n  address: function() {\n    return this._address;\n  }\n};\n\nPerson.prototype = personProto;\n\n// Address\nfunction Address(street) {\n  this._street = street;\n}\n\nvar addressProto = {\n  street: function() {\n    return this._street;\n  }\n};\n\nAddress.prototype = addressProto;\n\n// Phone\nfunction Phone(number) {\n  this._number = number;\n}\n\nvar phoneProto = {\n  number: function() {\n    return this._number;\n  }\n};\n\nPhone.prototype = phoneProto;\n\n"
      },
      {
        "_type": "para",
        "title": "Using the same function as both getter and setter",
        "text": "Using the same function as both getter and setter\nFor properties which are read-write, the above getter functions can be replaced by a corresponding getter/setter, as follows:\nname: function(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  this._name = val;    // If there is a value argument, treat as a setter\n},\n\nNote that when JsRender renders a template using a get/set property {{:name()}} it will always call the function as a getter, not as a setter. However the setter feature lets you modify the value of name() from code, using:\nsomePerson.name(\"newName\"); // setter\n\nAlso, if you use the same View Model class with JsViews then the setter will be called:\n\nwhen the user modifies a value with two-way data-binding such as <input data-link=\"name()\" />\nwhen using $.observable(person).setProperty(\"name\", \"newName\") from code\n(See JsViews Data/View Model for details, and alternative setter patterns.)\n\n"
      },
      {
        "_type": "para",
        "title": "Adding methods and computed properties to the View Model ",
        "text": "Adding methods and computed properties to the View Model \nTypically a View Model does not only provide getter (or get/set) properties - but also other methods or computed properties corresponding to the appropriate logic at that point in the application. For example, a View Model for a Person might include a selectPhone(...) method or a fullName() computed property.\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: Using JsRender compiled View Models, with $.view.viewModels(...)</b>",
        "text": "Example: Using JsRender compiled View Models, with $.view.viewModels(...)\nThe built-in support in both JsRender and JsViews for compiled View Models makes it extremely easy to define View Model classes that include get/set properties using the pattern described above, along with any desired additional methods and computed properties. Simple calls to $.views.viewModels(...) allow you to compile View Model classes conforming to these patterns without having to manually write repetitive code for multiple such get/set properties.\nAnother advantage of the compiled View Model classes is when working with (or migrating to) JsViews. In that context the classes automatically become fully-fledged MVVM classes, with a rich range of features – where the Views are observable data-linked templates.\nFor details on $.views.viewModels see: Compiled View Models.\nTo illustrate, let’s convert our sample above to use compiled View Models. At the same time we will add a person.addPhone(...) custom method to the Person View Model class, and we’ll illustrate calling a setter – name(...):\n"
      },
      {
        "_type": "sample",
        "title": "Render template against a hierarchy of compiled View Model objects",
        "text": "Render template against a hierarchy of compiled View Model objects\nbutton {margin-bottom: 9px;}\n\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});\n\n... {{:name()}} ...\n\nCompile View Model classes\n\n...\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"], // get/set properties\n  extend: {addPhone: addPhone}            // Additional methods or properties\n});\n...\n\nInstantiate View Model hierarchy using constructors\n\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n\nRender template against person object (instance of Person)\n\n$(\"#result\").html(tmpl.render(person));\n\nCall setter, call method...\n\n...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the corresponding sample with JsViews and data-linking (and this version with two-way binding).\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios for compiled View Models, see:",
        "text": "For additional details and scenarios for compiled View Models, see:\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "helpersapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "$.views.helpers() is used to register helpers, accessed within templates using the syntax ~myhelper. See Using helpers for information about what helpers are, and some additional ways of providing them to templates.\nThis topic provides more details.\nWith $.views.helpers(...) you can:\n\nregister one or more helpers globally, to be used in any template\nadd one or more helpers as private resources for a parent template\n\n"
      },
      {
        "_type": "para",
        "title": "Registering one or more helpers",
        "text": "Registering one or more helpers\n"
      },
      {
        "_type": "api",
        "title": "$.views.helpers(...)",
        "text": "$.views.helpers(...)\nRegister a helper, for use in any template with the syntax:~name\n\n$.views.helpers(\"format\", myFormatFunction);\n\nRegister multiple helpers\n\n$.views.helpers({\n  format: myFormatFunction,\n  utilities: {},\n  mode: \"filtered\"\n});\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example using a ‘hierarchy’ of helpers…\n"
      },
      {
        "_type": "sample",
        "title": "Register multiple helpers, including objects, etc.",
        "text": "Register multiple helpers, including objects, etc.\n\n\n\n  {{:~format(title, true)}}\n\n  - availability:\n  {{if ~mode===\"filtered\"}}\n    <em>\n      {{:~utilities.subtractMax(sold) > 0\n          ? ~utilities.errorMessages.msg1\n          : \"immediate\"\n      }}\n    </em>\n  {{/if}}\n\nfunction myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\n$.views.helpers({\n  format: myFormatFunction,\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  mode: \"filtered\"\n});\n\nvar html = $(\"#myTemplate\").render({title: \"gizmo\", sold: 27});\n\n$(\"#result\").html(html);\nHere is an example using a ‘hierarchy’ of helpers…\n$.views.helpers({\n  ...\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  ...\n});\n\n{{:~utilities.subtractMax(sold) > 0\n    ? ~utilities.errorMessages.msg1\n    : \"immediate\"\n}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Adding helpers as private resources for a parent template",
        "text": "Adding helpers as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.helpers(...).\nIn that way the helper you are registering becomes a ‘private helper resource’ for the parentTemplate, rather than being registered globally:\n"
      },
      {
        "_type": "api",
        "title": "$.views.helpers(namedHelpers[, parentTemplate])",
        "text": "$.views.helpers(namedHelpers[, parentTemplate])\nAdd one or more helpers as private resources for a parent template\n\n$.views.helpers({\n  format: myFormatFunction,\n  ...\n}, parentTemplate);\n\n"
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
        "text": "Passing in helpers\nThere are three ways to provide helpers:\n\nGlobal helpers – registered using $.views.helpers(myHelpers)\nHelpers registered for a specific template – $.templates(\"mytmpl\", {markup: ..., helpers: myHelpers}\nHelpers passed in on a specific render call – tmpl.render(data, myHelpers)\n(Similarly you can pass helpers to JsViews link() calls)\n\n"
      },
      {
        "_type": "para",
        "title": "Contextual parameters",
        "text": "Contextual parameters\nIn addition to providing helpers as above, you can also define contextual parameters within a template, which you access using the same ~someName syntax as for regular helpers.\n"
      },
      {
        "_type": "sample",
        "title": "Global helper: $.views.helpers(...)",
        "text": "Global helper: $.views.helpers(...)\n\n\n\n  {{:~format(name, true)}}\n\nfunction myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar myHelpers = {format: myFormatFunction};\n\n$.views.helpers(myHelpers);\n\nvar html = $(\"#personTemplate\").render({name: \"Robert\"});\n\n$(\"#person\").html(html);\nvar myHelpers = {format: myFormatFunction};\n\n$.views.helpers(myHelpers);\n\n{{:~format(name, true)}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Helper resource for a specific template",
        "text": "Helper resource for a specific template\n\n\n\n  {{:~format(name)}}\n  {{:~format(name, true)}}\n\nfunction myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar myHelpers = {format: myFormatFunction};\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: myHelpers\n  }\n});\n\nvar html = $.render.mytmpl({name: \"Robert\"});\n\n$(\"#person\").html(html);\nvar myHelpers = {format: myFormatFunction};\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: myHelpers\n  }\n});\n\n{{:~format(name)}}\n{{:~format(name, true)}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Passing helpers with  a render() call",
        "text": "Passing helpers with  a render() call\n\n\n\n  {{:~format(name, true)}}\n  {{:~format(name)}}\n\nfunction myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar data = {name: \"Robert\"};\n\nvar myHelpers = {format: myFormatFunction};\n\nvar html = $(\"#personTemplate\").render(data, myHelpers); \n\n$(\"#person\").html(html);\nvar myHelpers = {format: myFormatFunction};\n\nvar html = $(\"#personTemplate\").render(data, myHelpers); \n\n{{:~format(name, true)}}\n{{:~format(name)}}\n\nSee template.render(...)\n\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "text": "For additional details and scenarios see:\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "usetags": {
    "sections": [
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "What is a custom tag?\nJsRender custom tags are named tags {{myTag ...}}, which you can register, and then use in your templates.\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a render function or a template, when you declare your custom tag.\nThe render function, or the template, can access both named parameters (props) and unnamed parameters (args), as in:\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n\nIn fact it can also access the current data item – or even the whole hierarchy of views and data…\nWhen you also use JsViews, custom tags acquire a whole new dimension. – They become tag controls, and you can build rich and complex single page apps cleanly and simply using custom tag controls – following an MVP or MVVM coding pattern.\n"
      },
      {
        "_type": "sample",
        "title": "1 - Simple custom tag using just a function",
        "text": "1 - Simple custom tag using just a function\n\n\n\n  This is the title:{{boldp title /}}\n\nfunction renderBoldP(value) {\n   return \"\" + value + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThe function is the render method for the tag\n\nDeclaring the custom tag\n\nfunction renderBoldP(value) {\n  return \"\" + value + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nUsing the tag\n\nThis is the title:{{boldp title /}}\n\n"
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
        "text": "2 - Rendering block content from a custom tag function\n\n\n\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n\nfunction renderBoldP(val) {\n   return \"\" + this.tagCtx.render(val) + \"\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nTo render the block content, we call this.tagCtx.render(val):\nfunction renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As well as calling the render() method of this.tagCtx, you can access this.tagCtx.args, this.tagCtx.props, this.tagCtx.view.data and more…\nThe tagCtx.args are the unnamed parameters. So in this example, there are two of them:\n{{someTag title name}}\n\nIn addition to being accessible as tagCtx.args, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):\nfunction someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}\n\nNow here is an example which has one unnamed parameter and two named parameters. You can access named parameters from tagCtx.props:\n{{range members start=2 end=4}}\n\nWe’ll use that in our third sample, to show accessing properties from the render function of the tag:\n"
      },
      {
        "_type": "sample",
        "title": "3 - Accessing tagCtx properties from the tag render function",
        "text": "3 - Accessing tagCtx properties from the tag render function\n\n\n\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags(\"range\", function(array) {\n  var ret = \"\",\n    start = this.tagCtx.props.start,\n    end = this.tagCtx.props.end;\n  for (var i = start; i <= end; i++) {\n    // Render tag content, for this data item\n    ret += this.tagCtx.render(array[i]);\n  }\n  return ret;\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThis sample defines a {{range}} tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters start and end, to determine the range of iteration. (See also the range sample, for a more advanced implementation of a similar custom tag.)\nYou call it like this:\n{{range members start=1 end=2}}\n ...\n{{/range}}\n\nAnd the render function code accesses context to get at those named and unnamed parameters… :\n$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ...\n  return ret;\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using a tag template instead of a render function",
        "text": "Using a tag template instead of a render function\nIf the tag definition includes a template, but no render method, then the template will be used to render the tag.\nLet’s re-implement all three examples above using custom tags which use templates instead of render functions.\n"
      },
      {
        "_type": "sample",
        "title": "1b - Simple custom tag using just a template",
        "text": "1b - Simple custom tag using just a template\n\n\n\n  {{boldp title /}}\n\n$.views.tags(\"boldp\", {\n  template: \"{{:~tag.tagCtx.args[0]}}\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nDeclaring the custom tag\n$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n\nAs you see, the template is accessing the unnamed parameter tagCtx.args[0].\nThe result is identical to the other implementation using a function. You call it just the same:\n{{boldp title /}}\n\n\n"
      },
      {
        "_type": "sample",
        "title": "2b - Rendering block content from a custom tag template",
        "text": "2b - Rendering block content from a custom tag template\n\n\n\n  {{boldp}}\n    This is the title:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n\n$.views.tags(\"boldp\", {\n  template: \"{{include tmpl=~tag.tagCtx.content/}}\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nTo render block content, we use {{include tmpl=~tag.tagCtx.content/}}\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n\nHere we are accessing the content property on the tagCtx, which provides a compiled template for the block content.\nIt is also made available as a content property on the view object – and can be accessed from within a template using #content – which is an example of a view path – equivalent to #view.content. You can try out that alternative syntax by choosing Try it and changing the template above to <p><b>{{include tmpl=#content/}}</b></p>.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let’s re-implement the third example using just a template.\nEven this example can be implemented as a custom tag which has no code at all. – Just a template, which is also able to access all the context that we were able to access from code in our render() function above.\nThis illustrates the power of declarative templates…\n"
      },
      {
        "_type": "sample",
        "title": " 3b - Accessing more context from the tag template",
        "text": " 3b - Accessing more context from the tag template\n\n\n\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags(\"range\", {\n  template: \n    \"{{for ~tag.tagCtx.args[0]}}\" +\n      \"{{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\" +\n        \"{{include tmpl=~tag.tagCtx.content/}}\" +\n      \"{{/if}}\" +\n    \"{{/for}}\"\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\nThe template accesses the same context as the function code above, to get at those named and unnamed parameters… :\n{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}\n\nThen after filtering for the items within the chosen range, using nested {{for}}{{if} tags, it renders the original block content for those items using {{include tmpl=~tag.tagCtx.content/}}.\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "Custom tags using both a render function and a template\nIf there is both a template and a render method, then the template will only be used if the render method returns undefined\nLet’s take our {{range}} example using a render function, but provide a template which will be used as “fallback” rendering for the tag in the case when there are no items to render in the chosen range:\n"
      },
      {
        "_type": "sample",
        "title": "A render() function and a template as \"fallback\"",
        "text": "A render() function and a template as \"fallback\"\n\n\n\n  <h3>Members 2 to 4</h3>\n  <ul>\n    {{range members start=1 end=3}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n  <h3>Members 5 to 8</h3>\n  <ul>\n    {{range members start=4 end=7}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n$.views.tags({\n  range: {\n    render: function(array) {\n      var ret = \"\",\n        start = this.tagCtx.props.start,\n        end = this.tagCtx.props.end;\n      for (var i = start; i <= end; i++) {\n        if (array[i]) {\n          // Render tag block content, for this data item\n          ret += this.tagCtx.content.render(array[i]);\n        }\n      }\n      return ret || undefined;\n    },\n    template: \"Nothing to render\"\n  }\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\n\nFirst we will change the original code to test whether the item exists in the array, before rendering the block content.\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call this.tagCtx.content.render(array[i]), rather than this.tagCtx.render(array[i]).\nThat’s because this.tagCtx.render(...) will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a tmpl property on the tag) – in which case it will render that template and not the block content…\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\nreturn ret || undefined;\n\nAnd here is the “fallback” template:\ntemplate: \"<li>Nothing to render</li>\"\n\n\n"
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
  "convertersapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See Using converters for an overview of what converters are, and some examples.\nThis topic provided more details.\n"
      },
      {
        "_type": "para",
        "title": "Using custom or built-in converters",
        "text": "Using custom or built-in converters\nIn JsRender, a converter is a convenient way of processing or formatting a data-value, or the result of expression evaluation.\nYou use built-in converters to HTML-encode, attribute-encode, or URL-encode:\n{{html:movie.description}} - This data is HTML encoded\n{{>movie.description}} - (Alternative syntax) - This data is HTML encoded\n\n{{url:~getTheFilePath()}} - This expression will be URL-encoded\n\nAnd you can register custom converters. For example you might register a date formatter or an upper-case converter:\n{{daymonth:invoice.date}} - This date uses my 'daymonth' formatter \n{{upper:name}} - This uses my 'upper' converter \n\n(See: sample.)\nYou can also use converters with any JsRender tag, not just the {{: ...}} tag, using the following syntax:\n{{someTag convert='myconverter' ...}}\n\n(See: sample.)\nNote: With JsViews, you can use converters with two-way data-binding, and you will have a convert and a convertBack converter – one for each direction.\n"
      },
      {
        "_type": "para",
        "title": "Registering converters",
        "text": "Registering converters\n$.views.converters() is used to register converters.\nWith $.views.converters(...) you can:\n\nregister one or more converters globally, to be used in any template\nadd one or more converters as private resources for a parent template\n\n"
      },
      {
        "_type": "para",
        "title": "Registering one or more converters",
        "text": "Registering one or more converters\nA simple sample of registering a converter is shown here.\n"
      },
      {
        "_type": "api",
        "title": "$.views.converters(...)",
        "text": "$.views.converters(...)\nRegister a converter\n\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\n{{upper: \"upper case: \" + nickname}}\n\nRegister multiple converters\n\n$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Adding converters as private resources for a parent template",
        "text": "Adding converters as private resources for a parent template\nYou can pass in an existing template as an additional parentTemplate parameter, on  any call to  $.views.converters(...).\nIn that way the converter you are registering becomes a ‘private converter resource’ for the parentTemplate, rather than being registered globally:\n"
      },
      {
        "_type": "api",
        "title": "$.views.converters(...) &mdash; adding to parent template",
        "text": "$.views.converters(...) — adding to parent template\nRegister a converter as private resources for a parent template\n\n$.views.converters(\n  \"upper\",\n  function(val) { ... },\n  parentTemplate\n);\n\nAdd one or more converters as private resources for a parent template\n\n$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n}, parentTemplate);\n\n"
      },
      {
        "_type": "para",
        "title": "Converter functions",
        "text": "Converter functions\nIn most cases a converter function will return a computed value based on the input parameter val:\nfunction myConverter(val) {\n  ... \n  return computedVal; // converted/encoded/formatted value for 'val'\n}\n\nwhere val comes from the data value or expression passed to the tag {{myconverter: someExpression}}.\n(See: sample.)\n"
      },
      {
        "_type": "para",
        "title": "Converter function signature",
        "text": "Converter function signature\nHowever a converter can access multiple tag arguments, to produce the computed value which it provides to the tag. Furthermore, the this pointer within the converter function is the instance of the tag, which allows it to access much more, including named tag parameters (this.tagCtx.props...), the full data object (this.tagCtx.view.data), and more…\nfunction myConverter(arg1, arg2, arg3 ...) {\n  var tag = this;\n  var namedTagParameters = tag.tagCtx.props; \n  ...\n  return computedArg1; // converted value for 'arg1' passed to tag\n}\n\n(See fullname sample.)\nHere is the converterFn API definition:\n"
      },
      {
        "_type": "api",
        "title": "function converterFn(val, ...) {...}",
        "text": "function converterFn(val, ...) {...}\nA converter function registered using $.views.converters(...)\nConverter function:parameters: one or more tag argumentsthis pointer: the tag instancecomputes return value: which is passed to tag as first argument\n\nfunction myConverterFn(val1, val2, ...) {\n  var tag = this;\n  var tagProperties = tag.tagCtx.props;\n  ...\n  return ...;\n}\n\n$.views.converters(\"myconverter\", myConverterFn);\n\n"
      },
      {
        "_type": "para",
        "title": "Using converters with other tags",
        "text": "Using converters with other tags\nA converter can be used on any tag, thanks to the syntax\n{{someTag ... convert=...}}\n\nwhere someTag can be any custom tag, or a built-in tag such as {{if}} or {{for}}.\nSee the sample using {{for people convert='odd'}} to render only odd (or even) items in an array.\n(Note: This syntax can actually be used with the {{: ...}} tag too – by writing {{:name convert='upper'}}…)\n"
      },
      {
        "_type": "para",
        "title": "Example: a converter for {{if}}",
        "text": "Example: a converter for {{if}}\nHere is an advanced sample: an \"inlist\" converter for {{if}}.\n\nIt accepts an item argument and a list argument, and an optional field named property\nIt returns true if the item is found in the list\nIf there is a field specified, it takes the value of that field (property) on the item and searches for it in the list\n\nNote that the converter gets called once for the first {{if}} tag block and once for each subsequent {{else}} block.\n"
      },
      {
        "_type": "sample",
        "title": "'inlist' converter for {{if}} tag",
        "text": "'inlist' converter for {{if}} tag\n\n\n\n  <ul>\n    {{for people}}\n      <li>\n        <b>{{:name}}:</b>\n        {{if #data ~root.team convert='inlist'}}\n          Team member\n        {{else #data ~root.reserve field=\"name\"}}\n          Reserve\n        {{else}}\n          Not in team\n        {{/if}}\n      </li>\n    {{/for}}\n  </ul>\n\nvar teamTmpl = $.templates(\"#teamTmpl\");\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}\n  if (!list) {\n    return true; // Final else, so return true\n  }\n\n  var field = this.tagCtx.props.field;\n  var l = list.length;\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  if (field) {\n    while (l--) {\n      if (item[field] === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n\n  // If no field property, look for the item among the list items\n  else {\n    while (l--) {\n      if (item === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n\n// Define model \nvar model= {people: [\n    {name: \"Jo\"},\n    {name: \"Liza\"},\n    {name: \"Eli\"},\n    {name: \"Pete\"},\n    {name: \"Zoey\"}\n  ],\n  // Specify list of reserves, by name\n  reserve: [\"Eli\", \"Liza\"]\n};\n\n// Specify array of team members\nmodel.team = [model.people[0], model.people[3]];\n\n$(\"#result\").html(teamTmpl.render(model));\n\n  ...\n  {{for people}}\n  ...\n  {{if #data ~root.team convert='inlist'}}\n  ...\n  {{else #data ~root.reserve field=\"name\"}}\n  ...\n  {{else}}\n  ...\n  {{/for}}\n  ...\n  </ul>\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}.\n  ... // Return true\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  ... // Return true if found\n\n  // If no field property, look for the item among the list items\n  ... // Return true if found\n\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using helper functions, or dynamically assigning converters",
        "text": "Using helper functions, or dynamically assigning converters\nThe convert=... syntax allows you to assign a converter function without it being registered by name. For example it can be a data method or a helper function – such as {{someTag ... convert=~myConverterHelper}}.\n(You can do this with the {{: ...}} tag too – by writing {{: ... convert=~myConverterHelper}}…)\nYou can even assign a converter dynamically. For example you can write: {{someTag ... convert=~getConverter(...)}}, where the getConverter() helper might return either a string (for a converter registered by name) or a function to be used as converter.\nTo illustrate, here is a modified version of the previous sample, using {{if ... convert=~getConverter()}}:\n"
      },
      {
        "_type": "sample",
        "title": "Dynamically assigning a converter",
        "text": "Dynamically assigning a converter\n\n\n\n  <ul>\n    {{for people}}\n      <li>\n        <b>{{:name}}:</b>\n        {{if #data ~root.team convert=~getConverter()}}\n          Team member\n        {{else #data ~root.reserve field=\"name\"}}\n          Reserve\n        {{else}}\n          Not in team\n        {{/if}}\n      </li>\n    {{/for}}\n  </ul>\n\nvar teamTmpl = $.templates(\"#teamTmpl\");\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}\n  if (!list) {\n    return true; // Final else, so return true\n  }\n\n  var field = this.tagCtx.props.field;\n  var l = list.length;\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  if (field) {\n    while (l--) {\n      if (item[field] === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n\n  // If no field property, look for the item among the list items\n  else {\n    while (l--) {\n      if (item === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n  return false; // Not found\n}\n\n// Helper to dynamically assign converters\nfunction getConverter() {\n  return inlistConverter; // For this sample just return `inlistConverter` every time\n}\n\n// Register 'getConverter' helper just for the 'teamTmpl' template \n$.views.helpers(\"getConverter\", getConverter, teamTmpl);\n\n// Define model \nvar model= {people: [\n    {name: \"Jo\"},\n    {name: \"Liza\"},\n    {name: \"Eli\"},\n    {name: \"Pete\"},\n    {name: \"Zoey\"}\n  ],\n  // Specify list of reserves, by name\n  reserve: [\"Eli\", \"Liza\"]\n};\n\n// Specify array of team members\nmodel.team = [model.people[0], model.people[3]];\n\n$(\"#result\").html(teamTmpl.render(model));\n\n// Converter function\nfunction inlistConverter(item, list) { ... }\n\n// Helper to dynamically assign converters\nfunction getConverter() {\n  return inlistConverter; // For this sample just return `inlistConverter` every time\n}\n\n// Register 'getConverter' helper just for the 'teamTmpl' template \n$.views.helpers(\"getConverter\", getConverter, teamTmpl);\n\n{{if #data ~root.team convert=~getConverter()}}\n  ...\n{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Built-in converters:",
        "text": "Built-in converters:\nJsRender has the following built-in converters/encoders:\n\nBuilt-in HTML encoder: {{html: ...}} – accessed programmatically as $.views.converters.html()\nBuilt-in attribute encoder: {{attr: ...}} – accessed programmatically as $.views.converters.attr()\nBuilt-in URL encoder: {{url: ...}} – accessed programmatically as $.views.converters.url()\n\n"
      },
      {
        "_type": "para",
        "title": "Built-in HTML encoder",
        "text": "Built-in HTML encoder\nJsRender includes an HTML encoder, which you can use programmatically as follows:\nvar myHtmlEncodedString = $.views.converters.html(myString);\n\nThe same encoder is accessed declaratively as a converter, as in the following two examples:\n{{html:myExpression}}\n\n{{>myExpression}}\n\nIn fact {{>...}} is exactly equivalent to {{html:...}} and is provided as a simpler syntax for HTML encoding values taken from data or from expressions and rendered within HTML content.\n(Note: the {{> ...}} tag should be used in place of the {{: ...}} tag whenever the data being rendered is not full trusted - in order to prevent HTML injection attacks.)\n"
      },
      {
        "_type": "sample",
        "title": "Calling the HTML encoder",
        "text": "Calling the HTML encoder\nShow result\n\n\nvar value = \"< > ' \\\" &\";\nvar result = $.views.converters.html(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});\n\nvar value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.html(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "HTML encoder",
        "text": "HTML encoder\nReturns the HTML-encoded string\n\nvar encoder = $.views.converters.html;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "para",
        "title": "Built-in attribute encoder",
        "text": "Built-in attribute encoder\nJsRender includes an encoder intended for use when attribute encoding is needed. You can use it programmatically as follows:\nvar myAttributeEncodedString = $.views.converters.attr(myString);\n\nThe same encoder is accessed by declaratively as a converter:\n{{attr:myExpression}}\n\nA typical use case would be to encode an HTML attribute value in a template:\n<div title=\"{{attr:description}}\">...</div>\n\n"
      },
      {
        "_type": "sample",
        "title": "Calling the 'attribute' encoder",
        "text": "Calling the 'attribute' encoder\nShow result\n\n\nvar value = \"< > ' \\\" & =\";\nvar result = $.views.converters.attr(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});\n\nvar value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.attr(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "Attribute encoder",
        "text": "Attribute encoder\nReturns the attribute-encoded string\n\nvar encoder = $.views.converters.attr;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "para",
        "title": "Built-in URL encoder",
        "text": "Built-in URL encoder\nJsRender includes a URL encoder, which you can use programmatically as follows:\nvar myUrlEncodedString = $.views.converters.url(myString);\n\nThe same encoder is accessed by declaratively as a converter:\n{{url:myExpression}}\n\nA typical use case would be to encode a HTML URL attribute value in a template:\n<img src=\"{{url:imageurl}}\"/>\n\n"
      },
      {
        "_type": "sample",
        "title": "Calling the 'url' encoder",
        "text": "Calling the 'url' encoder\nShow result\n\nvar value = \"<_>_\\\"_ \";\nvar result = $.views.converters.url(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});\n\nvar value = \"<_>_\\\"_ \";\n\nvar result = $.views.converters.url(value);\n\nalert(result);\n\n"
      },
      {
        "_type": "api",
        "title": "URL encoder",
        "text": "URL encoder\nReturns the URL-encoded string\n\nvar encoder = $.views.converters.url;\nvar encodedString = encoder(myString);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "converters": {
    "sections": [
      {
        "_type": "para",
        "title": "What are converters?",
        "text": "What are converters?\nIn JsRender, a converter is a convenient way of processing or formatting data-value, or the result of expression evaluation.\nYou use built-in converters to HTML-encode, attribute-encode, or URL-encode:\n{{html:movie.description}} - This data is HTML encoded\n{{>movie.description}} - (Alternative syntax) - This data is HTML encoded\n\n{{url:~getTheFilePath()}} - This expression will be URL-encoded\n\nAnd you can register custom converters. For example you might register a date formatter or an upper-case converter:\n{{daymonth:invoice.date}} - This date uses my 'daymonth' formatter \n{{upper:name}} - This uses my 'upper' converter \n\n"
      },
      {
        "_type": "para",
        "title": "Built-in converters",
        "text": "Built-in converters\nJsRender has the following built-in converters – based on encoders:\n\nBuilt-in HTML encoder: {{> ...}}\nBuilt-in attribute encoder: {{attr ...}}\nBuilt-in URL encoder: {{url ...}}\n\n"
      },
      {
        "_type": "para",
        "title": "Registering a converter",
        "text": "Registering a converter\nYou can register your own custom converters, using $.views.converters() as in:\n$.views.converters(\"upper\", function(val) {\n  // Convert data-value or expression to upper case\n  return val.toUpperCase();\n});\n\nTo use the \"upper\" converter with the {{:...}} tag, you write:\n{{upper:...}}\n\nHere it is in a sample:\n"
      },
      {
        "_type": "sample",
        "title": "A simple converter",
        "text": "A simple converter\n\n\n\n  Name: {{:name}}. Upper case nickname: {{upper:nickname}}\n  <br/><br/>\n  {{upper: \"This will be upper case too\"}} \n\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\nvar person = {name: \"Robert\", nickname: \"Bob\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\nName: {{:name}}. Upper case nickname: {{upper:nickname}}\n...\n{{upper: \"This will be upper case too\"}} \n\n\n"
      },
      {
        "_type": "para",
        "title": "Converter arguments",
        "text": "Converter arguments\nA converter can access any number of tag arguments, to produce the computed value which it provides to the tag:\n$.views.converters(\"myConverter\", function(arg1, arg2, arg3 ...) {\n\nFurthermore, the this pointer within the converter function is the instance of the tag, which allows it to access much more, including named tag parameters (this.tagCtx.props...), the full data object (this.tagCtx.view.data), and more…\nThe following sample shows a \"fullname\" converter, which provides a computed full name based on the first two tag arguments (first and last) and an optional named tag parameter reverse=true:\n"
      },
      {
        "_type": "sample",
        "title": "Full name converter &ndash;  accessing multiple arguments",
        "text": "Full name converter –  accessing multiple arguments\n\n\n\n  <p><label>Normal:</label> {{fullname:first last}}</p>\n  <p><label>Reverse:</label> {{fullname:first last reverse=true}}</p> \n\n$.views.converters(\"fullname\", function(first, last) {\n  var reverse = this.tagCtx.props.reverse;  \n  if (reverse) {\n    return last.toUpperCase() + \" \" + first;\n  }\n  return first + \" \" + last;\n});\n\nvar person = {first: \"Xavier\", last: \"Prieto\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);\n$.views.converters(\"fullname\", function(first, last) {\n  var reverse = this.tagCtx.props.reverse;  \n  if (reverse) {\n    return last.toUpperCase() + \" \" + first;\n  }\n  return first + \" \" + last;\n});\n\n... {{fullname:first last}}\n... {{fullname:first last reverse=true}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using converters with other tags",
        "text": "Using converters with other tags\nA converter can be used on any tag, thanks to the syntax\n{{someTag ... convert=...}}\n\nwhere someTag can be any custom tag, or a built-in tag such as {{if}}.\nFor example, you could register an \"inList\" converter which returns true if item is found in itemList:\n{{if convert='inList' item itemList}}...{{/if}}\n\nThe following sample shows named converters used with the {{for ...}} tag – to iterate over an array and show only even or odd items:\n"
      },
      {
        "_type": "sample",
        "title": "Using converters with the {{for}} tag",
        "text": "Using converters with the {{for}} tag\n\n\n\n  <table><tbody><tr>\n    <td><ul>{{for people convert='odd'}}<li>{{:name}}</li>{{/for}}</ul></td>\n    <td><ul>{{for people convert='even'}}<li>{{:name}}</li>{{/for}}</ul></td>\n  </tr></tbody></table>\n\n$.views.converters({\n  odd: function(arr) {\n    // return only the odd items in the array\n    return arr.filter(function(elem, index) {\n      return (index + 1)%2;\n    });\n  },\n  even: function(arr) {\n    // return only the even items in the array\n    return arr.filter(function(elem, index) {\n      return index%2;\n    });\n  }\n});\n\nvar model= {people: [\n  {name: \"Jo1\"},\n  {name: \"Jo2\"},\n  {name: \"Jo3\"},\n  {name: \"Jo4\"},\n  {name: \"Jo5\"},\n  {name: \"Jo6\"}\n]};\n\nvar html = $(\"#myTmpl\").render(model);\n\n$(\"#result\").html(html);\n$.views.converters({\n  odd: function(arr) {\n    // return only the odd items in the array\n    return arr.filter(function(elem, index) {\n      return (index + 1)%2;\n    });\n  },\n  even: function(arr) {\n    // return only the even items in the array\n    return arr.filter(function(elem, index) {\n      return index%2;\n    });\n  }\n});\n\n...\n{{for people convert='odd'}}\n...\n{{for people convert='even'}}\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using helper functions or data methods as converters",
        "text": "Using helper functions or data methods as converters\nThe convert=... syntax not only works on any tag, but also allows you to use not only registered converters, by name, as in\n{{for people convert='odd'}}\n\nbut alternatively to use helpers, or data methods as in\n{{for people convert=filter.odd}} // Using data method\n\nYou can also use that approach on {{:..}} tags as in\n{{:name convert=~hlp.bold}} // Using helper\n\nNote that the one tag which does not support this syntax is {{>...}} - for which you would need instead to write:\n{{>~hlp.bold(name)}} // Using helper \n\nHere is a modified version of the sample above, using helpers and data methods:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  <table><tbody><tr>\n    <td><ul>\n      {{for people convert=filter.odd}}  {{!-- using data method --}}\n        <li>\n          {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n        </li>\n      {{/for}}\n    </ul></td>\n    <td><ul>\n      {{for people convert=filter.even}} {{!-- using data method --}}\n        <li>\n          {{:name convert=~hlp.italic}}  {{!-- using helper --}}\n        </li>\n      {{/for}}\n    </ul></td>\n  </tr></tbody></table>\n\nvar helpers = {\n  hlp: {\n    bold: function(val) {\n      return \"\" + val + \"\";\n    },\n    italic: function(val) {\n      return \"\" + val + \"\";\n    }\n  }\n};\n\nvar model= {people: [\n    {name: \"Jo1\"},\n    {name: \"Jo2\"},\n    {name: \"Jo3\"},\n    {name: \"Jo4\"}\n  ],\n  filter: {\n    odd: function(arr) {\n      // return only the odd items in the array\n      return arr.filter(function(elem, index) {\n        return (index + 1)%2;\n      });\n    },\n    even: function(arr) {\n      // return only the even items in the array\n      return arr.filter(function(elem, index) {\n        return index%2;\n      });\n    }\n  }\n};\n\nvar html = $(\"#myTmpl\").render(model, helpers);\n\n$(\"#result\").html(html);\n...\n{{for people convert=filter.odd}}  {{!-- using data method --}}\n  <li>\n    {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n...\n\n\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "text": "For additional details and scenarios see:\n"
      },
      {
        "_type": "para",
        "title": "See also the following samples:",
        "text": "See also the following samples:\nConverters and encoding\nTwo-way binding and converters\n"
      }
    ]
  },
  "nojqueryapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender can be loaded in the browser with or without jQuery, as in these example pages:\n\nJsRender with jQuery\nJsRender without jQuery\n\nWhen jQuery is present:\n\nJsRender loads as a jQuery plugin and adds APIs to the jQuery global namespace object – usually aliased as var $ = jQuery;\nThe JsRender APIs are\n\n$.views...\n$.templates(...)\n$.render....\n\n\nIf jQuery is not present:\n\nJsRender automatically creates its own jsrender global namespace variable\nJsRender APIs are the same as above, but they are now associated with the jsrender namespace variable:\n\njsrender.views...\njsrender.templates(...)\njsrender.render....\n\n\nFor convenience you can follow the jQuery approach of creating a global $ – set this time to var $ = jsrender;\nYou can then use the regular APIs: $.views..., $.templates..., $.render..., or copy code from the regular browser examples/samples – as if using JsRender with jQuery.\nFor example:\nvar $ = jsrender; // Alias for the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n\nNote: The same approach can be used when using JsRender on the server with Node.js, where JsRender is also being used without jQuery.\n"
      }
    ]
  },
  "node/webpack": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Webpack support for JsRender and JsViews\nJsRender and JsViews can be loaded using webpack.\n"
      },
      {
        "_type": "para",
        "title": "JsRender as a webpack module",
        "text": "JsRender as a webpack module\nAfter installing JsRender on the server (using $ npm install jsrender) it can then be included in the webpack client-script bundle, and loaded in the browser.\nIf using JsRender without jQuery, or with jQuery loaded globally (as a script tag) this is done by calling:\nvar $ = require('jsrender'); // Without jQuery, or if jQuery is loaded globally\n\n(Here, if jQuery is loaded then $ is the global jQuery namespace object. Otherwise it is the JsRender global namespace object. Either way, you can now make calls like var myTmpl = $.templates(...);)\nAlternatively, if jQuery is being loaded also as a webpack module rather than globally, you need to use a different syntax – to tell JsRender to attach as a plugin to the local copy of jQuery:\nvar $ = require('jquery');\nrequire('jsrender')($);      // Passing local jQuery instance as parameter\n\n"
      },
      {
        "_type": "para",
        "title": "Example",
        "text": "Example\nindex.html:\n<html><head>\n  <script src=\".../jquery...js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n\nsource.js:\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n\ncommand line:\nwebpack ./source.js bundle.js\n\n"
      },
      {
        "_type": "para",
        "title": "JsViews as a webpack module",
        "text": "JsViews as a webpack module\nJsViews can also be included in the webpack client-script bundle, and loaded in the browser.\nAfter installing on the server (using $ npm install jsviews), call:\nrequire('jsviews');    // Load JsViews (if jQuery is loaded globally)\n\nor – if also loading jQuery as a webpack module, use:\nvar $ = require('jquery');\n...\nrequire('jsviews')($); // Load JsViews (passing local jQuery instance as parameter)\n\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\nBrowserify support\n"
      }
    ]
  },
  "viewmodelsapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic provides details on using $.views.viewModels() to register/compile View Models.\nThis is the third of the alternative approaches discussed in Data / View Models – namely:\n\nusing plain objects\nusing ‘hand-coded’ View Models\nusing $.views.viewModels() to compile and register View Models with specific get/set properties and methods.\n\n"
      },
      {
        "_type": "para",
        "title": "Advantages of compiled View Models",
        "text": "Advantages of compiled View Models\nUsing $.views.viewModels() to compile View Models brings some important advantages over plain object hierarchies or ‘hand-coded’ View Models:\n\nSimple calls to $.views.viewModels(...) allow you to compile these View Model classes without having to manually write repetitive code for multiple such get/set properties\nUsing compiled View Models rather than plain objects makes it easier to have clean well-designed modular code, since each View Model has specific getters, setters and methods, and can have its own ‘private’ properties and state\nThe compiled View Models provide a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of View Model instances, or for converting back to plain data (such as for submitting to the server)\nThey also provide a merge(...) feature for incrementally updating the View Model hierarchy, using updated plain data from the server\nWhen working with (or migrating to) JsViews the compiled classes automatically become fully-fledged MVVM classes, with a rich range of features – where the Views are observable data-linked templates. Updates to the View Model hierarchy, and calls to the View Model setters both trigger observable changes, with corresponding incremental updates to the Views. (For more information see JsViews: Data / View Model and JsViews: Compiled View Models.)\n\n"
      },
      {
        "_type": "para",
        "title": "Using compiled View Models",
        "text": "Using compiled View Models\nThe basic use scenarios of compiled View Models are as follows:\n\nUsing $.views.viewModels(...) to register/compile View Models (myVM)\nUsing a compiled View Model myVM as constructor/factory method – MyVM(...) – to create View Model instances (myVmInstance)\nUsing MyVM.map(...) to convert a plain object hierarchy (such as from a JSON request) to a hierarchy of View Model instances\nUsing myVMInstance.merge(...) to incrementally update a View Model hierarchy, using updated plain data\nUsing myVMInstance.unmap() to convert a View Model hierarchy back to a plain object hierarchy\n\n"
      },
      {
        "_type": "para",
        "title": "<b>API: $.views.viewModels(...)</b>",
        "text": "API: $.views.viewModels(...)\nTo register a View Model, you call the $.views.viewModels(...) API – with four alternative signatures:\n\nvar MyVM = $.views.viewModels(viewModelOptions);returning a compiled View Model\n$.views.viewModels(\"MyVM\", viewModelOptions);registering a named View Model, accessible as $.views.viewModels.MyVM\n$.views.viewModels(namedViewModels);where namedViewModels is a hash, declaring multiple View Models\n$.views.viewModels(namedViewModels, myViewModels);where namedViewModels is a hash, declaring multiple View Models and myViewModels is a View Models collection (hash) which will provide access to the compiled View Models, as myViewModels.MyVM\n\nIn each case, the compiled View Model is specified by a viewModelOptions object, with a getters: gettersArray (specifying an array of get/set properties), and/or an extend: extendObject (specifying additional methods or properties).\nExample:\nvar Book = $.views.viewModels({   // Compile a Book View Model\n  getters: [\"title\", \"price\"],    // getters array - signature of constructor\n  extend: {                       // extend object - additional methods \n    placeOrder: function() { ... }\n  }\n});\n\nvar book1 = Book(\"Hope\", \"1.50\"); // Construct a Book View Model instance\nbook.price(\"2.50\");               // Modify price\nbook.placeOrder();                // Call method\n\n"
      },
      {
        "_type": "api",
        "title": "$.views.viewModels(...)",
        "text": "$.views.viewModels(...)\nRegister one or more View Models\nReturn a compiled View Model (constructor/factory method) with specific get/set properties and methods\n\nvar Book = $.views.viewModels({\n  getters: [\"title\", \"price\"]\n});\n\nvar bk1 = Book(\"Hope\", \"$1.50\");\n\nRegister (and return) a named View Model\n\n$.views.viewModels(\"Book\", {\n  getters: [\"title\", \"price\"]\n});\n\nvar bk1 = $.views.viewModels.Book(\"Hope\", \"$1.50\");\n\n\nRegister multiple named View Models\n\n$.views.viewModels({\n  Book: {getters: [\"title\", \"price\"]},\n  ...\n});\n\nvar bk1 = $.views.viewModels.Book(\"Hope\", \"$1.50\");\n\n\nAdd one or more named View Models to a View Model collection (hash)\n\nvar myVms = {};\n\n$.views.viewModels({\n  Book: {getters: [\"title\", \"price\"]},\n  ...\n}, myVms);\n\nvar bk1 = myVms.Book(\"Hope\", \"$1.50\");\n\n\n"
      },
      {
        "_type": "para",
        "title": "Creating View Model instances, using the View Model constructor",
        "text": "Creating View Model instances, using the View Model constructor\nView Models compiled/registered/returned by $.view.viewModels(...) are in fact constructors for instances of the View Model class.\nvar Book = $.views.viewModels({    // Constructor\n  getters: [\"title\", \"price\"]      // getters array - signature of constructor\n  ...\n});\n\nvar book1 = Book(\"Hope\", \"$1.50\"); // Create Book instance\n\nNote that:\n\nThe new keyword is not necessary when calling the constructor. (It is in effect a factory method, that calls new internally.)\nThe signature of the constructor call (parameters used to initialize the instance) corresponds to the array of getters specified in the viewModelOptions - in this case [\"title\", \"price\"]\n\n"
      },
      {
        "_type": "para",
        "title": "View Model hierarchies",
        "text": "View Model hierarchies\nThe Book View Model example above has simple get/set properties [\"title\", \"price\"] which are simple primitive types (string in this case).\nBut consider the Person View Model, used in the overview topic Data / View Model. Here a person object (whether a plain object or a View Model instance) is in fact a hierarchy of objects, since the address and phones properties of a Person are themselves objects (an Address object and a Phone array)\nHere is a person plain object/hierarchy (obtained perhaps by ‘evaluating’ JSON data from the server):\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\nTo map this object hierarchy to the corresponding View Model hierarchy we need to define three View Models:\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\nWe can then instanciate the corresponding View Model hierarchy, using constructors:\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\nSee the sample in the Data / View Model topic.\n"
      },
      {
        "_type": "para",
        "title": "<b>Creating View Model instances by mapping from data</b>",
        "text": "Creating View Model instances by mapping from data\nThe process of manually writing code to map from JSON data to a corresponding View Model hierarchy, as above, can be complex and inconvenient. It requires traversing the data hierarchy and using appropriate View Model constructors to instantiate corresponding View Model instances.\nFortunately JsRender/JsViews compiled View Models provide a map(data) feature which when used together with View Model typed hierarchies makes this process quite trivial.\n"
      },
      {
        "_type": "para",
        "title": "API: MyViewModel.map(...)",
        "text": "API: MyViewModel.map(...)\nAny compiled View Model, MyViewModel, provides a MyViewModel.map(...) method, which can be used to convert a plain object or an array of plain objects (or the equivalent JSON string) to the corresponding View Model instance (or array of View Model instances).\n"
      },
      {
        "_type": "api",
        "title": "MyViewModel.map(...)",
        "text": "MyViewModel.map(...)\nGenerate  a View Model hierarchy from data\nGenerate a View Model instance/hierarchy/array by mapping from data (a plain object instance/hierarchy/array, or JSON string)\n\n// View Model\nvar Person = $.views.viewModels.Person;\n\n// View Model instance\nvar person = Person.map(personData);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Example:\nvar Book = $.views.viewModels({ // Constructor\n  getters: [\"title\", \"price\"]\n});\n\nMap from bookData plain object to book View Model instance:\nvar bookData1 = {title: \"Hope\", price: \"$1.50\"}; // book (plain object)\nvar book1 = Book.map(bookData1);                 // book (instance of Book View Model)\n\nMap from bookDataArray array of plain objects to bookArray array of View Model instances:\nvar bookDataArray1 = [                           // book array (plain objects)\n  {title: \"Hope\", price: \"$1.50\"},\n  {title: \"Courage\", price: \"$2.50\"}\n];\nvar booksArray1 = Book.map(bookDataArray1);      // book array (instances of Book View Model)\n\n"
      },
      {
        "_type": "para",
        "title": "View Model  typed hierarchies",
        "text": "View Model  typed hierarchies\nWhen specifying getters in the $.views.viewModels(...) call, you can declare the type of a get/set property. For example an address get/set property can be specified as being of type Address – where Address is another View Model declared on the same collection.\nBy specifying View Model types for properties (and declaring those View Models in the same collection) you obtain a ‘View Model typed hierarchy’.\n"
      },
      {
        "_type": "para",
        "title": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy",
        "text": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy\nIn the case of a ‘View Model typed hierarchy’, simply pass the top-level plain object to the map() method for the top-level View Model class, and all View Model instances in the hierarchy will be correctly instantiated:\nCompile View Model classes (typed hierarchy):\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as being a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as being an Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as being (an array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n\nPerson data (plain object hierarchy, or JSON string):\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n\nUse map() to convert from personData plain object hierarchy (or JSON string) to person View Model hierarchy:\nvar person = $.views.viewModels.Person.map(personData);\n\nThe getter properties then let you traverse the hierarchy, call methods, etc.\nperson.name(\"newName\");                   // Use setter: change name\nperson.addPhone(...);                     // Call method: add phone\nvar phone2 = person.phones()[1].number(); // Traverse and use getter: get number\n\nLet’s modify the sample in Data / View Model to use the map(...) approach:\n"
      },
      {
        "_type": "sample",
        "title": "Using map() to convert from a plain object hierarchy to a View Model hierarchy",
        "text": "Using map() to convert from a plain object hierarchy to a View Model hierarchy\nbutton {margin-bottom: 9px;}\n\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(vmCollection.Phone(phoneNo));\n}\n\n// person plain object hierarchy:\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Instantiate View Model hierarchy using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});\n\n... {{:name()}} ...\n\nCompile View Model classes\n\n...\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: ...\n  Phone: ...\n});\n\n\nInstantiate View Model hierarchy using Person.map(data)\n\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\nvar person = vmCollection.Person.map(personData);\n\nRender template against person object (instance of Person)\n\n$(\"#result\").html(tmpl.render(person));\n\nCall setter, call method...\n\n...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the corresponding sample with JsViews and data-linking.)\n"
      },
      {
        "_type": "para",
        "title": "Along with the map() feature &ndash; merge() and unmap()",
        "text": "Along with the map() feature – merge() and unmap()\nWhen working with View Model typed hierarchies, there are two additional features that can be used together with the map() feature:\n\nIf later you obtain updated JSON data, personData2, you can use merge() (below) to trigger an incremental update to the View Model hierarchy:\nperson.merge(personData2);\n\nIf values are modified (using setters, or methods) you can at any time can use unmap() (below) to convert back to plain data, but with updated values:\nvar updatedPersonData = person.unmap();\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using myVMobjectOrArray.merge(...) to update a View Model hierarchy",
        "text": "Using myVMobjectOrArray.merge(...) to update a View Model hierarchy\nIf a View Model hierarchy (or array of View Model instances) was created using the map() feature above to map from data, then the View Model instances (and arrays) will each have a merge() method available:\nvar person = Person.map(personData1);\nperson.merge(personData2);             // Incrementally update person (hierarchy)\n\nor for an array:\nvar peopleArray = Person.map(peopleDataArray1);\npeopleArray.merge(peopleDataArray2);   // Incrementally update people array\n\nOr, deeper in the hierarchy:\nvar person = Person.map(personData1);\nperson.phones.merge(phonesDataArray2); // Update just the person.phones array\n\n"
      },
      {
        "_type": "para",
        "title": "Updating with merge() makes minimal incremental changes, and preserves state",
        "text": "Updating with merge() makes minimal incremental changes, and preserves state\nNote that the merge() update process does not replace the whole hierarchy of View Model instances, but works incrementally to add/remove/modify instances as appropriate. So if most of the data in personData2 is the same as personData1, calling merge(personData2) will make only minimal changes to the hierarchy.\nThis means that if View Model instances have state (such as additional properties that were set programmatically and are not driven by data) then that state can be maintained across the merge() update.\n"
      },
      {
        "_type": "api",
        "title": "myVMobjectOrArray.merge(...)",
        "text": "myVMobjectOrArray.merge(...)\nUpdate a View Model hierarchy, from modified data\nUpdate a previously generated View Model instance/hierarchy/array by mapping from updated data\n\nperson.merge(personData2);\n// person (View Model hierarchy) has now\n// been updated, with modified data...\n\n"
      },
      {
        "_type": "para",
        "title": "Using myVMobjectOrArray.unmap() to convert back to a plain object hierarchy",
        "text": "Using myVMobjectOrArray.unmap() to convert back to a plain object hierarchy\nIf a View Model hierarchy (or array of View Model instances) was created by mapping from data, using the map() feature above, then the View Model instances (and arrays) will each have an unmap() method (in addition to the merge() method mentioned above):\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nperson.name(newName)\nvar modifiedPersonData = person.unmap();          // Convert back to a plain object hierarchy\n\nor for an array:\nvar peopleArray = Person.map(peopleDataArray1);\npeopleArray[1].address.street(newStreet)          // Make changes anywhere in the peopleArray\nvar modifiedPeopleDataArray = people.unmap();     // Convert back to a plain object array\n\nOr, deeper in the hierarchy:\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nvar modifiedPhonesArray = person.phones.unmap();  // Get a plain object array for person.phones\n\n"
      },
      {
        "_type": "api",
        "title": "myVMobjectOrArray.unmap()",
        "text": "myVMobjectOrArray.unmap()\nGet a plain object hierarchy from a View Model hierarchy\nObtain an updated plain object instance/hierarchy/array, from a previously generated View Model instance/hierarchy/array\n\n// Convert back to a plain object hierarchy\nvar modifiedPersonData = person.unmap();\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an updated version of our previous sample, where now we have added the use of merge() and unmap()\n"
      },
      {
        "_type": "sample",
        "title": "Using merge() to update View Models, and unmap() to return to plain objects",
        "text": "Using merge() to update View Models, and unmap() to return to plain objects\nbutton {margin-bottom: 9px;}\n\nUpdate\nRevert\nGet Data\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>{{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. new JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  // Update View Model hierarchy, using merge()\n  person.merge(personData2);\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#revert\").on(\"click\", function() {\n  // Revert View Model hierarchy, using merge()\n  person.merge(personData);\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#getData\").on(\"click\", function() {\n  // Get current data, using unmap()\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\nCompile View Model classes\n\n...\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: ...\n  Phone: ...\n});\n\n\nInstantiate View Model hierarchy, using map()\n\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\nvar person = vmCollection.Person.map(personData);\n\nUpdate View Model hierarchy, using merge()\n\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);               // Update person View Model hierarchy\n  $(\"#result\").html(tmpl.render(person));\n});\n\n\nGet current data, using unmap()\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();  // Get plain object hierarchy from current View Model hierarchy\n  window.alert(JSON.stringify(updatedPersonData));\n});\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the corresponding sample using JsViews and data-linking.)\n"
      },
      {
        "_type": "para",
        "title": "Overriding generated get/set functions",
        "text": "Overriding generated get/set functions\nTo override a generated get/set property provided by a compiled View Model you can provide an implementation in the extend hash, with the same name as the get/set in the getters array:\n// Define a myNameGetSet(...)function, to override the compiled name(...) get/set function\nfunction myNameGetSet(val) {\n  if (!arguments.length) {           // This is standard compiled get/set code\n    return this._name;               // If there is no argument, use as a getter\n  }\n  this._name = val;                  // If there is an argument, use as a setter\n  console.log(\"name set to \" + val); // This is an additional line of code, for logging\n}\n\n// Declare a Person View Model with an overridden name() get/set property\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", ...}, // Compiled name() get/set\n      ...\n    ],\n    extend: {\n      name: myNameGetSet,    // Override name() get/set\n      ...\n    }\n    ...\n  },\n  ...\n});\n\nThe above is equivalent to the generated version except that it adds custom logging to the getter/setter function.\n(Note: If you want your override function also to work with JsViews observable changes and data-linking, use the complete version shown here.)\n"
      },
      {
        "_type": "para",
        "title": "Sample showing some of the advanced View Model features",
        "text": "Sample showing some of the advanced View Model features\nThe next sample is similar to the previous one, but specifically highlights some of the advanced features of compiled View Models.\n\nIt stores compiled View Models on a myVmCollection hash, as a View Model typed collection, rather than on$.views.viewModels\nIt maps from an array of ‘people’ rather than a single person:\nvar people = Person.map(peopleData);\nIt specifies an id key for Person. When updating the phones array the id value is treated as 'primary key’, and used to map 'identity’:\nid: \"id\"\nIt provides an id() callback on Person, for determining identity – allowing identification of corresponding View Model instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the comment value).\nIt has a comment() get/set property that is added as part of the extend definition, not the getters, so it is not initialized from data, in the constructor. Note therefore that if you set a comment on each person instance, then click Update, then Revert, one comment is conserved (since that instance is never disposed - based on the ‘identity’ determination) but the other is lost since the instance is disposed and then re-created by Revert:\nextend: {...comment: comment...}\nIt has defaultVal specified for name, address and phones, either as ‘static’ values or computed by a callback function:\naddress: {type: \"Address\", defaultVal: defaultStreet}\nIt overrides the generated person.name() get/set by a myNameGetSet function which includes logging\nIt passes a JSON string to merge() or map()\n(See also the same sample using JsViews and data-linking.)\n\n"
      },
      {
        "_type": "sample",
        "title": "Mapping from JSON data to View Model hierarchy &ndash; further features",
        "text": "Mapping from JSON data to View Model hierarchy – further features\nbutton, table {margin-bottom: 9px;}\n\nUpdate\nRevert\nGet Data\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Comment:</td><td><input class=\"comment\" data-index=\"{{:#index}}\" value=\"{{:comment()}}\"/></td></tr>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>{{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\nvar tmpl = $.templates(\"#personTmpl\");\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: {\n    getters: [\"number\"],\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {                     // This is standard compiled get/set code\n    return this._name;                         // If there is no argument, use as a getter\n  }\n  this._name = val;                            // If there is an argument, use as a setter\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n}\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  this.phones().push(myVmCollection.Phone(phoneNo));\n}\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment;                      // If there is no argument, use as a getter\n  }\n  this._comment = val;\n}\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [\n  {\n    personId: \"1\",\n    address: {\n      street: \"2nd Ave\"\n    }\n  },\n  {\n    personId: \"2\",\n    name: \"Pete\",\n    phones: [\n      {number: \"333 333 3333\", phoneId: \"2a\"}\n    ]\n  }\n];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":{\"street\":\"11 1st Ave\"},'\n+ '\"phones\":[{\"number\":\"111 111 9999\",\"phoneId\":\"1a\"},{\"number\":\"333 333 9999\",\"phoneId\":\"2a\"}]}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render template against people (array of Person instances)\n$(\"#result\").html(tmpl.render(people));\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#revert\").on(\"click\", function() {\n  people.merge(peopleData);\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  people[0].name(\"newName\");\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  people[0].addPhone(\"xxx xxx xxxx\");\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#result\").on(\"change\", \".comment\", function(val) {\n  // If comment is modified, update View Model state with new value\n  people[this.getAttribute(\"data-index\")].comment(this.value);\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPeopleData = people.unmap();\n  window.alert(JSON.stringify(updatedPeopleData));\n});\n\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  ...\n  Phone: {\n    getters: [\"number\"],\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {                     // This is standard compiled get/set code\n    return this._name;                         // If there is no argument, use as a getter\n  }\n  this._name = val;                            // If there is an argument, use as a setter\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n}\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  this.phones().push(myVmCollection.Phone(phoneNo));\n}\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment;\n  }\n  this._comment = val;\n}\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [{personId: \"1\", ...}, {personId: \"2\", name: \"Pete\",...}];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":...}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render template against people (array of Person instances)\n$(\"#result\").html(tmpl.render(people));\n...\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n  ...\n});\n...\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  }
}