const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

//similar a DOMContentLoader
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})


function buscarClima(e) {
    e.preventDefault()

    //validar formulario
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios')
        return
    }

    //consultar API
    consultarApi(ciudad, pais)
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta){
        //Creamos alerta con scripting
        const alerta = document.createElement('div')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        alerta.innerHTML = ` 
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `
    
        container.appendChild(alerta)

        //Eliminar alerta despues de 5 segundos
        setTimeout(() => {
            alerta.remove()
        }, 5000);
    }
}

function consultarApi(ciudad, pais) {
    
    //appId se coloca el numero que tenemos de APIKey
    const appId = 'a80b28fe88dc92d8f0b042c3a4fe968a'
    //url se coloca el llamado a la api segun la documentacion de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada')
            }
        })
}