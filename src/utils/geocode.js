const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFtaXJlemFsZWpvIiwiYSI6ImNqdmlqOGR5bDA2b2Y0M29ndnZiaXRwemgifQ.zYsGINTyyKjgosY8fMeL9g&limit=1&language=es`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ message: 'Unable to connect to location service' }, undefined)
        }
        else if (!body.features || body.features.length == 0) {
            callback({ message: 'Unable to find location with given parameters' }, undefined)
        }
        else {
            const feature = body.features[0]
            const latutide = feature.center[1]
            const longitude = feature.center[0]
            callback(undefined, { latutide, longitude, location: feature.place_name })

        }

    })
}

module.exports = geocode