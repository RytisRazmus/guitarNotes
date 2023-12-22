import React, { useState } from "react";
import "./App.less";
import { Note, generateRandomNote } from "./generateRandomNote";
import { RangeSelector } from "./RangeSelector";

type Dots = Record<number, number>;

const dots: Dots = { [2]: 2, [4]: 4, [6]: 6, [8]: 8, [11]: 11 };

const noteButtons = [
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
];

export type NoteRange = {
  from: number;
  to: number;
};

function App() {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<NoteRange>({
    from: 1,
    to: 12,
  });
  const [note, setNote] = useState<Note>(
    generateRandomNote(range.from, range.to, "")
  );
  const [guessResult, setGuessResult] = useState("");

  const [lastNote, setLastNote] = useState({
    note: "",
    correct: true,
  });

  function handleSetRange(noteRange: NoteRange) {
    setRange(noteRange);
    setNote(generateRandomNote(noteRange.from, noteRange.to, note.note));
  }

  function toggleError() {
    setGuessResult("error");

    setTimeout(() => {
      setGuessResult("");
    }, 300);
  }

  function handleNoteClick(selectedNote: string) {
    const correct = selectedNote === note.note;
    !correct && toggleError();
    setLastNote({
      note: note.note,
      correct: selectedNote === note.note,
    });
    setNote(generateRandomNote(range.from, range.to, note.note));
  }

  return (
    <>
      <RangeSelector
        open={open}
        setOpen={setOpen}
        noteRange={range}
        handleSetRange={handleSetRange}
      />
      <div id="wrapper" className={`wrapper ${guessResult}`}>
        <div className="center">
          <button id="rangeBtn" onClick={() => setOpen(true)}>
            {range.from}-{range.to}
          </button>

          {lastNote.note !== "" && (
            <div className={`last-note ${!lastNote.correct && "incorrect"}`}>
              {lastNote.note}
            </div>
          )}
        </div>

        <div className="fretboard">
          {Array.from(Array(12)).map((_, index) => {
            const number = 8.33 * index;
            return (
              <React.Fragment key={crypto.randomUUID()}>
                <div
                  key={crypto.randomUUID()}
                  style={{
                    top: `${number}%`,
                    height: `8.33%`,
                  }}
                  className="fret"
                >
                  {Array.from(Array(6)).map((_, stringIndex) => (
                    <div
                      key={crypto.randomUUID()}
                      className={`string ${
                        note.string === stringIndex && index === note.fret
                          ? "selected"
                          : ""
                      }`}
                    ></div>
                  ))}
                </div>
                <div
                  style={{
                    top: `99.5%`,
                    height: `0.5%`,
                  }}
                  className="fret"
                ></div>
                {dots[index] !== undefined && (
                  <div
                    key={crypto.randomUUID()}
                    style={{
                      top: `${number + 3.3}%`,
                    }}
                    className="circle"
                  >
                    {index + 1}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="note-selector center">
          {noteButtons.map((note) => (
            <div
              className="note"
              onClick={() => handleNoteClick(note)}
              key={crypto.randomUUID()}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
