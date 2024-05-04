<script setup lang="ts">
import { useChat } from 'ai/vue';

const { messages, input, handleSubmit } = useChat();

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

const open = ref(false);

const ALL_AVAILABLE_REPLICATE_MODELS = [
  "Llama-2-70b-chat-old",
  "Llama-2-70b-chat-4bit",
  "Llama-2-13b-chat-old",
  "Llama-2-13b-chat-4bit",
  "Llama-2-7b-chat-old",
  "Llama-2-7b-chat-4bit",
  "llama-3-70b-instruct",
  "llama-3-8b-instruct",
]

const currentModel = ref(ALL_AVAILABLE_REPLICATE_MODELS[0]);

const setModel = (model: string) => {
  return $fetch('/api/set-model', {
    method: 'POST',
    body: ({
      model,
    }),
  });
}

const onSubmit = async (e: Event) => {
  e.preventDefault();

  // await setModel(currentModel.value);

  handleSubmit(e);
}
</script>

<template>
  <div class="h-screen flex flex-col w-full flex-1">
    <div class="bg-gray-100 border-b">
      <!-- <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm" class="font-normal">{{ currentModel }}</Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command :filter-function="(list, term) => (list as string[]).filter(i => i.toLowerCase()?.includes(term)) ">
            <CommandInput placeholder="Search models..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Models">
                <CommandItem v-for="model in ALL_AVAILABLE_REPLICATE_MODELS" :key="model" :value="model" @select="() => {
                  open = false;
                  currentModel = model;
                }">
                  {{ model }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> -->
      <nav class="mx-auto max-w-xl flex justify-between items-center p-4 ">
        <h1 class="font-bold text-lg">Nuxt + LlamaIndex</h1>
        <Button variant="outline" size="sm" class="space-x-2">
          <Icon name="cib:github" />
          <span>Open Source</span>
        </Button>
      </nav>
    </div>

    <ChatMessages :messages="messages" />

    <form class="p-4 w-full bg-gray-100 border-t" @submit="onSubmit">
      <div class="relative max-w-xl mx-auto">
        <Input v-model="input" class="w-full" placeholder="Say something..." />
        <TooltipProvider :delay-duration="250">
          <Tooltip>
            <TooltipTrigger as-child>
              <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center">
                <Icon name="cil:send" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Send message
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  </div>
</template>