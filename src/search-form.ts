import { renderBlock } from './lib.js';

export function renderSearchFormBlock(
  checkin: string,
  checkout: string,
  priceLimit?: number
) {

  const today = new Date()
  const checkOutMax: Date = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const getFormattedDate = (
    date: string | Date,
    monthOffset?: number | null,
    dayOffset?: number | null
  ) => {
    const d = date instanceof Date ? date : new Date(date);

    d.setMonth(d.getMonth() + monthOffset);
    d.setDate(d.getDate() + dayOffset);

    return `${d.getFullYear()}-${('00' + (d.getMonth() + 1))
      .slice(-2)}-${('00' + d.getDate()).slice(-2)}`;
  }

  renderBlock(
    'search-form-block',
    `
    <form id="form" name="form" class="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" 
              value="homy" checked /> Homy
            </label>
            <label><input type="checkbox" name="provider" 
              value="flat-rent" checked /> FlatRent
            </label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" 
            value="${checkin ? getFormattedDate(checkin, 0, 0) : getFormattedDate(new Date(), 0, 1)}"
            min="${getFormattedDate(new Date(), 0, 0)}" 
            max="${getFormattedDate(checkOutMax, 0, 0)}" 
            name="checkInDate" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value="${checkout ? getFormattedDate(checkout, 0, 0) : getFormattedDate(new Date(), 0, 3)}"
            min="${getFormattedDate(new Date(), 0, 1)}" 
            max="${getFormattedDate(checkOutMax, 0, 0)}" 
            name="checkOutDate" />
          </div>
          <div>
            <label for="price-limit">Макс. цена суток</label>
            <input id="price-limit" type="number" 
            placeholder="Введите сумму" class="maxprice" 
            value="${priceLimit || ''}" name="priceLimit"/>
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}