"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesforceAccounts = getSalesforceAccounts;
const jsforce_1 = require("jsforce");
async function getSalesforceAccounts(page = 1, limit = 10) {
    const conn = new jsforce_1.Connection({
        loginUrl: process.env.SALESFORCE_LOGIN_URL
    });
    await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_TOKEN);
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
