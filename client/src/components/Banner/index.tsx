import React, { useEffect, useState } from 'react'
import { BannerType } from '../../enums'
import { IoWarningOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { TfiInfoAlt } from 'react-icons/tfi'
import { SlClose } from 'react-icons/sl'

interface BannerProps {
  type: BannerType
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  // show: boolean
}

export const Banner: React.FC<BannerProps> = ({
  type = BannerType.info,
  text,
  setText,
  // show = false,
}) => {
  const [viewBanner, setViewBanner] = useState<Boolean>(false)
  const bannerColor = () => {
    switch (type) {
      case BannerType.error:
        return 'bg-red-500'
      case BannerType.success:
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }
  const bannerIcon = () => {
    switch (type) {
      case BannerType.error:
        return <IoWarningOutline size={25} />
      case BannerType.success:
        return <IoCheckmarkCircleOutline />
      default:
        return <TfiInfoAlt />
    }
  }

  useEffect(() => {
    if (text !== '') {
      setViewBanner(true)
    }
  }, [text])

  useEffect(() => {
    if (viewBanner === false) {
      setText('')
    }
  }, [viewBanner])

  return (
    <div
      className={`grid grid-cols-12  w-100 mb-2  py-2 rounded ${bannerColor()} ${viewBanner ? 'block' : 'hidden'}`}
    >
      <div className="col-span-1 flex w-100 justify-center">{bannerIcon()}</div>
      <div className="col-span-10">{text}</div>
      <div className="col-span-1 flex w-100 justify-center">
        <SlClose
          size={25}
          className="rounded-full hover:cursor-pointer hover:bg-slate-700"
          onClick={() => {
            setViewBanner(false)
          }}
        />
      </div>
    </div>
  )
}
