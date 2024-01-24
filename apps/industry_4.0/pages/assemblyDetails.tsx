import { Box } from '@chakra-ui/react'
import AssemblyDetails from '@components/assemblyDetails'
import LoaderWithMessage from '@components/loader/LoaderWithMessage'
import { useLanguage } from '@hooks/useLanguage'
import { getPayloadForSelectRequest } from '@utils/checkout-utils'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ParsedItemModel } from '../types/search.types'
import { SelectResponseModel } from '../types/select.types'

const assemblyDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState<ParsedItemModel | null>(null)
  const [xInoutHtmlString, setXinputHtmlString] = useState('')
  const [selectData, setSelectData] = useState<SelectResponseModel[]>([])
  const [isLoadingForSelect, setIsLoadingForSelect] = useState(true)
  const [error, setError] = useState('')

  const { t } = useLanguage()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchSelectData = (selectPayload: any) => {
    axios
      .post(`${apiUrl}/select`, selectPayload)
      .then(res => {
        const selectData: SelectResponseModel[] = res.data.data
        const formString = selectData[0].message.order.items[0].xinput.html
        setXinputHtmlString(formString)
        setSelectData(selectData)
        setIsLoadingForSelect(false)
      })
      .catch(e => {
        setError(e.message)
        console.error(e)
        setIsLoadingForSelect(false)
      })
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('selectedItem')) {
      const parsedSelectedItem = JSON.parse(localStorage.getItem('selectedItem') as string)
      console.log('parsed', parsedSelectedItem)
      setSelectedProduct(parsedSelectedItem)
    }
  }, [])

  useEffect(() => {
    if (selectedProduct) {
      const selectPayload = getPayloadForSelectRequest(selectedProduct)
      fetchSelectData(selectPayload)
    }
  }, [selectedProduct])

  if (isLoadingForSelect) {
    return (
      <Box
        display={'grid'}
        height={'calc(100vh - 300px)'}
        alignContent={'center'}
      >
        <LoaderWithMessage
          loadingText={t.pleaseWait}
          loadingSubText={t.checkoutLoaderSubText}
        />
      </Box>
    )
  }

  if (!xInoutHtmlString.trim().length) {
    return <></>
  }

  // return <Box dangerouslySetInnerHTML={{ __html: xInoutHtmlString }}></Box>

  return <AssemblyDetails xInoutHtmlString={xInoutHtmlString} />
}

export default assemblyDetails
