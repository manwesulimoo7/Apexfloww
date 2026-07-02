/* ============================================================
   APEXFLOW :: CATALOG  (all learning content lives here)
   Every item is tagged so one bank can feed many exams + levels.
   level: A1 A2 B1 B2 C1 C2   |   exams: which exams use it
============================================================ */

export const BANDS = [
  { xp: 0,    band: "5.0", toefl: 35  },
  { xp: 70,   band: "5.5", toefl: 46  },
  { xp: 160,  band: "6.0", toefl: 60  },
  { xp: 280,  band: "6.5", toefl: 79  },
  { xp: 430,  band: "7.0", toefl: 94  },
  { xp: 610,  band: "7.5", toefl: 102 },
  { xp: 820,  band: "8.0", toefl: 110 },
  { xp: 1060, band: "8.5", toefl: 115 },
  { xp: 1340, band: "9.0", toefl: 120 },
];

/* ---------- MODULE A :: lexical pairs (C1/C2) ---------- */
export const LEXICAL = [
  { w: "ambiguous", a: "equivocal", d: ["explicit", "transparent", "decisive"],
    tr: "Doğru: 'equivocal' de 'ambiguous' gibi birden fazla yoruma açık / belirsiz demek. Tuzak: 'explicit' (açık-seçik) tam zıt anlamdır — sesçe yakın değil ama anlamca karşıt çeldirici." },
  { w: "corroborate", a: "substantiate", d: ["refute", "undermine", "fabricate"],
    tr: "Doğru: ikisi de bir iddiayı kanıtla 'desteklemek'. Tuzak: 'refute' (çürütmek) en sevilen kapan — kanıt bağlamında zıt yöne çeker." },
  { w: "mitigate", a: "alleviate", d: ["exacerbate", "aggravate", "intensify"],
    tr: "Doğru: 'alleviate' = hafifletmek, tıpkı 'mitigate'. Tuzak: 'exacerbate' (kötüleştirmek) sınavlarda mitigate ile sürekli karıştırılan kutup-zıttıdır." },
  { w: "ubiquitous", a: "pervasive", d: ["scarce", "localised", "transient"],
    tr: "Doğru: her yerde bulunan / yaygın. Tuzak: 'scarce' (kıt) zıttır; 'localised' (yerel) kapsamı daraltarak yanıltır." },
  { w: "ephemeral", a: "transient", d: ["enduring", "perpetual", "permanent"],
    tr: "Doğru: kısa ömürlü, geçici. Tuzak: 'enduring/permanent' kalıcılık bildirir — zıt kutup." },
  { w: "tenuous", a: "flimsy", d: ["robust", "compelling", "substantial"],
    tr: "Doğru: zayıf, çürük (ör. kanıt/bağlantı). Tuzak: 'compelling' (ikna edici) kanıt bağlamında olumlu çağrışımla saptırır." },
  { w: "nascent", a: "incipient", d: ["mature", "established", "declining"],
    tr: "Doğru: yeni doğan, başlangıç hâlinde. Tuzak: 'established' (yerleşik) gelişim çizgisinin karşı ucudur." },
  { w: "contentious", a: "controversial", d: ["undisputed", "settled", "unanimous"],
    tr: "Doğru: tartışmalı. Tuzak: 'undisputed/settled' uzlaşıyı ima eder — anlamca ters." },
  { w: "elucidate", a: "clarify", d: ["obscure", "confound", "complicate"],
    tr: "Doğru: aydınlatmak, açıklığa kavuşturmak. Tuzak: 'obscure' (belirsizleştirmek) zıt fiildir." },
  { w: "proliferate", a: "burgeon", d: ["dwindle", "diminish", "stagnate"],
    tr: "Doğru: hızla çoğalmak. Tuzak: 'dwindle/diminish' azalma yönündedir — kapan." },
  { w: "precarious", a: "unstable", d: ["secure", "robust", "stable"],
    tr: "Doğru: dengesiz, tehlikeli. Tuzak: 'stable/secure' güvenli durumu anlatır — zıt." },
  { w: "conducive", a: "favourable", d: ["detrimental", "hostile", "prohibitive"],
    tr: "Doğru: (bir şeye) elverişli. Tuzak: 'detrimental' (zararlı) sonuç bağlamında ters yön." },
  { w: "arduous", a: "laborious", d: ["effortless", "trivial", "leisurely"],
    tr: "Doğru: çok zahmetli, yorucu. Tuzak: 'effortless' (zahmetsiz) tam zıttır." },
  { w: "pivotal", a: "seminal", d: ["peripheral", "trivial", "incidental"],
    tr: "Doğru: dönüm noktası niteliğinde, çok önemli. Tuzak: 'peripheral' (ikincil/çevresel) önemi düşürür." },
  { w: "innate", a: "inherent", d: ["acquired", "learned", "external"],
    tr: "Doğru: doğuştan, içsel. Tuzak: 'acquired/learned' sonradan kazanılmayı anlatır — kavramsal zıt." },
  { w: "cogent", a: "compelling", d: ["specious", "dubious", "tenuous"],
    tr: "Doğru: (argüman) güçlü ve ikna edici. Tuzak: 'specious' (görünüşte doğru ama aldatıcı) çok ince bir akademik kapandır." },
  { w: "juxtapose", a: "contrast", d: ["conflate", "merge", "equate"],
    tr: "Doğru: yan yana koyup karşılaştırmak. Tuzak: 'conflate' (birbirine karıştırmak) ters işlemdir." },
  { w: "opaque", a: "impenetrable", d: ["lucid", "transparent", "evident"],
    tr: "Doğru: anlaşılması güç, geçirimsiz. Tuzak: 'lucid/transparent' berraklık bildirir — zıt." },
];

/* ---------- MODULE B :: reading passages (C1/C2, ~400 words) ---------- */
export const PASSAGES = [
  {
    id: "p1",
    title: "Anthropological Impacts of Steppe Empires",
    paras: [
      { id: "A", text: "For centuries, historians inherited a tidy opposition between the 'civilised' agrarian state and the 'barbarian' nomad, the former productive and orderly, the latter rapacious and destructive. Recent scholarship has dismantled this dichotomy almost entirely. The great steppe confederations — from the Scythians to the Xiongnu and, later, the Mongols — are now understood as sophisticated political economies, capable of mobilising labour, administering tribute, and sustaining diplomatic relations across vast distances." },
      { id: "B", text: "Central to steppe power was an intimate relationship with the horse. The composite bow, fired from horseback at a gallop, granted nomadic armies a mobility and reach that infantry-based states struggled to counter. The advantage was not merely tactical but logistical, since a mounted force could traverse terrain and cover distances that confounded its sedentary rivals. Settled empires, from Han China to Rome, were repeatedly compelled to reorganise their own armies around cavalry in response." },
      { id: "C", text: "Yet the nomads were never simply predators. As masters of the routes that threaded the Eurasian interior, they served as indispensable intermediaries of long-distance trade. Goods, technologies and beliefs travelled along the arteries they controlled and protected, often in exchange for tariffs. The transmission of religions across Central Asia, and the movement of techniques and commodities in both directions, owed much to the security that nomadic powers could impose upon otherwise perilous corridors." },
      { id: "D", text: "The same networks that carried silk and silver also carried microbes. The intensification of contact between distant populations is increasingly implicated in the spread of pathogens, and several scholars have linked the movement of peoples across the steppe to the diffusion of plague. Genetic studies, meanwhile, reveal extensive admixture, a reminder that the steppe was a zone of biological as well as commercial exchange." },
      { id: "E", text: "Caution is nonetheless warranted. Almost everything once written about the nomads was composed by their sedentary enemies, whose accounts were rarely disinterested. Archaeology has begun to redress this imbalance, but it cannot fully recover the perspective of peoples who left few texts of their own. Even the names by which these peoples are known often derive from outsiders rather than from any term they used for themselves." },
    ],
    headingOptions: [
      { k: "i",   t: "A Reassessment of an Old Prejudice" },
      { k: "ii",  t: "The Mechanics of Mounted Supremacy" },
      { k: "iii", t: "Conduits of Commerce and Culture" },
      { k: "iv",  t: "Unintended Biological Consequences" },
      { k: "v",   t: "The Limits of the Written Record" },
      { k: "vi",  t: "Climate as the Prime Mover" },
      { k: "vii", t: "The Domestication of Cattle" },
    ],
    headingItems: [
      { para: "A", ans: "i",   tr: "A paragrafı eski 'medeni vs. barbar' önyargısını yıkıyor → 'A Reassessment of an Old Prejudice'. (vi/vii hiç geçmeyen çeldiricilerdir.)" },
      { para: "B", ans: "ii",  tr: "B at, kompozit yay ve süvari üstünlüğünü anlatır → 'Mounted Supremacy'." },
      { para: "C", ans: "iii", tr: "C ticaret ve kültür aktarımındaki aracılık rolünü işler → 'Conduits of Commerce and Culture'." },
      { para: "D", ans: "iv",  tr: "D salgın ve genetik karışım gibi istenmeyen biyolojik sonuçları konu eder → 'Biological Consequences'." },
      { para: "E", ans: "v",   tr: "E kaynakların düşmanlarca yazıldığını, kayıtların sınırlılığını vurgular → 'Limits of the Written Record'." },
    ],
    tfng: [
      { stmt: "The traditional contrast between settled and nomadic peoples has largely been rejected by modern historians.",
        ans: "TRUE",
        xray: ["largely been rejected"],
        tr: "Doğru: TRUE. A'da 'dismantled this dichotomy almost entirely' ifadesi tam karşılığıdır. Tuzak: 'almost entirely' ile 'largely' örtüşür; ifadeyi NOT GIVEN sanmak için sebep yoktur." },
      { stmt: "Sedentary states were forced to adapt their military organisation because of the steppe threat.",
        ans: "TRUE",
        xray: ["forced to adapt"],
        tr: "Doğru: TRUE. B: 'compelled to reorganise their own armies around cavalry in response.' 'compelled' ≈ 'forced'." },
      { stmt: "Nomadic groups charged fees in return for protecting trade routes.",
        ans: "TRUE",
        xray: ["charged fees in return"],
        tr: "Doğru: TRUE. C: 'in exchange for tariffs' + 'security ... upon ... corridors' = korumaya karşılık ücret." },
      { stmt: "Steppe nomads deliberately spread disease in order to weaken their enemies.",
        ans: "NOT GIVEN",
        xray: [],
        tr: "Doğru: NOT GIVEN. Metin salgının ağlar yoluyla yayıldığını söyler ama 'deliberately / to weaken enemies' (kasıt) hakkında HİÇBİR ŞEY söylemez. Tuzak: salgından bahsedildiği için TRUE demek — niyet eklemesi metinde yok, bu yüzden FALSE de değil NOT GIVEN." },
      { stmt: "Written sources about the nomads were mostly produced by the nomads themselves.",
        ans: "FALSE",
        xray: ["produced by the nomads themselves"],
        tr: "Doğru: FALSE. E açıkça 'composed by their sedentary enemies' der → metinle DOĞRUDAN çelişir, o yüzden NOT GIVEN değil FALSE." },
      { stmt: "Archaeology has completely restored the nomads' own point of view.",
        ans: "FALSE",
        xray: ["completely restored"],
        tr: "Doğru: FALSE. E: 'cannot fully recover the perspective'. Mutlak nicelik tuzağı: 'completely' kelimesi metindeki 'cannot fully' ile çelişir." },
    ],
    insertion: {
      anchorPara: "C",
      sentence: "In this respect, their role was closer to that of brokers than of plunderers.",
      slots: [
        "before \"Yet the nomads were never simply predators.\"",
        "after \"...were never simply predators.\"",
        "after \"...indispensable intermediaries of long-distance trade.\"",
        "after \"...upon otherwise perilous corridors.\"",
      ],
      ans: 2,
      tr: "Doğru: 3. cümle aralığı. 'In this respect' bir önceki cümledeki 'intermediaries' (aracı) fikrine geri gönderir; 'brokers vs plunderers' karşıtlığı bu aracılık rolünü tamamlar. Tuzak: 2. slot da 'predators' ile ilgilidir ama oraya konursa 'In this respect' henüz tanımlanmamış aracılık rolüne atıf yapamaz — bağdaşıklık (cohesion) zinciri kopar." },
    xrayPassage: ["dismantled this dichotomy", "compelled to reorganise", "in exchange for tariffs", "composed by their sedentary enemies", "cannot fully recover"],
  },
  {
    id: "p2",
    title: "The Evolution of Cognitive Psychology",
    paras: [
      { id: "A", text: "For the first half of the twentieth century, behaviourism dominated Anglo-American psychology. Its proponents, most famously B. F. Skinner, insisted that the proper object of study was observable behaviour alone. The mind, on this view, was a 'black box' whose internal workings lay beyond the reach of science; what mattered was the relationship between a stimulus and the response it elicited. Mental states such as belief or intention were dismissed as unverifiable and therefore scientifically idle." },
      { id: "B", text: "The framework began to fracture in the late 1950s. A decisive blow came from the linguist Noam Chomsky, whose 1959 critique argued that the speed and creativity with which children acquire language could not be explained by reinforcement alone. If a child can produce sentences never previously heard, then something more than a history of conditioned responses must be at work within the mind." },
      { id: "C", text: "Into this opening stepped a new metaphor: the mind as a processor of information, akin in some respects to a computer. Researchers proposed that the mind encodes, stores and retrieves representations of the world. George Miller's celebrated paper of 1956 had already suggested that the capacity of immediate memory was strikingly limited, an observation that lent itself naturally to this emerging vocabulary of channels and storage." },
      { id: "D", text: "By 1967, the new approach had acquired both a name and a manifesto in Ulric Neisser's textbook, which gave 'cognitive psychology' its currency. Concepts such as the schema — an organised structure of prior knowledge that guides perception and memory — moved to the centre of the field. The study of unobservable mental processes, so recently dismissed, had become respectable once more." },
      { id: "E", text: "The triumph was not unqualified. Critics later charged that the computer metaphor neglected the body and the environment in which cognition actually unfolds. Neisser himself came to worry that laboratory experiments, however elegant, often lacked ecological validity — that is, they revealed little about how the mind operates outside the controlled conditions of the laboratory." },
    ],
    headingOptions: [
      { k: "i",   t: "The Reign of Observable Behaviour" },
      { k: "ii",  t: "The Challenge to Stimulus and Response" },
      { k: "iii", t: "The Mind as an Information Processor" },
      { k: "iv",  t: "The Consolidation of a Discipline" },
      { k: "v",   t: "Doubts from Within" },
      { k: "vi",  t: "The Neuroscience of Memory" },
      { k: "vii", t: "Behaviourism's Practical Applications" },
    ],
    headingItems: [
      { para: "A", ans: "i",   tr: "A davranışçılığın gözlemlenebilir davranışa odaklı egemenliğini anlatır → 'Reign of Observable Behaviour'. (vi/vii çeldiricidir.)" },
      { para: "B", ans: "ii",  tr: "B Chomsky'nin uyaran-tepki modeline itirazını işler → 'Challenge to Stimulus and Response'." },
      { para: "C", ans: "iii", tr: "C zihni bilgi-işleyen/bilgisayar metaforu üzerinden ele alır → 'Mind as an Information Processor'." },
      { para: "D", ans: "iv",  tr: "D alanın bir ad ve manifesto kazanmasını (Neisser 1967) anlatır → 'Consolidation of a Discipline'." },
      { para: "E", ans: "v",   tr: "E metaforun eleştirisini ve içeriden kuşkuları verir → 'Doubts from Within'." },
    ],
    tfng: [
      { stmt: "Behaviourists believed that internal mental states were not a suitable subject for scientific study.",
        ans: "TRUE",
        xray: ["not a suitable subject for scientific study"],
        tr: "Doğru: TRUE. A: zihinsel durumlar 'dismissed as unverifiable and therefore scientifically idle' — bilime uygun bulunmaz." },
      { stmt: "Chomsky's criticism was based on the way children learn to speak.",
        ans: "TRUE",
        xray: ["based on the way children learn to speak"],
        tr: "Doğru: TRUE. B: 'the speed and creativity with which children acquire language' — çocukların dil edinimi onun temel dayanağıdır." },
      { stmt: "Miller and Chomsky worked together to produce a single critique of behaviourism.",
        ans: "NOT GIVEN",
        xray: [],
        tr: "Doğru: NOT GIVEN. İki isim de geçer, ama birlikte çalıştıklarına dair tek kelime yoktur. Tuzak: aynı paragraf çevresinde anılmaları 'iş birliği' anlamına gelmez — metin bunu ne doğrular ne yalanlar." },
      { stmt: "The term 'cognitive psychology' was popularised by Neisser's 1967 textbook.",
        ans: "TRUE",
        xray: ["popularised"],
        tr: "Doğru: TRUE. D: Neisser'in kitabı terime 'its currency' kazandırdı = yaygınlaştırdı." },
      { stmt: "Neisser remained fully convinced of the value of laboratory experiments throughout his career.",
        ans: "FALSE",
        xray: ["remained fully convinced"],
        tr: "Doğru: FALSE. E: 'came to worry ... lacked ecological validity'. Mutlak ifade tuzağı ('fully / throughout') metindeki kuşkuyla çelişir → FALSE." },
      { stmt: "Critics argued that the computer metaphor placed too much emphasis on the body and the environment.",
        ans: "FALSE",
        xray: ["placed too much emphasis on the body"],
        tr: "Doğru: FALSE. Kutup-tersine-çevirme tuzağı: metin 'neglected the body and the environment' (ihmal etti) der; 'too much emphasis' bunun tam tersidir → FALSE, NOT GIVEN değil." },
    ],
    insertion: {
      anchorPara: "B",
      sentence: "Here, for the first time, was a phenomenon that conditioning seemed unable to explain.",
      slots: [
        "before \"The framework began to fracture...\"",
        "after \"...in the late 1950s.\"",
        "after \"...could not be explained by reinforcement alone.\"",
        "after \"...must be at work within the mind.\"",
      ],
      ans: 3,
      tr: "Doğru: 4. slot. Cümle B'nin argümanını özetler ve bir 'açıklık/boşluk' yaratır; C'nin ilk sözleri 'Into this opening' tam da buna gönderir — yani özet cümle paragrafın SONUNDA olmalı. Tuzak: 3. slot da 'conditioning/reinforcement' ile ilgilidir ama oraya konursa 'If a child...' cümlesini kurgu-açıklamasından koparır." },
    xrayPassage: ["observable behaviour alone", "speed and creativity with which children acquire language", "gave 'cognitive psychology' its currency", "came to worry", "neglected the body and the environment"],
  },

  {
    id: "p3",
    title: "Microplastics and the Ocean",
    paras: [
      { id: "A", text: "Plastic debris in the ocean is not always visible to the naked eye. As larger items are battered by waves and ultraviolet light, they fragment into ever smaller pieces, and particles below five millimetres in length are now classified as microplastics. A second source is so-called primary microplastics — fibres shed from synthetic clothing, or beads once common in cosmetics — which enter waterways already minute." },
      { id: "B", text: "These particles are now found in virtually every marine environment that has been surveyed, from coastal shallows to the floor of the deepest ocean trenches. Their ubiquity is troubling because their small size allows them to be ingested by organisms at the very base of the food web. Once inside these tiny animals, the particles can be passed upward as larger creatures feed on smaller ones." },
      { id: "C", text: "The biological consequences remain only partly understood. Laboratory studies suggest that ingestion can reduce feeding and impair growth in some species, yet extrapolating from controlled experiments to the open sea is notoriously difficult. A further worry is chemical: microplastics can act as sponges, accumulating pollutants from the surrounding water on their surfaces and potentially releasing them once swallowed." },
      { id: "D", text: "Removing microplastics from the ocean at scale is, by common consent, impractical; the particles are too dispersed and too small. Attention has therefore shifted upstream, towards preventing their release in the first place. Bans on cosmetic microbeads, improved filtration at wastewater plants, and the redesign of textiles have all been proposed, with varying degrees of adoption." },
      { id: "E", text: "Public concern has occasionally outrun the evidence. Headlines warning of plastic in drinking water, and even in human blood, have spread rapidly, sometimes faster than any careful assessment of the actual risk. Researchers caution that detecting a substance is not the same as demonstrating harm, and that a proportionate response requires distinguishing genuine hazards from those that are merely alarming." },
    ],
    headingOptions: [
      { k: "i",   t: "Two routes by which fragments arise" },
      { k: "ii",  t: "An ocean-wide presence with food-web entry" },
      { k: "iii", t: "Effects that are real but hard to pin down" },
      { k: "iv",  t: "Tackling the problem at its source" },
      { k: "v",   t: "Alarm outpacing the evidence" },
      { k: "vi",  t: "A cheap and effective clean-up method" },
      { k: "vii", t: "The history of plastic manufacturing" },
    ],
    headingItems: [
      { para: "A", ans: "i",   tr: "A iki kaynağı anlatır: parçalanma + birincil mikroplastikler (lif/boncuk) → 'Two routes'. (vi/vii hiç geçmeyen çeldiricilerdir.)" },
      { para: "B", ans: "ii",  tr: "B okyanusun her yerinde bulunduğunu ve besin zincirine girişini işler → 'ocean-wide presence with food-web entry'." },
      { para: "C", ans: "iii", tr: "C etkilerin gerçek ama belirsiz olduğunu söyler ('only partly understood') → 'real but hard to pin down'." },
      { para: "D", ans: "iv",  tr: "D temizlik yerine kaynağında önlemeye odaklanır → 'Tackling the problem at its source'." },
      { para: "E", ans: "v",   tr: "E kamu kaygısının kanıtı aştığını vurgular → 'Alarm outpacing the evidence'." },
    ],
    tfng: [
      { stmt: "Microplastics are defined as plastic pieces smaller than five millimetres.", ans: "TRUE", xray: ["below five millimetres"],
        tr: "Doğru: TRUE. A: 'particles below five millimetres ... are now classified as microplastics' — tanımın birebir karşılığı." },
      { stmt: "Microplastics can carry pollutants on their surfaces.", ans: "TRUE", xray: ["accumulating pollutants"],
        tr: "Doğru: TRUE. C: 'microplastics can act as sponges, accumulating pollutants ... on their surfaces'." },
      { stmt: "Most of the microplastics in the ocean come from synthetic clothing.", ans: "NOT GIVEN", xray: [],
        tr: "Doğru: NOT GIVEN. A sentetik kıyafeti bir kaynak olarak anar ama 'en çok' / 'most' oranı hakkında hiçbir şey söylemez. Tuzak: kıyafet geçtiği için TRUE demek — nicelik iddiası metinde yok." },
      { stmt: "Microplastics have been found only near coastlines, not in deep ocean areas.", ans: "FALSE", xray: ["floor of the deepest ocean trenches"],
        tr: "Doğru: FALSE. B açıkça 'from coastal shallows to the floor of the deepest ocean trenches' der → metinle DOĞRUDAN çelişir, NOT GIVEN değil." },
      { stmt: "Scientists have fully established the long-term biological effects of microplastics.", ans: "FALSE", xray: ["only partly understood"],
        tr: "Doğru: FALSE. C: 'remain only partly understood'. 'fully established' mutlaklığı metinle çelişir." },
    ],
    insertion: {
      anchorPara: "C",
      sentence: "In other words, the danger may be carried not only by the plastic itself but by whatever clings to it.",
      slots: [
        "before \"The biological consequences remain only partly understood.\"",
        "after \"...impair growth in some species,\"",
        "after \"...is notoriously difficult.\"",
        "after \"...releasing them once swallowed.\"",
      ],
      ans: 3,
      tr: "Doğru: 4. slot. Eklenen cümle 'In other words' ile kimyasal kirletici fikrini özetler; bu fikir ancak 'releasing them once swallowed' cümlesinden SONRA tamamlanır. Tuzak: 3. slot da C içindedir ama oraya konursa henüz kimyasal 'sünger' etkisi anlatılmadan özet yapılmış olur — bağdaşıklık kopar." },
    xrayPassage: ["below five millimetres", "floor of the deepest ocean trenches", "only partly understood", "accumulating pollutants", "impractical", "not the same as demonstrating harm"],
  },
  {
    id: "p4",
    title: "The Economics of Happiness",
    paras: [
      { id: "A", text: "For most of its history, economics took it for granted that rising income was a reliable proxy for rising welfare. If people consistently chose more money over less, then more money, it was assumed, must leave them better off. The business of measuring well-being directly seemed both unnecessary and faintly unscientific." },
      { id: "B", text: "This complacency was disturbed by a finding associated with the economist Richard Easterlin. Within a single country at a given moment, the rich do report greater satisfaction than the poor. Yet as whole nations grew markedly richer over the decades, average reported happiness scarcely budged. The apparent paradox — wealthier individuals seem happier, but wealthier societies are not obviously so — has generated decades of debate." },
      { id: "C", text: "Several explanations have been advanced. One emphasises relative income: what matters is not one's absolute wealth but one's standing compared with others, so that across-the-board growth leaves rankings, and therefore satisfaction, broadly unchanged. Another invokes adaptation: people adjust to improved circumstances with surprising speed, and the pleasure of a gain proves disappointingly short-lived." },
      { id: "D", text: "These ideas have not remained confined to academic journals. A number of governments have begun to compile measures of national well-being alongside the traditional output figures, on the argument that what is measured shapes what is pursued. The intention is not to discard economic growth but to supplement it with indicators that a single monetary total cannot capture." },
      { id: "E", text: "Sceptics remain unconvinced. Self-reported happiness, they object, is slippery: answers shift with mood, with the weather, even with the order in which the questions are asked. Whether such fragile measures can bear the institutional weight now being placed upon them is, for these critics, very much an open question." },
    ],
    headingOptions: [
      { k: "i",   t: "An assumption that went unquestioned" },
      { k: "ii",  t: "A finding that unsettled the consensus" },
      { k: "iii", t: "Competing accounts of the puzzle" },
      { k: "iv",  t: "From theory into public policy" },
      { k: "v",   t: "Doubts about the measure itself" },
      { k: "vi",  t: "A definitive resolution of the debate" },
      { k: "vii", t: "The invention of national accounting" },
    ],
    headingItems: [
      { para: "A", ans: "i",   tr: "A gelirin refahın güvenilir göstergesi sayıldığı sorgulanmamış varsayımı anlatır → 'assumption that went unquestioned'." },
      { para: "B", ans: "ii",  tr: "B Easterlin'in uzlaşıyı sarsan bulgusunu verir → 'a finding that unsettled the consensus'." },
      { para: "C", ans: "iii", tr: "C iki rakip açıklamayı (göreli gelir, adaptasyon) işler → 'Competing accounts of the puzzle'." },
      { para: "D", ans: "iv",  tr: "D fikirlerin hükümet politikasına geçişini anlatır → 'From theory into public policy'." },
      { para: "E", ans: "v",   tr: "E ölçümün kendisine dönük şüpheleri sıralar → 'Doubts about the measure itself'. (vi/vii çeldiricidir.)" },
    ],
    tfng: [
      { stmt: "Economists traditionally assumed that higher income reflected greater welfare.", ans: "TRUE", xray: ["rising income was a reliable proxy"],
        tr: "Doğru: TRUE. A: 'rising income was a reliable proxy for rising welfare'." },
      { stmt: "Within one country, wealthier people tend to report higher satisfaction than poorer people.", ans: "TRUE", xray: ["the rich do report greater satisfaction"],
        tr: "Doğru: TRUE. B: 'the rich do report greater satisfaction than the poor'." },
      { stmt: "Easterlin found that average happiness rose sharply as nations became richer.", ans: "FALSE", xray: ["scarcely budged"],
        tr: "Doğru: FALSE. B: 'average reported happiness scarcely budged' → 'rose sharply' ile DOĞRUDAN çelişir." },
      { stmt: "The relative-income explanation holds that absolute wealth is what matters most.", ans: "FALSE", xray: ["not one's absolute wealth"],
        tr: "Doğru: FALSE. C: 'not one's absolute wealth but one's standing compared with others' → mutlak değil göreli olduğunu söyler." },
      { stmt: "Most governments have now adopted national well-being measures.", ans: "NOT GIVEN", xray: [],
        tr: "Doğru: NOT GIVEN. D yalnızca 'A number of governments' (bazı hükümetler) der; 'most / çoğu' oranı hakkında bir şey söylemez." },
    ],
    insertion: {
      anchorPara: "C",
      sentence: "On this view, the treadmill of rising expectations all but guarantees that satisfaction will trail behind prosperity.",
      slots: [
        "before \"Several explanations have been advanced.\"",
        "after \"...and therefore satisfaction, broadly unchanged.\"",
        "after \"...proves disappointingly short-lived.\"",
        "before \"These ideas have not remained confined...\"",
      ],
      ans: 2,
      tr: "Doğru: 3. slot. 'On this view ... treadmill of rising expectations' adaptasyon fikrine (kazancın hazzının kısa ömürlü olması) gönderme yapar; o yüzden adaptasyon cümlesinden hemen SONRA gelmeli. Tuzak: 2. slot göreli gelir açıklamasının sonudur — 'rising expectations' (adaptasyon) oraya mantıken bağlanmaz." },
    xrayPassage: ["rising income was a reliable proxy", "scarcely budged", "not one's absolute wealth", "disappointingly short-lived", "not to discard economic growth but to supplement it"],
  },
];

