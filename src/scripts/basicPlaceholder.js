window.basicPlaceholder = {

	_errorClass: 'error',
	_iconHTML: '<span class="fa fa-warning"></span>',

	_dom(elem) {

		if (elem===undefined)	return $('.basicPlaceholder')
		else					return $('.basicPlaceholder').find(elem)

	},

	init() {

		basicPlaceholder._dom('input').each(function() { basicPlaceholder._add($(this)) })
		basicPlaceholder._dom('input').on('keyup click', basicPlaceholder._onKeyUp)

	},

	_isError($input) {

		return $input.hasClass(basicPlaceholder._errorClass)

	},

	_onKeyUp() {

		var $input = $(this)

		// Remove error placeholder
		if (basicPlaceholder._isError($input)===true) basicPlaceholder._remove($input)

		// Show basicPlaceholder when input contains chars
		if ($input.val().length>0)	basicPlaceholder._add($input)
		else						basicPlaceholder._remove($input)

	},

	_add($input) {

		var text	= null,
			html	= null,
			isError	= basicPlaceholder._isError($input)

		// Do not add a placeholder when ...
		// 1) input empty and not an error
		// 2) a placeholder has already been added to the input
		if ($input.val().length===0&&isError===false)		return false
		if ($input.attr('data-basicPlaceholder')==='true')	return false

		// Set placeholder text
		if (isError===true)	text = basicPlaceholder._iconHTML
		else				text = $input.attr('placeholder') || null

		// Prevent undefined title
		if (text===null) return false

		// Render and add HTML
		html = basicPlaceholder._render(text)
		$input.after(html)
		$input.attr('data-basicPlaceholder', true)

		return true

	},

	_remove($input) {

		var $wrapper		= $input.parent(),
			$placeholder	= $wrapper.find('.basicPlaceholder__placeholder'),
			persistent		= $input.attr('data-basicPlaceholder-persistent')

		if (persistent!==undefined) return false

		$placeholder.remove()
		$input.removeClass(basicPlaceholder._errorClass)
		$input.attr('data-basicPlaceholder', false)

		return true

	},

	_render(text = '') {

		return `<div class="basicPlaceholder__placeholder">${ text }</a>`

	}

}