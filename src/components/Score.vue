<template>
    <div>
        <div id="score">


        </div>

        <Notes></Notes>
    </div>

</template>

<script>
    import Vex from 'vexflow';
    import Notes from "./Notes";

    export default {
        name: "Score",
        components: {Notes},
        data: function () {
            return {
                elementId: 'score',
                notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                note: null,
                previousNote: null,
            }
        },
        methods: {
            redrawScore() {
                const div = document.querySelector('#' + this.elementId);
                [].slice.call(div.children).forEach(child => div.removeChild(child));
            },
            setRandomNote() {
                if (this.note !== null) {
                    this.previousNote = this.note;
                }

                let note = null;

                do {
                    const randomNumber = Math.floor(Math.random() * this.notes.length);
                    note = this.notes[randomNumber];

                    let min = 3;
                    let max = 6;

                    if (note === 'B') {
                        min = 2;
                    }

                    let octave = Math.floor(Math.random() * (max - min)) + min;

                    note = note + octave;

                } while (note === this.previousNote && note !== null);

                this.note = note;

            },
            drawNote(note) {
                this.redrawScore();

                const vf = new Vex.Flow.Factory({renderer: {elementId: this.elementId, height: 150, width: 300}});
                const score = vf.EasyScore();
                const system = vf.System();

                system.addStave({
                    voices: [score.voice(score.notes(note + '/1'))]
                }).addClef('treble').addTimeSignature('4/4');

                vf.draw();
            }
        },
        mounted() {
            this.setRandomNote();
            this.drawNote(this.note);
        }
    }
</script>

<style scoped>
</style>
