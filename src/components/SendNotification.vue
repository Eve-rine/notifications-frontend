<template>
  <v-app>
      <v-container>
    <v-row>
      <v-form  ref="notificationForm" v-model="isValid">
        <v-col cols="12" md="12">
          <v-card flat>
            <v-card-title>
              <span>Send Notification</span>
              <v-spacer />
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                      v-model="formData.title"
                      label="Title"
                      outlined
                      dense
                      :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                      v-model="formData.mode"
                      :items="['sms','email']"
                      label="Mode"
                      outlined
                      dense
                      multiple
                      :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                      v-model="formData.sent_to"
                      :items="users"
                      item-text="name"
                      item-value="id"
                      label="Sent To"
                      outlined
                      multiple
                      dense
                      :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea
                      v-model="formData.message"
                      label="Message"
                      outlined
                      dense
                      :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                  color="primary"
                  @click="sendNotification"
              >Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-form>

    </v-row>
      </v-container>
  </v-app>
</template>

<script>
export default {
  name: "NotificationForm",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      console.log(v)
      v.$store.dispatch("getUsers");
    });
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    formData: {
      title: "",
      message: "",
      mode: "",
      sent_to: "",
    },
    isValid: true,
     }),
  computed: {
    users() {
      return this.$store.getters["users"];
    },

  },
  methods: {

    sendNotification() {
      if (!this.isValid) {
        this.$refs.notificationForm.validate();
      } else {
        this.$store.dispatch("senNotification", { ...this.formData });
        this.$refs.notificationForm.reset();
      }
    },
    resetform() {
      this.$refs.loadingForm.reset();
    },
    resetDispatchForm() {
      this.$refs.dispatchForm.reset();
    },
  },
};
</script>
<style scoped>
</style>