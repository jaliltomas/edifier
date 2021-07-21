<template>
  <div id="info-icons">

      <div class="info-item">
        <i class="material-icons">local_shipping</i>
        <div>
          <h2>FREE SHIPPING</h2>
          <h4>Lorem Ipsum</h4>
        </div>
      </div>

      <div class="info-item">
        <i class="material-icons">local_offer</i>
        <div>
          <h2>SOMETHING ELSE</h2>
          <h4>Lorem Ipsum</h4>
        </div>
      </div>

      <div class="info-item">
        <i class="material-icons">monetization_on</i>
        <div>
          <h2>LASTLY HERE</h2>
          <h4>Lorem Ipsum</h4>
        </div>
      </div>

    </div>
</template>

<script>

export default {
  name: 'InfoIcons'
}

</script>

<style lang="scss" scoped>

@import '@/assets/vars.scss';

#info-icons {
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  padding: 3em;
  margin: 3em auto 3em auto;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 $maxComponentWidth;
}

.info-item {
  display: flex;

  @media only screen and (max-width: 700px) {
    margin: 2em 0 2em 0;
  }

  h2, h4 {
    margin: 0;
  }

  h4 {
    color: #909090;
  }

  .material-icons {
    font-size: 48px;
    padding: 0 10px 0 0;
  }
}

</style>
