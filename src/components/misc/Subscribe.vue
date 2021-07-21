<template>
  <div id="subscribe">

    <div>
      <h3>LETS BE FRIENDS</h3>
      <span>Nisi nisi es amet consequat laboris nisi</span>
    </div>

    <div id="email-input">
      <input type="email" name="subscribe-email-input" id="subscribe-email-input" placeholder="Enter your email address">
      <button>Subscribe</button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Subscribe'
}

</script>

<style lang="scss" scoped>

@import '@/assets/vars.scss';

#subscribe {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4em auto 2em auto;
  flex: 1 1;
}

#email-input {
  display: flex;

  @media only screen and (max-width: 700px) {
    margin: 2em 0 2em 0;
  }

  input {
    font-size: 18px;
    padding: 0 50px 0 10px;
    border-radius: 0;
    border: 1px solid #919191;

    &:focus {
      border: 1px solid #303030;
    }
  }

  button {
    font-size: 18px;
  }
}

</style>
