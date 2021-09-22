const getTemplateWarehouses = (cityId, data = []) => {
    const items = data.map(item => {
        if (item.cityId == cityId) {
            return `
        <div class="stores__warehouse-item stores__warehouse-item_clickable">
                        <h3 class="stores__warehouse-name">${item.name}</h3>

                        <p class="stores__warehouse-address">${item.address}</p>

                        <p class="stores__warehouse-pickup">${item.pickup}</p>

                        <div class="stores__warehouse-phone-section">
                            <img class="stores__warehouse-phone-icon" src="img/phone.svg">
                            <p class="stores__warehouse-phone-number">${item.number}</p>
                        </div>

                        <div class="stores__warehouse-schedule-section">
                            <img class="stores__warehouse-schedule-icon" src="img/i-clock.svg">
                            <p class="stores__warehouse-schedule">${item.schedule}</p>

                        </div>

                    </div>
        `
        }
    })

    return `${items.join('')}`
}

export class Warehouse {
    constructor(cityId, selector, data) {
        this.warehouse = document.querySelector(selector)
        this.data = data

        this.warehouse.innerHTML = getTemplateWarehouses(cityId, this.data)
    }

    update(cityId) {

        this.warehouse.innerHTML = getTemplateWarehouses(cityId, this.data)

    }

    search(key, cityId) {

        let searchWarehouses = []
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].name.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
                this.data[i].address.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                searchWarehouses.push(this.data[i])
            }

        }

        this.warehouse.innerHTML = getTemplateWarehouses(cityId, searchWarehouses)

    }
}