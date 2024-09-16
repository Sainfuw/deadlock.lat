import { JSDOM } from 'jsdom'

export const getData = (HtmlTable: string) => {
  const node = new JSDOM(HtmlTable)
  const table = node.window.document.querySelector('tbody')
  const data = table
    ?.textContent!.trim()
    .split('\n')
    .filter((item) => !(item === ''))
  return data
}