/* ---------- MODULE C :: syntax forge (Band 8.5 targets) ---------- */
export const SYNTAX = [
  {
    id: "s1",
    band: "8.5",
    label: "Korelatif inversiyon + appositive",
    target: "Not only does rapid urbanisation place a severe strain on infrastructure, but it also exacerbates existing inequalities, a trend that policymakers can ill afford to overlook.",
    frags: ["Not only does", "rapid urbanisation", "place a severe strain on infrastructure,", "but it also", "exacerbates existing inequalities,", "a trend that policymakers", "can ill afford to overlook."],
    tr: "Yapı çözümü: 'Not only ... but also ...' korelatif bağlacıdır. 'Not only' cümle başına gelince DEVRİK kurulum şart: yardımcı fiil 'does', özne 'rapid urbanisation'tan ÖNCE gelir. Sonda 'a trend that...' ile araya isim cümleciği (appositive) ekleyerek Band 8+ karmaşıklığı yaratırsın.",
  },
  {
    id: "s2",
    band: "8.5",
    label: "Ödün cümleciği + nominalizasyon",
    target: "While it is widely acknowledged that economic growth can reduce poverty, the assumption that its benefits are shared equitably remains, at best, questionable.",
    frags: ["While it is widely acknowledged", "that economic growth can reduce poverty,", "the assumption", "that its benefits are shared equitably", "remains,", "at best,", "questionable."],
    tr: "Yapı çözümü: 'While ...' ile karşıt/ödün cümleciği (concessive) kurulur. Ana cümlede 'the assumption that ...' ile isimleştirme (nominalisation) ve 'remains questionable' iddiası vardır. 'at best' araya girerek (parenthetical) tonu inceltir — akademik İngilizcede çok güçlü bir kalıp.",
  },
  {
    id: "s3",
    band: "8.0",
    label: "İndirgenmiş katılım cümlecikleri",
    target: "The proliferation of digital media has transformed public discourse, blurring the line between information and entertainment and, in doing so, eroding traditional standards of authority.",
    frags: ["The proliferation of digital media", "has transformed public discourse,", "blurring the line", "between information and entertainment", "and, in doing so,", "eroding traditional standards of authority."],
    tr: "Yapı çözümü: Ana cümleden sonra iki '-ing'li katılım cümleciği (participial clause) gelir: 'blurring ...' ve 'eroding ...'. 'in doing so' ikinci sonucu birinciye bağlar. Bu indirgenmiş yapılar cümleyi sıkıştırır ve sözdizimsel olgunluk gösterir.",
  },
];

/* ---------- MODULE D :: speaking ---------- */
export const SPEAKING = [
  {
    id: "sp1",
    type: "IELTS · Part 2",
    prompt: "Describe a historical period you would have liked to live in. You should say when it was, what it was like, and explain why it appeals to you.",
    kit: ["a bygone era", "hold a certain allure", "with the benefit of hindsight"],
    tr: "Strateji: 15 sn'de 3 nokta (ne / nasıl / neden) için anahtar kelime yaz. Konuşurken geçmiş ve gelecek zamanı bilinçli karıştır ('Had I lived then, I would have...') — bu Grammatical Range puanını yükseltir.",
  },
  {
    id: "sp2",
    type: "TOEFL · Independent",
    prompt: "Some people believe that technology has made us less creative; others disagree. Which view do you support, and why?",
    kit: ["a double-edged sword", "stifle creativity", "by the same token"],
    tr: "Strateji: TOEFL'da net bir TEZ + İKİ gerekçe + birer örnek formülünü kullan. İlk 5 saniyede tarafını açıkça belirt; 'by the same token' ile ikinci gerekçeye geçişi pürüzsüz yap.",
  },
  {
    id: "sp3",
    type: "IELTS · Part 2",
    prompt: "Describe a scientific discovery you find fascinating. You should say what it is, how you learnt about it, and why you find it remarkable.",
    kit: ["a watershed moment", "a paradigm shift", "shed new light on"],
    tr: "Strateji: Soyut 'remarkable' yerine somut etki anlat ('it shed new light on how we...'). Akıcılığı korumak için takılırsan 'That said...' / 'What strikes me most is...' köprü kalıplarını kullan, sus-kalma.",
  },
];

/* ============================================================
   CEFR LEVELS  (the backbone of the whole catalog)
============================================================ */
export const LEVELS = [
  { id: "A1", label: "Başlangıç",   blurb: "Sıfırdan. Temel kalıplar, en sık kelimeler, basit cümleler.", label_en: "Beginner",           blurb_en: "From zero. Core patterns, the most frequent words, simple sentences." },
  { id: "A2", label: "Temel",       blurb: "Günlük durumlar, geçmiş zaman, basit bağlaçlar.",              label_en: "Elementary",         blurb_en: "Everyday situations, past tense, simple linkers." },
  { id: "B1", label: "Orta",        blurb: "Fikir belirtme, present perfect, koşul cümleleri.",            label_en: "Intermediate",       blurb_en: "Expressing opinions, present perfect, conditionals." },
  { id: "B2", label: "Orta-İleri",  blurb: "Akademik okuma, edilgen yapı, sınav temeli (IELTS ~6).",       label_en: "Upper-Intermediate", blurb_en: "Academic reading, passive voice, exam foundation (IELTS ~6)." },
  { id: "C1", label: "İleri",       blurb: "Yoğun metinler, ince kelime ayrımı, IELTS 7+ / TOEFL 100+.",   label_en: "Advanced",           blurb_en: "Dense texts, fine word distinctions, IELTS 7+ / TOEFL 100+." },
  { id: "C2", label: "Usta",        blurb: "Akademik hâkimiyet, deyim ve nüans.",                          label_en: "Mastery",            blurb_en: "Academic command, idiom and nuance." },
];
export const LV_ORDER = LEVELS.map((l) => l.id);
export const lvIndex = (l) => LV_ORDER.indexOf(l);
export const levelMeta = (id) => LEVELS.find((l) => l.id === id) || LEVELS[0];

