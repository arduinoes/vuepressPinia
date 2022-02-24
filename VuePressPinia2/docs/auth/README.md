---
sidebar: auto
---

# Auth Firebase

## Main.js
```js
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { initializeApp } from "firebase/app";

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

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
```

## App.vue
```vue
<script setup>
import { RouterView } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { almacen } from './stores/auth.js'

const datos = almacen()

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    datos.isLoggedIn = true;
    console.log('verdadero')
  } else {
    datos.isLoggedIn = false;
    console.log('falso')
  }
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
```

## Componentes

### Navbar.vue
```vue
<script setup>
import { almacen } from "../stores/auth.js";
const datos = almacen();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand ms-4" href="#">Vue 3 + script setup + Pinia</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Setup</router-link>
          </li>
          <li>
            <router-link v-if="datos.isLoggedIn" class="nav-link" to="/about"
              >About</router-link
            >
          </li>
        </ul>
        <form>
          <button
            v-if="!datos.isLoggedIn"
            type="button"
            class="btn btn-outline-primary mx-2"
            data-bs-toggle="modal"
            data-bs-target="#login"
          >
            Log in
          </button>
          <!-- Cerrar sesión -->
          <button
            v-if="datos.isLoggedIn"
            class="btn btn-outline-danger me-2"
            @click="datos.signout"
          >
            Log out
          </button>
          <!-- Regístrate -->
          <button
            v-if="!datos.isLoggedIn"
            type="button"
            class="btn btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target="#registro"
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>
```
### ModalLogIn.vue

```vue
<script setup>
import { almacen } from '../stores/auth.js' 
const datos = almacen() 
</script>

<template>
  <div class="modal fade" id="login">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Iniciar sesión</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="datos.signIn">
            <!-- CORREO -->
            <div class="input-group mb-3">
              <span class="input-group-text">Correo</span>
              <input
                v-model="datos.email"
                type="email"
                required="true"
                class="form-control"
              />
            </div>
            <!-- PASSWORD -->
            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input
                v-model="datos.password"
                type="password"
                required="true"
                class="form-control"
              />
            </div>
            <div class="d-grid gap-2">
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                <!-- Cierra el modal -->
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
```

### ModalRegister.vue

```vue
<script setup>
import { almacen } from '../stores/auth.js'
const datos = almacen()
</script>

<template>
  <div class="modal fade" id="registro">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Regístrate</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="datos.register">
            <!-- CORREO -->
            <div class="input-group mb-3">
              <span class="input-group-text">Correo</span>
              <input
                v-model="datos.email"
                type="email"
                required="true"
                class="form-control"
              />
            </div>
            <!-- PASSWORD -->
            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input
                v-model="datos.password"
                type="password"
                required="true"
                class="form-control"
              />
            </div>
            <!-- REPASSWORD -->
            <div class="input-group mb-3">
              <span class="input-group-text">Repite Password</span>
              <input
                v-model="datos.repassword"
                type="password"
                required="true"
                class="form-control"
              />
            </div>
            <div class="d-grid gap-2">
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
```



## Vistas

### Home.vue

```vue
<script setup>
import Navbar from '../components/Navbar.vue'
import ModalLogIn from '../components/ModalLogIn.vue'
import ModalRegister from '../components/ModalRegister.vue'
</script>

<template>
<Navbar />
<ModalLogIn
/>
<ModalRegister
/>
</template>
```
### About.vue

```vue
<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
<Navbar />
  <h1>Autorización</h1>
  <h3>Solo para usuarios regristrados</h3>
</template>
```
## Store Pinia

### auth.js

```js
import { defineStore } from "pinia";
import router from "../router/index";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const almacen = defineStore({
  id: "main",
  state: () => ({
    isLoggedIn: true,
    email: "",
    password: "",
    repassword: "",
    errorMessage: "",
  }),
  getters: {},
  actions: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("¡Registrado!");
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },

    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          alert("¡Sesión iniciada!");
          router.push("/auth");
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },

    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert("¡Sesión finalizada!");
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },
  },
});
```
## Router

### index.js

```js
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'Home',
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/auth",
      name: 'Auth',
      component: () => import("../views/Auth.vue"),
      meta: { requiresAuth: true }
        
    },
  ]
})

const getCurrentUser = () => {
  return new Promise(( resolve, reject ) =>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach( async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()){
      next();
    } else {
      alert("No tienes acceso");
      next('/');
    }
  } else {
    next();
  }
});

export default router
```


