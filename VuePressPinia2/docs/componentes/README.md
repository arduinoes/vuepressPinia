---
sidebar: auto
---
# Formulario con componentes

## Componentes

### BaseInput.vue

#### template

```html
<template>
  <div class="container formulario">
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
#### script
```js
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
```
Views > Pagina.vue
```html
<base-input
  v-model="obra.author" 
  type="text" 
  label="Autor"/>
```
```js
import BaseInput from "../components/formulario/BaseInput.vue";
```
```js
BaseInput
```

### BaseInputDate.vue

#### template

```html
<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <input
        type="date"
        class="form-control"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
```
#### script

```js
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [Date],
      default: "",
    },
  },
};
</script>
```
### BaseTextArea.vue

#### template
```html
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
#### script
```js
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
```
### BaseSelect.vue

#### template

```html
<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <select 
        class="form-select" 
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange: ($event)=> {$emit('update:modelValue', $event.target.value)}
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
#### script

```js
<script>
export default {
  props: {
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
  },
};
</script>
```

### BaseCheckBox.vue

#### template
```html
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
#### script
```js
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```

### BaseRadioButton.vue

#### template
```html
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
#### script
```js
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }, 
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
```

## Firebase Vista > View

### Firebase Formulario.vue  

#### template formulario
```html
<div class="container my-4">
  <form>
    <base-input
      v-model="obra.author" 
      type="text" 
      label="Autor"/>
    <base-input
      v-model="obra.title" 
      type="text" 
      label="Título"/>
    <base-input-date 
      v-model="obra.date" 
      type="date" 
      label="Fecha" />
    <base-text-area 
      v-model="obra.synopsis" 
      type="text" 
      label="Descripción" />
    <base-input 
      v-model="obra.link" 
      type="text" 
      label="Enlace" />
    <base-input 
      v-model="obra.photo" 
      type="text" 
      label="Imagen" />
    <base-seleccion
      v-model="obra.categoria"
      :opciones="categorias"
      label="Selecciona una categoría"
    />
    <base-check-box 
      v-model="obra.pelicula" 
      label="Película"/>
    <base-check-box 
      v-model="obra.comic" 
      label="Cómic" />
    <base-radio-button
      v-model="obra.editorial"
      :value="0"
      label="DC Cómic"
    />
    <base-radio-button 
      v-model="obra.editorial" 
      :value="1" label="Marvel" />

    <div class="input-group my-3">
      <input type="file" @change="buscarImagen($event)" />
    </div>

    <div class="mt-3">
      <button
        v-show="this.editar === true"
        @click.prevent="actualizarDato(id)"
        class="btn btn-primary"
      >
        Actualizar
      </button>
      <button
        v-show="this.editar === false"
        @click.prevent="agregarDato()"
        class="btn btn-primary"
      >
        Guardar
      </button>
      <div class="mt-4">
        <img :src="datoImagen" />
      </div>
    </div>
  </form>
</div>
```
#### template formulario
Importaciones de componentes
```js
import Navbar from "@/components/Navbar.vue";
import BaseInput from "../components/formulario/BaseInput.vue";
import BaseInputDate from "../components/formulario/BaseInputDate.vue";
import BaseTextArea from "../components/formulario/BaseTextArea.vue";
import BaseSeleccion from "../components/formulario/BaseSeleccion.vue";
import BaseCheckBox from "../components/formulario/BaseCheckBox.vue";
import BaseRadioButton from "../components/formulario/BaseRadioButton.vue";
```
componentes:
```js
BaseInput,
BaseInputDate,
BaseTextArea,
BaseSeleccion,
BaseCheckBox,
BaseRadioButton
```
data:
```js
categorias: [
      "Los Vengadores",
      "Los Cuatro Fantásticos",
      "Guardianes de la Galaxia",
      "Superhéroe",
    ],
```
```js
obra: {
      id: "",
      title: "",
      author: "",
      date: "",
      synopsis: "",
      link: "",
      photo: "",
      categoria: '',
      editorial: '',
      pelicula: '',
      comic: '',
    },
