# 宵星 立ち絵PNG登録補助ツール

このツールはChatGPTの添付画像をGitHub連携ツールに直接渡せない場合に、**手元のWindows PCから**公式GitHub CLIでPNGバイナリを登録するための代替経路です。

## 使用方法

1. GitHub CLIをインストール: https://cli.github.com/
2. PowerShellで `gh auth login` を実行し、宵星リポジトリへの書き込み権限を持つGitHubアカウントで認証する。
3. 透過PNGをPCに保存し、このリポジトリの `tools/upload_standee_png.ps1` を入手する。
4. PowerShellから実行する（パスは適宜変更）。

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\upload_standee_png.ps1 -ImagePath .\2026-11-11_pink_cat_maid_standee.png
```

既定の配置先は `assets/character_candidates/2026-11-12_pink_cat_maid/`。他の画像では `-DestinationDirectory` を指定可能。

実行時にPNGの署名・RGBA形式を確認し、バイナリをBase64化してGitHub Contents APIへ送信し、Gitのblob SHA-1を登録後に再取得・比較します。既存ファイルと内容が違う場合は上書きしません。画像の加工やゲームへの実装は行いません。

### 2026-11-11 pink cat maid 原本情報

- ファイル: `2026-11-11_pink_cat_maid_standee.png`
- PNG: 1024×1536, RGBA
- バイト数: 1,388,886
- SHA-256: `b623f22c0c461cc4bc66f75484b293bbda5f034629d9c9f0fdf083e672011f1e`
- Git blob SHA: `b3cbf7a8e7dcdb307599f8397710ef439e26e260`

**現状:** このPRは補助スクリプトの追加のみ。画像そのものは未登録であり、PCでの実行・GitHub上の画像の照合は未実施です。
