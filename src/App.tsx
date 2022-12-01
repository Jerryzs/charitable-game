import React, { useEffect } from "react";
import Quest from "./Components/Quest";
import Item from "./interfaces/Item";
import Information from "./Components/Information";
import Action from "./Components/Action";
import QuestType from "./interfaces/QuestType";
import QuestGenerator from "./libraries/QuestGenerator";
import exp from "./libraries/Exp"
import rp from "./libraries/RewardsProgram";
import Player from "./interfaces/Player";
import Location from "./interfaces/Location";
import Charity from "./interfaces/Charity";
import Food from "./interfaces/Food";
import Transportation from "./interfaces/Transportation";
import "./App.css";

const LOCATIONS: Location[] = [
  {
    name: 'the park',
    image: '/assets/park.jpg'
  },
  {
    name: 'the mall',
    image: '/assets/mall.jpg'
  },
  {
    name: 'the streets',
    image: '/assets/streets.jpg'
  },
  {
    name: 'the school',
    image: '/assets/school.jpg'
  },
]

const CHARITIES: Charity[] = [
  {
    name: 'the Clean Air Task Force',
    abbr: 'the CATF',
    desc: 'Reduce and regulate air pollution',
    icon: '/assets/catf.jpg',
    effect: {
      'the park': [1.0, 1.4],
      'the school': [1.1, 1.2],
      'the streets': [0.9, 1.1],
      'the mall': [0.6, 0.8]
    }
  },
  {
    name: 'the Nature Conservacy of Canada',
    abbr: 'the NCC',
    desc: 'Conserve the nature',
    icon: '/assets/ncc.png',
    effect: {
      'the school': [1.0, 1.4],
      'the streets': [0.5, 1.4],
      'the park': [1.2, 1.3],
      'the mall': [0.7, 0.9],
    }
  },
  {
    name: 'One Tree Planted',
    abbr: 'One Tree Planted',
    desc: '$1 donated = one tree planted',
    icon: '/assets/otp.png',
    effect: {
      'the park': [0.8, 1.5],
      'the school': [1.0, 1.3],
      'the streets': [1.0, 1.2],
      'the mall': [0.9, 1.0]
    }
  },
  {
    name: 'Greenpeace',
    abbr: 'Greenpeace',
    desc: 'Our world cannot be green without peace',
    icon: '/assets/gp.jpg',
    effect: {
      'the streets': [0.9, 1.5],
      'the mall': [1.0, 1.1],
      'the school': [0.9, 1.1],
      'the park': [0.9, 1.1]
    }
  },
  {
    name: 'the Electronic Recycling Association',
    abbr: 'the ERA',
    desc: 'Your old electronics, someone\'s new upgrade',
    icon: '/assets/era.png',
    effect: {
      'the mall': [0.5, 1.8],
      'the school': [0.9, 1.4],
      'the streets': [0.2, 0.6],
      'the park': [0.1, 0.4]
    }
  },
  {
    name: 'Goodwill Industries',
    abbr: 'Goodwill',
    desc: 'Collecting and selling used goods',
    icon: '/assets/gw.jpg',
    effect: {
      'the school': [0.8, 1.6],
      'the mall': [1.2, 1.4],
      'the park': [0.8, 0.9],
      'the streets': [0.5, 0.7]
    }
  }
]

const FOODS: Food[] = [
  {
    name: "Burger",
    time: 60,
    energy: 50,
    lore: "a Burger",
    image: "/assets/burger.jpg",
  },
  {
    name: "Salad",
    time: 30,
    energy: 20,
    lore: "a Salad",
    image: "/assets/salad.jpg",
  },
  {
    name: "Juice",
    time: 10,
    energy: 5,
    lore: "Some Orange Juice",
    image: "/assets/orange_juice.jpg",
  }
]

const TRANSPORTATIONS: Transportation[] = [
  {
    type: 'bike',
    icon: '/assets/bike.jpg',
    time: [20, 50],
    effect: 1.2,
    energy: 10,
  },
  {
    type: 'bus',
    icon: '/assets/bus.jpg',
    time: [10, 30],
    effect: 1,
    energy: 5
  },
  {
    type: 'car',
    icon: '/assets/car.jpg',
    time: [5, 15],
    effect: 0.7,
    energy: 1
  }
]

const ITEMS: Item[] = [
  {
    id: 1,
    name: 'Electric Car',
    factor: 'reward',
    effect: 1.4,
    lore: 'Travel like a car, green like a bus',
    image: '/assets/items/car.svg'
  },
  {
    id: 2,
    name: 'Credit Card Machine',
    factor: 'reward',
    effect: 1.2,
    lore: 'Blend in with the youths',
    image: '/assets/items/ccm.jpg'
  },
  {
    id: 3,
    name: 'Credit Card Machine (Solar)',
    factor: 'reward',
    effect: 1.2,
    lore: 'Even more affable among the youths',
    image: '/assets/items/ccms.png'
  },
  {
    id: 4,
    name: 'Speech 100',
    factor: 'reward',
    effect: 2,
    lore: 'Very persuasive',
    image: '/assets/items/speech.png'
  },
  {
    id: 5,
    name: 'Portable Station',
    factor: 'energy',
    effect: 0.5,
    lore: 'Lightweight and easy to setup!',
    image: '/assets/items/tent.svg'
  }
]

