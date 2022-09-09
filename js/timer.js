import Sounds from "./sounds.js"

export default function Timer({
    minutesDisplay,
    secondsDisplay,
    resetControls,
    sound
}) {
    let timerTimeOut
    let minutes = Number(minutesDisplay.textContent)

    function updateDisplay(newMinutes, seconds) {
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        // Se o newMinutes for undefined, então coloque o minutes, se não, coloque o newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minutesDisplay.textContent = String(newMinutes).padStart(2, "0") // quando tiver só um caracter, preencha com 0 o caracter anterior
        secondsDisplay.textContent = String(seconds).padStart(2, "0")
        // padStart: preenchimento de dado inicial que recebe como argumentos o total de caracteres na string e a string que deve utilizar para preencher
    }

    function reset() { // como não foi passado os minutes, vai buscar no escopo anterior, nesse caso, o escopo global
        updateDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
        // no clearTimeout, o JS vai procurar dentro dos timeouts o id numérico timerTimeOut e fazer o clear, parando o setTimeout inteiro
    }

    function countdown() {
        // setTimeout recebe como parâmetros uma função callback e o tempo para executar essa função
        timerTimeOut = setTimeout(function() {
            let seconds = Number(secondsDisplay.textContent)
            let minutes = Number(minutesDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <= 0

            updateDisplay(minutes, 0)
            
            if (isFinished) {
                resetControls()
                updateDisplay()
                Sounds().timeEnd()
                return
            }

            if (seconds <= 0) { 
                seconds = 60
                --minutes
            }

            updateDisplay(minutes, String(seconds -1))

            countdown()
        }, 1000)
    }

    function updateMinutes(newMinutes) {
        minutes = newMinutes
    }

    function hold() {
        clearTimeout(timerTimeOut)
    }

    return {
        updateDisplay,
        reset,
        countdown,
        updateMinutes,
        hold
    }
}
