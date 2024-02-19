const functions = require("firebase-functions");
const { Client, ApiController, ApiError } = require("sappaylib");
const cors = require("cors")();

const sappayClient = new Client({
  credentials: {
    username: "bf.nginx@gmail.com",
    password: "MosesekoZANGOU_2015_**",
    clientId: "eBYjsN0uMZPcXIFcGuBGEXehr27RdMZwTvPECweQ",
    clientSecret:
      "drkmwL6gbEI5SMRHD0RijagUFuFKKYvevaix8vR2dCbXcQGIeaKzCtx6qOvrJmZsZgubHULTeCq47xtQf3PE6dF5kycMhqM5Mcq5WlRnsIiIqELMFRbB3SwOHfI6dZto",
  }
});

const sappay = new ApiController(sappayClient);

exports.createInvoice = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== "POST") {
      // Return a "method not allowed" error
      return response.status(405).end({
        statusCode: 405,
        message: "Method not allowed",
      });
    }
    try {
      // authenticate
      const token = await sappay.authentication();
      // create invoice
      // generate order in your system & get order id
      const orderId = `${Math.floor(Math.random() * 1000000000)}`;
      const invoiceId = await sappay.createInvoice({
        customer: {
          name: request.body.name,
          email: request.body.email,
          city: request.body.city,
          country: request.body.country,
          details: request.body.details,
        },
        amount: request.body.amount,
        type: "POS",
        reference_id: orderId,
        token,
      });
      // send invoice id to client
      response.status(200).send({ invoiceId });
    } catch (error) {
      if (error instanceof ApiError) {
        const errors = error.result;
        functions.logger.info(errors, { structuredData: true });
      }
      response.status(500).send({ error });
    }
  });
});

exports.checkout = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== "POST") {
      // Return a "method not allowed" error
      return response.status(405).end({
        statusCode: 405,
        message: "Method not allowed",
      });
    }
    try {
      // authenticate
      await sappay.authentication();
      // confirm checkout
      const checkout = await sappay.performCheckout({
        invoice_id: request.body.invoice_id,
        customer_msisdn: request.body.customer_msisdn,
        payment_processor_id: request.body.payment_processor_id,
        otp: request.body.otp,
      });
      console.log("checkout...");
      console.log(checkout);
      functions.logger.info(checkout, { structuredData: true });
      // send checkout to client
      response.status(200).send({ checkout });
    } catch (error) {
      if (error instanceof ApiError) {
        const errors = error.result;
        functions.logger.info(errors, { structuredData: true });
      }
      response.status(422).send({ error: `${error}` });
    }
  });
});

exports.getCheckoutStatus = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== "GET") {
      // Return a "method not allowed" error
      return response.status(405).end({
        statusCode: 405,
        message: "Method not allowed",
      });
    }
    try {
      // authenticate
      await sappay.authentication();
      // get checkout status
      const checkoutStatus = await sappay.getCheckout(request.query.invoice_id);
      console.log("checkoutStatus...");
      console.log(checkoutStatus);
      functions.logger.info(checkoutStatus, { structuredData: true });
      // send checkout status to client
      response.status(200).send({ checkoutStatus });
    } catch (error) {
      if (error instanceof ApiError) {
        const errors = error.result;
        functions.logger.info(errors, { structuredData: true });
      }
      response.status(422).send({ error: `${error}` });
    }
  });
});
