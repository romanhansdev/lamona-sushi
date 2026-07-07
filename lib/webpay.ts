import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus
} from 'transbank-sdk';

const commerceCode = process.env.TRANSBANK_COMMERCE_CODE ?? IntegrationCommerceCodes.WEBPAY_PLUS;
const apiKey = process.env.TRANSBANK_API_KEY ?? IntegrationApiKeys.WEBPAY;
const environment = process.env.TRANSBANK_ENVIRONMENT === 'production'
  ? Environment.Production
  : Environment.Integration;

const transaction = new WebpayPlus.Transaction(
  new Options(commerceCode, apiKey, environment)
);

export function crearTransaccion(
  monto: number,
  ordenCompra: string,
  sessionId: string,
  returnUrl: string
) {
  return transaction.create(ordenCompra, sessionId, monto, returnUrl);
}

export function confirmarTransaccion(token: string) {
  return transaction.commit(token);
}
