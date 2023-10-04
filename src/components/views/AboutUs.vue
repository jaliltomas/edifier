<template>
    <div class="about-box">
        <div class="about-row">
            <img
                src="../../assets/img/edifier-logo-black.svg"
                class="edifier-logo"
            />
            <div class="logo-text">EDIFIER</div>
        </div>
        <div class="about-content">
            Somos Edifier, una  marca global fundada en Pekín, China en 1996 por un grupo de personas 
            apasionadas por el audio con una misión: Ofrecer las experiencias fieles de sonido. <br/>
            Producimos parlantes y auriculares de alta calidad y diseños innovadores. Con el paso del 
            tiempo fuimos ampliando los límites de nuestra tecnología de audio para mejorar la experiencias 
            de nuestros usuarios. En la actualidad, nos convertimos en líderes mundiales con presencia en 
            más de 70 países. Ofrecemos una amplia gama de productos, incluidos parlantes bluetooth, de 
            estantería, barras de sonido y mucho más, todos ellos diseñados para proporcionar una 
            experiencia de audio envolvente y atractiva. <br/> Lo que nos distingue es nuestro compromiso con 
            la calidad combinado con nuestro espíritu innovador: Sabemos que la música tiene el poder de 
            conectar a las personas y el equipo de audio es crucial para esa tarea. Compartimos la pasión 
            por el sonido. Te invitamos a ser parte.
        </div>
        <div @click="$router.push({ name: 'products' })" class="about-banner">Descubre la experiencia Edifier</div>
    </div>
</template>

<script>
export default {
  data() {
    return{};
  },
  created() {},
  methods: {},
};
</script>

<style>
  .about-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px 0 40px 0;
  }
  .about-row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .edifier-logo{
    height: 80px;
    object-fit: cover;
  }
  .logo-text{
    color: black;
    font-size: 34px;
    margin-left: 14px;
    margin-top: 28px;
    font-weight: 600;
  }
  .about-banner{
    display: flex;
    padding: 12px 24px;
    background-color: rgb(0, 160, 233);
    color: white;
    font-size: 26px;
    font-weight: 400;
    cursor: pointer;
  }
  .about-content{
    display: flex;
    flex-direction: column;
    width: 70%;
    font-size: 20px;
    text-align: center;
    margin: 40px 0;
    color: black;
    max-width: 1320px;
  }
  @media only screen and (max-width: 1200px) {
    .about-content{
      width: 90%;
      font-size: 18px;
    }
    .about-banner{
      padding: 10px 18px;
      font-size: 22px;
    }
    .edifier-logo{
      height: 70px;
    }
    .logo-text{
      font-size: 28px;
      margin-top: 26px;
    }
  }
  @media only screen and (max-width: 600px) {
    .about-box {
      margin: 20px 0 30px 0;
    }
    .about-content{
      font-size: 16px;
      margin: 30px 0;
    }
    .about-banner{
      font-size: 18px;
    }
    .edifier-logo{
      height: 60px;
    }
    .logo-text{
      font-size: 24px;
      margin-top: 24px;
      margin-left: 10px;
    }
  }
</style>