/* ============================================================
   PLACEMENT TEST  (ascending difficulty; maps total-correct -> level)
============================================================ */
export const PLACEMENT = [
  { lv: "A1", q: "She ___ a teacher.", opts: ["is", "are", "am", "be"], ans: 0 },
  { lv: "A1", q: "I ___ coffee every morning.", opts: ["drinks", "drink", "drinking", "drank"], ans: 1 },
  { lv: "A1", q: "There ___ two books on the table.", opts: ["is", "be", "are", "am"], ans: 2 },
  { lv: "A2", q: "We ___ to Paris last summer.", opts: ["go", "gone", "went", "going"], ans: 2 },
  { lv: "A2", q: "There isn't ___ milk left.", opts: ["some", "many", "any", "a"], ans: 2 },
  { lv: "A2", q: "He is taller ___ his brother.", opts: ["then", "than", "that", "as"], ans: 1 },
  { lv: "B1", q: "I ___ here since 2019.", opts: ["live", "lived", "have lived", "am living"], ans: 2 },
  { lv: "B1", q: "If it rains, we ___ at home.", opts: ["stay", "will stay", "stayed", "would stay"], ans: 1 },
  { lv: "B1", q: "She suggested ___ a short break.", opts: ["take", "to take", "taking", "took"], ans: 2 },
  { lv: "B2", q: "The report ___ by the committee yesterday.", opts: ["reviewed", "was reviewed", "has reviewed", "is reviewing"], ans: 1 },
  { lv: "B2", q: "By the time we arrived, the film ___.", opts: ["started", "has started", "had started", "was starting"], ans: 2 },
  { lv: "B2", q: "A ___ argument is one that convinces you.", opts: ["dull", "compelling", "vague", "trivial"], ans: 1 },
  { lv: "C1", q: "Rarely ___ such dedication in a first-year student.", opts: ["I have seen", "have I seen", "I saw", "did I saw"], ans: 1 },
  { lv: "C1", q: "To ___ a problem is to make it less severe.", opts: ["exacerbate", "aggravate", "mitigate", "provoke"], ans: 2 },
  { lv: "C2", q: "New data ___ the original hypothesis (= support it).", opts: ["refute", "corroborate", "undermine", "contradict"], ans: 1 },
  { lv: "C2", q: "An ___ remark is one made unintentionally.", opts: ["inadvertent", "deliberate", "candid", "calculated"], ans: 0 },

  { lv: "A1", q: "My brother ___ football on Sundays.", opts: ["play", "plays", "playing", "is play"], ans: 1 },
  { lv: "A2", q: "I have lived here ___ five years.", opts: ["since", "for", "from", "ago"], ans: 1 },
  { lv: "B1", q: "You ___ smoke here; it's not allowed.", opts: ["mustn't", "don't have to", "needn't", "couldn't"], ans: 0 },
  { lv: "B1", q: "This is the book ___ I told you about.", opts: ["who", "what", "which", "whose"], ans: 2 },
  { lv: "B2", q: "He talks as if he ___ everything.", opts: ["knows", "knew", "has known", "know"], ans: 1 },
  { lv: "B2", q: "Not only ___ late, but he also forgot the files.", opts: ["he was", "was he", "he is", "is he"], ans: 1 },
  { lv: "C1", q: "Little ___ that the deal had already collapsed.", opts: ["he knew", "did he know", "he did know", "knew he"], ans: 1 },
  { lv: "C2", q: "Her account, ___ compelling, rested on tenuous evidence.", opts: ["however", "albeit", "despite", "whereas"], ans: 1 },

  { lv: "A2", tag: "edat", q: "She is very good ___ mathematics.", opts: ["at", "in", "on", "for"], ans: 0 },
  { lv: "B1", tag: "kelime türetme", q: "They finally reached an important ___ . (decide)", opts: ["decision", "decisive", "decide", "decidedly"], ans: 0 },
  { lv: "B2", tag: "bağlaç", q: "___ the heavy rain, the match went on.", opts: ["Despite", "Although", "However", "Because"], ans: 0 },
  { lv: "B2", tag: "hatayı bul", q: "Which sentence is correct?", opts: ["She suggested to leave early.", "She suggested leaving early.", "She suggested leave early.", "She suggested that leave early."], ans: 1 },
  { lv: "C1", tag: "anlamca en yakın", q: "Closest in meaning to 'ubiquitous':", opts: ["rare", "found everywhere", "ancient", "fragile"], ans: 1 },
  { lv: "C2", tag: "anlamca en yakın", q: "Closest in meaning to 'tenuous':", opts: ["robust", "weak / flimsy", "obvious", "lengthy"], ans: 1 },
];
// total correct -> starting level
export const placementLevel = (correct, total = 16) => {
  const r = total ? correct / total : 0;
  return r < 0.25 ? "A1" : r < 0.45 ? "A2" : r < 0.62 ? "B1" : r < 0.78 ? "B2" : r < 0.9 ? "C1" : "C2";
};

/* ============================================================
   VOCAB  (spaced-repetition deck — 8 words / level)
============================================================ */
export const VOCAB = [
  // A1
  { id: "v_house", lv: "A1", w: "house", pos: "n", tr: "ev", ex: "We live in a small house." },
  { id: "v_water", lv: "A1", w: "water", pos: "n", tr: "su", ex: "Can I have a glass of water?" },
  { id: "v_eat", lv: "A1", w: "eat", pos: "v", tr: "yemek (yemek)", ex: "I eat breakfast at seven." },
  { id: "v_big", lv: "A1", w: "big", pos: "adj", tr: "büyük", ex: "They have a big dog." },
  { id: "v_happy", lv: "A1", w: "happy", pos: "adj", tr: "mutlu", ex: "She is happy today." },
  { id: "v_friend", lv: "A1", w: "friend", pos: "n", tr: "arkadaş", ex: "He is my best friend." },
  { id: "v_go", lv: "A1", w: "go", pos: "v", tr: "gitmek", ex: "I go to school by bus." },
  { id: "v_book", lv: "A1", w: "book", pos: "n", tr: "kitap", ex: "This book is interesting." },
  // A2
  { id: "v_travel", lv: "A2", w: "travel", pos: "v", tr: "seyahat etmek", ex: "We travel every summer." },
  { id: "v_because", lv: "A2", w: "because", pos: "conj", tr: "çünkü", ex: "I stayed home because I was tired." },
  { id: "v_expensive", lv: "A2", w: "expensive", pos: "adj", tr: "pahalı", ex: "This phone is too expensive." },
  { id: "v_remember", lv: "A2", w: "remember", pos: "v", tr: "hatırlamak", ex: "I can't remember her name." },
  { id: "v_weather", lv: "A2", w: "weather", pos: "n", tr: "hava (durumu)", ex: "The weather is nice today." },
  { id: "v_arrive", lv: "A2", w: "arrive", pos: "v", tr: "varmak", ex: "We arrive at noon." },
  { id: "v_busy", lv: "A2", w: "busy", pos: "adj", tr: "meşgul", ex: "I am busy this week." },
  { id: "v_decide", lv: "A2", w: "decide", pos: "v", tr: "karar vermek", ex: "She decided to stay." },
  // B1
  { id: "v_improve", lv: "B1", w: "improve", pos: "v", tr: "geliştirmek", ex: "I want to improve my English." },
  { id: "v_although", lv: "B1", w: "although", pos: "conj", tr: "-e rağmen", ex: "Although it rained, we went out." },
  { id: "v_advice", lv: "B1", w: "advice", pos: "n", tr: "tavsiye (sayılamaz)", ex: "She gave me good advice." },
  { id: "v_achieve", lv: "B1", w: "achieve", pos: "v", tr: "başarmak", ex: "He achieved his goal." },
  { id: "v_environment", lv: "B1", w: "environment", pos: "n", tr: "çevre", ex: "We must protect the environment." },
  { id: "v_available", lv: "B1", w: "available", pos: "adj", tr: "mevcut, müsait", ex: "The room is available now." },
  { id: "v_realize", lv: "B1", w: "realize", pos: "v", tr: "fark etmek", ex: "I didn't realize it was late." },
  { id: "v_suggest", lv: "B1", w: "suggest", pos: "v", tr: "önermek", ex: "I suggest leaving early." },
  // B2
  { id: "v_significant", lv: "B2", w: "significant", pos: "adj", tr: "kayda değer, önemli", ex: "There was a significant rise in prices." },
  { id: "v_consequence", lv: "B2", w: "consequence", pos: "n", tr: "sonuç, netice", ex: "Every choice has consequences." },
  { id: "v_reluctant", lv: "B2", w: "reluctant", pos: "adj", tr: "isteksiz, gönülsüz", ex: "He was reluctant to admit it." },
  { id: "v_enhance", lv: "B2", w: "enhance", pos: "v", tr: "artırmak, iyileştirmek", ex: "Sleep enhances memory." },
  { id: "v_framework", lv: "B2", w: "framework", pos: "n", tr: "çerçeve, yapı", ex: "We need a clear framework." },
  { id: "v_inevitable", lv: "B2", w: "inevitable", pos: "adj", tr: "kaçınılmaz", ex: "Change is inevitable." },
  { id: "v_demonstrate", lv: "B2", w: "demonstrate", pos: "v", tr: "göstermek, kanıtlamak", ex: "The study demonstrates a clear link." },
  { id: "v_bias", lv: "B2", w: "bias", pos: "n", tr: "önyargı, yanlılık", ex: "The sample shows a clear bias." },
  // C1
  { id: "v_mitigate", lv: "C1", w: "mitigate", pos: "v", tr: "hafifletmek", ex: "Measures to mitigate the damage failed." },
  { id: "v_ambiguous", lv: "C1", w: "ambiguous", pos: "adj", tr: "belirsiz, muğlak", ex: "The wording is deliberately ambiguous." },
  { id: "v_scrutiny", lv: "C1", w: "scrutiny", pos: "n", tr: "yakın inceleme", ex: "The plan came under close scrutiny." },
  { id: "v_prevalent", lv: "C1", w: "prevalent", pos: "adj", tr: "yaygın, hâkim", ex: "The view is prevalent among experts." },
  { id: "v_coherent", lv: "C1", w: "coherent", pos: "adj", tr: "tutarlı", ex: "She gave a coherent account." },
  { id: "v_arbitrary", lv: "C1", w: "arbitrary", pos: "adj", tr: "keyfî, gelişigüzel", ex: "The deadline seems arbitrary." },
  { id: "v_undermine", lv: "C1", w: "undermine", pos: "v", tr: "zayıflatmak, temelini sarsmak", ex: "Doubts undermined his authority." },
  { id: "v_plausible", lv: "C1", w: "plausible", pos: "adj", tr: "makul, akla yatkın", ex: "That is a plausible explanation." },
  // C2
  { id: "v_ostensibly", lv: "C2", w: "ostensibly", pos: "adv", tr: "görünüşte, sözde", ex: "He left, ostensibly to make a call." },
  { id: "v_corroborate", lv: "C2", w: "corroborate", pos: "v", tr: "doğrulamak, teyit etmek", ex: "Two witnesses corroborate the account." },
  { id: "v_meticulous", lv: "C2", w: "meticulous", pos: "adj", tr: "titiz, ince eleyen", ex: "Her notes are meticulous." },
  { id: "v_inadvertent", lv: "C2", w: "inadvertent", pos: "adj", tr: "istemeden olan, kazara", ex: "An inadvertent error slipped in." },
  { id: "v_nuance", lv: "C2", w: "nuance", pos: "n", tr: "nüans, ince fark", ex: "He missed the nuance of the argument." },
  { id: "v_juxtapose", lv: "C2", w: "juxtapose", pos: "v", tr: "yan yana koymak", ex: "The film juxtaposes wealth and poverty." },
  { id: "v_pervasive", lv: "C2", w: "pervasive", pos: "adj", tr: "her yere sinmiş, yaygın", ex: "The influence is pervasive." },
  { id: "v_tacit", lv: "C2", w: "tacit", pos: "adj", tr: "üstü kapalı, zımni", ex: "They reached a tacit agreement." },

  // --- expansion ---
  { id: "v_cold", lv: "A1", w: "cold", pos: "adj", tr: "soğuk", ex: "It is very cold outside." },
  { id: "v_new", lv: "A1", w: "new", pos: "adj", tr: "yeni", ex: "I bought a new phone." },
  { id: "v_cheap", lv: "A2", w: "cheap", pos: "adj", tr: "ucuz", ex: "The tickets were quite cheap." },
  { id: "v_agree", lv: "A2", w: "agree", pos: "v", tr: "katılmak, hemfikir olmak", ex: "I agree with you." },
  { id: "v_problem", lv: "A2", w: "problem", pos: "n", tr: "sorun, problem", ex: "We have a small problem." },
  { id: "v_early", lv: "A2", w: "early", pos: "adv", tr: "erken", ex: "She arrived early." },
  { id: "v_describe", lv: "B1", w: "describe", pos: "v", tr: "tanımlamak, betimlemek", ex: "Can you describe the man?" },
  { id: "v_prevent", lv: "B1", w: "prevent", pos: "v", tr: "önlemek, engellemek", ex: "Exercise can prevent illness." },
  { id: "v_reduce", lv: "B1", w: "reduce", pos: "v", tr: "azaltmak", ex: "We must reduce waste." },
  { id: "v_increase", lv: "B1", w: "increase", pos: "v", tr: "artmak, artırmak", ex: "Prices increased sharply." },
  { id: "v_benefit", lv: "B1", w: "benefit", pos: "n", tr: "yarar, fayda", ex: "Reading has many benefits." },
  { id: "v_opinion", lv: "B1", w: "opinion", pos: "n", tr: "fikir, görüş", ex: "In my opinion, it is wrong." },
  { id: "v_substantial", lv: "B2", w: "substantial", pos: "adj", tr: "hatırı sayılır, ciddi miktarda", ex: "A substantial number of people agreed." },
  { id: "v_controversial", lv: "B2", w: "controversial", pos: "adj", tr: "tartışmalı", ex: "It is a controversial decision." },
  { id: "v_contribute", lv: "B2", w: "contribute", pos: "v", tr: "katkıda bulunmak", ex: "Many factors contribute to stress." },
  { id: "v_emphasize", lv: "B2", w: "emphasize", pos: "v", tr: "vurgulamak", ex: "She emphasized the need for care." },
  { id: "v_perceive", lv: "B2", w: "perceive", pos: "v", tr: "algılamak", ex: "How do people perceive risk?" },
  { id: "v_conventional", lv: "B2", w: "conventional", pos: "adj", tr: "geleneksel, alışılmış", ex: "Conventional methods no longer work." },
  { id: "v_deteriorate", lv: "B2", w: "deteriorate", pos: "v", tr: "kötüleşmek, bozulmak", ex: "Her health began to deteriorate." },
  { id: "v_notion", lv: "B2", w: "notion", pos: "n", tr: "kavram, düşünce", ex: "The notion of progress is complex." },
  { id: "v_integral", lv: "B2", w: "integral", pos: "adj", tr: "ayrılmaz, temel", ex: "Trust is integral to teamwork." },
  { id: "v_allocate", lv: "B2", w: "allocate", pos: "v", tr: "tahsis etmek, ayırmak", ex: "Funds were allocated to research." },
  { id: "v_empirical", lv: "C1", w: "empirical", pos: "adj", tr: "deneysel, gözleme dayalı", ex: "There is little empirical evidence." },
  { id: "v_robust", lv: "C1", w: "robust", pos: "adj", tr: "sağlam, güçlü", ex: "The findings are robust." },
  { id: "v_discrepancy", lv: "C1", w: "discrepancy", pos: "n", tr: "tutarsızlık, uyuşmazlık", ex: "There is a discrepancy in the data." },
  { id: "v_ubiquitous", lv: "C1", w: "ubiquitous", pos: "adj", tr: "her yerde olan, yaygın", ex: "Smartphones are now ubiquitous." },
  { id: "v_paradigm", lv: "C1", w: "paradigm", pos: "n", tr: "paradigma, model", ex: "This marks a paradigm shift." },
  { id: "v_salient", lv: "C1", w: "salient", pos: "adj", tr: "göze çarpan, belirgin", ex: "Let me note the salient points." },
  { id: "v_intrinsic", lv: "C1", w: "intrinsic", pos: "adj", tr: "özünde olan, içsel", ex: "It has intrinsic value." },
  { id: "v_differentiate", lv: "C1", w: "differentiate", pos: "v", tr: "ayırt etmek", ex: "How do we differentiate the two?" },
  { id: "v_preliminary", lv: "C1", w: "preliminary", pos: "adj", tr: "ön, başlangıç niteliğinde", ex: "These are only preliminary results." },
  { id: "v_albeit", lv: "C2", w: "albeit", pos: "conj", tr: "her ne kadar … olsa da", ex: "He agreed, albeit reluctantly." },
  { id: "v_notwithstanding", lv: "C2", w: "notwithstanding", pos: "prep", tr: "-e rağmen", ex: "Notwithstanding the cost, they proceeded." },
  { id: "v_cogent", lv: "C2", w: "cogent", pos: "adj", tr: "inandırıcı, sağlam temelli", ex: "She made a cogent argument." },
  { id: "v_tenuous", lv: "C2", w: "tenuous", pos: "adj", tr: "zayıf, çürük (bağ/iddia)", ex: "The link is tenuous at best." },
  { id: "v_equivocal", lv: "C2", w: "equivocal", pos: "adj", tr: "iki anlamlı, muğlak", ex: "The results were equivocal." },
  { id: "v_ephemeral", lv: "C2", w: "ephemeral", pos: "adj", tr: "geçici, kısa ömürlü", ex: "Fame can be ephemeral." },
  { id: "v_vindicate", lv: "C2", w: "vindicate", pos: "v", tr: "haklı çıkarmak", ex: "The data vindicated her theory." },
  { id: "v_idiosyncratic", lv: "C2", w: "idiosyncratic", pos: "adj", tr: "kendine özgü, alışılmadık", ex: "His style is idiosyncratic." },
  { id: "v_paradoxical", lv: "C2", w: "paradoxical", pos: "adj", tr: "çelişkili görünen", ex: "It seems paradoxical but it works." },
];

