import { ComponentProps, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const itemInfoIcon = tv({
  slots: {
    base: 'flex items-center gap-4',
    dataInfo:
      'flex flex-wrap font-nunito text-base font-bold leading-short text-gray-200',
    dataTitle: 'font-nunito text-sm font-normal leading-base text-gray-300',
  },
})

const { base, dataInfo, dataTitle } = itemInfoIcon()

type ItemInfoIcon = ComponentProps<'div'> & VariantProps<typeof itemInfoIcon>

interface ItemInfoIconProps extends ItemInfoIcon {
  icon: ReactNode
  title: string
  info: string | number | undefined
}

export const ItemInfoIcon = ({
  icon,
  title,
  info,
  ...props
}: ItemInfoIconProps) => {
  return (
    <div {...props} className={base()}>
      {/* <BookmarkSimple size={24} className="h-6 w-6 text-green-100" /> */}
      {icon}
      <div className="flex flex-col">
        <span className={dataInfo()}>{info}</span>
        <span className={dataTitle()}>{title}</span>
      </div>
    </div>
  )
}
