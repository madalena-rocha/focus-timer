export default function Controls({
    buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop
}) {
    function play() {
        buttonPlay.classList.add('hide')
        buttonPause.classList.remove('hide')
        buttonSet.classList.add('hide')
        buttonStop.classList.remove('hide')
    }

    function pause() {
        buttonPause.classList.add('hide')
        buttonPlay.classList.remove('hide')
    }
    
    function reset() { // proramação imperativa
        buttonPlay.classList.remove('hide')
        buttonPause.classList.add('hide')
        buttonSet.classList.remove('hide')
        buttonStop.classList.add('hide')
    }

    function getMinutes() {
        // minutes = prompt('Quantos minutos?') || 0
        // pega o primeiro valor passado ou o próximo valor passado se não encontrar nada no primeiro valor ou for null ou undefined
        let newMinutes = prompt('Quantos minutos?')
        if (!newMinutes) {
            return false
        }

        return newMinutes
    }

    // export default resetControls // default export
    return {
        play,
        pause,
        reset,
        getMinutes
    }
}