<template>
  <div id="app">
  <v-row justify="center" id="Login">
    <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
    <v-tabs v-model="tab" background-color="primary accent-4" class="elevation-2" dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`" @click="selectTab(i)">
        {{ tabsName[i - 1] }}
      </v-tab>
    </v-tabs>
    <v-card-text v-show="selectedTab == 2">
      <v-container>
        <v-form ref="registerForm" v-model="validRegisterForm" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="registerForm.name" :rules="[rules.required]" label="Full Name" maxlength="20" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="registerForm.email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="registerForm.role" :items="['admin','user']" label="Role" required></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="registerForm.phone_number" :rules="[rules.required]" label="Phone Number" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="registerForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12">
              <v-btn block :disabled="!validRegisterForm" color="success" class="mr-4" @click="Register"> Register </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-text v-show="selectedTab == 1">
      <v-container>
        <v-form ref="formLogin" v-model="isValid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="loginForm.email" :rules="loginEmailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="loginForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12">
              <v-btn block :disabled="!isValid" color="success" class="mr-4" @click.prevent="Login"> Login </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
    </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
name: 'LoginComponent',
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    selectTab(stuff) {
      this.selectedTab = stuff;
    },
    Login() {
      if (!this.validLoginForm) {
        this.$refs.formLogin.validate();
      } else {
        this.$store.dispatch("login", { ...this.loginForm });
        this.$refs.formLogin.reset();
      }
    },
    Register() {
      if (!this.validRegisterForm) {
        this.$refs.registerForm.validate();
      } else {
        this.$store.dispatch("register", { ...this.registerForm });
        this.$refs.registerForm.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  data: () => ({

    selectedTab: 1,
    dialog: true,
    tab: null,
    tabsName: ["Login", "Register"],
    text: "",
    tabs: 2,
    validRegisterForm: true,
    validLoginForm: true,
    isValid: true,
    name: "",
    email: "",
    phone_number: "",
    loginPassword: "",
    loginEmail: "",

    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 6) || "Min 8 characters"
    },
    registerForm: {
      name: "",
      email: "",
      phone_number: "",
      password: ""
    },
    loginForm: {
      email: "",
      password: ""
    },
  }),

}
</script>
