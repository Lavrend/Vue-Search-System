<template lang="pug">
  li.results-item
    .results-item__left
      h3.results-item__name.notranslate
        a.results-item__name-inner(@click.prevent="openModal")
          | {{ item.full_name }}
      p.results-item__description
        | {{ item.description }}
      p.results-item__updated-at.notranslate
        | {{ getItemDateLabel(item.pushed_at) }}

    .results-item__right.notranslate
      .results-item__lang
        span.results-item__lang-color(v-if="item.language" :style="getLangColorStyles(item.language)")
        | {{ item.language }}
      .results-item__stars
        .results-item__stars-inner
          svgicon.results-item__stars-icon(v-if="item.stargazers_count" icon="star" custom)
          span.results-item__stars-label {{ getItemStarsLabel(item.stargazers_count) }}
</template>

<script>
import langsColors from '@/config/langsColors';
import _numeral from 'numeral';
import _dateFormat from '@/utils/date-format';

export default {
  name: 'results-item',

  props: {
    item: {
      type: Object,
      default: () => [],
    },
  },

  methods: {
    getItemDateLabel(value) {
      return `Updated ${_dateFormat.getDateLabel(value)}`;
    },

    getItemStarsLabel(count) {
      return count > 0 ? _numeral(count).format('0[.]0a') : '';
    },

    getLangColorStyles(lang) {
      return {
        backgroundColor: langsColors[lang] || '#ccc',
      };
    },

    openModal() {
      this.$store.dispatch('app/setModalActive', {
        active: true,
        item: this.item,
      });
    },
  },
};
</script>

<style lang="scss">
.results-item {
  padding: $indent-lg 0;
  border-bottom: 1px solid $grey-4;
  text-align: left;
  user-select: text;

  &__left {
    padding-right: $indent-lg;
    flex: 2;
  }

  &__name {
    font-weight: bold;
    font-size: 20px;
    color: $blue-5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name-inner {
    text-decoration: none;
    cursor: pointer;

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
    flex: 1 1 auto;
  }

  &__lang-color {
    position: relative;
    width: 12px;
    height: 12px;
    top: 1px;
    right: $indent-md - 2;
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

  @media screen and (max-width: $mobileScreenWidth) {
    padding: $indent-md 0;

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
