import axios, { AxiosResponse } from 'axios'

const API_URL = import.meta.env.VITE_API_URL

interface UploadImageParams {
  title: string
  node: object | undefined
}

interface DataParams {
  middle_path: string
  data: (string | number)[]
}

interface TextParams {
  middle_path: string
  text: string
}

export async function upload(
  values: FormData,
  handleError: () => void,
): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.post(`${API_URL}/training/`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  } catch (error) {
    handleError()
  }
}

export async function uploadImage(
  values: UploadImageParams,
  handleError: () => void,
): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.post(`${API_URL}/training_image/`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    handleError()
  }
}

export async function predictText(
  values: TextParams,
  handleError: () => void,
): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.post(`${API_URL}/predict_text/`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    handleError()
  }
}

export async function predictData(
  values: DataParams,
  handleError: () => void,
): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.post(`${API_URL}/predict_data/`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    handleError()
  }
}

export async function predictImage(
  values: FormData,
  middle_path: string,
  handleError: () => void,
): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.post(
      `${API_URL}/predict_image?middle_path=${middle_path}`,
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return res
  } catch (error) {
    handleError()
  }
}
