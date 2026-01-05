<script setup lang="ts">
import type { Church } from '~/data/churches'
import { denominations, areas } from '~/data/churches'

defineProps<{
  churches: Church[]
  selectedChurchId?: number | null
}>()

const emit = defineEmits<{
  'select': [church: Church]
  'update:search': [value: string]
  'update:denomination': [value: string]
  'update:area': [value: string]
}>()

const searchQuery = ref('')
const selectedDenomination = ref('All')
const selectedArea = ref('All')

// Watchers to emit updates
watch(searchQuery, val => emit('update:search', val))
watch(selectedDenomination, val => emit('update:denomination', val))
watch(selectedArea, val => emit('update:area', val))

const formatService = (service: string) => {
  return service.replace('Sunday ', '')
}
</script>

<template>
  <div
    class="flex flex-col h-full bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800"
  >
    <!-- Header / Filters -->
    <div
      class="p-4 space-y-4 bg-white dark:bg-neutral-900 shadow-sm z-10 sticky top-0"
    >
      <div>
        <h1 class="text-xl font-bold text-neutral-900 dark:text-white">
          Bengaluru Churches
        </h1>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">
          Discover historic places of worship
        </p>
      </div>

      <div class="space-y-3">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search by name..."
          class="w-full"
        >
          <template #trailing>
            <UButton
              v-show="searchQuery !== ''"
              color="neutral"
              variant="link"
              icon="i-lucide-x"
              :padded="false"
              @click="searchQuery = ''"
            />
          </template>
        </UInput>

        <div class="grid grid-cols-2 gap-2">
          <USelect
            v-model="selectedDenomination"
            :items="denominations"
            placeholder="Denomination"
            class="w-full"
          />
          <USelect
            v-model="selectedArea"
            :items="areas"
            placeholder="Area"
            class="w-full"
          />
        </div>
      </div>

      <div class="text-xs text-neutral-500 font-medium">
        Showing {{ churches.length }} results
      </div>
    </div>

    <!-- Church List -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-if="churches.length === 0"
        class="text-center py-10 text-neutral-500"
      >
        <p>No churches found matching your criteria.</p>
        <UButton
          variant="link"
          color="primary"
          class="mt-2"
          @click="
            () => {
              searchQuery = '';
              selectedDenomination = 'All';
              selectedArea = 'All';
            }
          "
        >
          Clear filters
        </UButton>
      </div>

      <UCard
        v-for="church in churches"
        :key="church.id"
        :class="[
          'cursor-pointer transition-all duration-200 border-l-4',
          selectedChurchId === church.id
            ? 'border-l-primary-500 ring-2 ring-primary-500/20'
            : 'border-l-transparent hover:border-l-neutral-300 dark:hover:border-l-neutral-700'
        ]"
        @click="emit('select', church)"
      >
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            {{ church.name }}
          </h3>
          <UBadge
            size="sm"
            variant="subtle"
            color="neutral"
          >
            {{
              church.denomination
            }}
          </UBadge>
        </div>

        <p
          class="text-sm text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1"
        >
          <UIcon
            name="i-lucide-map-pin"
            class="w-3 h-3"
          />
          {{ church.area }}
        </p>

        <div class="flex flex-wrap gap-1 mt-2">
          <UBadge
            v-for="(service, idx) in church.services?.slice(0, 2)"
            :key="idx"
            size="xs"
            variant="outline"
            color="neutral"
            class="text-[10px]"
          >
            {{ formatService(service) }}
          </UBadge>
          <span
            v-if="(church.services?.length || 0) > 2"
            class="text-[10px] text-neutral-400 self-center ml-1"
          >
            +{{ (church.services?.length || 0) - 2 }} more
          </span>
        </div>
      </UCard>
    </div>
  </div>
</template>
