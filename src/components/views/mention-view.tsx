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
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs text-gray-500 border-t border-gray-200 z-10">
            <p className="mb-1">Hecho con ❤️ por los ACL's de Cloud Computing</p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                { contributors.map((contributor) => (
                    <a
                        key={ contributor.github }
                        href={ `https://github.com/${ contributor.github }` }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:text-gray-800 transition-colors text-[10px] sm:text-xs"
                    >
                        <Github className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1"/>
                        { contributor.name }
                    </a>
                )) }
            </div>
        </div>
    )
}

