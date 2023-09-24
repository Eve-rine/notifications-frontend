<template>
  <v-app>
<!--  <v-container>-->
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
              flat
              style="background-color: #ffffff"
              elevation="1"
              class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{notification_stats?
                      notification_stats.total:0
                    }}</v-list-item-title>
                  <v-list-item-subtitle>Total Notifications</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-account-multiple</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
              flat
              style="background-color: #ffffff"
              elevation="1"
              class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{notification_stats?
                      notification_stats.sms:0
                    }}</v-list-item-title>
                  <v-list-item-subtitle> Sms Notifiactions</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-playlist-check</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <div>
          <v-card
              flat
              style="background-color: #ffffff"
              elevation="1"
              class="mx-2 mt-3"
          >
            <v-list>
              <v-list-item class="stats">
                <v-list-item-content>
                  <v-list-item-title class="text-lg-h5">{{notification_stats?
                      notification_stats.email:0
                    }}</v-list-item-title>
                  <v-list-item-subtitle> Email Notifications</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-avatar color="primary light-1" size="53">
                    <v-icon color="white">mdi-car-pickup</v-icon>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-card flat>
          <v-card-title>
            <span>Notifications List</span>
            <v-spacer />
            <div class="ma-2">
              <v-btn
                  class="indigo white--text"
                  @click="openModal()"
              >
                <v-icon class="mr-2">mdi-plus</v-icon>Send Notification
              </v-btn>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-data-table
                :items-per-page="10"
                :headers="headers"
                :items="notifications"
            >
              <template v-slot:[`item.ID`]="{ index }">
                <!-- <template v-slot:item.ID="{ index }"> -->
                <span>{{ index + 1 }}</span>
              </template>
              <template v-slot:[`item.sent_to`]="{ item }">
                <span>{{item.sent_to }}</span>
              </template>
              <template v-slot:[`item.mode`]="{ item }">
                <span>{{item.mode }}</span>
              </template>
              <template v-slot:[`item.created_at`]="{ item }">
                <span>{{item.created_at }}</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
<!--  </v-container>-->
  </v-app>
</template>

<script>
export default {
  name: "userDashboard",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      console.log(v)
      v.$store.dispatch("getNotifications");
      v.$store.dispatch("getNotificationStats");
    });
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    formData: {
      order_number: "",
      fleet_id: "",
      status: "",
    },
    dispatchForm: {
      order_number: "",
      fleet_id: "",
      status: "",
      customer_id: "",
    },
    isValid: true,
    headers: [
      { text: "#", value: "id" },
      { text: "Sent To", value: "user.name" },
      { text: "Mode", value: "mode" },
      { text: "Message", value: "message" },
      { text: "Sent At", value: "created_at" },
    ],

  }),
  computed: {
    notifications() {
      return this.$store.getters["notifications"];
    },
    notification_stats() {
      return this.$store.getters["notification_stats"];
    },
    // vehicles() {
    //   // return this.$store.getters["vehicles"];
    //   // remove store
    //
    // },


  },
  methods: {
    allocate() {
      if (!this.isValid) {
        this.$refs.loadingForm.validate();
      } else {
        this.formData.status = "Loading";
        this.$store.dispatch("allocateOrder", { ...this.formData });
        this.$refs.loadingForm.reset();
      }
    },
    dispatchOrders() {
      if (!this.isValid) {
        this.$refs.dispatchForm.validate();
      } else {
        this.$store.dispatch("dispatchOrders", { ...this.dispatchForm });
        this.$refs.dispatchForm.reset();
      }
    },
    resetform() {
      this.$refs.loadingForm.reset();
    },
    resetDispatchForm() {
      this.$refs.dispatchForm.reset();
    },
    getCustomer() {
      let selectedOrder = this.orders.filter(
          (a) => a.id === this.dispatchForm.order_number
      );
      this.dispatchForm.customer_id = selectedOrder[0].customer_id;
    },
  },
};
</script>
<style scoped>
</style>