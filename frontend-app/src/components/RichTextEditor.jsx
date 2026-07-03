import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaImage,
  FaLink,
  FaTable,
} from "react-icons/fa";

function RichTextEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FaListUl />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <FaListOl />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <FaQuoteRight />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <FaCode />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter Image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <FaImage />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter Link URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <FaLink />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <FaTable />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;