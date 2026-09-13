import React, { useState } from "react";

const AVATAR_CANDIDATES = [
  `${process.env.PUBLIC_URL}/assets/avatar.png`,
  `${process.env.PUBLIC_URL}/assets/avatar.webp`,
  `${process.env.PUBLIC_URL}/assets/avatar.jpg`,
];

function Avatar({
  src,
  size = 48,
  alt = "Vishal Kumar",
  className = "",
}) {
  const sources = src ? [src, ...AVATAR_CANDIDATES] : AVATAR_CANDIDATES;
  const [slot, setSlot] = useState(0);
  const current = slot < sources.length ? sources[slot] : null;

  if (!current) {
    return (
      <span
        className={`avatar avatar-fallback ${className}`.trim()}
        style={{ width: size, height: size }}
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        VK
      </span>
    );
  }

  return (
    <img
      className={`avatar ${className}`.trim()}
      src={current}
      alt={alt}
      width={size}
      height={size}
      onError={() => setSlot((value) => value + 1)}
    />
  );
}

export default Avatar;
