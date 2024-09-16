import { items } from '@/db/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TooltipHeroe } from './TooltipHeroe'
import { TooltipItem } from './TooltipItem'

interface Props {
  heroes: IHero[]
}

export const SectionTabs = ({ heroes }: Props) => {
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
          {items.map((item: any) => (
            <TooltipItem key={item.id} item={item} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
