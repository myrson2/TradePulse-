export const countries = {}

const fetch_countries = async () => {
    try {
        const response = await fetch('./database/countries.json')
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Could not load country database:", error);
    }
}

const storeCountries = async () => {
    const data_countries = await fetch_countries()
    
    data_countries.forEach(country => {
        countries[country.cca2] = country
    })
}

storeCountries()
