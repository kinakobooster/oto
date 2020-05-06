import React from "react";
import "./App.css";

const ChordCard = (props) => (
  <a onClick={props.deleteCard} className={`chordcard${props.dead ? " dead" : ""}`}>
    <h3 className="chordname">{props.chordName}</h3>
    {props.array
      .concat()
      .reverse()
      .map((e) => (
        <div className="notes">{e}</div>
      ))}
  </a>
);

export default ChordCard;
