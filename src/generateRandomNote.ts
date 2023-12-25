import random from 'random'
import { strings } from './strings';

export interface Note {
    fret: number;
    string: number;
    note: string;
}

function generateNote(from: number, to: number, activeStrings: string[]): Note {
    const fret = random.int(from - 1, to - 1);
    const stringRange = activeStrings.length - 1;
    const string = random.int(0, stringRange);
    const stringNote = activeStrings[string];
    
    const note = strings.find(string => string.altName === stringNote)?.notes[fret + 1];    

    return { note: note ?? 'e', fret, string: strings.findIndex(string => string.altName === stringNote) }
}

export function generateRandomNote(from = 1, to = 12, lastNote: string, activeStrings: string[]): Note {
    let randomNote = generateNote(from, to, activeStrings);
    if (lastNote !== '') {
        while (randomNote.note === lastNote) {
            randomNote = generateNote(from, to, activeStrings);
        }
    }

    return randomNote
}
