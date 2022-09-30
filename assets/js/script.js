const urlBase = "https://mindicador.cl/api"
const resultado = document.querySelector("#resultado")
const btn = document.querySelector("#btn")
const error = document.querySelector("#error")
const canvas = document.querySelector("#myChart")


async function getCurrencyData() {
    try {
        const input = document.querySelector("#input").value
        const selectDivisa = document.querySelector("#divisa").value
        const urlApi = `${urlBase}/${selectDivisa}`
        const res = await fetch(urlApi)
        const resJson = await res.json()
        const valorIngresado = resJson.serie[0]["valor"]

        const calculo = Number(input) / valorIngresado
        resultado.innerHTML = calculo

        // //gráfico en canvas

        const labels = resJson.serie.slice(0, 10).map((currencyData) => {
            return currencyData.fecha
        })

        const data = resJson.serie.slice(0, 10).map((currencyData) => {
            return currencyData.valor
        })

        const datasets = [{
            label: "currency",
            borderColor: "rgb(255, 99, 132)",
            data
        }]

        const objetoDataSets = {
            labels,
            datasets
        };

        const config = {
            type: "line",
            data: objetoDataSets
        }
        canvas.style.backgroundColor = "white";
        new Chart(canvas, config)



    } catch (e) {
        error.innerHTML = "ERROR"
    }

}
btn.addEventListener("click", getCurrencyData)