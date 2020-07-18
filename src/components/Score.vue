<template>
    <div>
        <div id="clef" v-if="!clefChosen">
            Choose clef: <br>
            <button v-on:click="chooseClef('treble')">Treble</button>
            or
            <button v-on:click="chooseClef('bass')">Bass</button>
        </div>

        <div id="score" v-if="clefChosen">
            <h2>{{previousNotes.length}}/28</h2>
            <div id="easy-score"></div>

            <Notes :notes="notes" v-on:next-note="drawRandomNote"></Notes>
        </div>
    </div>

</template>

<script>
    import Vex from 'vexflow';
    import Notes from "./Notes";
    import {mapGetters, mapActions} from 'vuex';
    import $ from 'jquery';

    export default {
        name: "Score",
        components: {Notes},
        data: function () {
            return {
                clefChosen: false
            }
        },
        computed: mapGetters(['notes', 'note', 'previousNotes', 'clef']),
        methods: {
            ...mapActions(['setRandomNote', 'setClef']),
            clearScore() {
                $('#easy-score').empty();
            },
            drawNote(note) {
                this.clearScore();

                const vf = new Vex.Flow.Factory({
                    renderer: {
                        elementId: 'easy-score', height: 150, width: 300
                    }
                });
                const score = vf.EasyScore();
                const system = vf.System();

                system.addStave({
                    voices: [score.voice(score.notes(note + '/1', {clef: this.clef}))]
                }).addClef(this.clef).addTimeSignature('4/4');

                vf.draw();
            },
            drawRandomNote() {
                this.setRandomNote();
                this.drawNote(this.note);
            },
            chooseClef(clef) {
                this.setClef(clef);
                this.clefChosen = true;

                setTimeout(() => {
                    this.drawRandomNote();
                }, 10);
            }
        }
    }
</script>

<style scoped>
    h2 {
        font-weight: 300;
        margin: 0;
        padding: 0;
        text-align: center;
    }
</style>
