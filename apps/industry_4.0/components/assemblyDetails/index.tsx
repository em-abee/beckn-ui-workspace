import { extendTheme, Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styles from './assembly-details.module.css'

const activeLabelStyles = {
  transform: 'scale(1) translateY(-24px)'
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            }
          }
        }
      }
    }
  }
})

export interface AssemblyDetailsProps {
  xInoutHtmlString: string
}

const AssemblyDetails: React.FC<AssemblyDetailsProps> = props => {
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const form = document.getElementById('xinputform')

    form!.addEventListener('submit', handleSubmit)

    return () => form!.removeEventListener('submit', handleSubmit)
  }, [])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formValues = {
      type: formData.get('type'),
      color: formData.get('color'),
      shape: formData.get('shape'),
      length: formData.get('length'),
      width: formData.get('width'),
      quantity: formData.get('quantity'),
      weight: formData.get('weight')
    }

    localStorage.setItem('orderQuantity', formValues.quantity as string)

    axios
      .post(`${apiUrl}/x-input/submit`, {
        action: 'https://sandbox-bpp-api.becknprotocol.io/industry-4.0/formsubmit',
        method: 'post'
      })
      .then(res => {
        console.log(res)
        router.push('/checkoutPage')
      })
      .catch(e => console.error(e))
  }

  return (
    <Box
      className={`${styles.x_input_form} hideScroll`}
      dangerouslySetInnerHTML={{ __html: props.xInoutHtmlString }}
    ></Box>
  )
}

export default AssemblyDetails
