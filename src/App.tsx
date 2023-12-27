import { useState } from "react";

import "./App.less";
import { SettingsModal } from "./SettingsModal";
import { useSettings, useNoteGenerator } from "./hooks";
import { NoteSelector, Freatboard } from "./components";

export type LastNote = {
  note: string;
  correct: boolean;
};

function App() {
  const [open, setOpen] = useState(false);
  const {
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
  } = useNoteGenerator();

  const settings = useSettings(
    activeStringsValues,
    setActiveStrings,
    onSetRange,
    setRange
  );

  return (
    <>
      <SettingsModal
        range={range}
        activeStrings={activeStrings}
        open={open}
        setOpen={setOpen}
        settings={settings}
      />
      <div id="wrapper" className="wrapper">
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

        <Freatboard currentNote={note} />
        <NoteSelector
          note={note}
          setNote={setNote}
          setLastNote={setLastNote}
          range={range}
          activeStringsValues={activeStringsValues}
        />
      </div>
    </>
  );
}

export default App;
