import { NoteGenerator, NoteRange, StringNote } from "./useNoteGenerator";

export type Settings = ReturnType<typeof useSettings>;

export const useSettings = (
  activeStringsValues: NoteGenerator["activeStringsValues"],
  setActiveStrings: NoteGenerator["setActiveStrings"],
  onSetRange: (noteRange: NoteRange) => void,
  setRange: NoteGenerator["setRange"]
) => {

  function handleStringClick(noteKey: keyof StringNote) {
    if (
      activeStringsValues.length === 1 &&
      noteKey === activeStringsValues[0]
    ) {
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

  return { handleStringClick, saveSettings };
};
