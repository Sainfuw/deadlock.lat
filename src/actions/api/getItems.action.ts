import { defineAction } from 'astro:actions'
// import { getData } from '@/lib/getItemData'
// import fs from 'fs/promises'
// import { JSDOM } from 'jsdom'
import items from '@/data/items.json'

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

    //   const t0 = getData(HtmlTables[0])
    //   if (t0![0] === 'StatsWeapon') return
    //   const imageNode = new JSDOM(HtmlTables[0])
    //   const image = imageNode.window.document.querySelectorAll('img')[1].src

    //   const t1 = getData(HtmlTables[1])
    //   const t2 = getData(HtmlTables[2])
    //   const t3 = getData(HtmlTables[3])
    //   const t4 = getData(HtmlTables[4])
    //   const t5 = getData(HtmlTables[5])
    //   const t6 = getData(HtmlTables[6])
    //   const t7 = getData(HtmlTables[7])

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
    //     hasActives: t6,
    //     actives: t7 ?? [],
    //     image,
    //   }
    // })

    // const filteredResult = result.filter(
    //   (item) => item !== undefined && item !== null
    // )

    // await fs.writeFile('src/data/items.json', JSON.stringify(filteredResult))

    const filteredResult = items

    const groupedByType = filteredResult.reduce((acc: any, item) => {
      acc[item!.type] = [...(acc[item!.type] || []), item]
      return acc
    }, {})

    const groupedByTypeAndPrice = Object.fromEntries(
      Object.entries(groupedByType).map(([type, items]: any) => {
        const groupedByPrice = items.reduce((acc, item) => {
          if (item.price >= 0 && item.price <= 500) {
            acc['500'] = [...(acc['500'] || []), item]
          } else if (item.price > 500 && item.price <= 1250) {
            acc['1250'] = [...(acc['1250'] || []), item]
          } else if (item.price > 1250 && item.price < 6000) {
            acc['3000'] = [...(acc['3000'] || []), item]
          } else {
            acc['6000'] = [...(acc['6000'] || []), item]
          }
          return acc
        }, {})
        return [type, groupedByPrice]
      })
    )

    return groupedByTypeAndPrice
  },
})
