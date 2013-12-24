/* TO MODIFY: Make changes to this file and test locally under the Debug compilation configuration. When 
finished, run this text through a javascript minifier and copy the output to lib.min.js. 
There is an online minifier at http://www.refresh-sf.com/yui/. */

//#region javascript libraries and jQuery plug-ins */

//#region json2.js

/*
http://www.JSON.org/json2.js
2011-02-23

Public Domain.

NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

See http://www.JSON.org/js.html


This code should be minified before deployment.
See http://javascript.crockford.com/jsmin.html

USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
NOT CONTROL.


This file creates a global JSON object containing two methods: stringify
and parse.

JSON.stringify(value, replacer, space)
value       any JavaScript value, usually an object or array.

replacer    an optional parameter that determines how object
values are stringified for objects. It can be a
function or an array of strings.

space       an optional parameter that specifies the indentation
of nested structures. If it is omitted, the text will
be packed without extra whitespace. If it is a number,
it will specify the number of spaces to indent at each
level. If it is a string (such as '\t' or '&nbsp;'),
it contains the characters used to indent at each level.

This method produces a JSON text from a JavaScript value.

When an object value is found, if the object contains a toJSON
method, its toJSON method will be called and the result will be
stringified. A toJSON method does not serialize: it returns the
value represented by the name/value pair that should be serialized,
or undefined if nothing should be serialized. The toJSON method
will be passed the key associated with the value, and this will be
bound to the value

For example, this would serialize Dates as ISO strings.

Date.prototype.toJSON = function (key) {
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}

return this.getUTCFullYear()   + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate())      + 'T' +
f(this.getUTCHours())     + ':' +
f(this.getUTCMinutes())   + ':' +
f(this.getUTCSeconds())   + 'Z';
};

You can provide an optional replacer method. It will be passed the
key and value of each member, with this bound to the containing
object. The value that is returned from your method will be
serialized. If your method returns undefined, then the member will
be excluded from the serialization.

If the replacer parameter is an array of strings, then it will be
used to select the members to be serialized. It filters the results
such that only members with keys listed in the replacer array are
stringified.

Values that do not have JSON representations, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays they will be replaced with null. You can use
a replacer function to replace those with JSON values.
JSON.stringify(undefined) returns undefined.

The optional space parameter produces a stringification of the
value that is filled with line breaks and indentation to make it
easier to read.

If the space parameter is a non-empty string, then that string will
be used for indentation. If the space parameter is a number, then
the indentation will be that many spaces.

Example:

text = JSON.stringify(['e', {pluribus: 'unum'}]);
// text is '["e",{"pluribus":"unum"}]'


text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
// text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

text = JSON.stringify([new Date()], function (key, value) {
return this[key] instanceof Date ?
'Date(' + this[key] + ')' : value;
});
// text is '["Date(---current time---)"]'


JSON.parse(text, reviver)
This method parses a JSON text to produce an object or array.
It can throw a SyntaxError exception.

The optional reviver parameter is a function that can filter and
transform the results. It receives each of the keys and values,
and its return value is used instead of the original value.
If it returns what it received, then the structure is not modified.
If it returns undefined then the member is deleted.

Example:

// Parse the text. Values that look like ISO date strings will
// be converted to Date objects.

myData = JSON.parse(text, function (key, value) {
var a;
if (typeof value === 'string') {
a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
if (a) {
return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
+a[5], +a[6]));
}
}
return value;
});

myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
var d;
if (typeof value === 'string' &&
value.slice(0, 5) === 'Date(' &&
value.slice(-1) === ')') {
d = new Date(value.slice(5, -1));
if (d) {
return d;
}
}
return value;
});


This is a reference implementation. You are free to copy, modify, or
redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, prototype, push, replace, slice, stringify,
test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
  JSON = {};
}

(function () {
  "use strict";

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }

  if (typeof Date.prototype.toJSON !== 'function') {

    Date.prototype.toJSON = function (key) {

      return isFinite(this.valueOf()) ?
								this.getUTCFullYear() + '-' +
								f(this.getUTCMonth() + 1) + '-' +
								f(this.getUTCDate()) + 'T' +
								f(this.getUTCHours()) + ':' +
								f(this.getUTCMinutes()) + ':' +
								f(this.getUTCSeconds()) + 'Z' : null;
    };

    String.prototype.toJSON =
						Number.prototype.toJSON =
						Boolean.prototype.toJSON = function (key) {
						  return this.valueOf();
						};
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
				escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
				gap,
				indent,
				meta = {    // table of character substitutions
				  '\b': '\\b',
				  '\t': '\\t',
				  '\n': '\\n',
				  '\f': '\\f',
				  '\r': '\\r',
				  '"': '\\"',
				  '\\': '\\\\'
				},
				rep;


  function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c :
								'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }


  function str(key, holder) {

    // Produce a string from holder[key].

    var i,          // The loop counter.
						k,          // The member key.
						v,          // The member value.
						length,
						mind = gap,
						partial,
						value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && typeof value === 'object' &&
								typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case 'string':
        return quote(value);

      case 'number':

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

        // If the type is 'object', we might be dealing with an object or an array or
        // null.

      case 'object':

        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return 'null';
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]') {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? '[]' : gap ?
										'[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
										'[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === 'string') {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ?
								'{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
								'{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function (value, replacer, space) {

      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }

        // If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === 'string') {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' &&
										(typeof replacer !== 'object' ||
										typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }

      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.

      return str('', { '': value });
    };
  }


  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== 'function') {
    JSON.parse = function (text, reviver) {

      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }


      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return '\\u' +
												('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with '()' and 'new'
      // because they can cause invocation, and '=' because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/
										.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
												.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
												.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval('(' + text + ')');

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === 'function' ?
										walk({ '': j }, '') : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
    };
  }
}());

//#endregion json2.js

//#region jsrender

/*! JsRender v1.0.0-beta: http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews */
/*
* Optimized version of jQuery Templates, for rendering to string.
* Does not require jQuery, or HTML DOM
* Integrates with JsViews (http://jsviews.com/jsviews)
* Copyright 2013, Boris Moore
* Released under the MIT License.
*/

(function (global, jQuery, undefined) {
  // global is the this object, which is window when running in the usual browser environment.
  "use strict";

  if (jQuery && jQuery.views || global.jsviews) { return; } // JsRender is already loaded

  //========================== Top-level vars ==========================

  var versionNumber = "v1.0.0-beta",

		$, jsvStoreName, rTag, rTmplString,// nodeJsModule,

//TODO	tmplFnsCache = {},
		delimOpenChar0 = "{", delimOpenChar1 = "{", delimCloseChar0 = "}", delimCloseChar1 = "}", linkChar = "^",

		rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
		//                                     object     helper    view  viewProperty pathTokens      leafToken

		rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*\.|\s*\^)|[)\]])([([]?))|(\s+)/g,
		//          lftPrn0        lftPrn                  path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                        prn2      space
		// (left paren? followed by (path? followed by operator) or (path followed by left paren?)) or comma or apos or quot or right paren or space

		rNewLine = /\s*\n/g,
		rUnescapeQuotes = /\\(['"])/g,
		rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
		rBuildHash = /\x08(~)?([^\x08]+)\x08/g,
		rTestElseIf = /^if\s/,
		rFirstElem = /<(\w+)[>\s]/,
		rAttrEncode = /[\x00`><"'&]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		rHtmlEncode = rAttrEncode,
		autoTmplName = 0,
		viewId = 0,
		charEntities = {
		  "&": "&amp;",
		  "<": "&lt;",
		  ">": "&gt;",
		  "\x00": "&#0;",
		  "'": "&#39;",
		  '"': "&#34;",
		  "`": "&#96;"
		},
		tmplAttr = "data-jsv-tmpl",

		$render = {},
		jsvStores = {
		  template: {
		    compile: compileTmpl
		  },
		  tag: {
		    compile: compileTag
		  },
		  helper: {},
		  converter: {}
		},

		// jsviews object ($.views if jQuery is loaded)
		$views = {
		  jsviews: versionNumber,
		  render: $render,
		  settings: {
		    delimiters: $viewsDelimiters,
		    debugMode: true,
		    tryCatch: true
		  },
		  sub: {
		    // subscription, e.g. JsViews integration
		    View: View,
		    Error: JsViewsError,
		    tmplFn: tmplFn,
		    parse: parseParams,
		    extend: $extend,
		    error: error,
		    syntaxError: syntaxError
		  },
		  _cnvt: convertVal,
		  _tag: renderTag,

		  _err: function (e) {
		    // Place a breakpoint here to intercept template rendering errors
		    return $viewsSettings.debugMode ? ("Error: " + (e.message || e)) + ". " : '';
		  }
		};

  function JsViewsError(message, object) {
    // Error exception type for JsViews/JsRender
    // Override of $.views.sub.Error is possible
    if (object && object.onError) {
      if (object.onError(message) === false) {
        return;
      }
    }
    this.name = "JsRender Error";
    this.message = message || "JsRender error";
  }

  function $extend(target, source) {
    var name;
    target = target || {};
    for (name in source) {
      target[name] = source[name];
    }
    return target;
  }

  (JsViewsError.prototype = new Error()).constructor = JsViewsError;

  //========================== Top-level functions ==========================

  //===================
  // jsviews.delimiters
  //===================
  function $viewsDelimiters(openChars, closeChars, link) {
    // Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
    // openChars, closeChars: opening and closing strings, each with two characters

    if (!$viewsSub.rTag || arguments.length) {
      delimOpenChar0 = openChars ? openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
      delimOpenChar1 = openChars ? openChars.charAt(1) : delimOpenChar1;
      delimCloseChar0 = closeChars ? closeChars.charAt(0) : delimCloseChar0;
      delimCloseChar1 = closeChars ? closeChars.charAt(1) : delimCloseChar1;
      linkChar = link || linkChar;
      openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1;  // Default is "{^{"
      closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
      // Build regex with new delimiters
      //          tag    (followed by / space or })   or cvtr+colon or html or code
      rTag = "(?:(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))"
				+ "\\s*((?:[^\\" + delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

      // make rTag available to JsViews (or other components) for parsing binding expressions
      $viewsSub.rTag = rTag + ")";

      rTag = new RegExp(openChars + rTag + "(\\/)?|(?:\\/(\\w+)))" + closeChars, "g");

      // Default:    bind           tag       converter colon html     comment            code      params            slash   closeBlock
      //           /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

      rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
      // rTmplString looks for html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}. Each of these strings are considered
      // NOT to be jQuery selectors
    }
    return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar];
  }

  //=========
  // View.get
  //=========

  function getView(inner, type) { //view.get(inner, type)
    if (!type) {
      // view.get(type)
      type = inner;
      inner = undefined;
    }

    var views, i, l, found,
			view = this,
			root = !type || type === "root";
    // If type is undefined, returns root view (view under top view).

    if (inner) {
      // Go through views - this one, and all nested ones, depth-first - and return first one with given type.
      found = view.type === type ? view : undefined;
      if (!found) {
        views = view.views;
        if (view._.useKey) {
          for (i in views) {
            if (found = views[i].get(inner, type)) {
              break;
            }
          }
        } else for (i = 0, l = views.length; !found && i < l; i++) {
          found = views[i].get(inner, type);
        }
      }
    } else if (root) {
      // Find root view. (view whose parent is top view)
      while (view.parent.parent) {
        found = view = view.parent;
      }
    } else while (view && !found) {
      // Go through views - this one, and all parent ones - and return first one with given type.
      found = view.type === type ? view : undefined;
      view = view.parent;
    }
    return found;
  }

  function getIndex() {
    var view = this.get("item");
    return view ? view.index : undefined;
  }

  getIndex.depends = function () {
    return [this.get("item"), "index"];
  };

  //==========
  // View.hlp
  //==========

  function getHelper(helper) {
    // Helper method called as view.hlp(key) from compiled template, for helper functions or template parameters ~foo
    var wrapped,
			view = this,
			res = (view.ctx || {})[helper];

    res = res === undefined ? view.getRsc("helpers", helper) : res;

    if (res) {
      if (typeof res === "function") {
        wrapped = function () {
          // If it is of type function, we will wrap it so it gets called with view as 'this' context.
          // If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
          // However note that helper functions on deeper paths will not have access to view and tagCtx.
          // For example, ~util.foo() will have the ~util object as 'this' pointer
          return res.apply(view, arguments);
        };
        $extend(wrapped, res);
      }
    }
    return wrapped || res;
  }

  //==============
  // jsviews._cnvt
  //==============

  function convertVal(converter, view, tagCtx) {
    // self is template object or linkCtx object
    var tmplConverter, tag, value,
			boundTagCtx = +tagCtx === tagCtx && tagCtx, // if value is an integer, then it is the key for the boundTagCtx
			linkCtx = view.linkCtx;

    if (boundTagCtx) {
      // Call compiled function which returns the tagCtxs for current data
      tagCtx = (boundTagCtx = view.tmpl.bnds[boundTagCtx - 1])(view.data, view, $views);
    }

    value = tagCtx.args[0];

    if (converter || boundTagCtx) {
      tag = linkCtx && linkCtx.tag || {
        _: {
          inline: !linkCtx
        },
        tagName: converter + ":",
        flow: true,
        _is: "tag"
      };

      tag._.bnd = boundTagCtx;

      if (linkCtx) {
        linkCtx.tag = tag;
        tag.linkCtx = linkCtx;
        tagCtx.ctx = extendCtx(tagCtx.ctx, linkCtx.view.ctx);
      }
      tag.tagCtx = tagCtx;
      tagCtx.view = view;

      tag.ctx = tagCtx.ctx || {};
      delete tagCtx.ctx;
      // Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id,
      view._.tag = tag;

      converter = converter !== "true" && converter; // If there is a convertBack but no convert, converter will be "true"

      if (converter && ((tmplConverter = view.getRsc("converters", converter)) || error("Unknown converter: {{" + converter + ":"))) {
        // A call to {{cnvt: ... }} or {^{cnvt: ... }} or data-link="{cnvt: ... }"
        tag.depends = tmplConverter.depends;
        value = tmplConverter.apply(tag, tagCtx.args);
      }
      // Call onRender (used by JsViews if present, to add binding annotations around rendered content)
      value = boundTagCtx && view._.onRender
				? view._.onRender(value, view, boundTagCtx)
				: value;
      view._.tag = undefined;
    }
    return value;
  }

  //=============
  // jsviews._tag
  //=============

  function getResource(resourceType, itemName) {
    var res,
			view = this,
			store = $views[resourceType];

    res = store && store[itemName];
    while ((res === undefined) && view) {
      store = view.tmpl[resourceType];
      res = store && store[itemName];
      view = view.parent;
    }
    return res;
  }

  function renderTag(tagName, parentView, tmpl, tagCtxs) {
    // Called from within compiled template function, to render a template tag
    // Returns the rendered tag

    var render, tag, tags, attr, parentTag, i, l, itemRet, tagCtx, tagCtxCtx, content, boundTagFn, tagDef, callInit,
			ret = "",
			boundTagKey = +tagCtxs === tagCtxs && tagCtxs, // if tagCtxs is an integer, then it is the boundTagKey
			linkCtx = parentView.linkCtx || 0,
			ctx = parentView.ctx,
			parentTmpl = tmpl || parentView.tmpl,
			parentView_ = parentView._;

    if (tagName._is === "tag") {
      tag = tagName;
      tagName = tag.tagName;
    }

    // Provide tagCtx, linkCtx and ctx access from tag
    if (boundTagKey) {
      // if tagCtxs is an integer, we are data binding
      // Call compiled function which returns the tagCtxs for current data
      tagCtxs = (boundTagFn = parentTmpl.bnds[boundTagKey - 1])(parentView.data, parentView, $views);
    }

    l = tagCtxs.length;
    tag = tag || linkCtx.tag;
    for (i = 0; i < l; i++) {
      tagCtx = tagCtxs[i];

      // Set the tmpl property to the content of the block tag, unless set as an override property on the tag
      content = tagCtx.tmpl;
      content = tagCtx.content = content && parentTmpl.tmpls[content - 1];
      tmpl = tagCtx.props.tmpl;
      if (!i && (!tmpl || !tag)) {
        tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}}");
      }
      tmpl = tmpl || (tag ? tag._def : tagDef).template || content;
      tmpl = "" + tmpl === tmpl // if a string
				? parentView.getRsc("templates", tmpl) || $templates(tmpl)
				: tmpl;

      $extend(tagCtx, {
        tmpl: tmpl,
        render: renderContent,
        index: i,
        view: parentView,
        ctx: extendCtx(tagCtx.ctx, ctx) // Extend parentView.ctx
      }); // Extend parentView.ctx

      if (!tag) {
        // This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
        // Instantiate tag if it does not yet exist
        if (tagDef._ctr) {
          // If the tag has not already been instantiated, we will create a new instance.
          // ~tag will access the tag, even within the rendering of the template content of this tag.
          // From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
          //	TODO provide error handling owned by the tag - using tag.onError
          //				try {
          tag = new tagDef._ctr();
          callInit = !!tag.init;
          //				}
          //				catch(e) {
          //					tagDef.onError(e);
          //				}
          // Set attr on linkCtx to ensure outputting to the correct target attribute.
          tag.attr = tag.attr || tagDef.attr || undefined;
          // Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
        } else {
          // This is a simple tag declared as a function, or with init set to false. We won't instantiate a specific tag constructor - just a standard instance object.
          tag = {
            // tag instance object if no init constructor
            render: tagDef.render
          };
        }
        tag._ = {
          inline: !linkCtx
        };
        if (linkCtx) {
          // Set attr on linkCtx to ensure outputting to the correct target attribute.
          linkCtx.attr = tag.attr = linkCtx.attr || tag.attr;
          linkCtx.tag = tag;
          tag.linkCtx = linkCtx;
        }
        if (tag._.bnd = boundTagFn || linkCtx) {
          // Bound if {^{tag...}} or data-link="{tag...}"
          tag._.arrVws = {};
        }
        tag.tagName = tagName;
        tag.parent = parentTag = ctx && ctx.tag;
        tag._is = "tag";
        tag._def = tagDef;
        // Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id,
      }
      parentView_.tag = tag;
      tagCtx.tag = tag;
      tag.tagCtxs = tagCtxs;
      if (!tag.flow) {
        tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

        // tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
        tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
        if (parentTag) {
          tags[parentTag.tagName] = parentTag;
        }
        tagCtxCtx.tag = tag;
      }
    }
    tag.rendering = {}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
    for (i = 0; i < l; i++) {
      tagCtx = tag.tagCtx = tagCtxs[i];
      tag.ctx = tagCtx.ctx;

      if (!i && callInit) {
        tag.init(tagCtx, linkCtx, tag.ctx);
        callInit = undefined;
      }

      if (render = tag.render) {
        itemRet = render.apply(tag, tagCtx.args);
      }
      ret += itemRet !== undefined
				? itemRet   // Return result of render function unless it is undefined, in which case return rendered template
				: tagCtx.tmpl
					// render template/content on the current data item
					? tagCtx.render()
					: ""; // No return value from render, and no template/content defined, so return ""
    }
    delete tag.rendering;

    tag.tagCtx = tag.tagCtxs[0];
    tag.ctx = tag.tagCtx.ctx;

    if (tag._.inline && (attr = tag.attr) && attr !== "html") {
      ret = attr === "text"
				? $converters.html(ret)
				: "";
    }
    return boundTagKey && parentView._.onRender
			// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
			? parentView._.onRender(ret, parentView, boundTagKey)
			: ret;
  }

  //=================
  // View constructor
  //=================

  function View(context, type, parentView, data, template, key, contentTmpl, onRender) {
    // Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
    var views, parentView_, tag,
			isArray = type === "array",
			self_ = {
			  key: 0,
			  useKey: isArray ? 0 : 1,
			  id: "" + viewId++,
			  onRender: onRender,
			  bnds: {}
			},
			self = {
			  data: data,
			  tmpl: template,
			  content: contentTmpl,
			  views: isArray ? [] : {},
			  parent: parentView,
			  ctx: context,
			  type: type,
			  // If the data is an array, this is an 'array view' with a views array for each child 'item view'
			  // If the data is not an array, this is an 'item view' with a views 'map' object for any child nested views
			  // ._.useKey is non zero if is not an 'array view' (owning a data array). Uuse this as next key for adding to child views map
			  get: getView,
			  getIndex: getIndex,
			  getRsc: getResource,
			  hlp: getHelper,
			  _: self_,
			  _is: "view"
			};
    if (parentView) {
      views = parentView.views;
      parentView_ = parentView._;
      if (parentView_.useKey) {
        // Parent is an 'item view'. Add this view to its views object
        // self._key = is the key in the parent view map
        views[self_.key = "_" + parentView_.useKey++] = self;
        tag = parentView_.tag;
        self_.bnd = isArray && (!tag || !!tag._.bnd && tag); // For array views that are data bound for collection change events, set the
        // view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data- bound tag, e.g. {^{for ...}}
      } else {
        // Parent is an 'array view'. Add this view to its views array
        views.splice(
					// self._.key = self.index - the index in the parent view array
					self_.key = self.index =
						key !== undefined
							? key
							: views.length,
				0, self);
      }
      // If no context was passed in, use parent context
      // If context was passed in, it should have been merged already with parent context
      self.ctx = context || parentView.ctx;
    }
    return self;
  }

  //=============
  // Registration
  //=============

  function compileChildResources(parentTmpl) {
    var storeName, resources, resourceName, settings, compile;
    for (storeName in jsvStores) {
      settings = jsvStores[storeName];
      if ((compile = settings.compile) && (resources = parentTmpl[storeName + "s"])) {
        for (resourceName in resources) {
          // compile child resource declarations (templates, tags, converters or helpers)
          resources[resourceName] = compile(resourceName, resources[resourceName], parentTmpl, storeName, settings);
        }
      }
    }
  }

  function compileTag(name, tagDef, parentTmpl) {
    var init, tmpl;
    if (typeof tagDef === "function") {
      // Simple tag declared as function. No presenter instantation.
      tagDef = {
        depends: tagDef.depends,
        render: tagDef
      };
    } else {
      // Tag declared as object, used as the prototype for tag instantiation (control/presenter)
      if (tmpl = tagDef.template) {
        tagDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
      }
      if (tagDef.init !== false) {
        init = tagDef._ctr = function (tagCtx) { };
        (init.prototype = tagDef).constructor = init;
      }
    }
    if (parentTmpl) {
      tagDef._parentTmpl = parentTmpl;
    }
    //TODO	tagDef.onError = function(e) {
    //			var error;
    //			if (error = this.prototype.onError) {
    //				error.call(this, e);
    //			} else {
    //				throw e;
    //			}
    //		}
    return tagDef;
  }

  function compileTmpl(name, tmpl, parentTmpl, storeName, storeSettings, options) {
    // tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

    //==== nested functions ====
    function tmplOrMarkupFromStr(value) {
      // If value is of type string - treat as selector, or name of compiled template
      // Return the template object, if already compiled, or the markup string

      if (("" + value === value) || value.nodeType > 0) {
        try {
          elem = value.nodeType > 0
					? value
					: !rTmplString.test(value)
					// If value is a string and does not contain HTML or tag content, then test as selector
						&& jQuery && jQuery(global.document).find(value)[0];
          // If selector is valid and returns at least one element, get first element
          // If invalid, jQuery will throw. We will stay with the original string.
        } catch (e) { }

        if (elem) {
          // Generally this is a script element.
          // However we allow it to be any element, so you can for example take the content of a div,
          // use it as a template, and replace it by the same content rendered against data.
          // e.g. for linking the content of a div to a container, and using the initial content as template:
          // $.link("#content", model, {tmpl: "#content"});

          value = elem.getAttribute(tmplAttr);
          name = name || value;
          value = $templates[value];
          if (!value) {
            // Not already compiled and cached, so compile and cache the name
            // Create a name for compiled template if none provided
            name = name || "_" + autoTmplName++;
            elem.setAttribute(tmplAttr, name);
            // Use tmpl as options
            value = $templates[name] = compileTmpl(name, elem.innerHTML, parentTmpl, storeName, storeSettings, options);
          }
        }
        return value;
      }
      // If value is not a string, return undefined
    }

    var tmplOrMarkup, elem;

    //==== Compile the template ====
    tmpl = tmpl || "";
    tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

    // If options, then this was already compiled from a (script) element template declaration.
    // If not, then if tmpl is a template object, use it for options
    options = options || (tmpl.markup ? tmpl : {});
    options.tmplName = name;
    if (parentTmpl) {
      options._parentTmpl = parentTmpl;
    }
    // If tmpl is not a markup string or a selector string, then it must be a template object
    // In that case, get it from the markup property of the object
    if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
      if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
        // if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
        tmplOrMarkup = tmplOrMarkup.markup;
      }
    }
    if (tmplOrMarkup !== undefined) {
      if (name && !parentTmpl) {
        $render[name] = function () {
          return tmpl.render.apply(tmpl, arguments);
        };
      }
      if (tmplOrMarkup.fn || tmpl.fn) {
        // tmpl is already compiled, so use it, or if different name is provided, clone it
        if (tmplOrMarkup.fn) {
          if (name && name !== tmplOrMarkup.tmplName) {
            tmpl = extendCtx(options, tmplOrMarkup);
          } else {
            tmpl = tmplOrMarkup;
          }
        }
      } else {
        // tmplOrMarkup is a markup string, not a compiled template
        // Create template object
        tmpl = TmplObject(tmplOrMarkup, options);
        // Compile to AST and then to compiled function
        tmplFn(tmplOrMarkup, tmpl);
      }
      compileChildResources(options);
      return tmpl;
    }
  }
  //==== /end of function compile ====

  function TmplObject(markup, options) {
    // Template object constructor
    var htmlTag,
			wrapMap = $viewsSettings.wrapMap || {},
			tmpl = $extend(
				{
				  markup: markup,
				  tmpls: [],
				  links: {}, // Compiled functions for link expressions
				  tags: {}, // Compiled functions for bound tag expressions
				  bnds: [],
				  _is: "template",
				  render: renderContent
				},
				options
			);

    if (!options.htmlTag) {
      // Set tmpl.tag to the top-level HTML tag used in the template, if any...
      htmlTag = rFirstElem.exec(markup);
      tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
    }
    htmlTag = wrapMap[tmpl.htmlTag];
    if (htmlTag && htmlTag !== wrapMap.div) {
      // When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
      tmpl.markup = $.trim(tmpl.markup);
      tmpl._elCnt = true; // element content model (no rendered text nodes), not phrasing content model
    }

    return tmpl;
  }

  function registerStore(storeName, storeSettings) {

    function theStore(name, item, parentTmpl) {
      // The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

      // For store of name 'thing', Call as:
      //    $.views.things(items[, parentTmpl]),
      // or $.views.things(name, item[, parentTmpl])

      var onStore, compile, itemName, thisStore;

      if (name && "" + name !== name && !name.nodeType && !name.markup) {
        // Call to $.views.things(items[, parentTmpl]),

        // Adding items to the store
        // If name is a map, then item is parentTmpl. Iterate over map and call store for key.
        for (itemName in name) {
          theStore(itemName, name[itemName], item);
        }
        return $views;
      }
      // Adding a single unnamed item to the store
      if (item === undefined) {
        item = name;
        name = undefined;
      }
      if (name && "" + name !== name) { // name must be a string
        parentTmpl = item;
        item = name;
        name = undefined;
      }
      thisStore = parentTmpl ? parentTmpl[storeNames] = parentTmpl[storeNames] || {} : theStore;
      compile = storeSettings.compile;
      if (onStore = $viewsSub.onBeforeStoreItem) {
        // e.g. provide an external compiler or preprocess the item.
        compile = onStore(thisStore, name, item, compile) || compile;
      }
      if (!name) {
        item = compile(undefined, item);
      } else if (item === null) {
        // If item is null, delete this entry
        delete thisStore[name];
      } else {
        thisStore[name] = compile ? (item = compile(name, item, parentTmpl, storeName, storeSettings)) : item;
      }
      if (item) {
        item._is = storeName;
      }
      if (onStore = $viewsSub.onStoreItem) {
        // e.g. JsViews integration
        onStore(thisStore, name, item, compile);
      }
      return item;
    }

    var storeNames = storeName + "s";

    $views[storeNames] = theStore;
    jsvStores[storeName] = storeSettings;
  }

  //==============
  // renderContent
  //==============

  function renderContent(data, context, parentView, key, isLayout, onRender) {
    // Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
    // If the data is the parent view, treat as layout template, re-render with the same data context.
    var i, l, dataItem, newView, childView, itemResult, swapContent, tagCtx, contentTmpl, tag_, outerOnRender, tmplName, tmpl,
			self = this,
			allowDataLink = !self.attr || self.attr === "html",
			result = "";

    if (key === true) {
      swapContent = true;
      key = 0;
    }
    if (self.tag) {
      // This is a call from renderTag or tagCtx.render()
      tagCtx = self;
      self = self.tag;
      tag_ = self._;
      tmplName = self.tagName;
      tmpl = tagCtx.tmpl;
      context = extendCtx(context, self.ctx);
      contentTmpl = tagCtx.content; // The wrapped content - to be added to views, below
      if (tagCtx.props.link === false) {
        // link=false setting on block tag
        // We will override inherited value of link by the explicit setting link=false taken from props
        // The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
        context = context || {};
        context.link = false;
      }
      parentView = parentView || tagCtx.view;
      data = data === undefined ? parentView : data;
    } else {
      tmpl = self.jquery && (self[0] || error('Unknown template: "' + self.selector + '"')) // This is a call from $(selector).render
				|| self;
    }
    if (tmpl) {
      if (!parentView && data && data._is === "view") {
        parentView = data; // When passing in a view to render or link (and not passing in a parent view) use the passed in view as parentView
      }
      if (parentView) {
        contentTmpl = contentTmpl || parentView.content; // The wrapped content - to be added as #content property on views, below
        onRender = onRender || parentView._.onRender;
        if (data === parentView) {
          // Inherit the data from the parent view.
          // This may be the contents of an {{if}} block
          // Set isLayout = true so we don't iterate the if block if the data is an array.
          data = parentView.data;
          isLayout = true;
        }
        context = extendCtx(context, parentView.ctx);
      }
      if (!parentView || parentView.data === undefined) {
        (context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
      }

      // Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
      // Note: If no jQuery, $extend does not support chained copies - so limit extend() to two parameters

      if (!tmpl.fn) {
        tmpl = $templates[tmpl] || $templates(tmpl);
      }

      if (tmpl) {
        onRender = (context && context.link) !== false && allowDataLink && onRender;
        // If link===false, do not call onRender, so no data-linking marker nodes
        outerOnRender = onRender;
        if (onRender === true) {
          // Used by view.refresh(). Don't create a new wrapper view.
          outerOnRender = undefined;
          onRender = parentView._.onRender;
        }
        if ($.isArray(data) && !isLayout) {
          // Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
          // along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
          newView = swapContent
						? parentView :
						(key !== undefined && parentView) || View(context, "array", parentView, data, tmpl, key, contentTmpl, onRender);
          for (i = 0, l = data.length; i < l; i++) {
            // Create a view for each data item.
            dataItem = data[i];
            childView = View(context, "item", newView, dataItem, tmpl, (key || 0) + i, contentTmpl, onRender);
            itemResult = tmpl.fn(dataItem, childView, $views);
            result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
          }
        } else {
          // Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "myTag" except for
          // "item", "array" and "data" views. A "data" view is from programatic render(object) against a 'singleton'.
          newView = swapContent ? parentView : View(context, tmplName || "data", parentView, data, tmpl, key, contentTmpl, onRender);
          if (tag_ && !self.flow) {
            newView.tag = self;
          }
          result += tmpl.fn(data, newView, $views);
        }
        return outerOnRender ? outerOnRender(result, newView) : result;
      }
    }
    return "";
  }

  //===========================
  // Build and compile template
  //===========================

  // Generate a reusable function that will serve to render a template against data
  // (Compile AST then build template function)

  function error(message) {
    throw new $views.sub.Error(message);
  }

  function syntaxError(message) {
    error("Syntax error\n" + message);
  }

  function tmplFn(markup, tmpl, isLinkExpr, convertBack) {
    // Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
    // Used for compiling templates, and also by JsViews to build functions for data link expressions

    //==== nested functions ====
    function pushprecedingContent(shift) {
      shift -= loc;
      if (shift) {
        content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
      }
    }

    function blockTagCheck(tagName) {
      tagName && syntaxError('Unmatched or missing tag: "{{/' + tagName + '}}" in template:\n' + markup);
    }

    function parseTag(all, bind, tagName, converter, colon, html, comment, codeTag, params, slash, closeBlock, index) {

      //    bind         tag        converter colon html     comment            code      params            slash   closeBlock
      // /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g
      // Build abstract syntax tree (AST): [ tagName, converter, params, content, hash, bindings, contentMarkup ]
      if (html) {
        colon = ":";
        converter = "html";
      }
      slash = slash || isLinkExpr;
      var noError, current0,
				pathBindings = bind && [],
				code = "",
				hash = "",
				passedCtx = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
				block = !slash && !colon && !comment;

      //==== nested helper function ====
      tagName = tagName || colon;
      pushprecedingContent(index);
      loc = index + all.length; // location marker - parsed up to here
      if (codeTag) {
        if (allowCode) {
          content.push(["*", "\n" + params.replace(rUnescapeQuotes, "$1") + "\n"]);
        }
      } else if (tagName) {
        if (tagName === "else") {
          if (rTestElseIf.test(params)) {
            syntaxError('for "{{else if expr}}" use "{{else expr}}"');
          }
          pathBindings = current[6];
          current[7] = markup.substring(current[7], index); // contentMarkup for block tag
          current = stack.pop();
          content = current[3];
          block = true;
        }
        if (params) {
          // remove newlines from the params string, to avoid compiled code errors for unterminated strings
          params = params.replace(rNewLine, " ");
          code = parseParams(params, pathBindings, tmpl)
						.replace(rBuildHash, function (all, isCtx, keyValue) {
						  if (isCtx) {
						    passedCtx += keyValue + ",";
						  } else {
						    hash += keyValue + ",";
						  }
						  return "";
						});
        }
        hash = hash.slice(0, -1);
        code = code.slice(0, -1);
        noError = hash && (hash.indexOf("noerror:true") + 1) && hash || "";

        newNode = [
						tagName,
						converter || !!convertBack || "",
						code,
						block && [],
						'params:"' + params + '",props:{' + hash + "}"
							+ (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : ""),
						noError,
						pathBindings || 0
        ];
        content.push(newNode);
        if (block) {
          stack.push(current);
          current = newNode;
          current[7] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
        }
      } else if (closeBlock) {
        current0 = current[0];
        blockTagCheck(closeBlock !== current0 && current0 !== "else" && closeBlock);
        current[7] = markup.substring(current[7], index); // contentMarkup for block tag
        current = stack.pop();
      }
      blockTagCheck(!current && closeBlock);
      content = current[3];
    }
    //==== /end of nested functions ====

    var newNode,
			allowCode = tmpl && tmpl.allowCode,
			astTop = [],
			loc = 0,
			stack = [],
			content = astTop,
			current = [, , , astTop];

    markup = markup.replace(rEscapeQuotes, "\\$&");

    //TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
    //and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
    //		if (result) {
    //			tmpl.fn = result;
    //		} else {

    //		result = markup;

    blockTagCheck(stack[0] && stack[0][3].pop()[0]);

    // Build the AST (abstract syntax tree) under astTop
    markup.replace(rTag, parseTag);

    pushprecedingContent(markup.length);

    if (loc = astTop[astTop.length - 1]) {
      blockTagCheck("" + loc !== loc && (+loc[7] === loc[7]) && loc[0]);
    }
    //			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
    //		}
    return buildCode(astTop, isLinkExpr ? markup : tmpl, isLinkExpr);
  }

  function buildCode(ast, tmpl, isLinkExpr) {
    // Build the template function code from the AST nodes, and set as property on the passed-in template object
    // Used for compiling templates, and also by JsViews to build functions for data link expressions
    var i, node, tagName, converter, params, hash, hasTag, hasEncoder, getsVal, hasCnvt, useCnvt, tmplBindings, pathBindings,
			nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, prm, tagCtxFn,
			tmplBindingKey = 0,
			code = "",
			noError = "",
			tmplOptions = {},
			l = ast.length;

    if ("" + tmpl === tmpl) {
      tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
      tmpl = 0;
    } else {
      tmplName = tmpl.tmplName || "unnamed";
      if (tmpl.allowCode) {
        tmplOptions.allowCode = true;
      }
      if (tmpl.debug) {
        tmplOptions.debug = true;
      }
      tmplBindings = tmpl.bnds;
      nestedTmpls = tmpl.tmpls;
    }
    for (i = 0; i < l; i++) {
      // AST nodes: [ tagName, converter, params, content, hash, noError, pathBindings, contentMarkup, link ]
      node = ast[i];

      // Add newline for each callout to t() c() etc. and each markup string
      if ("" + node === node) {
        // a markup string to be inserted
        code += '\nret+="' + node + '";';
      } else {
        // a compiled tag expression to be inserted
        tagName = node[0];
        if (tagName === "*") {
          // Code tag: {{* }}
          code += "" + node[1];
        } else {
          converter = node[1];
          params = node[2];
          content = node[3];
          hash = node[4];
          noError = node[5];
          markup = node[7];

          if (!(isElse = tagName === "else")) {
            tmplBindingKey = 0;
            if (tmplBindings && (pathBindings = node[6])) { // Array of paths, or false if not data-bound
              tmplBindingKey = tmplBindings.push(pathBindings);
            }
          }
          if (isGetVal = tagName === ":") {
            if (converter) {
              tagName = converter === "html" ? ">" : converter + tagName;
            }
            if (noError) {
              // If the tag includes noerror=true, we will do a try catch around expressions for named or unnamed parameters
              // passed to the tag, and return the empty string for each expression if it throws during evaluation
              //TODO This does not work for general case - supporting noError on multiple expressions, e.g. tag args and properties.
              //Consider replacing with try<a.b.c(p,q) + a.d, xxx> and return the value of the expression a.b.c(p,q) + a.d, or, if it throws, return xxx||'' (rather than always the empty string)
              prm = "prm" + i;
              noError = "try{var " + prm + "=[" + params + "][0];}catch(e){" + prm + '="";}\n';
              params = prm;
            }
          } else {
            if (content) {
              // Create template object for nested template
              nestedTmpl = TmplObject(markup, tmplOptions);
              nestedTmpl.tmplName = tmplName + "/" + tagName;
              // Compile to AST and then to compiled function
              buildCode(content, nestedTmpl);
              nestedTmpls.push(nestedTmpl);
            }

            if (!isElse) {
              // This is not an else tag.
              tagAndElses = tagName;
              // Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
              oldCode = code;
              code = "";
            }
            nextIsElse = ast[i + 1];
            nextIsElse = nextIsElse && nextIsElse[0] === "else";
          }

          hash += ",args:[" + params + "]}";

          if (isGetVal && pathBindings || converter && tagName !== ">") {
            // For convertVal we need a compiled function to return the new tagCtx(s)
            tagCtxFn = new Function("data,view,j,u", " // "
									+ tmplName + " " + tmplBindingKey + " " + tagName + "\n" + noError + "return {" + hash + ";");
            tagCtxFn.paths = pathBindings;
            tagCtxFn._ctxs = tagName;
            if (isLinkExpr) {
              return tagCtxFn;
            }
            useCnvt = 1;
          }

          code += (isGetVal
						? "\n" + (pathBindings ? "" : noError) + (isLinkExpr ? "return " : "ret+=") + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
							? (useCnvt = 0, hasCnvt = true, 'c("' + converter + '",view,' + (pathBindings
								? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
								: "{" + hash) + ");")
							: tagName === ">"
								? (hasEncoder = true, "h(" + params + ");")
								: (getsVal = true, "(v=" + params + ")!=" + (isLinkExpr ? "=" : "") + 'u?v:"";') // Strict equality just for data-link="title{:expr}" so expr=null will remove title attribute 
						)
						: (hasTag = true, "{tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
							+ (content ? nestedTmpls.length : "0") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
							+ hash + ","));

          if (tagAndElses && !nextIsElse) {
            code = "[" + code.slice(0, -1) + "]"; // This is a data-link expression or the last {{else}} of an inline bound tag. We complete the code for returning the tagCtxs array
            if (isLinkExpr || pathBindings) {
              // This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
              code = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + "\nreturn " + code + ";");
              if (pathBindings) {
                (tmplBindings[tmplBindingKey - 1] = code).paths = pathBindings;
              }
              code._ctxs = tagName;
              if (isLinkExpr) {
                return code; // For a data-link expression we return the compiled tagCtxs function
              }
            }

            // This is the last {{else}} for an inline tag.
            // For a bound tag, pass the tagCtxs fn lookup key to renderTag.
            // For an unbound tag, include the code directly for evaluating tagCtxs array
            code = oldCode + '\nret+=t("' + tagAndElses + '",view,this,' + (tmplBindingKey || code) + ");";
            pathBindings = 0;
            tagAndElses = 0;
          }
        }
      }
    }
    // Include only the var references that are needed in the code
    code = "// " + tmplName
			+ "\nvar j=j||" + (jQuery ? "jQuery." : "js") + "views"
			+ (getsVal ? ",v" : "")                      // gets value
			+ (hasTag ? ",t=j._tag" : "")                // has tag
			+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
			+ (hasEncoder ? ",h=j.converters.html" : "") // html converter
			+ (isLinkExpr ? ";\n" : ',ret="";\n')
			+ ($viewsSettings.tryCatch ? "try{\n" : "")
			+ (tmplOptions.debug ? "debugger;" : "")
			+ code + (isLinkExpr ? "\n" : "\nreturn ret;\n")
			+ ($viewsSettings.tryCatch ? "\n}catch(e){return j._err(e);}" : "");
    try {
      code = new Function("data,view,j,u", code);
    } catch (e) {
      syntaxError("Compiled template code:\n\n" + code, e);
    }
    if (tmpl) {
      tmpl.fn = code;
    }
    return code;
  }

  function parseParams(params, bindings, tmpl) {

    //function pushBindings() { // Consider structured path bindings
    //	if (bindings) {
    //		named ? bindings[named] = bindings.pop(): bindings.push(list = []);
    //	}
    //}

    function parseTokens(all, lftPrn0, lftPrn, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
      // rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*((\))(?=\s*\.|\s*\^)|\)|\])([([]?))|(\s+)/g,
      //          lftPrn        lftPrn2                 path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot           prn2   space
      // (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
      var expr;
      operator = operator || "";
      lftPrn = lftPrn || lftPrn0 || lftPrn2;
      path = path || path2;
      prn = prn || prn2 || "";

      function parsePath(all, object, helper, view, viewProperty, pathTokens, leafToken) {
        // rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
        //                                        object   helper    view  viewProperty pathTokens       leafToken
        if (object) {
          bindings && !isAlias && bindings.push(path); // Add path binding for paths on props and args,
          // but not within foo=expr (named parameter) or ~foo=expr (passing in template parameter aliases).
          //					bindings && !isAlias && list.push(path);
          if (object !== ".") {
            var ret = (helper
								? 'view.hlp("' + helper + '")'
								: view
									? "view"
									: "data")
							+ (leafToken
								? (viewProperty
									? "." + viewProperty
									: helper
										? ""
										: (view ? "" : "." + object)
									) + (pathTokens || "")
								: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

            ret = ret + (leafToken ? "." + leafToken : "");

            return ret.slice(0, 9) === "view.data"
							? ret.slice(5) // convert #view.data... to data...
							: ret;
          }
        }
        return all;
      }

      if (err) {
        syntaxError(params);
      } else {
        if (bindings && rtPrnDot) {
          // This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
          // We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes, to return the new object, and trigger re-binding of the subsequent path)
          expr = pathStart[parenDepth];
          if (full.length - 2 > index - expr) { // We need to compile a subexpression
            expr = full.slice(expr, index + 1);
            rtPrnDot = delimOpenChar1 + ":" + expr + delimCloseChar0; // The parameter or function subexpression
            rtPrnDot = tmplLinks[rtPrnDot] = tmplLinks[rtPrnDot] || tmplFn(delimOpenChar0 + rtPrnDot + delimCloseChar1, tmpl, true); // Compile the expression (or use cached copy already in tmpl.links)
            if (!rtPrnDot.paths) {
              parseParams(expr, rtPrnDot.paths = [], tmpl);
            }
            bindings.push({ _jsvOb: rtPrnDot }); // Insert special object for in path bindings, to be used for binding the compiled sub expression ()
            //list.push({_jsvOb: rtPrnDot});
          }
        }
        return (aposed
					// within single-quoted string
					? (aposed = !apos, (aposed ? all : '"'))
					: quoted
					// within double-quoted string
						? (quoted = !quot, (quoted ? all : '"'))
						:
					(
						(lftPrn
								? (parenDepth++, pathStart[parenDepth] = index++, lftPrn)
								: "")
						+ (space
							? (parenDepth
								? ""
								//: (pushBindings(), named
								//	? (named = isAlias = false, "\b")
								//	: ",")
								: named
									? (named = isAlias = false, "\b")
									: ","
							)
							: eq
					// named param
					// Insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash
								? (parenDepth && syntaxError(params), named = path, /*pushBindings(),*/isAlias = path.charAt(0) === "~", '\b' + path + ':')
								: path
					// path
									? (path.split("^").join(".").replace(rPath, parsePath)
										+ (prn
											? (fnCall[++parenDepth] = true, path.charAt(0) !== "." && (pathStart[parenDepth] = index), prn)
											: operator)
									)
									: operator
										? operator
										: rtPrn
					// function
											? ((fnCall[parenDepth--] = false, rtPrn)
												+ (prn
													? (fnCall[++parenDepth] = true, prn)
													: "")
											)
											: comma
												? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
												: lftPrn0
													? ""
													: (aposed = apos, quoted = quot, '"')
					))
				);
      }
    }

    var named, isAlias,// list,
			tmplLinks = tmpl.links,
			fnCall = {},
			pathStart = { 0: -1 },
			parenDepth = 0,
			quoted = false, // boolean for string content in double quotes
			aposed = false; // or in single quotes

    //pushBindings();

    return (params + " ").replace(rParams, parseTokens);
  }

  //==========
  // Utilities
  //==========

  // Merge objects, in particular contexts which inherit from parent contexts
  function extendCtx(context, parentContext) {
    // Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
    // If neither context nor parentContext are undefined, return undefined
    return context && context !== parentContext
			? (parentContext
				? $extend($extend({}, parentContext), context)
				: context)
			: parentContext && $extend({}, parentContext);
  }

  // Get character entity for HTML and Attribute encoding
  function getCharEntity(ch) {
    return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
  }

  //========================== Initialize ==========================

  for (jsvStoreName in jsvStores) {
    registerStore(jsvStoreName, jsvStores[jsvStoreName]);
  }

  var $templates = $views.templates,
		$converters = $views.converters,
		$helpers = $views.helpers,
		$tags = $views.tags,
		$viewsSub = $views.sub,
		$viewsSettings = $views.settings;

  if (jQuery) {
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // jQuery is loaded, so make $ the jQuery object
    $ = jQuery;
    $.fn.render = renderContent;

  } else {
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // jQuery is not loaded.

    $ = global.jsviews = {};

    $.isArray = Array && Array.isArray || function (obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };

    //	//========================== Future Node.js support ==========================
    //	if ((nodeJsModule = global.module) && nodeJsModule.exports) {
    //		nodeJsModule.exports = $;
    //	}
  }

  $.render = $render;
  $.views = $views;
  $.templates = $templates = $views.templates;

  //========================== Register tags ==========================

  $tags({
    "else": function () { }, // Does nothing but ensures {{else}} tags are recognized as valid
    "if": {
      render: function (val) {
        // This function is called once for {{if}} and once for each {{else}}.
        // We will use the tag.rendering object for carrying rendering state across the calls.
        // If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
        // Otherwise return ""
        var self = this,
					ret = (self.rendering.done || !val && (arguments.length || !self.tagCtx.index))
						? ""
						: (self.rendering.done = true, self.selected = self.tagCtx.index,
							// Test is satisfied, so render content on current context. We call tagCtx.render() rather than return undefined
							// (which would also render the tmpl/content on the current context but would iterate if it is an array)
							self.tagCtx.render());
        return ret;
      },
      onUpdate: function (ev, eventArgs, tagCtxs) {
        var tci, prevArg, different;
        for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
          prevArg = prevArg.args[0];
          different = !prevArg !== !tagCtxs[tci].args[0];
          if (!!prevArg || different) {
            return different;
            // If newArg and prevArg are both truthy, return false to cancel update. (Even if values on later elses are different, we still don't want to update, since rendered output would be unchanged)
            // If newArg and prevArg are different, return true, to update
            // If newArg and prevArg are both falsey, move to the next {{else ...}}
          }
        }
        // Boolean value of all args are unchanged (falsey), so return false to cancel update
        return false;
      },
      flow: true
    },
    "for": {
      render: function (val) {
        // This function is called once for {{for}} and once for each {{else}}.
        // We will use the tag.rendering object for carrying rendering state across the calls.
        var self = this,
					tagCtx = self.tagCtx,
					noArg = !arguments.length,
					result = "",
					done = noArg || 0;

        if (!self.rendering.done) {
          if (noArg) {
            result = undefined;
          } else if (val !== undefined) {
            result += tagCtx.render(val);
            // {{for}} (or {{else}}) with no argument will render the block content
            done += $.isArray(val) ? val.length : 1;
          }
          if (self.rendering.done = done) {
            self.selected = tagCtx.index;
          }
          // If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
        }
        return result;
      },
      //onUpdate: function(ev, eventArgs, tagCtxs) {
      //Consider adding filtering for perf optimization. However the below prevents update on some scenarios which _should_ update - namely when there is another array on which for also depends.
      //var i, l, tci, prevArg;
      //for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
      //	if (prevArg.args[0] !== tagCtxs[tci].args[0]) {
      //		return true;
      //	}
      //}
      //return false;
      //},
      onArrayChange: function (ev, eventArgs) {
        var arrayView,
					self = this,
					change = eventArgs.change;
        if (this.tagCtxs[1] && ( // There is an {{else}}
						   change === "insert" && ev.target.length === eventArgs.items.length // inserting, and new length is same as inserted length, so going from 0 to n
						|| change === "remove" && !ev.target.length // removing , and new length 0, so going from n to 0
						|| change === "refresh" && !eventArgs.oldItems.length !== !ev.target.length // refreshing, and length is going from 0 to n or from n to 0
					)) {
          this.refresh();
        } else {
          for (arrayView in self._.arrVws) {
            arrayView = self._.arrVws[arrayView];
            if (arrayView.data === ev.target) {
              arrayView._.onArrayChange.apply(arrayView, arguments);
            }
          }
        }
        ev.done = true;
      },
      flow: true
    },
    include: {
      flow: true
    },
    "*": {
      // {{* code... }} - Ignored if template.allowCode is false. Otherwise include code in compiled template
      render: function (value) {
        return value; // Include the code.
      },
      flow: true
    }
  });

  //========================== Register converters ==========================

  $converters({
    html: function (text) {
      // HTML encode: Replace < > & and ' and " by corresponding entities.
      return text != undefined ? String(text).replace(rHtmlEncode, getCharEntity) : ""; // null and undefined return ""
    },
    attr: function (text) {
      // Attribute encode: Replace < > & ' and " by corresponding entities.
      return text != undefined ? String(text).replace(rAttrEncode, getCharEntity) : text === null ? null : ""; // null returns null, e.g. to remove attribute. undefined returns ""
    },
    url: function (text) {
      // URL encoding helper.
      return text != undefined ? encodeURI(String(text)) : text === null ? null : ""; // null returns null, e.g. to remove attribute. undefined returns ""
    }
  });

  //========================== Define default delimiters ==========================
  $viewsDelimiters();

})(this, this.jQuery);

//#endregion End jsrender

//#region parseJSON extension

/*!
* http://erraticdev.blogspot.com/2010/12/converting-dates-in-json-strings-using.html
* jQuery.parseJSON() extension (supports ISO & Asp.net date conversion)
*
* Version 1.0 (13 Jan 2011)
*
* Copyright (c) 2011 Robert Koritnik
* Licensed under the terms of the MIT license
* http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {

  // JSON RegExp
  var rvalidchars = /^[\],:{}\s]*$/;
  var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
  var dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;
  var dateNet = /\/Date\((\d+)(?:-\d+)?\)\//i;

  // replacer RegExp
  var replaceISO = /"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:[.,](\d+))?Z"/i;
  var replaceNet = /"\\\/Date\((\d+)(?:-\d+)?\)\\\/"/i;

  // determine JSON native support
  var nativeJSON = (window.JSON && window.JSON.parse) ? true : false;
  var extendedJSON = nativeJSON && window.JSON.parse('{"x":9}', function (k, v) { return "Y"; }) === "Y";

  var jsonDateConverter = function (key, value) {
    if (typeof (value) === "string") {
      if (dateISO.test(value)) {
        return new Date(value);
      }
      if (dateNet.test(value)) {
        return new Date(parseInt(dateNet.exec(value)[1], 10));
      }
    }
    return value;
  };

  $.extend({
    parseJSON: function (data, convertDates) {
      /// <summary>Takes a well-formed JSON string and returns the resulting JavaScript object.</summary>
      /// <param name="data" type="String">The JSON string to parse.</param>
      /// <param name="convertDates" optional="true" type="Boolean">Set to true when you want ISO/Asp.net dates to be auto-converted to dates.</param>
      if (typeof data !== "string" || !data) {
        return null;
      }

      // Make sure leading/trailing whitespace is removed (IE can't handle it)
      data = $.trim(data);

      // Make sure the incoming data is actual JSON
      // Logic borrowed from http://json.org/json2.js
      if (rvalidchars.test(data
								.replace(rvalidescape, "@")
								.replace(rvalidtokens, "]")
								.replace(rvalidbraces, ""))) {
        // Try to use the native JSON parser
        if (extendedJSON || (nativeJSON && convertDates !== true)) {
          return window.JSON.parse(data, convertDates === true ? jsonDateConverter : undefined);
        }
        else {
          data = convertDates === true ?
												data.replace(replaceISO, "new Date(parseInt('$1',10),parseInt('$2',10)-1,parseInt('$3',10),parseInt('$4',10),parseInt('$5',10),parseInt('$6',10),(function(s){return parseInt(s,10)||0;})('$7'))")
														.replace(replaceNet, "new Date($1)") :
												data;
          return (new Function("return " + data))();
        }
      } else {
        $.error("Invalid JSON: " + data);
      }
    }
  });
})(jQuery);

//#endregion parseJSON extension

//#region jsTree

/*
 * jsTree 1.0-rc3
 * http://jstree.com/
 *
 * Copyright (c) 2010 Ivan Bozhanov (vakata.com)
 *
 * Licensed same as jquery - under the terms of either the MIT License or the GPL Version 2 License
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Date: 2011-02-09 01:17:14 +0200 (ср, 09 февр 2011) $
 * $Revision: 236 $
 */

/*jslint browser: true, onevar: true, undef: true, bitwise: true, strict: true */
/*global window : false, clearInterval: false, clearTimeout: false, document: false, setInterval: false, setTimeout: false, jQuery: false, navigator: false, XSLTProcessor: false, DOMParser: false, XMLSerializer: false, ActiveXObject: false */

"use strict";

// top wrapper to prevent multiple inclusion (is this OK?)
(function () {
  if (jQuery && jQuery.jstree) { return; }
  var is_ie6 = false, is_ie7 = false, is_ff2 = false;

  /* 
   * jsTree core
   */
  (function ($) {
    // Common functions not related to jsTree 
    // decided to move them to a `vakata` "namespace"
    $.vakata = {};
    // CSS related functions
    $.vakata.css = {
      get_css: function (rule_name, delete_flag, sheet) {
        rule_name = rule_name.toLowerCase();
        var css_rules = sheet.cssRules || sheet.rules,
          j = 0;
        do {
          if (css_rules.length && j > css_rules.length + 5) { return false; }
          if (css_rules[j].selectorText && css_rules[j].selectorText.toLowerCase() == rule_name) {
            if (delete_flag === true) {
              if (sheet.removeRule) { sheet.removeRule(j); }
              if (sheet.deleteRule) { sheet.deleteRule(j); }
              return true;
            }
            else { return css_rules[j]; }
          }
        }
        while (css_rules[++j]);
        return false;
      },
      add_css: function (rule_name, sheet) {
        if ($.jstree.css.get_css(rule_name, false, sheet)) { return false; }
        if (sheet.insertRule) { sheet.insertRule(rule_name + ' { }', 0); } else { sheet.addRule(rule_name, null, 0); }
        return $.vakata.css.get_css(rule_name);
      },
      remove_css: function (rule_name, sheet) {
        return $.vakata.css.get_css(rule_name, true, sheet);
      },
      add_sheet: function (opts) {
        var tmp = false, is_new = true;
        if (opts.str) {
          if (opts.title) { tmp = $("style[id='" + opts.title + "-stylesheet']")[0]; }
          if (tmp) { is_new = false; }
          else {
            tmp = document.createElement("style");
            tmp.setAttribute('type', "text/css");
            if (opts.title) { tmp.setAttribute("id", opts.title + "-stylesheet"); }
          }
          if (tmp.styleSheet) {
            if (is_new) {
              document.getElementsByTagName("head")[0].appendChild(tmp);
              tmp.styleSheet.cssText = opts.str;
            }
            else {
              tmp.styleSheet.cssText = tmp.styleSheet.cssText + " " + opts.str;
            }
          }
          else {
            tmp.appendChild(document.createTextNode(opts.str));
            document.getElementsByTagName("head")[0].appendChild(tmp);
          }
          return tmp.sheet || tmp.styleSheet;
        }
        if (opts.url) {
          if (document.createStyleSheet) {
            try { tmp = document.createStyleSheet(opts.url); } catch (e) { }
          }
          else {
            tmp = document.createElement('link');
            tmp.rel = 'stylesheet';
            tmp.type = 'text/css';
            tmp.media = "all";
            tmp.href = opts.url;
            document.getElementsByTagName("head")[0].appendChild(tmp);
            return tmp.styleSheet;
          }
        }
      }
    };

    // private variables 
    var instances = [],			// instance array (used by $.jstree.reference/create/focused)
      focused_instance = -1,	// the index in the instance array of the currently focused instance
      plugins = {},			// list of included plugins
      prepared_move = {};		// for the move_node function

    // jQuery plugin wrapper (thanks to jquery UI widget function)
    $.fn.jstree = function (settings) {
      var isMethodCall = (typeof settings == 'string'), // is this a method call like $().jstree("open_node")
        args = Array.prototype.slice.call(arguments, 1),
        returnValue = this;

      // if a method call execute the method on all selected instances
      if (isMethodCall) {
        if (settings.substring(0, 1) == '_') { return returnValue; }
        this.each(function () {
          var instance = instances[$.data(this, "jstree_instance_id")],
            methodValue = (instance && $.isFunction(instance[settings])) ? instance[settings].apply(instance, args) : instance;
          if (typeof methodValue !== "undefined" && (settings.indexOf("is_") === 0 || (methodValue !== true && methodValue !== false))) { returnValue = methodValue; return false; }
        });
      }
      else {
        this.each(function () {
          // extend settings and allow for multiple hashes and $.data
          var instance_id = $.data(this, "jstree_instance_id"),
            a = [],
            b = settings ? $.extend({}, true, settings) : {},
            c = $(this),
            s = false,
            t = [];
          a = a.concat(args);
          if (c.data("jstree")) { a.push(c.data("jstree")); }
          b = a.length ? $.extend.apply(null, [true, b].concat(a)) : b;

          // if an instance already exists, destroy it first
          if (typeof instance_id !== "undefined" && instances[instance_id]) { instances[instance_id].destroy(); }
          // push a new empty object to the instances array
          instance_id = parseInt(instances.push({}), 10) - 1;
          // store the jstree instance id to the container element
          $.data(this, "jstree_instance_id", instance_id);
          // clean up all plugins
          b.plugins = $.isArray(b.plugins) ? b.plugins : $.jstree.defaults.plugins.slice();
          b.plugins.unshift("core");
          // only unique plugins
          b.plugins = b.plugins.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");

          // extend defaults with passed data
          s = $.extend(true, {}, $.jstree.defaults, b);
          s.plugins = b.plugins;
          $.each(plugins, function (i, val) {
            if ($.inArray(i, s.plugins) === -1) { s[i] = null; delete s[i]; }
            else { t.push(i); }
          });
          s.plugins = t;

          // push the new object to the instances array (at the same time set the default classes to the container) and init
          instances[instance_id] = new $.jstree._instance(instance_id, $(this).addClass("jstree jstree-" + instance_id), s);
          // init all activated plugins for this instance
          $.each(instances[instance_id]._get_settings().plugins, function (i, val) { instances[instance_id].data[val] = {}; });
          $.each(instances[instance_id]._get_settings().plugins, function (i, val) { if (plugins[val]) { plugins[val].__init.apply(instances[instance_id]); } });
          // initialize the instance
          setTimeout(function () { if (instances[instance_id]) { instances[instance_id].init(); } }, 0);
        });
      }
      // return the jquery selection (or if it was a method call that returned a value - the returned value)
      return returnValue;
    };
    // object to store exposed functions and objects
    $.jstree = {
      defaults: {
        plugins: []
      },
      _focused: function () { return instances[focused_instance] || null; },
      _reference: function (needle) {
        // get by instance id
        if (instances[needle]) { return instances[needle]; }
        // get by DOM (if still no luck - return null
        var o = $(needle);
        if (!o.length && typeof needle === "string") { o = $("#" + needle); }
        if (!o.length) { return null; }
        return instances[o.closest(".jstree").data("jstree_instance_id")] || null;
      },
      _instance: function (index, container, settings) {
        // for plugins to store data in
        this.data = { core: {} };
        this.get_settings = function () { return $.extend(true, {}, settings); };
        this._get_settings = function () { return settings; };
        this.get_index = function () { return index; };
        this.get_container = function () { return container; };
        this.get_container_ul = function () { return container.children("ul:eq(0)"); };
        this._set_settings = function (s) {
          settings = $.extend(true, {}, settings, s);
        };
      },
      _fn: {},
      plugin: function (pname, pdata) {
        pdata = $.extend({}, {
          __init: $.noop,
          __destroy: $.noop,
          _fn: {},
          defaults: false
        }, pdata);
        plugins[pname] = pdata;

        $.jstree.defaults[pname] = pdata.defaults;
        $.each(pdata._fn, function (i, val) {
          val.plugin = pname;
          val.old = $.jstree._fn[i];
          $.jstree._fn[i] = function () {
            var rslt,
              func = val,
              args = Array.prototype.slice.call(arguments),
              evnt = new $.Event("before.jstree"),
              rlbk = false;

            if (this.data.core.locked === true && i !== "unlock" && i !== "is_locked") { return; }

            // Check if function belongs to the included plugins of this instance
            do {
              if (func && func.plugin && $.inArray(func.plugin, this._get_settings().plugins) !== -1) { break; }
              func = func.old;
            } while (func);
            if (!func) { return; }

            // context and function to trigger events, then finally call the function
            if (i.indexOf("_") === 0) {
              rslt = func.apply(this, args);
            }
            else {
              rslt = this.get_container().triggerHandler(evnt, { "func": i, "inst": this, "args": args, "plugin": func.plugin });
              if (rslt === false) { return; }
              if (typeof rslt !== "undefined") { args = rslt; }

              rslt = func.apply(
                $.extend({}, this, {
                  __callback: function (data) {
                    this.get_container().triggerHandler(i + '.jstree', { "inst": this, "args": args, "rslt": data, "rlbk": rlbk });
                  },
                  __rollback: function () {
                    rlbk = this.get_rollback();
                    return rlbk;
                  },
                  __call_old: function (replace_arguments) {
                    return func.old.apply(this, (replace_arguments ? Array.prototype.slice.call(arguments, 1) : args));
                  }
                }), args);
            }

            // return the result
            return rslt;
          };
          $.jstree._fn[i].old = val.old;
          $.jstree._fn[i].plugin = pname;
        });
      },
      rollback: function (rb) {
        if (rb) {
          if (!$.isArray(rb)) { rb = [rb]; }
          $.each(rb, function (i, val) {
            instances[val.i].set_rollback(val.h, val.d);
          });
        }
      }
    };
    // set the prototype for all instances
    $.jstree._fn = $.jstree._instance.prototype = {};

    // load the css when DOM is ready
    $(function () {
      // code is copied from jQuery ($.browser is deprecated + there is a bug in IE)
      var u = navigator.userAgent.toLowerCase(),
        v = (u.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
        css_string = '' +
          '.jstree ul, .jstree li { display:block; margin:0 0 0 0; padding:0 0 0 0; list-style-type:none; } ' +
          '.jstree li { display:block; min-height:18px; line-height:18px; white-space:nowrap; margin-left:18px; min-width:18px; } ' +
          '.jstree-rtl li { margin-left:0; margin-right:18px; } ' +
          '.jstree > ul > li { margin-left:0px; } ' +
          '.jstree-rtl > ul > li { margin-right:0px; } ' +
          '.jstree ins { display:inline-block; text-decoration:none; width:18px; height:18px; margin:0 0 0 0; padding:0; } ' +
          '.jstree a { display:inline-block; line-height:16px; height:16px; color:black; white-space:nowrap; text-decoration:none; padding:1px 2px; margin:0; } ' +
          '.jstree a:focus { outline: none; } ' +
          '.jstree a > ins { height:16px; width:16px; } ' +
          '.jstree a > .jstree-icon { margin-right:3px; } ' +
          '.jstree-rtl a > .jstree-icon { margin-left:3px; margin-right:0; } ' +
          'li.jstree-open > ul { display:block; } ' +
          'li.jstree-closed > ul { display:none; } ';
      // Correct IE 6 (does not support the > CSS selector)
      if (/msie/.test(u) && parseInt(v, 10) == 6) {
        is_ie6 = true;

        // fix image flicker and lack of caching
        try {
          document.execCommand("BackgroundImageCache", false, true);
        } catch (err) { }

        css_string += '' +
          '.jstree li { height:18px; margin-left:0; margin-right:0; } ' +
          '.jstree li li { margin-left:18px; } ' +
          '.jstree-rtl li li { margin-left:0px; margin-right:18px; } ' +
          'li.jstree-open ul { display:block; } ' +
          'li.jstree-closed ul { display:none !important; } ' +
          '.jstree li a { display:inline; border-width:0 !important; padding:0px 2px !important; } ' +
          '.jstree li a ins { height:16px; width:16px; margin-right:3px; } ' +
          '.jstree-rtl li a ins { margin-right:0px; margin-left:3px; } ';
      }
      // Correct IE 7 (shifts anchor nodes onhover)
      if (/msie/.test(u) && parseInt(v, 10) == 7) {
        is_ie7 = true;
        css_string += '.jstree li a { border-width:0 !important; padding:0px 2px !important; } ';
      }
      // correct ff2 lack of display:inline-block
      if (!/compatible/.test(u) && /mozilla/.test(u) && parseFloat(v, 10) < 1.9) {
        is_ff2 = true;
        css_string += '' +
          '.jstree ins { display:-moz-inline-box; } ' +
          '.jstree li { line-height:12px; } ' + // WHY??
          '.jstree a { display:-moz-inline-box; } ' +
          '.jstree .jstree-no-icons .jstree-checkbox { display:-moz-inline-stack !important; } ';
        /* this shouldn't be here as it is theme specific */
      }
      // the default stylesheet
      $.vakata.css.add_sheet({ str: css_string, title: "jstree" });
    });

    // core functions (open, close, create, update, delete)
    $.jstree.plugin("core", {
      __init: function () {
        this.data.core.locked = false;
        this.data.core.to_open = this.get_settings().core.initially_open;
        this.data.core.to_load = this.get_settings().core.initially_load;
      },
      defaults: {
        html_titles: false,
        animation: 500,
        initially_open: [],
        initially_load: [],
        open_parents: true,
        notify_plugins: true,
        rtl: false,
        load_open: false,
        strings: {
          loading: "Loading ...",
          new_node: "New node",
          multiple_selection: "Multiple selection"
        }
      },
      _fn: {
        init: function () {
          this.set_focus();
          if (this._get_settings().core.rtl) {
            this.get_container().addClass("jstree-rtl").css("direction", "rtl");
          }
          this.get_container().html("<ul><li class='jstree-last jstree-leaf'><ins>&#160;</ins><a class='jstree-loading' href='#'><ins class='jstree-icon'>&#160;</ins>" + this._get_string("loading") + "</a></li></ul>");
          this.data.core.li_height = this.get_container_ul().find("li.jstree-closed, li.jstree-leaf").eq(0).height() || 18;

          this.get_container()
            .delegate("li > ins", "click.jstree", $.proxy(function (event) {
              var trgt = $(event.target);
              // if(trgt.is("ins") && event.pageY - trgt.offset().top < this.data.core.li_height) { this.toggle_node(trgt); }
              this.toggle_node(trgt);
            }, this))
            .bind("mousedown.jstree", $.proxy(function () {
              this.set_focus(); // This used to be setTimeout(set_focus,0) - why?
            }, this))
            .bind("dblclick.jstree", function (event) {
              var sel;
              if (document.selection && document.selection.empty) { document.selection.empty(); }
              else {
                if (window.getSelection) {
                  sel = window.getSelection();
                  try {
                    sel.removeAllRanges();
                    sel.collapse();
                  } catch (err) { }
                }
              }
            });
          if (this._get_settings().core.notify_plugins) {
            this.get_container()
              .bind("load_node.jstree", $.proxy(function (e, data) {
                var o = this._get_node(data.rslt.obj),
									t = this;
                if (o === -1) { o = this.get_container_ul(); }
                if (!o.length) { return; }
                o.find("li").each(function () {
                  var th = $(this);
                  if (th.data("jstree")) {
                    $.each(th.data("jstree"), function (plugin, values) {
                      if (t.data[plugin] && $.isFunction(t["_" + plugin + "_notify"])) {
                        t["_" + plugin + "_notify"].call(t, th, values);
                      }
                    });
                  }
                });
              }, this));
          }
          if (this._get_settings().core.load_open) {
            this.get_container()
              .bind("load_node.jstree", $.proxy(function (e, data) {
                var o = this._get_node(data.rslt.obj),
									t = this;
                if (o === -1) { o = this.get_container_ul(); }
                if (!o.length) { return; }
                o.find("li.jstree-open:not(:has(ul))").each(function () {
                  t.load_node(this, $.noop, $.noop);
                });
              }, this));
          }
          this.__callback();
          this.load_node(-1, function () { this.loaded(); this.reload_nodes(); });
        },
        destroy: function () {
          var i,
            n = this.get_index(),
            s = this._get_settings(),
            _this = this;

          $.each(s.plugins, function (i, val) {
            try { plugins[val].__destroy.apply(_this); } catch (err) { }
          });
          this.__callback();
          // set focus to another instance if this one is focused
          if (this.is_focused()) {
            for (i in instances) {
              if (instances.hasOwnProperty(i) && i != n) {
                instances[i].set_focus();
                break;
              }
            }
          }
          // if no other instance found
          if (n === focused_instance) { focused_instance = -1; }
          // remove all traces of jstree in the DOM (only the ones set using jstree*) and cleans all events
          this.get_container()
            .unbind(".jstree")
            .undelegate(".jstree")
            .removeData("jstree_instance_id")
            .find("[class^='jstree']")
              .addBack()
              .attr("class", function () { return this.className.replace(/jstree[^ ]*|$/ig, ''); });
          $(document)
            .unbind(".jstree-" + n)
            .undelegate(".jstree-" + n);
          // remove the actual data
          instances[n] = null;
          delete instances[n];
        },

        _core_notify: function (n, data) {
          if (data.opened) {
            this.open_node(n, false, true);
          }
        },

        lock: function () {
          this.data.core.locked = true;
          this.get_container().children("ul").addClass("jstree-locked").css("opacity", "0.7");
          this.__callback({});
        },
        unlock: function () {
          this.data.core.locked = false;
          this.get_container().children("ul").removeClass("jstree-locked").css("opacity", "1");
          this.__callback({});
        },
        is_locked: function () { return this.data.core.locked; },
        save_opened: function () {
          var _this = this;
          this.data.core.to_open = [];
          this.get_container_ul().find("li.jstree-open").each(function () {
            if (this.id) { _this.data.core.to_open.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:")); }
          });
          this.__callback(_this.data.core.to_open);
        },
        save_loaded: function () { },
        reload_nodes: function (is_callback) {
          var _this = this,
            done = true,
            current = [],
            remaining = [];
          if (!is_callback) {
            this.data.core.reopen = false;
            this.data.core.refreshing = true;
            this.data.core.to_open = $.map($.makeArray(this.data.core.to_open), function (n) { return "#" + n.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"); });
            this.data.core.to_load = $.map($.makeArray(this.data.core.to_load), function (n) { return "#" + n.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"); });
            if (this.data.core.to_open.length) {
              this.data.core.to_load = this.data.core.to_load.concat(this.data.core.to_open);
            }
          }
          if (this.data.core.to_load.length) {
            $.each(this.data.core.to_load, function (i, val) {
              if (val == "#") { return true; }
              if ($(val).length) { current.push(val); }
              else { remaining.push(val); }
            });
            if (current.length) {
              this.data.core.to_load = remaining;
              $.each(current, function (i, val) {
                if (!_this._is_loaded(val)) {
                  _this.load_node(val, function () { _this.reload_nodes(true); }, function () { _this.reload_nodes(true); });
                  done = false;
                }
              });
            }
          }
          if (this.data.core.to_open.length) {
            $.each(this.data.core.to_open, function (i, val) {
              _this.open_node(val, false, true);
            });
          }
          if (done) {
            // TODO: find a more elegant approach to syncronizing returning requests
            if (this.data.core.reopen) { clearTimeout(this.data.core.reopen); }
            this.data.core.reopen = setTimeout(function () { _this.__callback({}, _this); }, 50);
            this.data.core.refreshing = false;
            this.reopen();
          }
        },
        reopen: function () {
          var _this = this;
          if (this.data.core.to_open.length) {
            $.each(this.data.core.to_open, function (i, val) {
              _this.open_node(val, false, true);
            });
          }
          this.__callback({});
        },
        refresh: function (obj) {
          var _this = this;
          this.save_opened();
          if (!obj) { obj = -1; }
          obj = this._get_node(obj);
          if (!obj) { obj = -1; }
          if (obj !== -1) { obj.children("UL").remove(); }
          else { this.get_container_ul().empty(); }
          this.load_node(obj, function () { _this.__callback({ "obj": obj }); _this.reload_nodes(); });
        },
        // Dummy function to fire after the first load (so that there is a jstree.loaded event)
        loaded: function () {
          this.__callback();
        },
        // deal with focus
        set_focus: function () {
          if (this.is_focused()) { return; }
          var f = $.jstree._focused();
          if (f) { f.unset_focus(); }

          this.get_container().addClass("jstree-focused");
          focused_instance = this.get_index();
          this.__callback();
        },
        is_focused: function () {
          return focused_instance == this.get_index();
        },
        unset_focus: function () {
          if (this.is_focused()) {
            this.get_container().removeClass("jstree-focused");
            focused_instance = -1;
          }
          this.__callback();
        },

        // traverse
        _get_node: function (obj) {
          var $obj = $(obj, this.get_container());
          if ($obj.is(".jstree") || obj == -1) { return -1; }
          $obj = $obj.closest("li", this.get_container());
          return $obj.length ? $obj : false;
        },
        _get_next: function (obj, strict) {
          obj = this._get_node(obj);
          if (obj === -1) { return this.get_container().find("> ul > li:first-child"); }
          if (!obj.length) { return false; }
          if (strict) { return (obj.nextAll("li").size() > 0) ? obj.nextAll("li:eq(0)") : false; }

          if (obj.hasClass("jstree-open")) { return obj.find("li:eq(0)"); }
          else if (obj.nextAll("li").size() > 0) { return obj.nextAll("li:eq(0)"); }
          else { return obj.parentsUntil(".jstree", "li").next("li").eq(0); }
        },
        _get_prev: function (obj, strict) {
          obj = this._get_node(obj);
          if (obj === -1) { return this.get_container().find("> ul > li:last-child"); }
          if (!obj.length) { return false; }
          if (strict) { return (obj.prevAll("li").length > 0) ? obj.prevAll("li:eq(0)") : false; }

          if (obj.prev("li").length) {
            obj = obj.prev("li").eq(0);
            while (obj.hasClass("jstree-open")) { obj = obj.children("ul:eq(0)").children("li:last"); }
            return obj;
          }
          else { var o = obj.parentsUntil(".jstree", "li:eq(0)"); return o.length ? o : false; }
        },
        _get_parent: function (obj) {
          obj = this._get_node(obj);
          if (obj == -1 || !obj.length) { return false; }
          var o = obj.parentsUntil(".jstree", "li:eq(0)");
          return o.length ? o : -1;
        },
        _get_children: function (obj) {
          obj = this._get_node(obj);
          if (obj === -1) { return this.get_container().children("ul:eq(0)").children("li"); }
          if (!obj.length) { return false; }
          return obj.children("ul:eq(0)").children("li");
        },
        get_path: function (obj, id_mode) {
          var p = [],
            _this = this;
          obj = this._get_node(obj);
          if (obj === -1 || !obj || !obj.length) { return false; }
          obj.parentsUntil(".jstree", "li").each(function () {
            p.push(id_mode ? this.id : _this.get_text(this));
          });
          p.reverse();
          p.push(id_mode ? obj.attr("id") : this.get_text(obj));
          return p;
        },

        // string functions
        _get_string: function (key) {
          return this._get_settings().core.strings[key] || key;
        },

        is_open: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-open"); },
        is_closed: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-closed"); },
        is_leaf: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-leaf"); },
        correct_state: function (obj) {
          obj = this._get_node(obj);
          if (!obj || obj === -1) { return false; }
          obj.removeClass("jstree-closed jstree-open").addClass("jstree-leaf").children("ul").remove();
          this.__callback({ "obj": obj });
        },
        // open/close
        open_node: function (obj, callback, skip_animation) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          if (!obj.hasClass("jstree-closed")) { if (callback) { callback.call(); } return false; }
          var s = skip_animation || is_ie6 ? 0 : this._get_settings().core.animation,
            t = this;
          if (!this._is_loaded(obj)) {
            obj.children("a").addClass("jstree-loading");
            this.load_node(obj, function () { t.open_node(obj, callback, skip_animation); }, callback);
          }
          else {
            if (this._get_settings().core.open_parents) {
              obj.parentsUntil(".jstree", ".jstree-closed").each(function () {
                t.open_node(this, false, true);
              });
            }
            if (s) { obj.children("ul").css("display", "none"); }
            obj.removeClass("jstree-closed").addClass("jstree-open").children("a").removeClass("jstree-loading");
            if (s) { obj.children("ul").stop(true, true).slideDown(s, function () { this.style.display = ""; t.after_open(obj); }); }
            else { t.after_open(obj); }
            this.__callback({ "obj": obj });
            if (callback) { callback.call(); }
          }
        },
        after_open: function (obj) { this.__callback({ "obj": obj }); },
        close_node: function (obj, skip_animation) {
          obj = this._get_node(obj);
          var s = skip_animation || is_ie6 ? 0 : this._get_settings().core.animation,
            t = this;
          if (!obj.length || !obj.hasClass("jstree-open")) { return false; }
          if (s) { obj.children("ul").attr("style", "display:block !important"); }
          obj.removeClass("jstree-open").addClass("jstree-closed");
          if (s) { obj.children("ul").stop(true, true).slideUp(s, function () { this.style.display = ""; t.after_close(obj); }); }
          else { t.after_close(obj); }
          this.__callback({ "obj": obj });
        },
        after_close: function (obj) { this.__callback({ "obj": obj }); },
        toggle_node: function (obj) {
          obj = this._get_node(obj);
          if (obj.hasClass("jstree-closed")) { return this.open_node(obj); }
          if (obj.hasClass("jstree-open")) { return this.close_node(obj); }
        },
        open_all: function (obj, do_animation, original_obj) {
          obj = obj ? this._get_node(obj) : -1;
          if (!obj || obj === -1) { obj = this.get_container_ul(); }
          if (original_obj) {
            obj = obj.find("li.jstree-closed");
          }
          else {
            original_obj = obj;
            if (obj.is(".jstree-closed")) { obj = obj.find("li.jstree-closed").addBack(); }
            else { obj = obj.find("li.jstree-closed"); }
          }
          var _this = this;
          obj.each(function () {
            var __this = this;
            if (!_this._is_loaded(this)) { _this.open_node(this, function () { _this.open_all(__this, do_animation, original_obj); }, !do_animation); }
            else { _this.open_node(this, false, !do_animation); }
          });
          // so that callback is fired AFTER all nodes are open
          if (original_obj.find('li.jstree-closed').length === 0) { this.__callback({ "obj": original_obj }); }
        },
        close_all: function (obj, do_animation) {
          var _this = this;
          obj = obj ? this._get_node(obj) : this.get_container();
          if (!obj || obj === -1) { obj = this.get_container_ul(); }
          obj.find("li.jstree-open").addBack().each(function () { _this.close_node(this, !do_animation); });
          this.__callback({ "obj": obj });
        },
        clean_node: function (obj) {
          obj = obj && obj != -1 ? $(obj) : this.get_container_ul();
          obj = obj.is("li") ? obj.find("li").addBack() : obj.find("li");
          obj.removeClass("jstree-last")
            .filter("li:last-child").addClass("jstree-last").end()
            .filter(":has(li)")
              .not(".jstree-open").removeClass("jstree-leaf").addClass("jstree-closed");
          obj.not(".jstree-open, .jstree-closed").addClass("jstree-leaf").children("ul").remove();
          this.__callback({ "obj": obj });
        },
        // rollback
        get_rollback: function () {
          this.__callback();
          return { i: this.get_index(), h: this.get_container().children("ul").clone(true), d: this.data };
        },
        set_rollback: function (html, data) {
          this.get_container().empty().append(html);
          this.data = data;
          this.__callback();
        },
        // Dummy functions to be overwritten by any datastore plugin included
        load_node: function (obj, s_call, e_call) { this.__callback({ "obj": obj }); },
        _is_loaded: function (obj) { return true; },

        // Basic operations: create
        create_node: function (obj, position, js, callback, is_loaded) {
          obj = this._get_node(obj);
          position = typeof position === "undefined" ? "last" : position;
          var d = $("<li />"),
            s = this._get_settings().core,
            tmp;

          if (obj !== -1 && !obj.length) { return false; }
          if (!is_loaded && !this._is_loaded(obj)) { this.load_node(obj, function () { this.create_node(obj, position, js, callback, true); }); return false; }

          this.__rollback();

          if (typeof js === "string") { js = { "data": js }; }
          if (!js) { js = {}; }
          if (js.attr) { d.attr(js.attr); }
          if (js.metadata) { d.data(js.metadata); }
          if (js.state) { d.addClass("jstree-" + js.state); }
          if (!js.data) { js.data = this._get_string("new_node"); }
          if (!$.isArray(js.data)) { tmp = js.data; js.data = []; js.data.push(tmp); }
          $.each(js.data, function (i, m) {
            tmp = $("<a />");
            if ($.isFunction(m)) { m = m.call(this, js); }
            if (typeof m == "string") { tmp.attr('href', '#')[s.html_titles ? "html" : "text"](m); }
            else {
              if (!m.attr) { m.attr = {}; }
              if (!m.attr.href) { m.attr.href = '#'; }
              tmp.attr(m.attr)[s.html_titles ? "html" : "text"](m.title);
              if (m.language) { tmp.addClass(m.language); }
            }
            tmp.prepend("<ins class='jstree-icon'>&#160;</ins>");
            if (!m.icon && js.icon) { m.icon = js.icon; }
            if (m.icon) {
              if (m.icon.indexOf("/") === -1) { tmp.children("ins").addClass(m.icon); }
              else { tmp.children("ins").css("background", "url('" + m.icon + "') center center no-repeat"); }
            }
            d.append(tmp);
          });
          d.prepend("<ins class='jstree-icon'>&#160;</ins>");
          if (obj === -1) {
            obj = this.get_container();
            if (position === "before") { position = "first"; }
            if (position === "after") { position = "last"; }
          }
          switch (position) {
            case "before": obj.before(d); tmp = this._get_parent(obj); break;
            case "after": obj.after(d); tmp = this._get_parent(obj); break;
            case "inside":
            case "first":
              if (!obj.children("ul").length) { obj.append("<ul />"); }
              obj.children("ul").prepend(d);
              tmp = obj;
              break;
            case "last":
              if (!obj.children("ul").length) { obj.append("<ul />"); }
              obj.children("ul").append(d);
              tmp = obj;
              break;
            default:
              if (!obj.children("ul").length) { obj.append("<ul />"); }
              if (!position) { position = 0; }
              tmp = obj.children("ul").children("li").eq(position);
              if (tmp.length) { tmp.before(d); }
              else { obj.children("ul").append(d); }
              tmp = obj;
              break;
          }
          if (tmp === -1 || tmp.get(0) === this.get_container().get(0)) { tmp = -1; }
          this.clean_node(tmp);
          this.__callback({ "obj": d, "parent": tmp });
          if (callback) { callback.call(this, d); }
          return d;
        },
        // Basic operations: rename (deal with text)
        get_text: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          var s = this._get_settings().core.html_titles;
          obj = obj.children("a:eq(0)");
          if (s) {
            obj = obj.clone();
            obj.children("INS").remove();
            return obj.html();
          }
          else {
            obj = obj.contents().filter(function () { return this.nodeType == 3; })[0];
            return obj.nodeValue;
          }
        },
        set_text: function (obj, val) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          obj = obj.children("a:eq(0)");
          if (this._get_settings().core.html_titles) {
            var tmp = obj.children("INS").clone();
            obj.html(val).prepend(tmp);
            this.__callback({ "obj": obj, "name": val });
            return true;
          }
          else {
            obj = obj.contents().filter(function () { return this.nodeType == 3; })[0];
            this.__callback({ "obj": obj, "name": val });
            return (obj.nodeValue = val);
          }
        },
        rename_node: function (obj, val) {
          obj = this._get_node(obj);
          this.__rollback();
          if (obj && obj.length && this.set_text.apply(this, Array.prototype.slice.call(arguments))) { this.__callback({ "obj": obj, "name": val }); }
        },
        // Basic operations: deleting nodes
        delete_node: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          this.__rollback();
          var p = this._get_parent(obj), prev = $([]), t = this;
          obj.each(function () {
            prev = prev.add(t._get_prev(this));
          });
          obj = obj.detach();
          if (p !== -1 && p.find("> ul > li").length === 0) {
            p.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
          }
          this.clean_node(p);
          this.__callback({ "obj": obj, "prev": prev, "parent": p });
          return obj;
        },
        prepare_move: function (o, r, pos, cb, is_cb) {
          var p = {};

          p.ot = $.jstree._reference(o) || this;
          p.o = p.ot._get_node(o);
          p.r = r === -1 ? -1 : this._get_node(r);
          p.p = (typeof pos === "undefined" || pos === false) ? "last" : pos; // TODO: move to a setting
          if (!is_cb && prepared_move.o && prepared_move.o[0] === p.o[0] && prepared_move.r[0] === p.r[0] && prepared_move.p === p.p) {
            this.__callback(prepared_move);
            if (cb) { cb.call(this, prepared_move); }
            return;
          }
          p.ot = $.jstree._reference(p.o) || this;
          p.rt = $.jstree._reference(p.r) || this; // r === -1 ? p.ot : $.jstree._reference(p.r) || this
          if (p.r === -1 || !p.r) {
            p.cr = -1;
            switch (p.p) {
              case "first":
              case "before":
              case "inside":
                p.cp = 0;
                break;
              case "after":
              case "last":
                p.cp = p.rt.get_container().find(" > ul > li").length;
                break;
              default:
                p.cp = p.p;
                break;
            }
          }
          else {
            if (!/^(before|after)$/.test(p.p) && !this._is_loaded(p.r)) {
              return this.load_node(p.r, function () { this.prepare_move(o, r, pos, cb, true); });
            }
            switch (p.p) {
              case "before":
                p.cp = p.r.index();
                p.cr = p.rt._get_parent(p.r);
                break;
              case "after":
                p.cp = p.r.index() + 1;
                p.cr = p.rt._get_parent(p.r);
                break;
              case "inside":
              case "first":
                p.cp = 0;
                p.cr = p.r;
                break;
              case "last":
                p.cp = p.r.find(" > ul > li").length;
                p.cr = p.r;
                break;
              default:
                p.cp = p.p;
                p.cr = p.r;
                break;
            }
          }
          p.np = p.cr == -1 ? p.rt.get_container() : p.cr;
          p.op = p.ot._get_parent(p.o);
          p.cop = p.o.index();
          if (p.op === -1) { p.op = p.ot ? p.ot.get_container() : this.get_container(); }
          if (!/^(before|after)$/.test(p.p) && p.op && p.np && p.op[0] === p.np[0] && p.o.index() < p.cp) { p.cp++; }
          //if(p.p === "before" && p.op && p.np && p.op[0] === p.np[0] && p.o.index() < p.cp) { p.cp--; }
          p.or = p.np.find(" > ul > li:nth-child(" + (p.cp + 1) + ")");
          prepared_move = p;
          this.__callback(prepared_move);
          if (cb) { cb.call(this, prepared_move); }
        },
        check_move: function () {
          var obj = prepared_move, ret = true, r = obj.r === -1 ? this.get_container() : obj.r;
          if (!obj || !obj.o || obj.or[0] === obj.o[0]) { return false; }
          if (!obj.cy) {
            if (obj.op && obj.np && obj.op[0] === obj.np[0] && obj.cp - 1 === obj.o.index()) { return false; }
            obj.o.each(function () {
              if (r.parentsUntil(".jstree", "li").addBack().index(this) !== -1) { ret = false; return false; }
            });
          }
          return ret;
        },
        move_node: function (obj, ref, position, is_copy, is_prepared, skip_check) {
          if (!is_prepared) {
            return this.prepare_move(obj, ref, position, function (p) {
              this.move_node(p, false, false, is_copy, true, skip_check);
            });
          }
          if (is_copy) {
            prepared_move.cy = true;
          }
          if (!skip_check && !this.check_move()) { return false; }

          this.__rollback();
          var o = false;
          if (is_copy) {
            o = obj.o.clone(true);
            o.find("*[id]").addBack().each(function () {
              if (this.id) { this.id = "copy_" + this.id; }
            });
          }
          else { o = obj.o; }

          if (obj.or.length) { obj.or.before(o); }
          else {
            if (!obj.np.children("ul").length) { $("<ul />").appendTo(obj.np); }
            obj.np.children("ul:eq(0)").append(o);
          }

          try {
            obj.ot.clean_node(obj.op);
            obj.rt.clean_node(obj.np);
            if (!obj.op.find("> ul > li").length) {
              obj.op.removeClass("jstree-open jstree-closed").addClass("jstree-leaf").children("ul").remove();
            }
          } catch (e) { }

          if (is_copy) {
            prepared_move.cy = true;
            prepared_move.oc = o;
          }
          this.__callback(prepared_move);
          return prepared_move;
        },
        _get_move: function () { return prepared_move; }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree ui plugin
   * This plugins handles selecting/deselecting/hovering/dehovering nodes
   */
  (function ($) {
    var scrollbar_width, e1, e2;
    $(function () {
      if (/msie/.test(navigator.userAgent.toLowerCase())) {
        e1 = $('<textarea cols="10" rows="2"></textarea>').css({ position: 'absolute', top: -1000, left: 0 }).appendTo('body');
        e2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({ position: 'absolute', top: -1000, left: 0 }).appendTo('body');
        scrollbar_width = e1.width() - e2.width();
        e1.add(e2).remove();
      }
      else {
        e1 = $('<div />').css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: 0 })
            .prependTo('body').append('<div />').find('div').css({ width: '100%', height: 200 });
        scrollbar_width = 100 - e1.width();
        e1.parent().remove();
      }
    });
    $.jstree.plugin("ui", {
      __init: function () {
        this.data.ui.selected = $();
        this.data.ui.last_selected = false;
        this.data.ui.hovered = null;
        this.data.ui.to_select = this.get_settings().ui.initially_select;

        this.get_container()
          .delegate("a", "click.jstree", $.proxy(function (event) {
            if ($(event.currentTarget).attr("href") == "#") { // Fix by RDM: When we have an href, don't swallow click event
              event.preventDefault();
              event.currentTarget.blur();
              if (!$(event.currentTarget).hasClass("jstree-loading")) {
                this.select_node(event.currentTarget, true, event);
              }
            }
          }, this))
          .delegate("a", "mouseenter.jstree", $.proxy(function (event) {
            if (!$(event.currentTarget).hasClass("jstree-loading")) {
              this.hover_node(event.target);
            }
          }, this))
          .delegate("a", "mouseleave.jstree", $.proxy(function (event) {
            if (!$(event.currentTarget).hasClass("jstree-loading")) {
              this.dehover_node(event.target);
            }
          }, this))
          .bind("reopen.jstree", $.proxy(function () {
            this.reselect();
          }, this))
          .bind("get_rollback.jstree", $.proxy(function () {
            this.dehover_node();
            this.save_selected();
          }, this))
          .bind("set_rollback.jstree", $.proxy(function () {
            this.reselect();
          }, this))
          .bind("close_node.jstree", $.proxy(function (event, data) {
            var s = this._get_settings().ui,
							obj = this._get_node(data.rslt.obj),
							clk = (obj && obj.length) ? obj.children("ul").find("a.jstree-clicked") : $(),
							_this = this;
            if (s.selected_parent_close === false || !clk.length) { return; }
            clk.each(function () {
              _this.deselect_node(this);
              if (s.selected_parent_close === "select_parent") { _this.select_node(obj); }
            });
          }, this))
          .bind("delete_node.jstree", $.proxy(function (event, data) {
            var s = this._get_settings().ui.select_prev_on_delete,
							obj = this._get_node(data.rslt.obj),
							clk = (obj && obj.length) ? obj.find("a.jstree-clicked") : [],
							_this = this;
            clk.each(function () { _this.deselect_node(this); });
            if (s && clk.length) {
              data.rslt.prev.each(function () {
                if (this.parentNode) { _this.select_node(this); return false; /* if return false is removed all prev nodes will be selected */ }
              });
            }
          }, this))
          .bind("move_node.jstree", $.proxy(function (event, data) {
            if (data.rslt.cy) {
              data.rslt.oc.find("a.jstree-clicked").removeClass("jstree-clicked");
            }
          }, this));
      },
      defaults: {
        select_limit: -1, // 0, 1, 2 ... or -1 for unlimited
        select_multiple_modifier: "ctrl", // on, or ctrl, shift, alt
        select_range_modifier: "shift",
        selected_parent_close: "select_parent", // false, "deselect", "select_parent"
        selected_parent_open: true,
        select_prev_on_delete: true,
        disable_selecting_children: false,
        initially_select: []
      },
      _fn: {
        _get_node: function (obj, allow_multiple) {
          if (typeof obj === "undefined" || obj === null) { return allow_multiple ? this.data.ui.selected : this.data.ui.last_selected; }
          var $obj = $(obj, this.get_container());
          if ($obj.is(".jstree") || obj == -1) { return -1; }
          $obj = $obj.closest("li", this.get_container());
          return $obj.length ? $obj : false;
        },
        _ui_notify: function (n, data) {
          if (data.selected) {
            this.select_node(n, false);
          }
        },
        save_selected: function () {
          var _this = this;
          this.data.ui.to_select = [];
          this.data.ui.selected.each(function () { if (this.id) { _this.data.ui.to_select.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:")); } });
          this.__callback(this.data.ui.to_select);
        },
        reselect: function () {
          var _this = this,
            s = this.data.ui.to_select;
          s = $.map($.makeArray(s), function (n) { return "#" + n.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"); });
          // this.deselect_all(); WHY deselect, breaks plugin state notifier?
          $.each(s, function (i, val) { if (val && val !== "#") { _this.select_node(val); } });
          this.data.ui.selected = this.data.ui.selected.filter(function () { return this.parentNode; });
          this.__callback();
        },
        refresh: function (obj) {
          this.save_selected();
          return this.__call_old();
        },
        hover_node: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          //if(this.data.ui.hovered && obj.get(0) === this.data.ui.hovered.get(0)) { return; }
          if (!obj.hasClass("jstree-hovered")) { this.dehover_node(); }
          this.data.ui.hovered = obj.children("a").addClass("jstree-hovered").parent();
          this._fix_scroll(obj);
          this.__callback({ "obj": obj });
        },
        dehover_node: function () {
          var obj = this.data.ui.hovered, p;
          if (!obj || !obj.length) { return false; }
          p = obj.children("a").removeClass("jstree-hovered").parent();
          if (this.data.ui.hovered[0] === p[0]) { this.data.ui.hovered = null; }
          this.__callback({ "obj": obj });
        },
        select_node: function (obj, check, e) {
          obj = this._get_node(obj);
          if (obj == -1 || !obj || !obj.length) { return false; }
          var s = this._get_settings().ui,
            is_multiple = (s.select_multiple_modifier == "on" || (s.select_multiple_modifier !== false && e && e[s.select_multiple_modifier + "Key"])),
            is_range = (s.select_range_modifier !== false && e && e[s.select_range_modifier + "Key"] && this.data.ui.last_selected && this.data.ui.last_selected[0] !== obj[0] && this.data.ui.last_selected.parent()[0] === obj.parent()[0]),
            is_selected = this.is_selected(obj),
            proceed = true,
            t = this;
          if (check) {
            if (s.disable_selecting_children && is_multiple &&
              (
                (obj.parentsUntil(".jstree", "li").children("a.jstree-clicked").length) ||
                (obj.children("ul").find("a.jstree-clicked:eq(0)").length)
              )
            ) {
              return false;
            }
            proceed = false;
            switch (!0) {
              case (is_range):
                this.data.ui.last_selected.addClass("jstree-last-selected");
                obj = obj[obj.index() < this.data.ui.last_selected.index() ? "nextUntil" : "prevUntil"](".jstree-last-selected").addBack();
                if (s.select_limit == -1 || obj.length < s.select_limit) {
                  this.data.ui.last_selected.removeClass("jstree-last-selected");
                  this.data.ui.selected.each(function () {
                    if (this !== t.data.ui.last_selected[0]) { t.deselect_node(this); }
                  });
                  is_selected = false;
                  proceed = true;
                }
                else {
                  proceed = false;
                }
                break;
              case (is_selected && !is_multiple):
                this.deselect_all();
                is_selected = false;
                proceed = true;
                break;
              case (!is_selected && !is_multiple):
                if (s.select_limit == -1 || s.select_limit > 0) {
                  this.deselect_all();
                  proceed = true;
                }
                break;
              case (is_selected && is_multiple):
                this.deselect_node(obj);
                break;
              case (!is_selected && is_multiple):
                if (s.select_limit == -1 || this.data.ui.selected.length + 1 <= s.select_limit) {
                  proceed = true;
                }
                break;
            }
          }
          if (proceed && !is_selected) {
            if (!is_range) { this.data.ui.last_selected = obj; }
            obj.children("a").addClass("jstree-clicked");
            if (s.selected_parent_open) {
              obj.parents(".jstree-closed").each(function () { t.open_node(this, false, true); });
            }
            this.data.ui.selected = this.data.ui.selected.add(obj);
            this._fix_scroll(obj.eq(0));
            this.__callback({ "obj": obj, "e": e });
          }
        },
        _fix_scroll: function (obj) {
          var c = this.get_container()[0], t;
          if (c.scrollHeight > c.offsetHeight) {
            obj = this._get_node(obj);
            if (!obj || obj === -1 || !obj.length || !obj.is(":visible")) { return; }
            t = obj.offset().top - this.get_container().offset().top;
            if (t < 0) {
              c.scrollTop = c.scrollTop + t - 1;
            }
            if (t + this.data.core.li_height + (c.scrollWidth > c.offsetWidth ? scrollbar_width : 0) > c.offsetHeight) {
              c.scrollTop = c.scrollTop + (t - c.offsetHeight + this.data.core.li_height + 1 + (c.scrollWidth > c.offsetWidth ? scrollbar_width : 0));
            }
          }
        },
        deselect_node: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          if (this.is_selected(obj)) {
            obj.children("a").removeClass("jstree-clicked");
            this.data.ui.selected = this.data.ui.selected.not(obj);
            if (this.data.ui.last_selected.get(0) === obj.get(0)) { this.data.ui.last_selected = this.data.ui.selected.eq(0); }
            this.__callback({ "obj": obj });
          }
        },
        toggle_select: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return false; }
          if (this.is_selected(obj)) { this.deselect_node(obj); }
          else { this.select_node(obj); }
        },
        is_selected: function (obj) { return this.data.ui.selected.index(this._get_node(obj)) >= 0; },
        get_selected: function (context) {
          return context ? $(context).find("a.jstree-clicked").parent() : this.data.ui.selected;
        },
        deselect_all: function (context) {
          var ret = context ? $(context).find("a.jstree-clicked").parent() : this.get_container().find("a.jstree-clicked").parent();
          ret.children("a.jstree-clicked").removeClass("jstree-clicked");
          this.data.ui.selected = $([]);
          this.data.ui.last_selected = false;
          this.__callback({ "obj": ret });
        }
      }
    });
    // include the selection plugin by default
    $.jstree.defaults.plugins.push("ui");
  })(jQuery);
  //*/

  /* 
   * jsTree CRRM plugin
   * Handles creating/renaming/removing/moving nodes by user interaction.
   */
  (function ($) {
    $.jstree.plugin("crrm", {
      __init: function () {
        this.get_container()
          .bind("move_node.jstree", $.proxy(function (e, data) {
            if (this._get_settings().crrm.move.open_onmove) {
              var t = this;
              data.rslt.np.parentsUntil(".jstree").addBack().filter(".jstree-closed").each(function () {
                t.open_node(this, false, true);
              });
            }
          }, this));
      },
      defaults: {
        input_width_limit: 200,
        move: {
          always_copy: false, // false, true or "multitree"
          open_onmove: true,
          default_position: "last",
          check_move: function (m) { return true; }
        }
      },
      _fn: {
        _show_input: function (obj, callback) {
          obj = this._get_node(obj);
          var rtl = this._get_settings().core.rtl,
            w = this._get_settings().crrm.input_width_limit,
            w1 = obj.children("ins").width(),
            w2 = obj.find("> a:visible > ins").width() * obj.find("> a:visible > ins").length,
            t = this.get_text(obj),
            h1 = $("<div />", { css: { "position": "absolute", "top": "-200px", "left": (rtl ? "0px" : "-1000px"), "visibility": "hidden" } }).appendTo("body"),
            h2 = obj.css("position", "relative").append(
            $("<input />", {
              "value": t,
              "class": "jstree-rename-input",
              // "size" : t.length,
              "css": {
                "padding": "0",
                "border": "1px solid silver",
                "position": "absolute",
                "left": (rtl ? "auto" : (w1 + w2 + 4) + "px"),
                "right": (rtl ? (w1 + w2 + 4) + "px" : "auto"),
                "top": "0px",
                "height": (this.data.core.li_height - 2) + "px",
                "lineHeight": (this.data.core.li_height - 2) + "px",
                "width": "150px" // will be set a bit further down
              },
              "blur": $.proxy(function () {
                var i = obj.children(".jstree-rename-input"),
                  v = i.val();
                if (v === "") { v = t; }
                h1.remove();
                i.remove(); // rollback purposes
                this.set_text(obj, t); // rollback purposes
                this.rename_node(obj, v);
                callback.call(this, obj, v, t);
                obj.css("position", "");
              }, this),
              "keyup": function (event) {
                var key = event.keyCode || event.which;
                if (key == 27) { this.value = t; this.blur(); return; }
                else if (key == 13) { this.blur(); return; }
                else {
                  h2.width(Math.min(h1.text("pW" + this.value).width(), w));
                }
              },
              "keypress": function (event) {
                var key = event.keyCode || event.which;
                if (key == 13) { return false; }
              }
            })
          ).children(".jstree-rename-input");
          this.set_text(obj, "");
          h1.css({
            fontFamily: h2.css('fontFamily') || '',
            fontSize: h2.css('fontSize') || '',
            fontWeight: h2.css('fontWeight') || '',
            fontStyle: h2.css('fontStyle') || '',
            fontStretch: h2.css('fontStretch') || '',
            fontVariant: h2.css('fontVariant') || '',
            letterSpacing: h2.css('letterSpacing') || '',
            wordSpacing: h2.css('wordSpacing') || ''
          });
          h2.width(Math.min(h1.text("pW" + h2[0].value).width(), w))[0].select();
        },
        rename: function (obj) {
          obj = this._get_node(obj);
          this.__rollback();
          var f = this.__callback;
          this._show_input(obj, function (obj, new_name, old_name) {
            f.call(this, { "obj": obj, "new_name": new_name, "old_name": old_name });
          });
        },
        create: function (obj, position, js, callback, skip_rename) {
          var t, _this = this;
          obj = this._get_node(obj);
          if (!obj) { obj = -1; }
          this.__rollback();
          t = this.create_node(obj, position, js, function (t) {
            var p = this._get_parent(t),
              pos = $(t).index();
            if (callback) { callback.call(this, t); }
            if (p.length && p.hasClass("jstree-closed")) { this.open_node(p, false, true); }
            if (!skip_rename) {
              this._show_input(t, function (obj, new_name, old_name) {
                _this.__callback({ "obj": obj, "name": new_name, "parent": p, "position": pos });
              });
            }
            else { _this.__callback({ "obj": t, "name": this.get_text(t), "parent": p, "position": pos }); }
          });
          return t;
        },
        remove: function (obj) {
          obj = this._get_node(obj, true);
          var p = this._get_parent(obj), prev = this._get_prev(obj);
          this.__rollback();
          obj = this.delete_node(obj);
          if (obj !== false) { this.__callback({ "obj": obj, "prev": prev, "parent": p }); }
        },
        check_move: function () {
          if (!this.__call_old()) { return false; }
          var s = this._get_settings().crrm.move;
          if (!s.check_move.call(this, this._get_move())) { return false; }
          return true;
        },
        move_node: function (obj, ref, position, is_copy, is_prepared, skip_check) {
          var s = this._get_settings().crrm.move;
          if (!is_prepared) {
            if (typeof position === "undefined") { position = s.default_position; }
            if (position === "inside" && !s.default_position.match(/^(before|after)$/)) { position = s.default_position; }
            return this.__call_old(true, obj, ref, position, is_copy, false, skip_check);
          }
          // if the move is already prepared
          if (s.always_copy === true || (s.always_copy === "multitree" && obj.rt.get_index() !== obj.ot.get_index())) {
            is_copy = true;
          }
          this.__call_old(true, obj, ref, position, is_copy, true, skip_check);
        },

        cut: function (obj) {
          obj = this._get_node(obj, true);
          if (!obj || !obj.length) { return false; }
          this.data.crrm.cp_nodes = false;
          this.data.crrm.ct_nodes = obj;
          this.__callback({ "obj": obj });
        },
        copy: function (obj) {
          obj = this._get_node(obj, true);
          if (!obj || !obj.length) { return false; }
          this.data.crrm.ct_nodes = false;
          this.data.crrm.cp_nodes = obj;
          this.__callback({ "obj": obj });
        },
        paste: function (obj) {
          obj = this._get_node(obj);
          if (!obj || !obj.length) { return false; }
          var nodes = this.data.crrm.ct_nodes ? this.data.crrm.ct_nodes : this.data.crrm.cp_nodes;
          if (!this.data.crrm.ct_nodes && !this.data.crrm.cp_nodes) { return false; }
          if (this.data.crrm.ct_nodes) { this.move_node(this.data.crrm.ct_nodes, obj); this.data.crrm.ct_nodes = false; }
          if (this.data.crrm.cp_nodes) { this.move_node(this.data.crrm.cp_nodes, obj, false, true); }
          this.__callback({ "obj": obj, "nodes": nodes });
        }
      }
    });
    // include the crr plugin by default
    // $.jstree.defaults.plugins.push("crrm");
  })(jQuery);
  //*/

  /* 
   * jsTree themes plugin
   * Handles loading and setting themes, as well as detecting path to themes, etc.
   */
  (function ($) {
    var themes_loaded = [];
    // this variable stores the path to the themes folder - if left as false - it will be autodetected
    $.jstree._themes = false;
    $.jstree.plugin("themes", {
      __init: function () {
        this.get_container()
          .bind("init.jstree", $.proxy(function () {
            var s = this._get_settings().themes;
            this.data.themes.dots = s.dots;
            this.data.themes.icons = s.icons;
            this.set_theme(s.theme, s.url);
          }, this))
          .bind("loaded.jstree", $.proxy(function () {
            // bound here too, as simple HTML tree's won't honor dots & icons otherwise
            if (!this.data.themes.dots) { this.hide_dots(); }
            else { this.show_dots(); }
            if (!this.data.themes.icons) { this.hide_icons(); }
            else { this.show_icons(); }
          }, this));
      },
      defaults: {
        theme: "default",
        url: false,
        dots: true,
        icons: true
      },
      _fn: {
        set_theme: function (theme_name, theme_url) {
          if (!theme_name) { return false; }
          //if(!theme_url) { theme_url = $.jstree._themes + theme_name + '/style.css'; }
          if (theme_url && $.inArray(theme_url, themes_loaded) == -1) {
            $.vakata.css.add_sheet({ "url": theme_url });
            themes_loaded.push(theme_url);
          }
          if (this.data.themes.theme != theme_name) {
            this.get_container().removeClass('jstree-' + this.data.themes.theme);
            this.data.themes.theme = theme_name;
          }
          this.get_container().addClass('jstree-' + theme_name);
          if (!this.data.themes.dots) { this.hide_dots(); }
          else { this.show_dots(); }
          if (!this.data.themes.icons) { this.hide_icons(); }
          else { this.show_icons(); }
          this.__callback();
        },
        get_theme: function () { return this.data.themes.theme; },

        show_dots: function () { this.data.themes.dots = true; this.get_container().children("ul").removeClass("jstree-no-dots"); },
        hide_dots: function () { this.data.themes.dots = false; this.get_container().children("ul").addClass("jstree-no-dots"); },
        toggle_dots: function () { if (this.data.themes.dots) { this.hide_dots(); } else { this.show_dots(); } },

        show_icons: function () { this.data.themes.icons = true; this.get_container().children("ul").removeClass("jstree-no-icons"); },
        hide_icons: function () { this.data.themes.icons = false; this.get_container().children("ul").addClass("jstree-no-icons"); },
        toggle_icons: function () { if (this.data.themes.icons) { this.hide_icons(); } else { this.show_icons(); } }
      }
    });
    // autodetect themes path
    $(function () {
      if ($.jstree._themes === false) {
        $("script").each(function () {
          if (this.src.toString().match(/jquery\.jstree[^\/]*?\.js(\?.*)?$/)) {
            $.jstree._themes = this.src.toString().replace(/jquery\.jstree[^\/]*?\.js(\?.*)?$/, "") + 'themes/';
            return false;
          }
        });
      }
      if ($.jstree._themes === false) { $.jstree._themes = "themes/"; }
    });
    // include the themes plugin by default
    $.jstree.defaults.plugins.push("themes");
  })(jQuery);
  //*/

  /*
   * jsTree hotkeys plugin
   * Enables keyboard navigation for all tree instances
   * Depends on the jstree ui & jquery hotkeys plugins
   */
  (function ($) {
    var bound = [];
    function exec(i, event) {
      var f = $.jstree._focused(), tmp;
      if (f && f.data && f.data.hotkeys && f.data.hotkeys.enabled) {
        tmp = f._get_settings().hotkeys[i];
        if (tmp) { return tmp.call(f, event); }
      }
    }
    $.jstree.plugin("hotkeys", {
      __init: function () {
        if (typeof $.hotkeys === "undefined") { throw "jsTree hotkeys: jQuery hotkeys plugin not included."; }
        if (!this.data.ui) { throw "jsTree hotkeys: jsTree UI plugin not included."; }
        $.each(this._get_settings().hotkeys, function (i, v) {
          if (v !== false && $.inArray(i, bound) == -1) {
            $(document).bind("keydown", i, function (event) { return exec(i, event); });
            bound.push(i);
          }
        });
        this.get_container()
          .bind("lock.jstree", $.proxy(function () {
            if (this.data.hotkeys.enabled) { this.data.hotkeys.enabled = false; this.data.hotkeys.revert = true; }
          }, this))
          .bind("unlock.jstree", $.proxy(function () {
            if (this.data.hotkeys.revert) { this.data.hotkeys.enabled = true; }
          }, this));
        this.enable_hotkeys();
      },
      defaults: {
        "up": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_prev(o));
          return false;
        },
        "ctrl+up": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_prev(o));
          return false;
        },
        "shift+up": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_prev(o));
          return false;
        },
        "down": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_next(o));
          return false;
        },
        "ctrl+down": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_next(o));
          return false;
        },
        "shift+down": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
          this.hover_node(this._get_next(o));
          return false;
        },
        "left": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o) {
            if (o.hasClass("jstree-open")) { this.close_node(o); }
            else { this.hover_node(this._get_prev(o)); }
          }
          return false;
        },
        "ctrl+left": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o) {
            if (o.hasClass("jstree-open")) { this.close_node(o); }
            else { this.hover_node(this._get_prev(o)); }
          }
          return false;
        },
        "shift+left": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o) {
            if (o.hasClass("jstree-open")) { this.close_node(o); }
            else { this.hover_node(this._get_prev(o)); }
          }
          return false;
        },
        "right": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o && o.length) {
            if (o.hasClass("jstree-closed")) { this.open_node(o); }
            else { this.hover_node(this._get_next(o)); }
          }
          return false;
        },
        "ctrl+right": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o && o.length) {
            if (o.hasClass("jstree-closed")) { this.open_node(o); }
            else { this.hover_node(this._get_next(o)); }
          }
          return false;
        },
        "shift+right": function () {
          var o = this.data.ui.hovered || this.data.ui.last_selected;
          if (o && o.length) {
            if (o.hasClass("jstree-closed")) { this.open_node(o); }
            else { this.hover_node(this._get_next(o)); }
          }
          return false;
        },
        "space": function () {
          if (this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").click(); }
          return false;
        },
        "ctrl+space": function (event) {
          event.type = "click";
          if (this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").trigger(event); }
          return false;
        },
        "shift+space": function (event) {
          event.type = "click";
          if (this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").trigger(event); }
          return false;
        },
        "f2": function () { this.rename(this.data.ui.hovered || this.data.ui.last_selected); },
        "del": function () { this.remove(this.data.ui.hovered || this._get_node(null)); }
      },
      _fn: {
        enable_hotkeys: function () {
          this.data.hotkeys.enabled = true;
        },
        disable_hotkeys: function () {
          this.data.hotkeys.enabled = false;
        }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree JSON plugin
   * The JSON data store. Datastores are build by overriding the `load_node` and `_is_loaded` functions.
   */
  (function ($) {
    $.jstree.plugin("json_data", {
      __init: function () {
        var s = this._get_settings().json_data;
        if (s.progressive_unload) {
          this.get_container().bind("after_close.jstree", function (e, data) {
            data.rslt.obj.children("ul").remove();
          });
        }
      },
      defaults: {
        // `data` can be a function:
        //  * accepts two arguments - node being loaded and a callback to pass the result to
        //  * will be executed in the current tree's scope & ajax won't be supported
        data: false,
        ajax: false,
        correct_state: true,
        progressive_render: false,
        progressive_unload: false
      },
      _fn: {
        load_node: function (obj, s_call, e_call) { var _this = this; this.load_node_json(obj, function () { _this.__callback({ "obj": _this._get_node(obj) }); s_call.call(this); }, e_call); },
        _is_loaded: function (obj) {
          var s = this._get_settings().json_data;
          obj = this._get_node(obj);
          return obj == -1 || !obj || (!s.ajax && !s.progressive_render && !$.isFunction(s.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").length > 0;
        },
        refresh: function (obj) {
          obj = this._get_node(obj);
          var s = this._get_settings().json_data;
          if (obj && obj !== -1 && s.progressive_unload && ($.isFunction(s.data) || !!s.ajax)) {
            obj.removeData("jstree_children");
          }
          return this.__call_old();
        },
        load_node_json: function (obj, s_call, e_call) {
          var s = this.get_settings().json_data, d,
            error_func = function () { },
            success_func = function () { };
          obj = this._get_node(obj);

          if (obj && obj !== -1 && (s.progressive_render || s.progressive_unload) && !obj.is(".jstree-open, .jstree-leaf") && obj.children("ul").children("li").length === 0 && obj.data("jstree_children")) {
            d = this._parse_json(obj.data("jstree_children"), obj);
            if (d) {
              obj.append(d);
              if (!s.progressive_unload) { obj.removeData("jstree_children"); }
            }
            this.clean_node(obj);
            if (s_call) { s_call.call(this); }
            return;
          }

          if (obj && obj !== -1) {
            if (obj.data("jstree_is_loading")) { return; }
            else { obj.data("jstree_is_loading", true); }
          }
          switch (!0) {
            case (!s.data && !s.ajax): throw "Neither data nor ajax settings supplied.";
              // function option added here for easier model integration (also supporting async - see callback)
            case ($.isFunction(s.data)):
              s.data.call(this, obj, $.proxy(function (d) {
                d = this._parse_json(d, obj);
                if (!d) {
                  if (obj === -1 || !obj) {
                    if (s.correct_state) { this.get_container().children("ul").empty(); }
                  }
                  else {
                    obj.children("a.jstree-loading").removeClass("jstree-loading");
                    obj.removeData("jstree_is_loading");
                    if (s.correct_state) { this.correct_state(obj); }
                  }
                  if (e_call) { e_call.call(this); }
                }
                else {
                  if (obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
                  else { obj.append(d).children("a.jstree-loading").removeClass("jstree-loading"); obj.removeData("jstree_is_loading"); }
                  this.clean_node(obj);
                  if (s_call) { s_call.call(this); }
                }
              }, this));
              break;
            case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
              if (!obj || obj == -1) {
                d = this._parse_json(s.data, obj);
                if (d) {
                  this.get_container().children("ul").empty().append(d.children());
                  this.clean_node();
                }
                else {
                  if (s.correct_state) { this.get_container().children("ul").empty(); }
                }
              }
              if (s_call) { s_call.call(this); }
              break;
            case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
              error_func = function (x, t, e) {
                var ef = this.get_settings().json_data.ajax.error;
                if (ef) { ef.call(this, x, t, e); }
                if (obj != -1 && obj.length) {
                  obj.children("a.jstree-loading").removeClass("jstree-loading");
                  obj.removeData("jstree_is_loading");
                  if (t === "success" && s.correct_state) { this.correct_state(obj); }
                }
                else {
                  if (t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
                }
                if (e_call) { e_call.call(this); }
              };
              success_func = function (d, t, x) {
                var sf = this.get_settings().json_data.ajax.success;
                if (sf) { d = sf.call(this, d, t, x) || d; }
                if (d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/, "") === "") || (!$.isArray(d) && !$.isPlainObject(d))) {
                  return error_func.call(this, x, t, "");
                }
                d = this._parse_json(d, obj);
                if (d) {
                  if (obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
                  else { obj.append(d).children("a.jstree-loading").removeClass("jstree-loading"); obj.removeData("jstree_is_loading"); }
                  this.clean_node(obj);
                  if (s_call) { s_call.call(this); }
                }
                else {
                  if (obj === -1 || !obj) {
                    if (s.correct_state) {
                      this.get_container().children("ul").empty();
                      if (s_call) { s_call.call(this); }
                    }
                  }
                  else {
                    obj.children("a.jstree-loading").removeClass("jstree-loading");
                    obj.removeData("jstree_is_loading");
                    if (s.correct_state) {
                      this.correct_state(obj);
                      if (s_call) { s_call.call(this); }
                    }
                  }
                }
              };
              s.ajax.context = this;
              s.ajax.error = error_func;
              s.ajax.success = success_func;
              if (!s.ajax.dataType) { s.ajax.dataType = "json"; }
              if ($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
              if ($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
              $.ajax(s.ajax);
              break;
          }
        },
        _parse_json: function (js, obj, is_callback) {
          var d = false,
            p = this._get_settings(),
            s = p.json_data,
            t = p.core.html_titles,
            tmp, i, j, ul1, ul2;

          if (!js) { return d; }
          if (s.progressive_unload && obj && obj !== -1) {
            obj.data("jstree_children", d);
          }
          if ($.isArray(js)) {
            d = $('<ul>');
            if (!js.length) { return false; }
            for (i = 0, j = js.length; i < j; i++) {
              tmp = this._parse_json(js[i], obj, true);
              if (tmp.length) {
                d = d.append(tmp);
              }
            }
            d = d.children();
          }
          else {
            if (typeof js == "string") { js = { data: js }; }
            if (!js.data && js.data !== "") { return d; }
            d = $("<li />");
            if (js.attr) { d.attr(js.attr); }
            if (js.metadata) { d.data(js.metadata); }
            if (js.state) { d.addClass("jstree-" + js.state); }
            if (!$.isArray(js.data)) { tmp = js.data; js.data = []; js.data.push(tmp); }
            $.each(js.data, function (i, m) {
              tmp = $("<a />");
              if ($.isFunction(m)) { m = m.call(this, js); }
              if (typeof m == "string") { tmp.attr('href', '#')[t ? "html" : "text"](m); }
              else {
                if (!m.attr) { m.attr = {}; }
                if (!m.attr.href) { m.attr.href = '#'; }
                tmp.attr(m.attr)[t ? "html" : "text"](m.title);
                if (m.language) { tmp.addClass(m.language); }
              }
              tmp.prepend("<ins class='jstree-icon'>&#160;</ins>");
              if (!m.icon && js.icon) { m.icon = js.icon; }
              if (m.icon) {
                if (m.icon.indexOf("/") === -1) { tmp.children("ins").addClass(m.icon); }
                else { tmp.children("ins").css("background", "url('" + m.icon + "') center center no-repeat"); }
              }
              d.append(tmp);
            });
            d.prepend("<ins class='jstree-icon'>&#160;</ins>");
            if (js.children) {
              if (s.progressive_render && js.state !== "open") {
                d.addClass("jstree-closed").data("jstree_children", js.children);
              }
              else {
                if (s.progressive_unload) { d.data("jstree_children", js.children); }
                if ($.isArray(js.children) && js.children.length) {
                  tmp = this._parse_json(js.children, obj, true);
                  if (tmp.length) {
                    ul2 = $("<ul />");
                    ul2.append(tmp);
                    d.append(ul2);
                  }
                }
              }
            }
          }
          if (!is_callback) {
            ul1 = $("<ul />");
            ul1.append(d);
            d = ul1;
          }
          return d;
        },
        get_json: function (obj, li_attr, a_attr, is_callback) {
          var result = [],
            s = this._get_settings(),
            _this = this,
            tmp1, tmp2, li, a, t, lang;
          obj = this._get_node(obj);
          if (!obj || obj === -1) { obj = this.get_container().find("> ul > li"); }
          li_attr = $.isArray(li_attr) ? li_attr : ["id", "class"];
          if (!is_callback && this.data.types) { li_attr.push(s.types.type_attr); }
          a_attr = $.isArray(a_attr) ? a_attr : [];

          obj.each(function () {
            li = $(this);
            tmp1 = { data: [] };
            if (li_attr.length) { tmp1.attr = {}; }
            $.each(li_attr, function (i, v) {
              tmp2 = li.attr(v);
              if (tmp2 && tmp2.length && tmp2.replace(/jstree[^ ]*/ig, '').length) {
                tmp1.attr[v] = (" " + tmp2).replace(/ jstree[^ ]*/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "");
              }
            });
            if (li.hasClass("jstree-open")) { tmp1.state = "open"; }
            if (li.hasClass("jstree-closed")) { tmp1.state = "closed"; }
            if (li.data()) { tmp1.metadata = li.data(); }
            a = li.children("a");
            a.each(function () {
              t = $(this);
              if (
                a_attr.length ||
                $.inArray("languages", s.plugins) !== -1 ||
                t.children("ins").get(0).style.backgroundImage.length ||
                (t.children("ins").get(0).className && t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, '').length)
              ) {
                lang = false;
                if ($.inArray("languages", s.plugins) !== -1 && $.isArray(s.languages) && s.languages.length) {
                  $.each(s.languages, function (l, lv) {
                    if (t.hasClass(lv)) {
                      lang = lv;
                      return false;
                    }
                  });
                }
                tmp2 = { attr: {}, title: _this.get_text(t, lang) };
                $.each(a_attr, function (k, z) {
                  tmp2.attr[z] = (" " + (t.attr(z) || "")).replace(/ jstree[^ ]*/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "");
                });
                if ($.inArray("languages", s.plugins) !== -1 && $.isArray(s.languages) && s.languages.length) {
                  $.each(s.languages, function (k, z) {
                    if (t.hasClass(z)) { tmp2.language = z; return true; }
                  });
                }
                if (t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, '').replace(/^\s+$/ig, "").length) {
                  tmp2.icon = t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "");
                }
                if (t.children("ins").get(0).style.backgroundImage.length) {
                  tmp2.icon = t.children("ins").get(0).style.backgroundImage.replace("url(", "").replace(")", "");
                }
              }
              else {
                tmp2 = _this.get_text(t);
              }
              if (a.length > 1) { tmp1.data.push(tmp2); }
              else { tmp1.data = tmp2; }
            });
            li = li.find("> ul > li");
            if (li.length) { tmp1.children = _this.get_json(li, li_attr, a_attr, true); }
            result.push(tmp1);
          });
          return result;
        }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree languages plugin
   * Adds support for multiple language versions in one tree
   * This basically allows for many titles coexisting in one node, but only one of them being visible at any given time
   * This is useful for maintaining the same structure in many languages (hence the name of the plugin)
   */
  (function ($) {
    var sh = false;
    $.jstree.plugin("languages", {
      __init: function () { this._load_css(); },
      defaults: [],
      _fn: {
        set_lang: function (i) {
          var langs = this._get_settings().languages,
            st = false,
            selector = ".jstree-" + this.get_index() + ' a';
          if (!$.isArray(langs) || langs.length === 0) { return false; }
          if ($.inArray(i, langs) == -1) {
            if (!!langs[i]) { i = langs[i]; }
            else { return false; }
          }
          if (i == this.data.languages.current_language) { return true; }
          st = $.vakata.css.get_css(selector + "." + this.data.languages.current_language, false, sh);
          if (st !== false) { st.style.display = "none"; }
          st = $.vakata.css.get_css(selector + "." + i, false, sh);
          if (st !== false) { st.style.display = ""; }
          this.data.languages.current_language = i;
          this.__callback(i);
          return true;
        },
        get_lang: function () {
          return this.data.languages.current_language;
        },
        _get_string: function (key, lang) {
          var langs = this._get_settings().languages,
            s = this._get_settings().core.strings;
          if ($.isArray(langs) && langs.length) {
            lang = (lang && $.inArray(lang, langs) != -1) ? lang : this.data.languages.current_language;
          }
          if (s[lang] && s[lang][key]) { return s[lang][key]; }
          if (s[key]) { return s[key]; }
          return key;
        },
        get_text: function (obj, lang) {
          obj = this._get_node(obj) || this.data.ui.last_selected;
          if (!obj.size()) { return false; }
          var langs = this._get_settings().languages,
            s = this._get_settings().core.html_titles;
          if ($.isArray(langs) && langs.length) {
            lang = (lang && $.inArray(lang, langs) != -1) ? lang : this.data.languages.current_language;
            obj = obj.children("a." + lang);
          }
          else { obj = obj.children("a:eq(0)"); }
          if (s) {
            obj = obj.clone();
            obj.children("INS").remove();
            return obj.html();
          }
          else {
            obj = obj.contents().filter(function () { return this.nodeType == 3; })[0];
            return obj.nodeValue;
          }
        },
        set_text: function (obj, val, lang) {
          obj = this._get_node(obj) || this.data.ui.last_selected;
          if (!obj.size()) { return false; }
          var langs = this._get_settings().languages,
            s = this._get_settings().core.html_titles,
            tmp;
          if ($.isArray(langs) && langs.length) {
            lang = (lang && $.inArray(lang, langs) != -1) ? lang : this.data.languages.current_language;
            obj = obj.children("a." + lang);
          }
          else { obj = obj.children("a:eq(0)"); }
          if (s) {
            tmp = obj.children("INS").clone();
            obj.html(val).prepend(tmp);
            this.__callback({ "obj": obj, "name": val, "lang": lang });
            return true;
          }
          else {
            obj = obj.contents().filter(function () { return this.nodeType == 3; })[0];
            this.__callback({ "obj": obj, "name": val, "lang": lang });
            return (obj.nodeValue = val);
          }
        },
        _load_css: function () {
          var langs = this._get_settings().languages,
            str = "/* languages css */",
            selector = ".jstree-" + this.get_index() + ' a',
            ln;
          if ($.isArray(langs) && langs.length) {
            this.data.languages.current_language = langs[0];
            for (ln = 0; ln < langs.length; ln++) {
              str += selector + "." + langs[ln] + " {";
              if (langs[ln] != this.data.languages.current_language) { str += " display:none; "; }
              str += " } ";
            }
            sh = $.vakata.css.add_sheet({ 'str': str, 'title': "jstree-languages" });
          }
        },
        create_node: function (obj, position, js, callback) {
          var t = this.__call_old(true, obj, position, js, function (t) {
            var langs = this._get_settings().languages,
              a = t.children("a"),
              ln;
            if ($.isArray(langs) && langs.length) {
              for (ln = 0; ln < langs.length; ln++) {
                if (!a.is("." + langs[ln])) {
                  t.append(a.eq(0).clone().removeClass(langs.join(" ")).addClass(langs[ln]));
                }
              }
              a.not("." + langs.join(", .")).remove();
            }
            if (callback) { callback.call(this, t); }
          });
          return t;
        }
      }
    });
  })(jQuery);
  //*/

  /*
   * jsTree cookies plugin
   * Stores the currently opened/selected nodes in a cookie and then restores them
   * Depends on the jquery.cookie plugin
   */
  (function ($) {
    $.jstree.plugin("cookies", {
      __init: function () {
        if (typeof $.cookie === "undefined") { throw "jsTree cookie: jQuery cookie plugin not included."; }

        var s = this._get_settings().cookies,
          tmp;
        if (!!s.save_loaded) {
          tmp = $.cookie(s.save_loaded);
          if (tmp && tmp.length) { this.data.core.to_load = tmp.split(","); }
        }
        if (!!s.save_opened) {
          tmp = $.cookie(s.save_opened);
          if (tmp && tmp.length) { this.data.core.to_open = tmp.split(","); }
        }
        if (!!s.save_selected) {
          tmp = $.cookie(s.save_selected);
          if (tmp && tmp.length && this.data.ui) { this.data.ui.to_select = tmp.split(","); }
        }
        this.get_container()
          .one((this.data.ui ? "reselect" : "reopen") + ".jstree", $.proxy(function () {
            this.get_container()
              .bind("open_node.jstree close_node.jstree select_node.jstree deselect_node.jstree", $.proxy(function (e) {
                if (this._get_settings().cookies.auto_save) { this.save_cookie((e.handleObj.namespace + e.handleObj.type).replace("jstree", "")); }
              }, this));
          }, this));
      },
      defaults: {
        save_loaded: "jstree_load",
        save_opened: "jstree_open",
        save_selected: "jstree_select",
        auto_save: true,
        cookie_options: {}
      },
      _fn: {
        save_cookie: function (c) {
          if (this.data.core.refreshing) { return; }
          var s = this._get_settings().cookies;
          if (!c) { // if called manually and not by event
            if (s.save_loaded) {
              this.save_loaded();
              $.cookie(s.save_loaded, this.data.core.to_load.join(","), s.cookie_options);
            }
            if (s.save_opened) {
              this.save_opened();
              $.cookie(s.save_opened, this.data.core.to_open.join(","), s.cookie_options);
            }
            if (s.save_selected && this.data.ui) {
              this.save_selected();
              $.cookie(s.save_selected, this.data.ui.to_select.join(","), s.cookie_options);
            }
            return;
          }
          switch (c) {
            case "open_node":
            case "close_node":
              if (!!s.save_opened) {
                this.save_opened();
                $.cookie(s.save_opened, this.data.core.to_open.join(","), s.cookie_options);
              }
              if (!!s.save_loaded) {
                this.save_loaded();
                $.cookie(s.save_loaded, this.data.core.to_load.join(","), s.cookie_options);
              }
              break;
            case "select_node":
            case "deselect_node":
              if (!!s.save_selected && this.data.ui) {
                this.save_selected();
                $.cookie(s.save_selected, this.data.ui.to_select.join(","), s.cookie_options);
              }
              break;
          }
        }
      }
    });
    // include cookies by default
    // $.jstree.defaults.plugins.push("cookies");
  })(jQuery);
  //*/

  /*
   * jsTree sort plugin
   * Sorts items alphabetically (or using any other function)
   */
  (function ($) {
    $.jstree.plugin("sort", {
      __init: function () {
        this.get_container()
          .bind("load_node.jstree", $.proxy(function (e, data) {
            var obj = this._get_node(data.rslt.obj);
            obj = obj === -1 ? this.get_container().children("ul") : obj.children("ul");
            this.sort(obj);
          }, this))
          .bind("rename_node.jstree create_node.jstree create.jstree", $.proxy(function (e, data) {
            this.sort(data.rslt.obj.parent());
          }, this))
          .bind("move_node.jstree", $.proxy(function (e, data) {
            var m = data.rslt.np == -1 ? this.get_container() : data.rslt.np;
            this.sort(m.children("ul"));
          }, this));
      },
      defaults: function (a, b) { return this.get_text(a) > this.get_text(b) ? 1 : -1; },
      _fn: {
        sort: function (obj) {
          var s = this._get_settings().sort,
            t = this;
          obj.append($.makeArray(obj.children("li")).sort($.proxy(s, t)));
          obj.find("> li > ul").each(function () { t.sort($(this)); });
          this.clean_node(obj);
        }
      }
    });
  })(jQuery);
  //*/

  /*
   * jsTree DND plugin
   * Drag and drop plugin for moving/copying nodes
   */
  (function ($) {
    var o = false,
      r = false,
      m = false,
      ml = false,
      sli = false,
      sti = false,
      dir1 = false,
      dir2 = false,
      last_pos = false;
    $.vakata.dnd = {
      is_down: false,
      is_drag: false,
      helper: false,
      scroll_spd: 10,
      init_x: 0,
      init_y: 0,
      threshold: 5,
      helper_left: 5,
      helper_top: 10,
      user_data: {},

      drag_start: function (e, data, html) {
        if ($.vakata.dnd.is_drag) { $.vakata.drag_stop({}); }
        try {
          e.currentTarget.unselectable = "on";
          e.currentTarget.onselectstart = function () { return false; };
          if (e.currentTarget.style) { e.currentTarget.style.MozUserSelect = "none"; }
        } catch (err) { }
        $.vakata.dnd.init_x = e.pageX;
        $.vakata.dnd.init_y = e.pageY;
        $.vakata.dnd.user_data = data;
        $.vakata.dnd.is_down = true;
        $.vakata.dnd.helper = $("<div id='vakata-dragged' />").html(html); //.fadeTo(10,0.25);
        $(document).bind("mousemove", $.vakata.dnd.drag);
        $(document).bind("mouseup", $.vakata.dnd.drag_stop);
        return false;
      },
      drag: function (e) {
        if (!$.vakata.dnd.is_down) { return; }
        if (!$.vakata.dnd.is_drag) {
          if (Math.abs(e.pageX - $.vakata.dnd.init_x) > 5 || Math.abs(e.pageY - $.vakata.dnd.init_y) > 5) {
            $.vakata.dnd.helper.appendTo("body");
            $.vakata.dnd.is_drag = true;
            $(document).triggerHandler("drag_start.vakata", { "event": e, "data": $.vakata.dnd.user_data });
          }
          else { return; }
        }

        // maybe use a scrolling parent element instead of document?
        if (e.type === "mousemove") { // thought of adding scroll in order to move the helper, but mouse poisition is n/a
          var d = $(document), t = d.scrollTop(), l = d.scrollLeft();
          if (e.pageY - t < 20) {
            if (sti && dir1 === "down") { clearInterval(sti); sti = false; }
            if (!sti) { dir1 = "up"; sti = setInterval(function () { $(document).scrollTop($(document).scrollTop() - $.vakata.dnd.scroll_spd); }, 150); }
          }
          else {
            if (sti && dir1 === "up") { clearInterval(sti); sti = false; }
          }
          if ($(window).height() - (e.pageY - t) < 20) {
            if (sti && dir1 === "up") { clearInterval(sti); sti = false; }
            if (!sti) { dir1 = "down"; sti = setInterval(function () { $(document).scrollTop($(document).scrollTop() + $.vakata.dnd.scroll_spd); }, 150); }
          }
          else {
            if (sti && dir1 === "down") { clearInterval(sti); sti = false; }
          }

          if (e.pageX - l < 20) {
            if (sli && dir2 === "right") { clearInterval(sli); sli = false; }
            if (!sli) { dir2 = "left"; sli = setInterval(function () { $(document).scrollLeft($(document).scrollLeft() - $.vakata.dnd.scroll_spd); }, 150); }
          }
          else {
            if (sli && dir2 === "left") { clearInterval(sli); sli = false; }
          }
          if ($(window).width() - (e.pageX - l) < 20) {
            if (sli && dir2 === "left") { clearInterval(sli); sli = false; }
            if (!sli) { dir2 = "right"; sli = setInterval(function () { $(document).scrollLeft($(document).scrollLeft() + $.vakata.dnd.scroll_spd); }, 150); }
          }
          else {
            if (sli && dir2 === "right") { clearInterval(sli); sli = false; }
          }
        }

        $.vakata.dnd.helper.css({ left: (e.pageX + $.vakata.dnd.helper_left) + "px", top: (e.pageY + $.vakata.dnd.helper_top) + "px" });
        $(document).triggerHandler("drag.vakata", { "event": e, "data": $.vakata.dnd.user_data });
      },
      drag_stop: function (e) {
        if (sli) { clearInterval(sli); }
        if (sti) { clearInterval(sti); }
        $(document).unbind("mousemove", $.vakata.dnd.drag);
        $(document).unbind("mouseup", $.vakata.dnd.drag_stop);
        $(document).triggerHandler("drag_stop.vakata", { "event": e, "data": $.vakata.dnd.user_data });
        $.vakata.dnd.helper.remove();
        $.vakata.dnd.init_x = 0;
        $.vakata.dnd.init_y = 0;
        $.vakata.dnd.user_data = {};
        $.vakata.dnd.is_down = false;
        $.vakata.dnd.is_drag = false;
      }
    };
    $(function () {
      var css_string = '#vakata-dragged { display:block; margin:0 0 0 0; padding:4px 4px 4px 24px; position:absolute; top:-2000px; line-height:16px; z-index:10000; } ';
      $.vakata.css.add_sheet({ str: css_string, title: "vakata" });
    });

    $.jstree.plugin("dnd", {
      __init: function () {
        this.data.dnd = {
          active: false,
          after: false,
          inside: false,
          before: false,
          off: false,
          prepared: false,
          w: 0,
          to1: false,
          to2: false,
          cof: false,
          cw: false,
          ch: false,
          i1: false,
          i2: false,
          mto: false
        };
        this.get_container()
          .bind("mouseenter.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              if (this.data.themes) {
                m.attr("class", "jstree-" + this.data.themes.theme);
                if (ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
                $.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme);
              }
              //if($(e.currentTarget).find("> ul > li").length === 0) {
              if (e.currentTarget === e.target && $.vakata.dnd.user_data.obj && $($.vakata.dnd.user_data.obj).length && $($.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== e.target) { // node should not be from the same tree
                var tr = $.jstree._reference(e.target), dc;
                if (tr.data.dnd.foreign) {
                  dc = tr._get_settings().dnd.drag_check.call(this, { "o": o, "r": tr.get_container(), is_root: true });
                  if (dc === true || dc.inside === true || dc.before === true || dc.after === true) {
                    $.vakata.dnd.helper.children("ins").attr("class", "jstree-ok");
                  }
                }
                else {
                  tr.prepare_move(o, tr.get_container(), "last");
                  if (tr.check_move()) {
                    $.vakata.dnd.helper.children("ins").attr("class", "jstree-ok");
                  }
                }
              }
            }
          }, this))
          .bind("mouseup.jstree", $.proxy(function (e) {
            //if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && $(e.currentTarget).find("> ul > li").length === 0) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && e.currentTarget === e.target && $.vakata.dnd.user_data.obj && $($.vakata.dnd.user_data.obj).length && $($.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== e.target) { // node should not be from the same tree
              var tr = $.jstree._reference(e.currentTarget), dc;
              if (tr.data.dnd.foreign) {
                dc = tr._get_settings().dnd.drag_check.call(this, { "o": o, "r": tr.get_container(), is_root: true });
                if (dc === true || dc.inside === true || dc.before === true || dc.after === true) {
                  tr._get_settings().dnd.drag_finish.call(this, { "o": o, "r": tr.get_container(), is_root: true });
                }
              }
              else {
                tr.move_node(o, tr.get_container(), "last", e[tr._get_settings().dnd.copy_modifier + "Key"]);
              }
            }
          }, this))
          .bind("mouseleave.jstree", $.proxy(function (e) {
            if (e.relatedTarget && e.relatedTarget.id && e.relatedTarget.id === "jstree-marker-line") {
              return false;
            }
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              if (this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
              if (this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
              if (this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
              if (this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
              if ($.vakata.dnd.helper.children("ins").hasClass("jstree-ok")) {
                $.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
              }
            }
          }, this))
          .bind("mousemove.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              var cnt = this.get_container()[0];

              // Horizontal scroll
              if (e.pageX + 24 > this.data.dnd.cof.left + this.data.dnd.cw) {
                if (this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
                this.data.dnd.i1 = setInterval($.proxy(function () { this.scrollLeft += $.vakata.dnd.scroll_spd; }, cnt), 100);
              }
              else if (e.pageX - 24 < this.data.dnd.cof.left) {
                if (this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
                this.data.dnd.i1 = setInterval($.proxy(function () { this.scrollLeft -= $.vakata.dnd.scroll_spd; }, cnt), 100);
              }
              else {
                if (this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
              }

              // Vertical scroll
              if (e.pageY + 24 > this.data.dnd.cof.top + this.data.dnd.ch) {
                if (this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
                this.data.dnd.i2 = setInterval($.proxy(function () { this.scrollTop += $.vakata.dnd.scroll_spd; }, cnt), 100);
              }
              else if (e.pageY - 24 < this.data.dnd.cof.top) {
                if (this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
                this.data.dnd.i2 = setInterval($.proxy(function () { this.scrollTop -= $.vakata.dnd.scroll_spd; }, cnt), 100);
              }
              else {
                if (this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
              }

            }
          }, this))
          .bind("scroll.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && m && ml) {
              m.hide();
              ml.hide();
            }
          }, this))
          .delegate("a", "mousedown.jstree", $.proxy(function (e) {
            if (e.which === 1) {
              this.start_drag(e.currentTarget, e);
              return false;
            }
          }, this))
          .delegate("a", "mouseenter.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              this.dnd_enter(e.currentTarget);
            }
          }, this))
          .delegate("a", "mousemove.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              if (!r || !r.length || r.children("a")[0] !== e.currentTarget) {
                this.dnd_enter(e.currentTarget);
              }
              if (typeof this.data.dnd.off.top === "undefined") { this.data.dnd.off = $(e.target).offset(); }
              this.data.dnd.w = (e.pageY - (this.data.dnd.off.top || 0)) % this.data.core.li_height;
              if (this.data.dnd.w < 0) { this.data.dnd.w += this.data.core.li_height; }
              this.dnd_show();
            }
          }, this))
          .delegate("a", "mouseleave.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              if (e.relatedTarget && e.relatedTarget.id && e.relatedTarget.id === "jstree-marker-line") {
                return false;
              }
              if (m) { m.hide(); }
              if (ml) { ml.hide(); }
              /*
							var ec = $(e.currentTarget).closest("li"), 
								er = $(e.relatedTarget).closest("li");
							if(er[0] !== ec.prev()[0] && er[0] !== ec.next()[0]) {
								if(m) { m.hide(); }
								if(ml) { ml.hide(); }
							}
							*/
              this.data.dnd.mto = setTimeout(
								(function (t) { return function () { t.dnd_leave(e); }; })(this),
							0);
            }
          }, this))
          .delegate("a", "mouseup.jstree", $.proxy(function (e) {
            if ($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
              this.dnd_finish(e);
            }
          }, this));

        $(document)
          .bind("drag_stop.vakata", $.proxy(function () {
            if (this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
            if (this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
            if (this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
            if (this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
            this.data.dnd.after = false;
            this.data.dnd.before = false;
            this.data.dnd.inside = false;
            this.data.dnd.off = false;
            this.data.dnd.prepared = false;
            this.data.dnd.w = false;
            this.data.dnd.to1 = false;
            this.data.dnd.to2 = false;
            this.data.dnd.i1 = false;
            this.data.dnd.i2 = false;
            this.data.dnd.active = false;
            this.data.dnd.foreign = false;
            if (m) { m.css({ "top": "-2000px" }); }
            if (ml) { ml.css({ "top": "-2000px" }); }
          }, this))
          .bind("drag_start.vakata", $.proxy(function (e, data) {
            if (data.data.jstree) {
              var et = $(data.event.target);
              if (et.closest(".jstree").hasClass("jstree-" + this.get_index())) {
                this.dnd_enter(et);
              }
            }
          }, this));
        /*
				.bind("keydown.jstree-" + this.get_index() + " keyup.jstree-" + this.get_index(), $.proxy(function(e) {
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && !this.data.dnd.foreign) {
							var h = $.vakata.dnd.helper.children("ins");
							if(e[this._get_settings().dnd.copy_modifier + "Key"] && h.hasClass("jstree-ok")) {
								h.parent().html(h.parent().html().replace(/ \(Copy\)$/, "") + " (Copy)");
							} 
							else {
								h.parent().html(h.parent().html().replace(/ \(Copy\)$/, ""));
							}
						}
					}, this)); */



        var s = this._get_settings().dnd;
        if (s.drag_target) {
          $(document)
            .delegate(s.drag_target, "mousedown.jstree-" + this.get_index(), $.proxy(function (e) {
              o = e.target;
              $.vakata.dnd.drag_start(e, { jstree: true, obj: e.target }, "<ins class='jstree-icon'></ins>" + $(e.target).text());
              if (this.data.themes) {
                if (m) { m.attr("class", "jstree-" + this.data.themes.theme); }
                if (ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
                $.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme);
              }
              $.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
              var cnt = this.get_container();
              this.data.dnd.cof = cnt.offset();
              this.data.dnd.cw = parseInt(cnt.width(), 10);
              this.data.dnd.ch = parseInt(cnt.height(), 10);
              this.data.dnd.foreign = true;
              e.preventDefault();
            }, this));
        }
        if (s.drop_target) {
          $(document)
            .delegate(s.drop_target, "mouseenter.jstree-" + this.get_index(), $.proxy(function (e) {
              if (this.data.dnd.active && this._get_settings().dnd.drop_check.call(this, { "o": o, "r": $(e.target), "e": e })) {
                $.vakata.dnd.helper.children("ins").attr("class", "jstree-ok");
              }
            }, this))
            .delegate(s.drop_target, "mouseleave.jstree-" + this.get_index(), $.proxy(function (e) {
              if (this.data.dnd.active) {
                $.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
              }
            }, this))
            .delegate(s.drop_target, "mouseup.jstree-" + this.get_index(), $.proxy(function (e) {
              if (this.data.dnd.active && $.vakata.dnd.helper.children("ins").hasClass("jstree-ok")) {
                this._get_settings().dnd.drop_finish.call(this, { "o": o, "r": $(e.target), "e": e });
              }
            }, this));
        }
      },
      defaults: {
        copy_modifier: "ctrl",
        check_timeout: 100,
        open_timeout: 500,
        drop_target: ".jstree-drop",
        drop_check: function (data) { return true; },
        drop_finish: $.noop,
        drag_target: ".jstree-draggable",
        drag_finish: $.noop,
        drag_check: function (data) { return { after: false, before: false, inside: true }; }
      },
      _fn: {
        dnd_prepare: function () {
          if (!r || !r.length) { return; }
          this.data.dnd.off = r.offset();
          if (this._get_settings().core.rtl) {
            this.data.dnd.off.right = this.data.dnd.off.left + r.width();
          }
          if (this.data.dnd.foreign) {
            var a = this._get_settings().dnd.drag_check.call(this, { "o": o, "r": r });
            this.data.dnd.after = a.after;
            this.data.dnd.before = a.before;
            this.data.dnd.inside = a.inside;
            this.data.dnd.prepared = true;
            return this.dnd_show();
          }
          this.prepare_move(o, r, "before");
          this.data.dnd.before = this.check_move();
          this.prepare_move(o, r, "after");
          this.data.dnd.after = this.check_move();
          if (this._is_loaded(r)) {
            this.prepare_move(o, r, "inside");
            this.data.dnd.inside = this.check_move();
          }
          else {
            this.data.dnd.inside = false;
          }
          this.data.dnd.prepared = true;
          return this.dnd_show();
        },
        dnd_show: function () {
          if (!this.data.dnd.prepared) { return; }
          var o = ["before", "inside", "after"],
            r = false,
            rtl = this._get_settings().core.rtl,
            pos;
          if (this.data.dnd.w < this.data.core.li_height / 3) { o = ["before", "inside", "after"]; }
          else if (this.data.dnd.w <= this.data.core.li_height * 2 / 3) {
            o = this.data.dnd.w < this.data.core.li_height / 2 ? ["inside", "before", "after"] : ["inside", "after", "before"];
          }
          else { o = ["after", "inside", "before"]; }
          $.each(o, $.proxy(function (i, val) {
            if (this.data.dnd[val]) {
              $.vakata.dnd.helper.children("ins").attr("class", "jstree-ok");
              r = val;
              return false;
            }
          }, this));
          if (r === false) { $.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid"); }

          pos = rtl ? (this.data.dnd.off.right - 18) : (this.data.dnd.off.left + 10);
          switch (r) {
            case "before":
              m.css({ "left": pos + "px", "top": (this.data.dnd.off.top - 6) + "px" }).show();
              if (ml) { ml.css({ "left": (pos + 8) + "px", "top": (this.data.dnd.off.top - 1) + "px" }).show(); }
              break;
            case "after":
              m.css({ "left": pos + "px", "top": (this.data.dnd.off.top + this.data.core.li_height - 6) + "px" }).show();
              if (ml) { ml.css({ "left": (pos + 8) + "px", "top": (this.data.dnd.off.top + this.data.core.li_height - 1) + "px" }).show(); }
              break;
            case "inside":
              m.css({ "left": pos + (rtl ? -4 : 4) + "px", "top": (this.data.dnd.off.top + this.data.core.li_height / 2 - 5) + "px" }).show();
              if (ml) { ml.hide(); }
              break;
            default:
              m.hide();
              if (ml) { ml.hide(); }
              break;
          }
          last_pos = r;
          return r;
        },
        dnd_open: function () {
          this.data.dnd.to2 = false;
          this.open_node(r, $.proxy(this.dnd_prepare, this), true);
        },
        dnd_finish: function (e) {
          if (this.data.dnd.foreign) {
            if (this.data.dnd.after || this.data.dnd.before || this.data.dnd.inside) {
              this._get_settings().dnd.drag_finish.call(this, { "o": o, "r": r, "p": last_pos });
            }
          }
          else {
            this.dnd_prepare();
            this.move_node(o, r, last_pos, e[this._get_settings().dnd.copy_modifier + "Key"]);
          }
          o = false;
          r = false;
          m.hide();
          if (ml) { ml.hide(); }
        },
        dnd_enter: function (obj) {
          if (this.data.dnd.mto) {
            clearTimeout(this.data.dnd.mto);
            this.data.dnd.mto = false;
          }
          var s = this._get_settings().dnd;
          this.data.dnd.prepared = false;
          r = this._get_node(obj);
          if (s.check_timeout) {
            // do the calculations after a minimal timeout (users tend to drag quickly to the desired location)
            if (this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
            this.data.dnd.to1 = setTimeout($.proxy(this.dnd_prepare, this), s.check_timeout);
          }
          else {
            this.dnd_prepare();
          }
          if (s.open_timeout) {
            if (this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
            if (r && r.length && r.hasClass("jstree-closed")) {
              // if the node is closed - open it, then recalculate
              this.data.dnd.to2 = setTimeout($.proxy(this.dnd_open, this), s.open_timeout);
            }
          }
          else {
            if (r && r.length && r.hasClass("jstree-closed")) {
              this.dnd_open();
            }
          }
        },
        dnd_leave: function (e) {
          this.data.dnd.after = false;
          this.data.dnd.before = false;
          this.data.dnd.inside = false;
          $.vakata.dnd.helper.children("ins").attr("class", "jstree-invalid");
          m.hide();
          if (ml) { ml.hide(); }
          if (r && r[0] === e.target.parentNode) {
            if (this.data.dnd.to1) {
              clearTimeout(this.data.dnd.to1);
              this.data.dnd.to1 = false;
            }
            if (this.data.dnd.to2) {
              clearTimeout(this.data.dnd.to2);
              this.data.dnd.to2 = false;
            }
          }
        },
        start_drag: function (obj, e) {
          o = this._get_node(obj);
          if (this.data.ui && this.is_selected(o)) { o = this._get_node(null, true); }
          var dt = o.length > 1 ? this._get_string("multiple_selection") : this.get_text(o),
            cnt = this.get_container();
          if (!this._get_settings().core.html_titles) { dt = dt.replace(/</ig, "&lt;").replace(/>/ig, "&gt;"); }
          $.vakata.dnd.drag_start(e, { jstree: true, obj: o }, "<ins class='jstree-icon'></ins>" + dt);
          if (this.data.themes) {
            if (m) { m.attr("class", "jstree-" + this.data.themes.theme); }
            if (ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
            $.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme);
          }
          this.data.dnd.cof = cnt.offset();
          this.data.dnd.cw = parseInt(cnt.width(), 10);
          this.data.dnd.ch = parseInt(cnt.height(), 10);
          this.data.dnd.active = true;
        }
      }
    });
    $(function () {
      var css_string = '' +
        '#vakata-dragged ins { display:block; text-decoration:none; width:16px; height:16px; margin:0 0 0 0; padding:0; position:absolute; top:4px; left:4px; ' +
        ' -moz-border-radius:4px; border-radius:4px; -webkit-border-radius:4px; ' +
        '} ' +
        '#vakata-dragged .jstree-ok { background:green; } ' +
        '#vakata-dragged .jstree-invalid { background:red; } ' +
        '#jstree-marker { padding:0; margin:0; font-size:12px; overflow:hidden; height:12px; width:8px; position:absolute; top:-30px; z-index:10001; background-repeat:no-repeat; display:none; background-color:transparent; text-shadow:1px 1px 1px white; color:black; line-height:10px; } ' +
        '#jstree-marker-line { padding:0; margin:0; line-height:0%; font-size:1px; overflow:hidden; height:1px; width:100px; position:absolute; top:-30px; z-index:10000; background-repeat:no-repeat; display:none; background-color:#456c43; ' +
        ' cursor:pointer; border:1px solid #eeeeee; border-left:0; -moz-box-shadow: 0px 0px 2px #666; -webkit-box-shadow: 0px 0px 2px #666; box-shadow: 0px 0px 2px #666; ' +
        ' -moz-border-radius:1px; border-radius:1px; -webkit-border-radius:1px; ' +
        '}' +
        '';
      $.vakata.css.add_sheet({ str: css_string, title: "jstree" });
      m = $("<div />").attr({ id: "jstree-marker" }).hide().html("&raquo;")
        .bind("mouseleave mouseenter", function (e) {
          m.hide();
          ml.hide();
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        })
        .appendTo("body");
      ml = $("<div />").attr({ id: "jstree-marker-line" }).hide()
        .bind("mouseup", function (e) {
          if (r && r.length) {
            r.children("a").trigger(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
          }
        })
        .bind("mouseleave", function (e) {
          var rt = $(e.relatedTarget);
          if (rt.is(".jstree") || rt.closest(".jstree").length === 0) {
            if (r && r.length) {
              r.children("a").trigger(e);
              m.hide();
              ml.hide();
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
          }
        })
        .appendTo("body");
      $(document).bind("drag_start.vakata", function (e, data) {
        if (data.data.jstree) { m.show(); if (ml) { ml.show(); } }
      });
      $(document).bind("drag_stop.vakata", function (e, data) {
        if (data.data.jstree) { m.hide(); if (ml) { ml.hide(); } }
      });
    });
  })(jQuery);
  //*/

  /*
   * jsTree checkbox plugin
   * Inserts checkboxes in front of every node
   * Depends on the ui plugin
   * DOES NOT WORK NICELY WITH MULTITREE DRAG'N'DROP
   */
  (function ($) {
    $.jstree.plugin("checkbox", {
      __init: function () {
        this.data.checkbox.noui = this._get_settings().checkbox.override_ui;
        if (this.data.ui && this.data.checkbox.noui) {
          this.select_node = this.deselect_node = this.deselect_all = $.noop;
          this.get_selected = this.get_checked;
        }

        this.get_container()
          .bind("open_node.jstree create_node.jstree clean_node.jstree refresh.jstree", $.proxy(function (e, data) {
            this._prepare_checkboxes(data.rslt.obj);
          }, this))
          .bind("loaded.jstree", $.proxy(function (e) {
            this._prepare_checkboxes();
          }, this))
          .delegate((this.data.ui && this.data.checkbox.noui ? "a" : "ins.jstree-checkbox"), "click.jstree", $.proxy(function (e) {
            e.preventDefault();
            if (this._get_node(e.target).hasClass("jstree-checked")) { this.uncheck_node(e.target); }
            else { this.check_node(e.target); }
            if (this.data.ui && this.data.checkbox.noui) {
              this.save_selected();
              if (this.data.cookies) { this.save_cookie("select_node"); }
            }
            else {
              e.stopImmediatePropagation();
              return false;
            }
          }, this));
      },
      defaults: {
        override_ui: false,
        two_state: false,
        real_checkboxes: false,
        checked_parent_open: true,
        real_checkboxes_names: function (n) { return [("check_" + (n[0].id || Math.ceil(Math.random() * 10000))), 1]; }
      },
      __destroy: function () {
        this.get_container()
          .find("input.jstree-real-checkbox").removeClass("jstree-real-checkbox").end()
          .find("ins.jstree-checkbox").remove();
      },
      _fn: {
        _checkbox_notify: function (n, data) {
          if (data.checked) {
            this.check_node(n, false);
          }
        },
        _prepare_checkboxes: function (obj) {
          obj = !obj || obj == -1 ? this.get_container().find("> ul > li") : this._get_node(obj);
          if (obj === false) { return; } // added for removing root nodes
          var c, _this = this, t, ts = this._get_settings().checkbox.two_state, rc = this._get_settings().checkbox.real_checkboxes, rcn = this._get_settings().checkbox.real_checkboxes_names;
          obj.each(function () {
            t = $(this);
            c = t.is("li") && (t.hasClass("jstree-checked") || (rc && t.children(":checked").length)) ? "jstree-checked" : "jstree-unchecked";
            t.find("li").addBack().each(function () {
              var $t = $(this), nm;
              $t.children("a" + (_this.data.languages ? "" : ":eq(0)")).not(":has(.jstree-checkbox)").prepend("<ins class='jstree-checkbox'>&#160;</ins>").parent().not(".jstree-checked, .jstree-unchecked").addClass(ts ? "jstree-unchecked" : c);
              if (rc) {
                if (!$t.children(":checkbox").length) {
                  nm = rcn.call(_this, $t);
                  $t.prepend("<input type='checkbox' class='jstree-real-checkbox' id='" + nm[0] + "' name='" + nm[0] + "' value='" + nm[1] + "' />");
                }
                else {
                  $t.children(":checkbox").addClass("jstree-real-checkbox");
                }
              }
              if (!ts) {
                if (c === "jstree-checked" || $t.hasClass("jstree-checked") || $t.children(':checked').length) {
                  $t.find("li").addBack().addClass("jstree-checked").children(":checkbox").prop("checked", true);
                }
              }
              else {
                if ($t.hasClass("jstree-checked") || $t.children(':checked').length) {
                  $t.addClass("jstree-checked").children(":checkbox").prop("checked", true);
                }
              }
            });
          });
          if (!ts) {
            obj.find(".jstree-checked").parent().parent().each(function () { _this._repair_state(this); });
          }
        },
        change_state: function (obj, state) {
          obj = this._get_node(obj);
          var coll = false, rc = this._get_settings().checkbox.real_checkboxes;
          if (!obj || obj === -1) { return false; }
          state = (state === false || state === true) ? state : obj.hasClass("jstree-checked");
          if (this._get_settings().checkbox.two_state) {
            if (state) {
              obj.removeClass("jstree-checked").addClass("jstree-unchecked");
              if (rc) { obj.children(":checkbox").prop("checked", false); }
            }
            else {
              obj.removeClass("jstree-unchecked").addClass("jstree-checked");
              if (rc) { obj.children(":checkbox").prop("checked", true); }
            }
          }
          else {
            if (state) {
              coll = obj.find("li").addBack();
              if (!coll.filter(".jstree-checked, .jstree-undetermined").length) { return false; }
              coll.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
              if (rc) { coll.children(":checkbox").prop("checked", false); }
            }
            else {
              coll = obj.find("li").addBack();
              if (!coll.filter(".jstree-unchecked, .jstree-undetermined").length) { return false; }
              coll.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
              if (rc) { coll.children(":checkbox").prop("checked", true); }
              if (this.data.ui) { this.data.ui.last_selected = obj; }
              this.data.checkbox.last_selected = obj;
            }
            obj.parentsUntil(".jstree", "li").each(function () {
              var $this = $(this);
              if (state) {
                if ($this.children("ul").children("li.jstree-checked, li.jstree-undetermined").length) {
                  $this.parentsUntil(".jstree", "li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
                  if (rc) { $this.parentsUntil(".jstree", "li").addBack().children(":checkbox").prop("checked", false); }
                  return false;
                }
                else {
                  $this.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
                  if (rc) { $this.children(":checkbox").prop("checked", false); }
                }
              }
              else {
                if ($this.children("ul").children("li.jstree-unchecked, li.jstree-undetermined").length) {
                  $this.parentsUntil(".jstree", "li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
                  if (rc) { $this.parentsUntil(".jstree", "li").addBack().children(":checkbox").prop("checked", false); }
                  return false;
                }
                else {
                  $this.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
                  if (rc) { $this.children(":checkbox").prop("checked", true); }
                }
              }
            });
          }
          if (this.data.ui && this.data.checkbox.noui) { this.data.ui.selected = this.get_checked(); }
          this.__callback(obj);
          return true;
        },
        check_node: function (obj) {
          if (this.change_state(obj, false)) {
            obj = this._get_node(obj);
            if (this._get_settings().checkbox.checked_parent_open) {
              var t = this;
              obj.parents(".jstree-closed").each(function () { t.open_node(this, false, true); });
            }
            this.__callback({ "obj": obj });
          }
        },
        uncheck_node: function (obj) {
          if (this.change_state(obj, true)) { this.__callback({ "obj": this._get_node(obj) }); }
        },
        check_all: function () {
          var _this = this,
            coll = this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li");
          coll.each(function () {
            _this.change_state(this, false);
          });
          this.__callback();
        },
        uncheck_all: function () {
          var _this = this,
            coll = this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li");
          coll.each(function () {
            _this.change_state(this, true);
          });
          this.__callback();
        },

        is_checked: function (obj) {
          obj = this._get_node(obj);
          return obj.length ? obj.is(".jstree-checked") : false;
        },
        get_checked: function (obj, get_all) {
          obj = !obj || obj === -1 ? this.get_container() : this._get_node(obj);
          return get_all || this._get_settings().checkbox.two_state ? obj.find(".jstree-checked") : obj.find("> ul > .jstree-checked, .jstree-undetermined > ul > .jstree-checked");
        },
        get_unchecked: function (obj, get_all) {
          obj = !obj || obj === -1 ? this.get_container() : this._get_node(obj);
          return get_all || this._get_settings().checkbox.two_state ? obj.find(".jstree-unchecked") : obj.find("> ul > .jstree-unchecked, .jstree-undetermined > ul > .jstree-unchecked");
        },

        show_checkboxes: function () { this.get_container().children("ul").removeClass("jstree-no-checkboxes"); },
        hide_checkboxes: function () { this.get_container().children("ul").addClass("jstree-no-checkboxes"); },

        _repair_state: function (obj) {
          obj = this._get_node(obj);
          if (!obj.length) { return; }
          if (this._get_settings().checkbox.two_state) {
            obj.find('li').addBack().not('.jstree-checked').removeClass('jstree-undetermined').addClass('jstree-unchecked').children(':checkbox').prop('checked', true);
            return;
          }
          var rc = this._get_settings().checkbox.real_checkboxes,
            a = obj.find("> ul > .jstree-checked").length,
            b = obj.find("> ul > .jstree-undetermined").length,
            c = obj.find("> ul > li").length;
          if (c === 0) { if (obj.hasClass("jstree-undetermined")) { this.change_state(obj, false); } }
          else if (a === 0 && b === 0) { this.change_state(obj, true); }
          else if (a === c) { this.change_state(obj, false); }
          else {
            obj.parentsUntil(".jstree", "li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
            if (rc) { obj.parentsUntil(".jstree", "li").addBack().children(":checkbox").prop("checked", false); }
          }
        },
        reselect: function () {
          if (this.data.ui && this.data.checkbox.noui) {
            var _this = this,
              s = this.data.ui.to_select;
            s = $.map($.makeArray(s), function (n) { return "#" + n.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"); });
            this.deselect_all();
            $.each(s, function (i, val) { _this.check_node(val); });
            this.__callback();
          }
          else {
            this.__call_old();
          }
        },
        save_loaded: function () {
          var _this = this;
          this.data.core.to_load = [];
          this.get_container_ul().find("li.jstree-closed.jstree-undetermined").each(function () {
            if (this.id) { _this.data.core.to_load.push("#" + this.id); }
          });
        }
      }
    });
    $(function () {
      var css_string = '.jstree .jstree-real-checkbox { display:none; } ';
      $.vakata.css.add_sheet({ str: css_string, title: "jstree" });
    });
  })(jQuery);
  //*/

  /* 
   * jsTree XML plugin
   * The XML data store. Datastores are build by overriding the `load_node` and `_is_loaded` functions.
   */
  (function ($) {
    $.vakata.xslt = function (xml, xsl, callback) {
      var r = false, p, q, s;
      // IE9
      if (r === false && window.ActiveXObject) {
        try {
          r = new ActiveXObject("Msxml2.XSLTemplate");
          q = new ActiveXObject("Msxml2.DOMDocument");
          q.loadXML(xml);
          s = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
          s.loadXML(xsl);
          r.stylesheet = s;
          p = r.createProcessor();
          p.input = q;
          p.transform();
          r = p.output;
        }
        catch (e) { }
      }
      xml = $.parseXML(xml);
      xsl = $.parseXML(xsl);
      // FF, Chrome
      if (r === false && typeof (XSLTProcessor) !== "undefined") {
        p = new XSLTProcessor();
        p.importStylesheet(xsl);
        r = p.transformToFragment(xml, document);
        r = $('<div />').append(r).html();
      }
      // OLD IE
      if (r === false && typeof (xml.transformNode) !== "undefined") {
        r = xml.transformNode(xsl);
      }
      callback.call(null, r);
    };
    var xsl = {
      'nest': '<' + '?xml version="1.0" encoding="utf-8" ?>' +
        '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >' +
        '<xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/html" />' +
        '<xsl:template match="/">' +
        '	<xsl:call-template name="nodes">' +
        '		<xsl:with-param name="node" select="/root" />' +
        '	</xsl:call-template>' +
        '</xsl:template>' +
        '<xsl:template name="nodes">' +
        '	<xsl:param name="node" />' +
        '	<ul>' +
        '	<xsl:for-each select="$node/item">' +
        '		<xsl:variable name="children" select="count(./item) &gt; 0" />' +
        '		<li>' +
        '			<xsl:attribute name="class">' +
        '				<xsl:if test="position() = last()">jstree-last </xsl:if>' +
        '				<xsl:choose>' +
        '					<xsl:when test="@state = \'open\'">jstree-open </xsl:when>' +
        '					<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>' +
        '					<xsl:otherwise>jstree-leaf </xsl:otherwise>' +
        '				</xsl:choose>' +
        '				<xsl:value-of select="@class" />' +
        '			</xsl:attribute>' +
        '			<xsl:for-each select="@*">' +
        '				<xsl:if test="name() != \'class\' and name() != \'state\' and name() != \'hasChildren\'">' +
        '					<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' +
        '				</xsl:if>' +
        '			</xsl:for-each>' +
        '	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>' +
        '			<xsl:for-each select="content/name">' +
        '				<a>' +
        '				<xsl:attribute name="href">' +
        '					<xsl:choose>' +
        '					<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>' +
        '					<xsl:otherwise>#</xsl:otherwise>' +
        '					</xsl:choose>' +
        '				</xsl:attribute>' +
        '				<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>' +
        '				<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>' +
        '				<xsl:for-each select="@*">' +
        '					<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">' +
        '						<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' +
        '					</xsl:if>' +
        '				</xsl:for-each>' +
        '					<ins>' +
        '						<xsl:attribute name="class">jstree-icon ' +
        '							<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>' +
        '						</xsl:attribute>' +
        '						<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>' +
        '						<xsl:text>&#xa0;</xsl:text>' +
        '					</ins>' +
        '					<xsl:copy-of select="./child::node()" />' +
        '				</a>' +
        '			</xsl:for-each>' +
        '			<xsl:if test="$children or @hasChildren"><xsl:call-template name="nodes"><xsl:with-param name="node" select="current()" /></xsl:call-template></xsl:if>' +
        '		</li>' +
        '	</xsl:for-each>' +
        '	</ul>' +
        '</xsl:template>' +
        '</xsl:stylesheet>',

      'flat': '<' + '?xml version="1.0" encoding="utf-8" ?>' +
        '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >' +
        '<xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/xml" />' +
        '<xsl:template match="/">' +
        '	<ul>' +
        '	<xsl:for-each select="//item[not(@parent_id) or @parent_id=0 or not(@parent_id = //item/@id)]">' + /* the last `or` may be removed */
        '		<xsl:call-template name="nodes">' +
        '			<xsl:with-param name="node" select="." />' +
        '			<xsl:with-param name="is_last" select="number(position() = last())" />' +
        '		</xsl:call-template>' +
        '	</xsl:for-each>' +
        '	</ul>' +
        '</xsl:template>' +
        '<xsl:template name="nodes">' +
        '	<xsl:param name="node" />' +
        '	<xsl:param name="is_last" />' +
        '	<xsl:variable name="children" select="count(//item[@parent_id=$node/attribute::id]) &gt; 0" />' +
        '	<li>' +
        '	<xsl:attribute name="class">' +
        '		<xsl:if test="$is_last = true()">jstree-last </xsl:if>' +
        '		<xsl:choose>' +
        '			<xsl:when test="@state = \'open\'">jstree-open </xsl:when>' +
        '			<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>' +
        '			<xsl:otherwise>jstree-leaf </xsl:otherwise>' +
        '		</xsl:choose>' +
        '		<xsl:value-of select="@class" />' +
        '	</xsl:attribute>' +
        '	<xsl:for-each select="@*">' +
        '		<xsl:if test="name() != \'parent_id\' and name() != \'hasChildren\' and name() != \'class\' and name() != \'state\'">' +
        '		<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' +
        '		</xsl:if>' +
        '	</xsl:for-each>' +
        '	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>' +
        '	<xsl:for-each select="content/name">' +
        '		<a>' +
        '		<xsl:attribute name="href">' +
        '			<xsl:choose>' +
        '			<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>' +
        '			<xsl:otherwise>#</xsl:otherwise>' +
        '			</xsl:choose>' +
        '		</xsl:attribute>' +
        '		<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>' +
        '		<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>' +
        '		<xsl:for-each select="@*">' +
        '			<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">' +
        '				<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' +
        '			</xsl:if>' +
        '		</xsl:for-each>' +
        '			<ins>' +
        '				<xsl:attribute name="class">jstree-icon ' +
        '					<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>' +
        '				</xsl:attribute>' +
        '				<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>' +
        '				<xsl:text>&#xa0;</xsl:text>' +
        '			</ins>' +
        '			<xsl:copy-of select="./child::node()" />' +
        '		</a>' +
        '	</xsl:for-each>' +
        '	<xsl:if test="$children">' +
        '		<ul>' +
        '		<xsl:for-each select="//item[@parent_id=$node/attribute::id]">' +
        '			<xsl:call-template name="nodes">' +
        '				<xsl:with-param name="node" select="." />' +
        '				<xsl:with-param name="is_last" select="number(position() = last())" />' +
        '			</xsl:call-template>' +
        '		</xsl:for-each>' +
        '		</ul>' +
        '	</xsl:if>' +
        '	</li>' +
        '</xsl:template>' +
        '</xsl:stylesheet>'
    },
    escape_xml = function (string) {
      return string
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };
    $.jstree.plugin("xml_data", {
      defaults: {
        data: false,
        ajax: false,
        xsl: "flat",
        clean_node: false,
        correct_state: true,
        get_skip_empty: false,
        get_include_preamble: true
      },
      _fn: {
        load_node: function (obj, s_call, e_call) { var _this = this; this.load_node_xml(obj, function () { _this.__callback({ "obj": _this._get_node(obj) }); s_call.call(this); }, e_call); },
        _is_loaded: function (obj) {
          var s = this._get_settings().xml_data;
          obj = this._get_node(obj);
          return obj == -1 || !obj || (!s.ajax && !$.isFunction(s.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").size() > 0;
        },
        load_node_xml: function (obj, s_call, e_call) {
          var s = this.get_settings().xml_data,
            error_func = function () { },
            success_func = function () { };

          obj = this._get_node(obj);
          if (obj && obj !== -1) {
            if (obj.data("jstree_is_loading")) { return; }
            else { obj.data("jstree_is_loading", true); }
          }
          switch (!0) {
            case (!s.data && !s.ajax): throw "Neither data nor ajax settings supplied.";
            case ($.isFunction(s.data)):
              s.data.call(this, obj, $.proxy(function (d) {
                this.parse_xml(d, $.proxy(function (d) {
                  if (d) {
                    d = d.replace(/ ?xmlns="[^"]*"/ig, "");
                    if (d.length > 10) {
                      d = $(d);
                      if (obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
                      else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d); obj.removeData("jstree_is_loading"); }
                      if (s.clean_node) { this.clean_node(obj); }
                      if (s_call) { s_call.call(this); }
                    }
                    else {
                      if (obj && obj !== -1) {
                        obj.children("a.jstree-loading").removeClass("jstree-loading");
                        obj.removeData("jstree_is_loading");
                        if (s.correct_state) {
                          this.correct_state(obj);
                          if (s_call) { s_call.call(this); }
                        }
                      }
                      else {
                        if (s.correct_state) {
                          this.get_container().children("ul").empty();
                          if (s_call) { s_call.call(this); }
                        }
                      }
                    }
                  }
                }, this));
              }, this));
              break;
            case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
              if (!obj || obj == -1) {
                this.parse_xml(s.data, $.proxy(function (d) {
                  if (d) {
                    d = d.replace(/ ?xmlns="[^"]*"/ig, "");
                    if (d.length > 10) {
                      d = $(d);
                      this.get_container().children("ul").empty().append(d.children());
                      if (s.clean_node) { this.clean_node(obj); }
                      if (s_call) { s_call.call(this); }
                    }
                  }
                  else {
                    if (s.correct_state) {
                      this.get_container().children("ul").empty();
                      if (s_call) { s_call.call(this); }
                    }
                  }
                }, this));
              }
              break;
            case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
              error_func = function (x, t, e) {
                var ef = this.get_settings().xml_data.ajax.error;
                if (ef) { ef.call(this, x, t, e); }
                if (obj !== -1 && obj.length) {
                  obj.children("a.jstree-loading").removeClass("jstree-loading");
                  obj.removeData("jstree_is_loading");
                  if (t === "success" && s.correct_state) { this.correct_state(obj); }
                }
                else {
                  if (t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
                }
                if (e_call) { e_call.call(this); }
              };
              success_func = function (d, t, x) {
                d = x.responseText;
                var sf = this.get_settings().xml_data.ajax.success;
                if (sf) { d = sf.call(this, d, t, x) || d; }
                if (d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/, "") === "")) {
                  return error_func.call(this, x, t, "");
                }
                this.parse_xml(d, $.proxy(function (d) {
                  if (d) {
                    d = d.replace(/ ?xmlns="[^"]*"/ig, "");
                    if (d.length > 10) {
                      d = $(d);
                      if (obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
                      else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d); obj.removeData("jstree_is_loading"); }
                      if (s.clean_node) { this.clean_node(obj); }
                      if (s_call) { s_call.call(this); }
                    }
                    else {
                      if (obj && obj !== -1) {
                        obj.children("a.jstree-loading").removeClass("jstree-loading");
                        obj.removeData("jstree_is_loading");
                        if (s.correct_state) {
                          this.correct_state(obj);
                          if (s_call) { s_call.call(this); }
                        }
                      }
                      else {
                        if (s.correct_state) {
                          this.get_container().children("ul").empty();
                          if (s_call) { s_call.call(this); }
                        }
                      }
                    }
                  }
                }, this));
              };
              s.ajax.context = this;
              s.ajax.error = error_func;
              s.ajax.success = success_func;
              if (!s.ajax.dataType) { s.ajax.dataType = "xml"; }
              if ($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
              if ($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
              $.ajax(s.ajax);
              break;
          }
        },
        parse_xml: function (xml, callback) {
          var s = this._get_settings().xml_data;
          $.vakata.xslt(xml, xsl[s.xsl], callback);
        },
        get_xml: function (tp, obj, li_attr, a_attr, is_callback) {
          var result = "",
            s = this._get_settings(),
            _this = this,
            tmp1, tmp2, li, a, lang;
          if (!tp) { tp = "flat"; }
          if (!is_callback) { is_callback = 0; }
          obj = this._get_node(obj);
          if (!obj || obj === -1) { obj = this.get_container().find("> ul > li"); }
          li_attr = $.isArray(li_attr) ? li_attr : ["id", "class"];
          if (!is_callback && this.data.types && $.inArray(s.types.type_attr, li_attr) === -1) { li_attr.push(s.types.type_attr); }

          a_attr = $.isArray(a_attr) ? a_attr : [];

          if (!is_callback) {
            if (s.xml_data.get_include_preamble) {
              result += '<' + '?xml version="1.0" encoding="UTF-8"?' + '>';
            }
            result += "<root>";
          }
          obj.each(function () {
            result += "<item";
            li = $(this);
            $.each(li_attr, function (i, v) {
              var t = li.attr(v);
              if (!s.xml_data.get_skip_empty || typeof t !== "undefined") {
                result += " " + v + "=\"" + escape_xml((" " + (t || "")).replace(/ jstree[^ ]*/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + "\"";
              }
            });
            if (li.hasClass("jstree-open")) { result += " state=\"open\""; }
            if (li.hasClass("jstree-closed")) { result += " state=\"closed\""; }
            if (tp === "flat") { result += " parent_id=\"" + escape_xml(is_callback) + "\""; }
            result += ">";
            result += "<content>";
            a = li.children("a");
            a.each(function () {
              tmp1 = $(this);
              lang = false;
              result += "<name";
              if ($.inArray("languages", s.plugins) !== -1) {
                $.each(s.languages, function (k, z) {
                  if (tmp1.hasClass(z)) { result += " lang=\"" + escape_xml(z) + "\""; lang = z; return false; }
                });
              }
              if (a_attr.length) {
                $.each(a_attr, function (k, z) {
                  var t = tmp1.attr(z);
                  if (!s.xml_data.get_skip_empty || typeof t !== "undefined") {
                    result += " " + z + "=\"" + escape_xml((" " + t || "").replace(/ jstree[^ ]*/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + "\"";
                  }
                });
              }
              if (tmp1.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, '').replace(/^\s+$/ig, "").length) {
                result += ' icon="' + escape_xml(tmp1.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig, '').replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "")) + '"';
              }
              if (tmp1.children("ins").get(0).style.backgroundImage.length) {
                result += ' icon="' + escape_xml(tmp1.children("ins").get(0).style.backgroundImage.replace("url(", "").replace(")", "").replace(/'/ig, "").replace(/"/ig, "")) + '"';
              }
              result += ">";
              result += "<![CDATA[" + _this.get_text(tmp1, lang) + "]]>";
              result += "</name>";
            });
            result += "</content>";
            tmp2 = li[0].id || true;
            li = li.find("> ul > li");
            if (li.length) { tmp2 = _this.get_xml(tp, li, li_attr, a_attr, tmp2); }
            else { tmp2 = ""; }
            if (tp == "nest") { result += tmp2; }
            result += "</item>";
            if (tp == "flat") { result += tmp2; }
          });
          if (!is_callback) { result += "</root>"; }
          return result;
        }
      }
    });
  })(jQuery);
  //*/

  /*
   * jsTree search plugin
   * Enables both sync and async search on the tree
   * DOES NOT WORK WITH JSON PROGRESSIVE RENDER
   */
  (function ($) {
    if ($().jquery.split('.')[1] >= 8) {
      $.expr[':'].jstree_contains = $.expr.createPseudo(function (search) {
        return function (a) {
          return (a.textContent || a.innerText || "").toLowerCase().indexOf(search.toLowerCase()) >= 0;
        };
      });
      $.expr[':'].jstree_title_contains = $.expr.createPseudo(function (search) {
        return function (a) {
          return (a.getAttribute("title") || "").toLowerCase().indexOf(search.toLowerCase()) >= 0;
        };
      });
    }
    else {
      $.expr[':'].jstree_contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toLowerCase().indexOf(m[3].toLowerCase()) >= 0;
      };
      $.expr[':'].jstree_title_contains = function (a, i, m) {
        return (a.getAttribute("title") || "").toLowerCase().indexOf(m[3].toLowerCase()) >= 0;
      };
    }
    $.jstree.plugin("search", {
      __init: function () {
        this.data.search.str = "";
        this.data.search.result = $();
        if (this._get_settings().search.show_only_matches) {
          this.get_container()
            .bind("search.jstree", function (e, data) {
              $(this).children("ul").find("li").hide().removeClass("jstree-last");
              data.rslt.nodes.parentsUntil(".jstree").addBack().show()
                .filter("ul").each(function () { $(this).children("li:visible").eq(-1).addClass("jstree-last"); });
            })
            .bind("clear_search.jstree", function () {
              $(this).children("ul").find("li").css("display", "").end().end().jstree("clean_node", -1);
            });
        }
      },
      defaults: {
        ajax: false,
        search_method: "jstree_contains", // for case insensitive - jstree_contains
        show_only_matches: false
      },
      _fn: {
        search: function (str, skip_async) {
          if ($.trim(str) === "") { this.clear_search(); return; }
          var s = this.get_settings().search,
            t = this,
            error_func = function () { },
            success_func = function () { };
          this.data.search.str = str;

          if (!skip_async && s.ajax !== false && this.get_container_ul().find("li.jstree-closed:not(:has(ul)):eq(0)").length > 0) {
            this.search.supress_callback = true;
            error_func = function () { };
            success_func = function (d, t, x) {
              var sf = this.get_settings().search.ajax.success;
              if (sf) { d = sf.call(this, d, t, x) || d; }
              this.data.search.to_open = d;
              this._search_open();
            };
            s.ajax.context = this;
            s.ajax.error = error_func;
            s.ajax.success = success_func;
            if ($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, str); }
            if ($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, str); }
            if (!s.ajax.data) { s.ajax.data = { "search_string": str }; }
            if (!s.ajax.dataType || /^json/.exec(s.ajax.dataType)) { s.ajax.dataType = "json"; }
            $.ajax(s.ajax);
            return;
          }
          if (this.data.search.result.length) { this.clear_search(); }
          this.data.search.result = this.get_container().find("a" + (this.data.languages ? "." + this.get_lang() : "") + ":" + (s.search_method) + "(" + this.data.search.str + ")");
          this.data.search.result.addClass("jstree-search").parent().parents(".jstree-closed").each(function () {
            t.open_node(this, false, true);
          });
          this.__callback({ nodes: this.data.search.result, str: str });
        },
        clear_search: function (str) {
          this.data.search.result.removeClass("jstree-search");
          this.__callback(this.data.search.result);
          this.data.search.result = $();
        },
        _search_open: function (is_callback) {
          var _this = this,
            done = true,
            current = [],
            remaining = [];
          if (this.data.search.to_open.length) {
            $.each(this.data.search.to_open, function (i, val) {
              if (val == "#") { return true; }
              if ($(val).length && $(val).is(".jstree-closed")) { current.push(val); }
              else { remaining.push(val); }
            });
            if (current.length) {
              this.data.search.to_open = remaining;
              $.each(current, function (i, val) {
                _this.open_node(val, function () { _this._search_open(true); });
              });
              done = false;
            }
          }
          if (done) { this.search(this.data.search.str, true); }
        }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree contextmenu plugin
   */
  (function ($) {
    $.vakata.context = {
      hide_on_mouseleave: false,

      cnt: $("<div id='vakata-contextmenu' />"),
      vis: false,
      tgt: false,
      par: false,
      func: false,
      data: false,
      rtl: false,
      show: function (s, t, x, y, d, p, rtl) {
        $.vakata.context.rtl = !!rtl;
        var html = $.vakata.context.parse(s), h, w;
        if (!html) { return; }
        $.vakata.context.vis = true;
        $.vakata.context.tgt = t;
        $.vakata.context.par = p || t || null;
        $.vakata.context.data = d || null;
        $.vakata.context.cnt
          .html(html)
          .css({ "visibility": "hidden", "display": "block", "left": 0, "top": 0 });

        if ($.vakata.context.hide_on_mouseleave) {
          $.vakata.context.cnt
            .one("mouseleave", function (e) { $.vakata.context.hide(); });
        }

        h = $.vakata.context.cnt.height();
        w = $.vakata.context.cnt.width();
        if (x + w > $(document).width()) {
          x = $(document).width() - (w + 5);
          $.vakata.context.cnt.find("li > ul").addClass("right");
        }
        if (y + h > $(document).height()) {
          y = y - (h + t[0].offsetHeight);
          $.vakata.context.cnt.find("li > ul").addClass("bottom");
        }

        $.vakata.context.cnt
          .css({ "left": x, "top": y })
          .find("li:has(ul)")
            .bind("mouseenter", function (e) {
              var w = $(document).width(),
                h = $(document).height(),
                ul = $(this).children("ul").show();
              if (w !== $(document).width()) { ul.toggleClass("right"); }
              if (h !== $(document).height()) { ul.toggleClass("bottom"); }
            })
            .bind("mouseleave", function (e) {
              $(this).children("ul").hide();
            })
            .end()
          .css({ "visibility": "visible" })
          .show();
        $(document).triggerHandler("context_show.vakata");
      },
      hide: function () {
        $.vakata.context.vis = false;
        $.vakata.context.cnt.attr("class", "").css({ "visibility": "hidden" });
        $(document).triggerHandler("context_hide.vakata");
      },
      parse: function (s, is_callback) {
        if (!s) { return false; }
        var str = "",
          tmp = false,
          was_sep = true;
        if (!is_callback) { $.vakata.context.func = {}; }
        str += "<ul>";
        $.each(s, function (i, val) {
          if (!val) { return true; }
          $.vakata.context.func[i] = val.action;
          if (!was_sep && val.separator_before) {
            str += "<li class='vakata-separator vakata-separator-before'></li>";
          }
          was_sep = false;
          str += "<li class='" + (val._class || "") + (val._disabled ? " jstree-contextmenu-disabled " : "") + "'><ins ";
          if (val.icon && val.icon.indexOf("/") === -1) { str += " class='" + val.icon + "' "; }
          if (val.icon && val.icon.indexOf("/") !== -1) { str += " style='background:url(" + val.icon + ") center center no-repeat;' "; }
          str += ">&#160;</ins><a href='#' rel='" + i + "'>";
          if (val.submenu) {
            str += "<span style='float:" + ($.vakata.context.rtl ? "left" : "right") + ";'>&raquo;</span>";
          }
          str += val.label + "</a>";
          if (val.submenu) {
            tmp = $.vakata.context.parse(val.submenu, true);
            if (tmp) { str += tmp; }
          }
          str += "</li>";
          if (val.separator_after) {
            str += "<li class='vakata-separator vakata-separator-after'></li>";
            was_sep = true;
          }
        });
        str = str.replace(/<li class\='vakata-separator vakata-separator-after'\><\/li\>$/, "");
        str += "</ul>";
        $(document).triggerHandler("context_parse.vakata");
        return str.length > 10 ? str : false;
      },
      exec: function (i) {
        if ($.isFunction($.vakata.context.func[i])) {
          // if is string - eval and call it!
          $.vakata.context.func[i].call($.vakata.context.data, $.vakata.context.par);
          return true;
        }
        else { return false; }
      }
    };
    $(function () {
      var css_string = '' +
        '#vakata-contextmenu { display:block; visibility:hidden; left:0; top:-200px; position:absolute; margin:0; padding:0; min-width:180px; background:#ebebeb; border:1px solid silver; z-index:10000; *width:180px; } ' +
        '#vakata-contextmenu ul { min-width:180px; *width:180px; } ' +
        '#vakata-contextmenu ul, #vakata-contextmenu li { margin:0; padding:0; list-style-type:none; display:block; } ' +
        '#vakata-contextmenu li { line-height:20px; min-height:20px; position:relative; padding:0px; } ' +
        '#vakata-contextmenu li a { padding:1px 6px; line-height:17px; display:block; text-decoration:none; margin:1px 1px 0 1px; } ' +
        '#vakata-contextmenu li ins { float:left; width:16px; height:16px; text-decoration:none; margin-right:2px; } ' +
        '#vakata-contextmenu li a:hover, #vakata-contextmenu li.vakata-hover > a { background:gray; color:white; } ' +
        '#vakata-contextmenu li ul { display:none; position:absolute; top:-2px; left:100%; background:#ebebeb; border:1px solid gray; } ' +
        '#vakata-contextmenu .right { right:100%; left:auto; } ' +
        '#vakata-contextmenu .bottom { bottom:-1px; top:auto; } ' +
        '#vakata-contextmenu li.vakata-separator { min-height:0; height:1px; line-height:1px; font-size:1px; overflow:hidden; margin:0 2px; background:silver; /* border-top:1px solid #fefefe; */ padding:0; } ';
      $.vakata.css.add_sheet({ str: css_string, title: "vakata" });
      $.vakata.context.cnt
        .delegate("a", "click", function (e) { e.preventDefault(); })
        .delegate("a", "mouseup", function (e) {
          if (!$(this).parent().hasClass("jstree-contextmenu-disabled") && $.vakata.context.exec($(this).attr("rel"))) {
            $.vakata.context.hide();
          }
          else { $(this).blur(); }
        })
        .delegate("a", "mouseover", function () {
          $.vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover");
        })
        .appendTo("body");
      $(document).bind("mousedown", function (e) { if ($.vakata.context.vis && !$.contains($.vakata.context.cnt[0], e.target)) { $.vakata.context.hide(); } });
      if (typeof $.hotkeys !== "undefined") {
        $(document)
          .bind("keydown", "up", function (e) {
            if ($.vakata.context.vis) {
              var o = $.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
              if (!o.length) { o = $.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last(); }
              o.addClass("vakata-hover");
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          })
          .bind("keydown", "down", function (e) {
            if ($.vakata.context.vis) {
              var o = $.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
              if (!o.length) { o = $.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first(); }
              o.addClass("vakata-hover");
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          })
          .bind("keydown", "right", function (e) {
            if ($.vakata.context.vis) {
              $.vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover");
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          })
          .bind("keydown", "left", function (e) {
            if ($.vakata.context.vis) {
              $.vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover");
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          })
          .bind("keydown", "esc", function (e) {
            $.vakata.context.hide();
            e.preventDefault();
          })
          .bind("keydown", "space", function (e) {
            $.vakata.context.cnt.find(".vakata-hover").last().children("a").click();
            e.preventDefault();
          });
      }
    });

    $.jstree.plugin("contextmenu", {
      __init: function () {
        this.get_container()
          .delegate("a", "contextmenu.jstree", $.proxy(function (e) {
            e.preventDefault();
            if (!$(e.currentTarget).hasClass("jstree-loading")) {
              this.show_contextmenu(e.currentTarget, e.pageX, e.pageY);
            }
          }, this))
          .delegate("a", "click.jstree", $.proxy(function (e) {
            if (this.data.contextmenu) {
              $.vakata.context.hide();
            }
          }, this))
          .bind("destroy.jstree", $.proxy(function () {
            // TODO: move this to descruct method
            if (this.data.contextmenu) {
              $.vakata.context.hide();
            }
          }, this));
        $(document).bind("context_hide.vakata", $.proxy(function () { this.data.contextmenu = false; }, this));
      },
      defaults: {
        select_node: false, // requires UI plugin
        show_at_node: true,
        items: { // Could be a function that should return an object like this one
          "create": {
            "separator_before": false,
            "separator_after": true,
            "label": "Create",
            "action": function (obj) { this.create(obj); }
          },
          "rename": {
            "separator_before": false,
            "separator_after": false,
            "label": "Rename",
            "action": function (obj) { this.rename(obj); }
          },
          "remove": {
            "separator_before": false,
            "icon": false,
            "separator_after": false,
            "label": "Delete",
            "action": function (obj) { if (this.is_selected(obj)) { this.remove(); } else { this.remove(obj); } }
          },
          "ccp": {
            "separator_before": true,
            "icon": false,
            "separator_after": false,
            "label": "Edit",
            "action": false,
            "submenu": {
              "cut": {
                "separator_before": false,
                "separator_after": false,
                "label": "Cut",
                "action": function (obj) { this.cut(obj); }
              },
              "copy": {
                "separator_before": false,
                "icon": false,
                "separator_after": false,
                "label": "Copy",
                "action": function (obj) { this.copy(obj); }
              },
              "paste": {
                "separator_before": false,
                "icon": false,
                "separator_after": false,
                "label": "Paste",
                "action": function (obj) { this.paste(obj); }
              }
            }
          }
        }
      },
      _fn: {
        show_contextmenu: function (obj, x, y) {
          obj = this._get_node(obj);
          var s = this.get_settings().contextmenu,
            a = obj.children("a:visible:eq(0)"),
            o = false,
            i = false;
          if (s.select_node && this.data.ui && !this.is_selected(obj)) {
            this.deselect_all();
            this.select_node(obj, true);
          }
          if (s.show_at_node || typeof x === "undefined" || typeof y === "undefined") {
            o = a.offset();
            x = o.left;
            y = o.top + this.data.core.li_height;
          }
          i = obj.data("jstree") && obj.data("jstree").contextmenu ? obj.data("jstree").contextmenu : s.items;
          if ($.isFunction(i)) { i = i.call(this, obj); }
          this.data.contextmenu = true;
          $.vakata.context.show(i, a, x, y, this, obj, this._get_settings().core.rtl);
          if (this.data.themes) { $.vakata.context.cnt.attr("class", "jstree-" + this.data.themes.theme + "-context"); }
        }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree types plugin
   * Adds support types of nodes
   * You can set an attribute on each li node, that represents its type.
   * According to the type setting the node may get custom icon/validation rules
   */
  (function ($) {
    $.jstree.plugin("types", {
      __init: function () {
        var s = this._get_settings().types;
        this.data.types.attach_to = [];
        this.get_container()
          .bind("init.jstree", $.proxy(function () {
            var types = s.types,
							attr = s.type_attr,
							icons_css = "",
							_this = this;

            $.each(types, function (i, tp) {
              $.each(tp, function (k, v) {
                if (!/^(max_depth|max_children|icon|valid_children)$/.test(k)) { _this.data.types.attach_to.push(k); }
              });
              if (!tp.icon) { return true; }
              if (tp.icon.image || tp.icon.position) {
                if (i == "default") { icons_css += '.jstree-' + _this.get_index() + ' a > .jstree-icon { '; }
                else { icons_css += '.jstree-' + _this.get_index() + ' li[' + attr + '="' + i + '"] > a > .jstree-icon { '; }
                if (tp.icon.image) { icons_css += ' background-image:url(' + tp.icon.image + '); '; }
                if (tp.icon.position) { icons_css += ' background-position:' + tp.icon.position + '; '; }
                else { icons_css += ' background-position:0 0; '; }
                icons_css += '} ';
              }
            });
            if (icons_css !== "") { $.vakata.css.add_sheet({ 'str': icons_css, title: "jstree-types" }); }
          }, this))
          .bind("before.jstree", $.proxy(function (e, data) {
            var s, t,
							o = this._get_settings().types.use_data ? this._get_node(data.args[0]) : false,
							d = o && o !== -1 && o.length ? o.data("jstree") : false;
            if (d && d.types && d.types[data.func] === false) { e.stopImmediatePropagation(); return false; }
            if ($.inArray(data.func, this.data.types.attach_to) !== -1) {
              if (!data.args[0] || (!data.args[0].tagName && !data.args[0].jquery)) { return; }
              s = this._get_settings().types.types;
              t = this._get_type(data.args[0]);
              if (
								(
									(s[t] && typeof s[t][data.func] !== "undefined") ||
									(s["default"] && typeof s["default"][data.func] !== "undefined")
								) && this._check(data.func, data.args[0]) === false
							) {
                e.stopImmediatePropagation();
                return false;
              }
            }
          }, this));
        if (is_ie6) {
          this.get_container()
            .bind("load_node.jstree set_type.jstree", $.proxy(function (e, data) {
              var r = data && data.rslt && data.rslt.obj && data.rslt.obj !== -1 ? this._get_node(data.rslt.obj).parent() : this.get_container_ul(),
								c = false,
								s = this._get_settings().types;
              $.each(s.types, function (i, tp) {
                if (tp.icon && (tp.icon.image || tp.icon.position)) {
                  c = i === "default" ? r.find("li > a > .jstree-icon") : r.find("li[" + s.type_attr + "='" + i + "'] > a > .jstree-icon");
                  if (tp.icon.image) { c.css("backgroundImage", "url(" + tp.icon.image + ")"); }
                  c.css("backgroundPosition", tp.icon.position || "0 0");
                }
              });
            }, this));
        }
      },
      defaults: {
        // defines maximum number of root nodes (-1 means unlimited, -2 means disable max_children checking)
        max_children: -1,
        // defines the maximum depth of the tree (-1 means unlimited, -2 means disable max_depth checking)
        max_depth: -1,
        // defines valid node types for the root nodes
        valid_children: "all",

        // whether to use $.data
        use_data: false,
        // where is the type stores (the rel attribute of the LI element)
        type_attr: "rel",
        // a list of types
        types: {
          // the default type
          "default": {
            "max_children": -1,
            "max_depth": -1,
            "valid_children": "all"

            // Bound functions - you can bind any other function here (using boolean or function)
            //"select_node"	: true
          }
        }
      },
      _fn: {
        _types_notify: function (n, data) {
          if (data.type && this._get_settings().types.use_data) {
            this.set_type(data.type, n);
          }
        },
        _get_type: function (obj) {
          obj = this._get_node(obj);
          return (!obj || !obj.length) ? false : obj.attr(this._get_settings().types.type_attr) || "default";
        },
        set_type: function (str, obj) {
          obj = this._get_node(obj);
          var ret = (!obj.length || !str) ? false : obj.attr(this._get_settings().types.type_attr, str);
          if (ret) { this.__callback({ obj: obj, type: str }); }
          return ret;
        },
        _check: function (rule, obj, opts) {
          obj = this._get_node(obj);
          var v = false, t = this._get_type(obj), d = 0, _this = this, s = this._get_settings().types, data = false;
          if (obj === -1) {
            if (!!s[rule]) { v = s[rule]; }
            else { return; }
          }
          else {
            if (t === false) { return; }
            data = s.use_data ? obj.data("jstree") : false;
            if (data && data.types && typeof data.types[rule] !== "undefined") { v = data.types[rule]; }
            else if (!!s.types[t] && typeof s.types[t][rule] !== "undefined") { v = s.types[t][rule]; }
            else if (!!s.types["default"] && typeof s.types["default"][rule] !== "undefined") { v = s.types["default"][rule]; }
          }
          if ($.isFunction(v)) { v = v.call(this, obj); }
          if (rule === "max_depth" && obj !== -1 && opts !== false && s.max_depth !== -2 && v !== 0) {
            // also include the node itself - otherwise if root node it is not checked
            obj.children("a:eq(0)").parentsUntil(".jstree", "li").each(function (i) {
              // check if current depth already exceeds global tree depth
              if (s.max_depth !== -1 && s.max_depth - (i + 1) <= 0) { v = 0; return false; }
              d = (i === 0) ? v : _this._check(rule, this, false);
              // check if current node max depth is already matched or exceeded
              if (d !== -1 && d - (i + 1) <= 0) { v = 0; return false; }
              // otherwise - set the max depth to the current value minus current depth
              if (d >= 0 && (d - (i + 1) < v || v < 0)) { v = d - (i + 1); }
              // if the global tree depth exists and it minus the nodes calculated so far is less than `v` or `v` is unlimited
              if (s.max_depth >= 0 && (s.max_depth - (i + 1) < v || v < 0)) { v = s.max_depth - (i + 1); }
            });
          }
          return v;
        },
        check_move: function () {
          if (!this.__call_old()) { return false; }
          var m = this._get_move(),
            s = m.rt._get_settings().types,
            mc = m.rt._check("max_children", m.cr),
            md = m.rt._check("max_depth", m.cr),
            vc = m.rt._check("valid_children", m.cr),
            ch = 0, d = 1, t;

          if (vc === "none") { return false; }
          if ($.isArray(vc) && m.ot && m.ot._get_type) {
            m.o.each(function () {
              if ($.inArray(m.ot._get_type(this), vc) === -1) { d = false; return false; }
            });
            if (d === false) { return false; }
          }
          if (s.max_children !== -2 && mc !== -1) {
            ch = m.cr === -1 ? this.get_container().find("> ul > li").not(m.o).length : m.cr.find("> ul > li").not(m.o).length;
            if (ch + m.o.length > mc) { return false; }
          }
          if (s.max_depth !== -2 && md !== -1) {
            d = 0;
            if (md === 0) { return false; }
            if (typeof m.o.d === "undefined") {
              // TODO: deal with progressive rendering and async when checking max_depth (how to know the depth of the moved node)
              t = m.o;
              while (t.length > 0) {
                t = t.find("> ul > li");
                d++;
              }
              m.o.d = d;
            }
            if (md - m.o.d < 0) { return false; }
          }
          return true;
        },
        create_node: function (obj, position, js, callback, is_loaded, skip_check) {
          if (!skip_check && (is_loaded || this._is_loaded(obj))) {
            var p = (typeof position == "string" && position.match(/^before|after$/i) && obj !== -1) ? this._get_parent(obj) : this._get_node(obj),
              s = this._get_settings().types,
              mc = this._check("max_children", p),
              md = this._check("max_depth", p),
              vc = this._check("valid_children", p),
              ch;
            if (typeof js === "string") { js = { data: js }; }
            if (!js) { js = {}; }
            if (vc === "none") { return false; }
            if ($.isArray(vc)) {
              if (!js.attr || !js.attr[s.type_attr]) {
                if (!js.attr) { js.attr = {}; }
                js.attr[s.type_attr] = vc[0];
              }
              else {
                if ($.inArray(js.attr[s.type_attr], vc) === -1) { return false; }
              }
            }
            if (s.max_children !== -2 && mc !== -1) {
              ch = p === -1 ? this.get_container().find("> ul > li").length : p.find("> ul > li").length;
              if (ch + 1 > mc) { return false; }
            }
            if (s.max_depth !== -2 && md !== -1 && (md - 1) < 0) { return false; }
          }
          return this.__call_old(true, obj, position, js, callback, is_loaded, skip_check);
        }
      }
    });
  })(jQuery);
  //*/

  /* 
   * jsTree HTML plugin
   * The HTML data store. Datastores are build by replacing the `load_node` and `_is_loaded` functions.
   */
  (function ($) {
    $.jstree.plugin("html_data", {
      __init: function () {
        // this used to use html() and clean the whitespace, but this way any attached data was lost
        this.data.html_data.original_container_html = this.get_container().find(" > ul > li").clone(true);
        // remove white space from LI node - otherwise nodes appear a bit to the right
        this.data.html_data.original_container_html.find("li").addBack().contents().filter(function () { return this.nodeType == 3; }).remove();
      },
      defaults: {
        data: false,
        ajax: false,
        correct_state: true
      },
      _fn: {
        load_node: function (obj, s_call, e_call) { var _this = this; this.load_node_html(obj, function () { _this.__callback({ "obj": _this._get_node(obj) }); s_call.call(this); }, e_call); },
        _is_loaded: function (obj) {
          obj = this._get_node(obj);
          return obj == -1 || !obj || (!this._get_settings().html_data.ajax && !$.isFunction(this._get_settings().html_data.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").size() > 0;
        },
        load_node_html: function (obj, s_call, e_call) {
          var d,
            s = this.get_settings().html_data,
            error_func = function () { },
            success_func = function () { };
          obj = this._get_node(obj);
          if (obj && obj !== -1) {
            if (obj.data("jstree_is_loading")) { return; }
            else { obj.data("jstree_is_loading", true); }
          }
          switch (!0) {
            case ($.isFunction(s.data)):
              s.data.call(this, obj, $.proxy(function (d) {
                if (d && d !== "" && d.toString && d.toString().replace(/^[\s\n]+$/, "") !== "") {
                  d = $(d);
                  if (!d.is("ul")) { d = $("<ul />").append(d); }
                  if (obj == -1 || !obj) { this.get_container().children("ul").empty().append(d.children()).find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); }
                  else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d).children("ul").find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); obj.removeData("jstree_is_loading"); }
                  this.clean_node(obj);
                  if (s_call) { s_call.call(this); }
                }
                else {
                  if (obj && obj !== -1) {
                    obj.children("a.jstree-loading").removeClass("jstree-loading");
                    obj.removeData("jstree_is_loading");
                    if (s.correct_state) {
                      this.correct_state(obj);
                      if (s_call) { s_call.call(this); }
                    }
                  }
                  else {
                    if (s.correct_state) {
                      this.get_container().children("ul").empty();
                      if (s_call) { s_call.call(this); }
                    }
                  }
                }
              }, this));
              break;
            case (!s.data && !s.ajax):
              if (!obj || obj == -1) {
                this.get_container()
                  .children("ul").empty()
                  .append(this.data.html_data.original_container_html)
                  .find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end()
                  .filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
                this.clean_node();
              }
              if (s_call) { s_call.call(this); }
              break;
            case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
              if (!obj || obj == -1) {
                d = $(s.data);
                if (!d.is("ul")) { d = $("<ul />").append(d); }
                this.get_container()
                  .children("ul").empty().append(d.children())
                  .find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end()
                  .filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
                this.clean_node();
              }
              if (s_call) { s_call.call(this); }
              break;
            case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
              obj = this._get_node(obj);
              error_func = function (x, t, e) {
                var ef = this.get_settings().html_data.ajax.error;
                if (ef) { ef.call(this, x, t, e); }
                if (obj != -1 && obj.length) {
                  obj.children("a.jstree-loading").removeClass("jstree-loading");
                  obj.removeData("jstree_is_loading");
                  if (t === "success" && s.correct_state) { this.correct_state(obj); }
                }
                else {
                  if (t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
                }
                if (e_call) { e_call.call(this); }
              };
              success_func = function (d, t, x) {
                var sf = this.get_settings().html_data.ajax.success;
                if (sf) { d = sf.call(this, d, t, x) || d; }
                if (d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/, "") === "")) {
                  return error_func.call(this, x, t, "");
                }
                if (d) {
                  d = $(d);
                  if (!d.is("ul")) { d = $("<ul />").append(d); }
                  if (obj == -1 || !obj) { this.get_container().children("ul").empty().append(d.children()).find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); }
                  else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d).children("ul").find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); obj.removeData("jstree_is_loading"); }
                  this.clean_node(obj);
                  if (s_call) { s_call.call(this); }
                }
                else {
                  if (obj && obj !== -1) {
                    obj.children("a.jstree-loading").removeClass("jstree-loading");
                    obj.removeData("jstree_is_loading");
                    if (s.correct_state) {
                      this.correct_state(obj);
                      if (s_call) { s_call.call(this); }
                    }
                  }
                  else {
                    if (s.correct_state) {
                      this.get_container().children("ul").empty();
                      if (s_call) { s_call.call(this); }
                    }
                  }
                }
              };
              s.ajax.context = this;
              s.ajax.error = error_func;
              s.ajax.success = success_func;
              if (!s.ajax.dataType) { s.ajax.dataType = "html"; }
              if ($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
              if ($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
              $.ajax(s.ajax);
              break;
          }
        }
      }
    });
    // include the HTML data plugin by default
    $.jstree.defaults.plugins.push("html_data");
  })(jQuery);
  //*/

  /* 
   * jsTree themeroller plugin
   * Adds support for jQuery UI themes. Include this at the end of your plugins list, also make sure "themes" is not included.
   */
  (function ($) {
    $.jstree.plugin("themeroller", {
      __init: function () {
        var s = this._get_settings().themeroller;
        this.get_container()
          .addClass("ui-widget-content")
          .addClass("jstree-themeroller")
          .delegate("a", "mouseenter.jstree", function (e) {
            if (!$(e.currentTarget).hasClass("jstree-loading")) {
              $(this).addClass(s.item_h);
            }
          })
          .delegate("a", "mouseleave.jstree", function () {
            $(this).removeClass(s.item_h);
          })
          .bind("init.jstree", $.proxy(function (e, data) {
            data.inst.get_container().find("> ul > li > .jstree-loading > ins").addClass("ui-icon-refresh");
            this._themeroller(data.inst.get_container().find("> ul > li"));
          }, this))
          .bind("open_node.jstree create_node.jstree", $.proxy(function (e, data) {
            this._themeroller(data.rslt.obj);
          }, this))
          .bind("loaded.jstree refresh.jstree", $.proxy(function (e) {
            this._themeroller();
          }, this))
          .bind("close_node.jstree", $.proxy(function (e, data) {
            this._themeroller(data.rslt.obj);
          }, this))
          .bind("delete_node.jstree", $.proxy(function (e, data) {
            this._themeroller(data.rslt.parent);
          }, this))
          .bind("correct_state.jstree", $.proxy(function (e, data) {
            data.rslt.obj
							.children("ins.jstree-icon").removeClass(s.opened + " " + s.closed + " ui-icon").end()
							.find("> a > ins.ui-icon")
								.filter(function () {
								  return this.className.toString()
										.replace(s.item_clsd, "").replace(s.item_open, "").replace(s.item_leaf, "")
										.indexOf("ui-icon-") === -1;
								}).removeClass(s.item_open + " " + s.item_clsd).addClass(s.item_leaf || "jstree-no-icon");
          }, this))
          .bind("select_node.jstree", $.proxy(function (e, data) {
            data.rslt.obj.children("a").addClass(s.item_a);
          }, this))
          .bind("deselect_node.jstree deselect_all.jstree", $.proxy(function (e, data) {
            this.get_container()
							.find("a." + s.item_a).removeClass(s.item_a).end()
							.find("a.jstree-clicked").addClass(s.item_a);
          }, this))
          .bind("dehover_node.jstree", $.proxy(function (e, data) {
            data.rslt.obj.children("a").removeClass(s.item_h);
          }, this))
          .bind("hover_node.jstree", $.proxy(function (e, data) {
            this.get_container()
							.find("a." + s.item_h).not(data.rslt.obj).removeClass(s.item_h);
            data.rslt.obj.children("a").addClass(s.item_h);
          }, this))
          .bind("move_node.jstree", $.proxy(function (e, data) {
            this._themeroller(data.rslt.o);
            this._themeroller(data.rslt.op);
          }, this));
      },
      __destroy: function () {
        var s = this._get_settings().themeroller,
          c = ["ui-icon"];
        $.each(s, function (i, v) {
          v = v.split(" ");
          if (v.length) { c = c.concat(v); }
        });
        this.get_container()
          .removeClass("ui-widget-content")
          .find("." + c.join(", .")).removeClass(c.join(" "));
      },
      _fn: {
        _themeroller: function (obj) {
          var s = this._get_settings().themeroller;
          obj = (!obj || obj == -1) ? this.get_container_ul() : this._get_node(obj);
          obj = (!obj || obj == -1) ? this.get_container_ul() : obj.parent();
          obj
            .find("li.jstree-closed")
              .children("ins.jstree-icon").removeClass(s.opened).addClass("ui-icon " + s.closed).end()
              .children("a").addClass(s.item)
                .children("ins.jstree-icon").addClass("ui-icon")
                  .filter(function () {
                    return this.className.toString()
                      .replace(s.item_clsd, "").replace(s.item_open, "").replace(s.item_leaf, "")
                      .indexOf("ui-icon-") === -1;
                  }).removeClass(s.item_leaf + " " + s.item_open).addClass(s.item_clsd || "jstree-no-icon")
                  .end()
                .end()
              .end()
            .end()
            .find("li.jstree-open")
              .children("ins.jstree-icon").removeClass(s.closed).addClass("ui-icon " + s.opened).end()
              .children("a").addClass(s.item)
                .children("ins.jstree-icon").addClass("ui-icon")
                  .filter(function () {
                    return this.className.toString()
                      .replace(s.item_clsd, "").replace(s.item_open, "").replace(s.item_leaf, "")
                      .indexOf("ui-icon-") === -1;
                  }).removeClass(s.item_leaf + " " + s.item_clsd).addClass(s.item_open || "jstree-no-icon")
                  .end()
                .end()
              .end()
            .end()
            .find("li.jstree-leaf")
              .children("ins.jstree-icon").removeClass(s.closed + " ui-icon " + s.opened).end()
              .children("a").addClass(s.item)
                .children("ins.jstree-icon").addClass("ui-icon")
                  .filter(function () {
                    return this.className.toString()
                      .replace(s.item_clsd, "").replace(s.item_open, "").replace(s.item_leaf, "")
                      .indexOf("ui-icon-") === -1;
                  }).removeClass(s.item_clsd + " " + s.item_open).addClass(s.item_leaf || "jstree-no-icon");
        }
      },
      defaults: {
        "opened": "ui-icon-triangle-1-se",
        "closed": "ui-icon-triangle-1-e",
        "item": "ui-state-default",
        "item_h": "ui-state-hover",
        "item_a": "ui-state-active",
        "item_open": "ui-icon-folder-open",
        "item_clsd": "ui-icon-folder-collapsed",
        "item_leaf": "ui-icon-document"
      }
    });
    $(function () {
      var css_string = '' +
        '.jstree-themeroller .ui-icon { overflow:visible; } ' +
        '.jstree-themeroller a { padding:0 2px; } ' +
        '.jstree-themeroller .jstree-no-icon { display:none; }';
      $.vakata.css.add_sheet({ str: css_string, title: "jstree" });
    });
  })(jQuery);
  //*/

  /* 
   * jsTree unique plugin
   * Forces different names amongst siblings (still a bit experimental)
   * NOTE: does not check language versions (it will not be possible to have nodes with the same title, even in different languages)
   */
  (function ($) {
    $.jstree.plugin("unique", {
      __init: function () {
        this.get_container()
          .bind("before.jstree", $.proxy(function (e, data) {
            var nms = [], res = true, p, t;
            if (data.func == "move_node") {
              // obj, ref, position, is_copy, is_prepared, skip_check
              if (data.args[4] === true) {
                if (data.args[0].o && data.args[0].o.length) {
                  data.args[0].o.children("a").each(function () { nms.push($(this).text().replace(/^\s+/g, "")); });
                  res = this._check_unique(nms, data.args[0].np.find("> ul > li").not(data.args[0].o), "move_node");
                }
              }
            }
            if (data.func == "create_node") {
              // obj, position, js, callback, is_loaded
              if (data.args[4] || this._is_loaded(data.args[0])) {
                p = this._get_node(data.args[0]);
                if (data.args[1] && (data.args[1] === "before" || data.args[1] === "after")) {
                  p = this._get_parent(data.args[0]);
                  if (!p || p === -1) { p = this.get_container(); }
                }
                if (typeof data.args[2] === "string") { nms.push(data.args[2]); }
                else if (!data.args[2] || !data.args[2].data) { nms.push(this._get_string("new_node")); }
                else { nms.push(data.args[2].data); }
                res = this._check_unique(nms, p.find("> ul > li"), "create_node");
              }
            }
            if (data.func == "rename_node") {
              // obj, val
              nms.push(data.args[1]);
              t = this._get_node(data.args[0]);
              p = this._get_parent(t);
              if (!p || p === -1) { p = this.get_container(); }
              res = this._check_unique(nms, p.find("> ul > li").not(t), "rename_node");
            }
            if (!res) {
              e.stopPropagation();
              return false;
            }
          }, this));
      },
      defaults: {
        error_callback: $.noop
      },
      _fn: {
        _check_unique: function (nms, p, func) {
          var cnms = [], ok = true;
          p.children("a").each(function () { cnms.push($(this).text().replace(/^\s+/g, "")); });
          if (!cnms.length || !nms.length) { return true; }
          $.each(nms, function (i, v) {
            if ($.inArray(v, cnms) !== -1) {
              ok = false;
              return false;
            }
          });
          if (!ok) {
            this._get_settings().unique.error_callback.call(null, nms, p, func);
          }
          return ok;
        },
        check_move: function () {
          if (!this.__call_old()) { return false; }
          var p = this._get_move(), nms = [];
          if (p.o && p.o.length) {
            p.o.children("a").each(function () { nms.push($(this).text().replace(/^\s+/g, "")); });
            return this._check_unique(nms, p.np.find("> ul > li").not(p.o), "check_move");
          }
          return true;
        }
      }
    });
  })(jQuery);
  //*/

  /*
   * jsTree wholerow plugin
   * Makes select and hover work on the entire width of the node
   * MAY BE HEAVY IN LARGE DOM
   */
  (function ($) {
    $.jstree.plugin("wholerow", {
      __init: function () {
        if (!this.data.ui) { throw "jsTree wholerow: jsTree UI plugin not included."; }
        this.data.wholerow.html = false;
        this.data.wholerow.to = false;
        this.get_container()
          .bind("init.jstree", $.proxy(function (e, data) {
            this._get_settings().core.animation = 0;
          }, this))
          .bind("open_node.jstree create_node.jstree clean_node.jstree loaded.jstree", $.proxy(function (e, data) {
            this._prepare_wholerow_span(data && data.rslt && data.rslt.obj ? data.rslt.obj : -1);
          }, this))
          .bind("search.jstree clear_search.jstree reopen.jstree after_open.jstree after_close.jstree create_node.jstree delete_node.jstree clean_node.jstree", $.proxy(function (e, data) {
            if (this.data.to) { clearTimeout(this.data.to); }
            this.data.to = setTimeout((function (t, o) { return function () { t._prepare_wholerow_ul(o); }; })(this, data && data.rslt && data.rslt.obj ? data.rslt.obj : -1), 0);
          }, this))
          .bind("deselect_all.jstree", $.proxy(function (e, data) {
            this.get_container().find(" > .jstree-wholerow .jstree-clicked").removeClass("jstree-clicked " + (this.data.themeroller ? this._get_settings().themeroller.item_a : ""));
          }, this))
          .bind("select_node.jstree deselect_node.jstree ", $.proxy(function (e, data) {
            data.rslt.obj.each(function () {
              var ref = data.inst.get_container().find(" > .jstree-wholerow li:visible:eq(" + (parseInt((($(this).offset().top - data.inst.get_container().offset().top + data.inst.get_container()[0].scrollTop) / data.inst.data.core.li_height), 10)) + ")");
              // ref.children("a")[e.type === "select_node" ? "addClass" : "removeClass"]("jstree-clicked");
              ref.children("a").attr("class", data.rslt.obj.children("a").attr("class"));
            });
          }, this))
          .bind("hover_node.jstree dehover_node.jstree", $.proxy(function (e, data) {
            this.get_container().find(" > .jstree-wholerow .jstree-hovered").removeClass("jstree-hovered " + (this.data.themeroller ? this._get_settings().themeroller.item_h : ""));
            if (e.type === "hover_node") {
              var ref = this.get_container().find(" > .jstree-wholerow li:visible:eq(" + (parseInt(((data.rslt.obj.offset().top - this.get_container().offset().top + this.get_container()[0].scrollTop) / this.data.core.li_height), 10)) + ")");
              // ref.children("a").addClass("jstree-hovered");
              ref.children("a").attr("class", data.rslt.obj.children(".jstree-hovered").attr("class"));
            }
          }, this))
          .delegate(".jstree-wholerow-span, ins.jstree-icon, li", "click.jstree", function (e) {
            var n = $(e.currentTarget);
            if (e.target.tagName === "A" || (e.target.tagName === "INS" && n.closest("li").is(".jstree-open, .jstree-closed"))) { return; }
            n.closest("li").children("a:visible:eq(0)").click();
            e.stopImmediatePropagation();
          })
          .delegate("li", "mouseover.jstree", $.proxy(function (e) {
            e.stopImmediatePropagation();
            if ($(e.currentTarget).children(".jstree-hovered, .jstree-clicked").length) { return false; }
            this.hover_node(e.currentTarget);
            return false;
          }, this))
          .delegate("li", "mouseleave.jstree", $.proxy(function (e) {
            if ($(e.currentTarget).children("a").hasClass("jstree-hovered").length) { return; }
            this.dehover_node(e.currentTarget);
          }, this));
        if (is_ie7 || is_ie6) {
          $.vakata.css.add_sheet({ str: ".jstree-" + this.get_index() + " { position:relative; } ", title: "jstree" });
        }
      },
      defaults: {
      },
      __destroy: function () {
        this.get_container().children(".jstree-wholerow").remove();
        this.get_container().find(".jstree-wholerow-span").remove();
      },
      _fn: {
        _prepare_wholerow_span: function (obj) {
          obj = !obj || obj == -1 ? this.get_container().find("> ul > li") : this._get_node(obj);
          if (obj === false) { return; } // added for removing root nodes
          obj.each(function () {
            $(this).find("li").addBack().each(function () {
              var $t = $(this);
              if ($t.children(".jstree-wholerow-span").length) { return true; }
              $t.prepend("<span class='jstree-wholerow-span' style='width:" + ($t.parentsUntil(".jstree", "li").length * 18) + "px;'>&#160;</span>");
            });
          });
        },
        _prepare_wholerow_ul: function () {
          var o = this.get_container().children("ul").eq(0), h = o.html();
          o.addClass("jstree-wholerow-real");
          if (this.data.wholerow.last_html !== h) {
            this.data.wholerow.last_html = h;
            this.get_container().children(".jstree-wholerow").remove();
            this.get_container().append(
              o.clone().removeClass("jstree-wholerow-real")
                .wrapAll("<div class='jstree-wholerow' />").parent()
                .width(o.parent()[0].scrollWidth)
                .css("top", (o.height() + (is_ie7 ? 5 : 0)) * -1)
                .find("li[id]").each(function () { this.removeAttribute("id"); }).end()
            );
          }
        }
      }
    });
    $(function () {
      var css_string = '' +
        '.jstree .jstree-wholerow-real { position:relative; z-index:1; } ' +
        '.jstree .jstree-wholerow-real li { cursor:pointer; } ' +
        '.jstree .jstree-wholerow-real a { border-left-color:transparent !important; border-right-color:transparent !important; } ' +
        '.jstree .jstree-wholerow { position:relative; z-index:0; height:0; } ' +
        '.jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { width:100%; } ' +
        '.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li, .jstree .jstree-wholerow a { margin:0 !important; padding:0 !important; } ' +
        '.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { background:transparent !important; }' +
        '.jstree .jstree-wholerow ins, .jstree .jstree-wholerow span, .jstree .jstree-wholerow input { display:none !important; }' +
        '.jstree .jstree-wholerow a, .jstree .jstree-wholerow a:hover { text-indent:-9999px; !important; width:100%; padding:0 !important; border-right-width:0px !important; border-left-width:0px !important; } ' +
        '.jstree .jstree-wholerow-span { position:absolute; left:0; margin:0px; padding:0; height:18px; border-width:0; padding:0; z-index:0; }';
      if (is_ff2) {
        css_string += '' +
          '.jstree .jstree-wholerow a { display:block; height:18px; margin:0; padding:0; border:0; } ' +
          '.jstree .jstree-wholerow-real a { border-color:transparent !important; } ';
      }
      if (is_ie7 || is_ie6) {
        css_string += '' +
          '.jstree .jstree-wholerow, .jstree .jstree-wholerow li, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow a { margin:0; padding:0; line-height:18px; } ' +
          '.jstree .jstree-wholerow a { display:block; height:18px; line-height:18px; overflow:hidden; } ';
      }
      $.vakata.css.add_sheet({ str: css_string, title: "jstree" });
    });
  })(jQuery);
  //*/

  /*
  * jsTree model plugin
  * This plugin gets jstree to use a class model to retrieve data, creating great dynamism
  */
  (function ($) {
    var nodeInterface = ["getChildren", "getChildrenCount", "getAttr", "getName", "getProps"],
      validateInterface = function (obj, inter) {
        var valid = true;
        obj = obj || {};
        inter = [].concat(inter);
        $.each(inter, function (i, v) {
          if (!$.isFunction(obj[v])) { valid = false; return false; }
        });
        return valid;
      };
    $.jstree.plugin("model", {
      __init: function () {
        if (!this.data.json_data) { throw "jsTree model: jsTree json_data plugin not included."; }
        this._get_settings().json_data.data = function (n, b) {
          var obj = (n == -1) ? this._get_settings().model.object : n.data("jstree_model");
          if (!validateInterface(obj, nodeInterface)) { return b.call(null, false); }
          if (this._get_settings().model.async) {
            obj.getChildren($.proxy(function (data) {
              this.model_done(data, b);
            }, this));
          }
          else {
            this.model_done(obj.getChildren(), b);
          }
        };
      },
      defaults: {
        object: false,
        id_prefix: false,
        async: false
      },
      _fn: {
        model_done: function (data, callback) {
          var ret = [],
            s = this._get_settings(),
            _this = this;

          if (!$.isArray(data)) { data = [data]; }
          $.each(data, function (i, nd) {
            var r = nd.getProps() || {};
            r.attr = nd.getAttr() || {};
            if (nd.getChildrenCount()) { r.state = "closed"; }
            r.data = nd.getName();
            if (!$.isArray(r.data)) { r.data = [r.data]; }
            if (_this.data.types && $.isFunction(nd.getType)) {
              r.attr[s.types.type_attr] = nd.getType();
            }
            if (r.attr.id && s.model.id_prefix) { r.attr.id = s.model.id_prefix + r.attr.id; }
            if (!r.metadata) { r.metadata = {}; }
            r.metadata.jstree_model = nd;
            ret.push(r);
          });
          callback.call(null, ret);
        }
      }
    });
  })(jQuery);
  //*/

})();

//#endregion End jsTree

//#region Globalize

/*!
 * Globalize
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function (window, undefined) {

  var Globalize,
    // private variables
    regexHex,
    regexInfinity,
    regexParseFloat,
    regexTrim,
    // private JavaScript utility functions
    arrayIndexOf,
    endsWith,
    extend,
    isArray,
    isFunction,
    isObject,
    startsWith,
    trim,
    truncate,
    zeroPad,
    // private Globalization utility functions
    appendPreOrPostMatch,
    expandFormat,
    formatDate,
    formatNumber,
    getTokenRegExp,
    getEra,
    getEraYear,
    parseExact,
    parseNegativePattern;

  // Global variable (Globalize) or CommonJS module (globalize)
  Globalize = function (cultureSelector) {
    return new Globalize.prototype.init(cultureSelector);
  };

  if (typeof require !== "undefined" &&
    typeof exports !== "undefined" &&
    typeof module !== "undefined") {
    // Assume CommonJS
    module.exports = Globalize;
  } else {
    // Export as global variable
    window.Globalize = Globalize;
  }

  Globalize.cultures = {};

  Globalize.prototype = {
    constructor: Globalize,
    init: function (cultureSelector) {
      this.cultures = Globalize.cultures;
      this.cultureSelector = cultureSelector;

      return this;
    }
  };
  Globalize.prototype.init.prototype = Globalize.prototype;

  // 1. When defining a culture, all fields are required except the ones stated as optional.
  // 2. Each culture should have a ".calendars" object with at least one calendar named "standard"
  //    which serves as the default calendar in use by that culture.
  // 3. Each culture should have a ".calendar" object which is the current calendar being used,
  //    it may be dynamically changed at any time to one of the calendars in ".calendars".
  Globalize.cultures["default"] = {
    // A unique name for the culture in the form <language code>-<country/region code>
    name: "en",
    // the name of the culture in the english language
    englishName: "English",
    // the name of the culture in its own language
    nativeName: "English",
    // whether the culture uses right-to-left text
    isRTL: false,
    // "language" is used for so-called "specific" cultures.
    // For example, the culture "es-CL" means "Spanish, in Chili".
    // It represents the Spanish-speaking culture as it is in Chili,
    // which might have different formatting rules or even translations
    // than Spanish in Spain. A "neutral" culture is one that is not
    // specific to a region. For example, the culture "es" is the generic
    // Spanish culture, which may be a more generalized version of the language
    // that may or may not be what a specific culture expects.
    // For a specific culture like "es-CL", the "language" field refers to the
    // neutral, generic culture information for the language it is using.
    // This is not always a simple matter of the string before the dash.
    // For example, the "zh-Hans" culture is netural (Simplified Chinese).
    // And the "zh-SG" culture is Simplified Chinese in Singapore, whose lanugage
    // field is "zh-CHS", not "zh".
    // This field should be used to navigate from a specific culture to it's
    // more general, neutral culture. If a culture is already as general as it
    // can get, the language may refer to itself.
    language: "en",
    // numberFormat defines general number formatting rules, like the digits in
    // each grouping, the group separator, and how negative numbers are displayed.
    numberFormat: {
      // [negativePattern]
      // Note, numberFormat.pattern has no "positivePattern" unlike percent and currency,
      // but is still defined as an array for consistency with them.
      //   negativePattern: one of "(n)|-n|- n|n-|n -"
      pattern: ["-n"],
      // number of decimal places normally shown
      decimals: 2,
      // string that separates number groups, as in 1,000,000
      ",": ",",
      // string that separates a number from the fractional portion, as in 1.99
      ".": ".",
      // array of numbers indicating the size of each number group.
      // TODO: more detailed description and example
      groupSizes: [3],
      // symbol used for positive numbers
      "+": "+",
      // symbol used for negative numbers
      "-": "-",
      // symbol used for NaN (Not-A-Number)
      "NaN": "NaN",
      // symbol used for Negative Infinity
      negativeInfinity: "-Infinity",
      // symbol used for Positive Infinity
      positiveInfinity: "Infinity",
      percent: {
        // [negativePattern, positivePattern]
        //   negativePattern: one of "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %"
        //   positivePattern: one of "n %|n%|%n|% n"
        pattern: ["-n %", "n %"],
        // number of decimal places normally shown
        decimals: 2,
        // array of numbers indicating the size of each number group.
        // TODO: more detailed description and example
        groupSizes: [3],
        // string that separates number groups, as in 1,000,000
        ",": ",",
        // string that separates a number from the fractional portion, as in 1.99
        ".": ".",
        // symbol used to represent a percentage
        symbol: "%"
      },
      currency: {
        // [negativePattern, positivePattern]
        //   negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
        //   positivePattern: one of "$n|n$|$ n|n $"
        pattern: ["($n)", "$n"],
        // number of decimal places normally shown
        decimals: 2,
        // array of numbers indicating the size of each number group.
        // TODO: more detailed description and example
        groupSizes: [3],
        // string that separates number groups, as in 1,000,000
        ",": ",",
        // string that separates a number from the fractional portion, as in 1.99
        ".": ".",
        // symbol used to represent currency
        symbol: "$"
      }
    },
    // calendars defines all the possible calendars used by this culture.
    // There should be at least one defined with name "standard", and is the default
    // calendar used by the culture.
    // A calendar contains information about how dates are formatted, information about
    // the calendar's eras, a standard set of the date formats,
    // translations for day and month names, and if the calendar is not based on the Gregorian
    // calendar, conversion functions to and from the Gregorian calendar.
    calendars: {
      standard: {
        // name that identifies the type of calendar this is
        name: "Gregorian_USEnglish",
        // separator of parts of a date (e.g. "/" in 11/05/1955)
        "/": "/",
        // separator of parts of a time (e.g. ":" in 05:44 PM)
        ":": ":",
        // the first day of the week (0 = Sunday, 1 = Monday, etc)
        firstDay: 0,
        days: {
          // full day names
          names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          // abbreviated day names
          namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          // shortest day names
          namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        },
        months: {
          // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
          names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
          // abbreviated month names
          namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
        },
        // AM and PM designators in one of these forms:
        // The usual view, and the upper and lower case versions
        //   [ standard, lowercase, uppercase ]
        // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
        //   null
        AM: ["AM", "am", "AM"],
        PM: ["PM", "pm", "PM"],
        eras: [
          // eras in reverse chronological order.
          // name: the name of the era in this culture (e.g. A.D., C.E.)
          // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
          // offset: offset in years from gregorian calendar
          {
            "name": "A.D.",
            "start": null,
            "offset": 0
          }
        ],
        // when a two digit year is given, it will never be parsed as a four digit
        // year greater than this year (in the appropriate era for the culture)
        // Set it as a full year (e.g. 2029) or use an offset format starting from
        // the current year: "+19" would correspond to 2029 if the current year 2010.
        twoDigitYearMax: 2029,
        // set of predefined date and time patterns used by the culture
        // these represent the format someone in this culture would expect
        // to see given the portions of the date that are shown.
        patterns: {
          // short date pattern
          d: "M/d/yyyy",
          // long date pattern
          D: "dddd, MMMM dd, yyyy",
          // short time pattern
          t: "h:mm tt",
          // long time pattern
          T: "h:mm:ss tt",
          // long date, short time pattern
          f: "dddd, MMMM dd, yyyy h:mm tt",
          // long date, long time pattern
          F: "dddd, MMMM dd, yyyy h:mm:ss tt",
          // month/day pattern
          M: "MMMM dd",
          // month/year pattern
          Y: "yyyy MMMM",
          // S is a sortable format that does not vary by culture
          S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
        }
        // optional fields for each calendar:
        /*
        monthsGenitive:
          Same as months but used when the day preceeds the month.
          Omit if the culture has no genitive distinction in month names.
          For an explaination of genitive months, see http://blogs.msdn.com/michkap/archive/2004/12/25/332259.aspx
        convert:
          Allows for the support of non-gregorian based calendars. This convert object is used to
          to convert a date to and from a gregorian calendar date to handle parsing and formatting.
          The two functions:
            fromGregorian( date )
              Given the date as a parameter, return an array with parts [ year, month, day ]
              corresponding to the non-gregorian based year, month, and day for the calendar.
            toGregorian( year, month, day )
              Given the non-gregorian year, month, and day, return a new Date() object
              set to the corresponding date in the gregorian calendar.
        */
      }
    },
    // For localized strings
    messages: {}
  };

  Globalize.cultures["default"].calendar = Globalize.cultures["default"].calendars.standard;

  Globalize.cultures.en = Globalize.cultures["default"];

  Globalize.cultureSelector = "en";

  //
  // private variables
  //

  regexHex = /^0x[a-f0-9]+$/i;
  regexInfinity = /^[+\-]?infinity$/i;
  regexParseFloat = /^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/;
  regexTrim = /^\s+|\s+$/g;

  //
  // private JavaScript utility functions
  //

  arrayIndexOf = function (array, item) {
    if (array.indexOf) {
      return array.indexOf(item);
    }
    for (var i = 0, length = array.length; i < length; i++) {
      if (array[i] === item) {
        return i;
      }
    }
    return -1;
  };

  endsWith = function (value, pattern) {
    return value.substr(value.length - pattern.length) === pattern;
  };

  extend = function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];

            } else {
              clone = src && isObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
  };

  isObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  startsWith = function (value, pattern) {
    return value.indexOf(pattern) === 0;
  };

  trim = function (value) {
    return (value + "").replace(regexTrim, "");
  };

  truncate = function (value) {
    if (isNaN(value)) {
      return NaN;
    }
    return Math[value < 0 ? "ceil" : "floor"](value);
  };

  zeroPad = function (str, count, left) {
    var l;
    for (l = str.length; l < count; l += 1) {
      str = (left ? ("0" + str) : (str + "0"));
    }
    return str;
  };

  //
  // private Globalization utility functions
  //

  appendPreOrPostMatch = function (preMatch, strings) {
    // appends pre- and post- token match strings while removing escaped characters.
    // Returns a single quote count which is used to determine if the token occurs
    // in a string literal.
    var quoteCount = 0,
      escaped = false;
    for (var i = 0, il = preMatch.length; i < il; i++) {
      var c = preMatch.charAt(i);
      switch (c) {
        case "\'":
          if (escaped) {
            strings.push("\'");
          }
          else {
            quoteCount++;
          }
          escaped = false;
          break;
        case "\\":
          if (escaped) {
            strings.push("\\");
          }
          escaped = !escaped;
          break;
        default:
          strings.push(c);
          escaped = false;
          break;
      }
    }
    return quoteCount;
  };

  expandFormat = function (cal, format) {
    // expands unspecified or single character date formats into the full pattern.
    format = format || "F";
    var pattern,
      patterns = cal.patterns,
      len = format.length;
    if (len === 1) {
      pattern = patterns[format];
      if (!pattern) {
        throw "Invalid date format string \'" + format + "\'.";
      }
      format = pattern;
    }
    else if (len === 2 && format.charAt(0) === "%") {
      // %X escape format -- intended as a custom format string that is only one character, not a built-in format.
      format = format.charAt(1);
    }
    return format;
  };

  formatDate = function (value, format, culture) {
    var cal = culture.calendar,
      convert = cal.convert,
      ret;

    if (!format || !format.length || format === "i") {
      if (culture && culture.name.length) {
        if (convert) {
          // non-gregorian calendar, so we cannot use built-in toLocaleString()
          ret = formatDate(value, cal.patterns.F, culture);
        }
        else {
          var eraDate = new Date(value.getTime()),
            era = getEra(value, cal.eras);
          eraDate.setFullYear(getEraYear(value, cal, era));
          ret = eraDate.toLocaleString();
        }
      }
      else {
        ret = value.toString();
      }
      return ret;
    }

    var eras = cal.eras,
      sortable = format === "s";
    format = expandFormat(cal, format);

    // Start with an empty string
    ret = [];
    var hour,
      zeros = ["0", "00", "000"],
      foundDay,
      checkedDay,
      dayPartRegExp = /([^d]|^)(d|dd)([^d]|$)/g,
      quoteCount = 0,
      tokenRegExp = getTokenRegExp(),
      converted;

    function padZeros(num, c) {
      var r, s = num + "";
      if (c > 1 && s.length < c) {
        r = (zeros[c - 2] + s);
        return r.substr(r.length - c, c);
      }
      else {
        r = s;
      }
      return r;
    }

    function hasDay() {
      if (foundDay || checkedDay) {
        return foundDay;
      }
      foundDay = dayPartRegExp.test(format);
      checkedDay = true;
      return foundDay;
    }

    function getPart(date, part) {
      if (converted) {
        return converted[part];
      }
      switch (part) {
        case 0:
          return date.getFullYear();
        case 1:
          return date.getMonth();
        case 2:
          return date.getDate();
        default:
          throw "Invalid part value " + part;
      }
    }

    if (!sortable && convert) {
      converted = convert.fromGregorian(value);
    }

    for (; ;) {
      // Save the current index
      var index = tokenRegExp.lastIndex,
        // Look for the next pattern
        ar = tokenRegExp.exec(format);

      // Append the text before the pattern (or the end of the string if not found)
      var preMatch = format.slice(index, ar ? ar.index : format.length);
      quoteCount += appendPreOrPostMatch(preMatch, ret);

      if (!ar) {
        break;
      }

      // do not replace any matches that occur inside a string literal.
      if (quoteCount % 2) {
        ret.push(ar[0]);
        continue;
      }

      var current = ar[0],
        clength = current.length;

      switch (current) {
        case "ddd":
          //Day of the week, as a three-letter abbreviation
        case "dddd":
          // Day of the week, using the full name
          var names = (clength === 3) ? cal.days.namesAbbr : cal.days.names;
          ret.push(names[value.getDay()]);
          break;
        case "d":
          // Day of month, without leading zero for single-digit days
        case "dd":
          // Day of month, with leading zero for single-digit days
          foundDay = true;
          ret.push(
            padZeros(getPart(value, 2), clength)
          );
          break;
        case "MMM":
          // Month, as a three-letter abbreviation
        case "MMMM":
          // Month, using the full name
          var part = getPart(value, 1);
          ret.push(
            (cal.monthsGenitive && hasDay()) ?
            (cal.monthsGenitive[clength === 3 ? "namesAbbr" : "names"][part]) :
            (cal.months[clength === 3 ? "namesAbbr" : "names"][part])
          );
          break;
        case "M":
          // Month, as digits, with no leading zero for single-digit months
        case "MM":
          // Month, as digits, with leading zero for single-digit months
          ret.push(
            padZeros(getPart(value, 1) + 1, clength)
          );
          break;
        case "y":
          // Year, as two digits, but with no leading zero for years less than 10
        case "yy":
          // Year, as two digits, with leading zero for years less than 10
        case "yyyy":
          // Year represented by four full digits
          part = converted ? converted[0] : getEraYear(value, cal, getEra(value, eras), sortable);
          if (clength < 4) {
            part = part % 100;
          }
          ret.push(
            padZeros(part, clength)
          );
          break;
        case "h":
          // Hours with no leading zero for single-digit hours, using 12-hour clock
        case "hh":
          // Hours with leading zero for single-digit hours, using 12-hour clock
          hour = value.getHours() % 12;
          if (hour === 0) hour = 12;
          ret.push(
            padZeros(hour, clength)
          );
          break;
        case "H":
          // Hours with no leading zero for single-digit hours, using 24-hour clock
        case "HH":
          // Hours with leading zero for single-digit hours, using 24-hour clock
          ret.push(
            padZeros(value.getHours(), clength)
          );
          break;
        case "m":
          // Minutes with no leading zero for single-digit minutes
        case "mm":
          // Minutes with leading zero for single-digit minutes
          ret.push(
            padZeros(value.getMinutes(), clength)
          );
          break;
        case "s":
          // Seconds with no leading zero for single-digit seconds
        case "ss":
          // Seconds with leading zero for single-digit seconds
          ret.push(
            padZeros(value.getSeconds(), clength)
          );
          break;
        case "t":
          // One character am/pm indicator ("a" or "p")
        case "tt":
          // Multicharacter am/pm indicator
          part = value.getHours() < 12 ? (cal.AM ? cal.AM[0] : " ") : (cal.PM ? cal.PM[0] : " ");
          ret.push(clength === 1 ? part.charAt(0) : part);
          break;
        case "f":
          // Deciseconds
        case "ff":
          // Centiseconds
        case "fff":
          // Milliseconds
          ret.push(
            padZeros(value.getMilliseconds(), 3).substr(0, clength)
          );
          break;
        case "z":
          // Time zone offset, no leading zero
        case "zz":
          // Time zone offset with leading zero
          hour = value.getTimezoneOffset() / 60;
          ret.push(
            (hour <= 0 ? "+" : "-") + padZeros(Math.floor(Math.abs(hour)), clength)
          );
          break;
        case "zzz":
          // Time zone offset with leading zero
          hour = value.getTimezoneOffset() / 60;
          ret.push(
            (hour <= 0 ? "+" : "-") + padZeros(Math.floor(Math.abs(hour)), 2) +
            // Hard coded ":" separator, rather than using cal.TimeSeparator
            // Repeated here for consistency, plus ":" was already assumed in date parsing.
            ":" + padZeros(Math.abs(value.getTimezoneOffset() % 60), 2)
          );
          break;
        case "g":
        case "gg":
          if (cal.eras) {
            ret.push(
              cal.eras[getEra(value, eras)].name
            );
          }
          break;
        case "/":
          ret.push(cal["/"]);
          break;
        default:
          throw "Invalid date format pattern \'" + current + "\'.";
      }
    }
    return ret.join("");
  };

  // formatNumber
  (function () {
    var expandNumber;

    expandNumber = function (number, precision, formatInfo) {
      var groupSizes = formatInfo.groupSizes,
        curSize = groupSizes[0],
        curGroupIndex = 1,
        factor = Math.pow(10, precision),
        rounded = Math.round(number * factor) / factor;

      if (!isFinite(rounded)) {
        rounded = number;
      }
      number = rounded;

      var numberString = number + "",
        right = "",
        split = numberString.split(/e/i),
        exponent = split.length > 1 ? parseInt(split[1], 10) : 0;
      numberString = split[0];
      split = numberString.split(".");
      numberString = split[0];
      right = split.length > 1 ? split[1] : "";

      var l;
      if (exponent > 0) {
        right = zeroPad(right, exponent, false);
        numberString += right.slice(0, exponent);
        right = right.substr(exponent);
      }
      else if (exponent < 0) {
        exponent = -exponent;
        numberString = zeroPad(numberString, exponent + 1, true);
        right = numberString.slice(-exponent, numberString.length) + right;
        numberString = numberString.slice(0, -exponent);
      }

      if (precision > 0) {
        right = formatInfo["."] +
          ((right.length > precision) ? right.slice(0, precision) : zeroPad(right, precision));
      }
      else {
        right = "";
      }

      var stringIndex = numberString.length - 1,
        sep = formatInfo[","],
        ret = "";

      while (stringIndex >= 0) {
        if (curSize === 0 || curSize > stringIndex) {
          return numberString.slice(0, stringIndex + 1) + (ret.length ? (sep + ret + right) : right);
        }
        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + (ret.length ? (sep + ret) : "");

        stringIndex -= curSize;

        if (curGroupIndex < groupSizes.length) {
          curSize = groupSizes[curGroupIndex];
          curGroupIndex++;
        }
      }

      return numberString.slice(0, stringIndex + 1) + sep + ret + right;
    };

    formatNumber = function (value, format, culture) {
      if (!isFinite(value)) {
        if (value === Infinity) {
          return culture.numberFormat.positiveInfinity;
        }
        if (value === -Infinity) {
          return culture.numberFormat.negativeInfinity;
        }
        return culture.numberFormat.NaN;
      }
      if (!format || format === "i") {
        return culture.name.length ? value.toLocaleString() : value.toString();
      }
      format = format || "D";

      var nf = culture.numberFormat,
        number = Math.abs(value),
        precision = -1,
        pattern;
      if (format.length > 1) precision = parseInt(format.slice(1), 10);

      var current = format.charAt(0).toUpperCase(),
        formatInfo;

      switch (current) {
        case "D":
          pattern = "n";
          number = truncate(number);
          if (precision !== -1) {
            number = zeroPad("" + number, precision, true);
          }
          if (value < 0) number = "-" + number;
          break;
        case "N":
          formatInfo = nf;
          /* falls through */
        case "C":
          formatInfo = formatInfo || nf.currency;
          /* falls through */
        case "P":
          formatInfo = formatInfo || nf.percent;
          pattern = value < 0 ? formatInfo.pattern[0] : (formatInfo.pattern[1] || "n");
          if (precision === -1) precision = formatInfo.decimals;
          number = expandNumber(number * (current === "P" ? 100 : 1), precision, formatInfo);
          break;
        default:
          throw "Bad number format specifier: " + current;
      }

      var patternParts = /n|\$|-|%/g,
        ret = "";
      for (; ;) {
        var index = patternParts.lastIndex,
          ar = patternParts.exec(pattern);

        ret += pattern.slice(index, ar ? ar.index : pattern.length);

        if (!ar) {
          break;
        }

        switch (ar[0]) {
          case "n":
            ret += number;
            break;
          case "$":
            ret += nf.currency.symbol;
            break;
          case "-":
            // don't make 0 negative
            if (/[1-9]/.test(number)) {
              ret += nf["-"];
            }
            break;
          case "%":
            ret += nf.percent.symbol;
            break;
        }
      }

      return ret;
    };

  }());

  getTokenRegExp = function () {
    // regular expression for matching date and time tokens in format strings.
    return (/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g);
  };

  getEra = function (date, eras) {
    if (!eras) return 0;
    var start, ticks = date.getTime();
    for (var i = 0, l = eras.length; i < l; i++) {
      start = eras[i].start;
      if (start === null || ticks >= start) {
        return i;
      }
    }
    return 0;
  };

  getEraYear = function (date, cal, era, sortable) {
    var year = date.getFullYear();
    if (!sortable && cal.eras) {
      // convert normal gregorian year to era-shifted gregorian
      // year by subtracting the era offset
      year -= cal.eras[era].offset;
    }
    return year;
  };

  // parseExact
  (function () {
    var expandYear,
      getDayIndex,
      getMonthIndex,
      getParseRegExp,
      outOfRange,
      toUpper,
      toUpperArray;

    expandYear = function (cal, year) {
      // expands 2-digit year into 4 digits.
      if (year < 100) {
        var now = new Date(),
          era = getEra(now),
          curr = getEraYear(now, cal, era),
          twoDigitYearMax = cal.twoDigitYearMax;
        twoDigitYearMax = typeof twoDigitYearMax === "string" ? new Date().getFullYear() % 100 + parseInt(twoDigitYearMax, 10) : twoDigitYearMax;
        year += curr - (curr % 100);
        if (year > twoDigitYearMax) {
          year -= 100;
        }
      }
      return year;
    };

    getDayIndex = function (cal, value, abbr) {
      var ret,
        days = cal.days,
        upperDays = cal._upperDays;
      if (!upperDays) {
        cal._upperDays = upperDays = [
          toUpperArray(days.names),
          toUpperArray(days.namesAbbr),
          toUpperArray(days.namesShort)
        ];
      }
      value = toUpper(value);
      if (abbr) {
        ret = arrayIndexOf(upperDays[1], value);
        if (ret === -1) {
          ret = arrayIndexOf(upperDays[2], value);
        }
      }
      else {
        ret = arrayIndexOf(upperDays[0], value);
      }
      return ret;
    };

    getMonthIndex = function (cal, value, abbr) {
      var months = cal.months,
        monthsGen = cal.monthsGenitive || cal.months,
        upperMonths = cal._upperMonths,
        upperMonthsGen = cal._upperMonthsGen;
      if (!upperMonths) {
        cal._upperMonths = upperMonths = [
          toUpperArray(months.names),
          toUpperArray(months.namesAbbr)
        ];
        cal._upperMonthsGen = upperMonthsGen = [
          toUpperArray(monthsGen.names),
          toUpperArray(monthsGen.namesAbbr)
        ];
      }
      value = toUpper(value);
      var i = arrayIndexOf(abbr ? upperMonths[1] : upperMonths[0], value);
      if (i < 0) {
        i = arrayIndexOf(abbr ? upperMonthsGen[1] : upperMonthsGen[0], value);
      }
      return i;
    };

    getParseRegExp = function (cal, format) {
      // converts a format string into a regular expression with groups that
      // can be used to extract date fields from a date string.
      // check for a cached parse regex.
      var re = cal._parseRegExp;
      if (!re) {
        cal._parseRegExp = re = {};
      }
      else {
        var reFormat = re[format];
        if (reFormat) {
          return reFormat;
        }
      }

      // expand single digit formats, then escape regular expression characters.
      var expFormat = expandFormat(cal, format).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"),
        regexp = ["^"],
        groups = [],
        index = 0,
        quoteCount = 0,
        tokenRegExp = getTokenRegExp(),
        match;

      // iterate through each date token found.
      while ((match = tokenRegExp.exec(expFormat)) !== null) {
        var preMatch = expFormat.slice(index, match.index);
        index = tokenRegExp.lastIndex;

        // don't replace any matches that occur inside a string literal.
        quoteCount += appendPreOrPostMatch(preMatch, regexp);
        if (quoteCount % 2) {
          regexp.push(match[0]);
          continue;
        }

        // add a regex group for the token.
        var m = match[0],
          len = m.length,
          add;
        switch (m) {
          case "dddd": case "ddd":
          case "MMMM": case "MMM":
          case "gg": case "g":
            add = "(\\D+)";
            break;
          case "tt": case "t":
            add = "(\\D*)";
            break;
          case "yyyy":
          case "fff":
          case "ff":
          case "f":
            add = "(\\d{" + len + "})";
            break;
          case "dd": case "d":
          case "MM": case "M":
          case "yy": case "y":
          case "HH": case "H":
          case "hh": case "h":
          case "mm": case "m":
          case "ss": case "s":
            add = "(\\d\\d?)";
            break;
          case "zzz":
            add = "([+-]?\\d\\d?:\\d{2})";
            break;
          case "zz": case "z":
            add = "([+-]?\\d\\d?)";
            break;
          case "/":
            add = "(\\/)";
            break;
          default:
            throw "Invalid date format pattern \'" + m + "\'.";
        }
        if (add) {
          regexp.push(add);
        }
        groups.push(match[0]);
      }
      appendPreOrPostMatch(expFormat.slice(index), regexp);
      regexp.push("$");

      // allow whitespace to differ when matching formats.
      var regexpStr = regexp.join("").replace(/\s+/g, "\\s+"),
        parseRegExp = { "regExp": regexpStr, "groups": groups };

      // cache the regex for this format.
      return re[format] = parseRegExp;
    };

    outOfRange = function (value, low, high) {
      return value < low || value > high;
    };

    toUpper = function (value) {
      // "he-IL" has non-breaking space in weekday names.
      return value.split("\u00A0").join(" ").toUpperCase();
    };

    toUpperArray = function (arr) {
      var results = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        results[i] = toUpper(arr[i]);
      }
      return results;
    };

    parseExact = function (value, format, culture) {
      // try to parse the date string by matching against the format string
      // while using the specified culture for date field names.
      value = trim(value);
      var cal = culture.calendar,
        // convert date formats into regular expressions with groupings.
        // use the regexp to determine the input format and extract the date fields.
        parseInfo = getParseRegExp(cal, format),
        match = new RegExp(parseInfo.regExp).exec(value);
      if (match === null) {
        return null;
      }
      // found a date format that matches the input.
      var groups = parseInfo.groups,
        era = null, year = null, month = null, date = null, weekDay = null,
        hour = 0, hourOffset, min = 0, sec = 0, msec = 0, tzMinOffset = null,
        pmHour = false;
      // iterate the format groups to extract and set the date fields.
      for (var j = 0, jl = groups.length; j < jl; j++) {
        var matchGroup = match[j + 1];
        if (matchGroup) {
          var current = groups[j],
            clength = current.length,
            matchInt = parseInt(matchGroup, 10);
          switch (current) {
            case "dd": case "d":
              // Day of month.
              date = matchInt;
              // check that date is generally in valid range, also checking overflow below.
              if (outOfRange(date, 1, 31)) return null;
              break;
            case "MMM": case "MMMM":
              month = getMonthIndex(cal, matchGroup, clength === 3);
              if (outOfRange(month, 0, 11)) return null;
              break;
            case "M": case "MM":
              // Month.
              month = matchInt - 1;
              if (outOfRange(month, 0, 11)) return null;
              break;
            case "y": case "yy":
            case "yyyy":
              year = clength < 4 ? expandYear(cal, matchInt) : matchInt;
              if (outOfRange(year, 0, 9999)) return null;
              break;
            case "h": case "hh":
              // Hours (12-hour clock).
              hour = matchInt;
              if (hour === 12) hour = 0;
              if (outOfRange(hour, 0, 11)) return null;
              break;
            case "H": case "HH":
              // Hours (24-hour clock).
              hour = matchInt;
              if (outOfRange(hour, 0, 23)) return null;
              break;
            case "m": case "mm":
              // Minutes.
              min = matchInt;
              if (outOfRange(min, 0, 59)) return null;
              break;
            case "s": case "ss":
              // Seconds.
              sec = matchInt;
              if (outOfRange(sec, 0, 59)) return null;
              break;
            case "tt": case "t":
              // AM/PM designator.
              // see if it is standard, upper, or lower case PM. If not, ensure it is at least one of
              // the AM tokens. If not, fail the parse for this format.
              pmHour = cal.PM && (matchGroup === cal.PM[0] || matchGroup === cal.PM[1] || matchGroup === cal.PM[2]);
              if (
                !pmHour && (
                  !cal.AM || (matchGroup !== cal.AM[0] && matchGroup !== cal.AM[1] && matchGroup !== cal.AM[2])
                )
              ) return null;
              break;
            case "f":
              // Deciseconds.
            case "ff":
              // Centiseconds.
            case "fff":
              // Milliseconds.
              msec = matchInt * Math.pow(10, 3 - clength);
              if (outOfRange(msec, 0, 999)) return null;
              break;
            case "ddd":
              // Day of week.
            case "dddd":
              // Day of week.
              weekDay = getDayIndex(cal, matchGroup, clength === 3);
              if (outOfRange(weekDay, 0, 6)) return null;
              break;
            case "zzz":
              // Time zone offset in +/- hours:min.
              var offsets = matchGroup.split(/:/);
              if (offsets.length !== 2) return null;
              hourOffset = parseInt(offsets[0], 10);
              if (outOfRange(hourOffset, -12, 13)) return null;
              var minOffset = parseInt(offsets[1], 10);
              if (outOfRange(minOffset, 0, 59)) return null;
              tzMinOffset = (hourOffset * 60) + (startsWith(matchGroup, "-") ? -minOffset : minOffset);
              break;
            case "z": case "zz":
              // Time zone offset in +/- hours.
              hourOffset = matchInt;
              if (outOfRange(hourOffset, -12, 13)) return null;
              tzMinOffset = hourOffset * 60;
              break;
            case "g": case "gg":
              var eraName = matchGroup;
              if (!eraName || !cal.eras) return null;
              eraName = trim(eraName.toLowerCase());
              for (var i = 0, l = cal.eras.length; i < l; i++) {
                if (eraName === cal.eras[i].name.toLowerCase()) {
                  era = i;
                  break;
                }
              }
              // could not find an era with that name
              if (era === null) return null;
              break;
          }
        }
      }
      var result = new Date(), defaultYear, convert = cal.convert;
      defaultYear = convert ? convert.fromGregorian(result)[0] : result.getFullYear();
      if (year === null) {
        year = defaultYear;
      }
      else if (cal.eras) {
        // year must be shifted to normal gregorian year
        // but not if year was not specified, its already normal gregorian
        // per the main if clause above.
        year += cal.eras[(era || 0)].offset;
      }
      // set default day and month to 1 and January, so if unspecified, these are the defaults
      // instead of the current day/month.
      if (month === null) {
        month = 0;
      }
      if (date === null) {
        date = 1;
      }
      // now have year, month, and date, but in the culture's calendar.
      // convert to gregorian if necessary
      if (convert) {
        result = convert.toGregorian(year, month, date);
        // conversion failed, must be an invalid match
        if (result === null) return null;
      }
      else {
        // have to set year, month and date together to avoid overflow based on current date.
        result.setFullYear(year, month, date);
        // check to see if date overflowed for specified month (only checked 1-31 above).
        if (result.getDate() !== date) return null;
        // invalid day of week.
        if (weekDay !== null && result.getDay() !== weekDay) {
          return null;
        }
      }
      // if pm designator token was found make sure the hours fit the 24-hour clock.
      if (pmHour && hour < 12) {
        hour += 12;
      }
      result.setHours(hour, min, sec, msec);
      if (tzMinOffset !== null) {
        // adjust timezone to utc before applying local offset.
        var adjustedMin = result.getMinutes() - (tzMinOffset + result.getTimezoneOffset());
        // Safari limits hours and minutes to the range of -127 to 127.  We need to use setHours
        // to ensure both these fields will not exceed this range.	adjustedMin will range
        // somewhere between -1440 and 1500, so we only need to split this into hours.
        result.setHours(result.getHours() + parseInt(adjustedMin / 60, 10), adjustedMin % 60);
      }
      return result;
    };
  }());

  parseNegativePattern = function (value, nf, negativePattern) {
    var neg = nf["-"],
      pos = nf["+"],
      ret;
    switch (negativePattern) {
      case "n -":
        neg = " " + neg;
        pos = " " + pos;
        /* falls through */
      case "n-":
        if (endsWith(value, neg)) {
          ret = ["-", value.substr(0, value.length - neg.length)];
        }
        else if (endsWith(value, pos)) {
          ret = ["+", value.substr(0, value.length - pos.length)];
        }
        break;
      case "- n":
        neg += " ";
        pos += " ";
        /* falls through */
      case "-n":
        if (startsWith(value, neg)) {
          ret = ["-", value.substr(neg.length)];
        }
        else if (startsWith(value, pos)) {
          ret = ["+", value.substr(pos.length)];
        }
        break;
      case "(n)":
        if (startsWith(value, "(") && endsWith(value, ")")) {
          ret = ["-", value.substr(1, value.length - 2)];
        }
        break;
    }
    return ret || ["", value];
  };

  //
  // public instance functions
  //

  Globalize.prototype.findClosestCulture = function (cultureSelector) {
    return Globalize.findClosestCulture.call(this, cultureSelector);
  };

  Globalize.prototype.format = function (value, format, cultureSelector) {
    return Globalize.format.call(this, value, format, cultureSelector);
  };

  Globalize.prototype.localize = function (key, cultureSelector) {
    return Globalize.localize.call(this, key, cultureSelector);
  };

  Globalize.prototype.parseInt = function (value, radix, cultureSelector) {
    return Globalize.parseInt.call(this, value, radix, cultureSelector);
  };

  Globalize.prototype.parseFloat = function (value, radix, cultureSelector) {
    return Globalize.parseFloat.call(this, value, radix, cultureSelector);
  };

  Globalize.prototype.culture = function (cultureSelector) {
    return Globalize.culture.call(this, cultureSelector);
  };

  //
  // public singleton functions
  //

  Globalize.addCultureInfo = function (cultureName, baseCultureName, info) {

    var base = {},
      isNew = false;

    if (typeof cultureName !== "string") {
      // cultureName argument is optional string. If not specified, assume info is first
      // and only argument. Specified info deep-extends current culture.
      info = cultureName;
      cultureName = this.culture().name;
      base = this.cultures[cultureName];
    } else if (typeof baseCultureName !== "string") {
      // baseCultureName argument is optional string. If not specified, assume info is second
      // argument. Specified info deep-extends specified culture.
      // If specified culture does not exist, create by deep-extending default
      info = baseCultureName;
      isNew = (this.cultures[cultureName] == null);
      base = this.cultures[cultureName] || this.cultures["default"];
    } else {
      // cultureName and baseCultureName specified. Assume a new culture is being created
      // by deep-extending an specified base culture
      isNew = true;
      base = this.cultures[baseCultureName];
    }

    this.cultures[cultureName] = extend(true, {},
      base,
      info
    );
    // Make the standard calendar the current culture if it's a new culture
    if (isNew) {
      this.cultures[cultureName].calendar = this.cultures[cultureName].calendars.standard;
    }
  };

  Globalize.findClosestCulture = function (name) {
    var match;
    if (!name) {
      return this.findClosestCulture(this.cultureSelector) || this.cultures["default"];
    }
    if (typeof name === "string") {
      name = name.split(",");
    }
    if (isArray(name)) {
      var lang,
        cultures = this.cultures,
        list = name,
        i, l = list.length,
        prioritized = [];
      for (i = 0; i < l; i++) {
        name = trim(list[i]);
        var pri, parts = name.split(";");
        lang = trim(parts[0]);
        if (parts.length === 1) {
          pri = 1;
        }
        else {
          name = trim(parts[1]);
          if (name.indexOf("q=") === 0) {
            name = name.substr(2);
            pri = parseFloat(name);
            pri = isNaN(pri) ? 0 : pri;
          }
          else {
            pri = 1;
          }
        }
        prioritized.push({ lang: lang, pri: pri });
      }
      prioritized.sort(function (a, b) {
        if (a.pri < b.pri) {
          return 1;
        } else if (a.pri > b.pri) {
          return -1;
        }
        return 0;
      });
      // exact match
      for (i = 0; i < l; i++) {
        lang = prioritized[i].lang;
        match = cultures[lang];
        if (match) {
          return match;
        }
      }

      // neutral language match
      for (i = 0; i < l; i++) {
        lang = prioritized[i].lang;
        do {
          var index = lang.lastIndexOf("-");
          if (index === -1) {
            break;
          }
          // strip off the last part. e.g. en-US => en
          lang = lang.substr(0, index);
          match = cultures[lang];
          if (match) {
            return match;
          }
        }
        while (1);
      }

      // last resort: match first culture using that language
      for (i = 0; i < l; i++) {
        lang = prioritized[i].lang;
        for (var cultureKey in cultures) {
          var culture = cultures[cultureKey];
          if (culture.language == lang) {
            return culture;
          }
        }
      }
    }
    else if (typeof name === "object") {
      return name;
    }
    return match || null;
  };

  Globalize.format = function (value, format, cultureSelector) {
    var culture = this.findClosestCulture(cultureSelector);
    if (value instanceof Date) {
      value = formatDate(value, format, culture);
    }
    else if (typeof value === "number") {
      value = formatNumber(value, format, culture);
    }
    return value;
  };

  Globalize.localize = function (key, cultureSelector) {
    return this.findClosestCulture(cultureSelector).messages[key] ||
      this.cultures["default"].messages[key];
  };

  Globalize.parseDate = function (value, formats, culture) {
    culture = this.findClosestCulture(culture);

    var date, prop, patterns;
    if (formats) {
      if (typeof formats === "string") {
        formats = [formats];
      }
      if (formats.length) {
        for (var i = 0, l = formats.length; i < l; i++) {
          var format = formats[i];
          if (format) {
            date = parseExact(value, format, culture);
            if (date) {
              break;
            }
          }
        }
      }
    } else {
      patterns = culture.calendar.patterns;
      for (prop in patterns) {
        date = parseExact(value, patterns[prop], culture);
        if (date) {
          break;
        }
      }
    }

    return date || null;
  };

  Globalize.parseInt = function (value, radix, cultureSelector) {
    return truncate(Globalize.parseFloat(value, radix, cultureSelector));
  };

  Globalize.parseFloat = function (value, radix, cultureSelector) {
    // radix argument is optional
    if (typeof radix !== "number") {
      cultureSelector = radix;
      radix = 10;
    }

    var culture = this.findClosestCulture(cultureSelector);
    var ret = NaN,
      nf = culture.numberFormat;

    if (value.indexOf(culture.numberFormat.currency.symbol) > -1) {
      // remove currency symbol
      value = value.replace(culture.numberFormat.currency.symbol, "");
      // replace decimal seperator
      value = value.replace(culture.numberFormat.currency["."], culture.numberFormat["."]);
    }

    //Remove percentage character from number string before parsing
    if (value.indexOf(culture.numberFormat.percent.symbol) > -1) {
      value = value.replace(culture.numberFormat.percent.symbol, "");
    }

    // remove spaces: leading, trailing and between - and number. Used for negative currency pt-BR
    value = value.replace(/ /g, "");

    // allow infinity or hexidecimal
    if (regexInfinity.test(value)) {
      ret = parseFloat(value);
    }
    else if (!radix && regexHex.test(value)) {
      ret = parseInt(value, 16);
    }
    else {

      // determine sign and number
      var signInfo = parseNegativePattern(value, nf, nf.pattern[0]),
        sign = signInfo[0],
        num = signInfo[1];

      // #44 - try parsing as "(n)"
      if (sign === "" && nf.pattern[0] !== "(n)") {
        signInfo = parseNegativePattern(value, nf, "(n)");
        sign = signInfo[0];
        num = signInfo[1];
      }

      // try parsing as "-n"
      if (sign === "" && nf.pattern[0] !== "-n") {
        signInfo = parseNegativePattern(value, nf, "-n");
        sign = signInfo[0];
        num = signInfo[1];
      }

      sign = sign || "+";

      // determine exponent and number
      var exponent,
        intAndFraction,
        exponentPos = num.indexOf("e");
      if (exponentPos < 0) exponentPos = num.indexOf("E");
      if (exponentPos < 0) {
        intAndFraction = num;
        exponent = null;
      }
      else {
        intAndFraction = num.substr(0, exponentPos);
        exponent = num.substr(exponentPos + 1);
      }
      // determine decimal position
      var integer,
        fraction,
        decSep = nf["."],
        decimalPos = intAndFraction.indexOf(decSep);
      if (decimalPos < 0) {
        integer = intAndFraction;
        fraction = null;
      }
      else {
        integer = intAndFraction.substr(0, decimalPos);
        fraction = intAndFraction.substr(decimalPos + decSep.length);
      }
      // handle groups (e.g. 1,000,000)
      var groupSep = nf[","];
      integer = integer.split(groupSep).join("");
      var altGroupSep = groupSep.replace(/\u00A0/g, " ");
      if (groupSep !== altGroupSep) {
        integer = integer.split(altGroupSep).join("");
      }
      // build a natively parsable number string
      var p = sign + integer;
      if (fraction !== null) {
        p += "." + fraction;
      }
      if (exponent !== null) {
        // exponent itself may have a number patternd
        var expSignInfo = parseNegativePattern(exponent, nf, "-n");
        p += "e" + (expSignInfo[0] || "+") + expSignInfo[1];
      }
      if (regexParseFloat.test(p)) {
        ret = parseFloat(p);
      }
    }
    return ret;
  };

  Globalize.culture = function (cultureSelector) {
    // setter
    if (typeof cultureSelector !== "undefined") {
      this.cultureSelector = cultureSelector;
    }
    // getter
    return this.findClosestCulture(cultureSelector) || this.cultures["default"];
  };

}(this));

//#endregion End Globalize

//#region Jeditable
/*
 * Jeditable - jQuery in place edit plugin
 *
 * Copyright (c) 2006-2009 Mika Tuupola, Dylan Verheul
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Based on editable by Dylan Verheul <dylan_at_dyve.net>:
 *    http://www.dyve.net/jquery/?editable
 *
 * Modified by Roger: Added 'oncomplete' event. Search for "[GSP]" to see lines that have been modified.
 *
 */

/**
  * Version 1.7.2-dev
  *
  * ** means there is basic unit tests for this parameter.
  *
  * @name  Jeditable
  * @type  jQuery
  * @param String  target             (POST) URL or function to send edited content to **
  * @param Hash    options            additional options
  * @param String  options[method]    method to use to send edited content (POST or PUT) **
  * @param Function options[callback] Function to run after submitting edited content **
  * @param String  options[name]      POST parameter name of edited content
  * @param String  options[id]        POST parameter name of edited div id
  * @param Hash    options[submitdata] Extra parameters to send when submitting edited content.
  * @param String  options[type]      text, textarea or select (or any 3rd party input type) **
  * @param Integer options[rows]      number of rows if using textarea **
  * @param Integer options[cols]      number of columns if using textarea **
  * @param Mixed   options[height]    'auto', 'none' or height in pixels **
  * @param Mixed   options[width]     'auto', 'none' or width in pixels **
  * @param Mixed   options[widthBuffer] Number of pixels to subtract from auto-calculated width, applies only when width=auto ** [GSP] Added to allow for padding in form elements
  * @param String  options[loadurl]   URL to fetch input content before editing **
  * @param String  options[loadtype]  Request type for load url. Should be GET or POST.
  * @param String  options[loadtext]  Text to display while loading external content.
  * @param Mixed   options[loaddata]  Extra parameters to pass when fetching content before editing.
  * @param Mixed   options[data]      Or content given as paramameter. String or function.**
  * @param String  options[indicator] indicator html to show when saving
  * @param String  options[tooltip]   optional tooltip text via title attribute **
  * @param String  options[event]     jQuery event such as 'click' of 'dblclick' **
  * @param String  options[submit]    submit button value, empty means no button **
  * @param String  options[cancel]    cancel button value, empty means no button **
  * @param String  options[cssclass]  CSS class to apply to input form. 'inherit' to copy from parent. **
  * @param String  options[style]     Style to apply to input form 'inherit' to copy from parent. **
  * @param String  options[select]    true or false, when true text is highlighted ??
  * @param String  options[placeholder] Placeholder text or html to insert when element is empty. **
  * @param String  options[onblur]    'cancel', 'submit', 'ignore' or function ??
  * @param String  options[oncomplete]  [GSP]: Specifies a function to be called after the web service is returned. Can be used to process the returned data.
  * @param String  options[oneditbegin]  [GSP]: Specifies a function to be called when the user initiates an editing action, *before* the DOM is manipulated. Was called onedit in original version
  * @param String  options[oneditend]  [GSP]: Specifies a function to be called when the user initiates an editing action, *after* the DOM is manipulated
  * @param String  options[submitontab]  [GSP]: When true, the form is submitted when the user clicks tab.
  * @param String  options[submitonenter]  [GSP]: When true, the form is submitted when the user clicks enter.
  *
  * @param Function options[onsubmit] function(settings, original) { ... } called before submit
  * @param Function options[onreset]  function(settings, original) { ... } called before reset
  * @param Function options[onerror]  function(settings, original, xhr) { ... } called on error
  *
  * @param Hash    options[ajaxoptions]  jQuery Ajax options. See docs.jquery.com.
  *
  */

(function ($) {

  $.fn.editable = function (target, options) {

    if ('disable' == target) {
      $(this).data('disabled.editable', true);
      return;
    }
    if ('enable' == target) {
      $(this).data('disabled.editable', false);
      return;
    }
    if ('destroy' == target) {
      $(this)
                .unbind($(this).data('event.editable'))
                .removeData('disabled.editable')
                .removeData('event.editable');
      return;
    }

    var settings = $.extend({}, $.fn.editable.defaults, { target: target }, options);

    /* setup some functions */
    var plugin = $.editable.types[settings.type].plugin || function () { };
    var submit = $.editable.types[settings.type].submit || function () { };
    var buttons = $.editable.types[settings.type].buttons
                    || $.editable.types['defaults'].buttons;
    var content = $.editable.types[settings.type].content
                    || $.editable.types['defaults'].content;
    var element = $.editable.types[settings.type].element
                    || $.editable.types['defaults'].element;
    var reset = $.editable.types[settings.type].reset
                    || $.editable.types['defaults'].reset;
    var callback = settings.callback || function () { };
    var oneditbegin = settings.oneditbegin || settings.onedit || function () { }; // [GSP] If caller specified onedit, use that (preserves backward compatibility)
    var oneditend = settings.oneditend || function () { };
    var onsubmit = settings.onsubmit || function () { };
    var onreset = settings.onreset || function () { };
    var onerror = settings.onerror || reset;
    var oncomplete = settings.oncomplete || function (s) { return s; }; // [GSP]

    /* Show tooltip. */
    if (settings.tooltip) {
      $(this).attr('title', settings.tooltip);
    }

    settings.autowidth = 'auto' == settings.width;
    settings.autoheight = 'auto' == settings.height;

    return this.each(function () {

      /* Save this to self because this changes when scope changes. */
      var self = this;

      /* Inlined block elements lose their width and height after first edit. */
      /* Save them for later use as workaround. */
      var savedwidth = $(self).width();
      var savedheight = $(self).height();

      /* Save so it can be later used by $.editable('destroy') */
      $(this).data('event.editable', settings.event);

      /* If element is empty add something clickable (if requested) */
      if (!$.trim($(this).html())) {
        $(this).html(settings.placeholder);
      }

      $(this).bind(settings.event, function (e) {

        /* Abort if element is disabled. */
        if (true === $(this).data('disabled.editable')) {
          return;
        }

        /* Prevent throwing an exeption if edit field is clicked again. */
        if (self.editing) {
          return;
        }

        /* Abort if oneditbegin hook returns false. */
        if (false === oneditbegin.apply(this, [settings, self, e])) { //[GSP] Passed event object as 3rd parm
          return;
        }

        /* Prevent default action and bubbling. */
        e.preventDefault();
        e.stopPropagation();

        /* Remove tooltip. */
        if (settings.tooltip) {
          $(self).removeAttr('title');
        }

        /* Figure out how wide and tall we are, saved width and height. */
        /* Workaround for http://dev.jquery.com/ticket/2190 */
        if (0 == $(self).width()) {
          settings.width = savedwidth;
          settings.height = savedheight;
        } else {
          if (settings.width != 'none') {
            settings.width = settings.autowidth ? $(self).width() - settings.widthBuffer : settings.width; //[GSP] Subtracted widthBuffer to allow for padding in form elements
          }
          if (settings.height != 'none') {
            settings.height = settings.autoheight ? $(self).outerHeight() : settings.height; //[GSP] Use outerHeight() instead of height() to capture padding
          }
        }

        /* Remove placeholder text, replace is here because of IE. */
        if ($(this).html().toLowerCase().replace(/(;|"|\/)/g, '') ==
                    settings.placeholder.toLowerCase().replace(/(;|"|\/)/g, '')) {
          $(this).html('');
        }

        self.editing = true;
        self.revert = $(self).html();
        $(self).html('');

        /* Create the form object. */
        var form = $('<form />');

        /* Apply css or style or both. */
        if (settings.cssclass) {
          if ('inherit' == settings.cssclass) {
            form.attr('class', $(self).attr('class'));
          } else {
            form.attr('class', settings.cssclass);
          }
        }

        if (settings.style) {
          if ('inherit' == settings.style) {
            form.attr('style', $(self).attr('style'));
            /* IE needs the second line or display wont be inherited. */
            form.css('display', $(self).css('display'));
          } else {
            form.attr('style', settings.style);
          }
        }

        /* Add main input element to form and store it in input. */
        var input = element.apply(form, [settings, self]);

        /* Set input content via POST, GET, given data or existing value. */
        var input_content;

        if (settings.loadurl) {
          var t = setTimeout(function () {
            input.disabled = true;
            content.apply(form, [settings.loadtext, settings, self]);
          }, 100);

          var loaddata = {};
          loaddata[settings.id] = self.id;
          if ($.isFunction(settings.loaddata)) {
            $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings]));
          } else {
            $.extend(loaddata, settings.loaddata);
          }
          $.ajax({
            type: settings.loadtype,
            url: settings.loadurl,
            data: loaddata,
            async: false,
            success: function (result) {
              window.clearTimeout(t);
              input_content = result;
              input.disabled = false;
            }
          });
        } else if (settings.data) {
          input_content = settings.data;
          if ($.isFunction(settings.data)) {
            input_content = settings.data.apply(self, [self.revert, settings]);
          }
        } else {
          input_content = self.revert;
        }
        content.apply(form, [input_content, settings, self]);

        input.attr('name', settings.name);

        /* Add buttons to the form. */
        buttons.apply(form, [settings, self]);

        /* Add created form to self. */
        $(self).append(form);

        /* Attach 3rd party plugin if requested. */
        plugin.apply(form, [settings, self]);

        /* Focus to first visible form element. */
        $(':input:visible:enabled:first', form).focus();

        /* Highlight input contents when requested. */
        if (settings.select) {
          input.select();
        }

        /* discard changes if pressing esc */
        input.keydown(function (e) {
          if (e.keyCode == 27) { // escape
            e.preventDefault();
            reset.apply(form, [settings, self]);
          }
          else if (((e.keyCode == 9 && settings.submitontab) || (e.keyCode == 13 && settings.submitonenter))
						&& ($(this).val().length == 0)) { // [GSP] User clicked tab or enter; submit form
            form.submit();
          }
        });

        /* Discard, submit or nothing with changes when clicking outside. */
        /* Do nothing is usable when navigating with tab. */
        var t;
        if ('cancel' == settings.onblur) {
          input.blur(function (e) {
            /* Prevent canceling if submit was clicked. */
            t = setTimeout(function () {
              reset.apply(form, [settings, self]);
            }, 100); // [GSP] Reduce from 500 ms to 100 ms
          });
        } else if ('submit' == settings.onblur) {
          input.blur(function (e) {
            /* Prevent double submit if submit was clicked. */
            t = setTimeout(function () {
              form.submit();
            }, 200);
          });
        } else if ($.isFunction(settings.onblur)) {
          input.blur(function (e) {
            settings.onblur.apply(self, [input.val(), settings]);
          });
        } else {
          input.blur(function (e) {
            /* TODO: maybe something here */
          });
        }

        form.submit(function (e) {
          if (t) {
            clearTimeout(t);
          }

          /* Do no submit. */
          e.preventDefault();

          /* Call before submit hook. */
          /* If it returns false abort submitting. */
          if (false !== onsubmit.apply(form, [settings, self])) {
            /* Custom inputs call before submit hook. */
            /* If it returns false abort submitting. */
            if (false !== submit.apply(form, [settings, self])) {

              /* Check if given target is function */
              if ($.isFunction(settings.target)) {
                var str = settings.target.apply(self, [input.val(), settings]);
                $(self).html(str);
                self.editing = false;
                callback.apply(self, [self.innerHTML, settings]);
                /* TODO: this is not dry */
                if (!$.trim($(self).html())) {
                  $(self).html(settings.placeholder);
                }
              } else {
                /* Add edited content and id of edited element to POST. */
                var submitdata = {};
                submitdata[settings.name] = input.val();
                submitdata[settings.id] = self.id;
                /* Add extra data to be POST:ed. */
                if ($.isFunction(settings.submitdata)) {
                  $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                } else {
                  $.extend(submitdata, settings.submitdata);
                }

                /* Quick and dirty PUT support. */
                if ('PUT' == settings.method) {
                  submitdata['_method'] = 'put';
                }

                /* Show the saving indicator. */
                $(self).html(settings.indicator);

                /* Defaults for ajaxoptions. */
                var ajaxoptions = {
                  type: 'POST',
                  data: submitdata,
                  dataType: 'html',
                  url: settings.target,
                  success: function (result, status) {
                    result = oncomplete.apply(self, [result]); // [GSP] Added call to oncomplete event to get updated text
                    if (ajaxoptions.dataType == 'html') {
                      $(self).html(result);
                    }
                    self.editing = false;
                    callback.apply(self, [result, settings]);
                    if (!$.trim($(self).html())) {
                      $(self).html(settings.placeholder);
                    }
                  },
                  error: function (xhr, status, error) {
                    onerror.apply(form, [settings, self, xhr]);
                  }
                };

                /* Override with what is given in settings.ajaxoptions. */
                $.extend(ajaxoptions, settings.ajaxoptions);
                $.ajax(ajaxoptions);

              }
            }
          }

          /* Show tooltip again. */
          $(self).attr('title', settings.tooltip);

          return false;
        });

        oneditend.apply(this, [settings, self]);
      });

      /* Privileged methods */
      this.reset = function (form) {
        /* Prevent calling reset twice when blurring. */
        if (this.editing) {
          /* Before reset hook, if it returns false abort reseting. */
          if (false !== onreset.apply(form, [settings, self])) {
            $(self).html(self.revert);
            self.editing = false;
            if (!$.trim($(self).html())) {
              $(self).html(settings.placeholder);
            }
            /* Show tooltip again. */
            if (settings.tooltip) {
              $(self).attr('title', settings.tooltip);
            }
          }
        }
      };
    });

  };


  $.editable = {
    types: {
      defaults: {
        element: function (settings, original) {
          var input = $('<input type="hidden"></input>');
          $(this).append(input);
          return (input);
        },
        content: function (string, settings, original) {
          string = string.replace(/&amp;/g, '&'); // [GSP]: Replace encoded ampersand with regular one
          $(':input:first', this).val(string);
        },
        reset: function (settings, original) {
          original.reset(this);
        },
        buttons: function (settings, original) {
          var form = this;
          if (settings.submit) {
            /* If given html string use that. */
            if (settings.submit.match(/>$/)) {
              var submit = $(settings.submit).click(function () {
                if (submit.attr("type") != "submit") {
                  form.submit();
                }
              });
              /* Otherwise use button with given string as text. */
            } else {
              var submit = $('<button type="submit" />');
              submit.html(settings.submit);
            }
            $(this).append(submit);
          }
          if (settings.cancel) {
            /* If given html string use that. */
            if (settings.cancel.match(/>$/)) {
              var cancel = $(settings.cancel);
              /* otherwise use button with given string as text */
            } else {
              var cancel = $('<button type="cancel" />');
              cancel.html(settings.cancel);
            }
            $(this).append(cancel);

            $(cancel).click(function (event) {
              if ($.isFunction($.editable.types[settings.type].reset)) {
                var reset = $.editable.types[settings.type].reset;
              } else {
                var reset = $.editable.types['defaults'].reset;
              }
              reset.apply(form, [settings, original]);
              return false;
            });
          }
        }
      },
      text: {
        element: function (settings, original) {
          var input = $('<input />');
          if (settings.width != 'none') { input.css('width', settings.width); } // [GSP] Change attr to css for better standards compliance
          if (settings.height != 'none') { input.css('height', settings.height); } // [GSP] Change attr to css for better standards compliance
          /* https://bugzilla.mozilla.org/show_bug.cgi?id=236791 */
          //input[0].setAttribute('autocomplete','off');
          input.attr('autocomplete', 'off');
          $(this).append(input);
          return (input);
        }
      },
      textarea: {
        element: function (settings, original) {
          var textarea = $('<textarea />');
          if (settings.rows) {
            textarea.attr('rows', settings.rows);
          } else if (settings.height != "none") {
            textarea.height(settings.height);
          }
          if (settings.cols) {
            textarea.attr('cols', settings.cols);
          } else if (settings.width != "none") {
            textarea.width(settings.width);
          }
          $(this).append(textarea);
          return (textarea);
        }
      },
      select: {
        element: function (settings, original) {
          var select = $('<select />');
          $(this).append(select);
          return (select);
        },
        content: function (data, settings, original) {
          /* If it is string assume it is json. */
          if (String == data.constructor) {
            eval('var json = ' + data);
          } else {
            /* Otherwise assume it is a hash already. */
            var json = data;
          }
          for (var key in json) {
            if (!json.hasOwnProperty(key)) {
              continue;
            }
            if ('selected' == key) {
              continue;
            }
            var option = $('<option />').val(key).append(json[key]);
            $('select', this).append(option);
          }
          /* Loop option again to set selected. IE needed this... */
          $('select', this).children().each(function () {
            if ($(this).val() == json['selected'] ||
                            $(this).text() == $.trim(original.revert)) {
              $(this).attr('selected', 'selected');
            }
          });
          /* Submit on change if no submit button defined. */
          if (!settings.submit) {
            var form = this;
            $('select', this).change(function () {
              form.submit();
            });
          }
        }
      }
    },

    /* Add new input type */
    addInputType: function (name, input) {
      $.editable.types[name] = input;
    }
  };

  /* Publicly accessible defaults. */
  $.fn.editable.defaults = {
    name: 'value',
    id: 'id',
    type: 'text',
    width: 'auto',
    widthBuffer: 0,
    height: 'auto',
    event: 'click.editable',
    onblur: 'cancel',
    submitontab: true,
    submitonenter: true,
    loadtype: 'GET',
    loadtext: 'Loading...',
    placeholder: 'Click to edit',
    loaddata: {},
    submitdata: {},
    ajaxoptions: {}
  };

})(jQuery);

//#endregion End Jeditable

//#region cookie

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function raw(s) {
    return s;
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, ' '));
  }

  function converted(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      return config.json ? JSON.parse(s) : s;
    } catch (er) { }
  }

  var config = $.cookie = function (key, value, options) {

    // write
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
      ].join(''));
    }

    // read
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split('; ');
    var result = key ? undefined : {};
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = decode(parts.join('='));

      if (key && key === name) {
        result = converted(cookie);
        break;
      }

      if (!key) {
        result[name] = converted(cookie);
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== undefined) {
      $.cookie(key, '', $.extend(options, { expires: -1 }));
      return true;
    }
    return false;
  };

}));

//#endregion End cookie

//#region equalHeights, equalSize

/**
* equalHeights: Make all elements same height according to tallest one in the collection
* equalSize: Make all elements same width & height according to widest and tallest one in the collection
*/
(function ($) {
  jQuery.fn.equalHeights = function (hBuffer) {
    hBuffer = hBuffer || 0;
    return this.height(hBuffer + Math.max.apply(null,
			this.map(function () {
			  return jQuery(this).height();
			}).get()
		));
  };

  jQuery.fn.equalWidths = function (wBuffer) {
    wBuffer = wBuffer || 0;
    if ($.support.cssFloat || jQuery(".gsp_i_c", this).length == 0) {
      return this.width(wBuffer + Math.max.apply(null,
        this.map(function () {
          return jQuery(this).width();
        }).get()
      ));
    }
    else {
      // Hack for IE7, which makes floated divs that do not have a width assigned 100% wide.
      // We'll grab the width of the child div tag having class 'gsp_i_c' and use that as the
      // basis for our width calculation. (Height calculation remains the same)
      return this.width(wBuffer + 10 + Math.max.apply(null,
        this.map(function () {
          return jQuery(".gsp_i_c", this).width();
        }).get()
      ));
    }
  };

  jQuery.fn.equalSize = function (wBuffer, hBuffer) {
    wBuffer = wBuffer || 0;
    hBuffer = hBuffer || 0;
    if ($.support.cssFloat || jQuery(".gsp_i_c", this).length == 0) {
      return this.width(wBuffer + Math.max.apply(null,
        this.map(function () {
          return jQuery(this).width();
        }).get()
      )).height(hBuffer + Math.max.apply(null,
        this.map(function () {
          return jQuery(this).height();
        }).get()
      ));
    }
    else {
      // Hack for IE7, which makes floated divs that do not have a width assigned 100% wide.
      // We'll grab the width of the child div tag having class 'gsp_i_c' and use that as the
      // basis for our width calculation. (Height calculation remains the same)
      return this.height(hBuffer + Math.max.apply(null,
        this.map(function () {
          return jQuery(this).height();
        }).get()
      )).width(wBuffer + 10 + Math.max.apply(null,
        this.map(function () {
          return jQuery(".gsp_i_c", this).width();
        }).get()
      ));
    }
  };
})(jQuery);

//#endregion

//#region Paging

/**
 * @license jQuery paging plugin v1.0.1 09/04/2011
 * http://www.xarg.org/2011/09/jquery-pagination-revised/
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

(function ($, window, undefined) {

  $["fn"]["paging"] = function (number, opts) {
    var self = this,
		  Paging = {

		    "setOptions": function (opts) {

		      function parseFormat(format) {

		        var gndx = 0, group = 0, num = 1, res = {
		          fstack: [], // format stack
		          asterisk: 0, // asterisk?
		          inactive: 0, // fill empty pages with inactives up to w?
		          blockwide: 5, // width of number block
		          current: 3, // position of current element in number block
		          rights: 0, // num of rights
		          lefts: 0 // num of lefts
		        }, tok, pattern = /[*<>pq\[\]().-]|[nc]+!?/g;

		        var known = {
		          "[": "first",
		          "]": "last",
		          "<": "prev",
		          ">": "next",
		          "q": "left",
		          "p": "right",
		          "-": "fill",
		          ".": "leap"
		        }, count = {};

		        while ((tok = pattern["exec"](format))) {

		          tok = ("" + tok);

		          if (undefined === known[tok]) {

		            if ("(" === tok) {
		              group = ++gndx;
		            } else if (")" === tok) {
		              group = 0;
		            } else if (num) {

		              if ("*" === tok) {
		                res.asterisk = 1;
		                res.inactive = 0;
		              } else {
		                // number block is the only thing left here
		                res.asterisk = 0;
		                res.inactive = "!" === tok.charAt(tok.length - 1);
		                res.blockwide = tok["length"] - res.inactive;
		                if (!(res.current = 1 + tok.indexOf("c"))) {
		                  res.current = (1 + res.blockwide) >> 1;
		                }
		              }

		              res.fstack[res.fstack.length] = ({
		                ftype: "block",	// type
		                group: 0,		// group
		                pos: 0			// pos
		              });
		              num = 0;
		            }

		          } else {

		            res.fstack[res.fstack.length] = ({
		              ftype: known[tok], // type
		              group: group,      // group
		              pos: undefined === count[tok] ? count[tok] = 1 : ++count[tok] // pos
		            });

		            if ("q" === tok)
		              ++res.lefts;
		            else if ("p" === tok)
		              ++res.rights;
		          }
		        }
		        return res;
		      }

		      this.opts = $.extend(this.opts || {
		        "lapping": 0,	// number of elements overlap
		        "perpage": 10,	// number of elements per page
		        "page": 1,	// current page
		        "refresh": {
		          "interval": 10,
		          "url": null
		        },	// refresh callback information

		        "format": "",	// visual format string

		        "onFormat": function (type) {	// callback for every format element

		          /** EXAMPLE **

						switch (type) {

							case 'block':

								if (!this.active)
									return '<span class="disabled">' + this.value + '</span>';
								else if (this.value != this.page)
									return '<em><a href="#' + this.value + '">' + this.value + '</a></em>';
								return '<span class="current">' + this.value + '</span>';

							case 'right':
							case 'left':

								if (!this.active) {
									return "";
								}
								return '<a href="#' + this.value + '">' + this.value + '</a>';

							case 'next':

								if (this.active) {
									return '<a href="#' + this.value + '" class="next">Next &raquo;</a>';
								}
								return '<span class="disabled">Next &raquo;</span>';

							case 'prev':

								if (this.active) {
									return '<a href="#' + this.value + '" class="prev">&laquo; Previous</a>';
								}
								return '<span class="disabled">&laquo; Previous</span>';

							case 'first':

								if (this.active) {
									return '<a href="#' + this.value + '" class="first">|&lt;</a>';
								}
								return '<span class="disabled">|&lt;</span>';

							case 'last':

								if (this.active) {
									return '<a href="#' + this.value + '" class="prev">&gt;|</a>';
								}
								return '<span class="disabled">&gt;|</span>';

							case 'fill':
								if (this.active) {
									return "...";
								}
						}
						return ""; // return nothing for missing branches

						**/
		        },
		        "onSelect": function (page) {	// callback for page selection

		          /** EXAMPLE SLICE **

						var data = this.slice;

						content.slice(prev[0], prev[1]).css('display', 'none');
						content.slice(data[0], data[1]).css('display', 'block');

						prev = data;

						**/


		          /** EXAMPLE AJAX **

						$.ajax({
							"url": '/data.php?start=' + this.slice[0] + '&end=' + this.slice[1] + '&page=' + page,
							"success": function(data) {
								// content replace
							}
						});

					   **/

		          // Return code indicates if the link of the clicked format element should be followed (otherwise only the click-event is used)
		          return true;
		        },
		        "onRefresh": function (json) {// callback for new data of refresh api

		          /** EXAMPLE **
						if (json.number) {
							Paging.setNumber(json.number);
						}

						if (json.options) {
							Paging.setOptions(json.options);
						}

						Paging.setPage(); // Call with empty params to reload the paginator
						**/
		        }
		      }, opts || {});

		      // If the number of elements per page is less then 1, set it to default
		      if (this.opts["perpage"] < 1) {
		        this.opts["perpage"] = 10;
		      }

		      if (this.interval) window.clearInterval(this.interval);

		      if (this.opts["refresh"]["url"]) {

		        this.interval = window.setInterval(function (o, $) {

		          $["ajax"]({
		            "url": o.opts["refresh"]["url"],
		            "success": function (data) {
		              if (typeof (data) == "object") {
		                var tmp = data;
		              } else {
		                try {
		                  var tmp = $["parseJSON"](data);
		                } catch (o) {
		                  return;
		                }
		              }
		              o.opts["onRefresh"](tmp);
		            }
		          });

		        }, 1000 * this.opts["refresh"]["interval"], this, $);
		      }

		      this.format = parseFormat(this.opts["format"]);
		      return this;
		    },

		    "setNumber": function (number) {
		      this.number = (undefined === number || number < 0) ? -1 : number;
		      return this;
		    },

		    "setPage": function (page) {

		      if (undefined === page) {

		        if (page = this.opts["page"], null === page) {
		          return this;
		        }

		      } else if (this.opts["page"] == page) {
		        return this;
		      }

		      this.opts["page"] = (page |= 0);
		      var number = this.number;
		      var opts = this.opts;

		      var rStart, rStop;

		      var pages, buffer;

		      var groups = 1, format = this.format;

		      var data, tmp, node, lapping;

		      var count = format.fstack["length"], i = count;


		      // If the lapping is greater than perpage, reduce it to perpage - 1 to avoid endless loops
		      if (opts["perpage"] <= opts["lapping"]) {
		        opts["lapping"] = opts["perpage"] - 1;
		      }

		      lapping = number <= opts["lapping"] ? 0 : opts["lapping"] | 0;


		      // If the number is negative, the value doesn"t matter, we loop endlessly with a constant width
		      if (number < 0) {

		        number = -1;
		        pages = -1;

		        rStart = Math.max(1, page - format.current + 1 - lapping);
		        rStop = rStart + format.blockwide;

		      } else {

		        // Calculate the number of pages
		        pages = 1 + Math.ceil((number - opts["perpage"]) / (opts["perpage"] - lapping));

		        // If current page is negative, start at the end and
		        // Set the current page into a valid range, includes 0, which is set to 1
		        page = Math.max(1, Math.min(page < 0 ? 1 + pages + page : page, pages));

		        // Do we need to print all numbers?
		        if (format.asterisk) {
		          rStart = 1;
		          rStop = 1 + pages;

		          // Disable :first and :last for asterisk mode as we see all buttons
		          format.current = page;
		          format.blockwide = pages;

		        } else {

		          // If no, start at the best position and stop at max width or at num of pages
		          rStart = Math.max(1, Math.min(page - format.current, pages - format.blockwide) + 1);
		          rStop = format.inactive ? rStart + format.blockwide : Math.min(rStart + format.blockwide, 1 + pages);
		        }
		      }

		      while (i--) {

		        tmp = 0; // default everything is visible
		        node = format.fstack[i];

		        switch (node.ftype) {

		          case "left":
		            tmp = (node.pos < rStart);
		            break;
		          case "right":
		            tmp = (rStop <= pages - format.rights + node.pos);
		            break;

		          case "first":
		            tmp = (format.current < page);
		            break;
		          case "last":
		            tmp = (format.blockwide < format.current + pages - page);
		            break;

		          case "prev":
		            tmp = (1 < page);
		            break;
		          case "next":
		            tmp = (page < pages);
		            break;
		        }
		        groups |= tmp << node.group; // group visible?
		      }

		      data = {
		        "number": number,	// number of elements
		        "lapping": lapping,	// overlapping
		        "pages": pages,	// number of pages
		        "perpage": opts["perpage"], // number of elements per page
		        "page": page,		// current page
		        "slice": [			// two element array with bounds of the current page selection
						(tmp = page * (opts["perpage"] - lapping) + lapping) - opts["perpage"], // Lower bound
						Math.min(tmp, number) // Upper bound
		        ]
		      };

		      buffer = $(document.createElement('div'));

		      while (++i < count) {

		        node = format.fstack[i];

		        tmp = (groups >> node.group & 1);

		        switch (node.ftype) {
		          case "block":
		            for (; rStart < rStop; ++rStart) {

		              data["value"] = rStart;
		              data["pos"] = 1 + format.blockwide - rStop + rStart;

		              data["active"] = rStart <= pages || number < 0;    // true if infinity series and rStart <= pages
		              data["first"] = 1 === rStart;                      // check if it is the first page
		              data["last"] = rStart == pages && 0 < number;     // false if infinity series or rStart != pages

		              tmp = document.createElement("div");
		              tmp["innerHTML"] = opts["onFormat"].call(data, node.ftype); // we could use $() but this doesn't allow plain text

		              $("a", tmp = $(tmp))
								.data("page", data["value"])
								.click(linkClick);

		              buffer.append(tmp["contents"]());
		            }
		            continue;

		          case "left":
		            data["value"] = /* void */
							data["pos"] = node.pos;
		            data["active"] = node.pos < rStart; // Don't take group-visibility into account!
		            break;

		          case "right":
		            data["value"] = pages - format.rights + node.pos;
		            data["pos"] = node.pos;
		            data["active"] = rStop <= data["value"]; // Don't take group-visibility into account!
		            break;

		          case "first":
		            data["value"] = 1;
		            data["pos"] = node.pos;
		            data["active"] = tmp && format.current < page; // Show only if the first page can not be accessed via the block
		            break;

		          case "last":
		            data["value"] = pages;
		            data["pos"] = node.pos;
		            data["active"] = tmp && format.blockwide < format.current + pages - page; // Show only if the first page can not be accessed via the block
		            break;

		          case "prev":
		            data["value"] = Math.max(1, page - 1);
		            data["pos"] = node.pos;
		            data["active"] = tmp && 1 < page;
		            break;

		          case "next":
		            data["pos"] = node.pos;

		            if ((data["active"] = (number < 0))) {
		              data["value"] = 1 + page;
		            } else {
		              data["value"] = Math.min(1 + page, pages)
		              data["active"] = tmp && page < pages;
		            }
		            break;

		          case "leap":
		          case "fill":
		            data["pos"] = node.pos;
		            data["active"] = tmp; // tmp is true by default and changes only for group behaviour
		            buffer.append(opts["onFormat"].call(data, node.ftype));
		            continue;
		        }

		        data["last"] = /* void */
					data["first"] = undefined;

		        tmp = document.createElement("div");
		        tmp["innerHTML"] = opts["onFormat"].call(data, node.ftype); // we could use $() but this doesn't allow plain text

		        $("a", tmp = $(tmp))
					.data("page", data["value"])
					.click(linkClick);

		        buffer.append(tmp["contents"]());
		      }

		      //self["empty"]();
		      self["html"](buffer["contents"]());

		      this.locate = opts["onSelect"].call({
		        "number": number,
		        "lapping": lapping,
		        "pages": pages,
		        "slice": data["slice"]
		      }, page);
		      return this;
		    }
		  };

    function linkClick(ev) {
      ev["preventDefault"]();

      var obj = ev["target"];

      do {

        if ('a' === obj["nodeName"].toLowerCase()) {
          break;
        }

      } while ((obj = obj["parentNode"]));

      Paging["setPage"]($.data(obj, "page"));

      if (Paging.locate) {
        window.location = obj["href"];
      }
    }

    return Paging
			["setNumber"](number)
			["setOptions"](opts)
			["setPage"]();
  }

}(jQuery, this));

//#endregion End Paging

//#region Splitter

/*
 * jQuery.splitter.js - two-pane splitter window plugin
 *
 * version 1.6 (2010/01/03)
 * version 1.61 (2012/05/09) -- Fixes by Roger Martin
 *  * Added check in window resize event handler to run only when the target is the window. This fixes a breaking
 *    change introduced in jQuery 1.6.
 *  * Added support for IE 9+
 * version 1.62 (2012/05/16) -- Fixes by Roger Martin
 *  * Included bottom padding of body and html elements when calculating height. This elimates vertical scroll bar and thus a need for overflow:none on the body element
 * version 1.63 (2012/08/12) -- Fixes by Roger Martin
 *  * Changed curCSS to css (curCSS was removed in jQuery 1.8)
 * version 1.64 (2013/01/08) -- Fixes by Roger Martin
 *  * sizeLeft and sizeRight was being ignored when cookie option was used
 * version 1.65 (2013/01/09) -- Fixes by Roger Martin
 *  * Fixed issue where scrollbars were still appearing in IE.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/**
 * The splitter() plugin implements a two-pane resizable splitter window.
 * The selected elements in the jQuery object are converted to a splitter;
 * each selected element should have two child elements, used for the panes
 * of the splitter. The plugin adds a third child element for the splitbar.
 *
 * For more details see: http://www.methvin.com/splitter/
 *
 *
 * @example $('#MySplitter').splitter();
 * @desc Create a vertical splitter with default settings
 *
 * @example $('#MySplitter').splitter({type: 'h', accessKey: 'M'});
 * @desc Create a horizontal splitter resizable via Alt+Shift+M
 *
 * @name splitter
 * @type jQuery
 * @param Object options Options for the splitter (not required)
 * @cat Plugins/Splitter
 * @return jQuery
 * @author Dave Methvin (dave.methvin@gmail.com)
 */
; (function ($) {

  var splitterCounter = 0;

  $.fn.splitter = function (args) {
    args = args || {};
    return this.each(function () {
      if ($(this).is(".splitter"))	// already a splitter
        return;
      var zombie;		// left-behind splitbar for outline resizes
      function setBarState(state) {
        bar.removeClass(opts.barStateClasses).addClass(state);
      }
      function startSplitMouse(evt) {
        if (evt.which != 1)
          return;		// left button only
        bar.removeClass(opts.barHoverClass);
        if (opts.outline) {
          zombie = zombie || bar.clone(false).insertAfter(A);
          bar.removeClass(opts.barDockedClass);
        }
        setBarState(opts.barActiveClass)
        // Safari selects A/B text on a move; iframes capture mouse events so hide them
        panes.css("-webkit-user-select", "none").find("iframe").addClass(opts.iframeClass);
        A._posSplit = A[0][opts.pxSplit] - evt[opts.eventPos];
        $(document)
			 .bind("mousemove" + opts.eventNamespace, doSplitMouse)
			 .bind("mouseup" + opts.eventNamespace, endSplitMouse);
      }
      function doSplitMouse(evt) {
        var pos = A._posSplit + evt[opts.eventPos],
			 range = Math.max(0, Math.min(pos, splitter._DA - bar._DA)),
			 limit = Math.max(A._min, splitter._DA - B._max,
					 Math.min(pos, A._max, splitter._DA - bar._DA - B._min));
        if (opts.outline) {
          // Let docking splitbar be dragged to the dock position, even if min width applies
          if ((opts.dockPane == A && pos < Math.max(A._min, bar._DA)) ||
					(opts.dockPane == B && pos > Math.min(pos, A._max, splitter._DA - bar._DA - B._min))) {
            bar.addClass(opts.barDockedClass).css(opts.origin, range);
          }
          else {
            bar.removeClass(opts.barDockedClass).css(opts.origin, limit);
          }
          bar._DA = bar[0][opts.pxSplit];
        } else
          resplit(pos);
        setBarState(pos == limit ? opts.barActiveClass : opts.barLimitClass);
      }
      function endSplitMouse(evt) {
        setBarState(opts.barNormalClass);
        bar.addClass(opts.barHoverClass);
        var pos = A._posSplit + evt[opts.eventPos];
        if (opts.outline) {
          zombie.remove(); zombie = null;
          resplit(pos);
        }
        panes.css("-webkit-user-select", "text").find("iframe").removeClass(opts.iframeClass);
        $(document)
			 .unbind("mousemove" + opts.eventNamespace + " mouseup" + opts.eventNamespace);
      }
      function resplit(pos) {
        bar._DA = bar[0][opts.pxSplit];		// bar size may change during dock
        // Constrain new splitbar position to fit pane size and docking limits
        if ((opts.dockPane == A && pos < Math.max(A._min, bar._DA)) ||
				(opts.dockPane == B && pos > Math.min(pos, A._max, splitter._DA - bar._DA - B._min))) {
          bar.addClass(opts.barDockedClass);
          bar._DA = bar[0][opts.pxSplit];
          pos = opts.dockPane == A ? 0 : splitter._DA - bar._DA;
          if (bar._pos == null)
            bar._pos = A[0][opts.pxSplit];
        }
        else {
          bar.removeClass(opts.barDockedClass);
          bar._DA = bar[0][opts.pxSplit];
          bar._pos = null;
          pos = Math.max(A._min, splitter._DA - B._max,
					 Math.min(pos, A._max, splitter._DA - bar._DA - B._min));
        }
        // Resize/position the two panes
        bar.css(opts.origin, pos).css(opts.fixed, splitter._DF);
        A.css(opts.origin, 0).css(opts.split, pos).css(opts.fixed, splitter._DF);
        B.css(opts.origin, pos + bar._DA)
			 .css(opts.split, splitter._DA - bar._DA - pos).css(opts.fixed, splitter._DF);
        // IE fires resize for us; all others pay cash
        if (!browser_resize_auto_fired()) {
          for (i = 0; i <= splitterCounter; i++) {
            panes.trigger("resize" + eventNamespaceBase + i);
          }
        }
      }
      function dimSum(jq, dims) {
        // Opera returns -1 for missing min/max width, turn into 0
        var sum = 0;
        for (var i = 1; i < arguments.length; i++)
          sum += Math.max(parseInt(jq.css(arguments[i]), 10) || 0, 0);
        return sum;
      }
      function browser_resize_auto_fired() {
        // Returns true when the browser natively fires the resize event attached to the panes elements
        return ($.browser.msie && (parseInt($.browser.version) < 9));
      }

      // Determine settings based on incoming opts, element classes, and defaults
      var vh = (args.splitHorizontal ? 'h' : args.splitVertical ? 'v' : args.type) || 'v';
      var eventNamespaceBase = ".splitter";
      var opts = $.extend({
        // Defaults here allow easy use with ThemeRoller
        splitterClass: "splitter gsp-ui-widget gsp-ui-widget-content",
        paneClass: "splitter-pane",
        barClass: "splitter-bar",
        barNormalClass: "gsp-ui-state-default",			// splitbar normal
        barHoverClass: "gsp-ui-state-hover",			// splitbar mouse hover
        barActiveClass: "gsp-ui-state-highlight",		// splitbar being moved
        barLimitClass: "gsp-ui-state-error",			// splitbar at limit
        iframeClass: "splitter-iframe-hide",		// hide iframes during split
        eventNamespace: eventNamespaceBase + (++splitterCounter),
        pxPerKey: 8,			// splitter px moved per keypress
        tabIndex: 0,			// tab order indicator
        accessKey: ''			// accessKey for splitbar
      }, {
        // user can override
        v: {					// Vertical splitters:
          keyLeft: 39, keyRight: 37, cursor: "e-resize",
          barStateClass: "splitter-bar-vertical",
          barDockedClass: "splitter-bar-vertical-docked"
        },
        h: {					// Horizontal splitters:
          keyTop: 40, keyBottom: 38, cursor: "n-resize",
          barStateClass: "splitter-bar-horizontal",
          barDockedClass: "splitter-bar-horizontal-docked"
        }
      }[vh], args, {
        // user cannot override
        v: {					// Vertical splitters:
          type: 'v', eventPos: "pageX", origin: "left",
          split: "width", pxSplit: "offsetWidth", side1: "Left", side2: "Right",
          fixed: "height", pxFixed: "offsetHeight", side3: "Top", side4: "Bottom"
        },
        h: {					// Horizontal splitters:
          type: 'h', eventPos: "pageY", origin: "top",
          split: "height", pxSplit: "offsetHeight", side1: "Top", side2: "Bottom",
          fixed: "width", pxFixed: "offsetWidth", side3: "Left", side4: "Right"
        }
      }[vh]);
      opts.barStateClasses = [opts.barNormalClass, opts.barHoverClass, opts.barActiveClass, opts.barLimitClass].join(' ');

      // Create jQuery object closures for splitter and both panes
      var splitter = $(this).css({ position: "relative" }).addClass(opts.splitterClass);
      var panes = $(">*", splitter[0]).addClass(opts.paneClass).css({
        position: "absolute", 			// positioned inside splitter container
        "z-index": "1",					// splitbar is positioned above
        "-moz-outline-style": "none"	// don't show dotted outline
      });
      var A = $(panes[0]), B = $(panes[1]);	// A = left/top, B = right/bottom
      opts.dockPane = opts.dock && (/right|bottom/.test(opts.dock) ? B : A);

      // Focuser element, provides keyboard support; title is shown by Opera accessKeys
      var focuser = $('<a href="javascript:void(0)"></a>')
		 .attr({ accessKey: opts.accessKey, tabIndex: opts.tabIndex, title: opts.splitbarClass })
		 .bind(($.browser.opera ? "click" : "focus") + opts.eventNamespace,
			 function () { this.focus(); bar.addClass(opts.barActiveClass) })
		 .bind("keydown" + opts.eventNamespace, function (e) {
		   var key = e.which || e.keyCode;
		   var dir = key == opts["key" + opts.side1] ? 1 : key == opts["key" + opts.side2] ? -1 : 0;
		   if (dir)
		     resplit(A[0][opts.pxSplit] + dir * opts.pxPerKey, false);
		 })
		 .bind("blur" + opts.eventNamespace,
			 function () { bar.removeClass(opts.barActiveClass) });

      // Splitbar element
      var bar = $('<div></div>')
		 .insertAfter(A).addClass(opts.barClass).addClass(opts.barStateClass)
		 .append(focuser).attr({ unselectable: "on" })
		 .css({
		   position: "absolute", "user-select": "none", "-webkit-user-select": "none",
		   "-khtml-user-select": "none", "-moz-user-select": "none", "z-index": "100"
		 })
		 .bind("mousedown" + opts.eventNamespace, startSplitMouse)
		 .bind("mouseover" + opts.eventNamespace, function () {
		   $(this).addClass(opts.barHoverClass);
		 })
		 .bind("mouseout" + opts.eventNamespace, function () {
		   $(this).removeClass(opts.barHoverClass);
		 });
      // Use our cursor unless the style specifies a non-default cursor
      if (/^(auto|default|)$/.test(bar.css("cursor")))
        bar.css("cursor", opts.cursor);

      // Cache several dimensions for speed, rather than re-querying constantly
      // These are saved on the A/B/bar/splitter jQuery vars, which are themselves cached
      // DA=dimension adjustable direction, PBF=padding/border fixed, PBA=padding/border adjustable
      bar._DA = bar[0][opts.pxSplit];
      splitter._PBF = dimSum(splitter, "border" + opts.side3 + "Width", "border" + opts.side4 + "Width");
      splitter._PBA = dimSum(splitter, "border" + opts.side1 + "Width", "border" + opts.side2 + "Width");
      A._pane = opts.side1;
      B._pane = opts.side2;
      $.each([A, B], function () {
        this._splitter_style = this.style;
        this._min = opts["min" + this._pane] || dimSum(this, "min-" + opts.split);
        this._max = opts["max" + this._pane] || dimSum(this, "max-" + opts.split) || 9999;
        this._init = opts["size" + this._pane] === true ?
			 parseInt($.css(this[0], opts.split), 10) : opts["size" + this._pane]; //[RDM] Changed curCSS to css (curCSS was removed in jQuery 1.8)
      });

      // Determine initial position, get from cookie if specified
      var initPos = A._init;
      if (!isNaN(B._init))	// recalc initial B size as an offset from the top or left side
        initPos = splitter[0][opts.pxSplit] - splitter._PBA - B._init - bar._DA;
      if (opts.cookie) {
        if (!$.cookie)
          alert('jQuery.splitter(): jQuery cookie plugin required');
        var cookieVal = parseInt($.cookie(opts.cookie), 10);
        if (!isNaN(cookieVal))
          initPos = cookieVal; //[RDM] Overwrite initPos only when we found a cookie (instead of always)
        $(window).bind("unload" + opts.eventNamespace, function () {
          var state = String(bar.css(opts.origin));	// current location of splitbar
          $.cookie(opts.cookie, state, {
            expires: opts.cookieExpires || 365,
            path: opts.cookiePath || document.location.pathname
          });
        });
      }
      if (isNaN(initPos))	// King Solomon's algorithm
        initPos = Math.round((splitter[0][opts.pxSplit] - splitter._PBA - bar._DA) / 2);

      // Resize event propagation and splitter sizing
      if (opts.anchorToWindow)
        opts.resizeTo = window;
      if (opts.resizeTo) {
        splitter._hadjust = dimSum(splitter, "borderTopWidth", "borderBottomWidth", "marginBottom", "paddingBottom");
        splitter._hadjust += dimSum($('body'), 'paddingBottom'); // Added by Roger
        splitter._hadjust += dimSum($('html'), 'paddingBottom'); // Added by Roger
        splitter._hadjust += 1; // [RDM] Need a fudge factor of one extra pixel to prevent scrollbars in IE & Chrome
        splitter._hmin = Math.max(dimSum(splitter, "minHeight"), 20);
        $(window).bind("resize" + opts.eventNamespace, function (e) {
          if (e.target == window) {
            var top = splitter.offset().top;
            var eh = $(opts.resizeTo).height();
            splitter.css("height", Math.max(eh - top - splitter._hadjust - 0, splitter._hmin) + "px");
            if (!browser_resize_auto_fired()) splitter.trigger("resize" + opts.eventNamespace);
          }
        }).trigger("resize" + opts.eventNamespace);
      }
      else if (opts.resizeToWidth && !browser_resize_auto_fired()) {
        $(window).bind("resize" + opts.eventNamespace, function (e) {
          if (e.target == window) {
            splitter.trigger("resize" + opts.eventNamespace);
          }
        });
      }

      // Docking support
      if (opts.dock) {
        splitter
			 .bind("toggleDock" + opts.eventNamespace, function () {
			   var pw = opts.dockPane[0][opts.pxSplit];
			   splitter.trigger(pw ? "dock" + opts.eventNamespace : "undock" + opts.eventNamespace);
			 })
			 .bind("dock" + opts.eventNamespace, function () {
			   var pw = A[0][opts.pxSplit];
			   if (!pw) return;
			   bar._pos = pw;
			   var x = {};
			   x[opts.origin] = opts.dockPane == A ? 0 :
           splitter[0][opts.pxSplit] - splitter._PBA - bar[0][opts.pxSplit];
			   bar.animate(x, opts.dockSpeed || 1, opts.dockEasing, function () {
			     bar.addClass(opts.barDockedClass);
			     resplit(x[opts.origin]);
			   });
			 })
			 .bind("undock" + opts.eventNamespace, function () {
			   var pw = opts.dockPane[0][opts.pxSplit];
			   if (pw) return;
			   var x = {}; x[opts.origin] = bar._pos + "px";
			   bar.removeClass(opts.barDockedClass)
           .animate(x, opts.undockSpeed || opts.dockSpeed || 1, opts.undockEasing || opts.dockEasing, function () {
             resplit(bar._pos);
             bar._pos = null;
           });
			 });
        if (opts.dockKey)
          $('<a title="' + opts.splitbarClass + ' toggle dock" href="javascript:void(0)"></a>')
				 .attr({ accessKey: opts.dockKey, tabIndex: -1 }).appendTo(bar)
				 .bind($.browser.opera ? "click" : "focus", function () {
				   splitter.trigger("toggleDock" + opts.eventNamespace); this.blur();
				 });
        bar.bind("dblclick", function () { splitter.trigger("toggleDock" + opts.eventNamespace); });
      }


      // Resize event handler; triggered immediately to set initial position
      splitter
		 .bind("destroy" + opts.eventNamespace, function () {
		   $([window, document]).unbind(opts.eventNamespace);
		   bar.unbind().remove();
		   panes.removeClass(opts.paneClass);
		   splitter
         .removeClass(opts.splitterClass)
         .add(panes)
           .unbind(opts.eventNamespace)
           .attr("style", function (el) {
             return this._splitter_style || "";	//TODO: save style
           });
		   splitter = bar = focuser = panes = A = B = opts = args = null;
		 })
		 .bind("resize" + opts.eventNamespace, function (e, size) {
		   // Custom events bubble in jQuery 1.3; avoid recursion
		   if (e.target != this) return;
		   // Determine new width/height of splitter container
		   splitter._DF = splitter[0][opts.pxFixed] - splitter._PBF;
		   splitter._DA = splitter[0][opts.pxSplit] - splitter._PBA;
		   // Bail if splitter isn't visible or content isn't there yet
		   if (splitter._DF <= 0 || splitter._DA <= 0) return;
		   // Re-divvy the adjustable dimension; maintain size of the preferred pane
		   resplit(!isNaN(size) ? size : (!(opts.sizeRight || opts.sizeBottom) ? A[0][opts.pxSplit] :
         splitter._DA - B[0][opts.pxSplit] - bar._DA));
		   setBarState(opts.barNormalClass);
		 })
		 .trigger("resize" + opts.eventNamespace, [initPos]);
    });
  };

})(jQuery);

//#endregion End Splitter

//#region autoSuggest

/*
* AutoSuggest
* Copyright 2009-2010 Drew Wilson
* www.drewwilson.com
* http://code.drewwilson.com/entry/autosuggest-jquery-plugin
*
* Version 1.4   -   Updated: Mar. 23, 2010
*
* This Plug-In will auto-complete or auto-suggest completed search queries
* for you as you type. You can add multiple selections and remove them on
* the fly. It supports keybord navigation (UP + DOWN + RETURN), as well
* as multiple AutoSuggest fields on the same page.
*
* Inspied by the Autocomplete plugin by: Jšrn Zaefferer
* and the Facelist plugin by: Ian Tearle (iantearle.com)
*
* This AutoSuggest jQuery plug-in is dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function ($) {
  $.fn.autoSuggest = function (data, options) {
    var defaults = {
      asHtmlID: false,
      startText: "Enter Name Here",
      emptyText: "No Results Found",
      preFill: {},
      limitText: "No More Selections Are Allowed",
      selectedItemProp: "value", //name of object property
      selectedValuesProp: "value", //name of object property
      searchObjProps: "value", //comma separated list of object property names
      queryParam: "q",
      retrieveLimit: false, //number for 'limit' param on ajax request
      extraParams: "",
      matchCase: false,
      minChars: 1,
      keyDelay: 400,
      resultsHighlight: true,
      neverSubmit: false,
      selectionLimit: false,
      showResultList: true,
      start: function () { },
      selectionClick: function (elem) { },
      selectionAdded: function (elem) { },
      selectionRemoved: function (elem) { elem.remove(); },
      formatList: false, //callback function
      beforeRetrieve: function (string) { return string; },
      retrieveComplete: function (data) { return data; },
      resultClick: function (data) { },
      resultsComplete: function () { }
    };
    var opts = $.extend(defaults, options);

    var d_type = "object";
    var d_count = 0;
    if (typeof data == "string") {
      d_type = "string";
      var req_string = data;
    } else {
      var org_data = data;
      for (k in data) if (data.hasOwnProperty(k)) d_count++;
    }
    if ((d_type == "object" && d_count > 0) || d_type == "string") {
      return this.each(function (x) {
        if (!opts.asHtmlID) {
          x = x + "" + Math.floor(Math.random() * 100); //this ensures there will be unique IDs on the page if autoSuggest() is called multiple times
          var x_id = "as-input-" + x;
        } else {
          x = opts.asHtmlID;
          var x_id = x;
        }
        opts.start.call(this);
        var input = $(this);
        input.attr("autocomplete", "off").addClass("as-input").attr("id", x_id).val(opts.startText);
        var input_focus = false;

        // Setup basic elements and render them to the DOM
        input.wrap('<ul class="as-selections" id="as-selections-' + x + '"></ul>').wrap('<li class="as-original" id="as-original-' + x + '"></li>');
        var selections_holder = $("#as-selections-" + x);
        var org_li = $("#as-original-" + x);
        var results_holder = $('<div class="as-results" id="as-results-' + x + '"></div>').hide();
        var results_ul = $('<ul class="as-list"></ul>');
        var values_input = $('<input type="hidden" class="as-values" name="as_values_' + x + '" id="as-values-' + x + '" />');
        var prefill_value = "";
        if (typeof opts.preFill == "string") {
          var vals = opts.preFill.split(",");
          for (var i = 0; i < vals.length; i++) {
            var v_data = {};
            v_data[opts.selectedValuesProp] = vals[i];
            if (vals[i] != "") {
              add_selected_item(v_data, "000" + i);
            }
          }
          prefill_value = opts.preFill;
        } else {
          prefill_value = "";
          var prefill_count = 0;
          for (k in opts.preFill) if (opts.preFill.hasOwnProperty(k)) prefill_count++;
          if (prefill_count > 0) {
            for (var i = 0; i < prefill_count; i++) {
              var new_v = opts.preFill[i][opts.selectedValuesProp];
              if (new_v == undefined) { new_v = ""; }
              prefill_value = prefill_value + new_v + ",";
              if (new_v != "") {
                add_selected_item(opts.preFill[i], "000" + i);
              }
            }
          }
        }
        if (prefill_value != "") {
          input.val("");
          var lastChar = prefill_value.substring(prefill_value.length - 1);
          if (lastChar != ",") { prefill_value = prefill_value + ","; }
          values_input.val("," + prefill_value);
          $("li.as-selection-item", selections_holder).addClass("blur").removeClass("selected");
        }
        input.after(values_input);
        selections_holder.click(function () {
          input_focus = true;
          input.focus();
        }).mousedown(function () { input_focus = false; }).after(results_holder);

        var timeout = null;
        var prev = "";
        var totalSelections = 0;
        var tab_press = false;

        // Handle input field events
        input.focus(function () {
          if ($(this).val() == opts.startText && values_input.val() == "") {
            $(this).val("");
          } else if (input_focus) {
            $("li.as-selection-item", selections_holder).removeClass("blur");
            if ($(this).val() != "") {
              results_ul.css("width", selections_holder.outerWidth());
              results_holder.show();
            }
          }
          input_focus = true;
          return true;
        }).blur(function () {
          if ($(this).val() == "" && values_input.val() == "" && prefill_value == "") {
            $(this).val(opts.startText);
          } else if (input_focus) {
            $("li.as-selection-item", selections_holder).addClass("blur").removeClass("selected");
            results_holder.hide();
          }
        }).keydown(function (e) {
          // track last key pressed
          lastKeyPressCode = e.keyCode;
          first_focus = false;
          switch (e.keyCode) {
            case 38: // up
              e.preventDefault();
              moveSelection("up");
              break;
            case 40: // down
              e.preventDefault();
              moveSelection("down");
              break;
            case 8:  // delete
              if (input.val() == "") {
                var last = values_input.val().split(",");
                last = last[last.length - 2];
                selections_holder.children().not(org_li.prev()).removeClass("selected");
                if (org_li.prev().hasClass("selected")) {
                  values_input.val(values_input.val().replace("," + last + ",", ","));
                  opts.selectionRemoved.call(this, org_li.prev());
                } else {
                  opts.selectionClick.call(this, org_li.prev());
                  org_li.prev().addClass("selected");
                }
              }
              if (input.val().length == 1) {
                results_holder.hide();
                prev = "";
              }
              if ($(":visible", results_holder).length > 0) {
                if (timeout) { clearTimeout(timeout); }
                timeout = setTimeout(function () { keyChange(); }, opts.keyDelay);
              }
              break;
            case 9: case 188: case 13:  // tab or comma or enter [GSP] Added case 13 because we want enter behavior same as tab & comma
              var active = $("li.active:first", results_holder);
              if (active.length > 0) {
                // An item in the drop down is selected. Use that.
                tab_press = false;
                active.click().removeClass("active"); //[GSP] Added removeClass("active") so that subsequent 'enter' presses can submit data when used in Jeditable
                results_holder.hide();
                if (opts.neverSubmit || active.length > 0) {
                  e.preventDefault();
                }
              } else {
                // If text has been entered, use that.
                tab_press = true;
                var i_input = input.val().replace(/(,)/g, "");
                if (i_input != "" && values_input.val().search("," + i_input + ",") < 0 && i_input.length >= opts.minChars) {
                  e.preventDefault();
                  var n_data = {};
                  n_data[opts.selectedItemProp] = i_input;
                  n_data[opts.selectedValuesProp] = i_input;
                  var lis = $("li", selections_holder).length;
                  add_selected_item(n_data, "00" + (lis + 1));
                  input.val("");
                }
              }
              break;
            case 27: // [GSP] Added case for escape to clear input
              results_holder.hide();
              input.val("");
              break;
            default:
              if (opts.showResultList) {
                if (opts.selectionLimit && $("li.as-selection-item", selections_holder).length >= opts.selectionLimit) {
                  results_ul.html('<li class="as-message">' + opts.limitText + '</li>');
                  results_holder.show();
                } else {
                  if (timeout) { clearTimeout(timeout); }
                  timeout = setTimeout(function () { keyChange(); }, opts.keyDelay);
                }
              }
              break;
          }
        });

        function keyChange() {
          // ignore if the following keys are pressed: [del] [shift] [capslock]
          if (lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32)) { return results_holder.hide(); }
          var string = input.val().replace(/[\\]+|[\/]+/g, "");
          if (string == prev) return;
          prev = string;
          if (string.length >= opts.minChars) {
            selections_holder.addClass("loading");
            if (d_type == "string") {
              var limit = "";
              if (opts.retrieveLimit) {
                limit = "&limit=" + encodeURIComponent(opts.retrieveLimit);
              }
              if (opts.beforeRetrieve) {
                string = opts.beforeRetrieve.call(this, string);
              }
              $.getJSON(req_string + "?" + opts.queryParam + "=" + encodeURIComponent(string) + limit + opts.extraParams, function (data) {
                d_count = 0;
                var new_data = opts.retrieveComplete.call(this, data);
                for (k in new_data) if (new_data.hasOwnProperty(k)) d_count++;
                processData(new_data, string);
              });
            } else {
              if (opts.beforeRetrieve) {
                string = opts.beforeRetrieve.call(this, string);
              }
              processData(org_data, string);
            }
          } else {
            selections_holder.removeClass("loading");
            results_holder.hide();
          }
        }
        var num_count = 0;
        function processData(data, query) {
          if (!opts.matchCase) { query = query.toLowerCase(); }
          var matchCount = 0;
          results_holder.html(results_ul.html("")).hide();
          for (var i = 0; i < d_count; i++) {
            var num = i;
            num_count++;
            var forward = false;
            if (opts.searchObjProps == "value") {
              var str = data[num].value;
            } else {
              var str = "";
              var names = opts.searchObjProps.split(",");
              for (var y = 0; y < names.length; y++) {
                var name = $.trim(names[y]);
                str = str + data[num][name] + " ";
              }
            }
            if (str) {
              if (!opts.matchCase) { str = str.toLowerCase(); }
              if (str.search(query) != -1 && values_input.val().search("," + data[num][opts.selectedValuesProp] + ",") == -1) {
                forward = true;
              }
            }
            if (forward) {
              var formatted = $('<li class="as-result-item" id="as-result-item-' + num + '"></li>').click(function () {
                var raw_data = $(this).data("data");
                var number = raw_data.num;
                if ($("#as-selection-" + number, selections_holder).length <= 0 && !tab_press) {
                  var data = raw_data.attributes;
                  input.val("").focus();
                  prev = "";
                  add_selected_item(data, number);
                  opts.resultClick.call(this, raw_data);
                  results_holder.hide();
                }
                tab_press = false;
              }).mousedown(function () { input_focus = false; }).mouseover(function () {
                $("li", results_ul).removeClass("active");
                $(this).addClass("active");
              }).data("data", { attributes: data[num], num: num_count });
              var this_data = $.extend({}, data[num]);
              if (!opts.matchCase) {
                var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "gi");
              } else {
                var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "g");
              }

              if (opts.resultsHighlight) {
                this_data[opts.selectedItemProp] = this_data[opts.selectedItemProp].replace(regx, "<em>$1</em>");
              }
              if (!opts.formatList) {
                formatted = formatted.html(this_data[opts.selectedItemProp]);
              } else {
                formatted = opts.formatList.call(this, this_data, formatted);
              }
              results_ul.append(formatted);
              delete this_data;
              matchCount++;
              if (opts.retrieveLimit && opts.retrieveLimit == matchCount) { break; }
            }
          }
          selections_holder.removeClass("loading");
          if (matchCount <= 0) {
            results_ul.html('<li class="as-message">' + opts.emptyText + '</li>');
          }
          results_ul.css("width", selections_holder.outerWidth());
          results_holder.show();
          opts.resultsComplete.call(this);
        }

        function add_selected_item(data, num) {
          values_input.val(values_input.val() + data[opts.selectedValuesProp] + ",");
          var item = $('<li class="as-selection-item" id="as-selection-' + num + '"></li>').click(function () {
            opts.selectionClick.call(this, $(this));
            selections_holder.children().removeClass("selected");
            $(this).addClass("selected");
          }).mousedown(function () { input_focus = false; });
          var close = $('<a class="as-close">&times;</a>').click(function () {
            values_input.val(values_input.val().replace("," + data[opts.selectedValuesProp] + ",", ","));
            opts.selectionRemoved.call(this, item);
            input_focus = true;
            input.focus();
            return false;
          });
          org_li.before(item.html(data[opts.selectedItemProp]).prepend(close));
          opts.selectionAdded.call(this, org_li.prev());
        }

        function moveSelection(direction) {
          if ($(":visible", results_holder).length > 0) {
            var lis = $("li", results_holder);
            if (direction == "down") {
              var start = lis.eq(0);
            } else {
              var start = lis.filter(":last");
            }
            var active = $("li.active:first", results_holder);
            if (active.length > 0) {
              if (direction == "down") {
                start = active.next();
              } else {
                start = active.prev();
              }
            }
            lis.removeClass("active");
            start.addClass("active");
          }
        }

      });
    }
  }
})(jQuery);

//#endregion End autoSuggest

//#region menubar 2013-03-11 https://github.com/rdogmartin/jquery-ui/blob/menubar/ui/jquery.ui.menubar.js
// This is a branch from https://github.com/jquery/jquery-ui/blob/menubar/ui/jquery.ui.menubar.js with these changes:

// * Replaced show() with slideDown(200) in _open function
// * Added open delay to prevent inadvertently opening menu when mouse is quickly passing over menu button

/*
 * jQuery UI Menubar @VERSION
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menubar
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.menu.js
 */
(function ($) {

  // TODO when mixing clicking menus and keyboard navigation, focus handling is broken
  // there has to be just one item that has tabindex
  $.widget("ui.menubar", {
    version: "@VERSION",
    options: {
      autoExpand: false,
      buttons: false,
      items: "li",
      menuElement: "ul",
      menuIcon: false,
      position: {
        my: "left top",
        at: "left bottom"
      }
    },
    _create: function () {
      var that = this;
      this.menuItems = this.element.children(this.options.items);
      this.items = this.menuItems.children("button, a");

      this.menuItems
        .addClass("ui-menubar-item")
        .attr("role", "presentation");
      // let only the first item receive focus
      this.items.slice(1).attr("tabIndex", -1);

      this.element
        .addClass("ui-menubar ui-widget-header ui-helper-clearfix")
        .attr("role", "menubar");
      this._focusable(this.items);
      this._hoverable(this.items);
      this.items.siblings(this.options.menuElement)
        .menu({
          position: {
            within: this.options.position.within
          },
          select: function (event, ui) {
            ui.item.parents("ul.ui-menu:last").hide();
            that._close();
            // TODO what is this targetting? there's probably a better way to access it
            $(event.target).prev().focus();
            that._trigger("select", event, ui);
          },
          menus: that.options.menuElement
        })
        .hide()
        .attr({
          "aria-hidden": "true",
          "aria-expanded": "false"
        })
        // TODO use _on
        .bind("keydown.menubar", function (event) {
          var menu = $(this);
          if (menu.is(":hidden")) {
            return;
          }
          switch (event.keyCode) {
            case $.ui.keyCode.LEFT:
              that.previous(event);
              event.preventDefault();
              break;
            case $.ui.keyCode.RIGHT:
              that.next(event);
              event.preventDefault();
              break;
          }
        });
      this.items.each(function () {
        var input = $(this),
          // TODO menu var is only used on two places, doesn't quite justify the .each
          menu = input.next(that.options.menuElement);

        // might be a non-menu button
        if (menu.length) {
          // TODO use _on
          input.bind("click.menubar focus.menubar mouseenter.menubar", function (event) {
            // ignore triggered focus event
            if (event.type === "focus" && !event.originalEvent) {
              return;
            }
            event.preventDefault();
            // TODO can we simplify or extractthis check? especially the last two expressions
            // there's a similar active[0] == menu[0] check in _open
            if (event.type === "click" && menu.is(":visible") && that.active && that.active[0] === menu[0]) {
              that._close();
              return;
            }
            if ((that.open && event.type === "mouseenter") || event.type === "click" || that.options.autoExpand) {
              if (that.options.autoExpand) {
                clearTimeout(that.closeTimer);
              }

              if (that.options.autoExpand) {
                // Expand after a slight delay, which we'll cancel if the mouse leaves the element
                // before the delay is up. This prevents inadvertently opening the menu when the mouse
                // is just passing through the area.
                that.openTimer = window.setTimeout(function () {
                  that._open(event, menu);
                }, 200);
              } else {
                that._open(event, menu);
              }
            }
          })
          // TODO use _on
          .bind("keydown", function (event) {
            switch (event.keyCode) {
              case $.ui.keyCode.SPACE:
              case $.ui.keyCode.UP:
              case $.ui.keyCode.DOWN:
                that._open(event, $(this).next());
                event.preventDefault();
                break;
              case $.ui.keyCode.LEFT:
                that.previous(event);
                event.preventDefault();
                break;
              case $.ui.keyCode.RIGHT:
                that.next(event);
                event.preventDefault();
                break;
            }
          })
          .attr("aria-haspopup", "true");

          // TODO review if these options (menuIcon and buttons) are a good choice, maybe they can be merged
          if (that.options.menuIcon) {
            input.addClass("ui-state-default").append("<span class='ui-button-icon-secondary ui-icon ui-icon-triangle-1-s'></span>");
            input.removeClass("ui-button-text-only").addClass("ui-button-text-icon-secondary");
          }
        } else {
          // TODO use _on
          input.bind("click.menubar mouseenter.menubar", function (event) {
            if ((that.open && event.type === "mouseenter") || event.type === "click") {
              that._close();
            }
          });
        }

        input
          .addClass("ui-button ui-widget ui-button-text-only ui-menubar-link")
          .attr("role", "menuitem")
          .wrapInner("<span class='ui-button-text'></span>");

        if (that.options.buttons) {
          input.removeClass("ui-menubar-link").addClass("ui-state-default");
        }
      });
      that._on({
        keydown: function (event) {
          if (event.keyCode === $.ui.keyCode.ESCAPE && that.active && that.active.menu("collapse", event) !== true) {
            var active = that.active;
            that.active.blur();
            that._close(event);
            active.prev().focus();
          }
        },
        focusin: function (event) {
          clearTimeout(that.closeTimer);
        },
        focusout: function (event) {
          clearTimeout(that.openTimer);
          that.closeTimer = setTimeout(function () {
            that._close(event);
          }, 150);
        },
        "mouseleave .ui-menubar-item": function (event) {
          if (that.options.autoExpand) {
            clearTimeout(that.openTimer);
            that.closeTimer = setTimeout(function () {
              that._close(event);
            }, 150);
          }
        },
        "mouseenter .ui-menubar-item": function (event) {
          clearTimeout(that.closeTimer);
        }
      });

      // Keep track of open submenus
      this.openSubmenus = 0;
    },

    _destroy: function () {
      this.menuItems
        .removeClass("ui-menubar-item")
        .removeAttr("role");

      this.element
        .removeClass("ui-menubar ui-widget-header ui-helper-clearfix")
        .removeAttr("role")
        .unbind(".menubar");

      this.items
        .unbind(".menubar")
        .removeClass("ui-button ui-widget ui-button-text-only ui-menubar-link ui-state-default")
        .removeAttr("role")
        .removeAttr("aria-haspopup")
        // TODO unwrap?
        .children("span.ui-button-text").each(function (i, e) {
          var item = $(this);
          item.parent().html(item.html());
        })
        .end()
        .children(".ui-icon").remove();

      this.element.find(":ui-menu")
        .menu("destroy")
        .show()
        .removeAttr("aria-hidden")
        .removeAttr("aria-expanded")
        .removeAttr("tabindex")
        .unbind(".menubar");
    },

    _close: function () {
      if (!this.active || !this.active.length) {
        return;
      }
      this.active
        .menu("collapseAll")
        .hide()
        .attr({
          "aria-hidden": "true",
          "aria-expanded": "false"
        });
      this.active
        .prev()
        .removeClass("ui-state-active")
        .removeAttr("tabIndex");
      this.active = null;
      this.open = false;
      this.openSubmenus = 0;
    },

    _open: function (event, menu) {
      // on a single-button menubar, ignore reopening the same menu
      if (this.active && this.active[0] === menu[0]) {
        return;
      }
      // TODO refactor, almost the same as _close above, but don't remove tabIndex
      if (this.active) {
        this.active
          .menu("collapseAll")
          .hide()
          .attr({
            "aria-hidden": "true",
            "aria-expanded": "false"
          });
        this.active
          .prev()
          .removeClass("ui-state-active");
      }
      // set tabIndex -1 to have the button skipped on shift-tab when menu is open (it gets focus)
      var button = menu.prev().addClass("ui-state-active").attr("tabIndex", -1);
      this.active = menu
        .slideDown(200) // Replace show() with slideDown()
        .position($.extend({
          of: button
        }, this.options.position))
        .removeAttr("aria-hidden")
        .attr("aria-expanded", "true")
        .menu("focus", event, menu.children(".ui-menu-item").first())
        // TODO need a comment here why both events are triggered
        .focus()
        .focusin();
      this.open = true;
    },

    next: function (event) {
      if (this.open && this.active.data("menu").active.has(".ui-menu").length) {
        // Track number of open submenus and prevent moving to next menubar item
        this.openSubmenus++;
        return;
      }
      this.openSubmenus = 0;
      this._move("next", "first", event);
    },

    previous: function (event) {
      if (this.open && this.openSubmenus) {
        // Track number of open submenus and prevent moving to previous menubar item
        this.openSubmenus--;
        return;
      }
      this.openSubmenus = 0;
      this._move("prev", "last", event);
    },

    _move: function (direction, filter, event) {
      var next,
        wrapItem;
      if (this.open) {
        next = this.active.closest(".ui-menubar-item")[direction + "All"](this.options.items).first().children(".ui-menu").eq(0);
        wrapItem = this.menuItems[filter]().children(".ui-menu").eq(0);
      } else {
        if (event) {
          next = $(event.target).closest(".ui-menubar-item")[direction + "All"](this.options.items).children(".ui-menubar-link").eq(0);
          wrapItem = this.menuItems[filter]().children(".ui-menubar-link").eq(0);
        } else {
          next = wrapItem = this.menuItems.children("a").eq(0);
        }
      }

      if (next.length) {
        if (this.open) {
          this._open(event, next);
        } else {
          next.removeAttr("tabIndex")[0].focus();
        }
      } else {
        if (this.open) {
          this._open(event, wrapItem);
        } else {
          wrapItem.removeAttr("tabIndex")[0].focus();
        }
      }
    }
  });

}(jQuery));

//#endregion End menubar

//#region RateIt
/*
    RateIt
    version 1.0.9
    10/31/2012
    http://rateit.codeplex.com
    Twitter: @gjunge

*/
(function ($) {
  $.fn.rateit = function (p1, p2) {
    //quick way out.
    var options = {}; var mode = 'init';
    var capitaliseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.substr(1);
    };

    if (this.length == 0) return this;


    var tp1 = $.type(p1);
    if (tp1 == 'object' || p1 === undefined || p1 == null) {
      options = $.extend({}, $.fn.rateit.defaults, p1); //wants to init new rateit plugin(s).
    }
    else if (tp1 == 'string' && p2 === undefined) {
      return this.data('rateit' + capitaliseFirstLetter(p1)); //wants to get a value.
    }
    else if (tp1 == 'string') {
      mode = 'setvalue'
    }

    return this.each(function () {
      var item = $(this);

      //shorten all the item.data('rateit-XXX'), will save space in closure compiler, will be like item.data('XXX') will become x('XXX')
      var itemdata = function (key, value) {
        arguments[0] = 'rateit' + capitaliseFirstLetter(key);
        return item.data.apply(item, arguments); ////Fix for WI: 523
      };

      //add the rate it class.
      if (!item.hasClass('rateit')) item.addClass('rateit');

      var ltr = item.css('direction') != 'rtl';

      // set value mode
      if (mode == 'setvalue') {
        if (!itemdata('init')) throw 'Can\'t set value before init';


        //if readonly now and it wasn't readonly, remove the eventhandlers.
        if (p1 == 'readonly' && !itemdata('readonly')) {
          item.find('.rateit-range').unbind();
          itemdata('wired', false);
        }
        if (p1 == 'value' && p2 == null) p2 = itemdata('min'); //when we receive a null value, reset the score to its min value.

        if (itemdata('backingfld')) {
          //if we have a backing field, check which fields we should update. 
          //In case of input[type=range], although we did read its attributes even in browsers that don't support it (using fld.attr())
          //we only update it in browser that support it (&& fld[0].min only works in supporting browsers), not only does it save us from checking if it is range input type, it also is unnecessary.
          var fld = $(itemdata('backingfld'));
          if (p1 == 'value') fld.val(p2);
          if (p1 == 'min' && fld[0].min) fld[0].min = p2;
          if (p1 == 'max' && fld[0].max) fld[0].max = p2;
          if (p1 == 'step' && fld[0].step) fld[0].step = p2;
        }

        itemdata(p1, p2);
      }

      //init rateit plugin
      if (!itemdata('init')) {

        //get our values, either from the data-* html5 attribute or from the options.
        itemdata('min', itemdata('min') || options.min);
        itemdata('max', itemdata('max') || options.max);
        itemdata('step', itemdata('step') || options.step);
        itemdata('readonly', itemdata('readonly') !== undefined ? itemdata('readonly') : options.readonly);
        itemdata('resetable', itemdata('resetable') !== undefined ? itemdata('resetable') : options.resetable);
        itemdata('backingfld', itemdata('backingfld') || options.backingfld);
        itemdata('starwidth', itemdata('starwidth') || options.starwidth);
        itemdata('starheight', itemdata('starheight') || options.starheight);
        itemdata('value', itemdata('value') || options.value || options.min);
        itemdata('ispreset', itemdata('ispreset') !== undefined ? itemdata('ispreset') : options.ispreset);
        //are we LTR or RTL?

        if (itemdata('backingfld')) {
          //if we have a backing field, hide it, and get its value, and override defaults if range.
          var fld = $(itemdata('backingfld'));
          itemdata('value', fld.hide().val());

          if (fld.attr('disabled') || fld.attr('readonly'))
            itemdata('readonly', true); //http://rateit.codeplex.com/discussions/362055 , if a backing field is disabled or readonly at instantiation, make rateit readonly.


          if (fld[0].nodeName == 'INPUT') {
            if (fld[0].type == 'range' || fld[0].type == 'text') { //in browsers not support the range type, it defaults to text

              itemdata('min', parseInt(fld.attr('min')) || itemdata('min')); //if we would have done fld[0].min it wouldn't have worked in browsers not supporting the range type.
              itemdata('max', parseInt(fld.attr('max')) || itemdata('max'));
              itemdata('step', parseInt(fld.attr('step')) || itemdata('step'));
            }
          }
          if (fld[0].nodeName == 'SELECT' && fld[0].options.length > 1) {
            itemdata('min', Number(fld[0].options[0].value));
            itemdata('max', Number(fld[0].options[fld[0].length - 1].value));
            itemdata('step', Number(fld[0].options[1].value) - Number(fld[0].options[0].value));
          }
        }

        //Create the necessary tags.
        item.append('<div class="rateit-reset"></div><div class="rateit-range"><div class="rateit-selected" style="height:' + itemdata('starheight') + 'px"></div><div class="rateit-hover" style="height:' + itemdata('starheight') + 'px"></div></div>');

        //if we are in RTL mode, we have to change the float of the "reset button"
        if (!ltr) {
          item.find('.rateit-reset').css('float', 'right');
          item.find('.rateit-selected').addClass('rateit-selected-rtl');
          item.find('.rateit-hover').addClass('rateit-hover-rtl');
        }

        itemdata('init', true);
      }


      //set the range element to fit all the stars.
      var range = item.find('.rateit-range');
      range.width(itemdata('starwidth') * (itemdata('max') - itemdata('min'))).height(itemdata('starheight'));

      //add/remove the preset class
      var presetclass = 'rateit-preset' + ((ltr) ? '' : '-rtl');
      if (itemdata('ispreset'))
        item.find('.rateit-selected').addClass(presetclass);
      else
        item.find('.rateit-selected').removeClass(presetclass);

      //set the value if we have it.
      if (itemdata('value') != null) {
        var score = (itemdata('value') - itemdata('min')) * itemdata('starwidth');
        item.find('.rateit-selected').width(score);
      }

      var resetbtn = item.find('.rateit-reset');
      if (resetbtn.data('wired') !== true) {
        resetbtn.click(function () {
          itemdata('value', itemdata('min'));
          range.find('.rateit-hover').hide().width(0);
          range.find('.rateit-selected').width(0).show();
          if (itemdata('backingfld')) $(itemdata('backingfld')).val(itemdata('min'));
          item.trigger('reset');
        }).data('wired', true);

      }


      var calcRawScore = function (element, event) {
        var pageX = (event.changedTouches) ? event.changedTouches[0].pageX : event.pageX;

        var offsetx = pageX - $(element).offset().left;
        if (!ltr) offsetx = range.width() - offsetx;
        if (offsetx > range.width()) offsetx = range.width();
        if (offsetx < 0) offsetx = 0;

        return score = Math.ceil(offsetx / itemdata('starwidth') * (1 / itemdata('step')));
      };


      //

      if (!itemdata('readonly')) {
        //if we are not read only, add all the events

        //if we have a reset button, set the event handler.
        if (!itemdata('resetable'))
          resetbtn.hide();

        //when the mouse goes over the range div, we set the "hover" stars.
        if (!itemdata('wired')) {
          range.bind('touchmove touchend', touchHandler); //bind touch events
          range.mousemove(function (e) {
            var score = calcRawScore(this, e);
            var w = score * itemdata('starwidth') * itemdata('step');
            var h = range.find('.rateit-hover');
            if (h.data('width') != w) {
              range.find('.rateit-selected').hide();
              h.width(w).show().data('width', w);
              var data = [(score * itemdata('step')) + itemdata('min')];
              item.trigger('hover', data).trigger('over', data);
            }
          });
          //when the mouse leaves the range, we have to hide the hover stars, and show the current value.
          range.mouseleave(function (e) {
            range.find('.rateit-hover').hide().width(0).data('width', '');
            item.trigger('hover', [null]).trigger('over', [null]);
            range.find('.rateit-selected').show();
          });
          //when we click on the range, we have to set the value, hide the hover.
          range.mouseup(function (e) {
            var score = calcRawScore(this, e);

            var newvalue = (score * itemdata('step')) + itemdata('min');
            itemdata('value', newvalue);
            if (itemdata('backingfld')) {
              $(itemdata('backingfld')).val(newvalue);
            }
            if (itemdata('ispreset')) { //if it was a preset value, unset that.
              range.find('.rateit-selected').removeClass(presetclass);
              itemdata('ispreset', false);
            }
            range.find('.rateit-hover').hide();
            range.find('.rateit-selected').width(score * itemdata('starwidth') * itemdata('step')).show();
            item.trigger('hover', [null]).trigger('over', [null]).trigger('rated', [newvalue]);
          });

          itemdata('wired', true);
        }
        if (itemdata('resetable')) {
          resetbtn.show();
        }
      }
      else {
        resetbtn.hide();
      }
    });
  };

  //touch converter http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/
  function touchHandler(event) {

    var touches = event.originalEvent.changedTouches,
            first = touches[0],
            type = "";
    switch (event.type) {
      case "touchmove": type = "mousemove"; break;
      case "touchend": type = "mouseup"; break;
      default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  };

  //some default values.
  $.fn.rateit.defaults = { min: 0, max: 5, step: 0.5, starwidth: 16, starheight: 16, readonly: false, resetable: true, ispreset: false };

  //invoke it on all div.rateit elements. This could be removed if not wanted.
  //$(function () { $('div.rateit').rateit(); });

})(jQuery);

//#endregion End RateIt

//#region supersized

/*
	supersized.3.2.7.js
	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/

(function ($) {

  $.supersized = function (options) {

    /* Variables
  ----------------------------*/
    var base = this;

    base.init = function () {
      // Combine options and vars
      $.supersized.vars = $.extend($.supersized.vars, $.supersized.themeVars);
      $.supersized.vars.options = $.extend({}, $.supersized.defaultOptions, $.supersized.themeOptions, options);
      base.options = $.supersized.vars.options;

      base._build();
    };


    /* Build Elements
----------------------------*/
    base._build = function () {
      // Add in slide markers
      var thisSlide = 0,
        slideSet = '',
    markers = '',
    markerContent,
    thumbMarkers = '',
    thumbImage;


      // Hide current page contents and add Supersized Elements
      $('body').children(':visible').hide().addClass('supersized_hidden');
      $('body').append($($.supersized.vars.options.html_template), '<div id="supersized-loader"></div><ul id="supersized"></ul>');

      var el = '#supersized';
      // Access to jQuery and DOM versions of element
      base.$el = $(el);
      base.el = el;
      vars = $.supersized.vars;
      // Add a reverse reference to the DOM object
      base.$el.data("supersized", base);
      api = base.$el.data('supersized');


      while (thisSlide <= base.options.slides.length - 1) {
        //Determine slide link content
        switch (base.options.slide_links) {
          case 'num':
            markerContent = thisSlide;
            break;
          case 'name':
            markerContent = base.options.slides[thisSlide].title;
            break;
          case 'blank':
            markerContent = '';
            break;
        }

        slideSet = slideSet + '<li class="slide-' + thisSlide + '"></li>';

        if (thisSlide == base.options.start_slide - 1) {
          // Slide links
          if (base.options.slide_links) markers = markers + '<li class="slide-link-' + thisSlide + ' current-slide"><a>' + markerContent + '</a></li>';
          // Slide Thumbnail Links
          if (base.options.thumb_links) {
            base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
            thumbMarkers = thumbMarkers + '<li class="thumb' + thisSlide + ' current-thumb"><img src="' + thumbImage + '"/></li>';
          };
        } else {
          // Slide links
          if (base.options.slide_links) markers = markers + '<li class="slide-link-' + thisSlide + '" ><a>' + markerContent + '</a></li>';
          // Slide Thumbnail Links
          if (base.options.thumb_links) {
            base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
            thumbMarkers = thumbMarkers + '<li class="thumb' + thisSlide + '"><img src="' + thumbImage + '"/></li>';
          };
        }
        thisSlide++;
      }

      if (base.options.slide_links) $(vars.slide_list).html(markers);
      if (base.options.thumb_links && vars.thumb_tray.length) {
        $(vars.thumb_tray).append('<ul id="' + vars.thumb_list.replace('#', '') + '">' + thumbMarkers + '</ul>');
      }

      $(base.el).append(slideSet);

      // Add in thumbnails
      if (base.options.thumbnail_navigation) {
        // Load previous thumbnail
        vars.current_slide - 1 < 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
        $(vars.prev_thumb).show().html($("<img/>").attr("src", base.options.slides[prevThumb].image));

        // Load next thumbnail
        vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
        $(vars.next_thumb).show().html($("<img/>").attr("src", base.options.slides[nextThumb].image));
      }

      base._start(); // Get things started
    };


    /* Initialize
----------------------------*/
    base._start = function () {

      // Determine if starting slide random
      if (base.options.start_slide) {
        vars.current_slide = base.options.start_slide - 1;
      } else {
        vars.current_slide = Math.floor(Math.random() * base.options.slides.length);	// Generate random slide number
      }

      // If links should open in new window
      var linkTarget = base.options.new_window ? ' target="_blank"' : '';

      // Set slideshow quality (Supported only in FF and IE, no Webkit)
      if (base.options.performance == 3) {
        base.$el.addClass('speed'); 		// Faster transitions
      } else if ((base.options.performance == 1) || (base.options.performance == 2)) {
        base.$el.addClass('quality');	// Higher image quality
      }

      // Shuffle slide order if needed		
      if (base.options.random) {
        arr = base.options.slides;
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
        base.options.slides = arr;
      }

      /*-----Load initial set of images-----*/

      if (base.options.slides.length > 1) {
        if (base.options.slides.length > 2) {
          // Set previous image
          vars.current_slide - 1 < 0 ? loadPrev = base.options.slides.length - 1 : loadPrev = vars.current_slide - 1;	// If slide is 1, load last slide as previous
          var imageLink = (base.options.slides[loadPrev].url) ? "href='" + base.options.slides[loadPrev].url + "'" : "";

          var imgPrev = $('<img src="' + base.options.slides[loadPrev].image + '"/>');
          var slidePrev = base.el + ' li:eq(' + loadPrev + ')';
          imgPrev.appendTo(slidePrev).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading prevslide');

          imgPrev.load(function () {
            $(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
            base.resizeNow();	// Resize background image
          });	// End Load
        }
      } else {
        // Slideshow turned off if there is only one slide
        //base.options.slideshow = 0; //[RDM] Commented out because this disables buttons when there is only one slide
      }

      // Set current image
      imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
      var img = $('<img src="' + api.getField('image') + '"/>');

      var slideCurrent = base.el + ' li:eq(' + vars.current_slide + ')';
      img.appendTo(slideCurrent).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading activeslide').css('visibility', 'visible');

      img.load(function () {
        base._origDim($(this));
        base.resizeNow();	// Resize background image
        base.launch();
        if (typeof theme != 'undefined' && typeof theme._init == "function") theme._init();	// Load Theme
      });

      if (base.options.slides.length > 1) {
        // Set next image
        vars.current_slide == base.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;	// If slide is last, load first slide as next
        imageLink = (base.options.slides[loadNext].url) ? "href='" + base.options.slides[loadNext].url + "'" : "";

        var imgNext = $('<img src="' + base.options.slides[loadNext].image + '"/>');
        var slideNext = base.el + ' li:eq(' + loadNext + ')';
        imgNext.appendTo(slideNext).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading');

        imgNext.load(function () {
          $(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
          base.resizeNow();	// Resize background image
        });	// End Load
      }
      /*-----End load initial images-----*/

      //  Hide elements to be faded in
      base.$el.css('visibility', 'hidden');
      $('.load-item').hide();

    };


    /* Launch Supersized
		----------------------------*/
    base.launch = function () {

      //base.$el.css('visibility', 'visible');
      $('#supersized-loader').remove();		//Hide loading animation

      // Call theme function for before slide transition
      if (typeof theme != 'undefined' && typeof theme.beforeAnimation == "function") theme.beforeAnimation('next');
      $('.load-item').show();

      // Keyboard Navigation
      if (base.options.keyboard_nav) {
        $(document.documentElement).on('keyup.supersized', function (event) {

          if (vars.in_animation) return false;		// Abort if currently animating
          if ($(document.activeElement).is("input, textarea")) return false; // Abort if active element is an input or a textarea.

          // Left Arrow or Down Arrow
          if ((event.keyCode == 37) || (event.keyCode == 40)) {
            clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
            base.prevSlide();

            // Right Arrow or Up Arrow
          } else if ((event.keyCode == 39) || (event.keyCode == 38)) {
            clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
            base.nextSlide();

            // Spacebar	
          } else if (event.keyCode == 32 && !vars.hover_pause) {
            clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
            base.playToggle();
          }

        });
      }

      // Pause when hover on image
      if (base.options.slideshow && base.options.pause_hover) {
        $(base.el).hover(function () {
          if (vars.in_animation) return false;		// Abort if currently animating
          vars.hover_pause = true;	// Mark slideshow paused from hover
          if (!vars.is_paused) {
            vars.hover_pause = 'resume';	// It needs to resume afterwards
            base.playToggle();
          }
        }, function () {
          if (vars.hover_pause == 'resume') {
            base.playToggle();
            vars.hover_pause = false;
          }
        });
      }

      if (base.options.slide_links) {
        // Slide marker clicked
        $(vars.slide_list + '> li').click(function () {

          index = $(vars.slide_list + '> li').index(this);
          targetSlide = index + 1;

          base.goTo(targetSlide);
          return false;

        });
      }

      // Thumb marker clicked
      if (base.options.thumb_links) {
        $(vars.thumb_list + '> li').click(function () {

          index = $(vars.thumb_list + '> li').index(this);
          targetSlide = index + 1;

          api.goTo(targetSlide);
          return false;

        });
      }

      // Start slideshow if enabled
      if (base.options.slideshow && base.options.slides.length > 1) {

        // Start slideshow if autoplay enabled
        if (base.options.autoplay && base.options.slides.length > 1) {
          vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);	// Initiate slide interval
        } else {
          vars.is_paused = true;	// Mark as paused
        }

        //Prevent navigation items from being dragged					
        $('.load-item img').bind("contextmenu mousedown", function () {
          return false;
        });

      }

      // Adjust image when browser is resized
      $(window).resize(function () {
        base.resizeNow();
      });

    };


    /* Resize Images
----------------------------*/
    base.resizeNow = function () {

      return base.$el.each(function () {
        //  Resize each image seperately
        $('img', base.el).each(function () {

          thisSlide = $(this);
          var ratio = (thisSlide.data('origHeight') / thisSlide.data('origWidth')).toFixed(2);	// Define image ratio

          // Gather browser size
          var browserwidth = base.$el.width(),
						browserheight = base.$el.height(),
						offset;

          /*-----Resize Image-----*/
          if (base.options.fit_always) {	// Fit always is enabled
            if ((browserheight / browserwidth) > ratio) {
              resizeWidth();
            } else {
              resizeHeight();
            }
          } else {	// Normal Resize
            if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)) {	// If window smaller than minimum width and height

              if ((browserheight / browserwidth) > ratio) {
                base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
              } else {
                base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
              }

            } else if (browserwidth <= base.options.min_width) {		// If window only smaller than minimum width

              if ((browserheight / browserwidth) > ratio) {
                base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
              } else {
                base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
              }

            } else if (browserheight <= base.options.min_height) {	// If window only smaller than minimum height

              if ((browserheight / browserwidth) > ratio) {
                base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
              } else {
                base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
              }

            } else {	// If larger than minimums

              if ((browserheight / browserwidth) > ratio) {
                base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
              } else {
                base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
              }

            }
          }
          /*-----End Image Resize-----*/


          /*-----Resize Functions-----*/

          function resizeWidth(minimum) {
            if (minimum) {	// If minimum height needs to be considered
              if (thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width) {
                if (thisSlide.width() * ratio >= base.options.min_height) {
                  thisSlide.width(base.options.min_width);
                  thisSlide.height(thisSlide.width() * ratio);
                } else {
                  resizeHeight();
                }
              }
            } else {
              if (base.options.min_height >= browserheight && !base.options.fit_landscape) {	// If minimum height needs to be considered
                if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)) {	// If resizing would push below minimum height or image is a landscape
                  thisSlide.width(browserwidth);
                  thisSlide.height(browserwidth * ratio);
                } else if (ratio > 1) {		// Else the image is portrait
                  thisSlide.height(base.options.min_height);
                  thisSlide.width(thisSlide.height() / ratio);
                } else if (thisSlide.width() < browserwidth) {
                  thisSlide.width(browserwidth);
                  thisSlide.height(thisSlide.width() * ratio);
                }
              } else {	// Otherwise, resize as normal
                thisSlide.width(browserwidth);
                thisSlide.height(browserwidth * ratio);
              }
            }
          };

          function resizeHeight(minimum) {
            if (minimum) {	// If minimum height needs to be considered
              if (thisSlide.height() < browserheight) {
                if (thisSlide.height() / ratio >= base.options.min_width) {
                  thisSlide.height(base.options.min_height);
                  thisSlide.width(thisSlide.height() / ratio);
                } else {
                  resizeWidth(true);
                }
              }
            } else {	// Otherwise, resized as normal
              if (base.options.min_width >= browserwidth) {	// If minimum width needs to be considered
                if (browserheight / ratio >= base.options.min_width || ratio > 1) {	// If resizing would push below minimum width or image is a portrait
                  thisSlide.height(browserheight);
                  thisSlide.width(browserheight / ratio);
                } else if (ratio <= 1) {		// Else the image is landscape
                  thisSlide.width(base.options.min_width);
                  thisSlide.height(thisSlide.width() * ratio);
                }
              } else {	// Otherwise, resize as normal
                thisSlide.height(browserheight);
                thisSlide.width(browserheight / ratio);
              }
            }
          };

          /*-----End Resize Functions-----*/

          if (thisSlide.parents('li').hasClass('image-loading')) {
            $('.image-loading').removeClass('image-loading');
          }

          // Horizontally Center
          if (base.options.horizontal_center) {
            $(this).css('left', (browserwidth - $(this).width()) / 2);
          }

          // Vertically Center
          if (base.options.vertical_center) {
            $(this).css('top', (browserheight - $(this).height()) / 2);
          }

        });

        // Basic image drag and right click protection
        if (base.options.image_protect) {

          $('img', base.el).bind("contextmenu mousedown", function () {
            return false;
          });

        }

        return false;

      });

    };


    /* Next Slide
----------------------------*/
    base.nextSlide = function () {
      if (base.options.slideshow && !vars.is_paused && base.options.auto_exit && (vars.current_slide == base.options.slides.length - 1)) {
        // We're on the last slide of a running slideshow where auto_exit is enabled, so exit.
        base.destroy();
        return false;
      }

      var old_slide_number = vars.current_slide;
      // Get the slide number of new slide
      if (vars.current_slide < base.options.slides.length - 1) {
        vars.current_slide++;
      } else if (base.options.loop) {
        vars.current_slide = 0;
      }

      if (old_slide_number == vars.current_slide) {
        vars.in_animation = false;
        return false;
      }

      if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
      else vars.in_animation = true;		// Otherwise set animation marker

      clearInterval(vars.slideshow_interval);	// Stop slideshow

      var slides = base.options.slides,					// Pull in slides array
      liveslide = base.$el.find('.activeslide');		// Find active slide
      $('.prevslide').removeClass('prevslide');
      liveslide.removeClass('activeslide').addClass('prevslide');	// Remove active class & update previous slide


      var nextslide = $(base.el + ' li:eq(' + vars.current_slide + ')'),
        prevslide = base.$el.find('.prevslide');

      // If hybrid mode is on drop quality for transition
      if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');


      /*-----Load Image-----*/

      loadSlide = false;

      vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

      var targetList = base.el + ' li:eq(' + loadSlide + ')';
      if (!$(targetList).html()) {

        // If links should open in new window
        var linkTarget = base.options.new_window ? ' target="_blank"' : '';

        imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
        var img = $('<img src="' + base.options.slides[loadSlide].image + '"/>');

        img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility', 'hidden');

        img.load(function () {
          base._origDim($(this));
          base.resizeNow();
        });	// End Load
      };

      // Update thumbnails (if enabled)
      if (base.options.thumbnail_navigation == 1) {

        // Load previous thumbnail
        vars.current_slide - 1 < 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
        $(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

        // Load next thumbnail
        nextThumb = loadSlide;
        $(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));

      }



      /*-----End Load Image-----*/


      // Call theme function for before slide transition
      if (typeof theme != 'undefined' && typeof theme.beforeAnimation == "function") theme.beforeAnimation('next');

      //Update slide markers
      if (base.options.slide_links) {
        $('.current-slide').removeClass('current-slide');
        $(vars.slide_list + '> li').eq(vars.current_slide).addClass('current-slide');
      }

      nextslide.css('visibility', 'hidden').addClass('activeslide');	// Update active slide

      switch (base.options.transition) {
        case 0: case 'none':	// No transition
          nextslide.css('visibility', 'visible'); vars.in_animation = false; base.afterAnimation();
          break;
        case 1: case 'fade':	// Fade
          nextslide.css({ opacity: 0, 'visibility': 'visible' }).animate({ opacity: 1, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 2: case 'slideTop':	// Slide Top
          nextslide.css({ top: -base.$el.height(), 'visibility': 'visible' }).animate({ top: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 3: case 'slideRight':	// Slide Right
          nextslide.css({ left: base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 4: case 'slideBottom': // Slide Bottom
          nextslide.css({ top: base.$el.height(), 'visibility': 'visible' }).animate({ top: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 5: case 'slideLeft':  // Slide Left
          nextslide.css({ left: -base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 6: case 'carouselRight':	// Carousel Right
          nextslide.css({ left: base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          liveslide.animate({ left: -base.$el.width(), avoidTransforms: false }, base.options.transition_speed);
          break;
        case 7: case 'carouselLeft':   // Carousel Left
          nextslide.css({ left: -base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          liveslide.animate({ left: base.$el.width(), avoidTransforms: false }, base.options.transition_speed);
          break;
      }
      return false;
    };


    /* Previous Slide
		----------------------------*/
    base.prevSlide = function () {

      if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
      else vars.in_animation = true;		// Otherwise set animation marker

      var old_slide_number = vars.current_slide;
      // Get current slide number
      if (vars.current_slide > 0) {
        vars.current_slide--;
      } else if (base.options.loop) {
        vars.current_slide = base.options.slides.length - 1;
      }

      if (old_slide_number == vars.current_slide) {
        vars.in_animation = false;
        return false;
      }

      clearInterval(vars.slideshow_interval);	// Stop slideshow

      var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
      $('.prevslide').removeClass('prevslide');
      liveslide.removeClass('activeslide').addClass('prevslide');		// Remove active class & update previous slide

      var nextslide = $(base.el + ' li:eq(' + vars.current_slide + ')'),
        prevslide = base.$el.find('.prevslide');

      // If hybrid mode is on drop quality for transition
      if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');


      /*-----Load Image-----*/

      loadSlide = vars.current_slide;

      var targetList = base.el + ' li:eq(' + loadSlide + ')';
      if (!$(targetList).html()) {
        // If links should open in new window
        var linkTarget = base.options.new_window ? ' target="_blank"' : '';
        imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
        var img = $('<img src="' + base.options.slides[loadSlide].image + '"/>');

        img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility', 'hidden');

        img.load(function () {
          base._origDim($(this));
          base.resizeNow();
        });	// End Load
      };

      // Update thumbnails (if enabled)
      if (base.options.thumbnail_navigation == 1) {

        // Load previous thumbnail
        //prevThumb = loadSlide;
        loadSlide == 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = loadSlide - 1;
        $(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

        // Load next thumbnail
        vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
        $(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
      }

      /*-----End Load Image-----*/


      // Call theme function for before slide transition
      if (typeof theme != 'undefined' && typeof theme.beforeAnimation == "function") theme.beforeAnimation('prev');

      //Update slide markers
      if (base.options.slide_links) {
        $('.current-slide').removeClass('current-slide');
        $(vars.slide_list + '> li').eq(vars.current_slide).addClass('current-slide');
      }

      nextslide.css('visibility', 'hidden').addClass('activeslide');	// Update active slide

      switch (base.options.transition) {
        case 0: case 'none':	// No transition
          nextslide.css('visibility', 'visible'); vars.in_animation = false; base.afterAnimation();
          break;
        case 1: case 'fade':	// Fade
          nextslide.css({ opacity: 0, 'visibility': 'visible' }).animate({ opacity: 1, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 2: case 'slideTop':	// Slide Top (reverse)
          nextslide.css({ top: base.$el.height(), 'visibility': 'visible' }).animate({ top: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 3: case 'slideRight':	// Slide Right (reverse)
          nextslide.css({ left: -base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 4: case 'slideBottom': // Slide Bottom (reverse)
          nextslide.css({ top: -base.$el.height(), 'visibility': 'visible' }).animate({ top: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 5: case 'slideLeft':  // Slide Left (reverse)
          nextslide.css({ left: base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          break;
        case 6: case 'carouselRight':	// Carousel Right (reverse)
          nextslide.css({ left: -base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          liveslide.css({ left: 0 }).animate({ left: base.$el.width(), avoidTransforms: false }, base.options.transition_speed);
          break;
        case 7: case 'carouselLeft':   // Carousel Left (reverse)
          nextslide.css({ left: base.$el.width(), 'visibility': 'visible' }).animate({ left: 0, avoidTransforms: false }, base.options.transition_speed, function () { base.afterAnimation(); });
          liveslide.css({ left: 0 }).animate({ left: -base.$el.width(), avoidTransforms: false }, base.options.transition_speed);
          break;
      }
      return false;
    };


    /* Play/Pause Toggle
		----------------------------*/
    base.playToggle = function () {

      if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

      if (vars.is_paused) {

        vars.is_paused = false;

        // Call theme function for play
        if (typeof theme != 'undefined' && typeof theme.playToggle == "function") theme.playToggle('play');

        // Resume slideshow
        vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);

      } else {

        vars.is_paused = true;

        // Call theme function for pause
        if (typeof theme != 'undefined' && typeof theme.playToggle == "function") theme.playToggle('pause');

        // Stop slideshow
        clearInterval(vars.slideshow_interval);

      }

      return false;

    };

    /* Tear down this instance of supersized
		----------------------------*/
    base.destroy = function () {
      if (vars.in_animation || !api.options.slideshow) return;		// Abort if currently animating

      // Start slideshow if paused. Without this, the slideshow is paused and the play/pause button has the wrong icon
      // when the user clicks the 'start slideshow' button a second time.
      if (vars.is_paused)
        api.playToggle();

      clearInterval(vars.slideshow_interval);

      // Unbind events (requires jQuery 1.7+)
      $(document.documentElement).off('.supersized');
      $('.ssControlsContainer *').off('click');

      vars = null;
      api = null;

      // Remove slideshow DOM elements and restore the page.
      $('#supersized-loader,#supersized,.ssControlsContainer').remove();
      $('body .supersized_hidden').show().removeClass('supersized_hidden');

      // Trigger on_destroy event
      base.options.on_destroy.apply();
    };

    /* Go to specific slide
  ----------------------------*/
    base.goTo = function (targetSlide) {
      if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

      var totalSlides = base.options.slides.length;

      // If target outside range
      if (targetSlide < 0) {
        targetSlide = totalSlides;
      } else if (targetSlide > totalSlides) {
        targetSlide = 1;
      }
      targetSlide = totalSlides - targetSlide + 1;

      clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup

      // Call theme function for goTo trigger
      if (typeof theme != 'undefined' && typeof theme.goTo == "function") theme.goTo();

      if (vars.current_slide == totalSlides - targetSlide) {
        if (!(vars.is_paused)) {
          vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
        }
        return false;
      }

      // If ahead of current position
      if (totalSlides - targetSlide > vars.current_slide) {

        // Adjust for new next slide
        vars.current_slide = totalSlides - targetSlide - 1;
        vars.update_images = 'next';
        base._placeSlide(vars.update_images);

        //Otherwise it's before current position
      } else if (totalSlides - targetSlide < vars.current_slide) {

        // Adjust for new prev slide
        vars.current_slide = totalSlides - targetSlide + 1;
        vars.update_images = 'prev';
        base._placeSlide(vars.update_images);

      }

      // set active markers
      if (base.options.slide_links) {
        $(vars.slide_list + '> .current-slide').removeClass('current-slide');
        $(vars.slide_list + '> li').eq((totalSlides - targetSlide)).addClass('current-slide');
      }

      if (base.options.thumb_links) {
        $(vars.thumb_list + '> .current-thumb').removeClass('current-thumb');
        $(vars.thumb_list + '> li').eq((totalSlides - targetSlide)).addClass('current-thumb');
      }

    };


    /* Place Slide
----------------------------*/
    base._placeSlide = function (place) {

      // If links should open in new window
      var linkTarget = base.options.new_window ? ' target="_blank"' : '';

      loadSlide = false;

      if (place == 'next') {

        vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

        var targetList = base.el + ' li:eq(' + loadSlide + ')';

        if (!$(targetList).html()) {
          // If links should open in new window
          var linkTarget = base.options.new_window ? ' target="_blank"' : '';

          imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
          var img = $('<img src="' + base.options.slides[loadSlide].image + '"/>');

          img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility', 'hidden');

          img.load(function () {
            base._origDim($(this));
            base.resizeNow();
          });	// End Load
        };

        base.nextSlide();

      } else if (place == 'prev') {

        vars.current_slide - 1 < 0 ? loadSlide = base.options.slides.length - 1 : loadSlide = vars.current_slide - 1;	// Determine next slide

        var targetList = base.el + ' li:eq(' + loadSlide + ')';

        if (!$(targetList).html()) {
          // If links should open in new window
          var linkTarget = base.options.new_window ? ' target="_blank"' : '';

          imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
          var img = $('<img src="' + base.options.slides[loadSlide].image + '"/>');

          img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility', 'hidden');

          img.load(function () {
            base._origDim($(this));
            base.resizeNow();
          });	// End Load
        };
        base.prevSlide();
      }

    };


    /* Get Original Dimensions
		----------------------------*/
    base._origDim = function (targetSlide) {
      targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height());
    };


    /* After Slide Animation
		----------------------------*/
    base.afterAnimation = function () {

      // If hybrid mode is on swap back to higher image quality
      if (base.options.performance == 1) {
        base.$el.removeClass('speed').addClass('quality');
      }

      // Update previous slide
      if (vars.update_images) {
        vars.current_slide - 1 < 0 ? setPrev = base.options.slides.length - 1 : setPrev = vars.current_slide - 1;
        vars.update_images = false;
        $('.prevslide').removeClass('prevslide');
        $(base.el + ' li:eq(' + setPrev + ')').addClass('prevslide');
      }

      vars.in_animation = false;

      // Resume slideshow
      if (!vars.is_paused && base.options.slideshow) {
        vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
        if (!base.options.loop && !base.options.auto_exit && vars.current_slide == base.options.slides.length - 1) base.playToggle();
      }

      // Call theme function for after slide transition
      if (typeof theme != 'undefined' && typeof theme.afterAnimation == "function") theme.afterAnimation();

      return false;

    };

    base.getField = function (field) {
      return base.options.slides[vars.current_slide][field];
    };

    // Make it go!
    base.init();
  };


  /* Global Variables
	----------------------------*/
  $.supersized.vars = {

    // Elements							
    thumb_tray: '#thumb-tray',	// Thumbnail tray
    thumb_list: '#thumb-list',	// Thumbnail list
    slide_list: '#slide-list',	// Slide link list

    // Internal variables
    current_slide: 0,			// Current slide number
    in_animation: false,		// Prevents animations from stacking
    is_paused: false,		// Tracks paused on/off
    hover_pause: false,		// If slideshow is paused from hover
    slideshow_interval: false,		// Stores slideshow timer					
    update_images: false,		// Trigger to update images after slide jump
    options: {}			// Stores assembled options list

  };


  /* Default Options
	----------------------------*/
  $.supersized.defaultOptions = {

    // Functionality
    slideshow: 1,			// Slideshow on/off
    autoplay: 1,			// Slideshow starts playing automatically
    auto_exit: 0,      // Exit the slideshow when the last slide is finished
    start_slide: 1,			// Start slide (0 is random)
    loop: 1,			// Enables moving between the last and first slide.
    random: 0,			// Randomize slide order (Ignores start slide)
    slide_interval: 5000,		// Length between transitions
    transition: 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
    transition_speed: 750,		// Speed of transition
    new_window: 1,			// Image links open in new window/tab
    pause_hover: 0,			// Pause slideshow on hover
    keyboard_nav: 1,			// Keyboard navigation on/off
    performance: 1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
    image_protect: 1,			// Disables image dragging and right click with Javascript

    // Size & Position
    fit_always: 0,			// Image will never exceed browser width or height (Ignores min. dimensions)
    fit_landscape: 0,			// Landscape images will not exceed browser width
    fit_portrait: 1,			// Portrait images will not exceed browser height  			   
    min_width: 0,			// Min width allowed (in pixels)
    min_height: 0,			// Min height allowed (in pixels)
    horizontal_center: 1,			// Horizontally center background
    vertical_center: 1,			// Vertically center background


    // Components							
    slide_links: 1,			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
    thumb_links: 1,			// Individual thumb links for each slide
    thumbnail_navigation: 0,			// Thumbnail navigation
    on_destroy: function () { } // Empty implementation for on_destroy event, may be overridden by user

  };

  $.fn.supersized = function (options) {
    return this.each(function () {
      (new $.supersized(options));
    });
  };

})(jQuery);

/*
	supersized.shutter.js
	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1
	
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/

(function ($) {

  theme = {


    /* Initial Placement
		----------------------------*/
    _init: function () {

      // Configure Slide Links
      if (api.options.slide_links) {
        // Note: This code is repeated in the resize event, so if you change it here do it there, too.
        var maxSlideListWidth = $(vars.slide_list).parent().width() - 400; // Constrain the slide bullets area width so they don't cover buttons
        $(vars.slide_list).css('margin-left', -$(vars.slide_list).width() / 2).css('max-width', maxSlideListWidth);
      }

      // Start progressbar if autoplay enabled
      if (api.options.autoplay) {
        if (api.options.progress_bar) theme.progressBar(); else $(vars.progress_bar).parent().hide();
      } else {
        if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", api.options.image_path + "play.png");	// If pause play button is image, swap src
        if (api.options.progress_bar)
          $(vars.progress_bar).stop().css({ left: -$(window).width() });	//  Place progress bar
        else
          $(vars.progress_bar).parent().hide();
      }


      /* Thumbnail Tray
			----------------------------*/
      // Hide tray off screen
      $(vars.thumb_tray).css({ bottom: -($(vars.thumb_tray).outerHeight() + 5) });

      // Thumbnail Tray Toggle
      $(vars.tray_button).toggle(function () {
        $(vars.thumb_tray).stop().animate({ bottom: 0, avoidTransforms: true }, 300);
        if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", api.options.image_path + "button-tray-down.png");
        return false;
      }, function () {
        $(vars.thumb_tray).stop().animate({ bottom: -($(vars.thumb_tray).outerHeight() + 5), avoidTransforms: true }, 300);
        if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", api.options.image_path + "button-tray-up.png");
        return false;
      });

      // Make thumb tray proper size
      $(vars.thumb_list).width($('> li', vars.thumb_list).length * $('> li', vars.thumb_list).outerWidth(true));	//Adjust to true width of thumb markers

      // Display total slides
      if ($(vars.slide_total).length) {
        $(vars.slide_total).html(api.options.slides.length);
      }


      /* Thumbnail Tray Navigation
			----------------------------*/
      if (api.options.thumb_links) {
        //Hide thumb arrows if not needed
        if ($(vars.thumb_list).width() <= $(vars.thumb_tray).width()) {
          $(vars.thumb_back + ',' + vars.thumb_forward).fadeOut(0);
        }

        // Thumb Intervals
        vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);
        vars.thumb_page = 0;

        // Cycle thumbs forward
        $(vars.thumb_forward).click(function () {
          if (vars.thumb_page - vars.thumb_interval <= -$(vars.thumb_list).width()) {
            vars.thumb_page = 0;
            $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
          } else {
            vars.thumb_page = vars.thumb_page - vars.thumb_interval;
            $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
          }
        });

        // Cycle thumbs backwards
        $(vars.thumb_back).click(function () {
          if (vars.thumb_page + vars.thumb_interval > 0) {
            vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
            if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
            $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
          } else {
            vars.thumb_page = vars.thumb_page + vars.thumb_interval;
            $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
          }
        });

      }


      /* Navigation Items
			----------------------------*/
      $(vars.next_slide).click(function () {
        api.nextSlide();
      });

      $(vars.prev_slide).click(function () {
        api.prevSlide();
      });

      // Full Opacity on Hover
      if (jQuery.support.opacity) {
        $(vars.prev_slide + ',' + vars.next_slide).mouseover(function () {
          $(this).stop().animate({ opacity: 1 }, 100);
        }).mouseout(function () {
          $(this).stop().animate({ opacity: 0.6 }, 100);
        });
      }

      if (api.options.thumbnail_navigation) {
        // Next thumbnail clicked
        $(vars.next_thumb).click(function () {
          api.nextSlide();
        });
        // Previous thumbnail clicked
        $(vars.prev_thumb).click(function () {
          api.prevSlide();
        });
      }

      $(vars.play_button).click(function () {
        api.playToggle();
      });


      /* Thumbnail Mouse Scrub
			----------------------------*/
      if (api.options.mouse_scrub) {
        $(vars.thumb_tray).mousemove(function (e) {
          var containerWidth = $(vars.thumb_tray).width(),
						listWidth = $(vars.thumb_list).width();
          if (listWidth > containerWidth) {
            var mousePos = 1,
							diff = e.pageX - mousePos;
            if (diff > 10 || diff < -10) {
              mousePos = e.pageX;
              newX = (containerWidth - listWidth) * (e.pageX / containerWidth);
              diff = parseInt(Math.abs(parseInt($(vars.thumb_list).css('left')) - newX)).toFixed(0);
              $(vars.thumb_list).stop().animate({ 'left': newX }, { duration: diff * 3, easing: 'easeOutExpo' });
            }
          }
        });
      }


      /* Window Resize
			----------------------------*/
      $(window).resize(function () {

        // Delay progress bar on resize
        if (api.options.progress_bar && !vars.in_animation) {
          if (vars.slideshow_interval) clearInterval(vars.slideshow_interval);
          if (api.options.slides.length - 1 > 0) clearInterval(vars.slideshow_interval);

          $(vars.progress_bar).stop().css({ left: -$(window).width() });

          if (!vars.progressDelay && api.options.slideshow) {
            // Delay slideshow from resuming so Chrome can refocus images
            vars.progressDelay = setTimeout(function () {
              if (!vars.is_paused) {
                theme.progressBar();
                vars.slideshow_interval = setInterval(api.nextSlide, api.options.slide_interval);
              }
              vars.progressDelay = false;
            }, 1000);
          }
        }

        // Thumb Links
        if (api.options.thumb_links && vars.thumb_tray.length) {
          // Update Thumb Interval & Page
          vars.thumb_page = 0;
          vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);

          // Adjust thumbnail markers
          if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()) {
            $(vars.thumb_back + ',' + vars.thumb_forward).fadeIn('fast');
            $(vars.thumb_list).stop().animate({ 'left': 0 }, 200);
          } else {
            $(vars.thumb_back + ',' + vars.thumb_forward).fadeOut('fast');
          }

        }

        // Configure Slide Links
        if (api.options.slide_links) {
          // Note: This code is repeated in the _init function, so if you change it here do it there, too.
          maxSlideListWidth = $(vars.slide_list).parent().width() - 400; // Constrain the slide bullets area width so they don't cover buttons
          $(vars.slide_list).css('margin-left', -$(vars.slide_list).width() / 2).css('max-width', maxSlideListWidth);
          console.log(maxSlideListWidth);
        }
      });


    },


    /* Go To Slide
		----------------------------*/
    goTo: function () {
      if (api.options.progress_bar && !vars.is_paused) {
        $(vars.progress_bar).stop().css({ left: -$(window).width() });
        theme.progressBar();
      }
    },

    /* Play & Pause Toggle
		----------------------------*/
    playToggle: function (state) {

      if (state == 'play') {
        // If image, swap to pause
        if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", api.options.image_path + "pause.png");
        if (api.options.progress_bar && !vars.is_paused) theme.progressBar();
      } else if (state == 'pause') {
        // If image, swap to play
        if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", api.options.image_path + "play.png");
        if (api.options.progress_bar && vars.is_paused) $(vars.progress_bar).stop().css({ left: -$(window).width() });
      }

    },


    /* Before Slide Transition
		----------------------------*/
    beforeAnimation: function (direction) {
      if (api.options.progress_bar && !vars.is_paused) $(vars.progress_bar).stop().css({ left: -$(window).width() });

      /* Update Fields
      ----------------------------*/
      // Update slide caption
      if ($(vars.slide_caption).length) {
        (api.getField('title')) ? $(vars.slide_caption).html(api.getField('title')) : $(vars.slide_caption).html('');
      }
      // Update slide number
      if (vars.slide_current.length) {
        $(vars.slide_current).html(vars.current_slide + 1);
      }


      // Highlight current thumbnail and adjust row position
      if (api.options.thumb_links) {

        $('.current-thumb').removeClass('current-thumb');
        $('li', vars.thumb_list).eq(vars.current_slide).addClass('current-thumb');

        // If thumb out of view
        if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()) {
          // If next slide direction
          if (direction == 'next') {
            if (vars.current_slide == 0) {
              vars.thumb_page = 0;
              $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
            } else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left >= vars.thumb_interval) {
              vars.thumb_page = vars.thumb_page - vars.thumb_interval;
              $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
            }
            // If previous slide direction
          } else if (direction == 'prev') {
            if (vars.current_slide == api.options.slides.length - 1) {
              vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
              if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
              $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
            } else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left < 0) {
              if (vars.thumb_page + vars.thumb_interval > 0) return false;
              vars.thumb_page = vars.thumb_page + vars.thumb_interval;
              $(vars.thumb_list).stop().animate({ 'left': vars.thumb_page }, { duration: 500, easing: 'easeOutExpo' });
            }
          }
        }


      }

    },


    /* After Slide Transition
		----------------------------*/
    afterAnimation: function () {
      if (api.options.progress_bar && !vars.is_paused) theme.progressBar();	//  Start progress bar
    },


    /* Progress Bar
		----------------------------*/
    progressBar: function () {
      $(vars.progress_bar).stop().css({ left: -$(window).width() }).animate({ left: 0 }, api.options.slide_interval);
    }


  };


  /* Theme Specific Variables
  ----------------------------*/
  $.supersized.themeVars = {

    // Internal Variables
    progress_delay: false,				// Delay after resize before resuming slideshow
    thumb_page: false,				// Thumbnail page
    thumb_interval: false,				// Thumbnail interval

    // General Elements							
    play_button: '#pauseplay',		// Play/Pause button
    next_slide: '#nextslide',		// Next slide button
    prev_slide: '#prevslide',		// Prev slide button
    next_thumb: '#nextthumb',		// Next slide thumb button
    prev_thumb: '#prevthumb',		// Prev slide thumb button

    slide_caption: '#slidecaption',	// Slide caption
    slide_current: '.slidenumber',		// Current slide number
    slide_total: '.totalslides',		// Total Slides
    slide_list: '#slide-list',		// Slide jump list							

    thumb_tray: '#thumb-tray',		// Thumbnail tray
    thumb_list: '#thumb-list',		// Thumbnail list
    thumb_forward: '#thumb-forward',	// Cycles forward through thumbnail list
    thumb_back: '#thumb-back',		// Cycles backwards through thumbnail list
    tray_arrow: '#tray-arrow',		// Thumbnail tray button arrow
    tray_button: '#tray-button',		// Thumbnail tray button

    progress_bar: '#progress-bar'		// Progress bar

  };

  /* Theme Specific Options
  ----------------------------*/
  $.supersized.themeOptions = {

    progress_bar: 1,		// Timer for each slide											
    image_path: 'img/',				// Default image path
    mouse_scrub: 0,		// Thumbnails move with mouse
    // html_template contains the HTML for the slideshow controls
    html_template: '\
<div class="ssControlsContainer"> \
    <!--Thumbnail Navigation--> \
    <div id="prevthumb"></div> \
    <div id="nextthumb"></div> \
\
    <!--Arrow Navigation--> \
    <a id="prevslide" class="load-item"></a> \
    <a id="nextslide" class="load-item"></a> \
\
    <div id="thumb-tray" class="load-item"> \
      <div id="thumb-back"></div> \
      <div id="thumb-forward"></div> \
    </div> \
\
    <!--Time Bar--> \
    <div id="progress-back" class="load-item"> \
      <div id="progress-bar"></div> \
    </div> \
\
    <!--Control Bar--> \
    <div id="controls-wrapper" class="load-item"> \
      <div id="controls"> \
\
        <a id="play-button"> \
          <img id="pauseplay" src="img/pause.png" /></a> \
\
        <a id="stop-button"> \
          <img src="img/stop.png" /></a> \
\
        <!--Slide counter--> \
        <div id="slidecounter"> \
          <span class="slidenumber"></span>/ <span class="totalslides"></span> \
        </div> \
\
        <!--Slide captions displayed here--> \
        <div id="slidecaption"></div> \
\
        <!--Thumb Tray button--> \
        <a id="tray-button"> \
          <img id="tray-arrow" src="img/button-tray-up.png" /></a> \
\
        <!--Navigation--> \
        <ul id="slide-list"></ul> \
\
      </div> \
    </div> \
</div>'

  };


})(jQuery);

//#endregion End supersized

//#region MultiSelect

/*
 * jQuery MultiSelect UI Widget 1.13
 * Copyright (c) 2012 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function ($, undefined) {

  var multiselectID = 0;

  $.widget("ech.multiselect", {

    // default options
    options: {
      header: true,
      height: 175,
      minWidth: 225,
      classes: '',
      checkAllText: 'Check all',
      uncheckAllText: 'Uncheck all',
      noneSelectedText: 'Select options',
      selectedText: '# selected',
      selectedList: 0,
      show: null,
      hide: null,
      autoOpen: false,
      multiple: true,
      position: {}
    },

    _create: function () {
      var el = this.element.hide(),
        o = this.options;

      this.speed = $.fx.speeds._default; // default speed for effects
      this._isOpen = false; // assume no

      var
        button = (this.button = $('<button type="button"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>'))
          .addClass('ui-multiselect ui-widget ui-state-default ui-corner-all')
          .addClass(o.classes)
          .attr({ 'title': el.attr('title'), 'aria-haspopup': true, 'tabIndex': el.attr('tabIndex') })
          .insertAfter(el),

        buttonlabel = (this.buttonlabel = $('<span />'))
          .html(o.noneSelectedText)
          .appendTo(button),

        menu = (this.menu = $('<div />'))
          .addClass('ui-multiselect-menu ui-widget ui-widget-content ui-corner-all')
          .addClass(o.classes)
          .appendTo(document.body),

        header = (this.header = $('<div />'))
          .addClass('ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix')
          .appendTo(menu),

        headerLinkContainer = (this.headerLinkContainer = $('<ul />'))
          .addClass('ui-helper-reset')
          .html(function () {
            if (o.header === true) {
              return '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + '</span></a></li>';
            } else if (typeof o.header === "string") {
              return '<li>' + o.header + '</li>';
            } else {
              return '';
            }
          })
          .append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>')
          .appendTo(header),

        checkboxContainer = (this.checkboxContainer = $('<ul />'))
          .addClass('ui-multiselect-checkboxes ui-helper-reset')
          .appendTo(menu);

      // perform event bindings
      this._bindEvents();

      // build menu
      this.refresh(true);

      // some addl. logic for single selects
      if (!o.multiple) {
        menu.addClass('ui-multiselect-single');
      }
    },

    _init: function () {
      if (this.options.header === false) {
        this.header.hide();
      }
      if (!this.options.multiple) {
        this.headerLinkContainer.find('.ui-multiselect-all, .ui-multiselect-none').hide();
      }
      if (this.options.autoOpen) {
        this.open();
      }
      if (this.element.is(':disabled')) {
        this.disable();
      }
    },

    refresh: function (init) {
      var el = this.element,
        o = this.options,
        menu = this.menu,
        checkboxContainer = this.checkboxContainer,
        optgroups = [],
        html = "",
        id = el.attr('id') || multiselectID++; // unique ID for the label & option tags

      // build items
      el.find('option').each(function (i) {
        var $this = $(this),
          parent = this.parentNode,
          title = this.innerHTML,
          description = this.title,
          value = this.value,
          inputID = 'ui-multiselect-' + (this.id || id + '-option-' + i),
          isDisabled = this.disabled,
          isSelected = this.selected,
          labelClasses = ['ui-corner-all'],
          liClasses = (isDisabled ? 'ui-multiselect-disabled ' : ' ') + this.className,
          optLabel;

        // is this an optgroup?
        if (parent.tagName === 'OPTGROUP') {
          optLabel = parent.getAttribute('label');

          // has this optgroup been added already?
          if ($.inArray(optLabel, optgroups) === -1) {
            html += '<li class="ui-multiselect-optgroup-label ' + parent.className + '"><a href="#">' + optLabel + '</a></li>';
            optgroups.push(optLabel);
          }
        }

        if (isDisabled) {
          labelClasses.push('ui-state-disabled');
        }

        // browsers automatically select the first option
        // by default with single selects
        if (isSelected && !o.multiple) {
          labelClasses.push('ui-state-active');
        }

        html += '<li class="' + liClasses + '">';

        // create the label
        html += '<label for="' + inputID + '" title="' + description + '" class="' + labelClasses.join(' ') + '">';
        html += '<input id="' + inputID + '" name="multiselect_' + id + '" type="' + (o.multiple ? "checkbox" : "radio") + '" value="' + value + '" title="' + title + '"';

        // pre-selected?
        if (isSelected) {
          html += ' checked="checked"';
          html += ' aria-selected="true"';
        }

        // disabled?
        if (isDisabled) {
          html += ' disabled="disabled"';
          html += ' aria-disabled="true"';
        }

        // add the title and close everything off
        html += ' /><span>' + title + '</span></label></li>';
      });

      // insert into the DOM
      checkboxContainer.html(html);

      // cache some moar useful elements
      this.labels = menu.find('label');
      this.inputs = this.labels.children('input');

      // set widths
      this._setButtonWidth();
      this._setMenuWidth();

      // remember default value
      this.button[0].defaultValue = this.update();

      // broadcast refresh event; useful for widgets
      if (!init) {
        this._trigger('refresh');
      }
    },

    // updates the button text. call refresh() to rebuild
    update: function () {
      var o = this.options,
        $inputs = this.inputs,
        $checked = $inputs.filter(':checked'),
        numChecked = $checked.length,
        value;

      if (numChecked === 0) {
        value = o.noneSelectedText;
      } else {
        if ($.isFunction(o.selectedText)) {
          value = o.selectedText.call(this, numChecked, $inputs.length, $checked.get());
        } else if (/\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList) {
          value = $checked.map(function () { return $(this).next().html(); }).get().join(', ');
        } else {
          value = o.selectedText.replace('#', numChecked).replace('#', $inputs.length);
        }
      }

      this.buttonlabel.html(value);
      return value;
    },

    // binds events
    _bindEvents: function () {
      var self = this, button = this.button;

      function clickHandler() {
        self[self._isOpen ? 'close' : 'open']();
        return false;
      }

      // webkit doesn't like it when you click on the span :(
      button
        .find('span')
        .bind('click.multiselect', clickHandler);

      // button events
      button.bind({
        click: clickHandler,
        keypress: function (e) {
          switch (e.which) {
            case 27: // esc
            case 38: // up
            case 37: // left
              self.close();
              break;
            case 39: // right
            case 40: // down
              self.open();
              break;
          }
        },
        mouseenter: function () {
          if (!button.hasClass('ui-state-disabled')) {
            $(this).addClass('ui-state-hover');
          }
        },
        mouseleave: function () {
          $(this).removeClass('ui-state-hover');
        },
        focus: function () {
          if (!button.hasClass('ui-state-disabled')) {
            $(this).addClass('ui-state-focus');
          }
        },
        blur: function () {
          $(this).removeClass('ui-state-focus');
        }
      });

      // header links
      this.header
        .delegate('a', 'click.multiselect', function (e) {
          // close link
          if ($(this).hasClass('ui-multiselect-close')) {
            self.close();

            // check all / uncheck all
          } else {
            self[$(this).hasClass('ui-multiselect-all') ? 'checkAll' : 'uncheckAll']();
          }

          e.preventDefault();
        });

      // optgroup label toggle support
      this.menu
        .delegate('li.ui-multiselect-optgroup-label a', 'click.multiselect', function (e) {
          e.preventDefault();

          var $this = $(this),
            $inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input:visible:not(:disabled)'),
            nodes = $inputs.get(),
            label = $this.parent().text();

          // trigger event and bail if the return is false
          if (self._trigger('beforeoptgrouptoggle', e, { inputs: nodes, label: label }) === false) {
            return;
          }

          // toggle inputs
          self._toggleChecked(
            $inputs.filter(':checked').length !== $inputs.length,
            $inputs
          );

          self._trigger('optgrouptoggle', e, {
            inputs: nodes,
            label: label,
            checked: nodes[0].checked
          });
        })
        .delegate('label', 'mouseenter.multiselect', function () {
          if (!$(this).hasClass('ui-state-disabled')) {
            self.labels.removeClass('ui-state-hover');
            $(this).addClass('ui-state-hover').find('input').focus();
          }
        })
        .delegate('label', 'keydown.multiselect', function (e) {
          e.preventDefault();

          switch (e.which) {
            case 9: // tab
            case 27: // esc
              self.close();
              break;
            case 38: // up
            case 40: // down
            case 37: // left
            case 39: // right
              self._traverse(e.which, this);
              break;
            case 13: // enter
              $(this).find('input')[0].click();
              break;
          }
        })
        .delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function (e) {
          var $this = $(this),
            val = this.value,
            checked = this.checked,
            tags = self.element.find('option');

          // bail if this input is disabled or the event is cancelled
          if (this.disabled || self._trigger('click', e, { value: val, text: this.title, checked: checked }) === false) {
            e.preventDefault();
            return;
          }

          // make sure the input has focus. otherwise, the esc key
          // won't close the menu after clicking an item.
          $this.focus();

          // toggle aria state
          $this.attr('aria-selected', checked);

          // change state on the original option tags
          tags.each(function () {
            if (this.value === val) {
              this.selected = checked;
            } else if (!self.options.multiple) {
              this.selected = false;
            }
          });

          // some additional single select-specific logic
          if (!self.options.multiple) {
            self.labels.removeClass('ui-state-active');
            $this.closest('label').toggleClass('ui-state-active', checked);

            // close menu
            self.close();
          }

          // fire change on the select box
          self.element.trigger("change");

          // setTimeout is to fix multiselect issue #14 and #47. caused by jQuery issue #3827
          // http://bugs.jquery.com/ticket/3827
          setTimeout($.proxy(self.update, self), 10);
        });

      // close each widget when clicking on any other element/anywhere else on the page
      $(document).bind('mousedown.multiselect', function (e) {
        if (self._isOpen && !$.contains(self.menu[0], e.target) && !$.contains(self.button[0], e.target) && e.target !== self.button[0]) {
          self.close();
        }
      });

      // deal with form resets.  the problem here is that buttons aren't
      // restored to their defaultValue prop on form reset, and the reset
      // handler fires before the form is actually reset.  delaying it a bit
      // gives the form inputs time to clear.
      $(this.element[0].form).bind('reset.multiselect', function () {
        setTimeout($.proxy(self.refresh, self), 10);
      });
    },

    // set button width
    _setButtonWidth: function () {
      var width = this.element.outerWidth(),
        o = this.options;

      if (/\d/.test(o.minWidth) && width < o.minWidth) {
        width = o.minWidth;
      }

      // set widths
      this.button.width(width);
    },

    // set menu width
    _setMenuWidth: function () {
      var m = this.menu,
        width = this.button.outerWidth() -
          parseInt(m.css('padding-left'), 10) -
          parseInt(m.css('padding-right'), 10) -
          parseInt(m.css('border-right-width'), 10) -
          parseInt(m.css('border-left-width'), 10);

      m.width(width || this.button.outerWidth());
    },

    // move up or down within the menu
    _traverse: function (which, start) {
      var $start = $(start),
        moveToLast = which === 38 || which === 37,

        // select the first li that isn't an optgroup label / disabled
        $next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)')[moveToLast ? 'last' : 'first']();

      // if at the first/last element
      if (!$next.length) {
        var $container = this.menu.find('ul').last();

        // move to the first/last
        this.menu.find('label')[moveToLast ? 'last' : 'first']().trigger('mouseover');

        // set scroll position
        $container.scrollTop(moveToLast ? $container.height() : 0);

      } else {
        $next.find('label').trigger('mouseover');
      }
    },

    // This is an internal function to toggle the checked property and
    // other related attributes of a checkbox.
    //
    // The context of this function should be a checkbox; do not proxy it.
    _toggleState: function (prop, flag) {
      return function () {
        if (!this.disabled) {
          this[prop] = flag;
        }

        if (flag) {
          this.setAttribute('aria-selected', true);
        } else {
          this.removeAttribute('aria-selected');
        }
      };
    },

    _toggleChecked: function (flag, group) {
      var $inputs = (group && group.length) ? group : this.inputs,
        self = this;

      // toggle state on inputs
      $inputs.each(this._toggleState('checked', flag));

      // give the first input focus
      $inputs.eq(0).focus();

      // update button text
      this.update();

      // gather an array of the values that actually changed
      var values = $inputs.map(function () {
        return this.value;
      }).get();

      // toggle state on original option tags
      this.element
        .find('option')
        .each(function () {
          if (!this.disabled && $.inArray(this.value, values) > -1) {
            self._toggleState('selected', flag).call(this);
          }
        });

      // trigger the change event on the select
      if ($inputs.length) {
        this.element.trigger("change");
      }
    },

    _toggleDisabled: function (flag) {
      this.button
        .attr({ 'disabled': flag, 'aria-disabled': flag })[flag ? 'addClass' : 'removeClass']('ui-state-disabled');

      var inputs = this.menu.find('input');
      var key = "ech-multiselect-disabled";

      if (flag) {
        // remember which elements this widget disabled (not pre-disabled)
        // elements, so that they can be restored if the widget is re-enabled.
        inputs = inputs.filter(':enabled')
          .data(key, true)
      } else {
        inputs = inputs.filter(function () {
          return $.data(this, key) === true;
        }).removeData(key);
      }

      inputs
        .attr({ 'disabled': flag, 'arial-disabled': flag })
        .parent()[flag ? 'addClass' : 'removeClass']('ui-state-disabled');

      this.element
        .attr({ 'disabled': flag, 'aria-disabled': flag });
    },

    // open the menu
    open: function (e) {
      var self = this,
        button = this.button,
        menu = this.menu,
        speed = this.speed,
        o = this.options,
        args = [];

      // bail if the multiselectopen event returns false, this widget is disabled, or is already open
      if (this._trigger('beforeopen') === false || button.hasClass('ui-state-disabled') || this._isOpen) {
        return;
      }

      var $container = menu.find('ul').last(),
        effect = o.show,
        pos = button.offset();

      // figure out opening effects/speeds
      if ($.isArray(o.show)) {
        effect = o.show[0];
        speed = o.show[1] || self.speed;
      }

      // if there's an effect, assume jQuery UI is in use
      // build the arguments to pass to show()
      if (effect) {
        args = [effect, speed];
      }

      // set the scroll of the checkbox container
      $container.scrollTop(0).height(o.height);

      // position and show menu
      if ($.ui.position && !$.isEmptyObject(o.position)) {
        o.position.of = o.position.of || button;

        menu
          .show()
          .position(o.position)
          .hide();

        // if position utility is not available...
      } else {
        menu.css({
          top: pos.top + button.outerHeight(),
          left: pos.left
        });
      }

      // show the menu, maybe with a speed/effect combo
      $.fn.show.apply(menu, args);

      // select the first option
      // triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
      // will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
      this.labels.eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');

      button.addClass('ui-state-active');
      this._isOpen = true;
      this._trigger('open');
    },

    // close the menu
    close: function () {
      if (this._trigger('beforeclose') === false) {
        return;
      }

      var o = this.options,
          effect = o.hide,
          speed = this.speed,
          args = [];

      // figure out opening effects/speeds
      if ($.isArray(o.hide)) {
        effect = o.hide[0];
        speed = o.hide[1] || this.speed;
      }

      if (effect) {
        args = [effect, speed];
      }

      $.fn.hide.apply(this.menu, args);
      this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
      this._isOpen = false;
      this._trigger('close');
    },

    enable: function () {
      this._toggleDisabled(false);
    },

    disable: function () {
      this._toggleDisabled(true);
    },

    checkAll: function (e) {
      this._toggleChecked(true);
      this._trigger('checkAll');
    },

    uncheckAll: function () {
      this._toggleChecked(false);
      this._trigger('uncheckAll');
    },

    getChecked: function () {
      return this.menu.find('input').filter(':checked');
    },

    destroy: function () {
      // remove classes + data
      $.Widget.prototype.destroy.call(this);

      this.button.remove();
      this.menu.remove();
      this.element.show();

      return this;
    },

    isOpen: function () {
      return this._isOpen;
    },

    widget: function () {
      return this.menu;
    },

    getButton: function () {
      return this.button;
    },

    // react to option changes after initialization
    _setOption: function (key, value) {
      var menu = this.menu;

      switch (key) {
        case 'header':
          menu.find('div.ui-multiselect-header')[value ? 'show' : 'hide']();
          break;
        case 'checkAllText':
          menu.find('a.ui-multiselect-all span').eq(-1).text(value);
          break;
        case 'uncheckAllText':
          menu.find('a.ui-multiselect-none span').eq(-1).text(value);
          break;
        case 'height':
          menu.find('ul').last().height(parseInt(value, 10));
          break;
        case 'minWidth':
          this.options[key] = parseInt(value, 10);
          this._setButtonWidth();
          this._setMenuWidth();
          break;
        case 'selectedText':
        case 'selectedList':
        case 'noneSelectedText':
          this.options[key] = value; // these all needs to update immediately for the update() call
          this.update();
          break;
        case 'classes':
          menu.add(this.button).removeClass(this.options.classes).addClass(value);
          break;
        case 'multiple':
          menu.toggleClass('ui-multiselect-single', !value);
          this.options.multiple = value;
          this.element[0].multiple = value;
          this.refresh();
      }

      $.Widget.prototype._setOption.apply(this, arguments);
    }
  });

})(jQuery);

//#endregion End MultiSelect

//#region plug-in name goes here

//#endregion End custom plug-in

//#endregion End javascript libraries and jQuery plug-ins