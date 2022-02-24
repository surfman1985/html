/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/pure-js-validator/src/validator.js":
/*!***************************************************************************************************!*\
  !*** D:/web/htmlacademy/surfman_dev/flava/client/node_modules/pure-js-validator/src/validator.js ***!
  \***************************************************************************************************/
/*! exports provided: Validator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validator", function() { return Validator; });
/**
* Simple Encapsulation Class template
*/
/* eslint-disable */

// console.log(root)

/**
 * Common object params
 * @type {Object}
 */
 var common = {
	publicMethods: ['validate', 'formatString', 'destroy', 'reload', 'getFormHandle', 'getFields', 'showErrors', 'hideErrors'],
	className: 'Validator'
},

	// main constructor
	Protected = function (formHandle, submitCallback, settings) {

		formHandle.JsValidator = this;

		this.settings = {

			// Validation of a current field after the events of "change", "keyup", "blur"
			onAir: true,

			// Show validation errors
			showErrors: true,

			// Auto-hide the error messages
			autoHideErrors: false,

			// Timeout auto-hide error messages
			autoHideErrorsTimeout: 2000,

			// Language error messages
			locale: 'en',

			// Object for custom error messages
			messages: {},

			// Object for custom rules
			rules: {},

			// classname for error messages
			errorClassName: 'error',

			// remove spaces from validation field values
			removeSpaces: false,

			// tracking of new elements
			autoTracking: true,

			// events list for binding
			eventsList: ['keyup', 'change', 'blur']
		};











		var self = this;

		// set handle
		this.formHandle = formHandle || null;

		// set callback
		this.submitCallback = submitCallback || null;

		// get fields and rules
		this.fields = this.getFields(this.formHandle.querySelectorAll('[data-rule]'));





		// apply custom settings
		this.applySettings(settings || {});






		this.submitCallback = this.submitCallback.bind(this);
		this._eventChangeWithDelay = this._eventChangeWithDelay.bind(this);
		this._eventChange = this._eventChange.bind(this);
		this._eventSubmit = this._eventSubmit.bind(this);



		// bind events
		this.submitCallback && this.eventsBuilder('addEventListener');







		// autotracking for new form elements
		this.settings.autoTracking && ('MutationObserver' in window) && new MutationObserver(function (mutationRecords) {

			[].forEach.call(mutationRecords, function (mutation) {
				switch (mutation.type) {
					case 'subtree':
					case 'childList':

						var reloadFlag = false,
							childsArray = [];

						[].forEach.call(mutation.addedNodes, function (targetElem) {

							childsArray = targetElem.querySelectorAll ? targetElem.querySelectorAll('*') : [];

							if (['SELECT', 'INPUT', 'TEXTAREA', 'CHECKBOX', 'RADIOBUTTON'].indexOf(targetElem.tagName) !== -1) {
								reloadFlag = true;
							};

							!reloadFlag && [].forEach.call(childsArray, function (elem) {
								if (['SELECT', 'INPUT', 'TEXTAREA', 'CHECKBOX', 'RADIOBUTTON'].indexOf(elem.tagName) !== -1) {
									reloadFlag = true;
								}
							});


						});
						reloadFlag && self.reload();
						break;
				}
			});

		}).observe(this.formHandle, {
			childList: true,
			subtree: true
		});



		return this;
	};


/**
 * Main prototype
 * @type {Object}
 */
