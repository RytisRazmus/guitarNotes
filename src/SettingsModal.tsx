import { useEffect, useMemo, useRef } from "react";
import { Settings, StringNote } from "./hooks/useSettings";

interface RangeSelectorProps {
  settings: Settings;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal = ({
  settings: { saveSettings, range, activeStrings, handleStringClick },
  open,
  setOpen,
}: RangeSelectorProps) => {
  const toRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);

  const notes = useMemo(
    () =>
      Object.keys(activeStrings).map((key) => (
        <div
          className={`modal-note ${
            !activeStrings[key as keyof StringNote].active && "deactivated"
          }`}
          key={crypto.randomUUID()}
          onClick={() => handleStringClick(key as keyof StringNote)}
        >
          {activeStrings[key as keyof StringNote].value.substring(0, 1)}
        </div>
      )),
    [activeStrings, handleStringClick]
  );

  function handleSave() {
    const from = parseInt(fromRef.current?.value as string);
    const to = parseInt(toRef.current?.value as string);

    if (saveSettings(from, to)) setOpen(false);
  }

  useEffect(() => {
    const listener = () => {
      if (
        toRef.current?.value !== undefined &&
        fromRef.current?.value !== undefined
      ) {
        toRef.current.value = range.to.toString();
        fromRef.current.value = range.from.toString();
      }
      setOpen(false);
    };

    document.getElementById("wrapper")?.addEventListener("click", listener);

    return () =>
      document
        .getElementById("wrapper")
        ?.removeEventListener("click", listener);
  }, [range.from, range.to, setOpen]);

  return (
    <>
      <dialog className="dialog" open={open}>
        <h2>Choose fret range</h2>

        <div className="string-selector">{notes}</div>
        <form method="dialog">
          <span>from</span>
          <input
            defaultValue={range.from}
            ref={fromRef}
            type="number"
            min={1}
            max={12}
          />
          <span>to</span>
          <input
            defaultValue={range.to}
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
