import React, { useState, useEffect } from "react";
import { Box, ToggleButton, Divider, Select, MenuItem, FormControl } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Bold, Italic, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered
} from "lucide-react";
import { FONT_SIZES } from "../../configs/constants";
import { COLORS } from "../../components/common/Colors";

// --- Extension FontSize ---
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});

// --- Toolbar Button Component ---
const ToolbarButton = ({ active, onClick, icon }) => (
  <ToggleButton
    value="check"
    selected={active}
    onChange={onClick}
    size="small"
    sx={{
      border: "none",
      borderRadius: "6px",
      width: 34,
      height: 34,
      color: "#666",
      "&.Mui-selected": {
        color: COLORS.BLUE,
        bgcolor: `${COLORS.BLUE}15`,
        "&:hover": { bgcolor: `${COLORS.BLUE}25` },
      },
      "&:hover": { bgcolor: "#f0f0f0" }
    }}
  >
    {icon}
  </ToggleButton>
);

// --- Main Component ---
const ArticleDescriptionField = ({ value, onChange }) => {
  const [currentSize, setCurrentSize] = useState("16px");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const size = editor.getAttributes("textStyle").fontSize || "16px";
      setCurrentSize(size);
    },
    onTransaction: ({ editor }) => {
      const size = editor.getAttributes("textStyle").fontSize || "16px";
      setCurrentSize(size);
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleFontSizeChange = (event) => {
    const size = event.target.value;
    setCurrentSize(size);
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "#fff",
        transition: "all 0.2s",
        "&:focus-within": {
          borderColor: COLORS.BLUE,
          boxShadow: `0 0 0 2px ${COLORS.BLUE}20`
        },
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          p: 1,
          gap: 0.5,
          bgcolor: "#fcfcfc",
          borderBottom: "1px solid #efefef",
        }}
      >
        {/* Font Size Select */}
        <FormControl variant="standard" sx={{ mx: 1, minWidth: 80 }}>
          <Select
            value={currentSize}
            onChange={handleFontSizeChange}
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              height: 32,
              "&:before, &:after": { display: "none" },
              "& .MuiSelect-select": { py: 0 }
            }}
            size="small"
          >
            {FONT_SIZES.map((size) => (
              <MenuItem key={size} value={size} sx={{ fontSize: size }}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

        {/* Text Style Group */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={<Bold size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<Italic size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<UnderlineIcon size={18} />}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

        {/* List Group */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<List size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered size={18} />}
          />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />

        {/* Alignment Group */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ToolbarButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            icon={<AlignLeft size={18} />}
          />
          <ToolbarButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            icon={<AlignCenter size={18} />}
          />
          <ToolbarButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            icon={<AlignRight size={18} />}
          />
        </Box>
      </Box>

      {/* Editor Content Area */}
      <Box
        sx={{
          p: 2,
          minHeight: 400,
          bgcolor: "#fff",
          cursor: "text",
          "& .ProseMirror": {
            outline: "none",
            minHeight: 380,
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#333",
            "& p": { m: 0 },
            "& ul, & ol": { p: "0 0 0 20px" },
          },
        }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default ArticleDescriptionField;