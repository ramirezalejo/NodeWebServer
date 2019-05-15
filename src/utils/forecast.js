const request = require('request')



const forecast = (latutide, longitude, callback) => {
    url = `https://api.darksky.net/forecast/6b4e57d1c7a2e535ef03748bea8844b2/${latutide},${longitude}?units=si&lang=es`
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback({ message: 'Unable to connect to weather service' }, undefined)
        }
        else if (body.error) {
            callback({ message: body.error }, undefined)
        }
        else {
            const currently = body.currently
            callback(undefined, { message: `${body.daily.data[0].summary} Temperatura  ${currently.temperature} grados centigrados en exteriores. Hay una probabilidad de lluvia de ${currently.precipProbability * 100} % ` })
        }

    })
}


module.exports = forecast