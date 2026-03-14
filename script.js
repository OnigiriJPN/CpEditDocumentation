//////////////////////////////////////////////////////////
// CpEdit Documentation 共通スクリプト
//////////////////////////////////////////////////////////

// 翻訳データ
const translations = {
    en: {
        title: {
            index: "CpEdit Documentation",
            installation: "Installation",
            userGuide: "User Guide",
            developerGuide: "Developer Guide",
            notes: "Notes"
        },
        welcome: "Welcome to CpEdit Documentation. This documentation explains how to use and develop with CpEdit.",
        indexLinks: [
            {text: "Introduction", href: "01_Introduction.html"},
            {text: "Installation", href: "02_Installation.html"},
            {text: "User Guide", href: "03_UserGuide.html"},
            {text: "Developer Guide", href: "04_DeveloperGuide.html"},
            {text: "Notes", href: "05_Notes.html"}
        ],
        sections: {
            license: "License",
            installation: "Installation Notes",
            execution: "Execution & Build Notes",
            debug: "Debug Notes",
            limitations: "Known Limitations",
            creatingProject: "Creating a Project",
            editingCode: "Editing Code",
            buildDebug: "Build and Debug"
        },
        items: {
            license: [
                "CpEdit is a self-made application.",
                "cl.exe must be obtained from Visual Studio Community.",
                "Distributing C++ compiler components via your own application is prohibited."
            ],
            installation: [
                "Run vs_community.exe with administrator privileges.",
                "The default installation path is recommended.",
                "The C++ workload consumes 10–12 GB for standard configuration. Minimal configuration: 4–6 GB. Recommended free space: Minimal: 10 GB, Standard: 20–30 GB."
            ],
            execution: [
                "Avoid using Japanese or special characters in project file paths.",
                "If the path to cl.exe changes, builds will fail.",
                "This application requires cl.exe to function."
            ],
            debug: [
                "Administrator privileges may be required when using JIT debugging.",
                "Live editing of MFC forms may affect existing resources."
            ],
            limitations: [
                "Not fully compatible with Visual Studio.",
                "Some Win32 API calls may have incomplete debug information."
            ],
            creatingProject: [
                "Use File > New Project to create a .cprj file."
            ],
            editingCode: [
                "The code editor supports syntax highlighting and folding for C++."
            ],
            buildDebug: [
                "Use the Build button to compile. Use Debug to start debugging with JIT support."
            ]
        }
    },
    ja: {
        title: {
            index: "CpEdit ドキュメント",
            installation: "インストール",
            userGuide: "ユーザーガイド",
            developerGuide: "開発者ガイド",
            notes: "注意事項"
        },
        welcome: "このドキュメントでは、CpEditの使い方や開発情報をまとめています。",
        indexLinks: [
            {text: "はじめに", href: "01_Introduction.html"},
            {text: "インストール", href: "02_Installation.html"},
            {text: "ユーザーガイド", href: "03_UserGuide.html"},
            {text: "開発者ガイド", href: "04_DeveloperGuide.html"},
            {text: "注意事項", href: "05_Notes.html"}
        ],
        sections: {
            license: "ライセンス関連",
            installation: "インストール時の注意",
            execution: "実行・ビルド時の注意",
            debug: "デバッグ関連",
            limitations: "既知の制限",
            creatingProject: "プロジェクト作成",
            editingCode: "コード編集",
            buildDebug: "ビルドとデバッグ"
        },
        items: {
            license: [
                "CpEditは自作アプリケーションです。",
                "cl.exe は Visual Studio Community から入手してください。",
                "C++コンパイラ部品を自作アプリ経由で配布するのは禁止です。"
            ],
            installation: [
                "vs_community.exe は管理者権限で実行してください。",
                "インストール先は既定推奨です。",
                "C++ワークロードは標準構成で10~12GB空き容量、最小構成で4~6GB空き容量を消費します。推奨空き容量: 最小構成: 10GB、標準構成: 20~30GB"
            ],
            execution: [
                "プロジェクトのファイルパスに日本語や特殊文字は避けてください。",
                "cl.exe のパスが変更されるとビルドできません。",
                "このアプリは cl.exe が必要です。"
            ],
            debug: [
                "JITデバッグを使用する場合、管理者権限が必要なことがあります。",
                "MFCフォームのライブ編集は既存リソースに影響する場合があります。"
            ],
            limitations: [
                "Visual Studio と完全互換ではありません。",
                "一部の Win32 API 呼び出しではデバッグ情報が不完全な場合があります。"
            ],
            creatingProject: [
                "File > New Project で .cprj ファイルを作成します。"
            ],
            editingCode: [
                "コードエディタは C++ の構文ハイライトと折りたたみに対応しています。"
            ],
            buildDebug: [
                "Build ボタンでコンパイル。Debug ボタンで JIT デバッグ開始。"
            ]
        }
    }
};

// 言語切替関数
function setLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;

    // title
    if(document.title.includes("CpEdit")) {
        document.title = t.title.index || t.title.notes;
    }

    // index.html の場合
    const welcomeEl = document.getElementById("welcome-text");
    const indexLinks = document.getElementById("index-links");
    if(welcomeEl) welcomeEl.innerText = t.welcome;
    if(indexLinks) {
        indexLinks.innerHTML = "";
        t.indexLinks.forEach(link => {
            const a = document.createElement("a");
            a.href = link.href;
            a.innerText = link.text;
            a.className = "page-link";
            indexLinks.appendChild(a);
        });
    }

    // Notes ページや各セクションページ
    const sectionsMap = ["license","installation","execution","debug","limitations","creatingProject","editingCode","buildDebug"];
    sectionsMap.forEach(sec => {
        const titleEl = document.getElementById(`${sec}-title`);
        const listEl = document.getElementById(`${sec}-list`);
        if(titleEl) titleEl.innerText = t.sections[sec];
        if(listEl) {
            listEl.innerHTML = "";
            if(t.items[sec]) t.items[sec].forEach(item=>{
                const li = document.createElement("li");
                li.innerText = item;
                listEl.appendChild(li);
            });
        }
    });
}

// ページロード時に navigator.language で自動判定
document.addEventListener("DOMContentLoaded", () => {
    const lang = navigator.language.startsWith("en") ? "en" : "ja";
    setLanguage(lang);

    // 手動切替ボタン
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
});

// ページリンククリック時のフェードアニメーション
document.querySelectorAll("a.page-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const main = document.querySelector("main");
        if(main) main.classList.remove("visible");
        setTimeout(() => window.location.href = href, 400);
    });
});