
import * as Config from "../lib/Config";
import srs from "secure-random-string";
const mailjet = require("node-mailjet").connect(Config.apikey, Config.secretkey);

export class Mail {
    public async SendMailRoot(fromm, to, subject, text): Promise<any> {
let customID = srs({length:10});
let from = fromm || 'Unknown User';

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": 'api@superquickemail.cf',
        "Name": 'Contact form'
      },
      "To": [
        {
          "Email": to,
          "Name": to
        }
      ],
      "Subject": subject,
      "HTMLPart": text,
      "CustomID": customID
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    return 404;
  })

  return customID;

    }



    public async SendMail(to, toname, subject, text): Promise<any> {
let customID = srs({length:10});


const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": 'contact@justbeingabdi.cf',
        "Name": 'Abdi Hassan'
      },
      "To": [
        {
          "Email": to,
          "Name": toname
        }
      ],
      "Subject": subject,
      "HTMLPart": text,
      "CustomID": customID
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    return 404;
  })

  return customID;

    }


}