<template>
  <div class="product-tabs">
    <div class="product-tabs__btns-group">
      <button @click="tab = 1" class="product-tabs__btn" :class="{ active: tab === 1 }">
        Информация о товаре
      </button>
      <button @click="tab = 2" class="product-tabs__btn" :class="{ active: tab === 2 }">
        Доставка и возврат
      </button>
    </div>

    <transition-group name="list">
      <div class="product-tabs__tab tab" v-if="tab === 1">
        <div>
          <h2 class="tab__title">Состав</h2>
          <ul class="tab__list">
            <li class="tab__item" v-for="(material, index) in materials" :key="index">
              {{ material.title }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="tab__title">Уход</h2>
          <ul class="tab__list">
            <li class="tab__item">Машинная стирка при макс. 30ºC короткий отжим</li>
            <li class="tab__item">Гладить при макс. 110ºC</li>
            <li class="tab__item">Не использовать машинную сушку</li>
            <li class="tab__item">Отбеливать запрещено</li>
            <li class="tab__item">Не подвергать химчистке</li>
          </ul>
        </div>
      </div>

      <div class="product-tabs__tab tab" v-if="tab === 2">
        <div>
          <h2 class="tab__title">Доставка</h2>
          <ul class="tab__list">
            <li class="tab__item">Курьерская доставка по Москве и Московской области – 290 ₽</li>
            <li class="tab__item">
              Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть
              <router-link to="/">здесь</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="tab__title">Возврат</h2>
          <ul class="tab__list">
            <li class="tab__item">
              Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО. Вы
              можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в
              которой Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов. Для того
              чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону
              <a href="tel:88006003009">8 800 600 90 09</a>
            </li>
          </ul>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { type FilterCheckbox } from '@/models/Filter'
import { ref } from 'vue'

defineProps({
  materials: { type: Array as () => FilterCheckbox[], required: true }
})
const tab = ref(1)
</script>

<style lang="scss" scoped>
.product-tabs {
  &__btns-group {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
  }
  &__btn {
    border-bottom: 1px solid var(--grey-darken-1);
    position: relative;
    padding: 15px 25px;
    white-space: wrap;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--grey-darken-1);
    outline: none;
    transition: background-color 0.2s ease;
  }
  &__btn::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: -10px;
    left: 0;
    border-bottom: 3px solid transparent;
    transition-property: border-color, bottom;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  &__btn:focus {
    background-color: var(--red-lighten-5);
  }
  @media (min-width: 961px) {
    &__btn:hover::before {
      bottom: -1px;
      border-color: var(--pink);
    }
  }
  &__btn.active {
    color: black;
  }
  &__btn.active::before {
    bottom: -1px;
    border-color: var(--pink);
  }
}

.tab {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  &__title {
    font-size: 1.2em;
  }
  &__item a {
    white-space: nowrap;
  }
}

@media (max-width: 960px) {
  .product-tabs {
    &__btn {
      padding: 5px 15px;
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
@/models/filter
