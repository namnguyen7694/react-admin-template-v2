import React, { CSSProperties, useEffect, useState } from "react";
import "./CustomFileUpload.scss";
import { Upload, message, Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import insertImage from "assets/images/inventory/insertImagePlus.png";

export type Props = {
  imageUrl?: string;
  size?: number;
  handleChangeImg: (file) => void;
  className?: string;
  showPreviewImage: boolean;
  style?: CSSProperties;
};

const CustomFileUpload: React.FC<Props> = (props) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<any>(undefined);

  useEffect(() => {
    bindingProductImg();
    // eslint-disable-next-line
  }, []);

  const bindingProductImg = () => {
    if (props.imageUrl) {
      let defaultFileList: any = {
        uid: props.imageUrl,
        name: props.imageUrl,
        status: "done",
        url: props.imageUrl,
      };
      setFile(defaultFileList);
    }
  };

  const beforeUpload = (file) => {
    const limitSize = props.size ?? 2;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLtLimit = file.size / 1024 / 1024 < limitSize;
    if (!isLtLimit) {
      message.error(`Image must smaller than ${limitSize}MB!`);
    }
    return isJpgOrPng && isLtLimit;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChangeImg = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setTimeout(() => setUploading(false), 500);
        // setUploading(false);
        setFile({
          uid: info.file.uid,
          name: info.file.name,
          status: "done",
          url: imageUrl,
          file: info.file,
        });
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(
    () => {
      if (file && file.file) {
        props.handleChangeImg(file);
      }
    },
    // eslint-disable-next-line
    [file]
  );

  return (
    <div className="custom-file-upload" style={props.style!}>
      <Upload
        className={props.className}
        listType="picture-card"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={(info) => handleChangeImg(info)}
      >
        {uploading && <LoadingOutlined />}
        {!uploading && props.showPreviewImage && <Avatar src={file ? file.url : insertImage} />}
        {!props.showPreviewImage && !uploading && <Avatar src={insertImage} />}
        {props.children}
      </Upload>
    </div>
  );
};

export default CustomFileUpload;
