import React from "react"

type Props = {
  height: number
}
function AppSpacer({ height }: Props) {
  return <div style={{ width: "100%", height: `${height}px` }}></div>
}

export default AppSpacer
