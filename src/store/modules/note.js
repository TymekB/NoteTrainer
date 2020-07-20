import noteService from "../../services/note";

const state = {
    notes: noteService.notes,
    note: null,
    previousNotes: [],
    clef: 'treble',
    answers: {
        correct: [],
        wrong: []
    },
    max: 29
};

const getters = {
    notes: state => state.notes,
    note: state => state.note,
    previousNotes: state => state.previousNotes,
    clef: state => state.clef,
    answers: state => state.answers,
    max: state => state.max
};

const actions = {
    setRandomNote({commit, state}) {
        if (state.note !== null) {
            state.previousNotes.push(state.note);
        }

        if (state.previousNotes.length >= state.max) {
            return;
        }

        let note = null;

        do {
            note = noteService.getRandomNote(state.clef);

        } while (state.previousNotes.includes(note));

        commit('setNote', note);
    },
    setAnswer({commit}, {correct, answer}) {
        if(correct) {
            commit('setCorrectAnswer', answer);
        } else {
            commit('setWrongAnswer', answer);
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
    setCorrectAnswer: (state, answer) => {
        if(!state.answers.wrong.find((note) => note === answer)) {
            state.answers.correct.push(answer);
        }
    },
    setWrongAnswer: (state, answer) => {
        if(!state.answers.wrong.find((note) => note === answer)) {
            state.answers.wrong.push(answer);
        }
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
