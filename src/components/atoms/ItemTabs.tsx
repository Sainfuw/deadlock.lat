import type { Items } from '@/actions/api/getItems.action'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { IItem } from '@/interfaces/item'
import { Divider } from './Divider'
import { TooltipItem } from './TooltipItem'

interface Props {
  items: Items
}

export function ItemTabs({ items }: Props) {
  return (
    <Tabs defaultValue={Object.keys(items)[0]} className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        {Object.keys(items).map((type, i) => (
          <TabsTrigger key={type} value={type}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(items).map(([type, itemsByType]) => (
        <>
          {Object.entries(itemsByType).map(([price, itemsByPrice]) => (
            <TabsContent value={type} className='relative'>
              <h2 className='rotate-[270deg] absolute top-1/2 transform -translate-y-8 -left-10 font-bold'>
                {price}
              </h2>
              <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 my-6'>
                {(itemsByPrice as IItem[]).map((item: IItem) => (
                  <TooltipItem key={item.name} item={item} />
                ))}
              </div>
              <Divider />
            </TabsContent>
          ))}
        </>
      ))}
    </Tabs>
  )
}
