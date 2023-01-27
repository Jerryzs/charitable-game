import React, { useEffect, useState } from 'react'
import QuestType from '../interfaces/QuestType'
import './Quest.css'

let renderedQuests = [] as QuestType[]

const updateRenderedQuestList = (quests: QuestType[]) => {
  renderedQuests = renderedQuests.filter((quest) => !quest.complete)

  let newQuests = quests.filter((quest) => !renderedQuests.includes(quest))
  renderedQuests.forEach(quest => {
    if(!quests.includes(quest)) {
      quest.complete = true
    }
  })

  renderedQuests.push(...newQuests)
}

const Quest = ({
  quests
}: {
  quests: QuestType[]
}) => {

  const [rendered, setRendered] = useState<QuestType[]>([])

  useEffect(() => {
    updateRenderedQuestList(quests)
    setRendered(renderedQuests)

  }, [quests])

  return (
    <div className='quests'>
      <h1>Quests</h1>
      <ul>
        {rendered.map((quest) =>
          <li
            key={`quest_${quest.id}`}
            className={`quest-box ${quest.complete ? 'completed' : ''}`.trimEnd()}
          >
            <span>
              {`Raise $${
                quest.target.donation
              }${
                quest.target.cause ? ` for ${quest.target.cause}` : ''
              }${
                quest.target.location ? ` near ${quest.target.location}` : ''
              }`}
            </span>
            <span>
              {`${quest.reward} EXP`}
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Quest