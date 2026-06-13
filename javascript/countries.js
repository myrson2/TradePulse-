export const countries = {}

const fetch_countries = async () => {
    try {
        const response = await fetch('./database/countries.json')
        if (!response.ok) throw new Error(`Status code: ${response.status}`);
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Could not load country database:", error);
        return [];
    }
}

export const storeCountries = async () => {
    const data_countries = await fetch_countries()
    if (Array.isArray(data_countries)) {
        data_countries.forEach(country => {
            if (country.cca2) {
                countries[country.cca2] = country;
            }
        })
    }
}

