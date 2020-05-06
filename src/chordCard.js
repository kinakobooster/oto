import React from 'react';
import './App.css';

const ChordCard = (props) => (
    <div className='chordcard'>
        <h3 className="chordname">{props.chordName}</h3>
        {props.array.concat().reverse().map((e) => (
            <div className="notes">{e}</div>
        ))}
    </div>
)

export default ChordCard