import React, { useState, useRef, useEffect} from "react"
import * as Tone from "tone";

export default () => {
  const [loaded, setLoaded] = useState(false)
  const synth = useRef<Tone.Synth>(null)

  useEffect(() => {
    synth.current = new Tone.Synth().toDestination()
    synth.current.oscillator.type = "sine"
    synth.current.envelope.attack = 0.05
    Tone.Synth
  })

  async function start() {
    await Tone.start()
    synth.current?.triggerAttackRelease("C4", "8n", Tone.now())
  
  }

  return (
    <div className="p-5 flex gap-5">
      <button className="button" onClick={start}>Start</button>
    </div>
  )
}