/* ============================================================
   GRAMMAR  (lessons with TR explanation + practice MCQs)
============================================================ */
export const GRAMMAR = [
  {
    id: "g_tobe", lv: "A1", title: "‘to be’ — am / is / are",
    exp: "İngilizcede ‘olmak’ fiilinin geniş zaman hâlleri: I → am, he/she/it → is, you/we/they → are. Olumsuz: am not / isn’t / aren’t. Soru: özne ile fiil yer değiştirir → ‘Is she…?’. Örnek: I am tired. She is a doctor. They are at home.", exp_en: "Present forms of ‘to be’: I → am, he/she/it → is, you/we/they → are. Negative: am not / isn’t / aren’t. Question: subject and verb swap → ‘Is she…?’. Examples: I am tired. She is a doctor. They are at home.",
    items: [
      { q: "They ___ my classmates.", opts: ["is", "are", "am", "be"], ans: 1, tr: "they → are.", en: "Subject 'they' → are." },
      { q: "___ she your sister?", opts: ["Is", "Are", "Am", "Do"], ans: 0, tr: "Soru: ‘Is she…?’ (he/she/it → is).", en: "Question: ‘Is she…?’ (he/she/it → is)." },
      { q: "I ___ not ready yet.", opts: ["is", "are", "am", "be"], ans: 2, tr: "I → am; olumsuz: am not.", en: "I → am; negative: am not." },
      { q: "The keys ___ on the table.", opts: ["is", "am", "are", "be"], ans: 2, tr: "keys çoğul → are.", en: "'keys' is plural → are." },
    ],
  },
  {
    id: "g_pres_simple", lv: "A1", title: "Present Simple",
    exp: "Alışkanlık ve genel doğrular için kullanılır. He/She/It öznelerinde fiile -s eklenir: I work / she works. Olumsuz ve soruda yardımcı do/does kullanılır ve fiil yalın kalır: ‘She doesn’t work’, ‘Does he live here?’.", exp_en: "Used for habits and general truths. With he/she/it the verb takes -s: I work / she works. Negatives and questions use do/does and the verb stays base: ‘She doesn’t work’, ‘Does he live here?’.",
    items: [
      { q: "He ___ to work by car.", opts: ["go", "goes", "going", "gone"], ans: 1, tr: "he → fiile -s: goes.", en: "he → verb takes -s: goes." },
      { q: "___ they speak English?", opts: ["Does", "Do", "Are", "Is"], ans: 1, tr: "they → Do; (he/she/it → Does).", en: "they → Do; (he/she/it → Does)." },
      { q: "She ___ like coffee.", opts: ["don’t", "doesn’t", "isn’t", "not"], ans: 1, tr: "she → doesn’t + yalın fiil.", en: "she → doesn’t + base verb." },
      { q: "Water ___ at 100°C.", opts: ["boil", "boils", "is boil", "boiling"], ans: 1, tr: "genel doğru; it → boils.", en: "General truth; it → boils." },
    ],
  },
  {
    id: "g_past_simple", lv: "A2", title: "Past Simple",
    exp: "Bitmiş geçmiş için kullanılır. Düzenli fiiller -ed alır (work→worked). Düzensizler ezberlenir (go→went, see→saw, have→had). Olumsuz/soruda ‘did’ kullanılır ve fiil yalın olur: ‘I didn’t go’, ‘Did you see it?’.", exp_en: "Used for finished past events. Regular verbs take -ed (work→worked). Irregulars are memorised (go→went, see→saw, have→had). Negatives/questions use ‘did’ with the base verb: ‘I didn’t go’, ‘Did you see it?’.",
    items: [
      { q: "We ___ a great film last night.", opts: ["see", "saw", "seen", "did see"], ans: 1, tr: "düzensiz: see → saw.", en: "Irregular: see → saw." },
      { q: "She ___ to London in 2020.", opts: ["move", "moved", "moves", "moving"], ans: 1, tr: "düzenli: move → moved.", en: "Regular: move → moved." },
      { q: "I ___ understand the question.", opts: ["didn’t", "don’t", "wasn’t", "haven’t"], ans: 0, tr: "geçmiş olumsuz: didn’t + yalın fiil.", en: "Past negative: didn’t + base verb." },
      { q: "___ you call him yesterday?", opts: ["Do", "Did", "Were", "Have"], ans: 1, tr: "geçmiş soru: Did + yalın fiil.", en: "Past question: Did + base verb." },
    ],
  },
  {
    id: "g_some_any", lv: "A2", title: "some / any · sayılabilir-sayılamaz",
    exp: "‘some’ olumlu cümlelerde, ‘any’ olumsuz ve sorularda kullanılır: ‘I have some money / I don’t have any money / Do you have any money?’. Sayılamayan isimler (water, money, information) tekil davranır ve ‘a/an’ almaz.", exp_en: "‘some’ in affirmatives, ‘any’ in negatives and questions: ‘I have some money / I don’t have any money / Do you have any money?’. Uncountable nouns (water, money, information) behave as singular and take no ‘a/an’.",
    items: [
      { q: "I don’t have ___ time.", opts: ["some", "any", "a", "many"], ans: 1, tr: "olumsuz → any.", en: "Negative → any." },
      { q: "Would you like ___ tea?", opts: ["any", "a", "some", "many"], ans: 2, tr: "ikram/rica → some (kalıp).", en: "Offers/requests → some (fixed pattern)." },
      { q: "She gave me some useful ___.", opts: ["informations", "information", "an information", "informations’"], ans: 1, tr: "information sayılamaz; çoğul olmaz.", en: "'information' is uncountable; no plural." },
      { q: "Are there ___ tickets left?", opts: ["some", "any", "a", "much"], ans: 1, tr: "soru → any (sayılabilir çoğul).", en: "Question → any (countable plural)." },
    ],
  },
  {
    id: "g_pres_perf", lv: "B1", title: "Present Perfect ↔ Past Simple",
    exp: "Present Perfect (have/has + V3): geçmişte olup şimdiyle bağlantılı, zamanı belirsiz olaylar; ‘since/for/already/yet/ever’ ile sık. Past Simple: bitmiş, zamanı belli olaylar; ‘yesterday/ago/in 2020’ ile. Karşılaştır: ‘I have lived here for years’ (hâlâ) ↔ ‘I lived there in 2019’ (bitti).", exp_en: "Present Perfect (have/has + V3): past events connected to now, time unspecified; common with ‘since/for/already/yet/ever’. Past Simple: finished events at a specific time; with ‘yesterday/ago/in 2020’. Compare: ‘I have lived here for years’ (still true) ↔ ‘I lived there in 2019’ (finished).",
    items: [
      { q: "I ___ him since Monday.", opts: ["didn’t see", "haven’t seen", "don’t see", "wasn’t seeing"], ans: 1, tr: "‘since’ → present perfect.", en: "‘since’ → present perfect." },
      { q: "She ___ to Japan in 2018.", opts: ["has been", "went", "has gone", "goes"], ans: 1, tr: "‘in 2018’ belli zaman → past simple.", en: "‘in 2018’ is a finished, specific time → past simple." },
      { q: "___ you ever ___ sushi?", opts: ["Did / eat", "Have / eaten", "Do / eat", "Are / eating"], ans: 1, tr: "‘ever’ (hayat tecrübesi) → present perfect.", en: "‘ever’ (life experience) → present perfect." },
      { q: "We ___ already ___ lunch.", opts: ["have / had", "did / have", "are / having", "has / had"], ans: 0, tr: "‘already’ → present perfect (we → have).", en: "‘already’ → present perfect (we → have)." },
    ],
  },
  {
    id: "g_conditionals", lv: "B1", title: "Koşul Cümleleri (0 / 1 / 2)",
    exp: "Tip 0 (genel doğru): If + present, present → ‘If you heat ice, it melts’. Tip 1 (gerçekçi gelecek): If + present, will + V1 → ‘If it rains, I will stay’. Tip 2 (hayalî/olası değil): If + past, would + V1 → ‘If I had time, I would travel’.", exp_en: "Type 0 (general truth): If + present, present → ‘If you heat ice, it melts’. Type 1 (realistic future): If + present, will + V1 → ‘If it rains, I will stay’. Type 2 (unreal/unlikely): If + past, would + V1 → ‘If I had time, I would travel’.",
    items: [
      { q: "If it ___, we will cancel the trip.", opts: ["rains", "will rain", "rained", "would rain"], ans: 0, tr: "Tip 1: if + present, will + V1.", en: "Type 1: if + present, will + V1." },
      { q: "If I ___ rich, I would buy a boat.", opts: ["am", "was/were", "will be", "have been"], ans: 1, tr: "Tip 2: if + past (were).", en: "Type 2: if + past (were)." },
      { q: "Water boils if you ___ it enough.", opts: ["will heat", "heat", "heated", "would heat"], ans: 1, tr: "Tip 0: genel doğru, present + present.", en: "Type 0: general truth, present + present." },
      { q: "If she studied more, she ___ better grades.", opts: ["will get", "gets", "would get", "got"], ans: 2, tr: "Tip 2: would + V1.", en: "Type 2: would + V1." },
    ],
  },
];

/* ============================================================
   LISTENING  (script read via browser TTS + comprehension MCQs)
============================================================ */
export const LISTENING = [
  {
    id: "l_cafe", lv: "A2", title: "At a café", accent: "en-US",
    script: "Good morning! What can I get you? — I'd like a medium coffee, please. — Sure. Anything to eat? — Yes, one cheese sandwich. — For here or to go? — To go, please. — That's six dollars fifty. — Here you are. — Thank you. Have a nice day!",
    items: [
      { q: "What does the customer order to drink?", opts: ["Tea", "A medium coffee", "Orange juice", "Water"], ans: 1 },
      { q: "Does the customer eat in the café?", opts: ["Yes", "No, it's to go", "Not mentioned", "Only a drink"], ans: 1 },
      { q: "How much is the total?", opts: ["$5.60", "$16.50", "$6.50", "$6.15"], ans: 2 },
    ],
  },
  {
    id: "l_voicemail", lv: "B1", title: "A voicemail about a change of plan", accent: "en-GB",
    script: "Hi Sam, it's Laura. Listen, about tomorrow's meeting — we've had to push it back. Instead of nine in the morning, it'll now start at half past eleven. Also, it won't be in room two; we've moved to the big conference room on the third floor. Could you let the others know? Thanks, see you then.",
    items: [
      { q: "What is the new start time?", opts: ["9:00", "11:00", "11:30", "10:30"], ans: 2 },
      { q: "Where will the meeting be held?", opts: ["Room 2", "The big conference room, 3rd floor", "Laura's office", "Online"], ans: 1 },
      { q: "What does Laura ask Sam to do?", opts: ["Cancel it", "Book a room", "Tell the others", "Call her back"], ans: 2 },
    ],
  },
  {
    id: "l_bees", lv: "B2", title: "Mini-lecture: why pollinators matter", accent: "en-US",
    script: "Today I want to focus on pollinators, and bees in particular. Roughly a third of the crops we eat depend, to some degree, on animal pollination, and bees do the bulk of that work. The concern is that bee populations have declined in many regions, driven by a combination of pesticide use, habitat loss, and disease. The point I want to stress is that this is not only an environmental issue; it is, fundamentally, a question of food security.",
    items: [
      { q: "About how much of our crops rely on animal pollination?", opts: ["All of them", "About a third", "Half", "A tenth"], ans: 1 },
      { q: "Which is NOT named as a cause of decline?", opts: ["Pesticides", "Habitat loss", "Climate change", "Disease"], ans: 2 },
      { q: "What is the speaker's main point?", opts: ["Bees are interesting", "It is mainly about money", "It is fundamentally about food security", "Pesticides are useful"], ans: 2 },
    ],
  },

  {
    id: "l_directions", lv: "A2", title: "Asking for directions", accent: "en-GB",
    script: "Excuse me, how do I get to the train station? — Sure. Go straight ahead and take the second left. The station is on your right, next to a big supermarket. — Is it far? — No, about a five-minute walk. — Thank you so much! — No problem.",
    items: [
      { q: "Which turning should the person take?", opts: ["First left", "Second left", "First right", "Second right"], ans: 1 },
      { q: "What is next to the station?", opts: ["A park", "A supermarket", "A hospital", "A school"], ans: 1 },
      { q: "How long is the walk?", opts: ["About 5 minutes", "About 15 minutes", "About an hour", "Not mentioned"], ans: 0 },
    ],
  },
  {
    id: "l_hotel", lv: "B1", title: "Booking a hotel room", accent: "en-US",
    script: "Good afternoon, Seaside Hotel. — Hi, I'd like to book a double room for two nights, please. — Of course. When would you like to check in? — This Friday, the 14th. — A double room is ninety dollars per night, breakfast included. Shall I book it? — Yes, please. — Could I have your name? — It's Daniel Kaya, K-A-Y-A. — Perfect, you're all set. See you Friday.",
    items: [
      { q: "What type of room does the caller want?", opts: ["Single", "Double", "Twin", "Suite"], ans: 1 },
      { q: "How much is the room per night?", opts: ["$19", "$90", "$140", "$80"], ans: 1 },
      { q: "What is included in the price?", opts: ["Parking", "Dinner", "Breakfast", "Nothing"], ans: 2 },
    ],
  },
  {
    id: "l_coffee", lv: "B2", title: "Mini-lecture: the spread of coffee", accent: "en-US",
    script: "Let's trace how coffee became a global drink. The plant is native to the highlands of Ethiopia, but it was in the Arabian Peninsula, by the fifteenth century, that coffee was first cultivated and traded on a large scale. From the ports of Yemen it moved into the wider Ottoman world, where coffee houses quickly became centres of conversation and, occasionally, of political suspicion. By the seventeenth century the drink had reached Europe, and the familiar pattern repeated itself: the café as a hub of news, debate, and commerce.",
    items: [
      { q: "Where is the coffee plant originally from?", opts: ["Yemen", "Ethiopia", "Brazil", "Turkey"], ans: 1 },
      { q: "Where was it first cultivated on a large scale?", opts: ["Europe", "Ethiopia", "The Arabian Peninsula", "India"], ans: 2 },
      { q: "Coffee houses are described as centres of —", opts: ["sport", "conversation and debate", "religion only", "farming"], ans: 1 },
    ],
  },
  {
    id: "l_cogload", lv: "C1", title: "Mini-lecture: cognitive load and learning", accent: "en-GB",
    script: "Today I want to introduce cognitive load theory, which starts from a simple premise: our working memory is severely limited, capable of holding only a handful of elements at any moment. Learning falters not because the material is intrinsically too hard, but because instruction often overloads this fragile system. The pedagogical implication is counter-intuitive. Stripping away extraneous detail, and presenting information in carefully sequenced chunks, frequently produces deeper understanding than a richer, more elaborate presentation would. In short, less can be more, provided that what remains is well structured.",
    items: [
      { q: "What is the central limitation the theory begins from?", opts: ["Poor eyesight", "Limited working memory", "Lack of motivation", "Slow reading speed"], ans: 1 },
      { q: "According to the speaker, learning often fails because —", opts: ["material is intrinsically impossible", "instruction overloads working memory", "students don't try", "memory is unlimited"], ans: 1 },
      { q: "What is the 'counter-intuitive' implication?", opts: ["Add more detail", "Remove extraneous detail and sequence chunks", "Test less often", "Speak faster"], ans: 1 },
    ],
  },
];

