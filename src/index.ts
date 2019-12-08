import { createApp, onErrorCaptured, ref } from "./vue.esm-browser";
import Twitter from "./twitter"; // @imesutkoca

const UserProfile = {
  async setup() {
    const user = await fetchData();
    return { user };
  },
  template: `
    <div>
      Loaded User: 
      {{ user }}
    </div>
  `
};

const App = {
  components: {
    UserProfile
  },
  setup() {
    const error = ref(null);
    onErrorCaptured(e => {
      error.value = e;
      return true;
    });
    return { error };
  },

  template: `
    <h1>Vue 3 - Suspense</h1>
    <div v-if="error">
      {{ error }}
    </div>
    <Suspense v-else>
      <template #default>
        <UserProfile />
      </template>
      <template #fallback>
        <div>Loading... (3 seconds)</div>
      </template>
    </Suspense>

    <Twitter />
  `
};

var app = createApp();
app.component("Twitter", Twitter);
app.mount(App, "#app");

// Utils

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData() {
  await timeout(3000);
  // uncomment the line below for error capturing
  // throw new Error("UPS! There was an error.");
  return {
    name: "Mesut",
    age: 25
  };
}
