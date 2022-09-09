// EcmaScript 2015 - ES6 Modules
// import resetControls from "./controls.js" // default import
import Controls from "./controls.js"
// import { countdown, resetTimer } from "./timer.js" // named import
import Timer from "./timer.js"
import Sound from "./sounds.js"
import Events from "./events.js"
import {
    buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop,
    minutesDisplay,
    secondsDisplay
} from "./elements.js"

const controls = Controls({
    buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop
})

const timer = Timer({
    minutesDisplay,
    secondsDisplay,
    resetControls: controls.reset,
})

const sound = Sound()

Events({controls, timer, sound})