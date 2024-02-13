import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "eu-west-3" });

export default async function sentEmail(body) {
    
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env['TO']],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },

        Subject: { Data: "CryptoWallet Report" },
      },
      Source: process.env['FROM'],
    });
    
    let response = await ses.send(command);
    return response;

}
