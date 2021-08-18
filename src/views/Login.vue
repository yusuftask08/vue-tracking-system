<template>
  <v-app id="inspire">
    <v-container fluid fill-height style="padding: 0px !important">
      <v-layout
        align-center
        justify-center
        style="
          background: linear-gradient(
            90deg,
            rgba(0, 99, 160, 1) 0%,
            rgba(0, 174, 201, 1) 50%,
            rgba(0, 99, 160, 1) 100%
          );
        "
        class="col-7 text-layout"
      >
        <v-flex xs12 sm8 md11>
          <h1 class="white--text" style="font-size: 70px; letter-spacing: 5px">
            Vue
          </h1>
          <span class="white--text" style="font-size: 40px"
            >Tracking System</span
          >
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md7>
          <v-card
            class="elevation-7 login-card"
            style="width: 500px; height: 42vh"
          >
            <v-card-text>
              <div class="d-flex align-center justify-center">
                <img
                  class="mt-2"
                  style="width: 100px"
                  src="../assets/logo.png"
                  alt=""
                />
              </div>

              <v-form class="">
                <v-text-field
                  v-model="email"
                  name="login"
                  label="Email"
                  width="90%"
                  class="mr-1"
                  type="email"
                  color="#2867B2"
                >
                </v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  name="password"
                  width="90%"
                  label="Parola"
                  class="mr-1"
                  type="password"
                  color="#2867B2"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                :disabled="loading"
                width="97%"
                class="white--text ml-1 login-btn"
                style="text-transform: none !important"
                @click="onSubmit(email, password), (loader = 'loading')"
              >
                Giriş Yap
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-layout align-content-end>
            <div v-if="Err" class="text-center ma-2">
              <v-snackbar
                :right="'right'"
                color="red"
                v-model="snackbar"
                :timeout="timeout"
                class="mb-5"
              >
                <h3>{{ Err }}</h3>
              </v-snackbar>
            </div>
            <div v-if="$store.state.success" class="text-center ma-2">
              <v-snackbar
                :right="'right'"
                color="green"
                v-model="snackbar"
                :timeout="timeout"
                class="mb-5"
              >
                <h3>{{ text }}</h3>
              </v-snackbar>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";
export default {
  name: "login",
  data() {
    return {
      email: "yusuftaskiran1@gmail.com",
      password: "123456",
      loading: null,
      snackbar: false,
      show: false,
      text: "Giriş Başarılı",
      timeout: 2000,
    };
  },

  methods: {
    onSubmit(email, password) {
      this.loading = true;
      this.$store.dispatch(LOGIN, { email, password }).then(() => {
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      });
      (this.loading = false), (this.snackbar = true);
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
      success: (state) => state.auth.success,
    }),
    Err() {
      return this.$store.getters.Err;
    },
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

<style >
.v-card__text {
  padding: 0 10px 0 16px !important;
}
.card {
  width: 500px;
  height: 48vh;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.login-card {
  display: block !important;
  width: 100%;
  margin-left: 10px;
  height: 40vh;
}
.login-btn {
  background: linear-gradient(
    90deg,
    rgba(0, 174, 201, 1) 0%,
    rgba(0, 99, 160, 1) 90%
  );
}

.text-layout {
  background: linear-gradient(
    90deg,
    rgba(0, 99, 160, 1) 0%,
    rgba(0, 174, 201, 1) 90%
  );
}
@media only screen and (max-width: 600px) {
  .text-layout {
    display: none;
  }
  .login-content {
    width: 100%;
  }
  .login-card {
    display: block !important;
    width: 95%;
    margin-left: 10px;
    height: 55vh;
  }
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
