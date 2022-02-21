---
sidebar: auto
---

# Vue 3 + Vite + Firebase

## Instalación

Vite Vue 3 [install](https://vuejs.org/guide/scaling-up/tooling.html#project-scaffolding)

```
npm init vue@latest
```
1. Escribimos el nombre del proyecto

![Nombre del Proyecto](/pinia/1.png)


2. Configuración del proyecto

![Configuración del Proyecto](/pinia/2.png)

3. Proyecto finalizado

![install](/pinia/3.png)

4. Yo suelo preferir arrastrar la caperta que creo en el escritorio

```
cd nombreDelProyecto
```
5. Instalación de los módulos
```
npm i
```
6. Añadir más módulos
BOOTSTRAP
```
npm i --save bootstrap
```
POPPER
```
npm i @popperjs/core 

```
IMPORTAR EN ARCHIVO MAIN.JS
```
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

```
FIREBASE
```
npm i firebase
```

ARCHIVO FIREBASE.JS

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvGfqa-J8qjWX5Cc8R1Ku8BPY2woEh1ak",
    authDomain: "museo-f7dc2.firebaseapp.com",
    databaseURL: "https://museo-f7dc2.firebaseio.com",
    projectId: "museo-f7dc2",
    storageBucket: "museo-f7dc2.appspot.com",
    messagingSenderId: "761451708850",
    appId: "1:761451708850:web:40858aa8e7419d164ba4ab",
    measurementId: "G-45VHXFWMEE"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth();

export { db, auth, storage };
```

## Vista Firebase HomeView.vue

```js
<script setup>
import {onMounted, reactive } from 'vue'
import BaseCard from '../components/BaseCard.vue'
import Navbar from '../components/Navbar.vue';
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase"

const obras = reactive([]);

async function obtenerObras () {
 const first = query(
    collection(db, "obras"),
    orderBy("author"),
    limit(3)
  );
  const querySnapshot = await getDocs(first);
  querySnapshot.forEach((doc) => {
    let obra = doc.data();
    obra.id = doc.id;
    obras.push(obra);
    console.log(obras);
  });}

onMounted(() => {
  obtenerObras()
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
      v-for="obra in obras"
      :key="index"
      :obra="obra"
    />
 </div>
</template>
```
## Componente Firebase BaseCard.vue

#### script
```js
<script setup>
const props = defineProps ({
    obra: Object
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
    </div>
  </div>
</template>
```
