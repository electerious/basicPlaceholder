let errorText   = null,
    warningText = null

const init = function(inputs = [], opts = {}) {

	errorText   = opts.errorText || 'Invalid'
	warningText = opts.warningText || 'Invalid'

	for (let i = 0; i < inputs.length; ++i) {

		let input = inputs[i]

		// Add placeholder to all existing inputs
		add(input)

		// Update placeholder
		input.oninput = onChange

	}

	return true

}

const isError = function(input) {

	let error = input.getAttribute('data-basicPlaceholder-error')

	if (error!==null && error!=='false') return true
	else                                 return false

}

const isWarning = function(input) {

	let warning = input.getAttribute('data-basicPlaceholder-warning')

	if (warning!==null && warning!=='false') return true
	else                                     return false

}

const isPersistent = function(input) {

	let persistent = input.getAttribute('data-basicPlaceholder-persistent')

	if (persistent!==null && persistent!=='false') return true
	else                                           return false

}

const onChange = function() {

	let input      = this,
	    _isError   = isError(input),
	    _isWarning = isWarning(input)

	// Remove error placeholder
	if (_isError===true)   remove(input)
	if (_isWarning===true) remove(input)

	// Show basicPlaceholder when input contains chars
	if (input.value.length>0) add(input)
	else                      remove(input)

}

const add = function(input) {

	let text          = null,
	    customText    = input.getAttribute('data-basicPlaceholder-text'),
	    wrapper       = input.parentElement,
	    _isError      = isError(input),
	    _isWarning    = isWarning(input),
	    _isPersistent = isPersistent(input),
	    html          = null

	// Do not add a placeholder when ...
	// 1) input empty, not persistent, not an error and not a warning
	// 2) a placeholder has already been added to the input
	if (input.value.length===0 && _isPersistent===false && _isError===false && _isWarning===false) return false
	if (input.getAttribute('data-basicPlaceholder')==='true')                                      return false

	// Set placeholder text
	if (_isError===true)        text = errorText
	else if (_isWarning===true) text = warningText
	else                        text = input.getAttribute('placeholder') || null

	// Set custom text when available
	if (customText!==null && customText.length>0) text = customText

	// Prevent undefined title
	if (text===null) return false

	// Render and add HTML
	html = render(text)
	wrapper.insertAdjacentHTML('beforeend', html)

	// Set attribute
	input.setAttribute('data-basicPlaceholder', true)

	return true

}

const remove = function(input) {

	let wrapper       = input.parentElement,
	    placeholder   = wrapper.querySelector('.basicPlaceholder__placeholder'),
	    _isPersistent = isPersistent(input)

	if (_isPersistent===true) return false
	if (placeholder===null)   return false

	placeholder.parentElement.removeChild(placeholder)

	input.removeAttribute('data-basicPlaceholder-error')
	input.removeAttribute('data-basicPlaceholder-warning')
	input.removeAttribute('data-basicPlaceholder')

	return true

}

const render = function(text = '') {

	return `<div class="basicPlaceholder__placeholder">${ text }</a>`

}

return { init }