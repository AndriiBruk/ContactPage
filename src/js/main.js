import '../main.scss';
import { SelectItem } from './selectItem.js';
import { Warehaus } from './warehaus.js';
import * as map from './map.js';

let selectedId = 1;
let warehausItems = document.querySelectorAll('.stores__warehaus-item');
let firstWarehause;

let warehauses = new Warehaus(1, '.stores__warehauses', {
  data: [
    {
      cityId: 1,
      name: 'ТРЦ «Ocean Plaza»',
      address: 'Ст. м. «Лыбедская», улица Антоновича 176',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },
    {
      cityId: 1,
      name: 'ТРЦ «Блокбастер»',
      address: 'проспект Степана Бандери, 34В',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00'
    },
    {
      cityId: 1,
      name: 'ТЦ «Smart Plaza Polytech»',
      address: 'проспект Победы, 24',
      pickup: '',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00'
    },

    {
      cityId: 3,
      name: 'Магигранд',
      address: 'улица Келецкая, 78 В',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },

    {
      cityId: 1,
      name: 'ТРЦ «Квадрат»',
      address: 'бульвар Перова, 36  ',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },

    {
      cityId: 2,
      name: 'Форум Львов',
      address: 'улица Под Дубом, 7Б',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },

    {
      cityId: 4,
      name: 'ТРЦ Глобал UA',
      address: 'улица Киевская, 77',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },

    {
      cityId: 4,
      name: 'ТЦ Дастор',
      address: 'улица Домбровского, 3',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },

    {
      cityId: 4,
      name: 'ТЦ «Остров»',
      address: 'бульвар Польский, 7',
      pickup: 'Возможен самовывоз',
      number: '044 284-50-80',
      schedule: 'Пн-Пт 09:00–20:00 Сб-Вс 10:00–18:00'
    },
  ]
})

const selectItem = new SelectItem('.select', {
  data: [
    { id: 1, city: 'Киев', region: 'Киевская область' },
    { id: 4, city: 'Житомир', region: '' },
    { id: 2, city: 'Львов', region: 'Львовская область' },
    { id: 3, city: 'Винница', region: '' },
    { id: 5, city: 'Жмеринка', region: 'Винницкая область' },
    { id: 6, city: 'Измаил', region: 'Одесская область' },
    { id: 7, city: 'Одесса', region: '' },
  ]
})

function select() {

  const selectHeader = document.querySelector('.select__header');
  const selectItem = document.querySelectorAll('.select__item');
  let selectCurrent = document.querySelector('.select__current');

  let leftSide;

  selectHeader.addEventListener('click', selectToggle);

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose)
  })


  function selectToggle() {

    this.parentElement.classList.toggle('select_is-active')
    leftSide = this.closest('.stores');

    if (this.parentElement.classList.contains('select_is-active')) {
      leftSide.style.backgroundColor = 'rgb(0,0,0,0.6)';
      warehausItems.forEach(item => {
        item.classList.remove('stores__warehaus-item_clickable')
      })

      selectHeader.classList.add('select__header_active')
    } else {
      leftSide.style.background = 'transparent'
      warehausItems.forEach(item => {
        item.classList.add('stores__warehaus-item_clickable')
      })

      selectHeader.classList.remove('select__header_active')
    }
  }

  function selectChoose() {

    selectCurrent.innerHTML = this.innerHTML
    const select = this.closest('.select')
    select.classList.remove('select_is-active')
    leftSide.style.backgroundColor = '#fff'
    selectedId = event.target.dataset.id

    warehauses.id = selectedId
    warehauses.update(selectedId, '.stores__warehauses')

    selectHeader.classList.remove('select__header_active')

    warehausClick()


  }
}


function search() {

  const searchBox = document.querySelector('.stores__search');

  searchBox.addEventListener('keyup', (e) => {

    const key = e.target.value;
    warehauses.search(key, selectedId)
    warehausClick()
  });


}


function warehausClick() {
  warehausItems = document.querySelectorAll('.stores__warehaus-item');
  warehausItems.forEach(item => {
    item.addEventListener('click', () => {
      const query = item.querySelector('.stores__warehaus-name').innerText + ", " + item.querySelector('.stores__warehaus-address').innerText
      map.initMap(query)
    })
  })
}

select();
search();
warehausClick()
firstWarehause = warehausItems[0].querySelector('.stores__warehaus-name').innerText + ", " + warehausItems[0].querySelector('.stores__warehaus-address').innerText
map.initMap(firstWarehause)




