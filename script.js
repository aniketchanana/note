const DELTA = 64 * 2; // both side padding

const LOCAL_STORAGE_KEYS = {
  NOTES: "notes",
  SIZE: "size",
};

let isFirstLoad = true;

window.addEventListener("load", () => {
  document.body.innerHTML = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTES);

  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(document.body);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  document.body.focus();
});
document.body.addEventListener("keydown", (e) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, e.target.innerHTML);
});

const resizeObserver = new ResizeObserver((entries) => {
  if (isFirstLoad) {
    let editorSize = localStorage.getItem(LOCAL_STORAGE_KEYS.SIZE);
    document.body.style.opacity = "1";
    isFirstLoad = false;
    if (editorSize) {
      editorSize = JSON.parse(editorSize);
      document.body.style.height = `${editorSize.height}px`;
      document.body.style.width = `${editorSize.width}px`;
    }
    return;
  }
  const [entry] = entries;
  const { width, height } = entry.contentRect;

  const _height = height + DELTA;
  const _width = width + DELTA;

  document.body.style.height = _height;
  document.body.style.width = _width;
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.SIZE,
    JSON.stringify({ height: _height, width: _width })
  );
});
resizeObserver.observe(document.body);
