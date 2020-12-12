import React, { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
// Scss
import "./App.scss"
// Types
import { Prefecture, StatePrefectures } from "./types/prefecture"
// Utils
import { getPrefectures } from "./utils/resas"

const initSampleData = [
  { year: "1980", tokyo: 200 },
  { year: "1990", tokyo: 300 },
]
function App() {
  const [sampleData, setSampleData] = useState(initSampleData)
  const [sampleCheckedPres, setSampleCheckedPres] = useState<string[]>(["tokyo"])
  // State
  const [prefectures, setPrefectures] = useState<StatePrefectures>([])
  const [checkedPrefectures, setCheckedPrefectures] = useState<StatePrefectures>([])
  // Note: Methods
  const initPrefectures = async () => {
    const _prefectures = await getPrefectures()
    setPrefectures(_prefectures)
  }
  const checkPrefecture = (prefecture: Prefecture, isChecked: boolean): void => {
    if (isChecked) {
      setCheckedPrefectures((value) => [...value, prefecture])
      return
    }
    setCheckedPrefectures((value) =>
      value.filter((_prefecture) => _prefecture.prefCode !== prefecture.prefCode)
    )
  }
  // Note: Created
  useEffect(() => {
    initPrefectures()
  }, [])
  const options = {
    title: {
      text: "総人口",
    },
    yAxis: {
      title: {
        text: "総人口数",
      },
    },
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    series: [
      {
        name: "東京",
        data: [100, 2000, 3000],
      },
    ],
  }
  return (
    <div className="App">
      <h1>sampole</h1>
      <div>
        {sampleData.length ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : (
          <p>選択されてません</p>
        )}
      </div>

      <h1>Checked</h1>
      <div>
        {checkedPrefectures.map((prefecture) => (
          <span key={prefecture.prefCode}>{prefecture.prefName}</span>
        ))}
      </div>
      <h2>都道府県一覧</h2>
      <div>
        {prefectures.map((prefecture) => (
          <span key={prefecture.prefCode}>
            <input
              type="checkbox"
              onChange={(e) => {
                const isChecked = e.target.checked
                checkPrefecture(prefecture, isChecked)
              }}
            />
            <span>{prefecture.prefName}</span>
          </span>
        ))}
      </div>
      {/* <div>
        <LineChart width={600} height={400} data={sampleData}>
          <XAxis dataKey="year" />
          <YAxis />
          {sampleCheckedPres.map((prefecture) => (
            <Line type="monotone" dataKey={prefecture} stroke="#ff7300" yAxisId={0} />
          ))}

          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
        </LineChart>
      </div> */}
    </div>
  )
}

export default App
