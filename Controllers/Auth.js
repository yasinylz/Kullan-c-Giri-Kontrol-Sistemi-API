const CustomError = require("../Helpers/Error/CustomError");
const User = require("../Models/User");
const asyncErrorWrapper = require("express-async-handler");
const { SendJwtClient } = require("../Helpers/Authorization/TokenHelpers");
const { validateUserInput, comparePassword } = require("../Helpers/Inputs/InputHelpers");
const sendMail = require("../Helpers/Libraries/SendEmail");

//Get All Register
const getAllRegister = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    SendJwtClient(user, res);
    next(error);
});

// User login
const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next(new CustomError("Lütfen Gerekli Mail ve Şifre bilgilerini giriniz !", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !comparePassword(password, user.password)) {
        return next(new CustomError("Lütfen bilgileri doğru giriniz !", 400));
    }
    SendJwtClient(user, res);
});

// Get user
const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });
};

// Logout user
const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;
    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Çıkış işlemi başarılı"
    });
});

// Image upload
const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { "profile_image": req.savedProfileImage }, { new: true, runValidators: true });
    res.status(200).json({
        success: true,
        message: "Resim Başarıyla Yüklendi",
        data: user
    });
});

// Forgot password
const forgotpassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });

    if (!user) {
        return next(new CustomError("Lütfen geçerli bir e-posta adresi giriniz!", 404));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save({ validateBeforeSave: false }); // Şifre doğrulamasını atla

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
    <h3>Şifre yenileme ekranına git !</h3>
    <p>Bu <a href='${resetPasswordUrl}' target='_blank'>link</a>'e tıklayarak sıfırlama işlemini gerçekleştirebilirsiniz.</p>
    `;

    try {
        await sendMail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Şifre sıfırlama",
            html: emailTemplate
        });

        return res.status(200).json({
            success: true,
            message: "E-posta gönderme işlemi başarılı"
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new CustomError("E-Postanız Gönderilemedi", 500));
    }
});


//Reset Password
const resetpassword=asyncErrorWrapper(async (req, res, next) => {
const {resetPasswordToken}=req.query;
const {password}=req.body;
if(!resetPasswordToken){
    return next(new CustomError("Lütfen geçerli bir belirteç sağlayın !"));

}
let user=await User.findOne({
    resetPasswordToken:resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
})
if(!user){
    return next(new CustomError("Token Süresi veya Otorum Açma işlemi bitti",400));
}
user.password=password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
    return res.status(200)
.json({
    success:true,
    message:"Parola sıfırlama işlemi başarıyla gerçekleşti"
})

});

//Update Auth
const editDetails=asyncErrorWrapper(async (req, res, next) =>{
const editInformations=req.body;
const user=await User.findByIdAndUpdate(req.user.id,editInformations,{
    new:true,
    runValidators:true
});
return res.status(200).json({
    success:true,
    data:user
});
});
 
module.exports = {
    getAllRegister,
    getUser,
    login,
    logout,
    imageUpload,
    forgotpassword,
    resetpassword,
    editDetails
}
