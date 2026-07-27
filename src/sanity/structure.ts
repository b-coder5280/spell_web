import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SPELL Website Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      S.listItem()
        .title('Page Settings')
        .child(
          S.list()
            .title('Page Settings')
            .items([
              S.listItem()
                .title('Home Page')
                .id('homePage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page')
                ),
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
                .title('Opening Page')
                .id('opening')
                .child(
                  S.document()
                    .schemaType('opening')
                    .documentId('opening')
                    .title('Opening Page')
                ),
              S.listItem()
                .title('Research Page')
                .id('researchPage')
                .child(
                  S.document()
                    .schemaType('researchPage')
                    .documentId('researchPage')
                    .title('Research Page')
                ),
              S.listItem()
                .title('Members Page')
                .id('membersPage')
                .child(
                  S.document()
                    .schemaType('membersPage')
                    .documentId('membersPage')
                    .title('Members Page')
                ),
              S.listItem()
                .title('News Page')
                .id('newsPage')
                .child(
                  S.document()
                    .schemaType('newsPage')
                    .documentId('newsPage')
                    .title('News Page')
                ),
              S.listItem()
                .title('Gallery Page')
                .id('galleryPage')
                .child(
                  S.document()
                    .schemaType('galleryPage')
                    .documentId('galleryPage')
                    .title('Gallery Page')
                ),
              S.listItem()
                .title('Publications Page')
                .id('publicationPage')
                .child(
                  S.document()
                    .schemaType('publicationPage')
                    .documentId('publicationPage')
                    .title('Publications Page')
                ),
            ])
        ),

      S.divider(),

      // --- COLLECTIONS ---
      S.listItem()
        .title('Content Collections')
        .child(
          S.list()
            .title('Content Collections')
            .items([
              S.documentTypeListItem('news').title('News'),
              S.documentTypeListItem('member').title('Members'),
              S.documentTypeListItem('gallery').title('Gallery'),
              S.documentTypeListItem('publication').title('Publications'),
              S.documentTypeListItem('research').title('Research'),
            ])
        ),
    ])
