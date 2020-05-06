import React from "react";
import "./App.css";
import * as Tone from "tone";
import ChordCard from "./chordCard";

const synth = new Tone.PolySynth().toMaster();

const makeSomeNoise = (note) => synth.triggerAttackRelease(note, "4n");
const makeSomeChord = (array) => synth.triggerAttackRelease(array, "2n");

const transposeNoteFromC4 = (number) =>
  Tone.Frequency("C3").transpose(number).toNote();
const transposeNoteFromKey = (number, keyNote) =>
  Tone.Frequency(keyNote).transpose(number).toNote();

let keyNote = "C3";
const defaultBpm = 144;
Tone.Transport.bpm.value = defaultBpm;

const scale = [0, 2, 4, 5, 7, 9, 11]; // length 7
const scaleNotes = scale.map((e) => transposeNoteFromKey(e, "C3"));
const scaleNotesFromKey = (keyNote = scale.map((e) =>
  transposeNoteFromKey(e, keyNote)
));
const OCTAVE = 12;
const CHORDSEED = {
  octave: [-12, 0, 12],
  _: [0, 4, 7],
  _M7: [0, 4, 7, 11],
  _7: [0, 4, 7, 10],
  _add9: [0, 4, 7, 14],
  m: [0, 3, 7],
  mM7: [0, 3, 7, 11],
  m7: [0, 3, 7, 10],
};

const makeChord = (note) => {
  let chords = [];
  for (let key of Object.keys(CHORDSEED)) {
    chords.push({
      chordRootNum: note,
      chordSeed: CHORDSEED[key].map((n) => n + note),
      chordName: transposeNoteFromC4(note).slice(0, 1) + key,
    });
  }
  return chords;
};

const scaleNum = (scaleKeyNum, scaleseedNumArray) => {
  scaleseedNumArray.map((e) => ({
    note: transposeNoteFromC4(scaleKeyNum + e),
    number: scaleKeyNum + e,
  }));
};

// 勝手に近めの和音を選んであげる
// 前の和音とルートをもらう 数字でもらう
// 近い方のルートに行く
const nearestChord = ({
  beforeChordArr = [],
  chordRootNum,
  chordSeed,
  chordName,
  onChord = false,
}) => {
  // 前に何もなかったら普通に転回してないやつを鳴らす
  if (beforeChordArr.length === 0) {
    const noteNum = [chordRootNum - OCTAVE, ...chordSeed];
    return {
      chordName: chordName,
      notesNum: noteNum,
      notes: noteNum.map((e) => transposeNoteFromC4(e)),
    };
  }
  beforeChordArr.sort((a, b) => a - b); // 小さい順にソート
  // ルート音は別で考える
  const beforeRoot = beforeChordArr.slice(0, 1); // 一番低い音
  const rootNote = nearestRoot(beforeRoot, chordRootNum);
  // ルート以外の音の構成を作る
  // 転回形とオクターブ上下で、3和音だったら3*3の9候補を作る
  const kouho = allInverseOctaveArr(chordRootNum, chordSeed);
  // 前のコードとの被り範囲を調べる
  const beforeRange = makeMinMaxArray(beforeChordArr.slice(1));
  const kouhoScores = kouho.map((e) =>
    getArraysIntersectCount(beforeRange, makeMinMaxArray(e))
  );
  const index = kouhoScores.indexOf(Math.max.apply(null, kouhoScores));
  const winner = kouho[index];
  const noteNums = [rootNote, ...winner].sort((a, b) => a - b);
  return {
    chordName: chordName,
    notesNum: noteNums,
    notes: noteNums.map((e) => transposeNoteFromC4(e)),
  };
};

const nearestRoot = (beforeRoot, chordRootNum) => {
  const arr = CHORDSEED.octave.map((e) => e + chordRootNum - OCTAVE); // -3, -2, -1 オクターブから探す
  const diffarr = arr.map((e) => Math.abs(e - beforeRoot));
  const index = diffarr.indexOf(Math.min.apply(null, diffarr));
  const noteNum = arr[index];
  return noteNum;
};

// 前の音の範囲といっぱい被ってる転回形を選ぶ

