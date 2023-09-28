import React from 'react'
import { RetailItem } from '../../../lib/types/products'
import LabImageSection from './LabImageSection'
import LabDetailsSection from './LabDetailsSection'

interface Props {
  product: RetailItem
}
const LabDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col mt-4 hideScroll" style={{ maxHeight: 'Calc(100vh - 120px)', overflowY: 'scroll' }}>
      <div className="w-full xl:max-w-[2100px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-start relative ">
          <LabImageSection imgArray={product.descriptor.images} product={product} />
          <LabDetailsSection product={product} />
        </div>
      </div>
    </div>
  )
}

export default LabDetails
