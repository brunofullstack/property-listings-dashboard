import { defineStore } from 'pinia'

interface Property {
  id: number
  name: string
  price: number
  status: 'available' | 'sold'
  image: string
}

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
  }),
  actions: {
    loadProperties() {
      // Mock API or static JSON data
      this.properties = [
        { id: 1, name: 'Property One 1', price: 100000, status: 'available', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51701996/original/ac2eabbe-da86-4646-a7d7-f6fe48c083b8.jpeg?im_w=720' },
        { id: 2, name: 'Property Two 2', price: 150000, status: 'sold', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51701996/original/ac2eabbe-da86-4646-a7d7-f6fe48c083b8.jpeg?im_w=720' },
        { id: 3, name: 'Property Three 3', price: 120000, status: 'available', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51701996/original/ac2eabbe-da86-4646-a7d7-f6fe48c083b8.jpeg?im_w=720' },
        { id: 4, name: 'Property Four 4', price: 200000, status: 'sold', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51701996/original/ac2eabbe-da86-4646-a7d7-f6fe48c083b8.jpeg?im_w=720' },
        { id: 5, name: 'Property Five 5', price: 175000, status: 'available', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51701996/original/ac2eabbe-da86-4646-a7d7-f6fe48c083b8.jpeg?im_w=720' },
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
