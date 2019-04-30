<template lang="pug">
  section.page-search
    .page-search__content
      h1.page-search__title
        | Search page
</template>

<script>
export default {
  name: 'page-search',
};
</script>

<style lang="scss">
.page-search {
  position: relative;
  height: 100%;
  text-align: center;

  &__content {
    height: 100%;
    padding-bottom: $indent-md;
    overflow-y: auto;
  }

  &__title {
    color: $blue-5;
    margin-bottom: 0;
  }
}
</style>
