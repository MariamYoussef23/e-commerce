import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppStateType, Product, Image } from 'types'
import { getImageSize } from 'next/dist/server/image-optimizer'
import { useAppSelector } from 'redux/hooks'

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
      const { email, firstName, lastName, company, address, addressDetails, city, country, orderLines } = req.body
      const orders = doc.sheetsByTitle['orders']
      await orders.addRow({
        email, firstName, lastName, company, address, addressDetails, city, country
      })
      const orderLine = doc.sheetsByTitle['orderLines']
     
      
    
      
    //   for (let i = 0; i < orderLines.length; i++){
          
    //   }
      
      
      res.status(200).json({ message: 'success ' })
    } catch (error) {
      return console.log(error)
    }
  }
}
