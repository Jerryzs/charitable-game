import Charity from '../interfaces/Charity'
import Item from '../interfaces/Item'
import Location from '../interfaces/Location'
import Transportation from '../interfaces/Transportation'

const rp = {
  calc: (time: number, location: Location, charity: Charity, travel: Transportation, lvl: number, items: Item[]) => {
    const dpm = 2

    const getLocationBenefits = () =>
      charity.effect[location.name]
        ? Math.random()
          * (Math.abs(charity.effect[location.name][1] - charity.effect[location.name][0]))
          + (charity.effect[location.name][0])
        : 1

    let donation = 0

    for (let i = 0; i < time; i++) {
      donation += dpm * getLocationBenefits()
    }

    donation *= travel.effect
    donation *= Math.pow(lvl + 1, 2) / ((lvl + 1) * 5)

    items.forEach((item) => { if (item.factor === 'reward') donation *= item.effect })

    return donation
  }
}

export default rp
