import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core"

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import {
  faBars,
  faChevronDown,
  faChevronUp,
  faGrip,
} from "@fortawesome/free-solid-svg-icons"

library.add(faBars, faChevronDown, faChevronUp, faGrip)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app")
