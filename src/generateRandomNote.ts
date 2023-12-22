import random from 'random'
import { strings } from './strings';

export interface Note {
    fret: number;
    string: number;
    note: string;
}

export function generateRandomNote(from = 1, to = 12): Note {
    const fret = random.int(from - 1, to - 1);
    const string = random.int(0, 5);
    const note = strings[string].notes[fret + 1];

    return {
        fret,
        string,
        note
    }
}
