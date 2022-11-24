<template>
  <div class="page">
    <div class="valkyries-title">
      <span>女武神 </span><span>/</span><span>VALKYRIES</span>
    </div>
    <div class="valkyries-wrap">
      <div class="valkyries-list">
        <div class="valkyries-item">
          <div v-for="(val, aindex) in valkyriesList" :key="aindex">
            <div class="valkyries-item-title d-flex">
              <div>{{val.name}}</div>
              <div class="role-line"></div>
              
            </div>
            <div class="roles d-flex" v-for="(armor, bindex) in val.armorsList" :key="armor._id">
              <router-link custom v-slot="{ navigate }" :to="`/armor/${armor._id}`">
                <a @click="navigate" @keypress.enter="navigate" role="link">
                  <div class="base-role-btn">
                    <div class="imgbox">
                      <img :src="armor.avater" alt="">
                    </div>
                  </div>
                </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valkyriesList: [],
    }
  },
  methods: {
    async getValkyriesList() {
      const res = await this.$http.get('valkyries/list')
      this.valkyriesList = res.data
      console.log(this.valkyriesList);
    }
  },
  created() {
    this.getValkyriesList()
  }
}
</script>

<style lang="scss" scoped>
@import '../css/Valkyries.scss'
</style>