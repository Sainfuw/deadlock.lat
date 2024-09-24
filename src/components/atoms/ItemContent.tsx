import { API_BASE_URL } from '@/consts'
import type { IItem } from '@/interfaces/item'
import { Divider } from './Divider'
import { ItemSection } from './ItemSection'
import { ItemTitle } from './ItemTitle'

export function ItemContent({ item }: { item: IItem }) {
  return (
    <div className='flex flex-col max-w-96 min-w-96'>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-xl font-bold'>{item.name}</h2>
          <h3 className='text-lg'>$ {item.price}</h3>
        </div>
        <div className='flex gap-2 items-center justify-center'>
          <img
            src={`${API_BASE_URL}${item.image}`}
            alt={item.name}
            width={80}
            height={80}
            className='rounded-lg size-10'
          />
          <div className='flex flex-col items-center justify-center text-center'>
            <p>{item.power}</p>
            <p className='text-xs max-w-14'>{item.type}</p>
          </div>
        </div>
      </div>

      {item.description && item.description.length > 0 && (
        <>
          <Divider />
          <ItemSection title='Description' item={item.description} />
        </>
      )}

      {item.components && item.components.length > 0 && (
        <>
          <Divider />
          <ItemSection title='Components' item={item.components} />
        </>
      )}

      {item.stats && item.stats.length > 0 && (
        <>
          <Divider />
          <ItemSection title='Stats' item={item.stats} />
        </>
      )}

      {item.hasPassives && item.hasPassives.length > 0 && (
        <>
          <Divider />
          <ItemTitle item={item.hasPassives} />
          <Divider />
          <ItemSection item={item.passives} />
        </>
      )}

      {item.hasActives && item.hasActives.length > 0 && (
        <>
          <Divider />
          <ItemTitle item={item.hasActives} />
          <Divider />
          <ItemSection item={item.actives} />
        </>
      )}
    </div>
  )
}
