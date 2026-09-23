"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// Uzak (Unsplash) görsel yüklenemezse logolu pastel bir yer tutucu gösterir.
export function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="image-fallback" role="img" aria-label={props.alt}>
        <Image src="/images/orimini-rozet.png" alt="" width={96} height={96} />
      </span>
    );
  }
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
