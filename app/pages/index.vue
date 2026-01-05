<script setup lang="ts">
import type { Church } from '~~/shared/types/church'

const [
  { data: churches, status },
  { data: denominations },
  { data: areas }
] = await Promise.all([
  useFetch<Church[]>('/api/churches'),
  useFetch<string[]>('/api/denominations'),
  useFetch<string[]>('/api/areas')
])

const searchQuery = ref('')
const selectedDenomination = ref('All')
const selectedArea = ref('All')
const selectedChurchId = ref<number | null>(null)

const filteredChurches = computed(() => {
  if (!churches.value) return []

  return churches.value.filter((church) => {
    const matchesSearch
      = church.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || church.address.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDenomination
      = selectedDenomination.value === 'All'
        || church.denomination === selectedDenomination.value

    const matchesArea
      = selectedArea.value === 'All' || church.area === selectedArea.value

    return matchesSearch && matchesDenomination && matchesArea
  })
})

const selectedChurch = computed(() => {
  if (!churches.value) return null
  return churches.value.find(c => c.id === selectedChurchId.value) || null
})

function handleSelectChurch(church: Church) {
  selectedChurchId.value = church.id
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-white dark:bg-black"
  >
    <!-- Sidebar -->
    <div class="w-full md:w-1/3 h-1/2 md:h-full shrink-0 z-10 relative">
      <div
        v-if="status === 'pending'"
        class="flex items-center justify-center h-full"
      >
        <UIcon
          name="i-lucide-loader-2"
          class="w-8 h-8 animate-spin text-primary-500"
        />
      </div>
      <ChurchSidebar
        v-else
        :churches="filteredChurches"
        :selected-church-id="selectedChurchId"
        :denominations="denominations || []"
        :areas="areas || []"
        @select="handleSelectChurch"
        @update:search="searchQuery = $event"
        @update:denomination="selectedDenomination = $event"
        @update:area="selectedArea = $event"
      />
    </div>

    <!-- Map -->
    <div class="w-full md:w-2/3 h-1/2 md:h-full relative">
      <ClientOnly>
        <ChurchMap
          :churches="filteredChurches"
          :selected-church="selectedChurch"
          @select="handleSelectChurch"
        />
        <template #fallback>
          <div
            class="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800"
          >
            <div class="text-neutral-500">
              Loading map...
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
