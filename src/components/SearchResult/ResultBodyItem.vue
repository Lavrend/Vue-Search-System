<template lang="pug">
  li.result-body-item
    .result-body-item__left
      a.result-body-item__name.notranslate(@click.prevent="modalShow")
        | {{ item.name }}
      p.result-body-item__description
        | {{ item.description }}
      p.result-body-item__updated-at.notranslate
        | {{ getItemDateLabel(item.pushedAt) }}

    .result-body-item__right.notranslate
      .result-body-item__lang
        span.result-body-item__lang-color(v-if="item.language" :style="getLangColorStyles(item.language)")
        | {{ item.language }}
      .result-body-item__stars
        .result-body-item__stars-inner
          svgicon.result-body-item__stars-icon(icon="star" custom)
          span.result-body-item__stars-label {{ getItemStarsLabel(item.starsCount) }}
</template>

<script>
import { mapActions } from 'vuex';
import numeral from 'numeral';

import langsColors from '@/config/langsColors';
import dateFormat from '@/utils/date-format';

export default {
  name: 'result-body-item',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    ...mapActions('app', [
      'openModal',
    ]),

    getItemDateLabel(value) {
      return `Updated ${dateFormat.getDateLabel(value)}`;
    },

    getItemStarsLabel(count) {
      return count > 0 ? numeral(count).format('0[.]0a') : 0;
    },

    getLangColorStyles(lang) {
      return {
        backgroundColor: langsColors[lang] || '#ccc',
      };
    },

    modalShow() {
      this.openModal({
        name: 'ModalInfo',
        data: this.item,
      });
    },
  },
};
</script>

<style lang="scss">
.result-body-item {
  padding: $indent-lg 0;
  border-bottom: 1px solid $grey-4;
  text-align: left;
  user-select: text;

  display: flex;
  justify-content: flex-start;

  &:first-child {
    border-top: 1px solid $grey-4;
  }

  &__left {
    padding-right: $indent-lg;
    flex: 2;
  }

  &__name {
    font-weight: bold;
    font-size: 20px;
    line-height: 1.2;
    color: $blue-5;
    text-decoration: none;
    word-break: break-word;
    cursor: pointer;
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    display: inline-block;
    padding-right: $indent-lg + 4;
    padding-bottom: $indent-md - 2;
    font-size: 14px;
    line-height: 1.5;
    color: $grey-8;
    word-break: break-word;
  }

  &__updated-at {
    padding-top: $indent-md - 2;
    font-size: 12px;
    color: $grey-7;
  }

  &__right {
    padding-right: $indent-lg - 4;
    font-size: 14px;
    line-height: 1.5;
    display: flex;
    flex: 1;
  }

  &__lang {
    padding-right: $indent-lg - 4;
    color: $grey-8;
    word-break: break-word;
    flex: 1 1 auto;
  }

  &__lang-color {
    width: 12px;
    height: 12px;
    margin-bottom: -1px;
    margin-right: $indent-md - 2;
    border-radius: 50%;
    display: inline-block;
  }

  &__stars {
    color: $grey-8;
    fill: $grey-8;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex: 1 1 auto;
  }

  &__stars-inner {
    display: flex;
    align-items: center;
  }

  &__stars-icon {
    width: 1em;
    height: 1em;
    margin-right: $indent-xs;
    margin-top: -$indent-xs;
  }

  @media screen and (max-width: $screenWidth-mobile) {
    padding: $indent-md 0;
    flex-direction: column;

    &__left {
      padding-right: 0;
      padding-bottom: $indent-md - 2;
    }

    &__right {
      padding-right: 0;
    }
  }
}
</style>
