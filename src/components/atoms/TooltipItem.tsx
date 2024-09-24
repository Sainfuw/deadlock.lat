import { API_BASE_URL } from '@/consts'
import type { IItem } from '@/interfaces/item'
import { Card, CardContent, CardFooter } from '../ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { ItemContent } from './ItemContent'

interface Props {
  item: IItem
}

export const TooltipItem = ({ item }: Props) => {
  const typeColor =
    item.type === 'Weapon Damage'
      ? 'bg-[#dd9643] hover:bg-[#dd9643]/60'
      : item.type === 'Base Health'
        ? 'bg-[#7dbb1b] hover:bg-[#7dbb1b]/60'
        : 'bg-[#bc87eb] hover:bg-[#bc87eb]/60'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`transition-colors border border-black/30 dark:border-white/20 ${typeColor}`}
          >
            <CardContent className='p-3'>
              <img
                src={`${API_BASE_URL}${item.image}`}
                alt={item.name}
                width={50}
                height={50}
                className='rounded-lg mx-auto aspect-2/3'
              />
            </CardContent>
            <CardFooter className='p-0 bg-[#ffefd7] text-black rounded-b h-16'>
              <h3 className='text-center text-[15px] font-semibold px-2 w-full'>
                {item.name}
              </h3>
            </CardFooter>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <ItemContent item={item} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
