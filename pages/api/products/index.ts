import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_KEY_CREDENTIALS!, 'base64').toString()
  )
  if (req.method === 'GET') {
    try {
      return extractSheets(
        {
          spreadsheetKey: process.env.SHEET_ID,
          credentials: credentials,
          sheetsToExtract: ['Products'],
        },
        function (err: null, data: Product[]) {
          return res.status(200).json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  } else if (req.method === 'POST') {
    try {
      const doc = new GoogleSpreadsheet(process.env.SHEET_ID)
      await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      })
      await doc.loadInfo()
      const { name, price, description } = req.body
      const products = doc.sheetsByTitle['Products']
      await products.addRow({
        name,
        price,
        description,
      })
      res.status(200).json({ message: 'product added ' })
    } catch (error) {
      return console.log(error)
    }
  }
}
