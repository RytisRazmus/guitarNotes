import random from 'random'
import { strings } from './strings';

export interface Note {
    ladas: number;
    string: number;
    note: string;
}

export function generateRandomNote(from = 1, to = 12): Note {
    // if (from < 1 || from > 12 || to > 12 || to < 1 || from >= to) return {}
    const ladas = random.int(from - 1, to - 1);
    const string = random.int(0, 5);
    const note = strings[string].notes[ladas + 1];

    return {
        ladas,
        string,
        note
    }
}
