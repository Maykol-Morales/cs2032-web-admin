import { Github } from "lucide-react"

type ContributorData = {
    name: string
    github: string
}

const contributors: ContributorData[] = [
    { name: "Maykol ", github: "JustMaykol" },
    { name: "Sebastian", github: "Urbisin" }
]

export function MentionView() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-2 px-4 text-center text-xs text-gray-500 border-t border-gray-200">
            <p className="mb-1">Made with ❤️ by ACL's of Cloud Computing</p>
            <div className="flex flex-wrap justify-center gap-2">
                { contributors.map((contributor) => (
                    <a
                        key={ contributor.github }
                        href={ `https://github.com/${ contributor.github }` }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:text-gray-800 transition-colors"
                    >
                        <Github className="h-3 w-3 mr-1"/>
                        { contributor.name }
                    </a>
                )) }
            </div>
        </div>
    )
}

