export type ValentineTarget = 'for_him' | 'for_her'

export interface ValentineData {
  id: string
  target: ValentineTarget
  photo1Url: string
  photo2Url: string
}
