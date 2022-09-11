import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppStateType, Product, Image } from 'types'
import { getImageSize } from 'next/dist/server/image-optimizer'
import { useAppSelector } from 'redux/hooks'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_KEY_CREDENTIALS!, 'base64').toString()
  )
  if (req.method === 'POST') {
    try {
      const doc = new GoogleSpreadsheet(process.env.SHEET_ID)
      await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      })
      await doc.loadInfo()
      const {
        email,
        firstName,
        lastName,
        company,
        address,
        addressDetails,
        city,
        country,
        orderLines,
      } = req.body
      const orders = doc.sheetsByTitle['orders']
      const id = uuidv4()
      await orders.addRow({
        id,
        email,
        firstName,
        lastName,
        company,
        address,
        addressDetails,
        city,
        country,
      })
      const orderLine = doc.sheetsByTitle['orderLines']
      const products = await extractSheets(
        {
          spreadsheetKey: process.env.SHEET_ID,
          credentials: credentials,
          sheetsToExtract: ['products'],
        },
        function (err: null, data: AppStateType) {
          return data.products
        }
      )
      console.log(products.products)
      for (let i = 0; i < orderLines.length; i++) {
        const product = products.products.find(
          (product: Product) => product.id == orderLines[i].productId
        )
        if (!product) {
          return res.status(404).json({
            message: 'Product not found, please enter a valid product',
          })
        } else {
          await orderLine.addRow({
            quantity: orderLines[i].quantity,
            orderId: id,
            productId: orderLines[i].productId,
          })
          res.status(200).json({ message: 'success ' })
        }
      }
    } catch (error) {
      return console.log(error)
    }
  }
}
