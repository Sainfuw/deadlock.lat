import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  item: {
    id: number
    name: string
    type: string
    price: number
    description: string
  }
}

export const TooltipItem = ({ item }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white dark:bg-black/20 border border-black/30 dark:border-white/20'>
            <CardHeader className='p-3'>
              <CardTitle className='text-sm'>{item.name}</CardTitle>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                {item.type}
              </p>
            </CardHeader>
            <CardContent className='p-3'>
              <img
                src={`/placeholder.svg?height=100&width=100&text=${item.name}`}
                alt={item.name}
                width={100}
                height={100}
                className='rounded-lg mx-auto'
              />
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{item.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
