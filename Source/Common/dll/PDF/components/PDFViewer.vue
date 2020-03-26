<template>
    <div :class="[$style.pdf_viewer]">

        <!--<PDFToolbar-->
                <!--:class="[$style.viewer_toolbar]"-->
                <!--v-bind="{scale, fit, currentPage, pageCount, isPreviewEnabled}"-->
                <!--@updateScale="updateScale"-->
                <!--@updateFit="updateFit"-->
                <!--@togglePreview="togglePreview"-->
        <!--/>-->

        <PDFData
                :class="[$style.viewer_main]"
                :url="url"
                @page-count="updatePageCount"
                @page-focus="updateCurrentPage"
                @document-rendered="onDocumentRendered"
                @document-errored="onDocumentErrored"
        >

            <PDFPreview
                    slot="preview"
                    slot-scope="{pages}"
                    v-show="isPreviewEnabled"
                    :class="[$style.main_preview]"
                    v-bind="{pages, scale, currentPage, pageCount, isPreviewEnabled}"
            />

            <PDFDocument
                    :class="[$style.main_document,isPreviewEnabled ?$style.viewer_main_document_preview_enabled: '' ]"
                    slot="document"
                    slot-scope="{pages}"
                    v-bind="{pages, scale, optimalScale, fit, currentPage, pageCount, isPreviewEnabled}"
                    @scale-change="updateScale"
            />
        </PDFData>
    </div>
</template>

<script>
    import PDFDocument from './PDFDocument';
    import PDFData from './PDFData';
    import PDFPreview from './PDFPreview';
    import PDFToolbar from './PDFToolbar';

    function floor(value, precision) {
        const multiplier = Math.pow(10, precision || 0);
        return Math.floor(value * multiplier) / multiplier;
    }

    export default {
        name: 'PDFViewer',

        components: {
            PDFDocument,
            PDFData,
            PDFToolbar,
            PDFPreview,
        },

        props: {
            url: String,
        },

        data() {
            return {
                scale: undefined,
                optimalScale: undefined,
                fit: undefined,
                currentPage: 1,
                pageCount: undefined,
                isPreviewEnabled: false,
            };
        },

        methods: {
            onDocumentRendered() {
                this.$emit('document-errored', this.url);
            },

            onDocumentErrored(e) {
                this.$emit('document-errored', e);
            },

            updateScale({scale, isOptimal = false}) {
                const roundedScale = floor(scale, 2);
                if (isOptimal) this.optimalScale = roundedScale;
                this.scale = roundedScale;
            },

            updateFit(fit) {
                this.fit = fit;
            },

            updatePageCount(pageCount) {
                this.pageCount = pageCount;
            },

            updateCurrentPage(pageNumber) {
                this.currentPage = pageNumber;
            },

            togglePreview() {
                this.isPreviewEnabled = !this.isPreviewEnabled;
            },
        },

        watch: {
            url() {
                this.currentPage = undefined;
            },
        },

        mounted() {
            document.body.classList.add('overflow-hidden');
        },
    };
</script>

<style lang="stylus" module>

    @import "../assets/iconfont.css"
    .pdf_viewer{
        width 100%
        height 100%
        background-color: #606f7b;
        display: flex;
        flex-direction column
    }
    .viewer_toolbar {
        flex 70px 0 0
    }
    .viewer_main{
        flex auto
        position relative
    }

    .main_preview {
        display: block;
        width: 15%;
        right: 85%;
    }

    .main_document {
        width: 100%;
        left: 0;
    }

    .main_document_preview_enabled {
        width: 85%;
        left: 15%;
    }

</style>
