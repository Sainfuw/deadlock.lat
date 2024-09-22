export function ItemTitle({ item }: any) {
  return (
    <div className='flex justify-between items-center pt-2'>
      <h4 className='font-bold'>{item.at(0)}</h4>
      <h4 className='font-bold'>{item.at(1)}</h4>
    </div>
  )
}
