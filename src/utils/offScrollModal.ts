export const offScrollModal = () => {
  const body = document.querySelector('body')
  if (body?.classList.contains('open-menu')) {
    body?.classList.remove('open-menu')
  } else {
    body?.classList.add('open-menu')
  }
}