/* ============================================================
   WRITING  (prompts + rubric tips + model structure; self-checked)
============================================================ */
export const WRITING = [
  {
    id: "w_email", lv: "A2", exam: ["GENEL"], type: "E-posta", type_en: "Email", minWords: 40,
    prompt: "Write a short email to a friend inviting them to do something this weekend. Say what, where, and when.",
    tips: "Selamlama (Hi …,) → teklif → yer & zaman → kapanış (See you, …). Kısa cümleler yeter; ‘would you like to…?’ kalıbını kullan.",
    structure: "1) Hi [name],  2) Teklif: Would you like to …?  3) Detay: where + when  4) Soru: Does that work for you?  5) Kapanış + isim.",
  },
  {
    id: "w_opinion", lv: "B1", exam: ["GENEL"], type: "Fikir Paragrafı", type_en: "Opinion Paragraph", minWords: 100,
    prompt: "Some people prefer to live in a city; others prefer the countryside. Which do you prefer, and why?",
    tips: "Net bir tercih cümlesiyle başla. 2 sebep + birer örnek ver. ‘In my opinion / for example / because / however’ bağlaçlarını kullan. Kısa bir kapanışla bitir.",
    structure: "1) Görüş: I prefer …  2) Sebep 1 + örnek  3) Sebep 2 + örnek  4) (karşı tarafa kısa değinme)  5) Kapanış: Overall, …",
  },
  {
    id: "w_ielts_t2", lv: "B2", exam: ["IELTS"], type: "IELTS Writing Task 2", minWords: 250,
    prompt: "Some people think that modern technology has made face-to-face communication weaker. To what extent do you agree or disagree?",
    tips: "Görüşünü girişte net belirt. 2 ana gövde paragrafı, her biri tek fikir + gelişim + örnek. Bağlaçlar: Firstly, Moreover, On the other hand, In conclusion. Tutum tutarlı kalsın; 250+ kelime, 4 paragraf.",
    structure: "Giriş (konuyu yeniden ifade + tez) → Gövde 1 (ana sebep + örnek) → Gövde 2 (karşı görüş ya da ikinci sebep) → Sonuç (tezi tekrarla).",
  },
  {
    id: "w_essay_c1", lv: "C1", exam: ["TOEFL", "IELTS"], type: "Akademik Deneme", type_en: "Academic Essay", minWords: 280,
    prompt: "‘Universities should focus on employability rather than pure academic knowledge.’ Discuss both views and give your own opinion.",
    tips: "İki görüşü de dengeli işle, sonra kendi pozisyonunu netleştir. Nüanslı bağlaçlar (Admittedly, Nevertheless, That said). Soyut iddiaları somut örnekle destekle. Cümle çeşitliliğine dikkat (devrik, ilgi cümleleri).",
    structure: "Giriş (çerçeve + tez) → Görüş A (gerekçeler) → Görüş B (gerekçeler) → Sentez + kendi tezin → Sonuç.",
  },

  {
    id: "w_intro", lv: "A1", exam: ["GENEL"], type: "Tanıtım Paragrafı", type_en: "Introduction Paragraph", minWords: 30,
    prompt: "Introduce yourself: your name, where you are from, what you do, and one thing you like.",
    tips: "Basit present simple cümleleri kullan. Her cümle kısa olsun: My name is… I am from… I like…",
    structure: "1) İsim  2) Nereli  3) Ne yapıyorsun (öğrenci/iş)  4) Sevdiğin bir şey.",
  },
  {
    id: "w_advdis", lv: "B1", exam: ["GENEL"], type: "Artı-Eksi Paragrafı", type_en: "Pros & Cons Paragraph", minWords: 110,
    prompt: "What are the advantages and disadvantages of online learning?",
    tips: "Bir paragraf avantaj, bir paragraf dezavantaj. Bağlaçlar: one advantage is, however, on the other hand, for example. Dengeli ol.",
    structure: "1) Giriş cümlesi  2) Avantajlar + örnek  3) Dezavantajlar + örnek  4) Kısa kapanış görüşü.",
  },
  {
    id: "w_discuss", lv: "B2", exam: ["IELTS"], type: "IELTS Tartışma Denemesi", type_en: "IELTS Discussion Essay", minWords: 250,
    prompt: "Some people believe students should be assessed by final exams; others think continuous coursework is better. Discuss both views and give your own opinion.",
    tips: "Her iki görüşü ayrı gövde paragraflarında işle, sonra kendi görüşünü net ver. Bağlaçlar: On the one hand, On the other hand, While, In my view. 4 paragraf, 250+ kelime.",
    structure: "Giriş (konu + tez) → Görüş 1 (sınavlar) → Görüş 2 (ödev) → Kendi görüşün + Sonuç.",
  },
  {
    id: "w_arts", lv: "C1", exam: ["TOEFL", "IELTS"], type: "Görüş Denemesi (C1)", type_en: "Opinion Essay (C1)", minWords: 280,
    prompt: "To what extent should governments fund the arts rather than leaving them to the market?",
    tips: "Nüanslı bir pozisyon al (kısmen evet/hayır). Karşı argümanı kabul edip çürüt (Admittedly… Nevertheless…). Soyut iddiayı somut örnekle bağla.",
    structure: "Giriş (çerçeve + tez) → Devlet desteği lehine → Karşı görüş + çürütme → Sentez/Sonuç.",
  },
];

/* ============================================================
   EXAM PROFILES  (which skills/types + scoring each exam uses)
============================================================ */
export const EXAMS = [
  { id: "IELTS", name: "IELTS Academic", status: "active", scoring: "Band 0–9",
    skills: ["Listening", "Reading", "Writing", "Speaking"],
    blurb: "Dört beceri. Reading: T/F/NG, başlık eşleme, cümle yerleştirme. Writing Task 1+2. Speaking üç bölüm.",
    blurb_en: "Four skills. Reading: T/F/NG, heading matching, sentence insertion. Writing Task 1+2. Speaking in three parts.",
    modules: ["reading", "listening", "writing", "speaking", "lexical"] },
  { id: "TOEFL", name: "TOEFL iBT", status: "active", scoring: "0–120 (her bölüm 0–30)", scoring_en: "0–120 (0–30 per section)",
    skills: ["Reading", "Listening", "Speaking", "Writing"],
    blurb: "Akademik dört beceri; bütünleşik (integrated) konuşma ve yazma görevleri.",
    blurb_en: "Four academic skills; integrated speaking and writing tasks.",
    modules: ["toeflint", "paraphrase", "errorhunt", "reading", "listening", "speaking", "writing", "lexical", "mock"] },
  { id: "YDS", name: "YDS / e-YDS", status: "active", scoring: "0–100 · 80 soru", scoring_en: "0–100 · 80 questions",
    skills: ["Kelime", "Gramer", "Çeviri", "Okuma"], skills_en: ["Vocabulary", "Grammar", "Translation", "Reading"],
    blurb: "Tamamen çoktan seçmeli — konuşma/yazma/dinleme YOK. Kelime, gramer, cloze, çeviri (TR↔EN), paragraf tamamlama, anlamca en yakın cümle, akışı bozan cümle, diyalog tamamlama.",
    blurb_en: "Fully multiple-choice — NO speaking/writing/listening. Vocabulary, grammar, cloze, translation (TR↔EN), paragraph completion, closest in meaning, irrelevant sentence, dialogue completion.",
    modules: ["cloze", "restate", "oddout", "dialogue", "paracomp", "translate", "errorhunt", "grammar", "lexical", "articles", "mock"] },
  { id: "YOKDIL", name: "YÖKDİL (Fen · Sağlık · Sosyal)", name_en: "YÖKDİL (Science · Health · Social)", status: "active", scoring: "0–100 · 80 soru", scoring_en: "0–100 · 80 questions", fieldFilter: true,
    skills: ["Kelime", "Gramer", "Okuma"], skills_en: ["Vocabulary", "Grammar", "Reading"],
    blurb: "YDS formatına benzer; alanına göre (Fen, Sağlık, Sosyal) terim ağırlıklı. Akademik personel ve TUS/DUS dil şartı için de kullanılır.",
    blurb_en: "Similar to the YDS format; terminology-heavy by field (Science, Health, Social). Also used for academic staff and TUS/DUS language requirements.",
    modules: ["cloze", "restate", "oddout", "dialogue", "paracomp", "translate", "errorhunt", "grammar", "lexical", "articles", "mock"] },
  { id: "GENEL", name: "Sıfırdan İngilizce", name_en: "English from Scratch", status: "active", scoring: "CEFR A1→C2",
    skills: ["Gramer", "Kelime", "Dinleme", "Okuma"], skills_en: ["Grammar", "Vocabulary", "Listening", "Reading"],
    blurb: "Sınavdan bağımsız temel. Seviye testiyle başla; A1’den ilerle ya da eksik temelini kapat.",
    blurb_en: "Exam-independent foundations. Start with the placement test; progress from A1 or fill the gaps in your basics.",
    modules: ["grammar", "vocab", "listening", "reading", "mock"] },
];

/* module registry: maps a module key -> label + which skill/level band it serves */
export const MODULE_INFO = {
  vocab:    { name: "Kelime Hazinesi", sub: "aralıklı tekrar (SRS)", minLv: "A1", name_en: "Vocabulary Vault", sub_en: "spaced repetition (SRS)" },
  wordlist: { name: "Kelime Listesi", sub: "seviye seviye tüm kelimeler", minLv: "A1", name_en: "Word List", sub_en: "all words, level by level" },
  grammar:  { name: "Gramer Atölyesi", sub: "seviye seviye dilbilgisi", minLv: "A1", name_en: "Grammar Workshop", sub_en: "grammar, level by level" },
  topics:   { name: "Konu Kütüphanesi", sub: "müfredat görünümü · konu istatistikleri", minLv: "A1", name_en: "Topic Library", sub_en: "syllabus view · per-topic stats" },
  listening:{ name: "Dinleme Odası", sub: "sesli metin + sorular", minLv: "A2", name_en: "Listening Room", sub_en: "spoken text + questions" },
  articles: { name: "Okuma Parçaları", sub: "makale + sorular (kolay format)", minLv: "A2", name_en: "Reading Passages", sub_en: "article + questions (easy format)" },
  cloze:    { name: "Boşluk Doldurma", sub: "YDS/YÖKDİL cloze", minLv: "B2", name_en: "Gap Fill", sub_en: "YDS/YÖKDİL cloze" },
  restate:  { name: "Anlamca En Yakın Cümle", sub: "YDS · restatement", minLv: "B2", name_en: "Closest in Meaning", sub_en: "YDS · restatement" },
  oddout:   { name: "Akışı Bozan Cümle", sub: "YDS · irrelevant sentence", minLv: "B2", name_en: "Irrelevant Sentence", sub_en: "YDS · irrelevant sentence" },
  dialogue: { name: "Diyalog Tamamlama", sub: "YDS · dialogue completion", minLv: "B2", name_en: "Dialogue Completion", sub_en: "YDS · dialogue completion" },
  paracomp: { name: "Paragraf Tamamlama", sub: "YDS · paragraph completion", minLv: "B2", name_en: "Paragraph Completion", sub_en: "YDS · paragraph completion" },
  translate:{ name: "Çeviri", sub: "YDS · translation", minLv: "B2", name_en: "Translation", sub_en: "YDS · translation" },
  toeflint: { name: "TOEFL Integrated", sub: "oku → dinle → yaz/konuş + AI 0–30 puan", minLv: "B2", name_en: "TOEFL Integrated", sub_en: "read → listen → write/speak + AI 0–30 score" },
  mock:     { name: "Deneme Sınavı", sub: "tam ekran · süreli karışık test", minLv: "B2", name_en: "Mock Exam", sub_en: "full-screen · timed mixed test" },
  paraphrase:{ name: "Yeniden Yazım", sub: "C1 cümleyi yapısını değiştirerek kur", minLv: "B2", name_en: "Paraphrase", sub_en: "rebuild a C1 sentence with a new structure" },
  errorhunt: { name: "Hata Avcısı", sub: "paragraftaki gizli gramer hatalarını bul", minLv: "B2", name_en: "Error Hunt", sub_en: "find the hidden grammar errors in a paragraph" },
  reading:  { name: "Deductive Reading Matrix", sub: "T/F/NG · başlık · X-Ray", minLv: "B2", name_en: "Deductive Reading Matrix", sub_en: "T/F/NG · headings · X-Ray" },
  lexical:  { name: "Lexical Arena", sub: "süreli eşanlam atışı", minLv: "B2", name_en: "Lexical Arena", sub_en: "timed synonym sprint" },
  syntax:   { name: "Syntax Forge", sub: "cümle kurma · Writing", minLv: "B2", name_en: "Syntax Forge", sub_en: "sentence building · Writing" },
  speaking: { name: "120-sn Pressure Cooker", sub: "konuşma görevi", minLv: "B2", name_en: "120-s Pressure Cooker", sub_en: "speaking task" },
  writing:  { name: "Yazma Stüdyosu", sub: "görev + rubrik", minLv: "A2", name_en: "Writing Studio", sub_en: "task + rubric" },
};

/* level-scoped vocab pool: a learner sees words at their level and one below,
   never far below/above (so C1 won't get "water", A1 won't get "aggravate"). */
export function vocabForLevel(level) {
  const idx = lvIndex(level);
  if (idx < 0) return VOCAB.filter((v) => lvIndex(v.lv) <= 0);
  return VOCAB.filter((v) => { const vi = lvIndex(v.lv); return vi <= idx && vi >= idx - 1; });
}

/* ============================================================
   ARTICLES — simple reading (passage + MCQs).
   Easy format for fast content authoring + external content.json.
============================================================ */
export const ARTICLES = [
  {
    id: "a_morning_routine", lv: "A2", title: "My Morning Routine",
    body:
      "I wake up at seven o'clock every morning. First, I get out of bed and open the window to let in some fresh air. Then I wash my face and brush my teeth in the bathroom.\n\n" +
      "After that, I make a cup of tea and eat a simple breakfast, usually bread with cheese and a banana. While I eat, I listen to the radio and check the weather. At half past seven, I get dressed and pack my bag. I leave the house at eight o'clock and walk to the bus stop near my home.",
    items: [
      { q: "What time does the writer wake up?", opts: ["At seven o'clock", "At eight o'clock", "At half past seven", "At six o'clock"], ans: 0, tr: "Metin: yazar her sabah saat yedide uyanır.", en: "The text says the writer wakes up at seven every morning." },
      { q: "What does the writer do first after getting out of bed?", opts: ["Makes tea", "Opens the window", "Packs the bag", "Walks to the bus stop"], ans: 1, tr: "Yataktan kalktıktan sonra ilk olarak pencereyi açar.", en: "After getting out of bed, the first thing they do is open the window." },
      { q: "How does the writer go to the bus stop?", opts: ["By car", "By bus", "On foot", "By bike"], ans: 2, tr: "Yazar evden çıkıp otobüs durağına yürür.", en: "The writer leaves the house and walks to the bus stop." },
    ],
  },
  {
    id: "a_yawn", lv: "B1", field: "saglik", title: "Why We Yawn",
    body:
      "Almost everyone yawns, and so do many animals, from cats to birds. Yet scientists still do not fully agree on why we do it.\n\n" +
      "For a long time, people believed that yawning brought more oxygen into the body. However, experiments have cast doubt on this idea, because breathing faster does not reliably stop us from yawning.\n\n" +
      "A more recent theory is that yawning helps cool the brain. When we are tired, brain temperature rises slightly, and the deep breath of a yawn may bring in cooler air. This could explain why yawns become more frequent when we are sleepy or bored.\n\n" +
      "There is also a social side. Yawning is famously contagious: seeing, or even reading about, a yawn can trigger one. Many researchers think this reflects empathy, since people who are more socially connected tend to ‘catch’ yawns more easily.",
    items: [
      { q: "What was the traditional explanation for yawning?", opts: ["Cooling the brain", "Bringing more oxygen into the body", "Showing empathy", "Stretching the muscles"], ans: 1, tr: "Metin: uzun süre insanlar esnemenin vücuda daha çok oksijen aldığına inandı.", en: "The text: for a long time people believed yawning brought more oxygen into the body." },
      { q: "According to the cooling theory, why do we yawn more when tired?", opts: ["Brain temperature rises slightly", "The lungs shrink", "We need less air", "The room gets colder"], ans: 0, tr: "Yorgunken beyin sıcaklığı hafifçe yükselir; esnemek serin hava getirir.", en: "When tired, brain temperature rises slightly; yawning brings in cooler air." },
      { q: "What does ‘contagious’ suggest about yawning?", opts: ["It is dangerous", "It spreads from one person to another", "It is very rare", "It cures boredom"], ans: 1 },
    ],
  },
  {
    id: "a_griffin", lv: "B2", field: "sosyal", title: "The Griffin and the Fossil",
    body:
      "The griffin — a creature with the body of a lion and the head and wings of an eagle — was described by ancient Greek writers as guarding gold in the deserts of Central Asia. For centuries it was dismissed as pure fantasy.\n\n" +
      "In the twentieth century, the folklorist Adrienne Mayor proposed a striking idea. The regions linked to griffin stories are rich in the fossils of Protoceratops, a beaked, four-legged dinosaur whose bones lie exposed in the desert. Mayor suggested that ancient nomads, encountering these remains, may have reconstructed them as a living beast.\n\n" +
      "The argument is attractive because it connects a myth to a concrete observation rather than to imagination alone. Critics, however, urge caution. More recent work has questioned how closely the classical griffin actually matches the fossil, and notes that the creature appears in art long before some of the supposed encounters.\n\n" +
      "What remains valuable is the underlying question: how often do real natural objects, when misread, leave their trace in legend? Whether or not the griffin fits, the method — reading myths as possible responses to the physical world — has opened a productive field of inquiry.",
    items: [
      { q: "How was the griffin traditionally regarded before Mayor's work?", opts: ["As a real animal", "As pure fantasy", "As a kind of dinosaur", "As a species of eagle"], ans: 1 },
      { q: "What is Mayor's central proposal?", opts: ["Griffins still exist today", "Nomads reconstructed Protoceratops fossils as a living creature", "The Greeks invented dinosaurs", "Gold deposits attract eagles"], ans: 1, tr: "Mayor: göçebeler çöldeki Protoceratops kemiklerini görüp yaşayan bir yaratık olarak yeniden kurmuş olabilir.", en: "Mayor: nomads who saw Protoceratops bones in the desert may have reconstructed them as a living creature." },
      { q: "What objection do critics raise?", opts: ["The fossils are fake", "The griffin appears in art before some supposed encounters", "Mayor never published her work", "Deserts contain no fossils"], ans: 1 },
      { q: "What does the author say remains valuable?", opts: ["Proving griffins were real", "The question of how nature, when misread, shapes legend", "Selling desert gold", "Ignoring all myths"], ans: 1 },
    ],
  },
];

