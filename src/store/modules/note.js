const state = {
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    note: null,
    previousNotes: [],
    clef: 'treble'
};

const getters = {
    notes: state => state.notes,
    note: state => state.note,
    previousNotes: state => state.previousNotes.sort(),
    clef: state => state.clef
};

const actions = {
    setRandomNote({commit, state}) {

        if (state.previousNotes.length >= 28) {
            return;
        }

        if (state.note !== null) {
            state.previousNotes.push(state.note);
        }

        let note = null;

        do {
            const randomNumber = Math.floor(Math.random() * state.notes.length);
            note = state.notes[randomNumber];

            let min = null;
            let max = null;

            if (state.clef === 'treble') {
                min = 3;
                max = 7;

                if (note === 'B') {
                    min = 2;
                }
            } else {
                min = 1;
                max = 5;

                if (note === 'C') {
                    max = 6;
                    min = 2;
                } else if (note === 'D') {
                    max = 6;
                }
            }

            let octave = Math.floor(Math.random() * (max - min)) + min;

            note = note + octave;

        } while (state.previousNotes.includes(note) && note !== null);

        commit('setNote', note);
    },
    setClef({commit}, clef) {

        clef = clef === 'treble' ? 'treble' : 'bass';

        commit('setClef', clef)
    }
};

const mutations = {
    setNote: (state, note) => {
        state.note = note;
    },
    setClef: (state, clef) => {
        state.clef = clef;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
