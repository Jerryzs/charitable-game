import React from 'react'
import Modal from 'react-modal'
import Charity from '../interfaces/Charity'
import Food from '../interfaces/Food'
import Location from '../interfaces/Location'
import Transportation from '../interfaces/Transportation'
import timer from '../libraries/Timer'
import './Action.css'

Modal.setAppElement('#root')

const to2Decimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2)

const Action = ({
  currentLocation,
  time,
  currentCharity,
  locations,
  transportations,
  charities,
  foodOptions,
  donations,
  onLocationChange,
  onCharityChange,
  onFoodConsumption,
  onSleepClick,
  onGameProgress
}: {
  currentLocation: number
  time: number
  currentCharity: number
  locations: Location[]
  transportations: Transportation[]
  charities: Charity[]
  foodOptions: Food[]
  donations: Record<string, number>
  onLocationChange: (loc: number, trans: number) => void
  onCharityChange: (index: number) => void
  onFoodConsumption: (index: number) => void
  onSleepClick: () => void
  onGameProgress: (progress: number) => boolean | void
}) => {
  const tempLoc = React.useRef<number>(0)

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [modalState, setModalState] = React.useState<number>(0)

  const handleButtonClick = (state: number, index0: number, index1?: number) => {
    if (state !== 0) {
      setModalOpen(false)
      ;[() => void 0, onCharityChange, onFoodConsumption, onLocationChange][state](index0, index1 ?? -1)
    } else {
      tempLoc.current = index0
      setModalState(3)
    }
  }

  return (
    <div className="action">
      <div className="scene" style={{
        backgroundImage: `url(${locations[currentLocation].image})`
      }}>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={{
            content: {
              maxWidth: '75%',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            }
          }}
        >
          <div
            className="modal"
          >
            {modalState === 0
              ? locations.map((location, index) => (
                <button
                  key={`loc_${location.name.replaceAll(/[^a-z0-9]/gi, '_')}`}
                  className="location"
                  onClick={() => handleButtonClick(0, index)}
                >
                  <span style={{ backgroundImage: `url(${location.image})` }}></span>
                  <span>{location.name.toUpperCase()}</span>
                </button>
              ))
              : modalState === 1
                ? charities.map((charity, index) => (
                  <button
                    key={`cha_${charity.name.replaceAll(/[^a-z0-9]/gi, '_')}`}
                    className="charity"
                    onClick={() => handleButtonClick(1, index)}
                  >
                    <span style={{ backgroundImage: `url(${charity.icon})` }}></span>
                    <span>{charity.name.toUpperCase()}</span>
                  </button>
                ))
                : modalState === 2
                  ? foodOptions.map((foodOption, index) => (
                    <button
                      key={`cha_${foodOption.name.replaceAll(/[^a-z0-9]/gi, '_')}`}
                      className="foodOption"
                      onClick={() => handleButtonClick(2, index)}
                    >
                      <span style={{ backgroundImage: `url(${foodOption.image})` }}></span>
                      <span>{foodOption.name.toUpperCase()}</span>
                    </button>
                  ))
                  : modalState === 3
                    ? transportations.map((transportation, index) => (
                      <button
                        key={`tra_${transportation.type}`}
                        className="transportation"
                        onClick={() => handleButtonClick(3, tempLoc.current, index)}
                      >
                        <span style={{ backgroundImage: `url(${transportation.icon})` }}></span>
                        <span>{transportation.type.toUpperCase()}</span>
                      </button>
                    ))
                    : undefined
            }
          </div>
        </Modal>
        <div className="scene-info">
          <h1>{locations[currentLocation].name.toUpperCase()}</h1>
          <span>{timer(time).toString()}</span>
        </div>
        <div className="progress-controls">
          <button onClick={() => onGameProgress(60)}>Spend 1 Hour</button>
        </div>
      </div>
      <div className="controls">
        <div>
          <span>
            {locations[currentLocation].name.charAt(0).toUpperCase() + locations[currentLocation].name.slice(1)}
            <br />
            Total: ${to2Decimals(donations[locations[currentLocation].name] ?? 0)}
          </span>
          <button onClick={() => {setModalState(0); setModalOpen(true)}}>
            Switch Location
          </button>
        </div>
        <div>
          <span>
            {charities[currentCharity].name.charAt(0).toUpperCase() + charities[currentCharity].name.slice(1)}
            <br />
            Total: ${to2Decimals(donations[charities[currentCharity].abbr] ?? 0)}
          </span>
          <button onClick={() => {setModalState(1); setModalOpen(true)}}>
            Switch Charity
          </button>
        </div>
        <div>
          <button onClick={() => {setModalState(2); setModalOpen(true)}}>
            Consume Food
          </button>
          <button onClick={() => onSleepClick()}>Sleep</button>
        </div>
      </div>
    </div>
  )
}

export default Action
