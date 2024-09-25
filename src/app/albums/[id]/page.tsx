import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'

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

export default async function Page({ params }: { params: { id: string } }) {
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

  interface Canto {
    access_token: string,
    results: [
      {
        id: string,
        name: string,
        additional: Additional,
        url: ResultURL,
      }
    ]
  }
  
  interface Additional {
    Major: string,
    "Student Name": string,
    Medium: null,
    "Graduation Year": string,
    "Title of work": null,
  }

  interface ResultURL {
    directUrlOriginal: string,
    directUrlPreview:  string,
  }

  let data!: Canto

  try {

    const token = await fetch(`https://${process.env.CANTO_OAUTH_BASE}/oauth/api/oauth2/compatible/token?app_id=${process.env.CANTO_APP_ID}&app_secret=${process.env.CANTO_APP_SECRET}&grant_type=client_credentials`,
      {
        method: "post",
      }
    ) 
    data = await token.json();

    const res = await fetch(`https://${process.env.CANTO_BASE}/api/v1/album/${params.id}?approvalStatus=approved&sortBy=time&sortDirection=descending&start=0&limit=100`, 
      {
        headers: {
            "Authorization": (`Bearer ${data.access_token}`),
          },
      }
    );

    const env = process.env.NODE_ENV

    if(env == "development"){
      data = await res.json();
    }
    else {
      data = await res.json();
      //JSON.parse("{}");
    }

  } catch (err) { 
    console.log(err);
  }

  const albumItems = data.results?.map((item) => (
      <div key={item?.id} {...stylex.props(album.card, album.stacked)}>
       
        <div {...stylex.props(album.imageContainer)}>
          <Image
            {...stylex.props(album.image)}
            alt={`${item.additional["Student Name"]} ${item.additional["Graduation Year"]}`}
            src={item.url.directUrlPreview}
            layout='fill'
            loading='lazy'
          ></Image>
        </div>
        <div {...stylex.props(album.cardContent)}>
          <h2>{item.name}</h2>
        </div>
      
      </div>
  ));

  return (
    <div>
      {header}
      <div {...stylex.props(album.container)}>
        <div {...stylex.props(album.gallery)}>
          {albumItems}
        </div>
      </div>
      {/* <pre>{JSON.stringify(data.results,null,2)}</pre> */}
    </div>
  );
}
