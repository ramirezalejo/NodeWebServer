

const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    p1.textContent = 'Loading...'
    p2.textContent = ''

    fetch(`/weather?address="${searchQuery.value}"`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error.message
                p2.textContent = ''
                console.log(data.error)
            }
            else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }

        })
    })

})