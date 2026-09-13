import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ChatPanel from "./ChatPanel";
import { getAssistantReply } from "../../data/getAssistantReply";
import Avatar from "../Avatar/Avatar";

function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const launcherRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const ask = (question) => {
    const text = question.trim();
    if (!text || typing) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text },
    ]);
    setInput("");
    setTyping(true);

    const reply = getAssistantReply(text);
    const delay = reduce ? 0 : 450;

    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: reply.text,
          links: reply.links,
        },
      ]);
      setTyping(false);
    }, delay);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ask(input);
  };

  const panelMotion = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      <AnimatePresence>
        {open && (
          <motion.div key="chat-panel" className="chat-shell" {...panelMotion}>
            <ChatPanel
              messages={messages}
              typing={typing}
              input={input}
              onInput={(event) => setInput(event.target.value)}
              onSubmit={onSubmit}
              onSuggestion={ask}
              onClose={() => {
                setOpen(false);
                window.setTimeout(() => launcherRef.current?.focus(), 0);
              }}
              inputRef={inputRef}
              logRef={logRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        aria-expanded={open}
        aria-controls="chat-dialog"
        aria-label={open ? "Close Ask about Vishal" : "Ask about Vishal"}
        onClick={() => setOpen((value) => !value)}
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        <span className="chat-launcher-mark">
          <Avatar size={28} className="avatar-xs" alt="" />
        </span>
        <span>Ask about Vishal</span>
      </motion.button>
    </div>
  );
}

export default ChatWidget;
