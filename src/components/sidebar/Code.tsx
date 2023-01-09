import React, { createRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Code({ code }: { code: string }) {

  return (
    <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{
      borderRadius: 8,
      flexShrink: 0,
    }}>
      {code}
    </SyntaxHighlighter>
  );
}

