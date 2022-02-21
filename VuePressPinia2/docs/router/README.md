---
sidebar: auto
---

# Router

## Configuración

### router > index.js
```js
{
  path: "/detalle-obra/:id",
  name: "DetalleObra",
  props: true,
  component: () => import("../views/DetalleObra.vue")
},
```
### Componentes > BaseCard.js

Añade el parámetro **obra.id** a la ruta **DetalleObra**

```html
<router-link class="btn btn-primary" :to="{ name: 'DetalleObra', params: { id: obra.id }}">
  Leer mas 
</router-link>
```

### Vista DetalleObra

Importamos el módulo **useRoute**

```js
import { useRoute } from 'vue-router'
```
Guardamos la función
```js
const route = useRoute()
```
Obtenemos el parámetro
```js
const id = route.params.id
```
Lo utilizamos en la función para obtener el objeto
```js
const docRef = doc(db, "obras", id);
```
```vue
<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from 'vue-router'
import BaseDetalle from "../components/BaseDetalle.vue";
import Navbar from "../components/Navbar.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const route = useRoute()

const id = route.params.id

const state = reactive({
  obra: null
});

async function obtenerDatoID (){
  const docRef = doc(db, "obras", id);
  const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        state.obra = docSnap.data()
        state.obra.id = docSnap.id
        console.log (state.obra)
        } 
        else {
        console.log("¡No existe el documento!");
        }
}
onMounted(() => {
   obtenerDatoID()
})
</script>
```
#### template

```vue
<template>
  <Navbar />
  <div class="row justify-content-center">
    <BaseDetalle 
      :obra="state.obra" />
  </div>
  <dir class="text-center">
  <router-link class="btn btn-primary" to="/">Volver</router-link></dir>
</template>
```
