import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Note } from "../utils";

type Dots = Record<number, number>;

const dots: Dots = { [2]: 2, [4]: 4, [6]: 6, [8]: 8, [11]: 11 };

interface FreatboardProps {
  currentNote: Note;
}

export const Freatboard = ({ currentNote }: FreatboardProps) => {
  return (
    <div className="fretboard">
      {Array.from(Array(12)).map((_, index) => {
        const number = 8.33 * index;
        return (
          <React.Fragment key={uuidv4()}>
            <div
              key={uuidv4()}
              style={{
                top: `${number}%`,
                height: `8.33%`,
              }}
              className="fret"
            >
              {Array.from(Array(6)).map((_, stringIndex) => (
                <div
                  key={uuidv4()}
                  className={`string ${
                    currentNote.string === stringIndex &&
                    index === currentNote.fret
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
                key={uuidv4()}
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
  );
};
