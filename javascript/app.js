import { countries, countries as country} from "./countries.js"
import { storeCountries } from "./countries.js"
// Theme Mode (Dark/Light Mode) 

document.querySelector('.theme-switch-wrapper').addEventListener('click', e => {
   document.querySelector('.app-container').classList.toggle('theme-toggle')
})

/* Initialize the countries */
const init = async () => {
   await storeCountries()
   return country
} 
/* This call dynamically sorting the countries alphabetically then appending the options (country) in select */

const display_options = async () => {
   try {
      console.log('Connected to Api!');
      const countries = await init()
      if(!countries) throw new Error('Failed to Connect to Api')
      console.log(countries)

      const country_selector = document.getElementById('country-selector')
      
      const sortedCountries = Object.values(countries).sort((a, b) => {
         return a.name.common.localeCompare(b.name.common);
      })

      sortedCountries.forEach(country => {
         const option = document.createElement('option')

         option.innerText = country.name.common
         option.setAttribute('value', country.cca2)

         country_selector.appendChild(option)
      })
   } catch (error) {
      console.log(error);
   }
}

 document.querySelector('.btn-submit-mock').addEventListener('click', async (e) => {
   try {
      const country = await getCountry()
      console.log(country);
      
      console.log(country_details(country));
      console.log(`Fetch the ${country.name.common}!`);
   } catch (error) {
      console.error("Fetch intercepted an error:", error.message)
   }
})

const getCountry = async () => {
   const countries = await init()
   if(!countries) throw new Error('Failed to Connect to Api')
   const country_code = document.getElementById('country-selector').value
   console.log(country_code);

   // get countries through bracket notation
   const country = countries[country_code]
   return country
}

const country_details = (country) => {
   return {
      name              : country.name.common,
      currency          : Object.keys(country.currencies)[0],
      isIndependent     : country.independent,
   }
}

setTimeout(() => {
   display_options()
}, 2000)