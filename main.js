// let btn = document.querySelector('.btn')
// let inputt = document.querySelector('.form-control')

// let show = document.querySelector('.js-card-container')

// btn.addEventListener('click', e => {
//     e.preventDefault()
//     let pokemonName = inputt.value
//     let dataa = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.status)
//             }
//             return resp.json()
//         })
//         .then(pokemon => {
//             for (const i of pokemon.abilities) {
//                 show.innerHTML += `<span>ability: ${i.ability.name}</span><br>`
//             }
//             for (const key in pokemon) {
//                 if (key == 'height') {
//                     show.innerHTML += `<span>heigth: ${pokemon[key]}</span><br>`
//                 }
//                 if (key == 'weight') {
//                     show.innerHTML += `<span>weight: ${pokemon[key]}</span><br><br>`
//                 }
                
//             }
//         })
//     return dataa
// })



let countryInput = document.querySelector('.countryInput')
let timeoutId

let versionField = document.querySelector('.versionField')
let index = 0

let arr =[]

countryInput.addEventListener('input', () => {
    versionField.textContent = ''
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {

        let dataa = fetch(`https://restcountries.com/v3.1/name/${countryInput.value}`)
        .then(resp => {
            if (!resp.ok) {
                alert('error, try again')
                throw new Error(resp.status)
            }
            return resp.json()
        })
        .then(countries => {
            for (const i of countries) {
                arr.push(i.name.common)
                versionField.innerHTML += `<span class="oneVersion" id="${index++}">${i.name.common}</span><br>`
            }

            if (arr.length > 10) {
                versionField.textContent = ''
                alert('to many results')
                arr.splice(0, arr.length)
            }

            versionField.addEventListener('click', e => {
                let countryName
                if (e.target.classList.contains('oneVersion')) {
                    const id = e.target.id;
                    countryName = arr[id];
                    versionField.textContent = ''
                }

                for (const i of countries) {
                    if (countryName == i.name.common) {
                        let countryContent = ""

                        countryContent += `<img src="${i.flags.png}">`;
                        countryContent += `<ul><b>Capital/s:</b>`;
                        i.capital.forEach(capital => {
                            countryContent += `<li>${capital}</li>`;
                        });
                        countryContent += `</ul>`;
                        countryContent += `<p><b>Population:</b> ${i.population}</p>`;
                        countryContent += `<ul><b>Language/s:</b>`;
                        for (const key in i.languages) {
                            countryContent += `<li>${i.languages[key]}</li>`;
                        }
                        countryContent += `</ul>`;

                        versionField.innerHTML = countryContent;
                    }
                }
                
            })
        })
        return dataa

    }, 1000)
})

