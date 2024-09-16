import type { IHero } from '@/interfaces/hero'
import type { IItem } from '@/interfaces/item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TooltipHeroe } from './TooltipHeroe'
import { TooltipItem } from './TooltipItem'

interface Props {
  heroes: IHero[]
  items: IItem[]
}

export const SectionTabs = ({ heroes, items }: Props) => {
  return (
    <Tabs defaultValue='heroes' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='heroes'>Héroes</TabsTrigger>
        <TabsTrigger value='items'>Ítems</TabsTrigger>
      </TabsList>
      <TabsContent value='heroes'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
          {heroes.map((hero, i) => (
            <TooltipHeroe key={i} hero={hero} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value='items'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
          {items.map((item, i) => (
            <TooltipItem key={i} item={item} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
