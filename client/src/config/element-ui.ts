import Vue from "vue";
import {
  Input,
  Form,
  FormItem,
  Button,
  Dropdown,
	DropdownMenu,
	DropdownItem,
  Message
} from "element-ui";

Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.prototype.$message = Message;
