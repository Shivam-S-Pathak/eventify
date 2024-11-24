require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: "noreplyblogifyteam@gmail.com", // Your Gmail address
    pass: "dbet novy wqhz tvcl", // Your Gmail App password (App-specific password if 2FA is enabled)
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendokmail(sendto,name,event_name,t_no) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Eventify Team" <noreplyblogifyteam@gmail.com>', // sender address
      to: sendto, // list of receivers
      subject: "Welcome to Sait Eventify! Platform", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0073e6; padding: 20px; text-align: center;">
            <img src="https://hire4event.com/blogs/wp-content/uploads/2019/05/Event-Management-Proposal-Hire4event.jpg" alt="Welcome" style="max-width: 100%; height: auto; border-radius: 8px;">
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <h1 style="color: #0073e6; text-align: center;">Welcome to Eventify!</h1>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              Hello <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              <strong>Congratulation</strong>,your request towards the ${event_name} event is sucessfuylly
              accepted by the Admin.
            </p>
              <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              Details:
              <br>
              <strong> Event name: </strong> ${event_name}
              <br>
              <strong> Student name: </strong> ${name}
              <br>
              <strong> Ticket Number: </strong> ${t_no}
              <br>
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
              Feel free to explore our platform, connect with others, and start enrolling in more events.If you have any questions, don't hesitate to reach out!
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://major1-client.vercel.app/" style="background-color: #0073e6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Site</a>
            </div>
          </div>
         
          <div style="padding: 10px; background-color: #f1f1f1; text-align: center; color: #999999;">
            <p style="font-size: 12px;">&copy; 2024 Entify. All Rights Reserved.</p>
          </div>
        </div>
      `, // html body
    });
    console.log(info);
    
    // If you reach this point, the email was sent successfully
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    // If there is an error, throw it
    console.error("Error sending email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
}

// Export the function for use
module.exports = sendokmail;
