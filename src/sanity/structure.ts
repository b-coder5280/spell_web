import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SPELL Website Content')
    .items([
      // --- SINGLETONS ---
      S.listItem()
        .title('Pages (Singletons)')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Professor Page')
                .id('professor')
                .child(
                  S.document()
                    .schemaType('professor')
                    .documentId('professor')
                    .title('Professor Page')
                ),
              S.listItem()
                .title('Opening & Home Page')
                .id('opening')
                .child(
                  S.document()
                    .schemaType('opening')
                    .documentId('opening')
                    .title('Opening & Home Page')
                ),
            ])
        ),

      S.divider(),

      // --- COLLECTIONS ---
      S.listItem()
        .title('Collections')
        .child(
          S.list()
            .title('Collections')
            .items([
              S.documentTypeListItem('news').title('News'),
              S.documentTypeListItem('member').title('Members'),
              S.documentTypeListItem('gallery').title('Gallery'),
              S.documentTypeListItem('publication').title('Publications'),
              S.documentTypeListItem('research').title('Research'),
            ])
        ),
    ])
