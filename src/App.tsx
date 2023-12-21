import React, { useState } from "react";
import "./App.less";
import { Note, generateRandomNote } from "./generateRandomNote";

type Dots = Record<number, number>;

const dots: Dots = { [2]: 2, [4]: 4, [6]: 6, [8]: 8, [11]: 11 };

const noteButtons = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

function App() {
  const [note, setNote] = useState<Note>(generateRandomNote());
  const [guessResult, setGuessResult] = useState("");
  const [lastNote, setLastNote] = useState({
    note: "",
    correct: true,
  });

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
    setNote(generateRandomNote());
  }

  return (
    <div className={`wrapper ${guessResult}`}>
      <div className="center">
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
                className="ladas"
              >
                {Array.from(Array(6)).map((_, stringIndex) => (
                  <div
                    key={crypto.randomUUID()}
                    className={`string ${
                      note.string === stringIndex && index === note.ladas
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
                className="ladas"
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
  );
}

export default App;
