import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces,
  email,
  min_value,
  max_value,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app, _options) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alpha_spaces);
    defineRule("email", email);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
  },
};
