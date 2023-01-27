export type Factor = 'reward' | 'time' | 'energy'

interface Item {
  id: number
  name: string
  factor: Factor
  effect: number
  lore: string
  image: string
}

export default Item
