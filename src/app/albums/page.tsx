import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import Link from 'next/link'

import { buildTree, CantoItem, TreeNode, TreeNodeProps } from '@/lib/buildtree'

const album = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)',
    padding: '1rem',
  },
  overview: {
    padding: '1rem',
  },
  container: {
    maxWidth: '100rem',
    marginInline: 'auto',
    paddingInline: '2rem',
  },
  stacked: {
    display: 'grid',
  },
  stackedChild: {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
  },
  card: {
    aspectRatio:'1.5',
  },
  cardContent: {
    background: 'white',
    alignSelf: 'end',
    margin: '0.2rem 0.5rem 3rem',
    padding: '0.3rem',
  },
  gallery: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    objectFit: 'cover',
    aspectRatio: '1.5',
    position: 'relative !important',
    height: 'auto',
    inlineSize: '100%',
  },
})

const RenderTreeNode: React.FC<TreeNodeProps> = ({ node }) => (
  <li>
    <div>
      <strong>{node.name}</strong>
    </div>
    {node.children.length > 0 && (
      <ul>
        {node.children.map((child) => (
          <RenderTreeNode key={child.id} node={child} />
        ))}
      </ul>
    )}
  </li>
);

export default async function Page() {
  const header = (
    <>
      <div {...stylex.props(album.logo)}>
        <Image
          alt='simple logo'
          width={492 / 8}
          height={492 / 8}
          src=''
        />
      </div>
      <h1>Canto Gallery (Cantado) </h1>
    </>
  )

  interface FullTree {
    sortBy: string
    sortDirection: string
    results: Result[]
  }

  interface Result {
    time: string
    name: string
    id: string
    size: string
    scheme: string
    owner: string
    children: Children[]
    url: Url3
    created: string
    width: string
    height: string
    dpi: string
    idPath: string
    namePath: string
    ownerName: string
  }

  interface Children {
    time: string
    name: string
    id: string
    size: string
    scheme: string
    owner: string
    url: Url
    created: string
    width: string
    height: string
    dpi: string
    idPath: string
    namePath: string
    ownerName: string
    children?: Children2[]
  }

  interface Url {
    preview?: string
    detail: string
  }

  interface Children2 {
    time: string
    name: string
    id: string
    size: string
    scheme: string
    owner: string
    url: Url2
    created: string
    width: string
    height: string
    dpi: string
    idPath: string
    namePath: string
    ownerName: string
  }

  interface Url2 {
    preview: string
    detail: string
  }

  interface Url3 {
    detail: string
  }

  let data!: FullTree

  try {
    const res = await fetch(`https://${process.env.CANTO_BASE}/api/v1/tree/?sortBy=time&sortDirection=ascending&layer=-1`, 
      {
        headers: {
            "Authorization": (`Bearer ${process.env.CANTO_TOKEN}`),
          },
      }
    );

    data = await res.json();
    // console.log(JSON.stringify(data,null,2));

  } catch (err) { 
    console.log(err);
  }

  // const cantoItems: CantoItem[] = data.results;
  const cantoItems: CantoItem[] = [data.results[0]];
  const tree = buildTree(cantoItems);
  //console.log(JSON.stringify(tree,null,2));
  
  return (
    <div>
      {header}
      <div>
        <h1>Tree Structure</h1>
        <ul>
          <RenderTreeNode node={tree} />
        </ul>
      </div>
    </div>
  );
}
