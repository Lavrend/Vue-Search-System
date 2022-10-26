<template lang="pug">
  section.page-home
    .page-home__background
      .page-home__bg-picture

    .page-home__bg-overlay

    .page-home__content
      .page-home__flex-block
        h1.page-home__title.glitch-text.notranslate(v-show="isReady" data-text="SEARCH SYSTEM")
          | SEARCH SYSTEM
        transition(name="transition-scale")
          p.page-home__description(v-show="isReady")
            | Engine of search <span class='primary-text'>GitHub</span> repositories
        transition(name="transition-scale")
          p.page-home__label(v-show="isReady")
            | This application was created <br/>to <span class='primary-text'>demonstrate</span> the capabilities of <span class='primary-text'>Vue.js</span>

        transition(name="transition-scale")
          .page-home__buttons.notranslate(v-show="isReady")
            .page-home__btn.page-home__btn--search(@click="$router.push({ name: 'search' })")
              | Search
            .page-home__btn.page-home__btn--about(@click="$router.push({ name: 'about' })")
              | About
</template>

<script>
export default {
  name: 'page-home',

  data() {
    return {
      isReady: false,
    };
  },

  created() {
    // Delay for transition change visibility after rendered
    this.$nextTick(() => {
      this.isReady = true;
    });
  },
};
</script>

<style lang="scss">
.page-home {
  position: relative;
  height: 100%;
  min-height: $minWidth-app;
  text-align: center;

  &__background {
    @include absolute-full;
  }

  &__bg-picture {
    @include absolute-full;

    background: url('~@/assets/images/code_abstract.jpg'), url($bgHomepageBase64);
    background-size: cover;
    background-position: center;
  }

  &__bg-overlay {
    @include absolute-full;

    background: radial-gradient(ellipse at bottom, $blue-8 0%, $blue-9 100%);
    opacity: 0.8;
  }

  &__content {
    @include absolute-full;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__flex-block {
    margin-top: $indent-lg;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    user-select: none;
  }

  &__title {
    margin: $indent-xl;
    font-size: 50px;
    font-weight: bold;
    line-height: 1.2;
  }

  &__description {
    font-size: 26px;
    line-height: 1.2;
    transition: transform .2s ease .7s !important;
  }

  &__label {
    margin-top: $indent-md;
    font-size: 14px;
    line-height: 1.2;
    transition: transform .2s ease .9s !important;
  }

  &__buttons {
    margin-top: $indent-lg;
    font-size: 18px;
    transition: transform .2s ease 1.1s !important;
  }

  &__btn {
    display: inline-block;
    width: 180px;
    padding: $indent-md;
    margin: 0 $indent-md;
    border: 2px solid $white;
    border-radius: calc($borderRadius / 2);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    transition: background .5s ease;
    cursor: pointer;

    &:hover {
      background: rgba($blue-3, 0.7);
    }
  }

  @media screen and (max-width: 680px) {
    &__buttons {
      font-size: 16px;
    }

    &__btn {
      width: 160px;
    }
  }

  @media screen and (min-width: 681px) and (max-width: 760px) {
    &__title {
      font-size: 46px;
    }

    &__description {
      font-size: 24px;
    }
  }

  @media screen and (min-width: 581px) and (max-width: 680px) {
    &__title {
      font-size: 40px;
    }

    &__description {
      font-size: 22px;
    }
  }

  @media screen and (min-width: 521px) and (max-width: 580px) {
    &__title {
      font-size: 36px;
    }

    &__description {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 431px) and (max-width: 520px) {
    &__title {
      font-size: 30px;
    }

    &__description {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 430px) {
    &__title {
      font-size: 25px;
    }

    &__description {
      font-size: 16px;
    }

    &__label {
      font-size: 13px;
    }

    &__btn {
      width: 120px;
    }
  }
}
</style>
