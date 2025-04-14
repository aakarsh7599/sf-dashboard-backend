import { Connection } from 'jsforce'
import dotenv from 'dotenv'
dotenv.config()

async function testSalesforceConnection() {
  try {
    const conn = new Connection({
      loginUrl: process.env.SALESFORCE_LOGIN_URL
    })

    await conn.login(
      process.env.SALESFORCE_USERNAME!,
      process.env.SALESFORCE_PASSWORD! + process.env.SALESFORCE_TOKEN!
    )

    const identity = await conn.identity()
    console.log('✅ Connected to Salesforce as:', identity.username)

    const result = await conn.query('SELECT Id, Name FROM Account LIMIT 5')
    console.log('Accounts:', result.records)

  } catch (error) {
    console.error('❌ Salesforce connection failed:', error)
  }
}

testSalesforceConnection()