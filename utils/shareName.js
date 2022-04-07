const shareUsingClipBoard = async (setCopyToClipBoard, shareText) => {
  if ("clipboard" in navigator) {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch (e) {
      return document.execCommand("copy", true, shareText);
    }
  }
  setCopyToClipBoard(true);
  setTimeout(() => {
    setCopyToClipBoard(false);
  }, [500]);
};

const shareName = async (name, setCopyToClipBoard) => {
  const shareText = `${name.name}\n\n${name.definition}\n\n#theNames `;
  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText
      });
    } catch (e) {
      shareUsingClipBoard(setCopyToClipBoard, shareText);
    }
  } else {
    shareUsingClipBoard(setCopyToClipBoard, shareText);
  }
};

export default shareName;
