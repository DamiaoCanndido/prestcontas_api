import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storageTypes = {
    local: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(
                null, 
                path.resolve(__dirname, "..", "..", "uploads")
            );
        },
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const filename = `${hash}-${file.originalname}`
            callback(null, filename);
        },
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: "prestcontas",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');
            const filename = `${hash}-${file.originalname}`
            callback(null, filename);
        },
    })
}

export const uploads = {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fieldSize: 30 * 1024 * 1024
    },
    fileFilter: (request, file, callback) => {
        const formats = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        if (formats.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error("Formato inválido"));
        }
    }
} as Options;

