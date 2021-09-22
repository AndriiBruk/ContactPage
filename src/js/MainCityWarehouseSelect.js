import { SelectItem } from './selectItem.js';
import { Warehouse } from './warehouse.js';
import { getRequest, showWarehouseOnMap } from './map.js';

export class MainCityWarehouseSelect {

  constructor(warehousesData, citiesData) {
    this.selectedId = 1
    this.firstWarehouse
    this.warehouses = new Warehouse(1, '.stores__warehouses', warehousesData)
    this.selectItem = new SelectItem('.select', citiesData)
    this.selectCurrent = document.querySelector('.select__current')
    this.selectHeader = document.querySelector('.select__header')
    this.leftSide = document.querySelector('.stores')
    this.warehouseItems = document.querySelectorAll('.stores__warehouse-item')
  }

  selectInit() {
    const selectItem = document.querySelectorAll('.select__item');
    this.selectHeader.addEventListener('click', this.toggleCitiesList.bind(this));

    selectItem.forEach(item => {
      item.addEventListener('click', this.chooseCity.bind(this,item))
    })

  }

  toggleCitiesList() {
    this.selectHeader.parentElement.classList.toggle('select_is-active')

    if (this.selectHeader.parentElement.classList.contains('select_is-active')) {
      this.leftSide.style.backgroundColor = 'rgb(0,0,0,0.6)';
      this.warehouseItems.forEach(item => {
        item.classList.remove('stores__warehouse-item_clickable')
      })

      this.selectHeader.classList.add('select__header_active')
    } else {
      leftSide.style.background = 'transparent'
      this.warehouseItems.forEach(item => {
        item.classList.add('stores__warehouse-item_clickable')
      })

      this.selectHeader.classList.remove('select__header_active')
    }
  }

  chooseCity(item) {

    this.selectCurrent.innerHTML = item.innerHTML
    const select = document.querySelector('.select')
    select.classList.remove('select_is-active')
    this.leftSide.style.backgroundColor = '#fff'
    this.selectedId = event.target.dataset.id

    this.warehouses.id = this.selectedId
    this.warehouses.update(this.selectedId, '.stores__warehouses')

    this.selectHeader.classList.remove('select__header_active')

    this.addWarehouseClickEvent()
  }


  searchInit() {

    const searchBox = document.querySelector('.stores__search');

    searchBox.addEventListener('keyup', (e) => {

      const key = e.target.value;
      this.warehouses.search(key, this.selectedId)
      this.addWarehouseClickEvent()
    });
  }


  addWarehouseClickEvent() {
    this.warehouseItems = document.querySelectorAll('.stores__warehouse-item');
    this.warehouseItems.forEach(item => {
      item.addEventListener('click', () => {
        const query = item.querySelector('.stores__warehouse-name').innerText + ", " + item.querySelector('.stores__warehouse-address').innerText

        const request = getRequest(query)
        showWarehouseOnMap(request)
      })
    })
  }
}