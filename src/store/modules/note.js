const state = {
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    note: null,
    previousNotes: [],
};

const getters = {
    notes: state => state.notes,
    note: state => state.note,
    previousNotes: state => state.previousNotes.sort()
};

const actions = {
    setRandomNote({commit, state}) {

        if(state.previousNotes.length >= 28) {
            return;
        }

        if (state.note !== null) {
            state.previousNotes.push(state.note);
        }

        let note = null;

        do {
            const randomNumber = Math.floor(Math.random() * state.notes.length);
            note = state.notes[randomNumber];

            let min = 3;
            let max = 7;

            if (note === 'B') {
                min = 2;
            }

            let octave = Math.floor(Math.random() * (max - min)) + min;

            note = note + octave;

        } while (state.previousNotes.includes(note) && note !== null);

        commit('setNote', note);
    },
};

const mutations = {
    setNote: (state, note) => {
        state.note = note;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
