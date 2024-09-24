import type { IHero } from '@/interfaces/hero'
import { defineAction } from 'astro:actions'
import { JSDOM } from 'jsdom'

export const getHeroes = defineAction({
  accept: 'json',
  handler: async () => {
    const res = await fetch(
      'https://deadlocked.wiki/api.php?action=parse&page=Heroes&format=json'
    )
    const json = await res.json()
    let text = json.parse.text['*']

    const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/g
    const HtmlTables = text.match(tableRegex)
    let cardImages: (string | undefined)[] = []

    const heroes = HtmlTables.map((table: string) => {
      const node = new JSDOM(table)
      const tables = node.window.document.querySelector('tbody')
      const images = node.window.document.querySelectorAll('img')

      const data = tables
        ?.textContent!.trim()
        .split('\n')
        .filter((item) => !(item === ''))

      const imagesArray = Array.from(images).map((img) =>
        img.getAttribute('src')
      )
      const heroAndSkills = imagesArray.filter((_, i) => i % 2 === 0) || []

      if (data![0] === 'HEROES') {
        cardImages = imagesArray.map((item) => item?.replace('50px', '264px'))
        return
      }

      return {
        name: data![0],
        title: data![1],
        description: data![2],
        images: [heroAndSkills[0]],
        skills: heroAndSkills.slice(1),
      }
    })

    const heroWithCards = heroes
      .filter((hero: string) => hero !== undefined)
      .map((hero: IHero) => {
        return cardImages.map((img: any) => {
          if (img.includes(hero.name.split(' ').at(-1))) {
            return { ...hero, images: [...hero.images, img] }
          }
        })
      })

    const result = heroWithCards
      .flat()
      .filter((item: string) => item !== undefined)

    // fs.writeFile('src/data/heroes.json', JSON.stringify(result))

    return result as IHero[]
  },
})
