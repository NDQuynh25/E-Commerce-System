import React, { useEffect, useRef } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "tui-image-editor";

const ImageEditorComponent = () => {
    const editorRef = useRef<ImageEditor | null>(null); // 👉 Định nghĩa kiểu hợp lệ
    const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    editorRef.current = new ImageEditor(document.querySelector("#tui-image-editor") as HTMLElement, {
      includeUI: {
        loadImage: { path: "https://source.unsplash.com/random", name: "Sample" },
        menu: ["crop", "flip", "rotate", "draw", "text", "filter"],
        initMenu: "filter",
        uiSize: { width: "100%", height: "500px" },
      },
      usageStatistics: false,
    });
  }, []);

  return <div id="tui-image-editor" />;
};

export default ImageEditorComponent;
