<script setup lang="ts">
import type { Church } from '~/data/churches'

interface MapLibreMap {
  flyTo(options: {
    center: [number, number]
    zoom: number
    essential?: boolean
  }): void
}

const props = defineProps<{
  churches: Church[]
  selectedChurch?: Church | null
}>()

const emit = defineEmits<{
  (e: 'select', church: Church): void
}>()

const mapRef = shallowRef<MapLibreMap | null>(null)
const center = ref([77.5946, 12.9716] as [number, number])
const zoom = ref(12)

function onMapLoad(event: { map: MapLibreMap }) {
  mapRef.value = event.map
}

// Watch for selected church changes to fly to it
watch(
  () => props.selectedChurch,
  (church) => {
    if (church && mapRef.value) {
      mapRef.value.flyTo({
        center: church.coordinates,
        zoom: 15,
        essential: true
      })
    }
  }
)

// Handle marker click
const onMarkerClick = (church: Church) => {
  emit('select', church)
}
</script>

<template>
  <div class="w-full h-full bg-neutral-100 dark:bg-neutral-800 relative">
    <MglMap
      :map-style="'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'"
      :center="center"
      :zoom="zoom"
      class="w-full h-full"
      @load="onMapLoad"
    >
      <MglNavigationControl position="top-right" />

      <MglMarker
        v-for="church in churches"
        :key="church.id"
        :coordinates="church.coordinates"
        anchor="bottom"
        class="cursor-pointer group"
        @click="onMarkerClick(church)"
      >
        <template #element>
          <div
            class="relative group-hover:scale-110 transition-transform duration-200"
          >
            <UIcon
              name="i-lucide-map-pin"
              class="w-8 h-8 drop-shadow-md"
              :class="
                selectedChurch?.id === church.id
                  ? 'text-primary-400 scale-125'
                  : 'text-primary-600'
              "
            />
          </div>
        </template>
      </MglMarker>

      <MglPopup
        v-if="selectedChurch"
        :coordinates="selectedChurch.coordinates"
        :close-button="false"
        :close-on-click="false"
        anchor="top"
        :offset="[0, 10]"
      >
        <div class="p-2 min-w-[200px]">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-sm">
              {{ selectedChurch.name }}
            </h3>
          </div>
          <p class="text-xs text-gray-500 mb-2">
            {{ selectedChurch.denomination }}
          </p>
          <p class="text-xs">
            {{ selectedChurch.address }}
          </p>
          <div class="mt-2 text-xs text-primary-600 font-medium">
            Est. {{ selectedChurch.established }}
          </div>
        </div>
      </MglPopup>
    </MglMap>
  </div>
</template>

<style>
/* Custom popup styling to match Nuxt UI if needed */
.maplibregl-popup-content {
  padding: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.dark .maplibregl-popup-content {
  background-color: #171717;
  color: #fff;
  border: 1px solid #262626;
}
.maplibregl-popup-tip {
  border-bottom-color: #fff;
}
.dark .maplibregl-popup-tip {
  border-bottom-color: #262626;
}
</style>
