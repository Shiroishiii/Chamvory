
interface PageTitleProps {
    title: string
    description?: string
    action?: React.ReactNode
}

function PageTitle({ title, description, action }: PageTitleProps) {
    return (
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-[#9CA3AF]">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="flex items-center gap-2">
                    {action}
                </div>
            )}
        </div>
    )
}

export default PageTitle