const SAMPLE_PLAYER: Player = {
  id: "player1",
  name: "Player 1",
  exp: 50,
  energy: 40,
  items: [],
}

QuestGenerator.setLocations(LOCATIONS)
QuestGenerator.setCharities(CHARITIES)

function App() {
  const [player, setPlayer] = React.useState<Player>(SAMPLE_PLAYER)
  const [xp, setXp] = React.useState<number>(0)
  const [energy, setEnergy] = React.useState<number>(100)
  const [time, setTime] = React.useState<number>(480) // 480-960
  const [quests, setQuests] = React.useState<QuestType[]>(
    QuestGenerator.getMany(exp(xp).toLvl(), 3)
  )
  const [currentLocation, setCurrentLocation] = React.useState<number>(0)
  const [currentCharity, setCurrentCharity] = React.useState<number>(0)
  const [lastTransportation, setLastTransportation] = React.useState<number>(1)

  const [donations, setDonations] = React.useState<number>(0)
  const [allDonations, setAllDonations] = React.useState<Record<string, number>>({})

  React.useEffect(() => {
    setDonations(0)
  }, [currentLocation, currentCharity])

  React.useEffect(() => {
    setPlayer({ ...player, exp: xp })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp])

  React.useEffect(() => {
    if (quests.length === 0) setQuests(QuestGenerator.getMany(exp(xp).toLvl(), 3))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quests])

  const handleLocationChange = (lIndex: number, tIndex: number) => {
    const transport = TRANSPORTATIONS[tIndex]

    const energyLeft = energy - transport.energy
    const newTime = time + Math.floor(Math.random() * (transport.time[1] - transport.time[0]) + transport.time[0])

    if (energyLeft < 0 || newTime > 960) return

    setEnergy(energyLeft)
    setTime(newTime)

    setCurrentLocation(lIndex)
    setLastTransportation(tIndex)
  }

  const handleGameProgression = (progress: number) => {
    let energyCost = Math.random() * 5 + 15

    player.items.forEach((item) => {
      if (item.factor === 'energy') energyCost *= item.effect
    })

    const energyLeft = energy - energyCost,
      newTime = (time + progress)
    if (energyLeft < 0 || newTime > 960) return false
    setEnergy(energyLeft)
    setTime(newTime)

    const loc = LOCATIONS[currentLocation],
      char = CHARITIES[currentCharity],
      transport = TRANSPORTATIONS[lastTransportation]

    const currentDonation = rp.calc(progress, loc, char, transport, exp(xp).toLvl(), player.items)
    const totalDonation = donations + currentDonation

    const index = quests.findIndex((quest) =>
      quest.target.donation <= totalDonation
      && (quest.target.cause === undefined || quest.target.cause === char.abbr)
      && (quest.target.location === undefined || quest.target.location === loc.name))

    if (index !== -1) {
      const q = quests[index]
      const lvl = exp(xp).toLvl()

      quests.splice(index, 1)
      setQuests([...quests, QuestGenerator.get(lvl)])

      const newXp = xp + q.reward
      setXp(newXp)

      const newLvl = exp(newXp).toLvl()
      if (newLvl !== lvl && newLvl <= 100 && newLvl % 20 === 0) {
        player.items.push(ITEMS[Math.floor(Math.random() * ITEMS.length)])
        setPlayer({ ...player })
      }

      setDonations(totalDonation - q.target.donation)
    } else {
      setDonations(totalDonation)
    }


    if (!allDonations[loc.name]) allDonations[loc.name] = 0
    allDonations[loc.name] += currentDonation
    if (!allDonations[char.abbr]) allDonations[char.abbr] = 0
    allDonations[char.abbr] += currentDonation

    setAllDonations({ ...allDonations })
  }

  const handleFoodConsumption = (index: number) => {
    const food = FOODS[index]

    const newTime = time + food.time
    if (newTime > 960) return

    let newEnergy = energy + food.energy
    if (newEnergy > 100) newEnergy = 100

    setTime(newTime)
    setEnergy(newEnergy)
  }

  const handleSleep = () => {
    setTime(480)
    setDonations(0)
    setEnergy(100)
    setQuests([])
  }

  return (
    <div className="app">
      {!player ? (
        undefined // TODO login component goes here
      ) : (
        <>
          <div className="left-panel">
            <div>
              <Quest quests={quests} />
            </div>
            <div>
              <Information player={player} xp={xp} energy={energy} items={player.items} />
            </div>
          </div>
          <div className="actionComponent">
            <Action
              currentLocation={currentLocation}
              time={time}
              currentCharity={currentCharity}
              locations={LOCATIONS}
              transportations={TRANSPORTATIONS}
              charities={CHARITIES}
              foodOptions={FOODS}
              donations={allDonations}
              onLocationChange={handleLocationChange}
              onCharityChange={(index) => setCurrentCharity(index)}
              onFoodConsumption={handleFoodConsumption}
              onSleepClick={handleSleep}
              onGameProgress={handleGameProgression}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
