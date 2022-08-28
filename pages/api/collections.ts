import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product, Collection } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_KEY_CREDENTIALS!, 'base64').toString()
  )

  if (req.method == 'GET') {
    return extractSheets(
      {
        spreadsheetKey: process.env.SHEET_ID,
        credentials: credentials,
        sheetsToExtract: ['collections'],
      },
      function (err: null, data: Collection[]) {
        return res.status(200).json(data)
      }
    )
  }
}
