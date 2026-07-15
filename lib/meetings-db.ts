import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-06-14",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",

    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },

    openingPrayer: "Sister Williams",

    wardBusiness: [
      {
        description: "Sustaining of new Primary President",
      },
    ],

    stakeBusiness: false,

    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },

    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],

    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },

    closingPrayer: "Brother Davis",

    announcements: ["Ward temple night - May 10"],
  },

  {
    id: 2,
    date: "2026-06-21",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Adams",

    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },

    openingPrayer: "Brother Lewis",

    wardBusiness: [],

    stakeBusiness: false,

    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray",
    },

    speakers: [],

    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },

    closingPrayer: "Sister Clark",

    announcements: ["Fast Offering donations today"],
  },

  {
    id: 3,
    date: "2026-06-28",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Hill",

    openingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },

    openingPrayer: "Brother Taylor",

    wardBusiness: [
      {
        description: "Release of Young Women President",
      },
    ],

    stakeBusiness: false,

    sacramentHymn: {
      number: 188,
      title: "Thy Will, O Lord, Be Done",
    },

    speakers: [
      {
        name: "Brother Wilson",
        topic: "Charity",
        type: "speaker",
      },
      {
        name: "Sister Green",
        topic: "Service",
        type: "speaker",
      },
    ],

    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },

    closingPrayer: "Brother White",

    announcements: ["Ward picnic next Saturday"],
  },

  {
    id: 4,
    date: "2026-07-05",
    meetingType: "stake",
    presiding: "Stake President Johnson",
    conducting: "Counselor Brown",

    openingHymn: {
      number: 3,
      title: "Now Let Us Rejoice",
    },

    openingPrayer: "Brother Hall",

    wardBusiness: [],

    stakeBusiness: true,

    sacramentHymn: {
      number: 174,
      title: "While of These Emblems We Partake",
    },

    speakers: [
      {
        name: "Stake President Johnson",
        topic: "Strengthening Families",
        type: "speaker",
      },
    ],

    closingHymn: {
      number: 124,
      title: "Be Still, My Soul",
    },

    closingPrayer: "Sister Young",
  },

  {
    id: 5,
    date: "2026-07-12",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Evans",

    openingHymn: {
      number: 100,
      title: "Nearer, My God, to Thee",
    },

    openingPrayer: "Sister Martin",

    wardBusiness: [],

    stakeBusiness: false,

    sacramentHymn: {
      number: 190,
      title: "In Memory of the Crucified",
    },

    speakers: [
      {
        name: "Brother Carter",
        topic: "Prayer",
        type: "speaker",
      },
    ],

    closingHymn: {
      number: 136,
      title: "I Know That My Redeemer Lives",
    },

    closingPrayer: "Brother Nelson",

    announcements: ["Missionary fireside Sunday evening"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
