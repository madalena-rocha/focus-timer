import Sounds from "./sounds.js"

// Factory: função que retorna um objeto
export default function Timer({ // injeção de dependências
    // desestruturando o objeto diretamente nos parâmetros
    minutesDisplay,
    secondsDisplay,
    resetControls,
    sound
}) {
    let timerTimeOut
    let minutes = Number(minutesDisplay.textContent)

    function updateDisplay(newMinutes, seconds) {
        // newMinutes = newMinutes || minutes // considera qualquer falsy (false, 0, "") no newMinutes
        // seconds = seconds || 0
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        // Se o newMinutes for undefined, então coloque o minutes, se não, coloque o newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
        secondsDisplay.textContent = String(seconds).padStart(2, "0")
        /*
            padStart: preenchimento de dado inicial
            recebe como argumentos o total de caracteres na string e a string que deve utilizar para preencher
            quando tiver só um caracter, preencha com 0 o caracter anterior
        */
    }

    function reset() { // como não foi passado os minutes, vai buscar no escopo anterior, nesse caso, o escopo global
        updateDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
        // no clearTimeout, o JS vai procurar dentro dos timeouts o id numérico timerTimeOut e fazer o clear, parando o setTimeout inteiro
    }

    /*
        Event-driven: a DOM é uma programação direcionada a eventos
        Programação imperativa: dá ordens passo a passo do que deve ser feito
        Programação declarativa: não fala passo a passo o que deve fazer; só fala o que fazer, e não como fazer
        Callback: função passada como argumento para outra função que será executada depois de um tempo
    */

    function countdown() {
        // setTimeout recebe como parâmetros uma função callback e o tempo para executar essa função
        timerTimeOut = setTimeout(function() {
            let seconds = Number(secondsDisplay.textContent)
            let minutes = Number(minutesDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <= 0

            // secondsDisplay.textContent = String(seconds - 1).padStart(2, "0")
            updateDisplay(minutes, 0)
            
            if (isFinished) {
                resetControls()
                updateDisplay()
                Sounds().timeEnd()
                return // quando uma função encontra um retorno, ela para de executar
            }

            if (seconds <= 0) { 
                seconds = 60
                // minutesDisplay.textContent = String(minutes -1).padStart(2, "0")
                --minutes
            }

            // secondsDisplay.textContent = String(seconds -1).padStart(2, "0")
            updateDisplay(minutes, String(seconds -1))

            countdown() // recursividade: quando uma função chama ela mesma
        }, 1000)
    }

    function updateMinutes(newMinutes) {
        minutes = newMinutes
    }

    function hold() {
        clearTimeout(timerTimeOut)
    }

    // export {countdown, resetTimer} // named export
    return {
        updateDisplay,
        reset,
        countdown,
        updateMinutes,
        hold
    }
}
// export function Timer() {} é o mesmo que criar function Timer() {} e depois export {Timer}