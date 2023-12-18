function setupDynamicDropdown(parentDropdownId, childDropdownId, optionSets, defaultValue) {
    // Get the parent dropdown
    var parentDropdown = document.getElementById(parentDropdownId);

    // Get the child dropdown
    var childDropdown = document.getElementById(childDropdownId);

    // Save the initial options for the child dropdown
    var initialChildOptions = Array.from(childDropdown.options);

    // Add an event listener to the parent dropdown
    parentDropdown.addEventListener('change', function () {
        // Get the selected value from the parent dropdown
        var selectedValue = this.value;

        // Clear existing options for both child and grandchild dropdowns
        clearOptions(childDropdown);

        // Add dynamic options based on the selected value
        if (optionSets[selectedValue]) {
            addOptions(childDropdown, optionSets[selectedValue]);
        }

        // Set default value in the child dropdown if provided
        if (defaultValue) {
            childDropdown.value = defaultValue;
        }

        // Trigger the change event for the child dropdown
        triggerChangeEvent(childDropdown);
    });

    // Function to clear options in a dropdown
    function clearOptions(dropdown) {
        dropdown.innerHTML = '';
        initialChildOptions.forEach(function (option) {
            var newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.text = option.text;
            dropdown.add(newOption);
        });
    }

    // Function to trigger a change event for a dropdown
    function triggerChangeEvent(element) {
        var event = new Event('change');
        element.dispatchEvent(event);
    }
}

function addOptions(dropdown, options) {
    // Add options to the dropdown
    options.forEach(function (option) {
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        dropdown.add(optionElement);
    });
}

var ssOptions = {
    '支店A': ['AASS', 'ABSS', 'ACSS'],
    '支店B': ['BASS', 'BBSS', 'BCSS']
};

var middleItemOptions = {
    '大項目A': ['中項目Aa', '中項目Ab'],
    '大項目B': ['中項目Ba', '中項目Bb'],
    '大項目C': ['中項目Ca', '中項目Cb']
};

var subItemOptions = {
    '中項目Aa': ['小項目Aa1', '小項目Aa2'],
    '中項目Ab': ['小項目Ab1', '小項目Ab2'],
    '中項目Ba': ['小項目Ba1', '小項目Ba2'],
    '中項目Bb': ['小項目Bb1', '小項目Bb2'],
    '中項目Ca': ['小項目Ca1', '小項目Ca2'],
    '中項目Cb': ['小項目Cb1', '小項目Cb2']
};

setupDynamicDropdown('sucursal', 'ss', ssOptions);
setupDynamicDropdown('mainItem', 'middleItem', middleItemOptions, 'subItem');
setupDynamicDropdown('middleItem', 'subItem', subItemOptions);

async function validateForm(event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Reset error messages
    resetErrorMessages();

    // Validate each required field
    var isValid = true;
    var requiredFields = document.querySelectorAll('[required-custom]');
    requiredFields.forEach(function (field) {
        var errorMessageId = field.id + '-error-message';
        var errorMessageElement = document.getElementById(errorMessageId);
        var customErrorMessage = field.getAttribute('data-error-message') || 'This field is required.';
        if (!field.value.trim()) {
            errorMessageElement.textContent = customErrorMessage;
            isValid = false;
        }
    });

    // Validate fields with pattern
    var patternFields = document.querySelectorAll('[data-pattern]');
    patternFields.forEach(function (field) {
        var pattern = new RegExp(field.getAttribute('data-pattern'));
        var patternErrorMessage = field.getAttribute('data-pattern-error-message') || 'Invalid format.';
        if (!pattern.test(field.value.trim())) {
            var errorMessageId = field.id + '-error-message';
            var errorMessageElement = document.getElementById(errorMessageId);
            errorMessageElement.textContent = patternErrorMessage;
            isValid = false;
        }
    });

    // If all required fields are filled and pattern is valid, submit the form
    if (isValid) {
        try {
            var form = document.getElementById('myForm');

            // Create an empty object to store form values
            var formData = {};
            for (var i = 0; i < form.elements.length; i++) {
                var element = form.elements[i];
        
                // Check if the element is an input, select, or textarea
                if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                    // Add the field name and value to the formData object
                    formData[element.name] = element.value;
                }
            }

            var jsonData = {
                data: formData
            };
        
            const response = await fetch('https://t9c752qnde.execute-api.us-east-1.amazonaws.com/prod/save-request-data', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (response.ok) {
                // Check the Content-Type header
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    // Parse JSON only if the Content-Type is JSON
                    const responseData = await response.json();
                    console.log('Response DATA:', responseData);
                } else {
                    // Handle non-JSON responses
                    const textData = await response.text();
                    console.log('Non-JSON Response DATA:', textData);
                }
            } else {
                console.error('Error:', response.status, response.statusText);
            }

            displayTable(); // Display the table after successful submission

        } catch (error) {
            console.error('Error calling API:', error);
        }
        
    }
}

async function displayTable() {

    const response = await fetch('https://t9c752qnde.execute-api.us-east-1.amazonaws.com/prod/get-request-data', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        // Check the Content-Type header
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            // Parse JSON only if the Content-Type is JSON
            const jsonData = await response.json();

            // Get the result table
            var resultTable = document.getElementById('resultTable');

            // Display the table
            resultTable.style.display = 'table';

            // Populate the table with rows based on the JSON data
            var tbody = resultTable.querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing rows

            // Create rows based on the JSON data
            for (var i = 0; i < jsonData.length; i++) {
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + jsonData[i].部品名 + '</td><td>' + jsonData[i].故障尤度 + '</td><td>';
                tbody.appendChild(row);
            }

        } else {
            // Handle non-JSON responses
            const textData = await response.text();
            console.log('Non-JSON Response DATA:', textData);
        }
    } else {
        console.error('Error:', response.status, response.statusText);
    }    
}


// Function to reset error messages
function resetErrorMessages() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (errorMessage) {
        errorMessage.textContent = '';
    });
}