<script setup>
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

import { ref, computed, onMounted } from 'vue'
import { usePropertyStore } from '~/stores/propertyStore'
import AddEditModal from '~/components/AddEditModal.vue'

const store = usePropertyStore()
const showModal = ref(false)
const selectedProperty = ref(null)
const filter = ref('')
const sortField = ref('')

const filteredProperties = computed(() => {
  let properties = store.properties
  if (filter.value) {
    properties = properties.filter(p => p.status.includes(filter.value))
  }
  if (sortField.value) {
    properties = [...properties].sort((a, b) => a[sortField.value] > b[sortField.value] ? 1 : -1)
  }
  return properties
})

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

const sortBy = (field) => {
  sortField.value = field
}

onMounted(() => {
  store.loadProperties()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Property Listings</h1>
    <button @click="openAddModal" class="bg-blue-500 text-white px-4 py-2 mb-4">Add New Property</button>
    <div>
      <input v-model="filter" placeholder="Filter by status" class="mb-4 p-2 border border-gray-300" />
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th @click="sortBy('name')">Name</th>
            <th @click="sortBy('price')">Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in filteredProperties" :key="property.id">
            <td>{{ property.name }}</td>
            <td>{{ property.price }}</td>
            <td>{{ property.status }}</td>
            <td>
              <button @click="openEditModal(property)" class="bg-yellow-500 text-white px-2 py-1">Edit</button>
              <button @click="confirmDelete(property.id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddEditModal v-if="showModal" :property="selectedProperty" @close="closeModal" />
  </div>
</template>
