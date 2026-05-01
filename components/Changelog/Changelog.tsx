import './style.css'

interface ChangelogProps {
  version: string
  changelog: string
  urlReleaseInfo: string
}

export default function Changelog({
  version,
  changelog,
  urlReleaseInfo,
}: ChangelogProps) {
  return (
    <div className="surface-panel mt-4 p-5 sm:p-6">
      <h3 className="text-center text-xl font-semibold tracking-[-0.04em]">
        {version} Changelog
      </h3>
      <div
        className="markdown-content p-4 sm:p-6"
        dangerouslySetInnerHTML={{ __html: changelog }}
      />
      <div className="markdown-content">
        <a href={urlReleaseInfo} className="block text-center mt-2">
          View full changelog
        </a>
      </div>
    </div>
  )
}
