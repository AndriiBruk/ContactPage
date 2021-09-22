import '../scss/main.scss';
import '../scss/select.scss';
import '../scss/warehouses.scss';
import '../scss/map.scss'
import { citiesData } from './citiesData.js';
import { warehousesData } from './warehousesData.js';
import { mapInit } from './map.js';
import {MainCityWarehouseSelect} from './MainCityWarehouseSelect.js'

let mainCityWaregouseSelect = new MainCityWarehouseSelect (warehousesData, citiesData)
mainCityWaregouseSelect.selectInit()
mainCityWaregouseSelect.searchInit()
mainCityWaregouseSelect.addWarehouseClickEvent()
mainCityWaregouseSelect.firstWarehouse = mainCityWaregouseSelect.warehouseItems[0].querySelector('.stores__warehouse-name').innerText + ", " + mainCityWaregouseSelect.warehouseItems[0].querySelector('.stores__warehouse-address').innerText
const firstWarehouse = mainCityWaregouseSelect.firstWarehouse
mapInit(firstWarehouse)