<template>
    <div>
        <div id="score"></div>

        <Notes :notes="notes" v-on:next-note="drawRandomNote"></Notes>
    </div>

</template>

<script>
    import Vex from 'vexflow';
    import Notes from "./Notes";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Score",
        components: {Notes},
        data: function () {
            return {
                elementId: 'score',
            }
        },
        computed: mapGetters(['notes', 'note']),
        methods: {
            ...mapActions(['setRandomNote']),
            redrawScore() {
                const div = document.querySelector('#' + this.elementId);
                [].slice.call(div.children).forEach(child => div.removeChild(child));
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
            },
            drawRandomNote() {
                this.setRandomNote();
                this.drawNote(this.note);
            },
        },
        mounted() {
            this.drawRandomNote();
        }
    }
</script>

<style scoped>
</style>