/* ============================================================
   CLOZE — gap-fill (YDS/YÖKDİL style).
   Short academic passage with numbered blanks (1),(2)… ;
   each blank has 4 options. Same authoring format as ARTICLES,
   also mergeable from content.json (data.cloze).
   Schema: { id, lv, title, text, blanks:[{ n, opts, ans, tr }] }
   ans starts at 0; tr = short Turkish rationale per blank.
============================================================ */
export const CLOZE = [
  {
    id: "cloze_renewables", lv: "B2", field: "fen", title: "Renewable Energy",
    text:
      "Renewable energy now plays a central role in plans to cut carbon emissions. (1) ____ the cost of solar panels has fallen sharply, many households still hesitate to install them. Wind power, (2) ____, has expanded rapidly, and in some countries it already supplies a large share of electricity. Engineers continue to improve battery storage, (3) ____ allows surplus power to be saved for later use. (4) ____ these advances, fossil fuels remain dominant in global energy markets. Governments will need stronger policies (5) ____ the transition is to accelerate.",
    blanks: [
      { n: 1, opts: ["Although", "Because", "Whether", "Unless"], ans: 0, tr: "Although = -e rağmen; maliyet düşmesine rağmen tereddüt → zıtlık bağlacı.", en: "Although = in spite of the fact; hesitation despite falling costs → contrast linker." },
      { n: 2, opts: ["by contrast", "for example", "in short", "as a result"], ans: 0, tr: "by contrast = buna karşılık; güneşteki tereddütle rüzgârın hızlı yayılması tezat oluşturur.", en: "by contrast: wind's rapid growth contrasts with the hesitation over solar." },
      { n: 3, opts: ["who", "which", "where", "what"], ans: 1, tr: "which = cansız bir şeyi (battery storage) niteleyen ilgi zamiri.", en: "which = relative pronoun for a non-person antecedent (battery storage)." },
      { n: 4, opts: ["Despite", "Thanks to", "Instead of", "According to"], ans: 0, tr: "Despite = -e rağmen; ilerlemelere rağmen fosil yakıtlar baskın.", en: "Despite = in spite of; despite the advances, fossil fuels stay dominant." },
      { n: 5, opts: ["if", "so", "but", "or"], ans: 0, tr: "if = eğer; ‘geçiş hızlanacaksa’ koşul cümlesi kurar.", en: "if introduces the condition: ‘if the transition is to accelerate’." },
    ],
  },
  {
    id: "cloze_immune", lv: "C1", field: "saglik", title: "The Immune System",
    text:
      "The human immune system defends the body against a constant stream of pathogens. When a virus enters the bloodstream, specialised cells (1) ____ it as foreign and begin to respond. Some of these cells produce antibodies, (2) ____ bind to the invader and mark it for destruction. (3) ____ the threat has been cleared, a small population of memory cells remains. (4) ____ these cells, the body can react far more quickly if the same pathogen returns. This principle (5) ____ the basis of modern vaccination.",
    blanks: [
      { n: 1, opts: ["recognise", "resemble", "conceal", "ignore"], ans: 0, tr: "recognise = tanımak; hücreler virüsü yabancı olarak tanır.", en: "recognise: the cells identify the virus as foreign." },
      { n: 2, opts: ["which", "whose", "where", "who"], ans: 0, tr: "which = antikorları (cansız) niteleyen ilgi zamiri.", en: "which = relative pronoun describing the antibodies (non-person)." },
      { n: 3, opts: ["Once", "Unless", "Whereas", "Although"], ans: 0, tr: "Once = -dığında; tehdit temizlendiğinde bellek hücreleri kalır.", en: "Once = as soon as; once the threat is cleared, memory cells remain." },
      { n: 4, opts: ["Thanks to", "Instead of", "Regardless of", "In spite of"], ans: 0, tr: "Thanks to = sayesinde; bu hücreler sayesinde vücut hızlı tepki verir.", en: "Thanks to = because of (positive); these cells let the body react quickly." },
      { n: 5, opts: ["forms", "forgets", "forces", "forbids"], ans: 0, tr: "form the basis = temelini oluşturur; aşılamanın temelini oluşturur.", en: "form the basis = to be the foundation; this principle underpins vaccination." },
    ],
  },
  {
    id: "cloze_urban", lv: "B2", field: "sosyal", title: "Life in Cities",
    text:
      "More than half of the world's population now lives in cities, and that share keeps rising. People move to urban areas (1) ____ they offer jobs, schools, and healthcare. (2) ____, rapid growth brings serious problems, such as traffic, pollution, and a shortage of affordable housing. Planners argue that public transport must be improved (3) ____ reduce congestion. (4) ____ well-designed parks and squares, residents have few places to relax. Many experts believe that the cities of the future will only succeed (5) ____ they balance growth with quality of life.",
    blanks: [
      { n: 1, opts: ["because", "although", "unless", "whereas"], ans: 0, tr: "because = çünkü; şehirler iş/okul sunduğu için taşınılır (neden).", en: "because gives the reason: people move since cities offer jobs/schools." },
      { n: 2, opts: ["However", "Therefore", "For instance", "Meanwhile"], ans: 0, tr: "However = ancak; fırsatların ardından sorunları getirir → zıtlık.", en: "However = contrast: problems follow the opportunities." },
      { n: 3, opts: ["to", "for", "by", "of"], ans: 0, tr: "to + fiil = amaç bildirir; ‘tıkanıklığı azaltmak için’.", en: "to + verb expresses purpose: ‘(in order) to reduce congestion’." },
      { n: 4, opts: ["Without", "With", "Besides", "Despite"], ans: 0, tr: "Without = -sız; iyi park olmadan dinlenecek yer az kalır.", en: "Without: with no well-designed parks, there are few places to relax." },
      { n: 5, opts: ["if", "so", "then", "or"], ans: 0, tr: "if = eğer; ‘büyümeyi yaşam kalitesiyle dengelerlerse’ koşulu.", en: "if sets the condition: ‘if they balance growth with quality of life’." },
    ],
  },
  {
    id: "cloze_language", lv: "C2", field: "sosyal", title: "Language and Thought",
    text:
      "The notion that the language we speak shapes the way we think has a long and controversial history. (1) ____ its strongest form, the hypothesis claims that speakers of different languages inhabit genuinely different cognitive worlds. Most contemporary linguists regard this strong version as untenable, (2) ____ they concede that language can exert subtle influences on perception. Recent experiments, (3) ____, suggest that the colours we name and the directions we encode may indeed nudge our judgements, (4) ____ they do not determine them outright.",
    blanks: [
      { n: 1, opts: ["In", "On", "At", "By"], ans: 0, tr: "'In its strongest form' = en güçlü hâliyle; kalıplaşmış edat 'in'.", en: "'In its strongest form' is the fixed phrase; the preposition is 'in'." },
      { n: 2, opts: ["even though", "so that", "as if", "in case"], ans: 0, tr: "even though = -e rağmen; güçlü sürümü reddederken etkisini kabul etmeleri zıtlık kurar.", en: "even though = contrast: they reject the strong version while conceding an influence." },
      { n: 3, opts: ["for instance", "by contrast", "in conclusion", "on the contrary"], ans: 0, tr: "for instance = örneğin; iddiaya somut bir örnek veriliyor.", en: "for instance introduces a concrete example of the claim." },
      { n: 4, opts: ["even if", "whereas", "unless", "provided that"], ans: 0, tr: "even if = -se bile; yargıları etkiler ama belirlemez (ödün verme).", en: "even if = concession: they nudge judgements but do not determine them." },
    ],
  },
  {
    id: "cloze_antibiotic", lv: "C2", field: "saglik", title: "Antibiotic Resistance",
    text:
      "The rise of antibiotic resistance is, in large part, a consequence of our own success. (1) ____ these drugs became widely available, infections that had once been fatal could be cured within days. Yet the very scale of their use created relentless evolutionary pressure, (2) ____ favouring the rare bacterium able to survive treatment. (3) ____ a resistant strain emerges, it can spread through a population with alarming speed. Researchers now warn that, (4) ____ new classes of antibiotics are developed, routine operations could once again become dangerous.",
    blanks: [
      { n: 1, opts: ["Once", "Unless", "Lest", "Whereby"], ans: 0, tr: "Once = -dığında; ilaçlar yaygınlaşınca ölümcül enfeksiyonlar iyileşebildi.", en: "Once = as soon as; once the drugs became widespread, fatal infections became curable." },
      { n: 2, opts: ["thereby", "whereas", "albeit", "insofar"], ans: 0, tr: "thereby = böylelikle; baskının dayanıklı bakteriyi kayırması sonucunu bildirir.", en: "thereby = by that means; states the result — favouring the resistant bacterium." },
      { n: 3, opts: ["Once", "Although", "Unless", "Whether"], ans: 0, tr: "Once = -dığı an; dirençli suş ortaya çıkınca hızla yayılır.", en: "Once = the moment that; once a resistant strain emerges, it spreads fast." },
      { n: 4, opts: ["unless", "because", "since", "whereas"], ans: 0, tr: "unless = -medikçe; yeni antibiyotikler geliştirilmedikçe ameliyatlar yeniden tehlikeli olabilir.", en: "unless = if … not; unless new antibiotics are developed, operations could become dangerous again." },
    ],
  },
];

/* ============================================================
   RESTATE — closest-in-meaning sentence (YDS restatement).
   A stem sentence + 4 full-sentence options; pick the closest
   paraphrase. Reuses the shared MCQRunner (stem -> q).
   Also mergeable from content.json (data.restate).
   Schema: { id, lv, stem, opts:[…4 sentences…], ans, tr }
   ans starts at 0; tr = short Turkish rationale.
============================================================ */
export const RESTATE = [
  {
    id: "rs_policy", lv: "B2", field: "sosyal",
    stem: "Although the policy was controversial, most experts agreed it was necessary.",
    opts: [
      "Most experts opposed the policy because it was controversial.",
      "The policy was necessary, so it could not be controversial.",
      "Even though it sparked debate, the policy was seen as necessary by most experts.",
      "Experts were divided on whether the policy was necessary.",
    ], ans: 2,
    tr: "'Although … most experts agreed it was necessary' = tartışmalı olsa da çoğu uzman gerekli gördü. 3. şık bu zıtlığı birebir karşılıyor.", en: "'Although … most experts agreed it was necessary' = despite the controversy, most experts saw it as necessary. Option 3 mirrors this contrast exactly.",
  },
  {
    id: "rs_storm", lv: "B2",
    stem: "Because the storm damaged the roads, several villages were cut off for days.",
    opts: [
      "The storm was caused by several villages being cut off.",
      "Several villages remained isolated for days because the storm had damaged the roads.",
      "The roads were repaired before the storm reached the villages.",
      "The villages were cut off, which is why the storm damaged the roads.",
    ], ans: 1,
    tr: "Neden-sonuç: yollar zarar gördüğü için köyler izole kaldı. 1. şık aynı neden-sonuç ilişkisini korur; 4. şık ilişkiyi tersine çevirir.", en: "Cause-effect: the villages stayed isolated because the roads were damaged. Option 2 keeps the same cause-effect; the last option reverses it.",
  },
  {
    id: "rs_reservation", lv: "B2",
    stem: "Unless you make a reservation, you will not get a table at that restaurant.",
    opts: [
      "If you make a reservation, you will not get a table.",
      "You will get a table only if you do not make a reservation.",
      "You will get a table at that restaurant only if you make a reservation.",
      "Reservations are not needed to get a table at that restaurant.",
    ], ans: 2,
    tr: "'Unless you make a reservation' = rezervasyon yapmazsan; yani ancak rezervasyon yaparsan masa bulursun. 2. şık koşulu doğru kurar.", en: "'Unless you make a reservation' = if you don't book; i.e. you'll get a table only if you book. Option 3 states the condition correctly.",
  },
  {
    id: "rs_vaccine", lv: "B2", field: "saglik",
    stem: "The new vaccine was developed by a small team of researchers in less than a year.",
    opts: [
      "A small team of researchers developed the new vaccine in less than a year.",
      "The new vaccine took a small team more than a year to develop.",
      "The researchers were developed by the new vaccine within a year.",
      "It took less than a year for the vaccine to develop the research team.",
    ], ans: 0,
    tr: "Edilgenin etken karşılığı: küçük bir ekip aşıyı bir yıldan kısa sürede geliştirdi. 0. şık aynı anlamı verir.", en: "Active counterpart of the passive: a small team developed the vaccine in under a year. Option 1 gives the same meaning.",
  },
  {
    id: "rs_manager", lv: "C1", field: "sosyal",
    stem: "Despite having very little experience, the young manager handled the crisis with remarkable calm.",
    opts: [
      "The young manager stayed calm during the crisis because she was very experienced.",
      "Although she had little experience, the young manager dealt with the crisis very calmly.",
      "The crisis made the inexperienced manager lose her calm.",
      "The manager avoided the crisis because she lacked experience.",
    ], ans: 1,
    tr: "'Despite having very little experience … with remarkable calm' = az deneyimine rağmen sakin yönetti. 1. şık (Although) aynı ödünleme anlamını taşır.", en: "'Despite having very little experience … with remarkable calm' = she managed it calmly despite little experience. The 'Although' option carries the same concessive meaning.",
  },
  {
    id: "rs_fuel", lv: "C1", field: "sosyal",
    stem: "The sudden rise in fuel prices forced many small businesses to raise their own prices.",
    opts: [
      "Many small businesses lowered their prices when fuel prices fell.",
      "Small businesses raised fuel prices in order to make a profit.",
      "Because fuel prices rose suddenly, many small businesses had to increase their prices too.",
      "Fuel prices rose because small businesses had increased their prices.",
    ], ans: 2,
    tr: "'sudden rise in fuel prices forced … to raise their own prices' = yakıt zammı işletmeleri fiyat artırmaya zorladı. 2. şık neden-sonucu korur; 4. şık nedeni tersine çevirir.", en: "'sudden rise in fuel prices forced … to raise their own prices': the fuel hike forced businesses to raise prices. Option 3 keeps the causality; the last option reverses it.",
  },
  {
    id: "rs_paradigm", lv: "C2", field: "fen",
    stem: "Far from being a gradual accumulation of facts, scientific progress, Kuhn argued, proceeds through abrupt paradigm shifts that overturn established assumptions.",
    opts: [
      "Kuhn maintained that science advances not steadily but through sudden upheavals that displace prevailing assumptions.",
      "Kuhn believed that science is simply the slow, steady gathering of facts over time.",
      "According to Kuhn, established assumptions in science are never overturned.",
      "Kuhn claimed that paradigm shifts make scientific progress impossible.",
    ], ans: 0,
    tr: "'Far from being a gradual accumulation … proceeds through abrupt paradigm shifts' = aşamalı birikim değil, yerleşik varsayımları deviren ani paradigma kaymalarıyla ilerler. 1. şık bunu birebir karşılar.", en: "'Far from being a gradual accumulation … proceeds through abrupt paradigm shifts' = not steady accumulation but sudden shifts that displace established assumptions. Option 1 matches exactly.",
  },
  {
    id: "rs_regulators", lv: "C2", field: "sosyal",
    stem: "Had the regulators intervened sooner, the ensuing financial collapse might well have been averted.",
    opts: [
      "The regulators intervened early, and so the financial collapse was avoided.",
      "If the regulators had acted earlier, the financial collapse could probably have been prevented.",
      "The financial collapse happened because the regulators never existed.",
      "Even early intervention could not have prevented the collapse.",
    ], ans: 1,
    tr: "'Had the regulators intervened sooner … might well have been averted' = devrik 3. tip koşul: daha erken müdahale etselerdi çöküş muhtemelen önlenebilirdi. 2. şık bu koşulu korur.", en: "'Had the regulators intervened sooner …' = inverted third conditional: had they acted earlier, the collapse could probably have been prevented. Option 2 preserves this.",
  },
];

