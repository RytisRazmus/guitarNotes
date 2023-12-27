import { useMemo, useState } from "react";

import { Note, generateRandomNote } from "../utils";
import { LastNote } from "../App";

export type NoteRange = {
  from: number;
  to: number;
};

enum GuitarString {
  "e6",
  "a",
  "d",
  "g",
  "b",
  "e1",
}

export type StringNote = {
  [key in keyof typeof GuitarString]: {
    value: string;
    active: boolean;
    index: number;
  };
};

const guitarStrings: StringNote = {
  e6: {
    value: "e6",
    active: true,
    index: 0,
  },
  a: {
    value: "a",
    active: true,
    index: 1,
  },
  d: {
    value: "d",
    active: true,
    index: 2,
  },
  g: {
    value: "g",
    active: true,
    index: 3,
  },
  b: {
    value: "b",
    active: true,
    index: 4,
  },
  e1: {
    value: "e1",
    active: true,
    index: 5,
  },
};

export type NoteGenerator = ReturnType<typeof useNoteGenerator>;

export const useNoteGenerator = () => {
  const [activeStrings, setActiveStrings] = useState(guitarStrings);
  const [range, setRange] = useState<NoteRange>({
    from: 1,
    to: 12,
  });

  const activeStringsValues = useMemo(
    () =>
      Object.values(activeStrings)
        .filter((activeString) => activeString.active)
        .map((activeString) => activeString.value),
    [activeStrings]
  );

  const [note, setNote] = useState<Note>(
    generateRandomNote(range.from, range.to, "", activeStringsValues)
  );

  const [lastNote, setLastNote] = useState<LastNote>({
    note: "",
    correct: true,
  });

  function onSetRange(noteRange: NoteRange) {
    setNote(
      generateRandomNote(
        noteRange.from,
        noteRange.to,
        note.note,
        activeStringsValues
      )
    );
  }

  return {
    note,
    setNote,
    lastNote,
    setLastNote,
    onSetRange,
    setActiveStrings,
    activeStringsValues,
    range,
    setRange,
    activeStrings,
  };
};
