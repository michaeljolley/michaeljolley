import cloudinary from 'cloudinary';
import fs from 'fs';
import { optimize } from 'svgo';

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
const uploadBgAsset = async (svg, publicId, folder) => {
    try {
        const { data: optimizedSvg } = await optimize(svg, {
            //multipass: true,
        });
        if (!fs.existsSync('temp')) {
            fs.mkdirSync('temp');
        }
        if (fs.existsSync(`temp/${publicId}.svg`)) {
            fs.rmSync(`temp/${publicId}.svg`);
        }
        await fs.appendFileSync(`temp/${publicId}.svg`, optimizedSvg);
        return await cloudinary.v2.uploader.upload(`temp/${publicId}.svg`, {
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

/**
 * @param {string} svg - SVG to upload/find
 * @param {string} publicId - Unique Cloudinary id for the image
 * @param {string} folder - Folder in Cloudinary to save image to
 */
export const getBgAsset = async (svg, publicId) => {
    const folder = 'backgrounds'
    let asset = await findAsset(publicId, folder)
    if (!asset) {
        asset = await uploadBgAsset(svg, publicId, folder)
    }
    if (asset) {
        return {
            public_id: asset.public_id,
            secure_url: asset.secure_url,
        }
    }
    return null
}