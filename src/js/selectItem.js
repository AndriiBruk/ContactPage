const getTemplate = (data = []) => {
    
    const items = data.map(item => {
        return `
        <div class="select__item" data-id="${item.id}">
          <span class="select__title" data-id="${item.id}">${item.city}</span>
          <p class="select__description" data-id="${item.id}">${item.region}</p>
        </div>
        `
    })

    return `
        <div class="select__header">
            <div class="select__current">

                <span class="select__title">${data[0].city}</span>
                <p class="select__description">${data[0].region}</p>

            </div>
            <img class="select__icon" src="img/vector.svg">

        </div>

        <div class="select__body">
            ${items.join('')}

        </div>
    `
}

export class SelectItem {
    constructor(selector, data) {
        this.element = document.querySelector(selector)
        this.data = data

        this.element.innerHTML = getTemplate(this.data)
    }
  
}