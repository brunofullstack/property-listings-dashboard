<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg">
        <h2 v-if="property" class="text-lg font-bold mb-4">Edit Property</h2>
        <h2 v-else class="text-lg font-bold mb-4">Add Property</h2>

        <form @submit.prevent="saveProperty">
          <div class="mb-4">
            <label class="block text-gray-700">Name:</label>
            <input v-model="form.name" required class="w-full p-2 border border-gray-300" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Price:</label>
            <input v-model="form.price" type="number" required class="w-full p-2 border border-gray-300" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Status:</label>
            <select v-model="form.status" class="w-full p-2 border border-gray-300">
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div class="flex justify-end">
            <button @click="$emit('close')" type="button" class="bg-gray-500 text-white px-4 py-2 mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { usePropertyStore } from '~/stores/propertyStore'

  const props = defineProps({
    property: Object,
  })

  const emit = defineEmits(['close'])
  const store = usePropertyStore()

  const form = ref({
    name: '',
    price: 0,
    status: 'available',
  })

  watch(props.property, (newProperty) => {
    if (newProperty) {
      form.value = { ...newProperty }
    } else {
      form.value = { name: '', price: 0, status: 'available' }
    }
  }, { immediate: true })

  const saveProperty = () => {
    if (props.property) {
      store.editProperty({ ...form.value, id: props.property.id })
    } else {
      store.addProperty(form.value)
    }
    emit('close')
  }
  </script>