Protected.prototype = {





	messages: {

		// English
		en: {
			required: {
				empty: 'This field is required',
				incorrect: 'Incorrect value'
			},
			notzero: {
				empty: 'Please make a selection',
				incorrect: 'Incorrect value'
			},
			integer: {
				empty: 'Enter an integer value',
				incorrect: 'Incorrect integer value'
			},
			float: {
				empty: 'Enter an float number',
				incorrect: 'Incorrect float'
			},
			min: {
				empty: 'Enter more',
				incorrect: 'Enter more'
			},
			max: {
				empty: 'Enter less',
				incorrect: 'Enter less'
			},
			between: {
				empty: 'Enter the between {0}-{1}',
				incorrect: 'Enter the between {0}-{1}'
			},
			name: {
				empty: 'Please, enter your name',
				incorrect: 'Incorrect name'
			},
			lastname: {
				empty: 'Please, enter your lastname',
				incorrect: 'Incorrect lastname'
			},
			phone: {
				empty: 'Please, enter the phone number',
				incorrect: 'Incorrect phone number'
			},
			email: {
				empty: 'Please, enter your email address',
				incorrect: 'Incorrect email address'
			},
			length: {
				empty: 'Please, Enter a minimum of {0} characters and a maximum of {1}',
				incorrect: 'Incorrect. Enter a minimum of {0} characters and a maximum of {1}'
			},
			minlength: {
				empty: 'Please, enter at least {0} characters',
				incorrect: 'You have entered less than {0} characters'
			},
			maxlength: {
				empty: 'Please, enter at maximum {0} characters',
				incorrect: 'You have entered more than {0} characters'
			},
			maxfilesize: {
				empty: 'The size of one or more selected files larger than {0} {1}',
				incorrect: 'The size of one or more selected files larger than {0} {1}'
			},
			fileextension: {
				empty: 'Select file',
				incorrect: 'One or more files have an invalid type'
			}
		}
	},

	// rules
	rules: {
		required: function (value) {
			return '' !== value;
		},
		notzero: function (value) {
			return parseInt(value, 10) > 0;
		},
		integer: function (value) {
			return new RegExp(/^[0-9]+$/gi).test(value);
		},
		float: function (value) {
			value = value.toString().replace(/\,/, '.');
			return this.integer(value) || new RegExp(/^([0-9])+(\.)([0-9]+$)/gi).test(value);
		},
		min: function (value, params) {
			if (this.float(value)) {
				return parseFloat(value) >= parseFloat(params[0]);
			}
			return parseInt(value, 10) >= parseInt(params[0], 10);
		},
		max: function (value, params) {
			if (this.float(value)) {
				return parseFloat(value) <= parseFloat(params[0]);
			}
			return parseInt(value, 10) <= parseInt(params[0], 10);
		},
		between: function (value, params) {

			params[1] = params[1] || 999999;

			if (this.float(value)) {
				return parseFloat(value) >= parseFloat(params[0]) && parseFloat(value) <= parseFloat(params[1]);
			}
			if (this.integer(value)) {
				return parseInt(value, 10) >= parseInt(params[0], 10) && parseInt(value, 10) <= parseInt(params[1], 10);
			}
			return false;
		},
		name: function (value) {
			if (value.length > 0 && value.length < 2) {
				return false;
			}
			return new RegExp(/^[a-zA-Z\sа-яА-ЯёЁ\-]+$/g).test(value);
		},
		lastname: function (value) {
			return this.name(value);
		},
		phone: function (value) {
			if (value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi) && value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi)[0].length < 6) {
				return false;
			}
			return new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/g).test(value);
		},
		email: function (value) {
			return new RegExp(/^(("[\w-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(value);
		},
		length: function (value, params) {
			return this.between(value.replace(/\s{2,}/g, ' ').length, params);
		},
		maxlength: function (value, params) {
			return this.max(value.replace(/\s{2,}/g, ' ').length, params);
		},
		minlength: function (value, params) {
			return this.min(value.replace(/\s{2,}/g, ' ').length, params);
		},
		maxfilesize: function (value, params) {
			var i,
				l = value.length,
				unitsOffset = 1;

			switch (params[1].toLowerCase()) {
				case 'b':
					unitsOffset = 1;
					break;

				case 'kb':
					unitsOffset = 1024;
					break;

				case 'mb':
					unitsOffset = 1048576;
					break;

				case 'gb':
					unitsOffset = 1073741824;
					break;

				case 'tb':
					unitsOffset = 1099511627776;
					break;
			}

			for (i = 0; i < l; i += 1) {
				if (parseFloat(value[i]) > (parseFloat(params[0]) * unitsOffset)) {
					return false;
				}
			}

			return true;
		},
		fileextension: function (value, params) {
			var i,
				a,
				l = params.length,
				b = value.length,
				cmpResC = 0;

			for (i = 0; i < l; i += 1) {
				for (a = 0; a < b; a += 1) {
					if (params[i] === value[a].split('.').pop()) {
						cmpResC += 1;
					}
				}
			}

			return value.length === cmpResC ? true : false;
		}
	},

	orderFields: function (attrName, attrValue) {

		var self = this,
			retObj = {};

		!!attrName && !!attrValue && Object.keys(this.fields).forEach(function (field) {
			if (self.fields[field].handle[attrName] && self.fields[field].handle[attrName] === attrValue) {
				retObj[field] = self.fields[field];
			}
		});

		return retObj;
	},
	_eventSubmit: function (e) {

		e.preventDefault();

		//hide errors
		this.hideErrors(false, true);

		//show errors if validation failure
		!this.validate() && this.showErrors();

		//callback
		(this.submitCallback(this.errors || null, this.errors ? false : true) === true) && this.formHandle.submit();
	},
	_eventChange: function (e) {

		var radioBtns,
			self = this;

		//remove spaces
		if (this.settings.removeSpaces && new RegExp(/\s{2,}/g).test(e.target.value)) {
			e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
		}

		//if is radio buttons
		if (e.target.type === 'radio') {

			//get radio groupe
			radioBtns = this.orderFields('name', e.target.name);

			Object.keys(radioBtns).forEach(function (btn) {
				self.hideErrors(radioBtns[btn].handle);
			});

		} else {
			//hide errors for this
			this.hideErrors(e.target);
		}




		//validate and show errors for this
		if (!this.validate(e.target)) {

			this.showErrors(e.target);
			!this.settings.showErrors && this.submitCallback(this.errors, false);

		}
	},
	_eventChangeWithDelay: function (e) {
		var self = this;

		if (this.intervalID) {
			clearTimeout(this.intervalID);
		}

		this.intervalID = setTimeout(function () {
			self._eventChange.apply(self, [e]);
		}, 400);
	},


	applySettings: function (settings) {

		var self = this;

		// apply rules
		settings.rules && Object.keys(settings.rules).forEach(function (ruleName) {
			self.rules[ruleName] = settings.rules[ruleName];
		});

		// apply messages
		settings.messages && Object.keys(settings.messages).forEach(function (locale) {
			Object.keys(settings.messages[locale]).forEach(function (ruleName) {
				Object.keys(settings.messages[locale][ruleName]).forEach(function (param) {
					self.settings.messages[locale] = self.settings.messages[locale] || {};
					self.settings.messages[locale][ruleName] = self.settings.messages[locale][ruleName] || {};
					self.settings.messages[locale][ruleName][param] = settings.messages[locale][ruleName][param];
				});
			});
		});

		// apply other settings
		Object.keys(settings).forEach(function (param) {
			self.settings[param] = settings[param];
		});

		return this;
	},


	getFields: function (fields) {

		var retData = {},
			rules = [],
			params = [];

		fields = fields || this.formHandle.querySelectorAll('[data-rule]');

		// each fields with data-rule attribute
		Object.keys(fields).forEach(function (fieldIndex) {

			rules = fields[fieldIndex].getAttribute('data-rule').split('|');

			Object.keys(rules).forEach(function (ruleIndex) {

				// parse rule
				if (rules[ruleIndex].match(/-/gi)) {

					params = rules[ruleIndex].split('-');
					rules[ruleIndex] = params[0];
					params = params.splice(1);

					rules[ruleIndex] = [rules[ruleIndex], params];
				} else {
					rules[ruleIndex] = [rules[ruleIndex], []];
				}
			});

			retData[fieldIndex] = {
				name: fields[fieldIndex].getAttribute('name'),
				rules: rules,
				defaultValue: fields[fieldIndex].getAttribute('data-default'),
				handle: fields[fieldIndex],
				intervalID: null
			};
		});

		return retData;
	},

	validate: function (validationField) {

		var self = this,
			fields = validationField ? this.getFields([validationField]) : this.fields,
			result,
			ruleName,
			params,
			defaultValue,
			value,
			message,
			messageType = null;

		this.errors = this.errors ? null : this.errors;

		Object.keys(fields).forEach(function (n) {

			result = true;

			// loop rules of this field
			fields[n].rules && Object.keys(fields[n].rules).forEach(function (ruleIndex) {

				// set rule data
				ruleName = fields[n].rules[ruleIndex][0];
				params = fields[n].rules[ruleIndex][1];
				defaultValue = fields[n].defaultValue;
				value = fields[n].handle.value;


				switch (fields[n].handle.type) {

					case 'checkbox':
						!fields[n].handle.checked && (value = '');
						break;

					case 'radio':
						// get radio groupe
						var radioBtns = self.orderFields('name', fields[n].handle.name),
							checked = false;

						Object.keys(radioBtns).forEach(function (i) {
							radioBtns[i].handle.checked && (checked = true);
						});

						if (!checked) {

							// add an error to one element
							Object.keys(radioBtns).forEach(function (i) {
								try {
									message = self.settings.messages[self.settings.locale][ruleName].empty;
								} catch (e) {
									message = self.messages[self.settings.locale][ruleName].empty;
								}
							});

							// set value as for empty rules
							value = '';
						}
						break;

					case 'file':

						// if the files were selected
						if (fields[n].handle.files && fields[n].handle.files.length) {

							value = [];

							Object.keys(fields[n].handle.files).forEach(function (fileIndex) {

								switch (ruleName) {
									case 'maxfilesize':
										value.push(fields[n].handle.files[fileIndex].size);
										break;

									case 'fileextension':
										value.push(fields[n].handle.files[fileIndex].name);
										break;
								}
							});

						}

						break;
				}


				if (result && !(value === '' && !fields[n].rules.join('|').match(/\|{0,1}required\|{0,1}/))) {

					// if exist default value and value is eq default
					if (result && defaultValue && value !== defaultValue) {

						result = false;
						messageType = 'incorrect';

						// if default value not exist
					} else if (result && self.rules[ruleName] && !self.rules[ruleName](value, params)) {

						// set message to empty data
						if ('' === value) {
							result = false;
							messageType = 'empty';

							// set message to incorrect data
						} else {
							result = false;
							messageType = 'incorrect';
						}
					}

					if (result) {
						self.hideErrors(fields[n].handle, true);

					} else {

						// define errors stack if not exist
						self.errors = self.errors || {};

						// append error messages
						if (ruleName === 'required' && fields[n].rules[1] && fields[n].rules[1][0]) {
							ruleName = fields[n].rules[1][0];
							messageType = 'empty';
						}

						try {
							try {
								message = self.settings.messages[self.settings.locale][ruleName][messageType];
							} catch (e) {
								message = self.messages[self.settings.locale][ruleName][messageType];
							}
						} catch (e) {
							ruleName = 'required';
							message = self.messages[self.settings.locale][ruleName][messageType];
						}

						// push value into params if params is empty
						!params.length && params.push(value);

						// add errors
						self.errors[n] = {
							name: fields[n].name,
							errorText: self.formatString(message, params)
						};

						// call callback if exist
						if (!self.submitCallback) {
							self.errors[n].handle = fields[n].handle;
						}
					}
				}
			});
		});


		// run callback if callback is exists and not errors or return error data object
		if (this.submitCallback) {
			return (this.errors) ? false : true;
		}

		return this.errors || true;

	},


	hideErrors: function (validationField, removeClass) {

		var self = this,
			errorDiv;


		Object.keys(this.fields).forEach(function (n) {
			if ((validationField && validationField === self.fields[n].handle) || !validationField) {

				errorDiv = self.fields[n].handle.nextElementSibling;

				// remove class error
				removeClass && self.fields[n].handle.classList.remove(self.settings.errorClassName);

				// remove error element
				errorDiv && (errorDiv.getAttribute('data-type') === 'validator-error') && errorDiv.parentNode.removeChild(errorDiv);
			}
		});

	},

	showErrors: function (validationField) {

		var self = this,
			errorDiv,
			insertNodeError = function (refNode, errorObj) {

				// set error class
				refNode.classList.add(self.settings.errorClassName);

				// check to error div element exist
				if (refNode.nextElementSibling && refNode.nextElementSibling.getAttribute('data-type') === 'validator-error') {
					return;
				}

				// insert error element
				if (self.settings.showErrors) {
					errorDiv = document.createElement('div');
					errorDiv.setAttribute('class', self.settings.errorClassName);
					errorDiv.setAttribute('data-type', 'validator-error');
					errorDiv.innerHTML = errorObj.errorText;
					refNode.parentNode.insertBefore(errorDiv, refNode.nextSibling);
				}
			};




		Object.keys(this.errors).forEach(function (r) {

			// show error to specified field
			if (validationField) {

				Object.keys(self.fields).forEach(function (n) {
					(self.fields[n].handle.getAttribute('name') === validationField.getAttribute('name')) && insertNodeError(self.fields[n].handle, self.errors[r]);
				});

				// show error to all fields
			} else {
				if (r === '0' || (r > 0 && self.fields[r].name !== self.fields[r - 1].name)) {
					insertNodeError(self.fields[r].handle, self.errors[r]);
				}
			}
		});





		// auto hide errors
		if (this.settings.autoHideErrors) {

			// for all fields
			if (!validationField) {

				if (this.intervalID) {
					clearTimeout(this.intervalID);
				}

				this.intervalID = setTimeout(function () {
					self.intervalID = null;
					self.hideErrors(false);
				}, this.settings.autoHideErrorsTimeout);

				// for current field
			} else {

				if (validationField.intervalID) {
					clearTimeout(validationField.intervalID);
				}

				if (!this.intervalID) {
					validationField.intervalID = setTimeout(function () {
						validationField.intervalID = null;
						self.hideErrors(validationField);
					}, this.settings.autoHideErrorsTimeout);
				}
			}
		}
	},


	/*
	* Get Form handle
	* @return {element} - Form handle
	*/
	getFormHandle: function () {
		return this.formHandle;
	},

	/*
	* Formatting string. Replace string
	* @param {string} string - Source string. Example: "{0} age {1} years."
	* @param {array} params - An array of values​​, which will be replaced with markers. Example: ['Bob', 36]
	* @return {string} - Formatted string with replacing markers. Example "Bob age 36 years"
	*/
	formatString: function (string, params) {
		return string.replace(/\{(\d+)\}/gi, function (match, number) {
			return (match && params[number]) ? params[number] : '';
		});
	},

	/*
	* Destroy validator
	*/
	destroy: function () {

		//hide errors
		this.hideErrors(false, true);

		// remove events
		this.eventsBuilder('removeEventListener');

	},

	/*
	* Reload validator.
	* Example 1: reload(function (err, res) {...}, {autoHideErrors: false})
	* Example 2: reload({autoHideErrors: false})
	* @param {function} [submitCallback] - Submit callback function
	* @param {object} [settings] - Settings object
	*/
	reload: function (submitCallback, settings) {

		this.destroy();

		//set variables
		switch (arguments.length) {

			case 2:
				this.submitCallback = submitCallback;
				this.settings = settings;
				break;

			case 1:
				this.settings = submitCallback;
				break;
		}

		this.fields = this.getFields(this.formHandle.querySelectorAll('[data-rule]'));
		this.submitCallback && this.eventsBuilder('addEventListener');
		this.applySettings(settings || {});

	},
	eventsBuilder: function (actionName) {

		var self = this;


		this.formHandle[actionName]('submit', this._eventSubmit);

		// air mode
		this.settings.onAir && Object.keys(this.fields).forEach(function (field) {

			[].forEach.call(self.settings.eventsList, function (event) {

				if (event === 'keyup') {
					self.fields[field].handle[actionName](event, self._eventChangeWithDelay);
				} else {
					self.fields[field].handle[actionName](event, self._eventChange);
				}
			});
		});


	}
};

/**
 * Encapsulation
 * @return {Object} - this handle
 */
// console.log(root, common.className)
const Validator = function () {

	function construct(constructor, args) {

		function Class() {
			return constructor.apply(this, args);
		}
		Class.prototype = constructor.prototype;
		return new Class();
	}

	var original = construct(Protected, arguments),
		Publicly = function () { };

	Publicly.prototype = {};
	[].forEach.call(common.publicMethods, function (member) {
		Publicly.prototype[member] = function () {
			return original[member].apply(original, arguments);
		};
	});

	return new Publicly(arguments);
};
	// return root


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pure_js_validator_src_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pure-js-validator/src/validator.js */ "../../node_modules/pure-js-validator/src/validator.js");


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0Q6L3dlYi9odG1sYWNhZGVteS9zdXJmbWFuX2Rldi9mbGF2YS9jbGllbnQvbm9kZV9tb2R1bGVzL3B1cmUtanMtdmFsaWRhdG9yL3NyYy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWU7O0FBRWY7QUFDQSxZQUFZOztBQUVa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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7O0FBR0EseUVBQXlFLElBQUksV0FBVyxJQUFJOztBQUU1RjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7O0FBR0Y7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7Ozs7OztBQU1IO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsV0FBVyxPQUFPLG9DQUFvQyxFQUFFLE1BQU0sRUFBRTtBQUNoRSxXQUFXLE1BQU07QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSwwQ0FBMEMsSUFBSSxHQUFHLHNCQUFzQjtBQUN2RSxzQkFBc0Isc0JBQXNCO0FBQzVDLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DLEVBQUU7QUFDRjs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3gyQkE7QUFBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXG4qIFNpbXBsZSBFbmNhcHN1bGF0aW9uIENsYXNzIHRlbXBsYXRlXG4qL1xuLyogZXNsaW50LWRpc2FibGUgKi9cblxuLy8gY29uc29sZS5sb2cocm9vdClcblxuLyoqXG4gKiBDb21tb24gb2JqZWN0IHBhcmFtc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuIHZhciBjb21tb24gPSB7XG5cdHB1YmxpY01ldGhvZHM6IFsndmFsaWRhdGUnLCAnZm9ybWF0U3RyaW5nJywgJ2Rlc3Ryb3knLCAncmVsb2FkJywgJ2dldEZvcm1IYW5kbGUnLCAnZ2V0RmllbGRzJywgJ3Nob3dFcnJvcnMnLCAnaGlkZUVycm9ycyddLFxuXHRjbGFzc05hbWU6ICdWYWxpZGF0b3InXG59LFxuXG5cdC8vIG1haW4gY29uc3RydWN0b3Jcblx0UHJvdGVjdGVkID0gZnVuY3Rpb24gKGZvcm1IYW5kbGUsIHN1Ym1pdENhbGxiYWNrLCBzZXR0aW5ncykge1xuXG5cdFx0Zm9ybUhhbmRsZS5Kc1ZhbGlkYXRvciA9IHRoaXM7XG5cblx0XHR0aGlzLnNldHRpbmdzID0ge1xuXG5cdFx0XHQvLyBWYWxpZGF0aW9uIG9mIGEgY3VycmVudCBmaWVsZCBhZnRlciB0aGUgZXZlbnRzIG9mIFwiY2hhbmdlXCIsIFwia2V5dXBcIiwgXCJibHVyXCJcblx0XHRcdG9uQWlyOiB0cnVlLFxuXG5cdFx0XHQvLyBTaG93IHZhbGlkYXRpb24gZXJyb3JzXG5cdFx0XHRzaG93RXJyb3JzOiB0cnVlLFxuXG5cdFx0XHQvLyBBdXRvLWhpZGUgdGhlIGVycm9yIG1lc3NhZ2VzXG5cdFx0XHRhdXRvSGlkZUVycm9yczogZmFsc2UsXG5cblx0XHRcdC8vIFRpbWVvdXQgYXV0by1oaWRlIGVycm9yIG1lc3NhZ2VzXG5cdFx0XHRhdXRvSGlkZUVycm9yc1RpbWVvdXQ6IDIwMDAsXG5cblx0XHRcdC8vIExhbmd1YWdlIGVycm9yIG1lc3NhZ2VzXG5cdFx0XHRsb2NhbGU6ICdlbicsXG5cblx0XHRcdC8vIE9iamVjdCBmb3IgY3VzdG9tIGVycm9yIG1lc3NhZ2VzXG5cdFx0XHRtZXNzYWdlczoge30sXG5cblx0XHRcdC8vIE9iamVjdCBmb3IgY3VzdG9tIHJ1bGVzXG5cdFx0XHRydWxlczoge30sXG5cblx0XHRcdC8vIGNsYXNzbmFtZSBmb3IgZXJyb3IgbWVzc2FnZXNcblx0XHRcdGVycm9yQ2xhc3NOYW1lOiAnZXJyb3InLFxuXG5cdFx0XHQvLyByZW1vdmUgc3BhY2VzIGZyb20gdmFsaWRhdGlvbiBmaWVsZCB2YWx1ZXNcblx0XHRcdHJlbW92ZVNwYWNlczogZmFsc2UsXG5cblx0XHRcdC8vIHRyYWNraW5nIG9mIG5ldyBlbGVtZW50c1xuXHRcdFx0YXV0b1RyYWNraW5nOiB0cnVlLFxuXG5cdFx0XHQvLyBldmVudHMgbGlzdCBmb3IgYmluZGluZ1xuXHRcdFx0ZXZlbnRzTGlzdDogWydrZXl1cCcsICdjaGFuZ2UnLCAnYmx1ciddXG5cdFx0fTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly8gc2V0IGhhbmRsZVxuXHRcdHRoaXMuZm9ybUhhbmRsZSA9IGZvcm1IYW5kbGUgfHwgbnVsbDtcblxuXHRcdC8vIHNldCBjYWxsYmFja1xuXHRcdHRoaXMuc3VibWl0Q2FsbGJhY2sgPSBzdWJtaXRDYWxsYmFjayB8fCBudWxsO1xuXG5cdFx0Ly8gZ2V0IGZpZWxkcyBhbmQgcnVsZXNcblx0XHR0aGlzLmZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKHRoaXMuZm9ybUhhbmRsZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ydWxlXScpKTtcblxuXG5cblxuXG5cdFx0Ly8gYXBwbHkgY3VzdG9tIHNldHRpbmdzXG5cdFx0dGhpcy5hcHBseVNldHRpbmdzKHNldHRpbmdzIHx8IHt9KTtcblxuXG5cblxuXG5cblx0XHR0aGlzLnN1Ym1pdENhbGxiYWNrID0gdGhpcy5zdWJtaXRDYWxsYmFjay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX2V2ZW50Q2hhbmdlV2l0aERlbGF5ID0gdGhpcy5fZXZlbnRDaGFuZ2VXaXRoRGVsYXkuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9ldmVudENoYW5nZSA9IHRoaXMuX2V2ZW50Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fZXZlbnRTdWJtaXQgPSB0aGlzLl9ldmVudFN1Ym1pdC5iaW5kKHRoaXMpO1xuXG5cblxuXHRcdC8vIGJpbmQgZXZlbnRzXG5cdFx0dGhpcy5zdWJtaXRDYWxsYmFjayAmJiB0aGlzLmV2ZW50c0J1aWxkZXIoJ2FkZEV2ZW50TGlzdGVuZXInKTtcblxuXG5cblxuXG5cblxuXHRcdC8vIGF1dG90cmFja2luZyBmb3IgbmV3IGZvcm0gZWxlbWVudHNcblx0XHR0aGlzLnNldHRpbmdzLmF1dG9UcmFja2luZyAmJiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykgJiYgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9uUmVjb3Jkcykge1xuXG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwobXV0YXRpb25SZWNvcmRzLCBmdW5jdGlvbiAobXV0YXRpb24pIHtcblx0XHRcdFx0c3dpdGNoIChtdXRhdGlvbi50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnc3VidHJlZSc6XG5cdFx0XHRcdFx0Y2FzZSAnY2hpbGRMaXN0JzpcblxuXHRcdFx0XHRcdFx0dmFyIHJlbG9hZEZsYWcgPSBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Y2hpbGRzQXJyYXkgPSBbXTtcblxuXHRcdFx0XHRcdFx0W10uZm9yRWFjaC5jYWxsKG11dGF0aW9uLmFkZGVkTm9kZXMsIGZ1bmN0aW9uICh0YXJnZXRFbGVtKSB7XG5cblx0XHRcdFx0XHRcdFx0Y2hpbGRzQXJyYXkgPSB0YXJnZXRFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwgPyB0YXJnZXRFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSA6IFtdO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChbJ1NFTEVDVCcsICdJTlBVVCcsICdURVhUQVJFQScsICdDSEVDS0JPWCcsICdSQURJT0JVVFRPTiddLmluZGV4T2YodGFyZ2V0RWxlbS50YWdOYW1lKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWxvYWRGbGFnID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHQhcmVsb2FkRmxhZyAmJiBbXS5mb3JFYWNoLmNhbGwoY2hpbGRzQXJyYXksIGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKFsnU0VMRUNUJywgJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ0NIRUNLQk9YJywgJ1JBRElPQlVUVE9OJ10uaW5kZXhPZihlbGVtLnRhZ05hbWUpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVsb2FkRmxhZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJlbG9hZEZsYWcgJiYgc2VsZi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH0pLm9ic2VydmUodGhpcy5mb3JtSGFuZGxlLCB7XG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRzdWJ0cmVlOiB0cnVlXG5cdFx0fSk7XG5cblxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblxuLyoqXG4gKiBNYWluIHByb3RvdHlwZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuUHJvdGVjdGVkLnByb3RvdHlwZSA9IHtcblxuXG5cblxuXG5cdG1lc3NhZ2VzOiB7XG5cblx0XHQvLyBFbmdsaXNoXG5cdFx0ZW46IHtcblx0XHRcdHJlcXVpcmVkOiB7XG5cdFx0XHRcdGVtcHR5OiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCcsXG5cdFx0XHRcdGluY29ycmVjdDogJ0luY29ycmVjdCB2YWx1ZSdcblx0XHRcdH0sXG5cdFx0XHRub3R6ZXJvOiB7XG5cdFx0XHRcdGVtcHR5OiAnUGxlYXNlIG1ha2UgYSBzZWxlY3Rpb24nLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdJbmNvcnJlY3QgdmFsdWUnXG5cdFx0XHR9LFxuXHRcdFx0aW50ZWdlcjoge1xuXHRcdFx0XHRlbXB0eTogJ0VudGVyIGFuIGludGVnZXIgdmFsdWUnLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdJbmNvcnJlY3QgaW50ZWdlciB2YWx1ZSdcblx0XHRcdH0sXG5cdFx0XHRmbG9hdDoge1xuXHRcdFx0XHRlbXB0eTogJ0VudGVyIGFuIGZsb2F0IG51bWJlcicsXG5cdFx0XHRcdGluY29ycmVjdDogJ0luY29ycmVjdCBmbG9hdCdcblx0XHRcdH0sXG5cdFx0XHRtaW46IHtcblx0XHRcdFx0ZW1wdHk6ICdFbnRlciBtb3JlJyxcblx0XHRcdFx0aW5jb3JyZWN0OiAnRW50ZXIgbW9yZSdcblx0XHRcdH0sXG5cdFx0XHRtYXg6IHtcblx0XHRcdFx0ZW1wdHk6ICdFbnRlciBsZXNzJyxcblx0XHRcdFx0aW5jb3JyZWN0OiAnRW50ZXIgbGVzcydcblx0XHRcdH0sXG5cdFx0XHRiZXR3ZWVuOiB7XG5cdFx0XHRcdGVtcHR5OiAnRW50ZXIgdGhlIGJldHdlZW4gezB9LXsxfScsXG5cdFx0XHRcdGluY29ycmVjdDogJ0VudGVyIHRoZSBiZXR3ZWVuIHswfS17MX0nXG5cdFx0XHR9LFxuXHRcdFx0bmFtZToge1xuXHRcdFx0XHRlbXB0eTogJ1BsZWFzZSwgZW50ZXIgeW91ciBuYW1lJyxcblx0XHRcdFx0aW5jb3JyZWN0OiAnSW5jb3JyZWN0IG5hbWUnXG5cdFx0XHR9LFxuXHRcdFx0bGFzdG5hbWU6IHtcblx0XHRcdFx0ZW1wdHk6ICdQbGVhc2UsIGVudGVyIHlvdXIgbGFzdG5hbWUnLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdJbmNvcnJlY3QgbGFzdG5hbWUnXG5cdFx0XHR9LFxuXHRcdFx0cGhvbmU6IHtcblx0XHRcdFx0ZW1wdHk6ICdQbGVhc2UsIGVudGVyIHRoZSBwaG9uZSBudW1iZXInLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdJbmNvcnJlY3QgcGhvbmUgbnVtYmVyJ1xuXHRcdFx0fSxcblx0XHRcdGVtYWlsOiB7XG5cdFx0XHRcdGVtcHR5OiAnUGxlYXNlLCBlbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MnLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdJbmNvcnJlY3QgZW1haWwgYWRkcmVzcydcblx0XHRcdH0sXG5cdFx0XHRsZW5ndGg6IHtcblx0XHRcdFx0ZW1wdHk6ICdQbGVhc2UsIEVudGVyIGEgbWluaW11bSBvZiB7MH0gY2hhcmFjdGVycyBhbmQgYSBtYXhpbXVtIG9mIHsxfScsXG5cdFx0XHRcdGluY29ycmVjdDogJ0luY29ycmVjdC4gRW50ZXIgYSBtaW5pbXVtIG9mIHswfSBjaGFyYWN0ZXJzIGFuZCBhIG1heGltdW0gb2YgezF9J1xuXHRcdFx0fSxcblx0XHRcdG1pbmxlbmd0aDoge1xuXHRcdFx0XHRlbXB0eTogJ1BsZWFzZSwgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMnLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdZb3UgaGF2ZSBlbnRlcmVkIGxlc3MgdGhhbiB7MH0gY2hhcmFjdGVycydcblx0XHRcdH0sXG5cdFx0XHRtYXhsZW5ndGg6IHtcblx0XHRcdFx0ZW1wdHk6ICdQbGVhc2UsIGVudGVyIGF0IG1heGltdW0gezB9IGNoYXJhY3RlcnMnLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdZb3UgaGF2ZSBlbnRlcmVkIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVycydcblx0XHRcdH0sXG5cdFx0XHRtYXhmaWxlc2l6ZToge1xuXHRcdFx0XHRlbXB0eTogJ1RoZSBzaXplIG9mIG9uZSBvciBtb3JlIHNlbGVjdGVkIGZpbGVzIGxhcmdlciB0aGFuIHswfSB7MX0nLFxuXHRcdFx0XHRpbmNvcnJlY3Q6ICdUaGUgc2l6ZSBvZiBvbmUgb3IgbW9yZSBzZWxlY3RlZCBmaWxlcyBsYXJnZXIgdGhhbiB7MH0gezF9J1xuXHRcdFx0fSxcblx0XHRcdGZpbGVleHRlbnNpb246IHtcblx0XHRcdFx0ZW1wdHk6ICdTZWxlY3QgZmlsZScsXG5cdFx0XHRcdGluY29ycmVjdDogJ09uZSBvciBtb3JlIGZpbGVzIGhhdmUgYW4gaW52YWxpZCB0eXBlJ1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBydWxlc1xuXHRydWxlczoge1xuXHRcdHJlcXVpcmVkOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiAnJyAhPT0gdmFsdWU7XG5cdFx0fSxcblx0XHRub3R6ZXJvOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApID4gMDtcblx0XHR9LFxuXHRcdGludGVnZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoL15bMC05XSskL2dpKS50ZXN0KHZhbHVlKTtcblx0XHR9LFxuXHRcdGZsb2F0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cXCwvLCAnLicpO1xuXHRcdFx0cmV0dXJuIHRoaXMuaW50ZWdlcih2YWx1ZSkgfHwgbmV3IFJlZ0V4cCgvXihbMC05XSkrKFxcLikoWzAtOV0rJCkvZ2kpLnRlc3QodmFsdWUpO1xuXHRcdH0sXG5cdFx0bWluOiBmdW5jdGlvbiAodmFsdWUsIHBhcmFtcykge1xuXHRcdFx0aWYgKHRoaXMuZmxvYXQodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSA+PSBwYXJzZUZsb2F0KHBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKSA+PSBwYXJzZUludChwYXJhbXNbMF0sIDEwKTtcblx0XHR9LFxuXHRcdG1heDogZnVuY3Rpb24gKHZhbHVlLCBwYXJhbXMpIHtcblx0XHRcdGlmICh0aGlzLmZsb2F0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgPD0gcGFyc2VGbG9hdChwYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCkgPD0gcGFyc2VJbnQocGFyYW1zWzBdLCAxMCk7XG5cdFx0fSxcblx0XHRiZXR3ZWVuOiBmdW5jdGlvbiAodmFsdWUsIHBhcmFtcykge1xuXG5cdFx0XHRwYXJhbXNbMV0gPSBwYXJhbXNbMV0gfHwgOTk5OTk5O1xuXG5cdFx0XHRpZiAodGhpcy5mbG9hdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpID49IHBhcnNlRmxvYXQocGFyYW1zWzBdKSAmJiBwYXJzZUZsb2F0KHZhbHVlKSA8PSBwYXJzZUZsb2F0KHBhcmFtc1sxXSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5pbnRlZ2VyKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKSA+PSBwYXJzZUludChwYXJhbXNbMF0sIDEwKSAmJiBwYXJzZUludCh2YWx1ZSwgMTApIDw9IHBhcnNlSW50KHBhcmFtc1sxXSwgMTApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0bmFtZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRpZiAodmFsdWUubGVuZ3RoID4gMCAmJiB2YWx1ZS5sZW5ndGggPCAyKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKC9eW2EtekEtWlxcc9CwLdGP0JAt0K/RkdCBXFwtXSskL2cpLnRlc3QodmFsdWUpO1xuXHRcdH0sXG5cdFx0bGFzdG5hbWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSh2YWx1ZSk7XG5cdFx0fSxcblx0XHRwaG9uZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRpZiAodmFsdWUucmVwbGFjZSgvW14wLTldKy9naSwgJycpLm1hdGNoKC9bMC05XSsvZ2kpICYmIHZhbHVlLnJlcGxhY2UoL1teMC05XSsvZ2ksICcnKS5tYXRjaCgvWzAtOV0rL2dpKVswXS5sZW5ndGggPCA2KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKC9eKD86KD86XFwoPyg/OjAwfFxcKykoWzEtNF1cXGRcXGR8WzEtOV1cXGQ/KVxcKT8pP1tcXC1cXC5cXCBcXFxcXFwvXT8pPygoPzpcXCg/XFxkezEsfVxcKT9bXFwtXFwuXFwgXFxcXFxcL10/KXswLH0pKD86W1xcLVxcLlxcIFxcXFxcXC9dPyg/OiN8ZXh0XFwuP3xleHRlbnNpb258eClbXFwtXFwuXFwgXFxcXFxcL10/KFxcZCspKT8kL2cpLnRlc3QodmFsdWUpO1xuXHRcdH0sXG5cdFx0ZW1haWw6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcd1xcLV0rKD86XFwuW1xcd1xcLV0rKSopfChcIltcXHctXFxzXStcIikoW1xcd1xcLV0rKD86XFwuW1xcd1xcLV0rKSopKShAKCg/OltcXHdcXC1dK1xcLikqXFx3W1xcd1xcLV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSkudGVzdCh2YWx1ZSk7XG5cdFx0fSxcblx0XHRsZW5ndGg6IGZ1bmN0aW9uICh2YWx1ZSwgcGFyYW1zKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5iZXR3ZWVuKHZhbHVlLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKS5sZW5ndGgsIHBhcmFtcyk7XG5cdFx0fSxcblx0XHRtYXhsZW5ndGg6IGZ1bmN0aW9uICh2YWx1ZSwgcGFyYW1zKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXgodmFsdWUucmVwbGFjZSgvXFxzezIsfS9nLCAnICcpLmxlbmd0aCwgcGFyYW1zKTtcblx0XHR9LFxuXHRcdG1pbmxlbmd0aDogZnVuY3Rpb24gKHZhbHVlLCBwYXJhbXMpIHtcblx0XHRcdHJldHVybiB0aGlzLm1pbih2YWx1ZS5yZXBsYWNlKC9cXHN7Mix9L2csICcgJykubGVuZ3RoLCBwYXJhbXMpO1xuXHRcdH0sXG5cdFx0bWF4ZmlsZXNpemU6IGZ1bmN0aW9uICh2YWx1ZSwgcGFyYW1zKSB7XG5cdFx0XHR2YXIgaSxcblx0XHRcdFx0bCA9IHZhbHVlLmxlbmd0aCxcblx0XHRcdFx0dW5pdHNPZmZzZXQgPSAxO1xuXG5cdFx0XHRzd2l0Y2ggKHBhcmFtc1sxXS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdGNhc2UgJ2InOlxuXHRcdFx0XHRcdHVuaXRzT2Zmc2V0ID0gMTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdrYic6XG5cdFx0XHRcdFx0dW5pdHNPZmZzZXQgPSAxMDI0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ21iJzpcblx0XHRcdFx0XHR1bml0c09mZnNldCA9IDEwNDg1NzY7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnZ2InOlxuXHRcdFx0XHRcdHVuaXRzT2Zmc2V0ID0gMTA3Mzc0MTgyNDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICd0Yic6XG5cdFx0XHRcdFx0dW5pdHNPZmZzZXQgPSAxMDk5NTExNjI3Nzc2O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChwYXJzZUZsb2F0KHZhbHVlW2ldKSA+IChwYXJzZUZsb2F0KHBhcmFtc1swXSkgKiB1bml0c09mZnNldCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHRmaWxlZXh0ZW5zaW9uOiBmdW5jdGlvbiAodmFsdWUsIHBhcmFtcykge1xuXHRcdFx0dmFyIGksXG5cdFx0XHRcdGEsXG5cdFx0XHRcdGwgPSBwYXJhbXMubGVuZ3RoLFxuXHRcdFx0XHRiID0gdmFsdWUubGVuZ3RoLFxuXHRcdFx0XHRjbXBSZXNDID0gMDtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkgKz0gMSkge1xuXHRcdFx0XHRmb3IgKGEgPSAwOyBhIDwgYjsgYSArPSAxKSB7XG5cdFx0XHRcdFx0aWYgKHBhcmFtc1tpXSA9PT0gdmFsdWVbYV0uc3BsaXQoJy4nKS5wb3AoKSkge1xuXHRcdFx0XHRcdFx0Y21wUmVzQyArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID09PSBjbXBSZXNDID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdH1cblx0fSxcblxuXHRvcmRlckZpZWxkczogZnVuY3Rpb24gKGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcblxuXHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdHJldE9iaiA9IHt9O1xuXG5cdFx0ISFhdHRyTmFtZSAmJiAhIWF0dHJWYWx1ZSAmJiBPYmplY3Qua2V5cyh0aGlzLmZpZWxkcykuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcblx0XHRcdGlmIChzZWxmLmZpZWxkc1tmaWVsZF0uaGFuZGxlW2F0dHJOYW1lXSAmJiBzZWxmLmZpZWxkc1tmaWVsZF0uaGFuZGxlW2F0dHJOYW1lXSA9PT0gYXR0clZhbHVlKSB7XG5cdFx0XHRcdHJldE9ialtmaWVsZF0gPSBzZWxmLmZpZWxkc1tmaWVsZF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmV0T2JqO1xuXHR9LFxuXHRfZXZlbnRTdWJtaXQ6IGZ1bmN0aW9uIChlKSB7XG5cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvL2hpZGUgZXJyb3JzXG5cdFx0dGhpcy5oaWRlRXJyb3JzKGZhbHNlLCB0cnVlKTtcblxuXHRcdC8vc2hvdyBlcnJvcnMgaWYgdmFsaWRhdGlvbiBmYWlsdXJlXG5cdFx0IXRoaXMudmFsaWRhdGUoKSAmJiB0aGlzLnNob3dFcnJvcnMoKTtcblxuXHRcdC8vY2FsbGJhY2tcblx0XHQodGhpcy5zdWJtaXRDYWxsYmFjayh0aGlzLmVycm9ycyB8fCBudWxsLCB0aGlzLmVycm9ycyA/IGZhbHNlIDogdHJ1ZSkgPT09IHRydWUpICYmIHRoaXMuZm9ybUhhbmRsZS5zdWJtaXQoKTtcblx0fSxcblx0X2V2ZW50Q2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuXG5cdFx0dmFyIHJhZGlvQnRucyxcblx0XHRcdHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly9yZW1vdmUgc3BhY2VzXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MucmVtb3ZlU3BhY2VzICYmIG5ldyBSZWdFeHAoL1xcc3syLH0vZykudGVzdChlLnRhcmdldC52YWx1ZSkpIHtcblx0XHRcdGUudGFyZ2V0LnZhbHVlID0gZS50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxzezIsfS9nLCAnICcpO1xuXHRcdH1cblxuXHRcdC8vaWYgaXMgcmFkaW8gYnV0dG9uc1xuXHRcdGlmIChlLnRhcmdldC50eXBlID09PSAncmFkaW8nKSB7XG5cblx0XHRcdC8vZ2V0IHJhZGlvIGdyb3VwZVxuXHRcdFx0cmFkaW9CdG5zID0gdGhpcy5vcmRlckZpZWxkcygnbmFtZScsIGUudGFyZ2V0Lm5hbWUpO1xuXG5cdFx0XHRPYmplY3Qua2V5cyhyYWRpb0J0bnMpLmZvckVhY2goZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0XHRzZWxmLmhpZGVFcnJvcnMocmFkaW9CdG5zW2J0bl0uaGFuZGxlKTtcblx0XHRcdH0pO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vaGlkZSBlcnJvcnMgZm9yIHRoaXNcblx0XHRcdHRoaXMuaGlkZUVycm9ycyhlLnRhcmdldCk7XG5cdFx0fVxuXG5cblxuXG5cdFx0Ly92YWxpZGF0ZSBhbmQgc2hvdyBlcnJvcnMgZm9yIHRoaXNcblx0XHRpZiAoIXRoaXMudmFsaWRhdGUoZS50YXJnZXQpKSB7XG5cblx0XHRcdHRoaXMuc2hvd0Vycm9ycyhlLnRhcmdldCk7XG5cdFx0XHQhdGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzICYmIHRoaXMuc3VibWl0Q2FsbGJhY2sodGhpcy5lcnJvcnMsIGZhbHNlKTtcblxuXHRcdH1cblx0fSxcblx0X2V2ZW50Q2hhbmdlV2l0aERlbGF5OiBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdGlmICh0aGlzLmludGVydmFsSUQpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsSUQpO1xuXHRcdH1cblxuXHRcdHRoaXMuaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fZXZlbnRDaGFuZ2UuYXBwbHkoc2VsZiwgW2VdKTtcblx0XHR9LCA0MDApO1xuXHR9LFxuXG5cblx0YXBwbHlTZXR0aW5nczogZnVuY3Rpb24gKHNldHRpbmdzKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyBhcHBseSBydWxlc1xuXHRcdHNldHRpbmdzLnJ1bGVzICYmIE9iamVjdC5rZXlzKHNldHRpbmdzLnJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlTmFtZSkge1xuXHRcdFx0c2VsZi5ydWxlc1tydWxlTmFtZV0gPSBzZXR0aW5ncy5ydWxlc1tydWxlTmFtZV07XG5cdFx0fSk7XG5cblx0XHQvLyBhcHBseSBtZXNzYWdlc1xuXHRcdHNldHRpbmdzLm1lc3NhZ2VzICYmIE9iamVjdC5rZXlzKHNldHRpbmdzLm1lc3NhZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChsb2NhbGUpIHtcblx0XHRcdE9iamVjdC5rZXlzKHNldHRpbmdzLm1lc3NhZ2VzW2xvY2FsZV0pLmZvckVhY2goZnVuY3Rpb24gKHJ1bGVOYW1lKSB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHNldHRpbmdzLm1lc3NhZ2VzW2xvY2FsZV1bcnVsZU5hbWVdKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdFx0XHRcdHNlbGYuc2V0dGluZ3MubWVzc2FnZXNbbG9jYWxlXSA9IHNlbGYuc2V0dGluZ3MubWVzc2FnZXNbbG9jYWxlXSB8fCB7fTtcblx0XHRcdFx0XHRzZWxmLnNldHRpbmdzLm1lc3NhZ2VzW2xvY2FsZV1bcnVsZU5hbWVdID0gc2VsZi5zZXR0aW5ncy5tZXNzYWdlc1tsb2NhbGVdW3J1bGVOYW1lXSB8fCB7fTtcblx0XHRcdFx0XHRzZWxmLnNldHRpbmdzLm1lc3NhZ2VzW2xvY2FsZV1bcnVsZU5hbWVdW3BhcmFtXSA9IHNldHRpbmdzLm1lc3NhZ2VzW2xvY2FsZV1bcnVsZU5hbWVdW3BhcmFtXTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIGFwcGx5IG90aGVyIHNldHRpbmdzXG5cdFx0T2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG5cdFx0XHRzZWxmLnNldHRpbmdzW3BhcmFtXSA9IHNldHRpbmdzW3BhcmFtXTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cblx0Z2V0RmllbGRzOiBmdW5jdGlvbiAoZmllbGRzKSB7XG5cblx0XHR2YXIgcmV0RGF0YSA9IHt9LFxuXHRcdFx0cnVsZXMgPSBbXSxcblx0XHRcdHBhcmFtcyA9IFtdO1xuXG5cdFx0ZmllbGRzID0gZmllbGRzIHx8IHRoaXMuZm9ybUhhbmRsZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ydWxlXScpO1xuXG5cdFx0Ly8gZWFjaCBmaWVsZHMgd2l0aCBkYXRhLXJ1bGUgYXR0cmlidXRlXG5cdFx0T2JqZWN0LmtleXMoZmllbGRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZEluZGV4KSB7XG5cblx0XHRcdHJ1bGVzID0gZmllbGRzW2ZpZWxkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1ydWxlJykuc3BsaXQoJ3wnKTtcblxuXHRcdFx0T2JqZWN0LmtleXMocnVsZXMpLmZvckVhY2goZnVuY3Rpb24gKHJ1bGVJbmRleCkge1xuXG5cdFx0XHRcdC8vIHBhcnNlIHJ1bGVcblx0XHRcdFx0aWYgKHJ1bGVzW3J1bGVJbmRleF0ubWF0Y2goLy0vZ2kpKSB7XG5cblx0XHRcdFx0XHRwYXJhbXMgPSBydWxlc1tydWxlSW5kZXhdLnNwbGl0KCctJyk7XG5cdFx0XHRcdFx0cnVsZXNbcnVsZUluZGV4XSA9IHBhcmFtc1swXTtcblx0XHRcdFx0XHRwYXJhbXMgPSBwYXJhbXMuc3BsaWNlKDEpO1xuXG5cdFx0XHRcdFx0cnVsZXNbcnVsZUluZGV4XSA9IFtydWxlc1tydWxlSW5kZXhdLCBwYXJhbXNdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJ1bGVzW3J1bGVJbmRleF0gPSBbcnVsZXNbcnVsZUluZGV4XSwgW11dO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0RGF0YVtmaWVsZEluZGV4XSA9IHtcblx0XHRcdFx0bmFtZTogZmllbGRzW2ZpZWxkSW5kZXhdLmdldEF0dHJpYnV0ZSgnbmFtZScpLFxuXHRcdFx0XHRydWxlczogcnVsZXMsXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogZmllbGRzW2ZpZWxkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1kZWZhdWx0JyksXG5cdFx0XHRcdGhhbmRsZTogZmllbGRzW2ZpZWxkSW5kZXhdLFxuXHRcdFx0XHRpbnRlcnZhbElEOiBudWxsXG5cdFx0XHR9O1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJldERhdGE7XG5cdH0sXG5cblx0dmFsaWRhdGU6IGZ1bmN0aW9uICh2YWxpZGF0aW9uRmllbGQpIHtcblxuXHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdGZpZWxkcyA9IHZhbGlkYXRpb25GaWVsZCA/IHRoaXMuZ2V0RmllbGRzKFt2YWxpZGF0aW9uRmllbGRdKSA6IHRoaXMuZmllbGRzLFxuXHRcdFx0cmVzdWx0LFxuXHRcdFx0cnVsZU5hbWUsXG5cdFx0XHRwYXJhbXMsXG5cdFx0XHRkZWZhdWx0VmFsdWUsXG5cdFx0XHR2YWx1ZSxcblx0XHRcdG1lc3NhZ2UsXG5cdFx0XHRtZXNzYWdlVHlwZSA9IG51bGw7XG5cblx0XHR0aGlzLmVycm9ycyA9IHRoaXMuZXJyb3JzID8gbnVsbCA6IHRoaXMuZXJyb3JzO1xuXG5cdFx0T2JqZWN0LmtleXMoZmllbGRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG5cblx0XHRcdHJlc3VsdCA9IHRydWU7XG5cblx0XHRcdC8vIGxvb3AgcnVsZXMgb2YgdGhpcyBmaWVsZFxuXHRcdFx0ZmllbGRzW25dLnJ1bGVzICYmIE9iamVjdC5rZXlzKGZpZWxkc1tuXS5ydWxlcykuZm9yRWFjaChmdW5jdGlvbiAocnVsZUluZGV4KSB7XG5cblx0XHRcdFx0Ly8gc2V0IHJ1bGUgZGF0YVxuXHRcdFx0XHRydWxlTmFtZSA9IGZpZWxkc1tuXS5ydWxlc1tydWxlSW5kZXhdWzBdO1xuXHRcdFx0XHRwYXJhbXMgPSBmaWVsZHNbbl0ucnVsZXNbcnVsZUluZGV4XVsxXTtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlID0gZmllbGRzW25dLmRlZmF1bHRWYWx1ZTtcblx0XHRcdFx0dmFsdWUgPSBmaWVsZHNbbl0uaGFuZGxlLnZhbHVlO1xuXG5cblx0XHRcdFx0c3dpdGNoIChmaWVsZHNbbl0uaGFuZGxlLnR5cGUpIHtcblxuXHRcdFx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdFx0XHRcdCFmaWVsZHNbbl0uaGFuZGxlLmNoZWNrZWQgJiYgKHZhbHVlID0gJycpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHQvLyBnZXQgcmFkaW8gZ3JvdXBlXG5cdFx0XHRcdFx0XHR2YXIgcmFkaW9CdG5zID0gc2VsZi5vcmRlckZpZWxkcygnbmFtZScsIGZpZWxkc1tuXS5oYW5kbGUubmFtZSksXG5cdFx0XHRcdFx0XHRcdGNoZWNrZWQgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMocmFkaW9CdG5zKS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdFx0XHRcdHJhZGlvQnRuc1tpXS5oYW5kbGUuY2hlY2tlZCAmJiAoY2hlY2tlZCA9IHRydWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGlmICghY2hlY2tlZCkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIGFkZCBhbiBlcnJvciB0byBvbmUgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhyYWRpb0J0bnMpLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9IHNlbGYuc2V0dGluZ3MubWVzc2FnZXNbc2VsZi5zZXR0aW5ncy5sb2NhbGVdW3J1bGVOYW1lXS5lbXB0eTtcblx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gc2VsZi5tZXNzYWdlc1tzZWxmLnNldHRpbmdzLmxvY2FsZV1bcnVsZU5hbWVdLmVtcHR5O1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gc2V0IHZhbHVlIGFzIGZvciBlbXB0eSBydWxlc1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdmaWxlJzpcblxuXHRcdFx0XHRcdFx0Ly8gaWYgdGhlIGZpbGVzIHdlcmUgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdGlmIChmaWVsZHNbbl0uaGFuZGxlLmZpbGVzICYmIGZpZWxkc1tuXS5oYW5kbGUuZmlsZXMubGVuZ3RoKSB7XG5cblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBbXTtcblxuXHRcdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhmaWVsZHNbbl0uaGFuZGxlLmZpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlSW5kZXgpIHtcblxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAocnVsZU5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ21heGZpbGVzaXplJzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUucHVzaChmaWVsZHNbbl0uaGFuZGxlLmZpbGVzW2ZpbGVJbmRleF0uc2l6ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlICdmaWxlZXh0ZW5zaW9uJzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUucHVzaChmaWVsZHNbbl0uaGFuZGxlLmZpbGVzW2ZpbGVJbmRleF0ubmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdGlmIChyZXN1bHQgJiYgISh2YWx1ZSA9PT0gJycgJiYgIWZpZWxkc1tuXS5ydWxlcy5qb2luKCd8JykubWF0Y2goL1xcfHswLDF9cmVxdWlyZWRcXHx7MCwxfS8pKSkge1xuXG5cdFx0XHRcdFx0Ly8gaWYgZXhpc3QgZGVmYXVsdCB2YWx1ZSBhbmQgdmFsdWUgaXMgZXEgZGVmYXVsdFxuXHRcdFx0XHRcdGlmIChyZXN1bHQgJiYgZGVmYXVsdFZhbHVlICYmIHZhbHVlICE9PSBkZWZhdWx0VmFsdWUpIHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRtZXNzYWdlVHlwZSA9ICdpbmNvcnJlY3QnO1xuXG5cdFx0XHRcdFx0XHQvLyBpZiBkZWZhdWx0IHZhbHVlIG5vdCBleGlzdFxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0ICYmIHNlbGYucnVsZXNbcnVsZU5hbWVdICYmICFzZWxmLnJ1bGVzW3J1bGVOYW1lXSh2YWx1ZSwgcGFyYW1zKSkge1xuXG5cdFx0XHRcdFx0XHQvLyBzZXQgbWVzc2FnZSB0byBlbXB0eSBkYXRhXG5cdFx0XHRcdFx0XHRpZiAoJycgPT09IHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlVHlwZSA9ICdlbXB0eSc7XG5cblx0XHRcdFx0XHRcdFx0Ly8gc2V0IG1lc3NhZ2UgdG8gaW5jb3JyZWN0IGRhdGFcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlVHlwZSA9ICdpbmNvcnJlY3QnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0XHRcdHNlbGYuaGlkZUVycm9ycyhmaWVsZHNbbl0uaGFuZGxlLCB0cnVlKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIGRlZmluZSBlcnJvcnMgc3RhY2sgaWYgbm90IGV4aXN0XG5cdFx0XHRcdFx0XHRzZWxmLmVycm9ycyA9IHNlbGYuZXJyb3JzIHx8IHt9O1xuXG5cdFx0XHRcdFx0XHQvLyBhcHBlbmQgZXJyb3IgbWVzc2FnZXNcblx0XHRcdFx0XHRcdGlmIChydWxlTmFtZSA9PT0gJ3JlcXVpcmVkJyAmJiBmaWVsZHNbbl0ucnVsZXNbMV0gJiYgZmllbGRzW25dLnJ1bGVzWzFdWzBdKSB7XG5cdFx0XHRcdFx0XHRcdHJ1bGVOYW1lID0gZmllbGRzW25dLnJ1bGVzWzFdWzBdO1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlVHlwZSA9ICdlbXB0eSc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9IHNlbGYuc2V0dGluZ3MubWVzc2FnZXNbc2VsZi5zZXR0aW5ncy5sb2NhbGVdW3J1bGVOYW1lXVttZXNzYWdlVHlwZV07XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gc2VsZi5tZXNzYWdlc1tzZWxmLnNldHRpbmdzLmxvY2FsZV1bcnVsZU5hbWVdW21lc3NhZ2VUeXBlXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRydWxlTmFtZSA9ICdyZXF1aXJlZCc7XG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2UgPSBzZWxmLm1lc3NhZ2VzW3NlbGYuc2V0dGluZ3MubG9jYWxlXVtydWxlTmFtZV1bbWVzc2FnZVR5cGVdO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBwdXNoIHZhbHVlIGludG8gcGFyYW1zIGlmIHBhcmFtcyBpcyBlbXB0eVxuXHRcdFx0XHRcdFx0IXBhcmFtcy5sZW5ndGggJiYgcGFyYW1zLnB1c2godmFsdWUpO1xuXG5cdFx0XHRcdFx0XHQvLyBhZGQgZXJyb3JzXG5cdFx0XHRcdFx0XHRzZWxmLmVycm9yc1tuXSA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogZmllbGRzW25dLm5hbWUsXG5cdFx0XHRcdFx0XHRcdGVycm9yVGV4dDogc2VsZi5mb3JtYXRTdHJpbmcobWVzc2FnZSwgcGFyYW1zKVxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Ly8gY2FsbCBjYWxsYmFjayBpZiBleGlzdFxuXHRcdFx0XHRcdFx0aWYgKCFzZWxmLnN1Ym1pdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuZXJyb3JzW25dLmhhbmRsZSA9IGZpZWxkc1tuXS5oYW5kbGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gcnVuIGNhbGxiYWNrIGlmIGNhbGxiYWNrIGlzIGV4aXN0cyBhbmQgbm90IGVycm9ycyBvciByZXR1cm4gZXJyb3IgZGF0YSBvYmplY3Rcblx0XHRpZiAodGhpcy5zdWJtaXRDYWxsYmFjaykge1xuXHRcdFx0cmV0dXJuICh0aGlzLmVycm9ycykgPyBmYWxzZSA6IHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZXJyb3JzIHx8IHRydWU7XG5cblx0fSxcblxuXG5cdGhpZGVFcnJvcnM6IGZ1bmN0aW9uICh2YWxpZGF0aW9uRmllbGQsIHJlbW92ZUNsYXNzKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRlcnJvckRpdjtcblxuXG5cdFx0T2JqZWN0LmtleXModGhpcy5maWVsZHMpLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcblx0XHRcdGlmICgodmFsaWRhdGlvbkZpZWxkICYmIHZhbGlkYXRpb25GaWVsZCA9PT0gc2VsZi5maWVsZHNbbl0uaGFuZGxlKSB8fCAhdmFsaWRhdGlvbkZpZWxkKSB7XG5cblx0XHRcdFx0ZXJyb3JEaXYgPSBzZWxmLmZpZWxkc1tuXS5oYW5kbGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcyBlcnJvclxuXHRcdFx0XHRyZW1vdmVDbGFzcyAmJiBzZWxmLmZpZWxkc1tuXS5oYW5kbGUuY2xhc3NMaXN0LnJlbW92ZShzZWxmLnNldHRpbmdzLmVycm9yQ2xhc3NOYW1lKTtcblxuXHRcdFx0XHQvLyByZW1vdmUgZXJyb3IgZWxlbWVudFxuXHRcdFx0XHRlcnJvckRpdiAmJiAoZXJyb3JEaXYuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKSA9PT0gJ3ZhbGlkYXRvci1lcnJvcicpICYmIGVycm9yRGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZXJyb3JEaXYpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0c2hvd0Vycm9yczogZnVuY3Rpb24gKHZhbGlkYXRpb25GaWVsZCkge1xuXG5cdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0ZXJyb3JEaXYsXG5cdFx0XHRpbnNlcnROb2RlRXJyb3IgPSBmdW5jdGlvbiAocmVmTm9kZSwgZXJyb3JPYmopIHtcblxuXHRcdFx0XHQvLyBzZXQgZXJyb3IgY2xhc3Ncblx0XHRcdFx0cmVmTm9kZS5jbGFzc0xpc3QuYWRkKHNlbGYuc2V0dGluZ3MuZXJyb3JDbGFzc05hbWUpO1xuXG5cdFx0XHRcdC8vIGNoZWNrIHRvIGVycm9yIGRpdiBlbGVtZW50IGV4aXN0XG5cdFx0XHRcdGlmIChyZWZOb2RlLm5leHRFbGVtZW50U2libGluZyAmJiByZWZOb2RlLm5leHRFbGVtZW50U2libGluZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpID09PSAndmFsaWRhdG9yLWVycm9yJykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGluc2VydCBlcnJvciBlbGVtZW50XG5cdFx0XHRcdGlmIChzZWxmLnNldHRpbmdzLnNob3dFcnJvcnMpIHtcblx0XHRcdFx0XHRlcnJvckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdGVycm9yRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBzZWxmLnNldHRpbmdzLmVycm9yQ2xhc3NOYW1lKTtcblx0XHRcdFx0XHRlcnJvckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsICd2YWxpZGF0b3ItZXJyb3InKTtcblx0XHRcdFx0XHRlcnJvckRpdi5pbm5lckhUTUwgPSBlcnJvck9iai5lcnJvclRleHQ7XG5cdFx0XHRcdFx0cmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlcnJvckRpdiwgcmVmTm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblxuXG5cblx0XHRPYmplY3Qua2V5cyh0aGlzLmVycm9ycykuZm9yRWFjaChmdW5jdGlvbiAocikge1xuXG5cdFx0XHQvLyBzaG93IGVycm9yIHRvIHNwZWNpZmllZCBmaWVsZFxuXHRcdFx0aWYgKHZhbGlkYXRpb25GaWVsZCkge1xuXG5cdFx0XHRcdE9iamVjdC5rZXlzKHNlbGYuZmllbGRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRcdFx0KHNlbGYuZmllbGRzW25dLmhhbmRsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKSA9PT0gdmFsaWRhdGlvbkZpZWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpKSAmJiBpbnNlcnROb2RlRXJyb3Ioc2VsZi5maWVsZHNbbl0uaGFuZGxlLCBzZWxmLmVycm9yc1tyXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHNob3cgZXJyb3IgdG8gYWxsIGZpZWxkc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHIgPT09ICcwJyB8fCAociA+IDAgJiYgc2VsZi5maWVsZHNbcl0ubmFtZSAhPT0gc2VsZi5maWVsZHNbciAtIDFdLm5hbWUpKSB7XG5cdFx0XHRcdFx0aW5zZXJ0Tm9kZUVycm9yKHNlbGYuZmllbGRzW3JdLmhhbmRsZSwgc2VsZi5lcnJvcnNbcl0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXG5cblxuXHRcdC8vIGF1dG8gaGlkZSBlcnJvcnNcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvSGlkZUVycm9ycykge1xuXG5cdFx0XHQvLyBmb3IgYWxsIGZpZWxkc1xuXHRcdFx0aWYgKCF2YWxpZGF0aW9uRmllbGQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5pbnRlcnZhbElEKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWxJRCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmludGVydmFsSUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLmludGVydmFsSUQgPSBudWxsO1xuXHRcdFx0XHRcdHNlbGYuaGlkZUVycm9ycyhmYWxzZSk7XG5cdFx0XHRcdH0sIHRoaXMuc2V0dGluZ3MuYXV0b0hpZGVFcnJvcnNUaW1lb3V0KTtcblxuXHRcdFx0XHQvLyBmb3IgY3VycmVudCBmaWVsZFxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAodmFsaWRhdGlvbkZpZWxkLmludGVydmFsSUQpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQodmFsaWRhdGlvbkZpZWxkLmludGVydmFsSUQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLmludGVydmFsSUQpIHtcblx0XHRcdFx0XHR2YWxpZGF0aW9uRmllbGQuaW50ZXJ2YWxJRCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dmFsaWRhdGlvbkZpZWxkLmludGVydmFsSUQgPSBudWxsO1xuXHRcdFx0XHRcdFx0c2VsZi5oaWRlRXJyb3JzKHZhbGlkYXRpb25GaWVsZCk7XG5cdFx0XHRcdFx0fSwgdGhpcy5zZXR0aW5ncy5hdXRvSGlkZUVycm9yc1RpbWVvdXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cblx0Lypcblx0KiBHZXQgRm9ybSBoYW5kbGVcblx0KiBAcmV0dXJuIHtlbGVtZW50fSAtIEZvcm0gaGFuZGxlXG5cdCovXG5cdGdldEZvcm1IYW5kbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5mb3JtSGFuZGxlO1xuXHR9LFxuXG5cdC8qXG5cdCogRm9ybWF0dGluZyBzdHJpbmcuIFJlcGxhY2Ugc3RyaW5nXG5cdCogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFNvdXJjZSBzdHJpbmcuIEV4YW1wbGU6IFwiezB9IGFnZSB7MX0geWVhcnMuXCJcblx0KiBAcGFyYW0ge2FycmF5fSBwYXJhbXMgLSBBbiBhcnJheSBvZiB2YWx1ZXPigIvigIssIHdoaWNoIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBtYXJrZXJzLiBFeGFtcGxlOiBbJ0JvYicsIDM2XVxuXHQqIEByZXR1cm4ge3N0cmluZ30gLSBGb3JtYXR0ZWQgc3RyaW5nIHdpdGggcmVwbGFjaW5nIG1hcmtlcnMuIEV4YW1wbGUgXCJCb2IgYWdlIDM2IHllYXJzXCJcblx0Ki9cblx0Zm9ybWF0U3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nLCBwYXJhbXMpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9naSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIpIHtcblx0XHRcdHJldHVybiAobWF0Y2ggJiYgcGFyYW1zW251bWJlcl0pID8gcGFyYW1zW251bWJlcl0gOiAnJztcblx0XHR9KTtcblx0fSxcblxuXHQvKlxuXHQqIERlc3Ryb3kgdmFsaWRhdG9yXG5cdCovXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vaGlkZSBlcnJvcnNcblx0XHR0aGlzLmhpZGVFcnJvcnMoZmFsc2UsIHRydWUpO1xuXG5cdFx0Ly8gcmVtb3ZlIGV2ZW50c1xuXHRcdHRoaXMuZXZlbnRzQnVpbGRlcigncmVtb3ZlRXZlbnRMaXN0ZW5lcicpO1xuXG5cdH0sXG5cblx0Lypcblx0KiBSZWxvYWQgdmFsaWRhdG9yLlxuXHQqIEV4YW1wbGUgMTogcmVsb2FkKGZ1bmN0aW9uIChlcnIsIHJlcykgey4uLn0sIHthdXRvSGlkZUVycm9yczogZmFsc2V9KVxuXHQqIEV4YW1wbGUgMjogcmVsb2FkKHthdXRvSGlkZUVycm9yczogZmFsc2V9KVxuXHQqIEBwYXJhbSB7ZnVuY3Rpb259IFtzdWJtaXRDYWxsYmFja10gLSBTdWJtaXQgY2FsbGJhY2sgZnVuY3Rpb25cblx0KiBAcGFyYW0ge29iamVjdH0gW3NldHRpbmdzXSAtIFNldHRpbmdzIG9iamVjdFxuXHQqL1xuXHRyZWxvYWQ6IGZ1bmN0aW9uIChzdWJtaXRDYWxsYmFjaywgc2V0dGluZ3MpIHtcblxuXHRcdHRoaXMuZGVzdHJveSgpO1xuXG5cdFx0Ly9zZXQgdmFyaWFibGVzXG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGhpcy5zdWJtaXRDYWxsYmFjayA9IHN1Ym1pdENhbGxiYWNrO1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzdWJtaXRDYWxsYmFjaztcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0dGhpcy5maWVsZHMgPSB0aGlzLmdldEZpZWxkcyh0aGlzLmZvcm1IYW5kbGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcnVsZV0nKSk7XG5cdFx0dGhpcy5zdWJtaXRDYWxsYmFjayAmJiB0aGlzLmV2ZW50c0J1aWxkZXIoJ2FkZEV2ZW50TGlzdGVuZXInKTtcblx0XHR0aGlzLmFwcGx5U2V0dGluZ3Moc2V0dGluZ3MgfHwge30pO1xuXG5cdH0sXG5cdGV2ZW50c0J1aWxkZXI6IGZ1bmN0aW9uIChhY3Rpb25OYW1lKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblxuXHRcdHRoaXMuZm9ybUhhbmRsZVthY3Rpb25OYW1lXSgnc3VibWl0JywgdGhpcy5fZXZlbnRTdWJtaXQpO1xuXG5cdFx0Ly8gYWlyIG1vZGVcblx0XHR0aGlzLnNldHRpbmdzLm9uQWlyICYmIE9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuXG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwoc2VsZi5zZXR0aW5ncy5ldmVudHNMaXN0LCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQgPT09ICdrZXl1cCcpIHtcblx0XHRcdFx0XHRzZWxmLmZpZWxkc1tmaWVsZF0uaGFuZGxlW2FjdGlvbk5hbWVdKGV2ZW50LCBzZWxmLl9ldmVudENoYW5nZVdpdGhEZWxheSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2VsZi5maWVsZHNbZmllbGRdLmhhbmRsZVthY3Rpb25OYW1lXShldmVudCwgc2VsZi5fZXZlbnRDaGFuZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdH1cbn07XG5cbi8qKlxuICogRW5jYXBzdWxhdGlvblxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoaXMgaGFuZGxlXG4gKi9cbi8vIGNvbnNvbGUubG9nKHJvb3QsIGNvbW1vbi5jbGFzc05hbWUpXG5leHBvcnQgY29uc3QgVmFsaWRhdG9yID0gZnVuY3Rpb24gKCkge1xuXG5cdGZ1bmN0aW9uIGNvbnN0cnVjdChjb25zdHJ1Y3RvciwgYXJncykge1xuXG5cdFx0ZnVuY3Rpb24gQ2xhc3MoKSB7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fVxuXHRcdENsYXNzLnByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblx0XHRyZXR1cm4gbmV3IENsYXNzKCk7XG5cdH1cblxuXHR2YXIgb3JpZ2luYWwgPSBjb25zdHJ1Y3QoUHJvdGVjdGVkLCBhcmd1bWVudHMpLFxuXHRcdFB1YmxpY2x5ID0gZnVuY3Rpb24gKCkgeyB9O1xuXG5cdFB1YmxpY2x5LnByb3RvdHlwZSA9IHt9O1xuXHRbXS5mb3JFYWNoLmNhbGwoY29tbW9uLnB1YmxpY01ldGhvZHMsIGZ1bmN0aW9uIChtZW1iZXIpIHtcblx0XHRQdWJsaWNseS5wcm90b3R5cGVbbWVtYmVyXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBvcmlnaW5hbFttZW1iZXJdLmFwcGx5KG9yaWdpbmFsLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH0pO1xuXG5cdHJldHVybiBuZXcgUHVibGljbHkoYXJndW1lbnRzKTtcbn07XG5cdC8vIHJldHVybiByb290XG4iLCJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICdwdXJlLWpzLXZhbGlkYXRvci9zcmMvdmFsaWRhdG9yLmpzJ1xyXG4iXSwic291cmNlUm9vdCI6IiJ9