export function processHtml(html: string, config: { id: string }) {


    return html.replace(/§§/g, config.id)
}
