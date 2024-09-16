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
              <CardHeader className='p-3'>
                <CardTitle className='text-sm text-center'>
                  {hero.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-3'>
                <img
                  src={imageURL}
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
