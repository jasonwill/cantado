import React from 'react'
import * as stylex from '@stylexjs/stylex'
import { CantoItem, CantoFullTree, CantoAlbumResult, CantoAlbumChildren, CantoUrl } from '@/utils/canto.types'
import { CantoTree } from '@/components/CantoTree'

const albums = stylex.create({
  
})


export default async function Page() {
  let data!: CantoFullTree

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


  const cantoItems: CantoItem[] = data.results;
  return (
    <div>
      <h1>Canto Image Albums</h1>
      <ul>
        <CantoTree items={cantoItems} />
      </ul>
    </div>
  )
}
