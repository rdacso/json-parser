'use strict';


// var data = 
//         

// alert(data.rider_id)
/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
var isValidElement = function isValidElement(element) {
  return element.name && element.value;
};

/**
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
var isValidValue = function isValidValue(element) {
  return !['checkbox', 'radio'].includes(element.type) || element.checked;
};

/**
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a checkbox, false if not
 */
var isCheckbox = function isCheckbox(element) {
  return element.type === 'checkbox';
};

/**
 * Checks if an input is a `select` with the `multiple` attribute.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a multiselect, false if not
 */
var isMultiSelect = function isMultiSelect(element) {
  return element.options && element.multiple;
};

/**
 * Retrieves the selected options from a multi-select as an array.
 * @param  {HTMLOptionsCollection} options  the options for the select
 * @return {Array}                          an array of selected option values
 */
var getSelectValues = function getSelectValues(options) {
  return [].reduce.call(options, function (values, option) {
    return option.selected ? values.concat(option.value) : values;
  }, []);
};



/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */

 var adult_data = {
    rider_id: "adult",
    name_official: "Adult",};

var student_data = { 
  rider_id: "student",
  name_official: "Student",};

var adult_json = JSON.stringify(adult_data);
var student_json = JSON.stringify(student_data);

var adult = document.getElementById("rider-adult");
var student = document.getElementById("rider-student");

var formToJSON = function formToJSON(elements) {
  return [].reduce.call(elements, function (data, element) {

    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element)) {
      if (element==adult) {
        data[element.name] = adult_json;
      }
      else if (element == student){
        data[element.name] = student_json;

      }
      /*
       * Some fields allow for more than one value, so we need to check if this
       * is one of those fields and, if so, store the values as an array.
       */
      // if (isCheckbox(element)) {
      //   data[element.name] = (data[element.name] || []).concat(element.value);
      // } else if (isMultiSelect(element)) {
      //   data[element.name] = getSelectValues(element);
      // } else {
      //   data[element.name] = element.value;
      // }

    }

    return data;
  }, {});
};

function addText(event) {
    var targ = event.target || event.srcElement;
    document.getElementById("alltext").value += adult_json || targ.innerText;
}

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
var handleFormSubmit = function handleFormSubmit(event) {

  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();

  // Call our function to get the form data.
  var data = formToJSON(form.elements);

  // Demo only: print the form data onscreen as a formatted JSON object.
  var dataContainer = document.getElementsByClassName('results__display')[0];

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");

  // ...this is where we’d actually do something with the form data...
};

/*
 * This is where things actually get started. We find the form element using
 * its class name, then attach the `handleFormSubmit()` function to the 
 * `submit` event.
 */
var form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);