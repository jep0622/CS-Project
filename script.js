// Common utility scripts

// Function to get URL parameters
function getUrlParameter(name) {
    const formattedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + formattedName + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Toggle dropdown functionality
function toggleDropdown(headerElement, contentElement) {
    contentElement.classList.toggle('show');
    headerElement.classList.toggle('active');
    
    // Update border radius based on state
    headerElement.style.borderRadius = contentElement.classList.contains('show') ? 
        '5px 5px 0 0' : '5px';
}