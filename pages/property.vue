<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Property Listings</h1>
    <button @click="openAddModal" class="bg-blue-500 text-white px-4 py-2 mb-4">Add New Property</button>

    <div class="mb-4 flex justify-between items-center">
      <input v-model="filter" placeholder="Search" class="p-2 border border-gray-300" />
      <select v-model="sortField" class="p-2 border border-gray-300">
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="status">Status</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="property in filteredProperties" :key="property.id" class="bg-white shadow-md rounded-lg overflow-hidden">
        <img :src="property.image" alt="Property Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2">{{ property.name }}</h2>
          <p class="text-gray-600">Price: ${{ property.price }}</p>
          <p :class="{'text-green-500': property.status === 'available', 'text-red-500': property.status === 'sold'}" class="font-semibold">
            {{ property.status === 'available' ? 'Available' : 'Sold' }}
          </p>
          <div class="mt-4 flex justify-between">
            <button @click="openEditModal(property)" class="bg-yellow-500 text-white px-4 py-2">Edit</button>
            <button @click="confirmDelete(property.id)" class="bg-red-500 text-white px-4 py-2">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-600 mr-2">
        Previous
      </button>
      <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-600 ml-2">
        Next
      </button>
    </div>

    <AddEditModal v-if="showModal" :property="selectedProperty" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePropertyStore } from '~/stores/propertyStore'
import AddEditModal from '~/components/AddEditModal.vue'

const store = usePropertyStore()
const showModal = ref(false)
const selectedProperty = ref(null)
const filter = ref('')
const sortField = ref('')

const itemsPerPage = ref(8) // Número de propriedades por página
const currentPage = ref(1)

const filteredProperties = computed(() => {
  let properties = store.properties

  // Filtragem baseada em uma string de busca
  if (filter.value) {
    const searchQuery = filter.value.toLowerCase()
    properties = properties.filter(p => {
      return (
        p.name.toLowerCase().includes(searchQuery) ||
        p.price.toString().includes(searchQuery) ||
        p.status.toLowerCase().includes(searchQuery) ||
        (p.image && p.image.toLowerCase().includes(searchQuery))
      )
    })
  }

  // Filtragem adicional por status, se necessário
  if (filter.status) {
    properties = properties.filter(p => p.status.includes(filter.status))
  }

  // Ordenação baseada em um campo específico
  if (sortField.value) {
    properties = [...properties].sort((a, b) => {
      if (a[sortField.value] > b[sortField.value]) return 1
      if (a[sortField.value] < b[sortField.value]) return -1
      return 0
    })
  }

  return properties
})


const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProperties.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProperties.value.length / itemsPerPage.value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const openAddModal = () => {
  selectedProperty.value = null
  showModal.value = true
}

const openEditModal = (property) => {
  selectedProperty.value = { ...property }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this property?')) {
    store.deleteProperty(id)
  }
}

const { t } = useI18n();

useHead({
  title: t("pages.minimal.meta.title"),
  meta: [{ name: "description", content: t("pages.minimal.meta.description") }],
});
useSeoMeta({
  title: t("pages.minimal.meta.title"),
  description: t("pages.minimal.meta.description"),
});
definePageMeta({
  layout: "fullscreen",
});

onMounted(() => {
  store.loadProperties()
})
</script>
