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
        <v-form ref="registerForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="streetAddress" :rules="[rules.required]" label="Street Address" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="city" :rules="[rules.required]" label="City" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="state" :rules="[rules.required]" label="State" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="zipCode" :rules="zipCodeRules" label="ZIP Code" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field block v-model="cpassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" xsm="12">
              <v-btn color="warning" @click="dialog = false">Continue as Guest</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12">
              <v-btn block :disabled="!valid" color="success" class="mr-4" @click="validate"> Register </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-text v-show="selectedTab == 1">
      <v-container>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="loginPassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" xsm="12">
              <v-btn block color="warning" @click="dialog = false">Continue as Guest</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12">
              <v-btn block :disabled="!valid" color="success" class="mr-4" @click="validate"> Register </v-btn>
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

  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    selectTab(stuff) {
      this.selectedTab = stuff;
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: () => ({


    selectedTab: 1,
    dialog: true,
    tab: null,
    tabsName: ["Login", "Register"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tabs: 2,
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    city: "",
    state: "",
    streetAddress: "",
    cpassword: "",
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
    zipCodeRules: [
      v => !!v || "Required",
      v => /^\d+$/.test(v) || "Zipcode contains only digits"
    ],

    show1: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
  watch: {
    // tab(val) {
    //   this.selectedTab = val;
    // },
    // selectedTab(val) {
    //   this.tab = val;
    // }
  },

}
</script>
