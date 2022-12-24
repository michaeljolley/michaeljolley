import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    secure: true
});

const findAsset = async (publicId, folder) => {
    try {
        return await cloudinary.v2.api.resource(`${folder}/${publicId}`, {
            type: 'upload'
        })
    } catch (err) {
        console.log(
            // eslint-disable-line no-console
            `$cloudinary.findAsset error.\nfolder: ${folder}\npublicId: ${publicId}\n`,
            err
        )
        return null
    }
}
const uploadAsset = async (imagePath, publicId, folder) => {
    try {
        return await cloudinary.v2.uploader.upload(imagePath, {
            folder,
            public_id: publicId
        });
    } catch (err) {
        console.log(
            // eslint-disable-line no-console
            `$cloudinary.uploadAsset error.\nfolder: ${folder}\npublicId: ${publicId}\n`,
            err
        )
        return null
    }
}
/**
 * @param {string} imagePath - Path to image on local machine
 * @param {string} publicId - Unique Cloudinary id for the image
 * @param {string} folder - Folder in Cloudinary to save image to
 */
export const getAsset = async (imagePath, publicId, folder) => {
    let asset = await findAsset(publicId, folder)
    if (!asset) {
        asset = await uploadAsset(imagePath, publicId, folder)
    }
    if (asset) {
        return {
            public_id: asset.public_id,
            secure_url: asset.secure_url,
        }
    }
    return null
}
