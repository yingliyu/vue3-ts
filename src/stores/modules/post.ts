import axios from 'axios';
import { asyncAndCommit, getAndCommit } from '../index';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { arrToObj, objToArr } from '../../utils/helper';
import { PostState as State, GlobalDataProps } from '../type';
const postsData = {
  '11': {
    id: '11',
    image: {
      id: '5B9554C7-1De5-D1e9-3eb2-7Fd7540dbbcC',
      url: 'http://dummyimage.com/300x100'
    },
    title:
      '查想置何调书反从于管展划写采资报面交速先断计然先维运月地场为叫很地量全许整世本产或调分准实给认所叫气以',
    content:
      '###### 1.马涛\n要美海气提林思者感提角命段。天以种音出红今产建温题共高空。华青最心派每选现采而部十到据商。后矿劳水将八设义象集活过改离日单上则。\n###### 2.陈强\n人眼前头不后做商后给教复全运式。何专龙表他报现车采三自切。种后别易极老周事从种区议权七。它照家料意养军世目中会回至对儿人。之儿志就决三本等他上决龙那老革品得。\n###### 3.杨军\n第感四清速最具如消号量子感力。给求土整选消组识属证很到到型型得局。提书特号相权四目则持其厂东区酸原角。转是世时表府张广须领社地火以。\n###### 1.崔秀英\n老知据律看后眼事以置如等。制得片成算王造每心期关济多见线间五。保造米省王原来感又八体组团。给委包成级还由力价下达厂斗更集。\n###### 2.谢杰\n真等油要热以龙每积边具等容说。物清年放京八及提需识动心经。常前几府决标将问精张容支听了战。明等火置细节何就头特己内我世。议明立民基为海保风达性进即。\n###### 3.冯桂英\n但不区天一高须它派情选直六品这。容物需关压值增装为战至直意。打后用达本广影况有入分每组指认并了史。度省度积果安细联年数空受。院王无光号名老高进十备率性。\n###### 1.龚秀兰\n农必区八火己集产百中党列律。争光就月见白习选号书调按市完。设元导通状层圆斗规情价给件生先果心。年收记电文思但原水么等铁口在政。万建造代段转来实形入不没定参。\n###### 2.于超\n据音心世温而强层要规五水属。断认题打会办好今为红今物加须济。信变般别相水院完况对农件电。地较料主张题们候步美活多单按律。交劳油起细属发报包队青多前这。通收理亲记音存证阶图院响我张员织。\n###### 3.陆静\n农气反然相转类能半在认能完度权们劳。办万办但受道对亲证然更热通由八她知。比节名太行白门知电东军标题使议类。如按通红统几战但个意加采算建所。每引但却也动结划石级现原价样金要政。\n',
    createdTime: '1978-10-30 07:36:47',
    cid: '1',
    author: {
      id: '1129fC3A-cF13-A2c9-Ff8A-6c7a843Cbbfd'
    }
  },
  '12': {
    id: '12',
    image: {
      id: '4E46eAcD-4f73-F866-e5B9-e24e93219baB',
      url: 'http://dummyimage.com/300x100'
    },
    title: '内什委二面称铁劳入好将响设道质反任他省一此信育界知立己满单动别验五力解代龙',
    content:
      '###### 1.许芳\n期团化整劳值改热党报六压对步火持传。政白于半内达织务九千候调近增被东。一省装济界被来里越声用先处生院济。作快然织低种点没备六林合现少周。行样物将消现形音例解农解其住其阶中统。型七须究段交习院海运心点史。十经按置外什律总选群物党被将复元。\n###### 2.林军\n受包复分事本认准就头元在复会。东自面维可温带务报展合样两身白。色共和得把统期气改制史明只美革见明。\n###### 3.陈静\n在两头指院来头斯林果件先变看体。持题林拉则出如决工儿术期然。量机使北县支认动员此验消要。验特铁导第百品段先许去合是。\n###### 1.锺娟\n北音现用法团建计感老清头。从断已设声边律队复把特值车土动往么。来技通式五马名知制每报构具上正。点空月路严圆任需么问正准内处见。公米战本两指后般不史满论全济。开少情深件名开上越积离严农定米反。\n###### 2.冯娟\n习到近叫性目示后离出声做造。战意各解今适路养根住公见事越改。细它论导还与角流他共发律去以。高手总叫四反养报关义满况回。\n###### 3.邹芳\n专所保那质克划时解先受样。做气于建习期断式运中领况下。断律张及造至长人律带过四。率值包需千还好参造口山者前候设光务。\n###### 1.林娜\n置线立响存确部劳物感消先么何思局同改。斯长准厂研出东世十增机民各消。标商记王三议利场素时究清之酸白。心自门原查交儿放酸切治容又起反易细。小龙拉值法回叫器七活马适备身。圆利照身当化验压组建华志问头。\n###### 2.余涛\n步斗建证议率省查素党千证育能。值在海例导标容劳信进选个后转派。较转标下选作更即会科持引些使便果历及。主由专后状三美北题想世江约则对属直。想理许取平事交并组资六代代。\n###### 3.陈杰\n克么那准物持权为候何感阶料向比至满导。称飞入六还受并形平上革改院常直段而。断几只斯完都认比有西算处阶。\n',
    createdTime: '2003-10-14 19:47:35',
    cid: '1',
    author: {
      id: 'DbE21fB1-52d6-BBcd-3FF3-1cD71f325fDa'
    }
  },
  '13': {
    id: '13',
    image: {
      id: 'Fc7f1Fe3-49DD-8a6B-abfb-135f5d1ECaA6',
      url: 'http://dummyimage.com/300x100'
    },
    title: '存切时动一门消流目快该性消育广着业适长立常外快感包确需铁期人快子律打如办',
    content:
      '###### 1.崔平\n性好放便被按学记当真设识准它身。知所动准四地争满场参除速处制自报。资厂何料全达类二去美法达白国并家时。报划该方群去东华特决通况被。\n###### 2.黎涛\n外济备天广社具种资九方采流按低。任公确热术断际象据准由月张在年标须原。根可并容导件解话五实意原气众。却出次深业保持王越油青给下支。争形各往原资引速价存况象段定。\n###### 3.陆洋\n规整划之西院育圆体王各素太且。铁装后些影东再运存装严三去料。又合历只收影来造相气最县红感都。温给和党构共育海数装克米值越究并。除花火比百实机场发拉起眼知律共。步只效系新思那流色治他制变亲。际车步方律史场体好人党头被际华。\n###### 1.郑涛\n厂经例院于达识天精文往政制区条光类。经务家其务社次边目行条无程。公置第复民感大米计见就般表已于思应。和了立只产人角人维华采般置任前。可离主自层性置能压还线品世持越影。\n###### 2.袁霞\n表看引气连于收速利子现上主阶物手。走九法根利备量生定布发马。采好意度消市包次火长身容程张。科构即离事达世除也能我同为。片叫高拉你说安及更联技分年领价。\n###### 3.雷杰\n机层线反质压难历者件果重调不色委江。调政种日片统连律精式现领参。千条话任使给线动不张林须军往划片。存海打济斯克织年近给准线它列际济调。\n###### 1.金静\n理两青和究华元分白场速经时为北建。话决信所酸长日连身点断识比声其济府。对管东思天知者见行强众主干越农院电。\n###### 2.曹敏\n文整油几包的三以里院业和矿好号革且军。性合器马三口育容很院成已议想。指义可消山以治传原清白队声走表边。万形场水按里得料属断需验。层明这见装手交却水最区体向加六。外有省报据成方水住与火是展此空万元车。\n###### 3.赵秀兰\n压流果方类体技形自本支半却如水制。华般线要正这适电它法使称开组色如。代会劳容分量目响长价家叫习学准。长则受过消米个就许素心克约达能确。\n',
    createdTime: '1994-03-23 13:56:10',
    cid: '1',
    author: {
      id: '2C2cbD85-8E39-Cd52-6A8a-1fE3b4f1B4fF'
    }
  }
};

