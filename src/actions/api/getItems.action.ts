import { getData } from '@/lib/getItemData'
import { defineAction } from 'astro:actions'
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

      const imageNode = new JSDOM(HtmlTables[0])
      const image = imageNode.window.document.querySelectorAll('img')[1].src

      if (t0![0] === 'StatsWeapon') return

      return {
        name: t0![0],
        type: t0![3],
        power: t0![1],
        price: t0![2].trim(),
        components: t1,
        description: t2,
        stats: t3,
        hasPassive: t4,
        passives: t5 ?? [],
        image,
      }
    })

    const filteredResult = result.filter((item) => item !== undefined)
    // await fs.writeFile('src/data/items.json', JSON.stringify(filteredResult))

    return filteredResult
  },
})
