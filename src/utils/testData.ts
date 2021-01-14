export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
}
export interface ColumnProps {
  id: string;
  title: string;
  avatar?: string;
  description: string;
}
export const testData: ColumnProps[] = [
  {
    id: "1",
    title: "等角等然识历",
    description:
      "究就更科特飞算第们代光开团毛强研。走安约文物民及家知市下风。历定提关火其感战样酸政革证代。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "2",
    title: "构每验矿",
    description:
      "形高前全好斯格你学取社队或上。下因题想心共自指时到记选的两须保精。还主不响消变约参段色然经根。并大下物必式根取火便下品体张题节。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "3",
    title: "放市才花",
    description:
      "会许治加比声白包名专农百离。收品党些法该部米分加维质二。权空细议平离便能受听安五行复九会。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "4",
    title: "称样清再",
    description:
      "马东些最是十运或规酸级明此达适所型界。名性争又收持式今五生引除面外天。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "5",
    title: "一但保们律",
    description:
      "全火周非研头想众做张叫后名志再而。节手因共团事被西进力期小。走经电着国体音京到时几美白。车保战部张代东边样使平采委。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "6",
    title: "济信世不识",
    description:
      "增不把统再求情战非车原状新。总情变身石题十加着论斯位程系太处老",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "7",
    title: "器部好华",
    description:
      "维车毛四务这无气南王战果林类。包低界安上越始月理件道往基。阶实共结电近离务土金党整持题。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "8",
    title: "土书个六们色",
    description:
      "争计活张动此此养角市交立现。重江除保得部好青王该消常精已度统比。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "9",
    title: "称议头示拉来",
    description:
      "切直被运团米易上地克特速带改相。点不计向规原白头京马集些利果。联状委品理实华车又精任民具技级什期。立表权是将从政离青住数则因花对。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: "10",
    title: "基产压",
    description:
      "以所相文引马易具要应节专快多出其。容气加放选王广能号节十些常。道已几解中水手前位查史八安。",
    avatar: "http://dummyimage.com/100x100",
  },
];
export interface PostProps {
  id: string;
  title: string;
  content: string;
  avatar?: string;
  createdTime: string;
  columnId: string;
}
export const testPosts: PostProps[] = [
  {
    id: "T941731836",
    avatar: "http://dummyimage.com/150x100",
    title: "设各据应织片题车能他时公石院并本快或保集无",
    content:
      "广元合争劳知价全专变而两约使知技出。温活石始酸据制识世来手广取。选导题每四军验上组据消以之主。",
    createdTime: "2009-05-31 07:56:24",
    columnId: "1",
  },
  {
    id: "T839017481",
    avatar: "http://dummyimage.com/150x100",
    title: "统会较何应织片题车能他时公石院并本快或保集无",
    content:
      "于地状部理感革至压可产还品接。反海群叫领存事只或党变任响。族机利儿下向气大素选作图传。求收必色非面非调出内达好往位边联。义非算称学要更确马识示来个派而转组带。业广非几广据中什器条张当什五参使北路。识周家到也劳及口各多农那起。反手而被从争组离门照非国量把据米年想。",
    createdTime: "2007-05-04 22:23:29",
    columnId: "1",
  },
  {
    id: "T157909370",
    avatar: "http://dummyimage.com/150x100",
    title: "眼西路采作照调应织片题车能他时公石院并本快或保集无",
    content:
      "四质别对政单再世金标然东快金采。精保教部声备农高林前就了快亲走。物土压年道争委也增油其段发走值机内花。内市照边被可建安局东报京。难国头分土小技论书往场最式。",
    createdTime: "1998-09-15 14:00:43",
    columnId: "1",
  },
  {
    id: "T302324127",
    avatar: "http://dummyimage.com/150x100",
    title: "变现领认经应织片题车能他时公石院并本快或保集无",
    content:
      "价专至几为四物目马第即事外报。导加最九商号料之式边究提问。决些此据特道国阶强他问圆过。龙验了局加委非装些易段音。金断解且周层化素局专但亲易反八院加被。克原受色种料部日战流问革把。己细青石务想江容当温质压真体导再。",
    createdTime: "1995-01-13 13:01:04",
    columnId: "1",
  },
  {
    id: "T906558536",
    avatar: "http://dummyimage.com/150x100",
    title: "因究龙至题应织片题车能他时公石院并本快或保集无",
    content:
      "九深示家值制人信青油同需层造。众深当地带无口才研查共支。叫电有力观清保步时气目总的安传。了群易完周别海取族还今元程识车。劳重证只经求作积调际格样起义列革方片。",
    createdTime: "2014-11-08 23:22:09",
    columnId: "1",
  },
  {
    id: "T599443807",
    avatar: "http://dummyimage.com/150x100",
    title: "名属么次起取究应织片题车能他时公石院并本快或保集无",
    content:
      "响想始回文何得时事相员半断比看低联。积保到日格资资己月角关老科家变。受节义金信育院至府林与为半政。干种表马原区被当人元公和劳又张。",
    createdTime: "1984-06-29 12:06:52",
    columnId: "1",
  },
  {
    id: "T716427172",
    avatar: "http://dummyimage.com/150x100",
    title: "外每切已交",
    content:
      "海较角于周县据叫即非我风。层儿率多利发住济常书斯角单素可办成。专发眼决间图族或证去如支资了气亲济。平切展根分问物在色比信片值。府主应二观价式有整价及特前容。",
    createdTime: "2000-06-24 08:34:35",
    columnId: "P778096212",
  },
  {
    id: "T330095777",
    avatar: "http://dummyimage.com/150x100",
    title: "是它接",
    content:
      "设身保接体走真带由石精使可商场一山。当无准可战越积众开劳声府易员。以动动变设儿众比连那物细。权严记调社她共此人重公图厂场热。形南局它人验西列素干七们头。",
    createdTime: "1972-10-25 21:36:05",
    columnId: "P861142196",
  },
  {
    id: "T413272591",
    avatar: "http://dummyimage.com/150x100",
    title: "史其党究交区农应织片题车能他时公石院并本快或保集无",
    content:
      "应织片题车能他时公石院并本快或保集无。算今状先四也色动毛素技指属会知反研。百万准社经阶千多红结通求存求革严段。比专铁周真消便都完指名已级名。县性性子高出省加路火每任思专。织厂形交相热叫交劳进次要。不合王学支情儿回压进江群济干米克可。山层图节格识证织南专联队于。",
    createdTime: "1995-03-23 06:50:07",
    columnId: "P664950017",
  },
  {
    id: "T225335824",
    avatar: "http://dummyimage.com/150x100",
    title: "队运难我",
    content:
      "图子院学细术界思队白细百任没。指根美造你间须者验节放被因农。区流米效年平料思小火需政会技然。适体定么名格几张备养书起青次及思。拉于社就海快例区手称给从周线。质或议委里变意劳变值积化队才。集精界高平常用过维工形前即。",
    createdTime: "1971-03-24 02:30:31",
    columnId: "P769094884",
  },
];
