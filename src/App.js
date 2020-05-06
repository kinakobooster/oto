import React from 'react';
import './App.css';
import * as Tone from 'tone'

const synth = new Tone.PolySynth().toMaster()

const makeSomeNoise = (note) => synth.triggerAttackRelease(note,"4n")
const makeSomeChord = (array) => synth.triggerAttackRelease(array,"4n")
const transposeNoteFromC4 = (number) => Tone.Frequency("C3").transpose(number).toNote()
const transposeNoteFromKey = (number, keyNote) => Tone.Frequency(keyNote).transpose(number).toNote()
let keyNote = "C3"

function App() {
  const scale = [0,2,4,5,7,9,11] // length 7
  const scaleNotes = scale.map((e) => transposeNoteFromKey(e, "C3"))
  const scaleNotesFromKey = (keyNote) = scale.map((e) => transposeNoteFromKey(e, keyNote))


  // 和音をつくる
  const makeHarmony = (start,array) => Tone.Frequency(start).harmonize(array).map(e => e.toNote())
　// いろんな和音をつくる
  const majorHarmony = (start) => makeHarmony(start,[-12,0,4,7])
  const majorHarmony2nd = (start) => makeHarmony(start,[-12,4,7,12])
  const majorHarmony3rd = (start) => makeHarmony(start,[-12,7, 12, 16])
  const minorHarmony = (start) => makeHarmony(start,[-12,0, 3, 7])
  const minorHarmony2nd = (start) => makeHarmony(start,[-12,3, 7, 12])
  const minorHarmony3rd = (start) => makeHarmony(start,[-12,7, 12, 15])

  // ダイアトニックかしらべる
  const isDiatonic = (array) => {
    const scale = scaleNotes.map((e) => e.slice(0,-1)) // 最後の数字を取る（オクターブ違い対策）
    const strippedchord = array.map((e) => e.slice(0,-1)).filter((e) => (!scale.includes(e))) //スケールに含まれる音を取る
    return strippedchord.length == 0
  }

  return (
    <>
    <h2>note</h2>
    {scaleNotes.map((e) => {
      return <button onClick={() => makeSomeNoise(e)} >{e}</button>})}
    <h2>major chord</h2>
      {scaleNotes.map((e) => {
      const harmony = majorHarmony(e)
      const harmony2nd = majorHarmony2nd(e)
      const harmony3rd = majorHarmony3rd(e)
      return <div className={isDiatonic(harmony) ? 'blue' : '' }>
      <button onClick={() => makeSomeChord(harmony)} >{e}</button>
      <button onClick={() => makeSomeChord(harmony2nd)} >{e}.2nd</button>
      <button onClick={() => makeSomeChord(harmony3rd)} >{e}.3rd</button>
      </div>
      })}
    <h2>minor chord</h2>
      {scaleNotes.map((e) => {
      const harmony = minorHarmony(e)
      const harmony2nd = minorHarmony2nd(e)
      const harmony3rd = minorHarmony3rd(e)
      return <div className={isDiatonic(harmony) ? 'blue' : '' }>
      <button onClick={() => makeSomeChord(harmony)} >{e}m</button>
      <button onClick={() => makeSomeChord(harmony2nd)} >{e}m.2nd</button>
      <button onClick={() => makeSomeChord(harmony3rd)} >{e}m.3rd</button>
      </div>
      })}
    </>
  )
}

export default App;
