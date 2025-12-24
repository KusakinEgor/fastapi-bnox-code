import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";
import { vim } from "@replit/codemirror-vim";
import { User } from "lucide-react";
import { runPythonCode, runJScript, sendMessageToAI } from "../api/api";
import { Link } from "react-router-dom";
import "../css/scrollbar.css";

const LANGS = {
  js: { label: "JavaScript", ext: javascript(), run: runJScript },
  ts: { label: "TypeScript", ext: javascript({ typescript: true }), run: runJScript },
  python: { label: "Python", ext: python(), run: runPythonCode },
  json: { label: "JSON", ext: json(), run: null },
} as const;

type LangKey = keyof typeof LANGS;

export default function IDE() {
  const [lang, setLang] = useState<LangKey>("js");
  const [vimEnabled, setVimEnabled] = useState(false);
  const [vimMode, setVimMode] = useState("NORMAL");
  const cmRef = useRef<any>(null);

  const [code, setCode] = useState<Record<LangKey, string>>({ js: "", ts: "", python: "", json: "" });
  const [terminal, setTerminal] = useState<string[]>(["Web IDE Terminal", "$ ready"]);
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [aiInput, setAiInput] = useState("");

  const runCode = async () => {
    setTerminal(p => [...p, `$ run ${LANGS[lang].label}`]);
    if (lang === "json") {
      try {
        JSON.parse(code.json);
        setTerminal(p => [...p, "JSON valid ✓", "$ ready"]);
      } catch {
        setTerminal(p => [...p, "Invalid JSON ✗", "$ ready"]);
      }
      return;
    }
    try {
      const res = await LANGS[lang].run!(code[lang]);
      setTerminal(p => [...p, res?.stderr || res?.stdout || "No output", "$ ready"]);
    } catch {
      setTerminal(p => [...p, "Execution error", "$ ready"]);
    }
  };

  const sendAiMessage = async () => {
    if (!aiInput.trim()) return;
    setAiMessages(p => [...p, { role: "user", text: aiInput }]);
    setAiInput("");
    try {
      const r = await sendMessageToAI(aiInput);
      setAiMessages(p => [...p, { role: "assistant", text: r?.choices?.[0]?.message?.content || "Нет ответа" }]);
    } catch {
      setAiMessages(p => [...p, { role: "assistant", text: "Ошибка AI" }]);
    }
  };

  useEffect(() => {
    if (!vimEnabled || !cmRef.current) {
      setVimMode("");
      return;
    }
    const interval = setInterval(() => {
      const vimState = cmRef.current?.state?.extensions?.find((ext: any) => ext?.maybeInitVimState_);
      const state = vimState?.maybeInitVimState_?.(cmRef.current);
      if (state) setVimMode(state.insertMode ? "INSERT" : "NORMAL");
    }, 150);
    return () => clearInterval(interval);
  }, [vimEnabled]);

  return (
    <div style={styles.root}>
      <div style={styles.left}>
        <div style={styles.header}>
          <div>
            <h2 style={{ margin: 0 }}>Web IDE</h2>
            <small style={{ color: "#94a3b8" }}>JS · TS · Python · JSON</small>
          </div>
          <div style={styles.headerControls}>
            <label style={styles.switch}>
              <input
                type="checkbox"
                checked={vimEnabled}
                onChange={e => setVimEnabled(e.target.checked)}
                style={styles.switchInput}
              />
              <span style={{ ...styles.slider, ...(vimEnabled ? styles.sliderChecked : {}) }}>
                <span style={{ ...styles.sliderCircle, transform: vimEnabled ? "translateX(26px)" : "translateX(0)" }} />
              </span>
            </label>
            <button onClick={runCode} style={styles.runBtn}>Run</button>
            <Link to="/profile"><div style={styles.avatar}><User size={18} /></div></Link>
          </div>
        </div>

        <div style={styles.tabs}>
          {Object.keys(LANGS).map(k => (
            <div
              key={k}
              onClick={() => setLang(k as LangKey)}
              style={{ ...styles.tab, ...(lang === k ? styles.tabActive : {}) }}
            >
              {LANGS[k as LangKey].label}
            </div>
          ))}
        </div>

        <div style={styles.editorWrapper}>
          <div style={styles.editorContainer}>
            <CodeMirror
              ref={cmRef}
              value={code[lang]}
              theme="dark"
              extensions={[LANGS[lang].ext, ...(vimEnabled ? [vim()] : [])]}
              onChange={v => setCode(p => ({ ...p, [lang]: v }))}
              style={{ flex: 1, minHeight: 0 }}
            />
            {vimEnabled && <div style={styles.vimStatus}>{vimMode || "NORMAL"}</div>}
          </div>
        </div>

        <div style={styles.terminal}>
          {terminal.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>

      <div style={styles.ai}>
        <div style={styles.aiHeader}>AI Assistant</div>
        <div style={styles.aiMessages}>
          {aiMessages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.aiMsg,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "#0b1220",
              }}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div style={styles.aiInputRow}>
          <input
            value={aiInput}
            onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendAiMessage()}
            placeholder="Ask AI about your code…"
            style={styles.aiInput}
          />
          <button onClick={sendAiMessage} style={styles.aiBtn}>Send</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: { display: "flex", height: "100vh", gap: 14, padding: 14, fontFamily: "ui-monospace, SFMono-Regular, monospace", background: "#0f1117", color: "white" },

  left: { 
    flex: 2, 
    display: "flex", 
    flexDirection: "column", 
    minHeight: 0, 
    justifyContent: "flex-start" 
  },

  header: { display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid #1e293b", flexShrink: 0 },
  headerControls: { display: "flex", gap: 14, alignItems: "center" },
  switch: { position: "relative", display: "inline-block", width: 50, height: 24, cursor: "pointer" },
  switchInput: { opacity: 0, width: 0, height: 0 },
  slider: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#444", borderRadius: 24, transition: ".4s" },
  sliderChecked: { backgroundColor: "#2563eb" },
  sliderCircle: { position: "absolute", height: 18, width: 18, left: 3, bottom: 3, backgroundColor: "white", borderRadius: "50%", transition: ".4s" },
  runBtn: { background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", borderRadius: 10, padding: "8px 18px", color: "white", cursor: "pointer", fontWeight: 600 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: "#020617", border: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center" },

  tabs: { display: "flex", gap: 6, marginTop: 10, flexShrink: 0 },
  tab: { padding: "6px 14px", background: "#020617", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#94a3b8", border: "1px solid #1e293b" },
  tabActive: { background: "#1e40af", color: "white" },

  editorWrapper: { 
    flex: 1, 
    display: "flex", 
    flexDirection: "column", 
    position: "relative", 
    marginTop: 10, 
    borderRadius: 14, 
    overflow: "hidden", 
    border: "1px solid #1e293b", 
    minHeight: 0 
  },
  editorContainer: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 },
  vimStatus: { position: "absolute", bottom: 0, right: 0, background: "#1e293b", color: "#cbd5f5", padding: "4px 10px", borderTopLeftRadius: 8, fontSize: 12, fontWeight: 600, pointerEvents: "none" },

  terminal: { 
    marginTop: 10, 
    background: "#020617", 
    borderRadius: 14, 
    padding: 10, 
    fontSize: 12, 
    border: "1px solid #1e293b", 
    overflowY: "auto", 
    flexShrink: 0, 
    height: "150px" 
  },

  ai: { 
    flex: 1, 
    display: "flex", 
    flexDirection: "column", 
    background: "#020617", 
    borderRadius: 14, 
    border: "1px solid #1e293b", 
    minHeight: 0, 
    justifyContent: "space-between" 
  },
  aiHeader: { padding: "12px 14px", fontWeight: 600, borderBottom: "1px solid #1e293b", flexShrink: 0 },
  aiMessages: { flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", minHeight: 0 },
  aiMsg: { padding: "10px 14px", borderRadius: 14, maxWidth: "78%", fontSize: 13, whiteSpace: "pre-wrap" },
  aiInputRow: { display: "flex", gap: 8, padding: 12, borderTop: "1px solid #1e293b", flexShrink: 0 },
  aiInput: { flex: 1, background: "#020617", border: "1px solid #1e293b", color: "white", padding: "10px 12px", borderRadius: 10, fontSize: 13 },
  aiBtn: { background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", color: "white", padding: "10px 18px", borderRadius: 10, cursor: "pointer", fontWeight: 600 },
};
