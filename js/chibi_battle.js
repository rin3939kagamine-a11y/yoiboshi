/* 宵星の契約者 ちびキャラ戦闘表示 v1.9 46人対応 (stage-safe merge)
 * 戦闘のロジックには触らない「見た目だけ」の部品。
 * 戦闘エンジン側は、行動のたびに attack / hurt / glow などを呼ぶだけでよい。
 * 層の構造: .yc-slot(位置) > .yc-actor(行動の動き) > img(待機の呼吸)
 * ※ 動きは img ではなく親の層にかける(img の呼吸アニメと transform がぶつかるため)
 */
(function(){
  'use strict';
  // ちびキャラ画像があるキャラ(追加したらここに足すだけ)
  var CHIBI_IDS = ['reina','akane','aoi','chinatsu','nagi','momoka','milku',
                   'hiyori','koyori','kirari','maron',  // ひより・こより・きらり・まろん
                   'suiran','cocoa','ageha','lilith',  // 翠蘭・ここあ・あげは・リリス
                   'yui','riko','koharu','luna','mio','jun',  // 結衣・莉子・小春・ルナ・ミオ・ジュン
                   'shizuku','shino','makoto','kyoko','fumika',  // しずく・シノ・真琴・響子・文香
                   'ena','mai','shio','marin','noel','yume',  // エナ・舞・汐・マリン・ノエル・ゆめ
                   'tsubaki','kaede','erika','kaname',  // 椿・楓・エリカ・カナメ
                   'aika','airi','akagi_akari','aki','ando_rio','anzai_rin','arisa','asagiri_rara','asuka','ayane','ayu','azusa','chako','chiaki','chihiro','chikage','chisato','chitose','chiyozaki_suzuha','chizuru','emiri','fujiwara_shouko','fuyutsuki_haru','ginjo_cecil','haruka','haruno_hana','hasegawa_honoka','hatsune','hayakawa_aoba','himari','himeka','himemiya_riria','himeno','hinako','honjo_iroha','hono','hoshimiya_nemu','ichijo_maki','kanna','kanoko','kanon','kaori','karen','kasumi','kawaguchi_mana','kazusa','kei','kirie','kohaku','kokoro','komachi','komiya_anna','komugi','konatsu','kondo_momiji','kotoha','kozue','kudo_karin','kumano_miku','kuromiya_sera','kurose_noa','kurumi','leona','lira','madoka','mahiru','manatsu','mao','mashiro','maya','michiru','miharu','mikan','miki','mikoto','mimi','minami','minase_ririka','minto','mira','mirei','misaki','mitsuki','miura_nanami','miyabi','miyu','mizore','mizuno_miyuki','moe','nagomi','nana','nanoka','nao','natsukawa_yu','nekomiya_rara','nene','nishizawa_shiori','nodoka','noi','nonoka','noriko','nozomi','onishi_ria','raimu','ramu','ran','rara','reika','ren','ribon','rinka','rion','risa','rise','ritsu','roze','rui','ruru','ryo','sakakibara_kaho','sakura','sakuraba_renka','sanae','satsuki','sawada_sango','segawa_rei','seira','seri','setsuna','shieru','shigure',  // 新規ちび追加分
                   'shimotsuki_kirara','shinoda_mei','shiromiya_kotori','sora','subaru','sumika','sumire','suzumiya_mia','suzune','takashiro_ruka','tamaki','tia','todo_megumi','tokiwa_aone','tomoe','towa','tsukasa','tsukimiya_ayaka','tsumugi','ueda_kana','ui','urara','wakaba','yozakura_riri','yue','yukari','yukino','yumemiya_yua','yuna','yura','yuria','yuriko','yuu',  // 新規ちび追加分（残り33人）
                   'tanabe_hinata','yano_sana','kuroda_yuki','futaba_hiiro','futaba_shiroha','hasebe_kairi','hayashi_meirei','ishikawa_an','miyoshi_amane','oikawa_shion','ogawa_haruhi','shirai_tsubasa','tomita_natsuki','morimoto_yuri','fujii_shizune','yasuhara_ito','yanagida_kotone','ninomiya_sayo','suzuhara_hinano','enomoto_sara','mishima_yuuka',  // 新規21人
                   'saki','yuzu','reiko','chiyo','sena','mizuki','meru','kagari','nazuna','anzu','natsume','hotaru','minori','ichika','saeko','juri']; // クラブ組・追加ヒロイン
  // ユニットIDで呼ばれても、キャラIDの画像を使う
  var ALIASES = { hiyori:'hiyori', koyori:'koyori', kirari:'kirari', maron:'maron',
                  suiran:'suiran', cocoa:'cocoa', ageha:'ageha', lilith:'lilith',
                  yui:'yui', riko:'riko', koharu:'koharu', luna:'luna', mio:'mio', jun:'jun',
                  shizuku:'shizuku', shino:'shino', makoto:'makoto', kyoko:'kyoko', fumika:'fumika',
                  rico:'ena', mai:'mai', shio:'shio', marine:'marin', noel:'noel', yume:'yume',
                  tsubaki:'tsubaki', kaede:'kaede', erika:'erika', kaname:'kaname' };
  function key(id){ return ALIASES[id] || id; }
  var CHIBI_DIR = 'assets/ART_V2/chibi/';
  // 並び位置(left%, bottom%)。後列3・前列2。前列ほど手前(z-indexが上)
  var FORMATION = {
    1:[[18,20]],
  
