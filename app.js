// Theme Mode (Dark/Light Mode) 

document.querySelector('.theme-switch-wrapper').addEventListener('click', e => {
   document.querySelector('.app-container').classList.toggle('theme-toggle')
})

// target sourcing country feature 
/*
1. fetch all the name of the country / 
2. Render it all through dom in select options /
3. It must return the object country when click the calculate cost overhead
*/

/* Fetch all the name of the country */
const countries = async () => {
   try {
      const url = 'https://restcountries.com/v3.1/all?fields=name,cca2'
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Server returned error status: ${response.status}`)

      const getResponse = await response.json()
      return getResponse
   } catch (error) {
      console.error("Fetch intercepted an error:", error.message)
   }
}

countries().then(data => {
   console.log(data);
   const country_selector = document.getElementById('country-selector')
   
   /* It sorts the countries alphabetically */
   const sortedCountries = data.sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
   });
   
   sortedCountries.forEach(country => {
      const option = document.createElement('option')

      option.innerText = country.name.common
      option.setAttribute('value', country.cca2)

      country_selector.appendChild(option)
   });
});

// When clicked return the country 
document.querySelector('.btn-submit-mock').addEventListener('click', async (e) => {
  try {
   const country_code = document.getElementById('country-selector').value

   const response = await fetch(`https://restcountries.com/v3.1/alpha/${country_code}`)
   const countryData = await response.json();

   console.log(countryData);
  } catch (error) {
   console.error("Fetch intercepted an error:", error.message)
  }
})