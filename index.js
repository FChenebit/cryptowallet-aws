import request from "./request.js";
import mailer from "./mailer.js";
import * as compute from "./compute.js";

export const handler = async (event,context,callback) => {

  try {
    const todayCurrencyRate = await request();
    const computeResult = compute.computeCurrencyAndTotalValue(todayCurrencyRate);
    
    let mailBody = `Total value of my crypto wallet : ${computeResult.TOTAL.toFixed(2)}\n\n`;
    const currencyCodes = Object.keys(computeResult);
    const allInserts = [];
    currencyCodes.forEach((currencyCode) => {
      if (currencyCode !== 'TOTAL') {
        mailBody += `Value for ${currencyCode} : ${computeResult[currencyCode].toFixed(2)} `;
        mailBody += '\n';
      }
    });


    const mailerResponse = await mailer(mailBody);
    // doit on analyser mailerResponse

  } catch (error) {
    try {
      let mailErrorMessage = `Error in cryptoWallet : ${error}`;
      const mailerErrorResponse = await mailer(mailErrorMessage);
      callback(error);
    } catch (mailError) {
      console.log(`caught error ${mailError} while sending this message ${error}`);
      callback(mailError);
      
    }
  }

  callback(null,'Execution OK');  

};
  