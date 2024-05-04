import { h } from 'vue'
import VueMarkdown from 'vue-markdown-render'

import highlightjs from 'markdown-it-highlightjs'

type Props = {
    message: {
        role: string,
        content: string,
        createdAt: string,
        annotations?: any[],
    }
}

export default {
    name: 'ChatMessage',
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
    components: { VueMarkdown },
    setup(props: Props) {
        const message = props.message
        const Markdown = resolveComponent('VueMarkdown')
        return () => h(Markdown, { source: message.content, plugins: [highlightjs] })
    }
}