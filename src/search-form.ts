import { renderBlock } from './lib.js';
import { SearchFormData, Place } from './types.js'

export function renderSearchFormBlock(checkin: string, checkout: string) {

  const today = new Date()
  const checkOutMax: Date = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const getResult = () => {
    const random = Number(Math.random().toFixed(2)) * 100;
    console.log(random)
    return (random > 50) ? [] : new Error;
  }

  const dispatch = async (e: Event, data: SearchFormData, callbackfn?: () => void) => {
    e.preventDefault();
    let timerId = null;
    const promise = new Promise((resolve, reject) => {
      const res = callbackfn()
      timerId = setTimeout(() => resolve(res), 1000)
    });
    try {
      const result = await promise;
      console.log(result)
    } catch (e) {
      console.log(e)
    }
    clearTimeout(timerId)
    console.log(data);
  }

  const search = () => {
    const form: HTMLFormElement = document.forms['form'];
    const data: SearchFormData = {
      checkin: '', checkout: '', maxprice: '', city: ''
    };
    for (const key in data) {
      data[key] = form.elements[key]?.value
    }
    form.addEventListener('submit', (e) => dispatch(e, data, getResult))
  }

  const getFormattedDate = (date: string | Date, monthOffset?: number | null, dayOffset?: number | null) => {
    const d = date instanceof Date ? date : new Date(date);
    d.setMonth(d.getMonth() + monthOffset);
    d.setDate(d.getDate() + dayOffset);
    const formattedDateString = `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`;
    return formattedDateString;
  }

  renderBlock(
    'search-form-block',
    `
    <form id="form" name="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" 
            value="${checkin ? getFormattedDate(checkin, 0, 0) : getFormattedDate(new Date(), 0, 1)}"
            min="${getFormattedDate(new Date(), 0, 0)}" max="${getFormattedDate(checkOutMax, 0, 0)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value="${checkout ? getFormattedDate(checkout, 0, 0) : getFormattedDate(new Date(), 0, 3)}"
            min="${getFormattedDate(new Date(), 0, 1)}" max="${getFormattedDate(checkOutMax, 0, 0)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" placeholder="Введите сумму" name="maxprice" class="max-price" value="0"/>
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  search()
}
