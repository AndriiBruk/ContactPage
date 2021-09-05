const getTemplateWarehauses = (id, data = []) => {
    const items = data.map(item => {
        if (item.cityId == id) {
            return `
        <div class="stores__warehaus-item stores__warehaus-item_clickable">
                        <h3 class="stores__warehaus-name">${item.name}</h3>

                        <p class="stores__warehaus-address">${item.address}</p>

                        <p class="stores__warehaus-pickup">${item.pickup}</p>

                        <div class="stores__warehaus-phone-section">
                            <img class="stores__warehaus-phone-icon" src="img/phone.svg">
                            <p class="stores__warehaus-phone-number">${item.number}</p>
                        </div>

                        <div class="stores__warehaus-schedule-section">
                            <img class="stores__warehaus-schedule-icon" src="img/i-clock.svg">
                            <p class="stores__warehaus-schedule">${item.schedule}</p>

                        </div>

                    </div>
        `
        }
    })

    return `${items.join('')}`
}

export class Warehaus {
    constructor(id, selector, options) {
        this.warehaus = document.querySelector(selector)
        this.options = options.data

        this.warehaus.innerHTML = getTemplateWarehauses(id, this.options)
    }

    update(id) {

        this.warehaus.innerHTML = getTemplateWarehauses(id, this.options)

    }

    search(key, id) {

        let searchWarehauses = []
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].name.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
                this.options[i].address.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                searchWarehauses.push(this.options[i])
            }

        }

        this.warehaus.innerHTML = getTemplateWarehauses(id, searchWarehauses)

    }
}