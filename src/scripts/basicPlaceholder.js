window.basicPlaceholder = {

	errorText: null,
	warningText: null,

	init(inputs = [], opts = {}) {

		basicPlaceholder.errorText   = opts.errorText || 'Invalid'
		basicPlaceholder.warningText = opts.warningText || 'Invalid'

		for (let i = 0; i < inputs.length; ++i) {

			let input = inputs[i]

			// Add placeholder to all existing inputs
			basicPlaceholder._add(input)

			// Update placeholder
			input.onclick = basicPlaceholder._onChange
			input.onkeyup = basicPlaceholder._onChange

		}

		return true

	},

	_isError(input) {

		var error = input.getAttribute('data-basicPlaceholder-error')

		if (error!==null && error!=='false') return true
		else                                 return false

	},

	_isWarning(input) {

		var warning = input.getAttribute('data-basicPlaceholder-warning')

		if (warning!==null && warning!=='false') return true
		else                                     return false

	},

	_isPersistent(input) {

		var persistent = input.getAttribute('data-basicPlaceholder-persistent')

		if (persistent!==null && persistent!=='false') return true
		else                                           return false

	},

	_onChange() {

		var input     = this,
		    isError   = basicPlaceholder._isError(input),
		    isWarning = basicPlaceholder._isWarning(input)

		// Remove error placeholder
		if (isError===true)   basicPlaceholder._remove(input)
		if (isWarning===true) basicPlaceholder._remove(input)

		// Show basicPlaceholder when input contains chars
		if (input.value.length>0) basicPlaceholder._add(input)
		else                      basicPlaceholder._remove(input)

	},

	_add(input) {

		var text         = null,
		    customText   = input.getAttribute('data-basicPlaceholder-text'),
		    wrapper      = input.parentElement,
		    isError      = basicPlaceholder._isError(input),
		    isWarning    = basicPlaceholder._isWarning(input),
		    isPersistent = basicPlaceholder._isPersistent(input),
		    html         = null

		// Do not add a placeholder when ...
		// 1) input empty, not persistent, not an error and not a warning
		// 2) a placeholder has already been added to the input
		if (input.value.length===0 && isPersistent===false && isError===false && isWarning===false) return false
		if (input.getAttribute('data-basicPlaceholder')==='true')                                   return false

		// Set placeholder text
		if (isError===true)        text = basicPlaceholder.errorText
		else if (isWarning===true) text = basicPlaceholder.warningText
		else                       text = input.getAttribute('placeholder') || null

		// Set custom text when available
		if (customText!==null && customText.length>0) text = customText

		// Prevent undefined title
		if (text===null) return false

		// Render and add HTML
		html = basicPlaceholder._render(text)
		wrapper.insertAdjacentHTML('beforeend', html)

		// Set attribute
		input.setAttribute('data-basicPlaceholder', true)

		return true

	},

	_remove(input) {

		var wrapper      = input.parentElement,
		    placeholder  = wrapper.querySelector('.basicPlaceholder__placeholder'),
		    isPersistent = basicPlaceholder._isPersistent(input)

		if (isPersistent===true) return false
		if (placeholder===null)  return false

		placeholder.parentNode.removeChild(placeholder)

		input.removeAttribute('data-basicPlaceholder-error')
		input.removeAttribute('data-basicPlaceholder-warning')
		input.removeAttribute('data-basicPlaceholder')

		return true

	},

	_render(text = '') {

		return `<div class="basicPlaceholder__placeholder">${ text }</a>`

	}

}