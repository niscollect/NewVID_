// import {v2} from "cloudinary";
// or
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'djxvscnkn', 
    api_key: '128617887955785', 
    api_secret: 'JP6mfaOMk_fUK5SiGpBTP3KMXB4' // Must be in environmanet variables
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) { return null; }

        //uplaod the file on cloudinary 
        //UPLOAD     ->     cloudinary.uploader.upload('img path', {options}, [callback])
        const response = await cloudinary.uploader.upload(localFilePath, {
                public_id: 'stuff',
                resource_type: "auto",
            }
        )
        console.log("File has been uploaded successfully");
        console.log(response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);  //remove the locally saved temporarty file as the upload opeartion got failed
    }
}