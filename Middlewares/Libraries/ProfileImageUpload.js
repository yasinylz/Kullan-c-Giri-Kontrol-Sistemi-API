const multer=require("multer");
const path=require("path");
const CustomError=require("../../Helpers/Error/CustomError");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
const rootDir=path.dirname(require.main.filename);
cb(null,path.join(rootDir,"/Public/Uploads"))
    },
    filename:function(req,file,cb){
const extension=file.mimetype.split("/")[1];
req.savedProfileImage="image_"+req.user.id+"."+extension;
cb(null,req.savedProfileImage)
    }
});
const fileFilter=(req,file,cb)=>{
let allowedMimeTypes=["image/jpg","image/jpeg","image/png"];
if(!allowedMimeTypes.includes(file.mimetype)){
    return cb(new CustomError("Lütfen uygun bir dosya tipi seçin(jpeg,jpg,png)",400),false);
}
cb(null,true)
}
const ProfileImageUpload=multer({storage,fileFilter});
module.exports=ProfileImageUpload;