import { LuSparkles } from 'react-icons/lu'

function formatText(text) {
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g)

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return <code key={index}>{token.slice(1, -1)}</code>
    }
    return token
  })
}

function RecipeContent({ text }) {
  const lines = text.split(/\r?\n/).map((line) => line.trim())
  const content = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line) {
      index += 1
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      const Tag = heading[1].length < 3 ? 'h2' : 'h3'
      content.push(
        <Tag className="mt-5 text-[17px] font-semibold first:mt-0" key={index}>
          {formatText(heading[2])}
        </Tag>,
      )
      index += 1
      continue
    }

    if (/^([-*_]\s*){3,}$/.test(line)) {
      content.push(<hr className="my-4 border-[#e6f2e8]" key={index} />)
      index += 1
      continue
    }

    const firstItem = line.match(/^([-*+]|\d+\.)\s+(.+)$/)
    if (firstItem) {
      const ordered = /^\d+\./.test(firstItem[1])
      const items = []

      while (index < lines.length) {
        if (!lines[index]) {
          index += 1
          continue
        }

        const item = lines[index].match(/^([-*+]|\d+\.)\s+(.+)$/)
        if (!item || /^\d+\./.test(item[1]) !== ordered) break

        items.push(item[2])
        index += 1
      }

      const List = ordered ? 'ol' : 'ul'
      content.push(
        <List
          className={`mt-2 space-y-2 pl-6 ${
            ordered ? 'list-decimal' : 'list-disc'
          }`}
          key={index}
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{formatText(item)}</li>
          ))}
        </List>,
      )
      continue
    }

    const paragraph = [line]
    index += 1
    while (
      index < lines.length &&
      lines[index] &&
      !/^(#{1,6}\s+|[-*+]\s+|\d+\.\s+|([-*_]\s*){3,}$)/.test(lines[index])
    ) {
      paragraph.push(lines[index])
      index += 1
    }

    content.push(
      <p className="mt-3 leading-7 text-[#4b5c66]" key={index}>
        {formatText(paragraph.join(' '))}
      </p>,
    )
  }

  return content
}

function GeneratedRecipeCard({ recipe }) {
  return (
    <article
      aria-label="AI-generated recipe"
      className="overflow-hidden rounded-[20px] border border-[#d7edda] bg-white shadow-[0_8px_20px_rgba(29,61,39,0.1)]"
    >
      <header className="flex items-center gap-2 border-b border-[#e8f5e9] bg-[#fbfffd] px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5e9] text-[#4caf50]">
          <LuSparkles aria-hidden="true" size={18} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4caf50]">
            AI-generated recipe
          </p>
          <p className="text-[13px] text-[#607587]">Made with your ingredients</p>
        </div>
      </header>
      <div className="px-5 py-5 text-[14px] sm:px-7 sm:py-7">
        <RecipeContent text={recipe} />
      </div>
    </article>
  )
}

export default GeneratedRecipeCard
