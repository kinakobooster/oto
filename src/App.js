import React from 'react';
import './App.css';
import * as Tone from 'tone'

const synth = new Tone.PolySynth().toMaster()

const makeSomeNoise = (note) => synth.triggerAttackRelease(note,"4n")
const makeSomeChord = (array) => synth.triggerAttackRelease(array,"2n")

const transposeNoteFromC4 = (number) => Tone.Frequency("C3").transpose(number).toNote()
const transposeNoteFromKey = (number, keyNote) => Tone.Frequency(keyNote).transpose(number).toNote()
let keyNote = "C3"
const defaultBpm = 144
Tone.Transport.bpm.value = defaultBpm

const score = []

const scale = [0,2,4,5,7,9,11] // length 7
const scaleNotes = scale.map((e) => transposeNoteFromKey(e, "C3"))
const scaleNotesFromKey = (keyNote) = scale.map((e) => transposeNoteFromKey(e, keyNote))


// 和音をつくる
const makeHarmony = (start,array) => Tone.Frequency(start).harmonize(array).map(e => e.toNote())
// いろんな和音をつくる
const majorHarmony = (start) => makeHarmony(start,[-12,0,4,7])
const majorHarmony2iv = (start) => makeHarmony(start,[-12,4,7,12])
const majorHarmony3iv = (start) => makeHarmony(start,[-12,7, 12, 16])

const major7Harmony = (start) => makeHarmony(start,[-12,0,4,7,11])
const major9Harmony = (start) => makeHarmony(start,[-12,0,4,9,14])

const minorHarmony = (start) => makeHarmony(start,[-12,0, 3, 7])
const minorHarmony2iv = (start) => makeHarmony(start,[-12,3, 7, 12])
const minorHarmony3iv = (start) => makeHarmony(start,[-12,7, 12, 15])

// ダイアトニックかしらべる
const isDiatonic = (array) => {
  const scale = scaleNotes.map((e) => e.slice(0,-1)) // 最後の数字を取る（オクターブ違い対策）
  const strippedchord = array.map((e) => e.slice(0,-1)).filter((e) => (!scale.includes(e))) //スケールに含まれる音を取る
  return strippedchord.length === 0
}

//楽譜を触る


const scoreVisible = (score) => score.map((e) => e.chordName)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      score: new Array()};
    this.pushToScore = this.pushToScore.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.loop()
  }
  handleLoop() {
    this.setState({isPlay: !this.state.isPlay})
  }
  pushToScore(array, chordName) {
    this.setState(
      {score: [...this.state.score, {chordName:chordName, sound: array}]}
      )
    }
  soundFromStack(){
    if (this.state.score.length !== 0) {
      let score = this.state.score
      makeSomeChord(score.shift().sound)
      this.setState(
        {score: score}
      )
    }
  }
  loop(){
    setInterval(() => {
    if (!this.state.isPlay) return
    console.log('beats!')
    this.soundFromStack()
    }, 2 / defaultBpm * 60 * 1000)
  }
  render() {
  return (
    <>
    <button
    onClick={() => this.handleLoop()}
    >{this.state.isPlay ? 'stop' : 'start' }</button>
    <h2>score</h2>
    {scoreVisible(this.state.score).join()}
    <h2>note</h2>
    {scaleNotes.map((e) => {
      return <button onClick={() => makeSomeNoise(e)} >{e}</button>})}
    <h2>major chord</h2>
      {scaleNotes.map((e) => {
      const harmony = majorHarmony(e)
      const harmony2iv = majorHarmony2iv(e)
      const harmony3iv = majorHarmony3iv(e)
      const harmony7th = major7Harmony(e)
      const harmony9th = major9Harmony(e)
      return <div className={isDiatonic(harmony) ? 'blue' : '' }>
      <button onClick={() => this.pushToScore(harmony, e.slice(0,1))} >{e.slice(0,1)}</button>
      <button onClick={() => this.pushToScore(harmony2iv, e.slice(0,1))} >{e.slice(0,1)}.2iv</button>
      <button onClick={() => this.pushToScore(harmony3iv, e.slice(0,1))} >{e.slice(0,1)}.3iv</button>
      <button onClick={() => this.pushToScore(harmony7th, e.slice(0,1)+"7")} >{e.slice(0,1)}7</button>
      <button onClick={() => this.pushToScore(harmony9th, e.slice(0,1)+"9")} >{e.slice(0,1)}9</button>
      </div>
      })}
    <h2>minor chord</h2>
      {scaleNotes.map((e) => {
      const harmony = minorHarmony(e)
      const harmony2iv = minorHarmony2iv(e)
      const harmony3iv = minorHarmony3iv(e)
      return <div className={isDiatonic(harmony) ? 'blue' : '' }>
      <button onClick={() => this.pushToScore(harmony, e.slice(0,1)+"m")} >{e.slice(0,1)}m</button>
      <button onClick={() => this.pushToScore(harmony2iv, e.slice(0,1)+"m")} >{e.slice(0,1)}m.2iv</button>
      <button onClick={() => this.pushToScore(harmony3iv, e.slice(0,1)+"m")} >{e.slice(0,1)}m.3iv</button>
      </div>
      })}
    </>
  )
  }
}

export default App;
