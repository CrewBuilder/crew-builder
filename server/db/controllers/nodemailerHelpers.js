const nodemailer = require('nodemailer');

exports.sendReward = (req, res) => {
  let reward = req.body.reward;
  let email = req.body.email;
  let user_id = req.body.user_id;
  let crew_id = req.body.crew_id;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_CLIENT_ID,
      pass: process.env.NODEMAILER_PASSWORD,
    }
  });
  let mailOptions = {
    from: '"CrewBuilder" <CrewBuilderDevTeam@gmail.com>',
    to: email,
    subject: 'Your CrewBuilder Reward is here!',
    html: `<b><h2><strong>Congratulations!</strong></h2><div>You spent ${reward.points} to claim ${reward.name}</div><div>Thanks for being a great Crew Member!</div><div><strong>Love,</strong></div>\nThe CrewBuilder Team</b>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  })
    .then(info => res.status(200).send(info))
    .catch(err => res.status(500).send('Email not sent'));
};
