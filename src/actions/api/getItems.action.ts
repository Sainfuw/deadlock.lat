import { getData } from '@/lib/getItemData'
import { defineAction } from 'astro:actions'
import fs from 'fs/promises'
import { JSDOM } from 'jsdom'

export const getItems = defineAction({
  accept: 'json',
  handler: async () => {
    const res = await fetch(
      'https://deadlocked.wiki/api.php?action=parse&page=Template:Infobox_ShopItems&format=json'
    )
    const json = await res.json()
    const itemNames = json.parse.images.map((item: string) =>
      item.split('.').at(0)
    )

    const results = await Promise.all(
      itemNames.map(async (itemName: string) => {
        const res = await fetch(
          `https://deadlocked.wiki/api.php?action=parse&page=${itemName}&format=json`
        )
        const json = await res.json()
        return json
      })
    )

    const result = results.map((json) => {
      if (json.parse === undefined) return

      const text = json.parse.text['*']

      const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/g
      const HtmlTables = text.match(tableRegex)

      const t0 = getData(HtmlTables[0])
      const t1 = getData(HtmlTables[1])
      const t2 = getData(HtmlTables[2])
      const t3 = getData(HtmlTables[3])
      const t4 = getData(HtmlTables[4])
      const t5 = getData(HtmlTables[5])
      const t6 = getData(HtmlTables[6])
      const t7 = getData(HtmlTables[7])

      const imageNode = new JSDOM(HtmlTables[0])
      const image = imageNode.window.document.querySelectorAll('img')[1].src

      if (t0![0] === 'StatsWeapon') return

      return {
        name: t0![0],
        type: t0![3],
        power: t0![1],
        price: Number(t0![2].trim().replace(',', '')),
        components: t1,
        description: t2,
        stats: t3,
        hasPassives: t4,
        passives: t5 ?? [],
        hasActives: t6,
        actives: t7 ?? [],
        image,
      }
    })

    const filteredResult = result.filter((item) => item !== undefined)

    const groupByType = filteredResult.reduce((acc: any, item) => {
      acc[item.type] = [...(acc[item.type] || []), item]
      return acc
    }, {})

    for (const type in groupByType) {
      const groupByPrice = groupByType[type].reduce((acc: any, item) => {
        console.log(item.price)
        if (item.price < 1250) acc['500'] = [...(acc[item.price] || []), item]
        else if (item.price < 3000)
          acc['1250'] = [...(acc[item.price] || []), item]
        else if (item.price < 6000)
          acc['3000'] = [...(acc[item.price] || []), item]
        else acc['6200'] = [...(acc[item.price] || []), item]
        return acc
      }, {})

      groupByType[type] = groupByPrice
    }

    await fs.writeFile('src/data/items.json', JSON.stringify(groupByType))

    return groupByType
  },
})
