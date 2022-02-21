---
sidebar: auto
---


# Vue 3 Vite

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
6. Inciamos el modo desarrollo
```
npm run dev
```
## Utilizando script setup

### Variables

script
```js
<script setup>
 let nombre = 'Carlos'
</script>
```
```html
<template>
    <h1>{{ nombre }}</h1>
</template>
```
### Componentes

```js
<script setup>
  import HelloWord from '../components/HelloWorld.vue'
</script>
```

```html
<template>
  <HelloWord />
</template>
```

### Props

#### Views
```js
<script setup>
  import HelloWord from '../components/HelloWorld.vue'
  let nombre = "Carlos"
</script>
```

```html
<template>
  <HelloWord :nombre="nombre"/>
</template>
```
#### Componente
```js
<script setup>
defineProps({
  nombre: {
    type: String,
    required: true
  }
})
</script>
```

```html
<template>
  <h1>{{ nombre }}</h1>
</template>
```
### Emit

#### Views
```js
<script setup>
  import HelloWord from '../components/HelloWorld.vue'
  function presionar (){
    alert("Esta es la función presionar")
  }
</script>
```

```html
<template>
  <HelloWord 
  @presionar="presionar"/>
</template>
```
#### Componente
```js
<script setup>
const emit = defineEmits(['presionar'])
function pulsa (){emit ('presionar')}
</script>
```
```html
<template>
  <button @click="pulsa">Presionado</button>
</template>
```
### Emit con parámetros
#### Views
```js
<script setup>
  import HelloWord from '../components/HelloWorld.vue'
  function presionar (texto){
    alert("Esta es la función presionar. " + texto)
  }
</script>
```

```html
<template>
  <HelloWord 
  @presionar="presionar"/>
</template>
```
#### Componente
```js
<script setup>
const emit = defineEmits(['presionar'])
function pulsa (){
    emit ('presionar', 'Texto de ejemplo')
    }
</script>
```

```html
<template>
  <button @click="pulsa">Presionado</button>
</template>
```
#### Componente 2
```js
<script setup>
let texto = 'Texto de ejemplo'
const emit = defineEmits(['presionar'])
function pulsa (){
    emit ('presionar', texto)
    }
</script>
```
### Funciones Async Await

```js
<script setup>
  import HelloWord from '../components/HelloWorld.vue'
  import { ref } from 'vue'
  let starwars = ref(null)
  async function presionar (texto){
    const info = await fetch ("https://swapi.dev/api/people/1/");
    const json = await info.json();
    starwars.value = json;
    console.log(starwars.value.name)
  }
</script>
```
<template>
  <HelloWord 
  @presionar="presionar"/>
  <div v-if="starwars">
    {{starwars.name}}
  </div>
</template>
```html

```

```js

```

```html

```