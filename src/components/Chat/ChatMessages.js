import React from "react";
import Avatar from "../Avatar/Avatar";

function ChatMessages({ messages, typing }) {
  return (
    <div className="chat-log" role="log" aria-live="polite" aria-relevant="additions">
      {messages.map((message) =>
        message.role === "assistant" ? (
          <div key={message.id} className="chat-row">
            <Avatar size={28} className="avatar-xs" alt="" />
            <div className="chat-bubble chat-bubble-assistant">
              <p className="chat-text">{message.text}</p>
              {message.links && message.links.length > 0 && (
                <ul className="chat-links">
                  {message.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <a
                        href={link.href}
                        target={
                          /^(https?:)?\/\//.test(link.href) || /\.pdf(\?|$)/i.test(link.href)
                            ? "_blank"
                            : undefined
                        }
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div key={message.id} className="chat-bubble chat-bubble-user">
            <p className="chat-text">{message.text}</p>
          </div>
        )
      )}
      {typing && (
        <div className="chat-row" aria-label="Assistant is typing">
          <Avatar size={28} className="avatar-xs" alt="" />
          <div className="chat-bubble chat-bubble-assistant">
            <span className="chat-typing">
              <span />
              <span />
              <span />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
