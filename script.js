const LOCAL_STORAGE_KEYS = {
  NOTES: "notes",
  SIZE: "size",
};

let isFirstLoad = true;
const notePad = document.getElementById("notepad");

window.addEventListener("load", () => {
  notePad.innerHTML = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTES);

  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(notePad);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  notePad.focus();
});
notePad.addEventListener("keydown", (e) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, e.target.innerHTML);
});

const resizeObserver = new ResizeObserver((entries) => {
  if (isFirstLoad) {
    let editorSize = localStorage.getItem(LOCAL_STORAGE_KEYS.SIZE);
    isFirstLoad = false;
    if (editorSize) {
      editorSize = JSON.parse(editorSize);
      notePad.style.height = `${editorSize.height}px`;
      notePad.style.width = `${editorSize.width}px`;
    } else {
      notePad.style.height = "100%";
      notePad.style.width = "100%";
    }
    notePad.style.opacity = "1";
    return;
  }
  const [entry] = entries;
  const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];

  notePad.style.height = height;
  notePad.style.width = width;
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.SIZE,
    JSON.stringify({ height, width })
  );
});
resizeObserver.observe(notePad);
