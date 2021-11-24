const nodeMailer=require("nodemailer");
const catchAsyncErr=require("../middleware/catchAsyncErr");

const sendEmail= async(options)=>{

    const transporter=nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            host:process.env.SMPT_HOST,
            port:process.env.SMPT_PORT,

            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASS
        }
    });


    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions);

}

module.exports=sendEmail;