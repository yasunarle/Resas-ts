import axios from "axios"
// Types
import { Prefecture, PopulationTransitionData } from "../types/prefecture"

const endPoint = "https://opendata.resas-portal.go.jp/api/v1"
const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY,
}

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const url = endPoint + "/prefectures"
  const prefectures = await axios
    .get(url, { headers })
    .then((_res) => _res.data)
    .then((_data) => _data.result)
  return prefectures
}
export const getPrefectureData = async (prefecture: Prefecture): Promise<string[]> => {
  const url = endPoint + "/population/composition/perYear"
  const res = await axios.get(url, {
    headers,
    params: {
      cityCode: "-",
      prefCode: prefecture.prefCode,
    },
  })
  const totalPopulationDatas = res.data.result.data[0].data

  console.log("---")
  let li: string[] = []
  totalPopulationDatas.forEach((data: PopulationTransitionData) => {
    li.push(data.value)
  })
  return li
}

// function initResas() {
//   console.log("--- initResas")

//   const resas = axios.create({
//     baseURL: "https://opendata.resas-portal.go.jp/api/v1/",
//     timeout: 1000,
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//       "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY,
//     },
//   })
// }
// initResas()
