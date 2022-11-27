import React from "react";
import Quest from "./Components/Quest";
import Item from "./interfaces/Item";
import Information from "./Components/Information";
import Action from "./Components/Action";
import QuestType from "./interfaces/QuestType";
import QuestGenerator from "./libraries/QuestGenerator";
import exp from "./libraries/Exp"
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
    effect: {}
  },
  {
    name: 'the Nature Conservacy of Canada',
    abbr: 'the NCC',
    desc: 'Conserve the nature',
    icon: '/assets/ncc.png',
    effect: {}
  },
  {
    name: 'One Tree Planted',
    abbr: 'One Tree Planted',
    desc: '$1 donated = one tree planted',
    icon: '/assets/otp.png',
    effect: {}
  },
  {
    name: 'Greenpeace',
    abbr: 'Greenpeace',
    desc: 'Our world cannot be green without peace',
    icon: '/assets/gp.jpg',
    effect: {}
  },
  {
    name: 'the Electronic Recycling Association',
    abbr: 'the ERA',
    desc: 'Your old electronics, someone\'s new upgrade',
    icon: '/assets/era.png',
    effect: {}
  },
  {
    name: 'Goodwill Industries',
    abbr: 'Goodwill',
    desc: 'Creating jobs while collecting and selling used goods',
    icon: '/assets/gw.jpg',
    effect: {}
  }
]

const Food: Food[] = [
  {
    name: "Burger",
    time: 25,
    energy: 60,
    lore: "a Burger",
    image: "",
  },
  {
    name: "Salad",
    time: 15,
    energy: 30,
    lore: "a Salad",
    image: "",
  },
  {
    name: "Juice",
    time: 5,
    energy: 5,
    lore: "Some Orange Juice",
    image: "",
  }
]

const TRANSPORTATIONS: Transportation[] = [
  {
    type: 'bike',
    icon: '/assets/bike.jpg',
    effect: 0.8,
    energy: 3,
  },
  {
    type: 'bus',
    icon: '/assets/bus.jpg',
    effect: 1.5,
    energy: 1.5
  },
  {
    type: 'car',
    icon: '/assets/car.jpg',
    effect: 3,
    energy: 1
  }
]

const SAMPLE_ITEM: Item = {
  name: "car",
  factor: "time",
  effect: 30,
  lore: "Invented for the ease of transporation. Gets you from place to place in a short amount of time",
  image: "",
}

const SAMPLE_PLAYER: Player = {
  id: "player1",
  name: "user1",
  exp: 50,
  energy: 40,
  items: [SAMPLE_ITEM],
}

QuestGenerator.setLocations(LOCATIONS)
QuestGenerator.setCharities(CHARITIES)

function App() {
  const [player, setPlayer] = React.useState<Player>(SAMPLE_PLAYER)
  const [xp, setXp] = React.useState<number>(1000)
  const [energy, setEnergy] = React.useState<number>(0)
  const [quests, setQuests] = React.useState<QuestType[]>(
    QuestGenerator.getMany(exp(xp).toLvl(), 5)
  )
  const [currentLocation, setCurrentLocation] = React.useState<number>(0)
  const [currentCharity, setCurrentCharity] = React.useState<number>(0)

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
              <Information player={player} />
            </div>
          </div>
          <div className="actionComponent">
            <Action
              currentLocation={currentLocation}
              time={1000}
              currentCharity={currentCharity}
              locations={LOCATIONS}
              transportations={TRANSPORTATIONS}
              charities={CHARITIES}
              foodOptions={[]}
              onLocationChange={(index) => setCurrentLocation(index)}
              onCharityChange={(index) => setCurrentCharity(index)}
              onFoodConsumption={(index) => void 0}
              onSleepClick={() => void 0}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
