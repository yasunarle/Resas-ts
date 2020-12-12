import React, { useState, useEffect, useMemo } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
// CSS
import "./App.css"
// Types
import { Prefecture, StatePrefectures, CheckedPrefectures } from "./types/prefecture"
// Utils
import { getPrefectures, getPrefectureData } from "./utils/resas"
// Copmonents
import AppSpacer from "./components/AppSpacer"
import TheHeader from "./components/TheHeader"

const pointStartYear = 1960

function App() {
  // Note: Local State
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prefectures, setPrefectures] = useState<StatePrefectures>([])
  const [checkedPrefectures, setCheckedPrefectures] = useState<CheckedPrefectures>([])
  // Note: Methods
  const initPrefectures = async (): Promise<void> => {
    setIsLoading(true)
    const _prefectures = await getPrefectures()
    if (!_prefectures) {
      return
    }
    setPrefectures(_prefectures)
    setIsLoading(false)
  }
  const checkPrefecture = async (prefecture: Prefecture, isChecked: boolean) => {
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
    <div className="app">
      <div className="app__content">
        <TheHeader />
        <AppSpacer height={40} />
        {isLoading ? (
          <p>Loading...</p>
        ) : !prefectures.length ? (
          <p>接続エラー</p>
        ) : (
          <div>
            <h2 className="prefecture-container__title">都道府県</h2>
            <AppSpacer height={20} />
            <div className="prefectures-container">
              {prefectures.map((prefecture) => (
                <div className="prefecture" key={prefecture.prefCode}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked
                      checkPrefecture(prefecture, isChecked)
                    }}
                  />
                  <span>{prefecture.prefName}</span>
                </div>
              ))}
            </div>
            <AppSpacer height={28} />
            <div>
              {checkedPrefectures.length ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              ) : (
                <h3>選択されてません</h3>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
