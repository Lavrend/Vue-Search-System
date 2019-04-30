<template lang="pug">
  section.page-about
    .page-about__content
      h1 About
</template>

<script>
export default {
  name: 'page-about',
};
</script>

<style lang="scss">
.page-about {
  height: 100%;
  text-align: center;

  &__content {
    width: 100%;
    height: 100%;
    color: $blue-4;
  }
}
</style>
