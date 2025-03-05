import React, { useState, useRef, useEffect} from "react"
import * as Tone from "tone";



function playPattern(startTime: number, synth: Tone.Synth, notes: Tone.Unit.Frequency[], durations: Tone.Unit.Time[]) {
  
  function scheduleRandomNote(time: number) {
    const note = notes[Math.floor(Math.random() * notes.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    synth.triggerAttackRelease(note, duration, time);
    Tone.getTransport().scheduleOnce(scheduleRandomNote, `+${duration}`);
  }

  Tone.getTransport().scheduleOnce(scheduleRandomNote, startTime);
}


export default () => {
  const [loaded, setLoaded] = useState(false)
  const synth1 = useRef<Tone.Synth>(new Tone.Synth())
  const synth2 = useRef<Tone.Synth>(new Tone.Synth())


  useEffect(() => {
    synth1.current.toDestination()
    synth1.current.oscillator.type = "sine"
    synth1.current.envelope.attack = 0.05

    synth2.current.toDestination()
    synth2.current.oscillator.type = "amsawtooth"
    synth2.current.envelope.attack = 0.05
    Tone.Synth
  })

  async function startPattern1() {
    await Tone.start()
    Tone.getTransport().start("+0.1");
    playPattern(Tone.getTransport().nextSubdivision("1m"), synth1.current, ["A4","C5","E5"],["4n"])
  }

  async function startPattern2() {
    await Tone.start()
    Tone.getTransport().start("+0.1");
    playPattern(Tone.getTransport().nextSubdivision("1m"), synth2.current, ["A3","C4","E4"],["8n"])
  }

  return (
    <div className="p-5 flex gap-5">
      <button className="button" onClick={startPattern1}>Pattern 1</button>
      <button className="button" onClick={startPattern2}>Pattern 2</button>
    </div>
  )
}