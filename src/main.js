import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Rivers from './components/Rivers.vue'
import 'bootstrap/dist/css/bootstrap.min.css'



const routes = [
    {
        path: '/api/:basein',
        name:'riverRoute',
        component: Rivers,
        props: true
    },
    {
        path: '/api/:basein/date/:startDate/:endDate',
        name:'riverRouteByStartEndDate',
        component: Rivers,
        props: true 
    },
    // fall back route
    {
        path: '/:pathMatch(.*)*',
        redirect: '/api/dunabeBasin'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

  createApp(App)
  .use(router)
  .mount('#app')