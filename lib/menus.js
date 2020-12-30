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
        label: "CDC's Vax vs Unvax Studies"
      },
      {
        slug: "national-vaccine-injury-compensation-program",
        label: "National Vaccine Injury Compensation Program"
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
        slug: "clean-vaccines",
        label: "Clean Vaccines"
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
      },
      {
        slug: "news",
        label: "News",
        hide: false,
        skipCatchAll: true
      },
      {
        slug: "share",
        label: "Shareable Images"
      }
    ]
  },
  {
    slug: "emf",
    label: "EMF (5G, 4G, WiFi, +)",
    children: [
      {
        slug: "studies",
        label: "Studies"
      },
      {
        slug: "resources",
        label: "Resources"
      },
      {
        slug: "videos",
        label: "Videos"
      },
      {
        slug: "news",
        label: "News",
        hide: false,
        skipCatchAll: true
      }
    ]
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
        slug: "resources",
        label: "Resources",
        hide: false,
        skipCatchAll: false
      },
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
  },
  {
    slug: "grounding",
    label: "Grounding",
    children: [
      {
        slug: "studies",
        label: "Studies"
      },
      {
        slug: "videos",
        label: "Videos"
      }
    ]
  }
]))

export {
  menuPrimary
}
