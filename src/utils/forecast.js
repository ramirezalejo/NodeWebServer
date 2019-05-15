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
            console.log(body.daily.data[0])
            callback(undefined, { message: `${body.daily.data[0].summary} Temperatura actual  ${currently.temperature} grados centigrados, minima ${body.daily.data[0].temperatureMin}, maxima ${body.daily.data[0].temperatureMax}. Hay una probabilidad de lluvia de ${body.daily.data[0].precipProbability * 100} % ` })
        }

    })
}


module.exports = forecast