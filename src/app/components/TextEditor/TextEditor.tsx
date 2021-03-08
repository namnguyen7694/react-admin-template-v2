import * as React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.scss";
import CustomButton from "app/components/CustomButton/CustomButton";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "24px", "30px", "40px"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["Arial", "Comic-sans", "Courier-new", "Georgia", "Helvetica", "Lucida", "Roboto", "Vollkorn"];
Quill.register(Font, true);

export declare module TextEditorModule {
  export interface Props {
    onSubmit: (html: string) => void;
    imageHandler?: () => void;
    onCancel: () => void;
    initValue : string;
  }
  export interface State {
    editorHtml: string;
  }
}

export const TextEditor: React.FC<TextEditorModule.Props> = (props) => {
  const [editorHtml, setEditorHtml] = React.useState(props.initValue);

  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: Font.whitelist }],
        [{ size: Size.whitelist }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "arrow" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: props.imageHandler!,
      },
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  return (
    <div className="text-editor">
      <ReactQuill value={editorHtml} onChange={handleChange} modules={modules} formats={formats} />
      <div className="button-group">
        <CustomButton
          onClick={() => props.onCancel()}
          style={{ color: "#444C53", fontWeight: "bold" }}
          type="completed"
          outline
          item="Cancel"
        />
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            props.onSubmit(editorHtml);
          }}
          style={{ fontWeight: "bold" }}
          type="new"
          item={<span>Save</span>}
        />
      </div>
    </div>
  );
};

// const Video = Quill.import("formats/video");
// const Link = Quill.import("formats/link");
// class CoustomVideo extends Video {
//   static create(value) {
//     const node = super.create(value);

//     const video = document.createElement("video");
//     video.setAttribute("controls", "true");
//     video.setAttribute("type", "video/mp4");
//     video.setAttribute("style", "height: 200px; width: 100%");
//     video.setAttribute("src", this.sanitize(value));
//     node.appendChild(video);

//     return node;
//   }

//   static sanitize(url) {
//     return Link.sanitize(url);
//   }
// }
// CoustomVideo.blotName = "video";
// CoustomVideo.className = "ql-video";
// CoustomVideo.tagName = "DIV";
// Quill.register("formats/video", CoustomVideo);

// const BlockEmbed = Quill.import("blots/block/embed");
// class VideoBlot extends BlockEmbed {
//   static create(value) {
//     let node = super.create();
//     node.setAttribute("src", value.url);
//     node.setAttribute("controls", value.controls);
//     node.setAttribute("width", value.width);
//     node.setAttribute("height", value.height);
//     node.setAttribute("webkit-playsinline", true);
//     node.setAttribute("playsinline", true);
//     node.setAttribute("x5-playsinline", true);
//     return node;
//   }

//   static value(node) {
//     return {
//       url: node.getAttribute("src"),
//       controls: node.getAttribute("controls"),
//       width: node.getAttribute("width"),
//       height: node.getAttribute("height"),
//     };
//   }
// }
// VideoBlot.blotName = "simpleVideo";
// VideoBlot.tagName = "video";
// Quill.register(VideoBlot);
