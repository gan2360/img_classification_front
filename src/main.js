import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import { Button, Form, Input, FormItem, Select, Option, Icon, Upload, Table, TableColumn, Divider, Loading, Descriptions, DescriptionsItem } from 'element-ui';
import store from './store'
Vue.use(Loading.directive);
Vue.component(Button.name, Button);
Vue.component(DescriptionsItem.name, DescriptionsItem);
Vue.component(Descriptions.name, Descriptions);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Icon.name, Icon);
Vue.component(Upload.name, Upload);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Divider.name, Divider);
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    router: router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$axios = axios
    }
}).$mount('#app')