// 転回してないやつ seed =　[0 4 7 9], seed.map((e) => (e + 12)) , seed.map((e) => (e - 12))　の3つ
// 第一転回してるやつ seed の頭の1個だけ 12を足して、オクターブ違いも同様にアレする
// seed.length - 1 の長さ×3パターンできてくる
const allInverseOctaveArr = (chordRootNum, chordSeed) => {
  let arr = [];
  const basicChord = chordSeed;
  arr.push(basicChord);
  // 転回形をつくる
  for (let i = 1; i < chordSeed.length; i++) {
    const newChord = [
      ...basicChord.slice(0, i).map((e) => e + OCTAVE),
      ...basicChord.slice(i),
    ];
    arr.push(newChord);
  }
  // オクターブ上とオクターブ下を作る
  const upperOctave = arr.map((e) => e.map((note) => note + OCTAVE));
  const lowerOctave = arr.map((e) => e.map((note) => note - OCTAVE));
  arr.push(...upperOctave);
  arr.push(...lowerOctave);
  return arr;
};

// できた和音同士の被りスコアを計算する
// max と min だけ使う
const makeMinMaxArray = (numArray) => {
  const min = Math.min(...numArray);
  const max = Math.max(...numArray);
  let arr = [];
  for (let i = min; i <= max; ++i) {
    arr.push(i);
  }
  return arr;
};

// 被ってる部分をスコアにする
const getArraysIntersectCount = (array01, array02) => {
  return array01.filter((value) => array02.includes(value)).length;
};

// 和音をつくる
const makeHarmony = (start, array) =>
  Tone.Frequency(start)
    .harmonize(array)
    .map((e) => e.toNote());

// ダイアトニックかしらべる
const isDiatonic = (array) => {
  const scale = scaleNotes.map((e) => e.slice(0, -1)); // 最後の数字を取る（オクターブ違い対策）
  const strippedchord = array
    .map((e) => e.slice(0, -1))
    .filter((e) => !scale.includes(e)); //スケールに含まれる音を取る
  return strippedchord.length === 0;
};

const scoreVisible = (score, played) => {
  return (
    <>
      {played.map((e) => (
        <ChordCard dead={true} chordName={e.chordName} array={e.sound} />
      ))}
      {score.map((e) => (
        <ChordCard chordName={e.chordName} array={e.sound} />
      ))}
    </>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      score: [],
      played: [],
    };
    this.pushToScore = this.pushToScore.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.loop();
  }
  handleLoop() {
    const synth = new Tone.PolySynth().toMaster();
    this.setState({ isPlay: !this.state.isPlay });
    if (this.state.isPlay && this.state.score.length === 0) {
      this.setState({
        score: this.state.played,
        played: [],
      });
    }
  }
  pushToScore(notesArr, noteNumArr, chordName) {
    this.setState({
      score: [
        ...this.state.score,
        { sound: notesArr, noteNum: noteNumArr, chordName: chordName },
      ],
    });
  }
  soundFromStack() {
    if (this.state.score.length !== 0) {
      let score = this.state.score;
      const play = score.shift();
      makeSomeChord(play.sound);
      let played = this.state.played;
      played.push(play);
      this.setState({ score: score, played: played });
    }
  }
  loop() {
    setInterval(() => {
      if (!this.state.isPlay) return;
      console.log("beats!");
      this.soundFromStack();
    }, (2 / defaultBpm) * 60 * 1000);
  }
  render() {
    return (
      <>
        <h1>コード</h1>
        <h2>再生・停止</h2>
        <button onClick={() => this.handleLoop()}>
          {this.state.isPlay ? "stop" : "start"}
        </button>
        <h2>score</h2>
        <div className="yoko scoreboard">
          {scoreVisible(this.state.score, this.state.played)}
        </div>
        <h2>note</h2>
        {scaleNotes.map((e) => {
          return <button onClick={() => makeSomeNoise(e)}>{e}</button>;
        })}
        <h2>勝手に近い転回形をえらびます</h2>
        {scale.map((note) => {
          const chords = makeChord(note);
          return (
            <div>
              {chords.map((chord) => {
                const nextChord = nearestChord({
                  beforeChordArr:
                    this.state.score.length === 0
                      ? []
                      : this.state.score.slice(-1)[0].noteNum,
                  chordRootNum: chord.chordRootNum,
                  chordSeed: chord.chordSeed,
                  chordName: chord.chordName,
                });
                return (
                  <button
                    className={
                      isDiatonic(
                        chord.chordSeed.map((e) => transposeNoteFromC4(e))
                      )
                        ? "diatonic"
                        : ""
                    }
                    onClick={() =>
                      this.pushToScore(
                        nextChord.notes,
                        nextChord.notesNum,
                        nextChord.chordName
                      )
                    }
                  >
                    {nextChord.chordName}
                  </button>
                );
              })}
            </div>
          );
        })}
      </>
    );
  }
}

export default App;
