<template>
  <div id="footer">

    <div id="footer-main">

      <div id="categories-wrapper">
        <h3>STADIO</h3>

        <ul class="footer-category">
          <li><font-awesome-icon :icon="['fab', 'instagram']"/></li>
          <li><font-awesome-icon :icon="['fab', 'facebook']"/></li>
        </ul>

        <div class="footer-category"><span>Politica de privacidad</span> - <span>Terminos de uso</span></div>

        <div class="footer-category">© STADIO 2021 Todos los derechos reservados.</div>

      </div>

      <div id="autopro">
        <div class="the-end">
          Hecho con
          <font-awesome-icon class="space" :icon="['fas', 'heart']" style="color: red;"/>
          por
          <a class="space" href="http://autopro.com.ve" style="color: #fafafa">Autopro</a>
        </div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>

@import "@/assets/vars.scss";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

#footer {
  width: auto;
  background-color: #202020;
  color: #dfdfdf;
  font-size: .8em;
  margin: 3em 0 0 0;

  @media only screen and (max-width: 700px) {
    margin: 3em -1.2em 0 -1.5em;
  }
}

#footer-main {
  flex: 0 1 $footerWidth;
  max-width: $footerWidth;
  margin: 0 auto 0 auto;
  padding: 50px 0 10px 0;
}

#categories-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em 0 1em;

  h3 {
    color: rgb(172, 172, 172);
    font-weight: 300;
    font-size: 4em;
    font-family: 'Poppins', sans-serif;
  }
}

.footer-category {
  width: 100%;
  margin: 1em;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    margin: 10px;
    font-size: 30px;
    display: flex;
    align-items: center;
  }
}

.social-icon {
  margin: 0 .5em 0 0;
}

#autopro {
  flex: 1 0;
  max-width: $footerWidth;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.space {
  margin: 0 .5em 0 .5em;
}

#autopro {
  border-top: 1px solid #535353;
  padding-top: 10px;
  justify-self: flex-end;
}
.the-end {
  justify-content: flex-end;
}

</style>
