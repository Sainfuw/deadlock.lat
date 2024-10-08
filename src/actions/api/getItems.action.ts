import items from '@/data/items.json'
import type { IItem } from '@/interfaces/item'
import { groupBy, groupFilters } from '@/utils/groupBy'
import { defineAction } from 'astro:actions'

export interface ItemsByTypeAndPrice {
  [key: string]: {
    [key: string]: IItem[]
  }
}

export const getItems = defineAction({
  accept: 'json',
  handler: async () => {
    // const res = await fetch(
    //   'https://deadlocked.wiki/api.php?action=parse&page=Refresher&format=json'
    // )
    // const json = await res.json()
    // const html = json.parse.text['*']
    // const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/g
    // const HtmlTables = html.match(tableRegex)
    // const itemNames = HtmlTables.slice(-3)
    //   .map((tableString: string) => {
    //     const node = new JSDOM(tableString)
    //     const anchors = node.window.document.querySelectorAll('tbody a')
    //     const itemNames = Array.from(anchors).map((item) => {
    //       const discardItems = [
    //         undefined,
    //         'Items',
    //         'Weapon',
    //         'Vitality',
    //         'Spirit',
    //       ]
    //       if (discardItems.includes(item.textContent!)) return ''
    //       return item.textContent
    //     })

    //     return itemNames.filter((item) => item !== '')
    //   })
    //   .flat()

    // const results = await Promise.all(
    //   itemNames
    //     .map(async (itemName: string) => {
    //       try {
    //         const res = await fetch(
    //           `https://deadlocked.wiki/api.php?action=parse&page=${itemName}&format=json`
    //         )
    //         const json = await res.json()
    //         if (json.parse === undefined) return
    //         return json.parse.text['*']
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     })
    //     .filter((item) => item !== undefined)
    // )

    // const result = results.map((text) => {
    //   const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/g
    //   const HtmlTables = text.match(tableRegex)

    //   if (HtmlTables === null) return
    //   const t0 = getData(HtmlTables[0])
    //   if (t0![0] === 'StatsWeapon') return
    //   const imageNode = new JSDOM(HtmlTables[0])
    //   const image = imageNode.window.document
    //     .querySelectorAll('img')[1]
    //     .src.replace('64px', '96px')

    //   const t1 = getData(HtmlTables[1])
    //   const t2 = getData(HtmlTables[2])
    //   const t3 = getData(HtmlTables[3])
    //   const t4 = getData(HtmlTables[4])
    //   const t5 = getData(HtmlTables[5])
    //   const t10 = getData(HtmlTables[10])
    //   const t11 = getData(HtmlTables[11])

    //   return {
    //     name: t0![0],
    //     type: t0![3],
    //     power: t0![1],
    //     price: Number(t0![2].trim().replace(',', '')),
    //     components: t1,
    //     description: t2,
    //     stats: t3,
    //     hasPassives: t4,
    //     passives: t5 ?? [],
    //     hasActives: t10,
    //     actives: t11 ?? [],
    //     image,
    //   }
    // })

    // const filteredResult = result.filter(
    //   (item) => item !== undefined && item !== null
    // )

    // await fs.writeFile('src/data/items.json', JSON.stringify(filteredResult))

    const filteredResult = items

    const groupedByType = groupBy(filteredResult, ({ type }) => type)
    const groupedByTypeAndPrice = Object.fromEntries(
      Object.entries(groupedByType).map(([type, items]: any) => {
        const itemsByType = items.sort((a, b) => a.price - b.price) as IItem[]
        const groupedByPrice = groupBy(itemsByType, (item) =>
          groupFilters(item.price)
        )
        return [type, groupedByPrice]
      })
    )

    return groupedByTypeAndPrice as ItemsByTypeAndPrice
  },
})
