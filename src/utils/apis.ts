import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

interface UploadParams {
  file: File
  data: string
}

interface UploadImageParams {
  title: string
  data: string
}

interface DataParams {
  middle_path: string
  data: number[]
}

interface TextParams {
  middle_path: string
  text: string
}

interface ImageParams {
  file: File
}

export async function upload(
  values: UploadParams,
  handleError: () => void,
): Promise<object | undefined> {
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
): Promise<object | undefined> {
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
): Promise<object | undefined> {
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
): Promise<object | undefined> {
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
  values: ImageParams,
  middle_path: string,
  handleError: () => void,
): Promise<object | undefined> {
  try {
    const res = await axios.post(
      `${API_URL}/predict_image?middle_path=${middle_path}/`,
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
