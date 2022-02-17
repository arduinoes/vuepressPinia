---
sidebar: auto
---


# Vuex

Una solución para compartir/intercambiar/modificar/añadir... datos, métodos y acciones entre archivos es Vuex. 

![Vuex](/01-Vuex.jpg)

Vuex permite centralizar los datos, métodos y acciones.

![Store](/02-VuexStore.png)

Funciona igual que la parte del script que habíamos visto hasta ahora con pequeñas diferencias. data === store, methods === actions y computed === getters

![AppVsStore](/03-AppStrore.png)

Para este intercambios de datos tenemos que establecer un protocolo para su reactividad.

![Store](/04-Estandarizacion.png)

Una vez actualizados los datos tienen que recibirse en los archivos vinculados.

![Store](/05-Reactivo.png)

Esto lo conseguimos con las mutaciones que se encargan de actualizar los datos una vez que son enviados a través de las acciones.

![Store](/06-Mutations.png)

## Como comunicarse con Vuex

```js
this.$store.state.nombreObjeto
```
```js
this.$store.dispatch.('nombreFuncion', 'payload')
```
## Acciones y Mutaciones VUEX

```js
async obtenerDatos () { 
  const data = await getDocs(collection(db, "productos"));
    data.forEach((doc) => {
    let producto = doc.data()
    producto.id = doc.id
    this.productos.push(producto)
    console.log(producto)
  });
},
```
vs

```js
state: {
  usuario: null,
  obras: [],
  obra: {
    id: "",
    title: "",
    author: "",
    date: "",
    synopsis: "",
    link: "",
    photo: "",
    categoria: "",
    editorial: "",
    pelicula: "",
    comic: "",
  },
},
```

mutations:
```js
SET_OBRAS(state, payload) {
  state.obras = payload;
},
```

actions:
```js 
async obtenerDatos({ commit }) {
  const obras = [];
  const data = await getDocs(collection(db, "obras"));
  data.forEach((doc) => {
    let obra = doc.data();
    obra.id = doc.id;
    obras.push(obra);
    console.log(obra);
  });
  commit("SET_OBRAS", obras);
},
```

## Methods y computed VIEWS

```js
import { mapActions, mapState } from 'vuex'
```
methods

```js
methods: {
  ...mapActions(['obtenerDatos'])
},
```
```js
computed: {
...mapState(['obras', 'obra'])
},
```
```js
created(){
    this.obtenerDatos()
},
```
### Alternativa
```js
created() {
  this.$store.dispatch(‘nombreFunción’)
},
```
```js
computed: {
  obras(){
	  return this.$store.state.obras
}
}
```
```js
created() {
  this.$store.dispatch(‘nombreFuncion’, this.id)
}
```
### Alternativa 2
```js
methods: {
  enviar (){
    this.$store.dispatch('obtenerDatos')
  },
  recibir(){
    this.$store.state.obras
  }
},
```
```js
created(){
  this.enviar()
  this.recibir()
}, 
```
