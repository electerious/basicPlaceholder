# basicPlaceholder

Easy-to-use persistent placeholders for input fields. [Try it live on CodePen](http://codepen.io/electerious/pen/JdPJRe).

![basicPlaceholder Screenshot](http://l.electerious.com/uploads/big/26e55552b2178cc210be4e79021de400.png)

## About

basicPlaceholder adds a label to the right side of an input when the original placeholder isn't visible. This is the case when the user enters text or when the `value` attribute of the input contains text.

basicPlaceholder is written in Vanilla JS and works in all modern browsers.

## Installation

	bower install basicPlaceholder
	
## Requirements

basicPlaceholder dependents on the following browser APIs:

- [classList](http://caniuse.com/#feat=classlist)

All of these APIs are capable of being polyfilled in older browser. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## How to use

Include the CSS file in the `head` and the JS file at the end of your `body`:

```html
<link rel="stylesheet" href="dist/basicPlaceholder.min.css">
<script src="dist/basicPlaceholder.min.js"></script>
```

Add inputs to your website and wrap `div`-elements with the class `basicPlaceholder` around them:

```html
<div class="basicPlaceholder">
    <input type="text" placeholder="Placeholder" value="">
</div>
```

Init basicPlaceholder with the following command:

```js
var inputs = document.querySelectorAll('.basicPlaceholder input')

basicPlaceholder.init(inputs)
```

## Custom text

The value of the label is based on the `placeholder` attribute of the associated input. You can customize the text by adding a `data-basicPlaceholder-text` attribute to the input.

```html
<div class="basicPlaceholder">
    <input type="text" placeholder="Placeholder" value="" data-basicPlaceholder-text="Custom">
</div>
```

## Persistent label

Add the `data-basicPlaceholder-persistent` attribute to make the label persistent. It will stay on the right side of the input no matter what happens.

```html
<div class="basicPlaceholder">
    <input type="text" value="" data-basicPlaceholder-persistent data-basicPlaceholder-text="Persistent">
</div>
```

## Error label (Red)

```html
<div class="basicPlaceholder">
    <input type="text" value="" placeholder="Error" data-basicPlaceholder-error>
</div>
```

## Warning label (Yellow)

```html
<div class="basicPlaceholder">
    <input type="text" value="" placeholder="Warning" data-basicPlaceholder-warning>
</div>
```