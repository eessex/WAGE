# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
fee_cat_1 = FeeCategory.create(name: "Solo Exhibition", description: "An exhibition focused on a single artist. It may extend across a full floor or a series of spaces or include a series of programs. It may involve existing, new and commissioned work and often involves the presentation of a number of different works and the publication of a catalog. A Solo Exhibition is defined as inclusive of a range of content and services, including some of the categories listed below (performances, programming, screenings).", floor_fee: 1000, fee_subtitle: "", over500K: ".002")
fee_cat_2 = FeeCategory.create(name: "Solo Project", description: "The presentation of commissioned work by a single artist that comprises a single work, body of work or project.", floor_fee: 600, fee_subtitle: "", over500K: ".0012")
fee_cat_3 = FeeCategory.create(name: "2-Person Exhibition", description: "An exhibition focused on the work of two artists. This may involve existing, new or commissioned work.", floor_fee: 500, fee_subtitle: "/artist", over500K: ".001")
fee_cat_4 = FeeCategory.create(name: "Group Exhibition, 3-5 Artists", description: "An exhibition focused on the work of three to five artists. This includes works of performance.", floor_fee: 250, fee_subtitle: "/artist", over500K: ".0005")
fee_cat_5 = FeeCategory.create(name: "Group Exhibition, 6+ Artists", description: "An exhibition focused on the work of six or more artists, including a recurring survey exhibition such as a biennial. This includes works of performance.", floor_fee: 150, fee_subtitle: "/artist", over500K: ".0003")
fee_cat_6 = FeeCategory.create(name: "Performance of Existing Work", description: "Fee is for each performance of an existing work. Fees in this category are paid to the Contracted Artist. For fees to other performers see 'Day Rate for Performers'.", floor_fee: 300, fee_subtitle: "", over500K: ".0006")
fee_cat_7 = FeeCategory.create(name: "Performance, Commission of New Work", description: "A new performance work commissioned by a host institution. Fees in this category are paid to the Contracted Artist. Fees to other performers are dispensed under 'Day Rate for Performers'.", floor_fee: 600, fee_subtitle: "", over500K: ".0012")
fee_cat_8 = FeeCategory.create(name: "Solo Screening", description: "The screening of a film or video accompanied by an in-person appearance by the artist. The continuous screening of a film or video in an exhibition is covered under exhibition categories listed above. In the case of both single and continuous screening, institutions are not required to pay an artist fee if a fee is paid to a distributor.", floor_fee: 100, fee_subtitle: "", over500K: ".0002")
fee_cat_9 = FeeCategory.create(name: "Event with Multiple Participants", description: "A single event with three or more artists. This may take the form of a presentation of discrete works including but not limited to performance, screening, or reading, or it may be a panel discussion.", floor_fee: 100, fee_subtitle: "", over500K: ".0002")
fee_cat_10 = FeeCategory.create(name: "Artist Talk or Reading", description: "The delivery by a single participant of an existing lecture or visual presentation of works, or the reading of a text to an audience.", floor_fee: 150, fee_subtitle: "", over500K: ".0003")
fee_cat_11 = FeeCategory.create(name: "Lecture/Seminar/Workshop", description: "The delivery of a new keynote presentation, new lecture or a new interactive seminar or workshop by an artist.", floor_fee: 250, fee_subtitle: "", over500K: ".0005")
fee_cat_12 = FeeCategory.create(name: "Existing Text for Publication", description: "The reprinting of an existing text in a publication issued by an organization.", floor_fee: 50, fee_subtitle: " or $0.25/word", over500K:"0.075")
fee_cat_13 = FeeCategory.create(name: "Commissioned Text for Publication", description: "A new essay or text commissioned for publication by an organization. (Copyright remains with the artist/author: payment of a fee does not render the commission 'work for hire.')", floor_fee: 0.25, fee_subtitle: "/word", over500K:"0.75")
fee_cat_14 = FeeCategory.create(name: "Day Rate for Performers", description: "Fees paid to performers participating in commissioned and existing performances created by the Contracted Artist. Fees are paid to performers directly by the organization.", floor_fee: 20, fee_subtitle: "/hour or $100/day", over500K:"200")

org_1 = User.new(institution_name: "Test Organization One", email: "eve.essex+test1@gmail.com", password: "password", password_confirmation: "password")
org_2 = User.new(institution_name: "Test Organization One", email: "eve.essex+test2@gmail.com", password: "password", password_confirmation: "password")

org_1.skip_confirmation!
org_2.skip_confirmation!
org_1.save!
org_2.save!
