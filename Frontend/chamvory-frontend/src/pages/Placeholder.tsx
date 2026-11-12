
type Props = {
    title: string
}

function Placeholder({ title }: Props) {
    return (
        <section className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
                {title}
            </h1>

            <p className="text-sm text-gray-500">
                Esta tela será desenvolvida em breve.
            </p>
        </section>
    )
}

export default Placeholder
