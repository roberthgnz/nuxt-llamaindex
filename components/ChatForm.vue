<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'


defineEmits(['submit'])
defineProps<{ loading?: boolean }>()

const model = defineModel<string>()
</script>

<template>
    <form class="mb-4" @submit="e => $emit('submit', e)">
        <div class="relative max-w-3xl mx-auto">
            <Input v-model="model" class="w-full h-12" placeholder="Say something..." />
            <TooltipProvider :delay-duration="250">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button type="submit"
                            :disabled="loading"
                            class="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center">
                            <Icon v-if="!loading" name="cil:send" />
                            <Icon v-else name="uil:spinner-alt" class="animate-spin" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {{ loading ? 'Sending...' : 'Send message' }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </form>
</template>