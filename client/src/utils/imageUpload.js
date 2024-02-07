export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}

// export const imageUpload = async (images) => {
//     const cldInstance = new Cloudinary({cloud: {cloudName: 'dl8u0rd8v'}});

//     const fetchedImage = cldInstance
//     .image('https://res.cloudinary.com/dl8u0rd8v/image/upload')
//     .setDeliveryType('fetch');

//     console.log(fetchedImage.toURL());
//     let imgArr = [];
//     imgArr.push(fetchedImage)
//     // for(const item of images){
//     //     //console.log(item)
//     //     const formData = new FormData()

//     //     if(item.camera){
//     //         formData.append("file", item.camera)
//     //     }else{
//     //         formData.append("file", item)
//     //     }
        
//     //     formData.append("upload_preset", "efxjficn")
//     //     formData.append("cloud_name", "dl8u0rd8v")


//     //     const data = await res.json()
//     //     console.log(data)
//     //     imgArr.push(fetchedImage)
//     // }
//     return imgArr;
// }

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        //console.log(item)
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        
        formData.append("upload_preset", "a7iol3lx")
        formData.append("cloud_name", "dl8u0rd8v")

         const res = await fetch("https://api.cloudinary.com/v1_1/dl8u0rd8v/image/upload", {
             method: "POST",
             body: formData
         })
        //https://res.cloudinary.com/devatchannel/image/upload
        // const res = await fetch("https://res.cloudinary.com/dl8u0rd8v/images/upload", {
        //     method: "POST",
        //     body: formData
        // })
        // const res = await fetch("https://res.cloudinary.com/devatchannel/image/upload", {
        //     method: "POST",
        //     body: formData
        // })

        const data = await res.json()
        console.log(data)
        imgArr.push({public_id: data.public_id, url: data.secure_url})
        console.log(imgArr)
    }
    return imgArr;
}