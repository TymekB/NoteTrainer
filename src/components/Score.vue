<template>
    <div>
        <div id="score">


        </div>
    </div>

</template>

<script>
    import Vex from 'vexflow';

    export default {
        name: "Score",
        data: function () {
            return {
                elementId: 'score'
            }
        },
        methods: {
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
        },
        mounted() {
            this.drawNote('C3');
        }
    }
</script>

<style scoped>
</style>
