---
sidebar: auto
---


# Formulario

## Componentes

### BaseInput.vue

```vue
<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <input
        type="text"
        class="form-control"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
```

### BaseInputDate.vue

```vue
<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <input
        type="text"
        class="form-control"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

```

### BaseTextArea.vue

```vue
<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <textarea
        type="text"
        class="form-control"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>
```

### BaseSelec.vue

```vue
<script setup>
defineProps({
  opciones: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <select
        class="form-select"
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange: ($event) => {
            $emit('update:modelValue', $event.target.value);
          },
        }"
      >
        <option
          v-for="opcion in opciones"
          :value="opcion"
          :key="opcion"
          :selected="opcion === modelValue"
        >
          {{ opcion }}
        </option>
      </select>
    </div>
  </div>
</template>
```

### BaseCheckBox.vue

```vue
<script setup>
defineProps({
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
  <div class="container formulario">
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <label 
          class="form-check-label" for="flexCheckDefault"
          v-if="label"
          >
          {{ label }}
        </label>
      </div>
    </div>
  </div>
</template>

```

### BaseRadioButton.vue

```vue
<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>

<template>
  <div class="container formulario">
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          :checked="modelValue === value"
          @change="$emit('update:modelValue', value)"
          v-bind="$attrs"
        />
        <label class="form-check-label" for="flexCheckDefault" v-if="label">
          {{ label }}
        </label>
      </div>
    </div>
  </div>
</template>
```

## Router index.js

```js
{
  path: '/formulario',
  name: 'formulario',
  component: () => import('../views/Formulario.vue')
},
```


## Vista Formulario.vue

### script

```vue
<script setup>
import Navbar from '@/components/Navbar.vue'
import BaseInput from "../components/formulario/BaseInput.vue"
import BaseInputDate from "../components/formulario/BaseInputDate.vue"
import BaseTextArea from "../components/formulario/BaseTextArea.vue"
import BaseSeleccion from "../components/formulario/BaseSeleccion.vue"
import BaseCheckBox from "../components/formulario/BaseCheckBox.vue"
import BaseRadioButton from "../components/formulario/BaseRadioButton.vue"
import { onMounted } from 'vue';
import { memoria } from '../stores/formulario.js'

const datos = memoria()

onMounted(() => {
  datos.obtenerDatos()
})
</script>
```
### template

```vue
<template>
  <div>
    <Navbar/>
  <div class="container my-4">
  <form>
    <BaseInput
      v-model="datos.obra.author"
      type="text"
      label="Autor"
    />
    <BaseInput
      v-model="datos.obra.title"
      type="text"
      label="Título"
    />
    <BaseInputDate
      v-model="datos.obra.date"
      type="date"
      label="Fecha"
    />
    <BaseTextArea
      v-model="datos.obra.synopsis"
      type="text"
      label="Descripción"
    />
    <BaseInput
      v-model="datos.obra.link"
      type="text"
      label="Enlace"
    />
    <BaseInput
      v-model="datos.obra.photo"
      type="text"
      label="Imagen"
    />
    <base-seleccion
    v-model="datos.obra.categoria"
    :opciones="datos.categorias"
    label="Selecciona una categoría"
  />
  <base-check-box
    v-model="datos.obra.pelicula" 
    label="Película"
    />
  <base-check-box
    v-model="datos.obra.comic" 
    label="Cómic"
    />
  <base-radio-button
  v-model="datos.obra.editorial"
  :value="0"
  label="DC Cómic"
  />
  <base-radio-button
  v-model="datos.obra.editorial"
  :value="1"
  label="Marvel"
  />
    <div class="input-group my-3">
      <input type="file" @change="datos.buscarImagen($event)">
    </div>

      <div class="mt-3">  
    <button v-show="datos.editar === true" 
      @click.prevent="datos.actualizarDato(id)" 
      class="btn btn-primary">
      Actualizar
    </button>
    <button v-show="datos.editar === false" 
      @click.prevent="datos.agregarDato()" 
      class="btn btn-primary">
      Guardar
    </button>
    <div class="mt-4">
      <img :src="datos.datoImagen">
    </div>

    </div>
  </form>
  </div>
<!-- ////////// tabla ////////// -->
  <table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Author</th>
        <th scope="col">Fecha</th>
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in datos.obras" :key="index">
        <th scope="row">{{index}}</th>
        <td>{{item.author}}</td>
        <td>{{item.date}}</td> 
        <td>
          <button @click.prevent="datos.obtenerDatoID( item.id );this.datos.editar = !this.datos.editar;" 
            class="btn btn-primary">Editar
          </button>
        </td>

        <td>
          <button @click.prevent="datos.eliminarDato(item.id)" 
            class="btn btn-danger">Eliminar
          </button>
      </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
```

## Stores Formulario.vue

```js
import { defineStore } from "pinia";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc  } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRoute } from 'vue-router'

const router = useRoute()

export const memoria = defineStore({
  id: "principal",
  state: () => ({
    file: null,
    datoImagen: null,
    error: null,
    editar: false,
    loading: false,
    urlDescarga: '',

    categorias: [
      'Los Vengadores',
      'Los Cuatro Fantásticos',
      'Guardianes de la Galaxia',
      'Superhéroe'
      ],

    obras: [],
    obra: {
    id: '',
    title: '',
    author: '',
    date: '',
    synopsis: '',
    link: '',
    photo: '',
    editorial: 0,
    pelicula: false,
    comic: false,    
  },
  }),
  actions: {
    async obtenerDatos() {
      this.obras = [];
      const querySnapshot = await getDocs(collection(db, "obras"));
      querySnapshot.forEach((doc) => {
        let obra = doc.data();
        obra.id = doc.id;
        this.obras.push(obra);
        console.log(obra);
      });
    },
    // DELETE / ELIMINAR / BORRAR
    async eliminarDato(id) {
      await deleteDoc(doc(db, "obras", id));
      router.go("/");
    },
    // GET BY ID / OBTENER POR ID
    async obtenerDatoID(id) {
      const docRef = doc(db, "obras", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.obra = docSnap.data();
        this.obra.id = docSnap.id;
      } else {
        console.log("¡No existe el documento!");
      }
    },

    // BUSCAR IMAGEN
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.datoImagen = e.target.result;
      };
    },
    // SUBIR IMAGEN STORAGE
    async agregarDato() {
      try {
        this.loading = true;
        const storageRef = ref(storage, "imagenes/" + this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );

        const urlDescarga = await getDownloadURL(storageRef);

        await addDoc(collection(db, "obras"), {
          title: this.obra.title,
          author: this.obra.author,
          date: this.obra.date,
          synopsis: this.obra.synopsis,
          link: this.obra.link,
          editorial: this.obra.editorial,
          pelicula: this.obra.pelicula,
          comic: this.obra.comic,
          photo: urlDescarga,
        });
        this.error = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        const router = useRoute()
        router.push("/");
        this.loading = false;
      }
    },

    // MÉTODO actualizarDato
    async actualizarDato() {
      try {
        this.loading = true;
        const storageRef = ref(storage, "imagenes/" + this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );

        const urlDescarga = await getDownloadURL(storageRef);

        const elemento = doc(db, "obras", this.obra.id);
        await updateDoc(elemento, {
          title: this.obra.title,
          author: this.obra.author,
          date: this.obra.date,
          synopsis: this.obra.synopsis,
          link: this.obra.link,
          photo: urlDescarga,
          editorial: this.obra.editorial,
          pelicula: this.obra.pelicula,
          comic: this.obra.comic,
        });
        this.error = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/");
        this.loading = false;
      }
    },
  },
});
```