/* ============================================================
   ODDOUT — irrelevant / flow-breaking sentence (YDS).
   A short paragraph of numbered sentences (I, II, III…); one
   sentence breaks the topic/flow. Options = sentence numbers.
   Reuses the shared MCQRunner. Also mergeable from content.json
   (data.oddout).
   Schema: { id, lv, sentences:[…4-5…], ans, tr }
   ans starts at 0 (0 = sentence I); tr = short Turkish rationale.
============================================================ */
export const ODDOUT = [
  {
    id: "oo_coffee", lv: "B2",
    sentences: [
      "Coffee is one of the most widely consumed beverages in the world.",
      "It contains caffeine, a natural stimulant that increases alertness.",
      "Many people drink it in the morning to help them wake up.",
      "Tea ceremonies have a long and important history in Japan.",
      "Moderate coffee consumption has also been linked to certain health benefits.",
    ], ans: 3,
    tr: "Paragraf kahve hakkında; IV. cümle Japon çay törenlerinden bahsederek konuyu bozuyor.", en: "The paragraph is about coffee; sentence IV breaks the topic by discussing Japanese tea ceremonies.",
  },
  {
    id: "oo_photosynthesis", lv: "B2", field: "fen",
    sentences: [
      "Photosynthesis is the process by which green plants make their own food.",
      "During this process, plants absorb carbon dioxide and release oxygen.",
      "Sunlight provides the energy needed to turn water and carbon dioxide into sugars.",
      "My grandmother enjoys painting landscapes in her free time.",
      "Without photosynthesis, most life on Earth could not survive.",
    ], ans: 3,
    tr: "Paragraf fotosentez hakkında; IV. cümle büyükannenin resim hobisinden söz ederek akışı bozuyor.", en: "The paragraph is about photosynthesis; sentence IV breaks the flow by mentioning grandma's painting hobby.",
  },
  {
    id: "oo_rome", lv: "B2", field: "sosyal",
    sentences: [
      "The Roman Empire was one of the largest empires in ancient history.",
      "At its height, it controlled territory across Europe, North Africa, and the Middle East.",
      "Romans built an extensive network of roads to move armies and goods quickly.",
      "Their system of law influenced many modern legal traditions.",
      "Smartphones have completely changed the way teenagers communicate today.",
    ], ans: 4,
    tr: "Paragraf Roma İmparatorluğu hakkında; V. cümle akıllı telefonlardan bahsederek tarihsel akışı bozuyor.", en: "The paragraph is about the Roman Empire; sentence V breaks the historical flow by mentioning smartphones.",
  },
  {
    id: "oo_recycling", lv: "B2", field: "fen",
    sentences: [
      "Recycling helps reduce the amount of waste that ends up in landfills.",
      "It also saves energy, since making products from recycled materials often uses less power.",
      "Many cities now provide separate bins for paper, glass, and plastic.",
      "The ancient Egyptians built enormous pyramids as tombs for their pharaohs.",
      "By recycling, individuals can play a small but real part in protecting the environment.",
    ], ans: 3,
    tr: "Paragraf geri dönüşüm hakkında; IV. cümle Mısır piramitlerini anlatarak konuyu bozuyor.", en: "The paragraph is about recycling; sentence IV breaks the topic by describing the Egyptian pyramids.",
  },
  {
    id: "oo_sleep", lv: "C1", field: "saglik",
    sentences: [
      "Sleep plays a vital role in maintaining both physical and mental health.",
      "During deep sleep, the body repairs tissues and strengthens the immune system.",
      "Researchers have found that poor sleep is linked to problems with memory and concentration.",
      "Most experts recommend that adults get between seven and nine hours of sleep each night.",
      "The stock market experienced sharp fluctuations throughout the past financial year.",
    ], ans: 4,
    tr: "Paragraf uyku ve sağlık hakkında; V. cümle borsa dalgalanmalarından söz ederek akışı bozuyor.", en: "The paragraph is about sleep and health; sentence V breaks the flow by mentioning stock-market swings.",
  },
  {
    id: "oo_volcano", lv: "C1", field: "fen",
    sentences: [
      "Volcanoes form when molten rock from deep within the Earth rises to the surface.",
      "When a volcano erupts, it can release ash, gas, and flowing lava.",
      "Some eruptions are so powerful that they affect the global climate for years.",
      "Despite the dangers, volcanic soil is often extremely fertile for farming.",
      "She had always dreamed of becoming a professional violinist.",
    ], ans: 4,
    tr: "Paragraf yanardağlar hakkında; V. cümle profesyonel kemancı olma hayalinden bahsederek konuyu bozuyor.", en: "The paragraph is about volcanoes; sentence V breaks the topic with a dream of becoming a violinist.",
  },
];

/* ============================================================
   DIALOGUE — two-person dialogue completion (YDS).
   One reply is blank; pick the missing line. Reuses MCQRunner.
   Mergeable from content.json (data.dialogue).
   Schema: { id, lv, lines:[{sp,t}], blankIndex, opts, ans, tr }
   ans starts at 0; tr = short Turkish rationale.
============================================================ */
export const DIALOGUE = [
  {
    id: "dlg_museum", lv: "B2", field: "sosyal",
    lines: [
      { sp: "A", t: "I was thinking of visiting the new art museum this weekend." },
      { sp: "B", t: "____" },
      { sp: "A", t: "Great, let's go on Saturday morning then." },
    ], blankIndex: 1,
    opts: [
      "I'm not really interested in art at all.",
      "That sounds lovely. Which day did you have in mind?",
      "I've already been there three times.",
      "Museums are always closed on weekends.",
    ], ans: 1,
    tr: "A öneri yapıyor; B'nin yanıtı olumlu olmalı ve A'nın 'Saturday' demesine zemin kurmalı. 2. şık akışı sağlıyor.", en: "A makes a suggestion; B's reply must be positive and set up A's 'Saturday'. Option 2 keeps the flow.",
  },
  {
    id: "dlg_doctor", lv: "B2", field: "saglik",
    lines: [
      { sp: "A", t: "Doctor, I've had a sore throat and a mild fever since yesterday." },
      { sp: "B", t: "____" },
      { sp: "A", t: "No, just some tea with honey. I wanted to see you first." },
    ], blankIndex: 1,
    opts: [
      "Have you taken any medication for it so far?",
      "You should book a holiday to recover.",
      "I think you need major surgery immediately.",
      "Sore throats are never caused by infections.",
    ], ans: 0,
    tr: "B doktor; A 'No, just some tea… I wanted to see you first' diyor → B ilaç alıp almadığını sormuş olmalı. 1. şık akışı kurar.", en: "B is the doctor; A answers 'No, just some tea… I wanted to see you first' → B must have asked about medication. Option 1 builds the flow.",
  },
  {
    id: "dlg_lab", lv: "C1", field: "fen",
    lines: [
      { sp: "A", t: "Did the experiment confirm your hypothesis?" },
      { sp: "B", t: "____" },
      { sp: "A", t: "Then we should repeat it with a larger sample." },
    ], blankIndex: 1,
    opts: [
      "Yes, the results were exactly what we expected.",
      "Not quite; the results were inconclusive this time.",
      "I have never worked in a laboratory before.",
      "The cafeteria was closed during the experiment.",
    ], ans: 1,
    tr: "A 'Then we should repeat it with a larger sample' diyor → tekrar gerektiren belirsiz bir sonuç olmalı. 2. şık (sonuç kesin değil) tekrarı gerektirir.", en: "A says 'Then we should repeat it with a larger sample' → the result must be inconclusive, requiring a repeat. Option 2 fits.",
  },
  {
    id: "dlg_library", lv: "B2",
    lines: [
      { sp: "A", t: "Excuse me, could you tell me where I can find books on ancient history?" },
      { sp: "B", t: "____" },
      { sp: "A", t: "Thank you, I'll go up there now." },
    ], blankIndex: 1,
    opts: [
      "Sorry, we don't sell any books here.",
      "I'm afraid history is a very boring subject.",
      "They're on the second floor, in the history section.",
      "You should ask at the train station instead.",
    ], ans: 2,
    tr: "A yer soruyor ve 'I'll go up there now' diyor → B konum tarif etmeli. 3. şık katı/bölümü verir.", en: "A asks where and says 'I'll go up there now' → B must give a location. Option 3 provides the floor/section.",
  },
  {
    id: "dlg_environment", lv: "C1", field: "fen",
    lines: [
      { sp: "A", t: "Our city is finally introducing a recycling programme next month." },
      { sp: "B", t: "____" },
      { sp: "A", t: "Exactly, and it should also cut down on landfill waste." },
    ], blankIndex: 1,
    opts: [
      "That's a waste of time; nothing will change.",
      "That's great news. It could really raise awareness among residents.",
      "I don't think our city has any rubbish at all.",
      "Recycling has nothing to do with the environment.",
    ], ans: 1,
    tr: "A 'Exactly, and it should also cut down on landfill waste' diyerek B'yi onaylıyor → B olumlu ve konuyla ilgili olmalı. 2. şık akışı sağlar.", en: "A agrees with 'Exactly, and it should also cut down on landfill waste' → B must be positive and on-topic. Option 2 keeps the flow.",
  },
  {
    id: "dlg_interview", lv: "C1", field: "sosyal",
    lines: [
      { sp: "A", t: "Why do you think you're the right candidate for this position?" },
      { sp: "B", t: "____" },
      { sp: "A", t: "That's impressive. Your experience seems to fit our needs well." },
    ], blankIndex: 1,
    opts: [
      "Honestly, I have no relevant skills at all.",
      "I'd rather not talk about my work experience.",
      "I applied here only because I needed any job.",
      "Because I've led similar projects and consistently met tight deadlines.",
    ], ans: 3,
    tr: "A 'Your experience seems to fit our needs well' diyor → B deneyim/uygunluk vurgulamalı. 4. şık güçlü gerekçe sunar.", en: "A says 'Your experience seems to fit our needs well' → B must highlight experience/fit. Option 4 gives a strong rationale.",
  },
];

/* ============================================================
   PARACOMP — paragraph completion (YDS).
   A sentence is missing, marked with ---- (start/middle/end);
   pick the missing sentence. Reuses MCQRunner.
   Mergeable from content.json (data.paracomp).
   Schema: { id, lv, text (with "----"), opts, ans, tr }
   ans starts at 0; tr = short Turkish rationale.
============================================================ */
export const PARACOMP = [
  {
    id: "pc_sleep", lv: "B2", field: "saglik",
    text: "Sleep plays a vital role in good health. ---- During deep sleep, the body repairs tissues and strengthens the immune system. Without enough rest, both physical and mental performance decline.",
    opts: [
      "However, many people enjoy staying up late.",
      "It allows the brain and body to recover from the day's activities.",
      "Coffee is a popular drink around the world.",
      "Exercise should be done early in the morning.",
    ], ans: 1,
    tr: "---- yeri uykunun işlevini açıklayan bir cümle bekliyor; 2. şık öncesi/sonrasıyla tutarlı.", en: "The ---- expects a sentence explaining sleep's function; option 2 is consistent with what surrounds it.",
  },
  {
    id: "pc_photosynthesis", lv: "B2", field: "fen",
    text: "---- During this process, they take in carbon dioxide and release oxygen into the air. This exchange is essential for the survival of most living things.",
    opts: [
      "Photosynthesis is the process by which green plants produce their own food using sunlight.",
      "Many animals sleep for most of the day.",
      "The price of vegetables has risen recently.",
      "Deserts receive very little rainfall each year.",
    ], ans: 0,
    tr: "Paragraf fotosentezi anlatıyor; baştaki ---- konuyu tanıtan cümle ister. 1. şık süreci tanıtır.", en: "The paragraph describes photosynthesis; the opening ---- needs a topic sentence. Option 1 introduces the process.",
  },
  {
    id: "pc_vaccine", lv: "C1", field: "saglik",
    text: "Vaccines work by training the immune system to recognise a specific pathogen. They contain harmless parts of the germ, which prompt the body to produce antibodies. ----",
    opts: [
      "However, most people dislike going to the dentist.",
      "Mountains are formed over millions of years.",
      "As a result, the body can respond quickly if it meets the real pathogen later.",
      "The library closes at nine o'clock every evening.",
    ], ans: 2,
    tr: "Önceki cümleler antikor üretimini anlatıyor; sondaki ---- bunun sonucunu bağlamalı. 3. şık 'As a result…' ile sonucu verir.", en: "The earlier sentences describe antibody production; the final ---- must state the consequence. Option 3 gives it with 'As a result…'.",
  },
  {
    id: "pc_internet", lv: "B2", field: "sosyal",
    text: "The internet has transformed the way people communicate. ---- Today, a message can reach the other side of the world in seconds. Still, some worry that face-to-face contact is being lost.",
    opts: [
      "Bananas are a good source of potassium.",
      "The Great Wall of China is very long.",
      "Most cats sleep for many hours a day.",
      "In the past, letters could take weeks to arrive.",
    ], ans: 3,
    tr: "Ortadaki ---- 'Today, a message…' ile karşılaştırma kuruyor; geçmişe gönderme yapan 4. şık tutarlı.", en: "The middle ---- sets up the contrast with 'Today, a message…'; option 4, referring to the past, fits.",
  },
  {
    id: "pc_climate", lv: "C1", field: "fen",
    text: "Climate change is already affecting ecosystems around the globe. ---- For instance, warmer seas are pushing many fish species towards cooler waters. Such shifts can disrupt both food chains and local fishing industries.",
    opts: [
      "Chess is a game that requires deep concentration.",
      "Rising temperatures are altering where plants and animals can live.",
      "Many tourists enjoy visiting historical castles.",
      "Breakfast is often called the most important meal.",
    ], ans: 1,
    tr: "---- ardından 'For instance, warmer seas…' örneği geliyor → öncesinde genel bir iddia olmalı. 2. şık sıcaklığın canlı dağılımını değiştirdiğini söyler.", en: "The ---- is followed by the example 'For instance, warmer seas…' → a general claim must precede it. Option 2 states that warming shifts where species live.",
  },
  {
    id: "pc_exercise", lv: "C1", field: "saglik",
    text: "Regular physical exercise offers a wide range of benefits. It strengthens the heart, improves mood, and helps control body weight. ----",
    opts: [
      "For these reasons, doctors encourage people to stay active throughout their lives.",
      "Nevertheless, the moon orbits the Earth roughly every month.",
      "Some novels are far too long to finish quickly.",
      "Glass is made mainly from sand at high temperatures.",
    ], ans: 0,
    tr: "Paragraf egzersizin yararlarını sıralıyor; sondaki ---- toparlayan bir sonuç ister. 1. şık 'For these reasons…' ile özetler.", en: "The paragraph lists exercise benefits; the final ---- needs a wrap-up. Option 1 concludes with 'For these reasons…'.",
  },
  {
    id: "pc_behavioural", lv: "C2", field: "sosyal",
    text: "Classical economics long assumed that individuals act as rational agents, coolly weighing every cost and benefit. ---- They have shown that people systematically deviate from such ideal rationality, relying on mental shortcuts that frequently lead them astray. These insights have since reshaped fields ranging from finance to public policy.",
    opts: [
      "Behavioural economists, however, have mounted a powerful challenge to this comfortable assumption.",
      "Most people enjoy a hot cup of coffee first thing in the morning.",
      "The history of metal coins stretches back several thousand years.",
      "Mountain ranges tend to form along the boundaries of tectonic plates.",
    ], ans: 0,
    tr: "---- öncesi 'rasyonel ajan' varsayımını, sonrası bu varsayımdan 'sistematik sapma' bulgularını anlatıyor → arada varsayıma itiraz eden özne tanıtılmalı. 1. şık davranışsal iktisatçıları getirir.", en: "Before the ----: the 'rational agent' assumption; after it: findings of systematic deviation → the gap must introduce who challenged the assumption. Option 1 brings in behavioural economists.",
  },
];

/* ============================================================
   TRANSLATE — best translation (YDS).
   A source sentence (EN or TR) + 4 translations; pick the best.
   dir: "en2tr" | "tr2en". Reuses MCQRunner.
   Mergeable from content.json (data.translate).
   Schema: { id, lv, dir, source, opts, ans, tr }
   ans starts at 0; tr = short Turkish rationale.
============================================================ */
export const TRANSLATE = [
  {
    id: "tr_emissions", lv: "B2", field: "fen", dir: "en2tr",
    source: "The government introduced new measures to reduce carbon emissions.",
    opts: [
      "Hükümet karbon emisyonlarını artırmak için yeni önlemler aldı.",
      "Hükümet karbon emisyonlarını azaltmak için yeni önlemler aldı.",
      "Hükümet yeni önlemleri karbon emisyonları yüzünden kaldırdı.",
      "Yeni önlemler karbon emisyonlarını hükümete bildirdi.",
    ], ans: 1,
    tr: "'reduce carbon emissions' = azaltmak; 2. şık doğru, 1. şık anlamı tersine çeviriyor.", en: "'reduce carbon emissions' = azaltmak (to reduce); option 2 is right, option 1 reverses the meaning.",
  },
  {
    id: "tr_research", lv: "B2", field: "fen", dir: "en2tr",
    source: "Scientists have discovered a new species of frog in the rainforest.",
    opts: [
      "Bilim insanları yağmur ormanında yeni bir kurbağa türü keşfetti.",
      "Bilim insanları yağmur ormanında bir kurbağa türünü yok etti.",
      "Yeni bir kurbağa türü bilim insanlarını ormanda buldu.",
      "Bilim insanları ormanda eski bir kurbağa türü aradı.",
    ], ans: 0,
    tr: "'discovered a new species' = yeni bir tür keşfetti; 1. şık doğru, 2. şık 'yok etti' ile anlamı bozar.", en: "'discovered a new species' = keşfetti; option 1 is right, option 2 corrupts it with 'destroyed'.",
  },
  {
    id: "tr_health", lv: "B2", field: "saglik", dir: "en2tr",
    source: "Doctors recommend drinking plenty of water during hot weather.",
    opts: [
      "Doktorlar sıcak havalarda su içmemeyi önerir.",
      "Sıcak hava doktorlara bol su getirir.",
      "Doktorlar sıcak havalarda bol su içmeyi önerir.",
      "Doktorlar soğuk havalarda az su içmeyi önerir.",
    ], ans: 2,
    tr: "'recommend drinking plenty of water during hot weather' = sıcak havada bol su içmeyi önerir; 3. şık doğru.", en: "'recommend drinking plenty of water during hot weather' = advise drinking plenty of water in hot weather; option 3 is right.",
  },
  {
    id: "tr_history", lv: "C1", field: "sosyal", dir: "tr2en",
    source: "Bu antik kent, yüzyıllar boyunca önemli bir ticaret merkezi olmuştur.",
    opts: [
      "This ancient city has remained an important trade centre for centuries.",
      "This modern city will become a trade centre in a few years.",
      "This ancient city destroyed many trade centres over the centuries.",
      "Trade centres built this ancient city within a century.",
    ], ans: 0,
    tr: "'yüzyıllar boyunca önemli bir ticaret merkezi olmuştur' = has remained an important trade centre for centuries; 1. şık doğru.", en: "'yüzyıllar boyunca önemli bir ticaret merkezi olmuştur' = has remained an important trade centre for centuries; option 1 is right.",
  },
  {
    id: "tr_economy", lv: "C1", field: "sosyal", dir: "tr2en",
    source: "Hükümet, işsizliği azaltmak için yeni iş olanakları yaratmayı amaçlıyor.",
    opts: [
      "The government plans to increase unemployment by cutting jobs.",
      "The government aims to create new job opportunities to reduce unemployment.",
      "New job opportunities forced the government to resign.",
      "The government reduced job opportunities to raise unemployment.",
    ], ans: 1,
    tr: "'işsizliği azaltmak için yeni iş olanakları yaratmayı amaçlıyor' = aims to create new jobs to reduce unemployment; 2. şık doğru.", en: "'işsizliği azaltmak için yeni iş olanakları yaratmayı amaçlıyor' = aims to create new job opportunities to reduce unemployment; option 2 is right.",
  },
  {
    id: "tr_biology", lv: "B2", field: "saglik", dir: "en2tr",
    source: "The human brain uses a large amount of energy even during rest.",
    opts: [
      "İnsan beyni yalnızca uyurken enerji kullanır.",
      "İnsan vücudu dinlenirken hiç enerji harcamaz.",
      "Enerji, insan beynini dinlenmeye zorlar.",
      "İnsan beyni dinlenirken bile büyük miktarda enerji kullanır.",
    ], ans: 3,
    tr: "'even during rest' = dinlenirken bile; 4. şık doğru, 1. şık 'yalnızca uyurken' ile anlamı daraltır.", en: "'even during rest' = dinlenirken bile; option 4 is right, option 1 narrows it to 'only while sleeping'.",
  },
  {
    id: "tr_jurisprudence", lv: "C2", field: "sosyal", dir: "en2tr",
    source: "The court held that the legislation, however well-intentioned, exceeded the powers conferred upon parliament by the constitution.",
    opts: [
      "Mahkeme, yasanın -ne kadar iyi niyetli olursa olsun- anayasanın parlamentoya verdiği yetkileri aştığına hükmetti.",
      "Mahkeme, iyi niyetli yasanın anayasaya tümüyle uygun olduğunu söyledi.",
      "Parlamento, mahkemenin anayasayı aşan kararını iyi niyetle onayladı.",
      "Anayasa, mahkemeye parlamentoyu denetleme yetkisi vermedi.",
    ], ans: 0,
    tr: "'however well-intentioned, exceeded the powers conferred upon parliament' = ne kadar iyi niyetli olsa da parlamentoya verilen yetkileri aştı; 'held' = hükmetti. 1. şık doğru.", en: "'however well-intentioned, exceeded the powers conferred upon parliament': no matter how well-meant, it overstepped parliament's powers; 'held' = ruled. Option 1 is right.",
  },
];

