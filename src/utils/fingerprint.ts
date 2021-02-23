import Fingerprint2 from 'fingerprintjs2'
import UAParser from 'ua-parser-js'

export default async function getFingerprint() {
    const options = {
        excludes: {
            plugins: true,
            localStorage: true,
            adBlock: true,
            screenResolution: true,
            availableScreenResolution: true,
            enumerateDevices: true,
            pixelRatio: true,
            doNotTrack: true,
        },
        preprocessor: (key: any, value: any) => {
            if (key === 'userAgent') {
                const parser = new UAParser(value)
                return `${parser.getOS().name} :: 
                        ${parser.getBrowser().name} :: 
                        ${parser.getEngine().name}`
            }
            return value
        },
    }

    try {
        const components = await Fingerprint2.getPromise(options)
        const values = components.map((component) => component.value)

        return String(Fingerprint2.x64hash128(values.join(''), 31))
    } catch (err) {
        console.log('Get fingerprint error: ', err)
    }
}
