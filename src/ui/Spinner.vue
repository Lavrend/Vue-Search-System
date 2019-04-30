<template lang="pug">
  .ui-spinner(:class="getSpinnerClass")
    template(v-if="isStretch")
      .ui-spinner__rect(
        v-for="n in 5"
        :key="n"
        :class="getClasses(n)"
      )
</template>

<script>
export default {
  name: 'ui-spinner',

  props: {
    isStretch: Boolean,
  },

  computed: {
    getSpinnerClass() {
      return {
        'ui-spinner--circle': !this.isStretch,
      };
    },
  },

  methods: {
    getClasses(index) {
      return `ui-spinner__rect--${index}`;
    },
  },
};
</script>

<style lang="scss">
.ui-spinner {
  opacity: 0.5;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;

  &--circle:after {
    content: '';
    width: 100%;
    height: 100%;
    animation: spinner .7s linear infinite;
    border: 5px solid rgba($white, .5);
    border-top-color: $dark;
    border-radius: 100%;
  }

  &__rect {
    width: 10%;
    height: 100%;
    background: $grey-7;
    border-radius: 35%;

    animation: spinner-stretch 1.2s ease-in infinite;
  }

  @for $i from 1 through 5 {
    &__rect--#{$i} {
      animation-delay: -1.2s + (0.1 * $i);
    }
  }
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinner-stretch {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1.0);
  }
}
</style>
