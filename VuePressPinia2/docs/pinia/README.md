---
sidebar: auto
---

## Pinia 

### Store Archivo.js
```js
import { defineStore } from 'pinia'

export const almacen = defineStore('main', {
  state: () => {
    return {
      obras: [
        { author: "01", title: "Gamora", photo: "./imagenes/Gamora.jpeg", descripcion: "Gamora es la hija adoptiva de Thanos, y la última de su especie. Sus poderes incluyen fuerza y agilidad sobrehumanas y un factor de curación acelerada"},
        { author: "02", title: "Groot", photo: "./imagenes/Groot.jpeg", descripcion: "Groot es un coloso Flora del Planeta X, la capital de los mundos secundarios"},
        { author: "03", title: "Rocket", photo: "./imagenes/Rocket.jpeg", descripcion: "Rocket, es un individuo genéticamente modificado parecido a un mapache que se convirtió en un criminal al igual que su amigo Groot"},
        { author: "04", title: "StarLord", photo: "./imagenes/StarLord.jpeg", descripcion: "Es el hijo mestizo del emperador J'Son del planeta Spartax y la humana Meredith Quill"},
      ]
    }
  },
})
```
### Vista AboutView.vue

#### script
```js
<script setup>
import BaseCard from '../components/BaseCard.vue'
import { almacen } from '../stores/archivo.js'

const datos = almacen()

</script>
```
#### template
```html
<template>
  <div class="row justify-content-center">
    <BaseCard
      class="col-4 m-2"
      v-for="obra in datos.obras"
      :key="obra.author"
      :obra="obra"
    />
  </div>
</template>
```
### Componente

#### script
```js
<script setup>
defineProps({
  obra: {
    type: Object,
    required: true
  }
})
</script>
```
#### template
```html
<template>
  <div class="card" style="width: 18rem">
    <img :src="obra.photo" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">{{ obra.author }}</h5>
      <p class="card-text">
        {{ obra.title }}
      </p>
      <a href="#" class="btn btn-primary">Leer más</a>
    </div>
  </div>
</template>
```

## Pinia Firebase

### Store Archivo.js

```js
import { defineStore } from 'pinia'
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { db } from "../main"

export const almacen = defineStore({
    id: 'main',
    state: () => ({
        obras: [],
    }),
    actions: {
      async obtenerDatos () {
        const first = query(
           collection(db, "obras"),
           orderBy("author"),
          //limit(3)
         );
         this.obras = [];
         const querySnapshot = await getDocs(first);
         querySnapshot.forEach((doc) => {
           let obra = doc.data();
           obra.id = doc.id;
           this.obras.push(obra);
           console.log(this.obras);
         });}
    },
})
```
### Vista Firebase AboutView.vue

#### script

```js
<script setup>
import { onMounted } from 'vue';
import BaseCard from '../components/BaseCard.vue'
import Navbar from '../components/Navbar.vue';
import { almacen } from '../stores/archivo.js'

const store = almacen()

onMounted(() => {
  store.obtenerDatos()
})
</script>
```
#### template
```html
<template>
<Navbar />
  <div class="row justify-content-center">
    <BaseCard
      class="col-4 m-2"
      v-for="obra in store.obras"
      :key="index"
      :obra="obra"
    />
  </div>
</template>
```
