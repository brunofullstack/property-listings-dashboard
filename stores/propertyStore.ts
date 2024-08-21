import { defineStore } from 'pinia'

interface Property {
  id: number
  name: string
  price: number
  status: 'available' | 'sold'
}

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
  }),
  actions: {
    loadProperties() {
      // Mock API or static JSON data
      this.properties = [
        { id: 1, name: 'Property 1', price: 100000, status: 'available' },
        { id: 2, name: 'Property 2', price: 150000, status: 'sold' },
        { id: 3, name: 'Property 3', price: 120000, status: 'available' },
        { id: 4, name: 'Property 4', price: 200000, status: 'sold' },
        { id: 5, name: 'Property 5', price: 175000, status: 'available' },
      ]
    },
    addProperty(property: Property) {
      this.properties.push({ ...property, id: Date.now() })
    },
    editProperty(updatedProperty: Property) {
      const index = this.properties.findIndex(prop => prop.id === updatedProperty.id)
      if (index !== -1) this.properties[index] = updatedProperty
    },
    deleteProperty(id: number) {
      this.properties = this.properties.filter(prop => prop.id !== id)
    },
  },
})
