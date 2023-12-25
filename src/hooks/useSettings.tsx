import { useMemo, useState } from "react";
import { NoteRange } from "../App";

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
    index: number
  };
};

const guitarStrings: StringNote = {
  e6: {
    value: "e6",
    active: true,
    index: 0
  },
  a: {
    value: "a",
    active: true,
    index: 1
  },
  d: {
    value: "d",
    active: true,
    index: 2
  },
  g: {
    value: "g",
    active: true,
    index: 3
  },
  b: {
    value: "b",
    active: true,
    index: 4
  },
  e1: {
    value: "e1",
    active: true,
    index: 5
  },
};

export type Settings = ReturnType<typeof useSettings>;

export const useSettings = (onSetRange: (noteRange: NoteRange) => void) => {
  const [activeStrings, setActiveStrings] = useState(guitarStrings);
  const [range, setRange] = useState<NoteRange>({
    from: 1,
    to: 12,
  });

  const activeStringsValues = useMemo(
    () =>
      Object.values(activeStrings)
        .filter((activeString) => activeString.active)
        .map(activeString => activeString.value),
    [activeStrings]
  );

  function handleStringClick(noteKey: keyof StringNote) {    
    if (activeStringsValues.length === 1 && noteKey === activeStringsValues[0]) {
        return;
    }
    setActiveStrings((prev) => ({
      ...prev,
      [noteKey]: {
        value: prev[noteKey].value,
        active: !prev[noteKey].active,
      },
    }));
  }

  function saveSettings(from: number, to: number) {
    if (
      from < 1 ||
      from > 12 ||
      to > 12 ||
      to < 1 ||
      from > to ||
      isNaN(from) ||
      isNaN(to)
    ) {
      return false;
    }

    setRange({
      from,
      to,
    });

    onSetRange({ from, to });

    return true;
  }

  return { range, handleStringClick, saveSettings, activeStrings, activeStringsValues };
};
