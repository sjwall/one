export async function generateStaticParams() {
  // const frontmatters = getAllFrontmatter('data/docs')
  // const paths = frontmatters.map(({ slug }) => ({
  //   slug,
  // }))
  // return paths
}

export async function loader({ params }) {
  // const { frontmatter, code } = await getMDXBySlug('data/docs', params.slug)
  // return {
  //   frontmatter,
  //   code,
  // }
}

export default function DocPage() {
  // const { code, frontmatter } = useLoader(loader)
  // const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      {/* <HeadInfo title={`${frontmatter.title}`} description={frontmatter.description} />
      <H1>{nbspLastWord(frontmatter.title)}</H1>
      <SubTitle>{nbspLastWord(frontmatter.description || '')}</SubTitle>
      <Component components={components as any} /> */}
    </>
  )
}
