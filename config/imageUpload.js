export const imageUpload = async (images) => {
  const url = "https://api.cloudinary.com/v1_1/sierragaming/image/upload"
  const cloud = "sierragaming"
  const update = "media_jamur"

  let imgArr = []
  for (const item of images) {
    const formData = new FormData()
    formData.append("file", item)
    formData.append("upload_preset", update)
    formData.append("cloud_name", cloud)

    const res = await fetch(url, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    imgArr.push({ public_id: data.public_id, url: data.secure_url })
    console.log(imgArr)
  }
  return imgArr;
}