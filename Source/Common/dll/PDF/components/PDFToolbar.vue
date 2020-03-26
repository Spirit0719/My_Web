<template>
    <div :class="[$style.CurrentComponent,'iconfontGoodLuckPDF']">
        <div @click.prevent.stop="togglePreview" :class="['pdf-icon-fangda']"></div>
        <div @click.prevent.stop="zoomIn" :class="['pdf-icon-fangda']" :disabled="isDisabled"></div>
        <div @click.prevent.stop="zoomOut" :class="['pdf-icon-fangda']" :disabled="isDisabled"></div>
        <div @click.prevent.stop="fitWidth" :class="['pdf-icon-fangda']" :disabled="isDisabled"></div>
        <div @click.prevent.stop="fitAuto" :class="['pdf-icon-fangda']" :disabled="isDisabled"></div>
        <div v-if="pageCount">
            <input
                    v-model="currentPageTemp"
                    min="1"
                    :max="pageCount"
                    type="number"
            /> / <span>{{ pageCount }}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'PDFToolbar',
        data() {
            return {
                currentPageTemp: this.currentPage
            }
        },
        components: {},

        props: {
            pageCount: {
                type: Number,
                default: 0,
            },
            scale: {
                type: Number,
                default: 1.0,
            },
            fit: {
                type: String,
            },
            currentPage: {
                type: Number,
                default: 1,
            },
            isPreviewEnabled: {
                default: false,
            },
            increment: {
                type: Number,
                default: 0.25,
            },
        },

        computed: {
            isDisabled() {
                return !this.scale;
            },
        },

        methods: {

            zoomIn() {
                this.updateScale(this.scale + this.increment);
            },

            zoomOut() {
                if (this.scale <= this.increment) return;
                this.updateScale(this.scale - this.increment);
            },

            updateScale(scale) {
                this.$emit('updateScale', {scale});
            },

            fitWidth() {
                this.$emit('updateFit', 'width');
            },

            fitAuto() {
                this.$emit('updateFit', 'auto');
            },

            togglePreview() {
                this.$emit('togglePreview');
            },
        },

        watch: {},
    };
</script>

<style lang="stylus">
    @import "../assets/iconfont.css"
</style>
<style lang="stylus" module>
    .CurrentComponent {
        display flex
        justify-content: center;
    }
</style>