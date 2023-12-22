import random from 'random'
import { strings } from './strings';

export interface Note {
    fret: number;
    string: number;
    note: string;
}

function generateNote(from: number, to: number): Note {
    const fret = random.int(from - 1, to - 1);
    const string = random.int(0, 5);
    const note = strings[string].notes[fret + 1];

    return { note, fret, string }
}

export function generateRandomNote(from = 1, to = 12, lastNote: string): Note {
    let randomNote = generateNote(from, to);
    if (lastNote !== '') {
        while (randomNote.note === lastNote) {
            randomNote = generateNote(from, to);
        }
    }

    return randomNote
}
