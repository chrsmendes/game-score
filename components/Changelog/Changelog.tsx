import './style.css'

interface ChangelogProps {
  version: string
  changelog: string
}

export default function Changelog({ version, changelog }: ChangelogProps) {
  return (
    <div className="mt-2 p-2 shadow-lg rounded-lg">
      <h3 className="font-bold text-center">{version} Changelog:</h3>
      <div
        className="markdown-content p-6"
        dangerouslySetInnerHTML={{ __html: changelog }}
      />
    </div>
  )
}
