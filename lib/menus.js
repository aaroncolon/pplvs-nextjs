const menuPrimary = JSON.parse(JSON.stringify([
  {
    slug: "vaccines",
    label: "Vaccines",
    children: [
      {
        slug: "studies",
        label: "Studies"
      },
      {
        slug: "cdcs-unpublished-verstraeten-study",
        label: "CDC's Unpublished Verstraeten Study"
      },
      {
        slug: "videos",
        label: "Videos"
      },
      {
        slug: "vital-statistics-rates",
        label: "Vital Statistics Rates"
      },
      {
        slug: "inserts",
        label: "Vaccine Inserts"
      },
      {
        slug: "schedules",
        label: "Vaccine Schedule History"
      },
      {
        slug: "ingredients",
        label: "Vaccine Ingredients"
      },
      {
        slug: "lawsuits",
        label: "Lawsuits"
      },
      {
        slug: "foia-requests",
        label: "FOIA Requests"
      },
      {
        slug: "legislation",
        label: "Legislation"
      },
      {
        slug: "patents",
        label: "Vaccine Patents"
      },
      {
        slug: "resources",
        label: "Resources"
      }
    ]
  },
  {
    slug: "emf",
    label: "EMF",
    children: []
  },
  {
    slug: "water",
    label: "Water",
    children: []
  },
  {
    slug: "covid-19",
    label: "C19",
    children: [
      {
        slug: "articles",
        label: "Articles",
        hide: false,
        skipCatchAll: true
      },
      {
        slug: "videos",
        label: "Videos",
        hide: true,
        skipCatchAll: true
      }
    ]
  }
]))

export {
  menuPrimary
}

