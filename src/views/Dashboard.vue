<template >
  <div class="page">
    <v-toolbar flat style="background-color: #ecf0fa">
      <h2 class="h2">Genel</h2>
    </v-toolbar>
    <div class="d-flex align-center">
      <div class="d-flex itemCard ml-4">
        <v-card
          class="cards mb-2 mr-2 col-lg-3"
          v-for="item in cardItems"
          :key="item.id"
          elevation="0"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1 d-flex justify-start">
                <p class="p-title">
                  {{ item.title }}
                </p>
              </v-list-item-title>
              <div class="d-flex justify-lg-space-between">
                <div class="d-flex align-center justify-start">
                  <span class="mr-1 white--text">$</span>
                  <span class="white--text p-content">
                    {{ item.content }}
                  </span>
                </div>
                <div class="arrow-symbol d-flex justify-center align-center">
                  <v-icon class="mr-1 white--text" style="font-size: 25px">
                    mdi-arrow-down-bold-circle
                  </v-icon>
                  <span class="white--text"> - 5.1 </span>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <div class="spark">
            <Sparkline />
          </div>
        </v-card>
      </div>
    </div>

    <v-row no-gutters class="mx-4 mt-10">
      <v-col cols="6" md="3">
        <div class="pa-2 mr-2" outlined tile>
          <Pie />
        </div>
      </v-col>
      <v-col cols="6" md="6">
        <div class="pa-2 mr-2 column" outlined tile>
          <Column />
        </div>
      </v-col>
      <v-col cols="6" md="3">
        <div class="pa-2" outlined tile>
          <PieGuage />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Sparkline from "@/components/Chart/Sparkline.vue";
import Column from "@/components/Chart/Column.vue";
import Area from "@/components/Chart/Area.vue";
import Pie from "@/components/Chart/Pie.vue";
import PieGuage from "@/components/Chart/PieGuage.vue";

export default {
  components: {
    Column,
    Area,
    Pie,
    PieGuage,
    Sparkline,
  },
  data() {
    return {
      cardItems: [
        {
          title: "TODAY ORDERS",
          content: "1.250",
          color: "primary",
          icon: "mdi-currency-usd",
        },
        {
          title: "TODAY EARNINGS",
          color: "red",
          content: "3.450",
          icon: "mdi-currency-usd",
        },
        {
          title: "TOTAL EARNINGS",
          color: "green",
          content: "2.500",
          icon: "mdi-currency-usd",
        },
        {
          title: "PRODUCT SOLD",
          color: "black",
          content: "999",
          icon: "mdi-currency-usd",
        },
      ],
      value: [200, 675, 410, 390, 310, 460, 250, 240, 500, 300],
    };
  },
};
</script>

<style>
.spark {
  margin-top: 5px;
}
.area-chart {
  width: 107%;
}
.column {
  width: 100%;
}
.page {
  background-color: #ecf0fa;
  min-width: 100%;
  height: 100vh;
}
.col {
  padding: 0px !important;
}

.cards {
  border-radius: 5px;
  border: none !important;
  background: linear-gradient(
    90deg,
    rgba(0, 99, 160, 0.753) 0%,
    rgba(0, 174, 201, 1) 90%
  );
  padding: 0 0 0 0 !important;
}
.itemCard {
  width: 96%;
  height: 150px;
}
.p-content {
  font-size: 20px;
  color: #fff;
}
.p-title {
  font-size: 15px;
  color: #fff;
}
@media only screen and (max-width: 600px) {
  .itemCard {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .cards {
    margin-bottom: 20px !important;
    min-width: 100%;
  }

  .h2 {
    margin-left: -15px;
  }
  .p-content {
    font-size: 26px;
  }
  .p-title {
    font-weight: 450;
    font-size: 22px;
  }
}
@media only screen and (min-width: 1800px) {
  .cards {
    display: flex;
    justify-content: space-around !important;
  }
}
</style>