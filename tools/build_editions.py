"""index.html から体験版(trial.html)とデバッグ版(debug.html)を作る。
index.html を更新したら毎回これを実行する: python3 tools/build_editions.py"""
from pathlib import Path
import re
R=Path(__file__).resolve().parents[1]
src=(R/'index.html').read_text()
ver=re.search(r'js/edition_v1\.js\?v=([0-9.]+)',src)
gv=re.search(r'js/game\.js\?v=([^"]+)',src).group(1)
for ed,label in (('trial','体験版'),('debug','デバッグ版')):
    h=src.replace('<head>',f"<head><script>window.YOIBOSHI_EDITION='{ed}'</script>",1)
    h=re.sub(r'<title>(.*?)</title>',lambda m:f'<title>{m.group(1)}【{label}】</title>',h,count=1)
    h=h.replace('</body>',f'<script defer src="js/edition_v1.js?v={gv}"></script></body>',1)
    (R/f'{ed}.html').write_text(h)
    print('wrote',ed+'.html')
