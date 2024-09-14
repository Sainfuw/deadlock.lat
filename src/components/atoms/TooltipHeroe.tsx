import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  hero: {
    id: number
    name: string
    role: string
    description: string
  }
}

export const TooltipHeroe = ({ hero }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={`/hero/${hero.id}`}>
            <Card className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white dark:bg-black/20 border border-black/30 dark:border-white/20'>
              <CardHeader className='p-3'>
                <CardTitle className='text-sm'>{hero.name}</CardTitle>
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  {hero.role}
                </p>
              </CardHeader>
              <CardContent className='p-3'>
                <img
                  src={`/placeholder.svg?height=100&width=100&text=${hero.name}`}
                  alt={hero.name}
                  width={100}
                  height={100}
                  className='rounded-lg mx-auto'
                />
              </CardContent>
            </Card>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hero.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
