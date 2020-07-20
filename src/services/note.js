const noteService = {
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],

    getRandomNote: function (clef) {
        let note = null;

        const randomNumber = Math.floor(Math.random() * this.notes.length);
        note = this.notes[randomNumber];

        let min = 3;
        let max = 7;

        if (note === 'B') {
            min--;
        }

        if (clef === 'bass') {
            min -= 2;
            max -= 2;

            if (note === 'C') {
                min++;
                max++;
            }
            if (note === 'B') {
                min++;
            }
            if (note === 'D') {
                max++;
            }
        }

        const octave = Math.floor(Math.random() * (max - min)) + min;

        return note + octave;
    }
};

export default noteService;