// intial state
const state: State = {
  data: postsData,
  loadedColumns: []
};

const getters: GetterTree<State, GlobalDataProps> = {
  getPostsByCid: (state) => (cid: string) => {
    return objToArr(state?.data).filter((post) => post.cid === cid);
  },
  getCurrentPost: (state) => (id: string) => {
    return state.data[id];
  }
};

// actions
const actions: ActionTree<State, GlobalDataProps> = {
  // 通过栏目id获取文章列表
  async getPostsByCidAction({ state, commit }, cid) {
    if (!state.loadedColumns.includes(cid)) {
      return getAndCommit(`/zhihu/column/${cid}/posts`, 'fetchPostsByCid', commit);
    }
  },
  // 发表文章
  async createPostAction({ state, commit }, payload) {
    const { data } = await axios.post('/zhihu/createPost', payload);
    commit('createPostMutation', data);
    return data;
  },
  // 删除文章
  async deletePostAction({ commit }, id) {
    return asyncAndCommit(`/zhihu/posts/${id}`, 'deletePost', commit, {
      method: 'delete'
    });
  },
  //更新文章
  updatePostAction({ commit }, { id, payload }) {
    return asyncAndCommit(`/zhihu/posts/${id}`, 'updatePost', commit, {
      method: 'patch',
      data: payload
    });
  },
  //通过文章id获取文章详情
  async getPostDetailAction({ state, commit }, id) {
    const currentPost = state.data[id];
    if (!currentPost || !currentPost.content) {
      return getAndCommit(`/zhihu/post/${id}`, 'fetchPostDetail', commit);
    } else {
      return Promise.resolve({ data: currentPost });
    }
  }
};

const mutations: MutationTree<State> = {
  fetchPostsByCid(state, { data: rawData, extraData: cid }) {
    state.data = { ...state.data, ...arrToObj(rawData) };
    state.loadedColumns.push(cid);
  },
  fetchPostDetail(state, rawData) {
    state.data[rawData.data.id] = rawData.data;
  },
  createPostMutation(state, newPost) {
    state.data[newPost.id] = newPost;
  },
  updatePost(state, { data }) {
    state.data[data.id] = data;
  },
  deletePost(state, { data }) {
    delete state.data[data._id];
  }
};

const store = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
export default store;
