import Charity from '../interfaces/Charity'
import Location from '../interfaces/Location'
import QuestType from '../interfaces/QuestType'

const MIN_DIFFICULTY = 0.5
const MAX_DIFFICULTY = 2.5

const LEVEL_DIFFICULTY_EXPONENT = 1.5
const LEVEL_DIFFICULTY_MODIFIER = 0.1

const STANDARD_REWARD = 200
const STANDARD_DONATION_GOAL = 100

let locations: Location[] = []
let charities: Charity[] = []

let questID = 0

const setLocations = (arr: Location[]) => locations = [...arr]
const setCharities =  (arr: Charity[]) => charities = [...arr]

const get = (lvl: number) => {
  const difficulty =
    Math.random() * (MAX_DIFFICULTY - MIN_DIFFICULTY) + MIN_DIFFICULTY +
    Math.pow(lvl, LEVEL_DIFFICULTY_EXPONENT) * LEVEL_DIFFICULTY_MODIFIER
  const reward = STANDARD_REWARD * difficulty - (Math.random() * difficulty * 15)
  const donation = STANDARD_DONATION_GOAL * difficulty + (Math.random() * difficulty * 15)

  let requireLocation = locations.length > 0 && Math.random() >= 0.5
  let requireCause = charities.length > 0 && Math.random() >= 0.5

  if (requireLocation && requireCause) {
    if (Math.random() >= 0.5) requireLocation = false
    if (Math.random() >= 0.5) requireCause = false
  }

  const location = locations[Math.floor(Math.random() * locations.length)]
  const charity = charities[Math.floor(Math.random() * charities.length)]

  questID++

  return {
    difficulty: Math.round(difficulty),
    ratio: donation / ((STANDARD_DONATION_GOAL + 15) * difficulty),
    reward: Math.round(reward),
    target: {
      donation: Math.round(donation),
      location: requireLocation ? location.name : undefined,
      cause: requireCause ? charity.abbr : undefined,
    },
    id: questID,
    complete: false,
  } as QuestType
}

const getMany = (lvl: number, n: number) => {
  const arr = [] as QuestType[]
  for (let i = 0; i < n; i++) arr.push(get(lvl))
  return arr
}

const QuestGenerator = {
  setLocations, setCharities, get, getMany
}

export default QuestGenerator
