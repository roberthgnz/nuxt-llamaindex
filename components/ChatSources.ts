import { h } from 'vue'
import VueMarkdown from 'vue-markdown-render'

type Props = {
    data: any
}

const SCORE_THRESHOLD = 0.5

export default {
    name: 'ChatSources',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: { VueMarkdown },
    setup(props: Props) {
        const sources = props.data.nodes
            ?.filter((node: any) => (node.score ?? 1) > SCORE_THRESHOLD)
            .sort((a: any, b: any) => (b.score ?? 1) - (a.score ?? 1)) || []

        if (sources.length) {
            return null
        }

        return () => h('div', 'jajaja')
    }
}