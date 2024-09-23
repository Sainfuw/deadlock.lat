import type { IHero } from '@/interfaces/hero'
import type { IItem } from '@/interfaces/item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Divider } from './Divider'
import { TooltipHeroe } from './TooltipHeroe'
import { TooltipItem } from './TooltipItem'

interface Props {
  heroes: IHero[]
  items: Object
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
        <div>
          {Object.entries(items).map(([type, itemsByType]) => (
            <div key={type}>
              <h2 className='text-2xl font-bold text-center pt-4 underline'>
                {type}
              </h2>
              {Object.entries(itemsByType).map(([price, itemsByPrice]) => (
                <div key={price} className='relative'>
                  <h2 className='rotate-[270deg] absolute top-1/2 transform -translate-y-8 -left-10 font-bold'>
                    {price}
                  </h2>
                  <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 my-6'>
                    {(itemsByPrice as IItem[]).map((item: IItem) => (
                      <TooltipItem key={item.name} item={item} />
                    ))}
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
