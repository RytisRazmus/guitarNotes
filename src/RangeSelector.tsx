import { useRef, useState } from "react";
import { NoteRange } from "./App";

interface RangeSelectorProps {
  handleSetRange(noteRange: NoteRange): void;
  noteRange: NoteRange;
}

export const RangeSelector = ({
  handleSetRange,
  noteRange,
}: RangeSelectorProps) => {
  const [open, setOpen] = useState(false);
  const toRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    const from = parseInt(fromRef.current?.value as string);
    const to = parseInt(toRef.current?.value as string);

    if (
      from < 1 ||
      from > 12 ||
      to > 12 ||
      to < 1 ||
      from >= to ||
      !from ||
      !to ||
      isNaN(from) ||
      isNaN(to)
    ) {
      setOpen(false);
      return;
    }

    handleSetRange({
      from,
      to,
    });
    setOpen(false);
  }

  return (
    <>
      <dialog className="dialog" open={open}>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <input
            defaultValue={noteRange.from}
            ref={fromRef}
            type="number"
            min={1}
            max={11}
          />
          <input
            defaultValue={noteRange.to}
            ref={toRef}
            type="number"
            max={12}
          />
          <button onClick={handleSave}>Save</button>
        </form>
      </dialog>
      <button id="rangeBtn" onClick={() => setOpen(true)}>
        range
      </button>
    </>
  );
};