```
metodos:
```js
categoria: this.obra.categoria,
editorial: this.obra.editorial,
pelicula: this.obra.pelicula,
comic: this.obra.comic,
```
#### script completo
```js
<script>
import Navbar from "@/components/Navbar.vue";
import BaseInput from "../components/formulario/BaseInput.vue";
import BaseInputDate from "../components/formulario/BaseInputDate.vue";
import BaseTextArea from "../components/formulario/BaseTextArea.vue";
import BaseSeleccion from "../components/formulario/BaseSeleccion.vue";
import BaseCheckBox from "../components/formulario/BaseCheckBox.vue";
import BaseRadioButton from "../components/formulario/BaseRadioButton.vue";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../main";
import firebase from "firebase/compat/app";
import router from "../router/index";

export default {
  name: "About",
  components: {
    Navbar,
    BaseInput,
    BaseInputDate,
    BaseTextArea,
    BaseSeleccion,
    BaseCheckBox,
    BaseRadioButton,
  },
  data() {
    return {
      file: null,
      datoImagen: null,
      error: null,
      editar: false,
      loading: false,

      categorias: [
        "Los Vengadores",
        "Los Cuatro Fantásticos",
        "Guardianes de la Galaxia",
        "Superhéroe",
      ],

      obras: [],
      obra: {
        id: "",
        title: "",
        author: "",
        date: "",
        synopsis: "",
        link: "",
        photo: "",
        categoria: '',
        editorial: '',
        pelicula: '',
        comic: '',
      },
    };
  },
  methods: {
    async obtenerDatos() {
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
        var storageRef = firebase.storage().ref();
        await storageRef.child("imagenes").child(this.file.name).put(this.file);
        const urlDescarga = await storageRef
          .child("imagenes")
          .child(this.file.name)
          .getDownloadURL();
        await addDoc(collection(db, "obras"), {
          title: this.obra.title,
          author: this.obra.author,
          date: this.obra.date,
          synopsis: this.obra.synopsis,
          link: this.obra.link,
          categoria: this.obra.categoria,
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
        router.push("/");
        this.loading = false;
      }
    },

    // MÉTODO actualizarDato
    async actualizarDato() {
      try {
        this.loading = true;
        var storageRef = firebase.storage().ref();
        await storageRef.child("imagenes").child(this.file.name).put(this.file);
        const urlDescarga = await storageRef
          .child("imagenes")
          .child(this.file.name)
          .getDownloadURL();
        const elemento = doc(db, "obras", this.obra.id);
        await updateDoc(elemento, {
          title: this.obra.title,
          author: this.obra.author,
          date: this.obra.date,
          synopsis: this.obra.synopsis,
          link: this.obra.link,
          categoria: this.obra.categoria,
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
        router.push("/");
        this.loading = false;
      }
    },
  },
  mounted() {
    this.obtenerDatos();
  },
};
</script>
```
## Axios Vista > View

### Axios Formulario.vue  

#### template

```html
<template>
  <BaseInput
    v-model="producto.nombre"
    type="text"
    label="Nombre"
  />
   <BaseTextarea
    v-model="producto.descripcion"
    type="text"
    label="Descripción"
  />
    <BaseSelect
    v-model="producto.categoria"
    :opciones="categorias"
    label="Selecciona una categoría"
  />
  <base-checkbox 
    v-model="producto.extras.pelicula" 
    label="Película"
    />
  <base-checkbox 
    v-model="producto.extras.comic" 
    label="Cómic"
    />
  <base-radio
  v-model="producto.editorial"
  :value="0"
  label="DC Cómic"
  />
  <base-radio
  v-model="producto.editorial"
  :value="1"
  label="Marvel"
  />
   {{ producto }}
</template>
```
#### script
```js
<script>
import BaseInput from "../components/BaseInput.vue"
import BaseTextarea from "../components/BaseTextarea.vue"
import BaseSelect from "../components/BaseSelect.vue"
import BaseCheckbox from "../components/BaseCheckbox.vue"
export default {
  name: 'Formulario',
  components: {
    BaseInput,
    BaseTextarea,
    BaseSelect,
    BaseCheckbox
  },
  data () {
    return {
      categorias: [
        'Los Vengadores',
        'Los Cuatro Fantásticos',
        'Guardianes de la Galaxia',
        'Superhéroe'
      ],
      producto: {
        categoria: '',
        nombre: '',
        descripcion: '',
        editorial: 0,
        extras: {
          pelicula: false,
          comic: false
        }
      }
    }
  }
}
</script>
```
