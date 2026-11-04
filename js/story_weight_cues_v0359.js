/* Ver.0.35.9.0 — ストーリーの重み付け（第1〜3章）で行を差し込んだ場面の表情指定を、新しい行番号に合わせる。 */
if(typeof EXPRESSION_CUES!=='undefined'&&EXPRESSION_CUES.stories){
 const shift=(id,fromIndex1,by)=>{const old=EXPRESSION_CUES.stories[id];if(!old)return;const out={};for(const [k,v] of Object.entries(old)){const n=Number(k);out[String(n>=fromIndex1?n+by:n)]=v}EXPRESSION_CUES.stories[id]=out};
 shift('q12',12,1);           // 朔夜の「私の名前を…」を12行目に追加
 shift('chapter2_end',9,5);   // 葵の「初めて会った日」5行を9行目から追加
 shift('chapter3_open',2,1);  // ももかの手帳の行を2行目に追加
}
