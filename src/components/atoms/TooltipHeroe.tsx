import type { IHero } from '@/interfaces/hero'
import { Card, CardContent } from '../ui/card'
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
            <Card className='bg-white dark:bg-black/20 border border-black/30 dark:border-white/20 relative overflow-hidden'>
              <div className='absolute -translate-x-1/2 left-1/2 z-10 top-2'>
                {hero.name.split(' ').map((w) => (
                  <h3 className='[text-shadow:_3px_3px_2px_rgb(0_0_0/_1)] text-xl text-center font-bold'>
                    {w}
                  </h3>
                ))}
              </div>
              <CardContent className='p-0'>
                <img
                  src={imageURL}
                  alt={hero.name}
                  width={300}
                  height={200}
                  className='rounded-lg transition-all hover:scale-125'
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
