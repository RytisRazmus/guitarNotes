import { useEffect, useRef } from "react";
import { NoteRange } from "./App";

interface RangeSelectorProps {
  handleSetRange(noteRange: NoteRange): void;
  noteRange: NoteRange;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RangeSelector = ({
  handleSetRange,
  noteRange,
  open,
  setOpen,
}: RangeSelectorProps) => {
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
      from > to ||
      isNaN(from) ||
      isNaN(to)
    ) {
      return;
    }

    handleSetRange({
      from,
      to,
    });
    setOpen(false);
  }

  useEffect(() => {
    document
      .getElementById("wrapper")
      ?.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <>
      <dialog className="dialog" open={open}>
        <h2>Choose fret range</h2>
        <form method="dialog">
          <span>from</span>
          <input
            defaultValue={noteRange.from}
            ref={fromRef}
            type="number"
            min={1}
            max={12}
          />
          <span>to</span>
          <input
            defaultValue={noteRange.to}
            ref={toRef}
            type="number"
            min={1}
            max={12}
          />
          <button onClick={handleSave}>Save</button>
        </form>
      </dialog>
    </>
  );
};
