---
sidebar: auto
---

# Router

## Configuración

### router > index.js
```js
 {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/formulario',
      name: 'formulario',
      component: () => import('../views/Formulario.vue')
    },
    {
      path: "/detalle-obra/:id",
      name: "DetalleObra",
      props: true,
      component: () => import("../views/DetalleObra.vue")
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/Setup.vue')
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
