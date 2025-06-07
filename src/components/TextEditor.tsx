import { Editor } from "@tinymce/tinymce-react";

import "../styles/modal.text-editor.css";

interface TextEditorProps {
  value?: string;
  setValue?: (value: string) => void;
}
const TextEditor: React.FC<TextEditorProps> = ({ value, setValue }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
      value={value}
      onEditorChange={(newContent) => {
        if (setValue) setValue(newContent);
      }}
      init={{
        language_url: "/tinymce/langs/vi.js",
        language: "vi",
        height: 650,
        menubar: true,
        plugins: "fullscreen lists advlist table image media link",
        fontsize_formats:
          "8px 9px 10px 11px 12px 13px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 44px 46px 48px 50px 52px 54px 56px 58px 60px 62px 64px 66px 68px 70px 72px",
        toolbar:
          "undo redo | formatselect | fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | indent outdent | table | image media link | fullscreen",
        images_upload_url: "/upload",
        images_upload_handler: (blobInfo, progress) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blobInfo.blob());
          }),
      }}
    />
  );
};

export default TextEditor;
