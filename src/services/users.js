import axios from "axios"
const baseUrl = "http://localhost:3001/api/users"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export default { getAll, getById }
