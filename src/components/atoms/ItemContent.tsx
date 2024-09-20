import { API_BASE_URL } from '@/consts'
import type { IItem } from '@/interfaces/item'

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

      {item.description.length > 0 && (
        <>
          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex flex-col my-2'>
            <h4 className='text-lg'>Abilities</h4>
            {item.description.map((desc, i) => (
              <div key={`${desc}-${i}`}>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {item.components.length > 0 && (
        <>
          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex flex-col my-2'>
            <h4 className='text-lg'>Components</h4>
            {item.components.map((component, i) => (
              <div key={`${component}-${i}`}>
                <p>{component}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {item.stats.length > 0 && (
        <>
          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex flex-col my-2'>
            {item.stats.map((stat, i) => (
              <div key={`${stat}-${i}`}>
                <p>{stat}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {item.hasPassives.length > 0 && (
        <>
          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex justify-between items-center pt-2'>
            <h4 className='font-bold'>{item.hasPassives.at(0)}</h4>
            <h4 className='font-bold'>{item.hasPassives.at(1)}</h4>
          </div>

          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex flex-col my-2'>
            {item.passives.map((passive, i) => (
              <div key={`${passive}-${i}`}>
                <p>{passive}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {item.hasActives.length > 0 && (
        <>
          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex justify-between items-center pt-2'>
            <h4 className='font-bold'>{item.hasActives.at(0)}</h4>
            <h4 className='font-bold'>{item.hasActives.at(1)}</h4>
          </div>

          <div className='border-b-2 border-gray-500 pt-2'></div>
          <div className='flex flex-col my-2'>
            {item.actives.map((active, i) => (
              <div key={`${active}-${i}`}>
                <p className='text-pretty'>{active}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
