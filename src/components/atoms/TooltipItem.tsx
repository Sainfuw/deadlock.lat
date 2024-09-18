import { API_BASE_URL } from '@/consts'
import type { IItem } from '@/interfaces/item'
import { Card, CardContent } from '../ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  item: IItem
}

export const TooltipItem = ({ item }: Props) => {
  const typeColor =
    item.type === 'Weapon Damage'
      ? 'bg-orange-400/60 hover:bg-orange-400/30'
      : item.type === 'Base Health'
        ? 'bg-green-400/60 hover:bg-green-400/30'
        : 'bg-purple-400/60 hover:bg-purple-400/30'

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
                width={100}
                height={100}
                className='rounded-lg mx-auto'
              />
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className='flex flex-col max-w-60'>
            <h3 className='text-xl'>{item.name}</h3>
            <p>{item.power}</p>
            <p>{item.stats}</p>
            <p>{item.description}</p>
            <p>{item.components}</p>
            <p>{item.hasPassive}</p>
            <p>{item.passives}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
