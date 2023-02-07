import { uploadImageAsync } from "@/modules/upload-image/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import UploadImage from "@/modules/upload-image/component";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function UploadImageContainer({ setFieldValue }) {
  const dispatch = useAppDispatch();
  const imageState = useAppSelector((x) => x.upload_image_reducer);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const body = new FormData();
    body.append("file", file);
    await dispatch(uploadImageAsync(body));
    setImageLoaded(true);
  };

  useEffect(() => {
    if (imageState?.loadingStatus === LOADING_STATUSES.IDLE && imageLoaded) {
      setFieldValue("posterURL", imageState?.imageName);
      setImageLoaded(false);
    }
  }, [
    imageLoaded,
    imageState?.imageName,
    imageState?.loadingStatus,
    setFieldValue,
  ]);

  return <UploadImage handleUploadImage={handleUploadImage} />;
}