/* ============================================================
   TOEFL_INTEGRATED — multi-stage integrated task simulator.
   Read (3:00) -> Listen (lecture via TTS) -> Respond (write/speak)
   -> AI score 0-30 (scoreWithAI) or offline estimate (analyzeWriting).
   The lecture rebuts EACH reading claim one by one (TOEFL logic).
   Mergeable from content.json (data.toeflIntegrated).
   Schema: { id, type:"writing"|"speaking", lv, topic,
             reading:{title,body}, lecture:{body}, prompt, keyPoints,
             minWords?, prep?, respond? }
============================================================ */
export const TOEFL_INTEGRATED = [
  {
    id: "ti_megafauna", type: "writing", lv: "B2", topic: "Paleontology", minWords: 150,
    reading: {
      title: "Why Did the Ice Age Megafauna Disappear?",
      body:
        "At the end of the last Ice Age, roughly eleven thousand years ago, dozens of species of large mammals — mammoths, giant ground sloths, sabre-toothed cats and others — vanished from the planet. Scientists have long debated why this dramatic wave of extinctions occurred, and three explanations are often put forward.\n\n" +
        "The first points to climate change. As the glaciers retreated, global temperatures rose and the cold, grassy steppes that had supported huge herds were gradually replaced by forests and wetlands. According to this view, the megafauna simply could not survive the loss of their preferred habitat and food sources.\n\n" +
        "A second explanation blames human hunters. Around the same time, modern humans were spreading rapidly across Eurasia and into the Americas. Armed with increasingly sophisticated weapons, these hunters may have killed the large, slow-breeding animals faster than the populations could replace themselves, driving them to extinction in a relatively short period.\n\n" +
        "A third hypothesis focuses on disease. As humans and their domesticated animals moved into new regions, they may have introduced unfamiliar pathogens. Large mammals with no natural immunity could have been devastated by these new diseases, which spread quickly through dense herds and wiped out entire species.",
    },
    lecture: {
      body:
        "Those three explanations sound convincing, but each runs into serious problems.\n\n" +
        "Take the climate argument first. The thing is, these same large mammals had already survived many previous warm periods. Over the past two million years, the Earth went through dozens of cycles of warming and cooling, and the megafauna came through all of them just fine. So why would this particular warming, and only this one, suddenly wipe them out? Climate change alone can't explain it.\n\n" +
        "Now, the idea that human hunters were responsible. If hunting were the main cause, we would expect to find large numbers of kill sites — places littered with the bones of these animals alongside human tools. But in fact such sites are surprisingly rare. For most of the extinct species, we have almost no direct evidence that humans hunted them at all.\n\n" +
        "And finally, the disease theory. For a single disease to wipe out so many different species, it would have to jump easily between very different kinds of animals — from sloths to mammoths to big cats. We know of almost no disease that behaves this way. A germ deadly to one group is usually harmless to others. So a single super-disease is extremely unlikely.",
    },
    prompt: "Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage.",
    keyPoints: [
      "Ders, iklim iddiasını çürütür: aynı hayvanlar önceki birçok ısınma döneminden sağ çıktı — neden yalnızca bu ısınma onları yok etsin?",
      "Ders, insan avı iddiasını çürütür: avlanma ana neden olsaydı çok sayıda 'kill site' beklenirdi, ama bu alanlar şaşırtıcı derecede nadir.",
      "Ders, hastalık iddiasını çürütür: tek bir hastalığın tembel hayvandan mamuta, büyük kedilere kadar çok farklı türleri yok etmesi gerekirdi; böyle davranan hastalık neredeyse yok.",
    ],
  },
  {
    id: "ti_maya", type: "writing", lv: "C1", topic: "History", minWords: 150,
    reading: {
      title: "Why Did the Classic Maya Cities Collapse?",
      body:
        "Between roughly 800 and 900 CE, many of the great cities of the Classic Maya in Central America were abandoned. Monumental construction stopped, populations fell sharply, and the political system of competing kingdoms collapsed. Historians have proposed three main reasons for this remarkable decline.\n\n" +
        "The first is drought. Studies of ancient lake sediments suggest that the region suffered a series of unusually dry decades during this period. Supporters argue that prolonged drought would have ruined harvests and emptied reservoirs, making it impossible to feed the large urban populations.\n\n" +
        "A second explanation emphasises warfare. Carvings and inscriptions from the final centuries record increasingly frequent conflicts between rival city-states. According to this view, constant warfare destroyed farmland, disrupted trade, and eventually shattered the social order that held the cities together.\n\n" +
        "A third idea focuses on environmental damage caused by the Maya themselves. To support their growing populations, the Maya cleared vast areas of forest for farming. This deforestation, supporters claim, led to soil erosion and declining crop yields, until the land could no longer sustain such large communities.",
    },
    lecture: {
      body:
        "These explanations are popular, but none of them is as strong as it first appears.\n\n" +
        "Consider the drought theory. It's true that the climate became drier, but not every Maya city was affected in the same way. In fact, some cities in the southern lowlands were abandoned while others nearby, with very similar rainfall, continued to thrive for another century or more. If drought were the real cause, we wouldn't expect such different outcomes in places with almost identical climates.\n\n" +
        "Next, the argument about warfare. Yes, the inscriptions describe wars — but warfare was nothing new for the Maya. They had been fighting one another for many centuries, during the very period when their cities were growing and flourishing. Something they had lived with for so long is unlikely to be the sudden cause of collapse.\n\n" +
        "Finally, the idea of self-inflicted environmental damage. Recent studies of ancient soils show that in many regions the Maya were actually skilled land managers. They used terraces, raised fields, and forest gardens to protect the soil. This careful management hardly fits the picture of a people who thoughtlessly destroyed their own environment.",
    },
    prompt: "Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage.",
    keyPoints: [
      "Ders, kuraklık iddiasını zayıflatır: benzer yağışa sahip yakın şehirlerden bazıları terk edilirken bazıları gelişmeye devam etti; kuraklık tek neden olsa bu fark beklenmezdi.",
      "Ders, savaş iddiasını zayıflatır: Maya halkı yüzyıllardır savaşıyordu — şehirler tam da bu dönemde büyüyüp gelişti; uzun süredir yaşanan bir şey ani çöküşün nedeni olamaz.",
      "Ders, çevresel tahribat iddiasını zayıflatır: yeni toprak çalışmaları Maya'nın teraslar ve ormanlık bahçelerle toprağı koruyan becerikli arazi yöneticileri olduğunu gösteriyor.",
    ],
  },
  {
    id: "ti_shuttle", type: "speaking", lv: "B2", topic: "Campus Life", prep: 20, respond: 60,
    reading: {
      title: "Notice: Late-Night Shuttle to Be Discontinued",
      body:
        "Notice from the Department of Transportation Services\n\n" +
        "Beginning next month, the university will discontinue its late-night shuttle bus, which currently runs between the main library and the residence halls from 10 p.m. to 2 a.m. The university says the service is being cut because relatively few students use it during these hours, and the money saved will instead be used to add more buses during the busy daytime schedule. Students who need to travel across campus late at night are encouraged to use the well-lit main walkways.",
    },
    lecture: {
      body:
        "Honestly, I think this is a bad decision, and the reasons they give don't hold up.\n\n" +
        "First, they say hardly anyone uses the late-night shuttle. But that's just not true from what I've seen. During exam periods, that bus is packed — students stay at the library until one in the morning and rely on it to get home. Maybe the numbers look low if you average across the whole year, but when students actually need it, it's essential.\n\n" +
        "And second, telling us to just walk along the main paths? That ignores safety. The campus is huge, and walking twenty minutes alone in the dark isn't something a lot of students feel comfortable doing. The shuttle isn't only about convenience — it's about getting home safely at night.",
    },
    prompt: "The man expresses his opinion about the university's plan to discontinue the late-night shuttle. State his opinion and explain the reasons he gives for holding it.",
    keyPoints: [
      "Adam karara karşı çıkıyor — bunun kötü bir karar olduğunu düşünüyor.",
      "1. neden: 'çok az öğrenci kullanıyor' iddiası yanlış — özellikle sınav dönemlerinde otobüs tıklım tıklım ve öğrenciler gece geç saatte eve dönmek için ona güveniyor.",
      "2. neden: ana yollardan yürümek güvenlik sorunu — kampüs çok büyük; gece tek başına 20 dakika yürümek çoğu öğrenciyi tedirgin ediyor, mekik güvenli dönüş demek.",
    ],
  },
];

/* ============================================================
   PARAPHRASE — rewrite a C1 sentence with a required structural
   transformation. AI-scored (scoreWithAI) / offline (analyzeWriting).
   Mergeable from content.json (data.paraphrase).
   Schema: { id, lv, source, instruction, sample }
============================================================ */
export const PARAPHRASE = [
  {
    id: "pp_although", lv: "C1",
    source: "Although the experiment was carefully designed, it failed to produce conclusive results.",
    instruction: "'Although' yerine 'In spite of' kullanarak cümleyi baştan kur (anlamı koru).", instruction_en: "Rewrite the sentence using 'In spite of' instead of 'Although' (keep the meaning).",
    sample: "In spite of being carefully designed, the experiment failed to produce conclusive results.",
  },
  {
    id: "pp_passive", lv: "B2",
    source: "The committee will announce the results next week.",
    instruction: "Cümleyi edilgen (passive) yapıda yeniden kur.", instruction_en: "Rewrite the sentence in the passive voice.",
    sample: "The results will be announced next week (by the committee).",
  },
  {
    id: "pp_relative", lv: "B2",
    source: "The scientist won a major prize. She discovered a new vaccine.",
    instruction: "İki cümleyi tek bir cümlede, ilgi cümlesi (relative clause) kullanarak birleştir.", instruction_en: "Combine the two sentences into one using a relative clause.",
    sample: "The scientist who discovered a new vaccine won a major prize.",
  },
  {
    id: "pp_nominal", lv: "C1",
    source: "Because the prices increased rapidly, many customers complained.",
    instruction: "Nedeni bir isim öbeğine (nominalisation) çevir; 'Because of …' ile başlat.", instruction_en: "Turn the cause into a noun phrase (nominalisation); start with 'Because of …'.",
    sample: "Because of the rapid increase in prices, many customers complained.",
  },
  {
    id: "pp_reported", lv: "C1",
    source: "The manager said, \"We are launching the product tomorrow.\"",
    instruction: "Cümleyi dolaylı anlatıma (reported speech) çevir.", instruction_en: "Convert the sentence into reported speech.",
    sample: "The manager said (that) they were launching the product the following day.",
  },
  {
    id: "pp_inversion", lv: "C2",
    source: "If the government had acted sooner, the crisis could have been avoided.",
    instruction: "'If'i kaldırıp devrik koşul (inversion) ile yeniden kur.", instruction_en: "Remove 'if' and rewrite with conditional inversion.",
    sample: "Had the government acted sooner, the crisis could have been avoided.",
  },
];

/* ============================================================
   ERRORHUNT — click-to-find hidden grammar errors in a paragraph.
   Each item has exactly 3 errors; matched by word (find), with
   position handled in the component. Mergeable (data.errorhunt).
   Schema: { id, lv, text, errors:[{ find, fix, tr }] }
============================================================ */
export const ERRORHUNT = [
  {
    id: "eh_research", lv: "C1", field: "fen",
    text: "Recent studies shows that the average global temperature have risen sharply. Scientists believe the warming will continue unless emissions is reduced.",
    errors: [
      { find: "shows", fix: "show", tr: "Özne 'studies' çoğul → 'show'.", en: "Subject 'studies' is plural → 'show'." },
      { find: "have risen", fix: "has risen", tr: "Özne 'the average global temperature' tekil → 'has risen'.", en: "Subject 'the average global temperature' is singular → 'has risen'." },
      { find: "is", fix: "are", tr: "Özne 'emissions' çoğul → 'are reduced'.", en: "Subject 'emissions' is plural → 'are reduced'." },
    ],
  },
  {
    id: "eh_history", lv: "C1", field: "sosyal",
    text: "The ancient city were founded more than two thousand years ago. Its inhabitants, who was famous for their trade, has built an impressive network of roads.",
    errors: [
      { find: "were", fix: "was", tr: "Özne 'The ancient city' tekil → 'was founded'.", en: "Subject 'The ancient city' is singular → 'was founded'." },
      { find: "was", fix: "were", tr: "İlgi cümlesinin öznesi 'inhabitants' çoğul → 'who were famous'.", en: "The relative clause's subject 'inhabitants' is plural → 'who were famous'." },
      { find: "has built", fix: "have built", tr: "Özne 'Its inhabitants' çoğul → 'have built'.", en: "Subject 'Its inhabitants' is plural → 'have built'." },
    ],
  },
  {
    id: "eh_health", lv: "B2", field: "saglik",
    text: "Daily exercise have many benefits for the body. A person who train regularly are less likely to develop heart disease.",
    errors: [
      { find: "have", fix: "has", tr: "Özne 'Daily exercise' tekil → 'has'.", en: "Subject 'Daily exercise' is singular → 'has'." },
      { find: "train", fix: "trains", tr: "İlgi cümlesinin öznesi 'A person' tekil → 'who trains'.", en: "The relative clause's subject 'A person' is singular → 'who trains'." },
      { find: "are", fix: "is", tr: "Özne 'A person' tekil → 'is less likely'.", en: "Subject 'A person' is singular → 'is less likely'." },
    ],
  },
  {
    id: "eh_technology", lv: "B2", field: "sosyal",
    text: "The internet have changed how we communicates with each other. People which use social media often share too much personal information.",
    errors: [
      { find: "have changed", fix: "has changed", tr: "Özne 'The internet' tekil → 'has changed'.", en: "Subject 'The internet' is singular → 'has changed'." },
      { find: "communicates", fix: "communicate", tr: "'we' öznesiyle fiil yalın → 'communicate'.", en: "With subject 'we' the verb stays base → 'communicate'." },
      { find: "which", fix: "who", tr: "İnsanlar için ilgi zamiri 'who' olmalı, 'which' değil.", en: "For people the relative pronoun is 'who', not 'which'." },
    ],
  },
  {
    id: "eh_biology", lv: "C2", field: "fen",
    text: "The human brain, despite its small size, consume a remarkable amount of energy. Neurons, that transmit signals across the body, relies on a constant supply of glucose.",
    errors: [
      { find: "consume", fix: "consumes", tr: "Özne 'The human brain' tekil → 'consumes'.", en: "Subject 'The human brain' is singular → 'consumes'." },
      { find: "that", fix: "which", tr: "Virgülle ayrılan (non-defining) ilgi cümlesi 'which' ister, 'that' değil.", en: "A comma-separated (non-defining) relative clause takes 'which', not 'that'." },
      { find: "relies", fix: "rely", tr: "Özne 'Neurons' çoğul → 'rely'.", en: "Subject 'Neurons' is plural → 'rely'." },
    ],
  },
  {
    id: "eh_economy", lv: "C2", field: "sosyal",
    text: "The new policy, which were introduced last year, have reduced unemployment significantly. Economists argues that the effects will last for many years.",
    errors: [
      { find: "were", fix: "was", tr: "İlgi cümlesinin öncülü 'policy' tekil → 'which was introduced'.", en: "The relative clause's antecedent 'policy' is singular → 'which was introduced'." },
      { find: "have reduced", fix: "has reduced", tr: "Özne 'The new policy' tekil → 'has reduced'.", en: "Subject 'The new policy' is singular → 'has reduced'." },
      { find: "argues", fix: "argue", tr: "Özne 'Economists' çoğul → 'argue'.", en: "Subject 'Economists' is plural → 'argue'." },
    ],
  },
];
