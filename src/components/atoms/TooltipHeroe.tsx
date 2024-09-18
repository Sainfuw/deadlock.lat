import type { IHero } from '@/interfaces/hero'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  hero: IHero
}

export const TooltipHeroe = ({ hero }: Props) => {
  const imageURL = `https://deadlocked.wiki${hero.images[1] ?? hero.images[0]}`
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={`/hero/${hero.name}`}>
            <Card className='hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white dark:bg-black/20 border border-black/30 dark:border-white/20'>
              <CardHeader className='p-0'>
                <CardTitle className='text-md text-center py-2'>
                  {hero.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <img
                  src={imageURL}
                  alt={hero.name}
                  width={300}
                  height={200}
                  className='rounded-lg'
                />
              </CardContent>
            </Card>
          </a>
        </TooltipTrigger>
        <TooltipContent className='w-60'>
          <div className='flex flex-col'>
            <p className='text-pretty'>{hero.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
