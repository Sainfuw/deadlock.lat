import { heroes, items } from '@/db/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TooltipHeroe } from './TooltipHeroe'
import { TooltipItem } from './TooltipItem'

export const SectionTabs = () => {
  return (
    <Tabs defaultValue='heroes' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='heroes'>Héroes</TabsTrigger>
        <TabsTrigger value='items'>Ítems</TabsTrigger>
      </TabsList>
      <TabsContent value='heroes'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
          {heroes.map((hero) => (
            <TooltipHeroe key={hero.id} hero={hero} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value='items'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
          {items.map((item: any) => (
            <TooltipItem key={item.id} item={item} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
