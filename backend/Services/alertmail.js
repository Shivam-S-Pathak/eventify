require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreplyblogifyteam@gmail.com", // Your Gmail address
    pass: "dbet novy wqhz tvcl", // Your Gmail App password (App-specific password if 2FA is enabled)
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendsosmail(sendto, isAlert) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Eventify SOS Alert" <noreplyblogifyteam@gmail.com>', // sender address
      to: sendto, // list of receivers
      subject: "URGENT: SOS Alert from Eventify", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #e74c3c; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚨 Emergency Alert</h1>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              Dear User,
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              We have received an emergency alert message from Eventify. Please read the message carefully and take appropriate action immediately.
            </p>
            <div style="background-color: #f8d7da; padding: 15px; border-left: 5px solid #e74c3c; margin: 20px 0;">
              <p style="font-size: 16px; color: #721c24; line-height: 1.6;">
                <strong>SOS Message:</strong> ${isAlert}
              </p>
            </div>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              Please stay safe and take all necessary precautions. If you need further assistance, contact the relevant authorities or reach out to our support team.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://major1-client.vercel.app/" style="background-color: #e74c3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Eventify</a>
            </div>
          </div>
          <div style="padding: 10px; background-color: #f1f1f1; text-align: center; color: #999999;">
            <p style="font-size: 12px; margin: 0;">&copy; 2024 Eventify. All Rights Reserved.</p>
          </div>
        </div>
      `, // html body
    });

    // Log the result to verify email sent
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
}

// Export the function for use
module.exports = sendsosmail;
