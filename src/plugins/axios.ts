import _axios from "axios"

const axios = () => {
  const url = "https://opendata.resas-portal.go.jp"

  const instance = _axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  })
  const data = _axios.get("/user", {
    params: {
      ID: 12345,
    },
  })
  console.log(data)
}

export default axios
