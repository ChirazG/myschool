const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ADMIN_EMAIL,  // generated ethereal user
        pass: process.env.ADMIN_PASSWORD // generated ethereal password
    }
});

const send = (info) => {

    return new Promise(async (resolve, reject) => {
        try {

            // send mail with defined transport object
            let result = await transporter.sendMail(info);

            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            resolve(result)

        } catch (error) {
            console.log(error)
        }
    })


};



const emailProcesser = ({ email, pin, type }) => {
    let info = '';
    switch (type) {
        case "request-new-password":
            info = {
                from: '"School" <noel.prosacco27@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password reset pin", // Subject line
                text: "Here is your password reset pin" + pin + ". This pin will expires in one day", // plain text body
                html: `<b>Hello </b>
                Here is your pin, 
                <b>${pin}</b>
                This pin will expires in one day
                <p></p>`, // html body
            };

            send(info)
            break;
        case "password-update-success":
            info = {
                from: '"School" <noel.prosacco27@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password updated", // Subject line
                text: "Your new password has been updated", // plain text body
                html: `<b>Hello </b>
                Your new password has been updated
                <p></p>`, // html body
            };

            send(info)
            break;

        default:
            break;
    }


};

module.exports = {
    emailProcesser
}