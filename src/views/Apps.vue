<template>
  <v-app>
    <v-app-bar height="64px" app class="app-bar" dark elevation="0">
      <v-app-bar-nav-icon
        @click.stop="sidebarMenu = !sidebarMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" class="mr-2">
            <v-avatar color="#00AEC9" size="48">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="d-flex justify-center align-center" elevation="10">
          <v-list-item-content class="justify-center d-flex align-center">
            <div class="mx-auto text-center align-center justify-center">
              <v-avatar color="#00AEC9">
                <span class="white--text headline">{{ TokenName }}</span>
              </v-avatar>
              <h4 class="mt-2">{{ TokenName }}</h4>
              <v-divider class="my-3"></v-divider>
              <div
                style="cursor: pointer"
                class="d-flex justify-center align-center"
                @click="iconClick"
              >
                <v-btn large color="#00AEC9" class="d-flex justify-center" icon>
                  <v-icon color="">mdi-account-circle-outline</v-icon>
                </v-btn>
                <span
                  class="d-flex"
                  style="text-transform: none; font-size: 17px"
                >
                  Profil
                </span>
              </div>
              <v-divider class="my-3"></v-divider>
              <div
                @click.prevent="logout()"
                style="cursor: pointer"
                class="logout d-flex justify-center align-center"
              >
                <v-btn large icon color="#00AEC9">
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
                <span class="" style="text-transform: none; font-size: 17px">
                  Çıkış</span
                >
              </div>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
    >
      <v-list
        dense
        style="background-color: rgba(0, 99, 160, 1) rgba(0, 174, 201, 1)"
        dark
      >
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu"
              >mdi-chevron-left</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <h3 class="font-weight-thin" style="font-size: 18px">
                Tracking System
              </h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="toggleMini = !toggleMini">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate">
          {{ TokenName }}
        </v-list-item-content>
        <v-btn icon small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div></div>
    </v-navigation-drawer>
    <div>
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import jwt_decode from "jwt-decode";
import { LOGOUT } from "@/store/actions.type";

export default {
  name: "apps",
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    buttonText() {
      return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    },
  },
  data: () => ({
    TokenName: "Yusuf TASK",
    sidebarMenu: true,
    toggleMini: false,
    themeState: true,
    links: [
      {
        title: "Genel Görünüm",
        href: "/",
        icon: "mdi-home-outline",
      },

      {
        title: "Ayarlar",
        href: "/settings",
        icon: "mdi-cog-outline",
      },
      {
        title: "Yardım",
        icon: "mdi-help-circle-outline",
        href: "/help",
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    toggleTheme() {
      this.themeState = !this.themeState;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

    iconClick() {
      this.$router.push("/profile");
    },
  },
  created() {
    const token = localStorage.getItem("id_token"); // localden kullanıcımızın tokenımızı cekiyoruz
    this.decoded = jwt_decode(token); // ayarlanıyor..
    this.TokenName = jwt_decode(token).given_name; // localin içindeki tokeni açtığımızda içinden çıkan kullanıcı ismini datanın içerisindekki TokenName veriyoruz.
    console.log(this.TokenName); // kullanıcı ismi yazdırmak için consolde deniyoruz ne dönüyor diye.
  },
};
</script>
<style>
.v-list-item__icon {
  margin-right: 22px !important;
}
.v-list-item__action {
  margin-right: 22px !important;
}
.app-bar {
  background: linear-gradient(
    90deg,
    rgba(0, 99, 160, 1) 0%,
    rgba(0, 174, 201, 1) 90%
  );
}
</style>



