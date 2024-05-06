export async function getData() {
   const res = await fetch('https://willamette.canto.com/api/v1/album/INH96?sortBy=time&sortDirection=ascending&start=0&limit=100', 
     {
       headers: {
           "Authorization": ("Bearer 21e6d75cc8054b458430183d222d664e"),
         },
     }
   )
   // The return value is *not* serialized
 
   if (!res.ok) {
   // This will activate the closest `error.js` Error Boundary
   throw new Error('Failed to fetch data')
   }
   const data = res.json();

   return data;
}