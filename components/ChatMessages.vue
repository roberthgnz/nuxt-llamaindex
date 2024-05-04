<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'

defineProps<{ messages: any[] }>()
</script>

<template>
    <ScrollAreaRoot class="w-full max-w-xl mx-auto min-h-[calc(100vh_-_var(--header-height)_-_var(--chatbar-height))] overflow-hidden"
        :style="{
            '--header-height': '68.94px',
            '--chatbar-height': '72.95px',
            '--scrollbar-size': '10px'
        }">
        <ScrollAreaViewport class="w-full h-full">
            <div v-for="m in messages" :key="m.id" class="p-4 flex gap-2" :class="{
                'bg-gray-100': m.role === 'user',
            }">
                <Icon :name="m.role === 'user' ? 'mingcute:user-4-fill' : 'ri:robot-2-line'" class="size-5" />
                <ChatMessage :content="m.content" />
            </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
            class="flex select-none touch-none p-0.5 bg-gray-50 transition-colors duration-[160ms] ease-out hover:bg-gray-100 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical">
            <ScrollAreaThumb
                class="flex-1 bg-gray-200 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-trangray-x-1/2 before:-trangray-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollAreaScrollbar>
    </ScrollAreaRoot>
</template>