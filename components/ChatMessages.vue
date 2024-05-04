<script setup lang="ts">
defineProps<{ messages: any[] }>()
</script>

<template>
    <div v-for="m in messages" key="m.id" class="whitespace-pre-wrap p-4 flex gap-2" :class="{
        'bg-gray-100': m.role === 'user',
    }">
        <Icon :name="m.role === 'user' ? 'mingcute:user-4-fill' : 'ri:robot-2-line'" class="size-5" />
        <ChatMessage :message="m" />
    </div>
</template>