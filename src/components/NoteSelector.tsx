import { v4 as uuidv4 } from "uuid";

import { generateRandomNote } from "../utils/generateRandomNote";
import { NoteGenerator } from "../hooks/useNoteGenerator";

type NoteSelectorProps = Pick<
  NoteGenerator,
  "note" | "setNote" | "setLastNote"
> &
  Pick<NoteGenerator, "range" | "activeStringsValues">;

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

export const NoteSelector = ({
  note,
  setNote,
  setLastNote,
  range,
  activeStringsValues,
}: NoteSelectorProps) => {
  function toggleError() {
    document.body.classList.add("error");

    setTimeout(() => {
      document.body.classList.remove("error");
    }, 300);
  }

  function handleNoteClick(selectedNote: string) {
    const correct = selectedNote === note.note;
    !correct && toggleError();
    setLastNote({
      note: note.note,
      correct: selectedNote === note.note,
    });
    setNote(
      generateRandomNote(range.from, range.to, note.note, activeStringsValues)
    );
  }

  return (
    <div className="note-selector center">
      {noteButtons.map((note) => (
        <div
          className="note"
          onClick={() => handleNoteClick(note)}
          key={uuidv4()}
        >
          {note}
        </div>
      ))}
    </div>
  );
};
