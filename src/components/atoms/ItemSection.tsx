export function ItemSection({ title, item }: any) {
  return (
    <div className='flex flex-col my-2'>
      {title && <h3 className='font-bold'>{title}</h3>}
      {item.map((i, idx) => (
        <p key={`${i}-${idx}`}>{i}</p>
      ))}
    </div>
  )
}
