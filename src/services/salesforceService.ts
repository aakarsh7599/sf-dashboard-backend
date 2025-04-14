import { Connection } from 'jsforce';

export async function getSalesforceAccounts(page = 1, limit = 10) {
  const conn = new Connection({
    loginUrl: process.env.SALESFORCE_LOGIN_URL
  });

  await conn.login(
    process.env.SALESFORCE_USERNAME as string,
    (process.env.SALESFORCE_PASSWORD as string) + (process.env.SALESFORCE_TOKEN as string)
  );

  const offset = (page - 1) * limit;

  const accounts = await conn
    .sobject('Account')
    .find({}, {
      Id: 1,
      Name: 1,
      Industry: 1,
      Phone: 1
    })
    .skip(offset)
    .limit(limit)
    .execute();

  const total = await conn.sobject('Account').count(); // 💡 total records for frontend pagination

  return {
    accounts,
    total,
  };
}