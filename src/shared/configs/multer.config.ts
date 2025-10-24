import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "./cloudinary.config"


export const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        return {
            folder: "item",
            allowed_formats: ["jpg", "png", "webp"],
            public_id: `Item-${Date.now()}`
        }
    }
})