/**
 * Author: Md Sholayman
 * Description: A Helper file where a async function has been created which is a helper for 
  sending a Email to User.
 * Date : 14 October,2023.
 */

const nodemailer = require('nodemailer');

const sendEmailHelper = async(EmailTo,EmailSubject,EmailText) =>{

   
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Student Register <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)

};

module.exports = sendEmailHelper;