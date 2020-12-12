export type Prefecture = {
  prefCode: number
  prefName: string
}
export type StatePrefectures = Prefecture[]

export type PopulationTransitionData = {
  year: number
  value: string
}
export type Population = string

export type CheckedPrefecture = {
  prefCode: number
  prefName: string
  data: Population[]
}
export type CheckedPrefectures = CheckedPrefecture[]
