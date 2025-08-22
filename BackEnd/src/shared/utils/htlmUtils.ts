function removeTagsHtml(html: string) {
    return html.replace(/<[^>]+>/g, '');
}

export { removeTagsHtml };