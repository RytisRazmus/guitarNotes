import random from 'random'
import { strings } from './strings';

export interface Note {
    ladas: number;
    string: number;
    note: string;
}

export function generateRandomNote(): Note {
    const ladas = random.int(0, 11);
    const string = random.int(0, 5);
    const note = strings[string].notes[ladas + 1];

    return {
        ladas,
        string,
        note
    }
}
