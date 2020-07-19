const state = {
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    note: null,
    previousNotes: [],
    clef: 'treble',
    answers: {
        correct: [],
        wrong: []
    }
};

const getters = {
    notes: state => state.notes,
    note: state => state.note,
    previousNotes: state => state.previousNotes.sort(),
    clef: state => state.clef,
    answers: state => state.answers
};

const actions = {
    setRandomNote({commit, state}) {

        if (state.note !== null) {
            state.previousNotes.push(state.note);
        }

        if (state.previousNotes.length >= 28) {
            return;
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
    setAnswer({commit}, {correct, note}) {
        if(correct) {
            commit('setCorrectAnswer', note);
        } else {
            commit('setWrongAnswer', note);
        }
    },
    setClef({commit}, clef) {

        clef = clef === 'treble' ? 'treble' : 'bass';

        commit('setClef', clef)
    },
    reset({commit}) {
        commit('reset');
    }
};

const mutations = {
    setNote: (state, note) => {
        state.note = note;
    },
    setClef: (state, clef) => {
        state.clef = clef;
    },
    setCorrectAnswer: (state, note) => {
        state.answers.correct.push(note);
    },
    setWrongAnswer: (state, note) => {
        state.answers.wrong.push(note);
    },
    reset: (state) => {
        state.note = null;
        state.previousNotes = [];
        state.answers.correct = [];
        state.answers.wrong = [];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
