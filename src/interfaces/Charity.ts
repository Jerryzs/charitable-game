import Location from "./Location"

interface Charity {
  name: string
  abbr: string
  desc: string
  icon: string
  effect: {
    [location: Location['name']]: number
  }
}

export default Charity
