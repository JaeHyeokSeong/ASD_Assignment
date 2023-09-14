const propertyForm = document.getElementById('property-form');
const propertyNameInput = document.getElementById('property-name');
const propertyValueInput = document.getElementById('property-value');
const propertyList = document.getElementById('property-list');
const updatePropertyForm = document.getElementById('update-property-form');
const updatePropertySelect = document.getElementById('update-property');
const newPropertyValueInput = document.getElementById('new-property-value');
const deletePropertyForm = document.getElementById('delete-property-form');
const deletePropertySelect = document.getElementById('delete-property');

// Initialize property options
function initPropertyOptions() {
    updatePropertySelect.innerHTML = '';
    deletePropertySelect.innerHTML = '';

    const properties = Array.from(propertyList.children).map(li => li.textContent.trim());

    properties.forEach(property => {
        const option = document.createElement('option');
        option.textContent = property;
        updatePropertySelect.appendChild(option);

        const deleteOption = option.cloneNode(true);
        deletePropertySelect.appendChild(deleteOption);
    });
}

// Add a new property
// function addProperty() {
//     const propertyName = propertyNameInput.value.trim();
//     const propertyValue = propertyValueInput.value.trim();
//
//     if (propertyName && propertyValue) {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${propertyName}: ${propertyValue}`;
//         propertyList.appendChild(listItem);
//
//         // Clear input fields
//         propertyNameInput.value = '';
//         propertyValueInput.value = '';
//
//         // Update property options
//         initPropertyOptions();
//     }
// }


// Function to check if a string is a valid integer
function isValidInteger(str) {
    return /^\d+$/.test(str);
}


// Add a new property
function addProperty() {
    const propertyName = propertyNameInput.value.trim();
    const propertyValue = propertyValueInput.value.trim();

    // Check if the property name already exists
    const existingProperties = Array.from(propertyList.children).map(li => li.textContent.split(':')[0].trim());

    if (existingProperties.includes(propertyName)) {
        alert(`Property "${propertyName}" already exists. Please enter a different property name.`);
        return; // Exit the function without adding the property
    }

    // Check if propertyValue is a valid integer
    if (!isValidInteger(propertyValue)) {
        alert("Property Value must be a valid integer.");
        return; // Exit the function without adding the property
    }

    if (propertyName && propertyValue) {
        const listItem = document.createElement('li');
        listItem.textContent = `${propertyName}: ${propertyValue}`;
        propertyList.appendChild(listItem);

        // Clear input fields
        propertyNameInput.value = '';
        propertyValueInput.value = '';

        // Update property options
        initPropertyOptions();
    }
}


// Update an existing property
function updateProperty() {
    const selectedProperty = updatePropertySelect.value.trim();
    const newPropertyValue = newPropertyValueInput.value.trim();

    // Check if propertyValue is a valid integer
    if (!isValidInteger(newPropertyValue)) {
        alert("New Property Value must be a valid integer.");
        return; // Exit the function without adding the property
    }

    if (selectedProperty && newPropertyValue) {
        const propertyToUpdate = Array.from(propertyList.children).find(li => li.textContent.trim() === selectedProperty);

        if (propertyToUpdate) {
            propertyToUpdate.textContent = `${selectedProperty.split(':')[0]}: ${newPropertyValue}`;
            newPropertyValueInput.value = '';

            // Update property options
            initPropertyOptions();
        }
    }
}

// Delete an existing property
function deleteProperty() {
    const selectedProperty = deletePropertySelect.value.trim();

    if (selectedProperty) {
        const propertyToDelete = Array.from(propertyList.children).find(li => li.textContent.trim() === selectedProperty);

        if (propertyToDelete) {
            propertyList.removeChild(propertyToDelete);

            // Update property options
            initPropertyOptions();
        }
    }
}

// Initialize property options when the page loads
window.addEventListener('load', initPropertyOptions);
