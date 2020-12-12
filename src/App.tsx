import React, { useState, useEffect, useMemo } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
// Scss
import "./App.scss"
// Types
import { Prefecture, StatePrefectures, CheckedPrefectures } from "./types/prefecture"
// Utils
import { getPrefectures, getPrefectureData } from "./utils/resas"

const pointStartYear = 1960

function App() {
  // Note: Local State
  const [prefectures, setPrefectures] = useState<StatePrefectures>([])
  const [checkedPrefectures, setCheckedPrefectures] = useState<CheckedPrefectures>([])
  // Note: Methods
  const initPrefectures = async (): Promise<void> => {
    const _prefectures = await getPrefectures()
    setPrefectures(_prefectures)
  }
  const checkPrefecture = async (prefecture: Prefecture, isChecked: boolean) => {
    // Todo: キャッシュ済み ? フラグ管理 : フェッチする
    if (isChecked) {
      const data = await getPrefectureData(prefecture)
      setCheckedPrefectures((value) => [...value, { ...prefecture, data }])
      return
    }

    setCheckedPrefectures((value) =>
      value.filter((_prefecture) => _prefecture.prefCode !== prefecture.prefCode)
    )
  }
  // Note: Computed

  const chartOptions = useMemo(() => {
    const series = checkedPrefectures.map((prefecture) => ({
      name: prefecture.prefName,
      data: prefecture.data,
    }))

    return {
      title: {
        text: "Total Population",
      },
      yAxis: {
        title: {
          text: "人口数",
        },
      },
      plotOptions: {
        series: {
          pointInterval: 5,
          pointStart: pointStartYear,
        },
      },
      series,
    }
  }, [checkedPrefectures])

  // Note: Created
  useEffect(() => {
    initPrefectures()
  }, [])

  return (
    <div className="App">
      <h1>Resas API App</h1>
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
      <div>
        {checkedPrefectures.length ? (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        ) : (
          <h3>選択されてません</h3>
        )}
      </div>
      <h1>Checked</h1>
      <div>
        {checkedPrefectures.map((prefecture) => (
          <span key={prefecture.prefCode}>{prefecture.prefName}</span>
        ))}
      </div>
    </div>
  )
}

export default App
