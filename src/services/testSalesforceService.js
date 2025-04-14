"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsforce_1 = require("jsforce");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function testSalesforceConnection() {
    try {
        const conn = new jsforce_1.Connection({
            loginUrl: process.env.SALESFORCE_LOGIN_URL
        });
        await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_TOKEN);
        const identity = await conn.identity();
        console.log('✅ Connected to Salesforce as:', identity.username);
        const result = await conn.query('SELECT Id, Name FROM Account LIMIT 5');
        console.log('Accounts:', result.records);
    }
    catch (error) {
        console.error('❌ Salesforce connection failed:', error);
    }
}
testSalesforceConnection();
